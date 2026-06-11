/**
 * Blog/Writing utilities
 * Articles live as Markdown files in /content/writing/
 * Each file uses frontmatter for metadata:
 *
 * ---
 * title: "Your Article Title"
 * date: "2026-06-05"
 * excerpt: "A short summary shown on the listing page."
 * ---
 *
 * Article content goes here...
 */

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Vite glob import — picks up all .md files in content/writing at build time
const modules = import.meta.glob('/content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: false,
});

function slugFromPath(path: string): string {
  return path.replace('/content/writing/', '').replace('.md', '');
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, content: raw };
  const meta: Record<string, string> = {};
  fmMatch[1].split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = value;
  });
  return { meta, content: fmMatch[2].trim() };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts: PostMeta[] = [];
  for (const [path, loader] of Object.entries(modules)) {
    const raw = (await loader()) as string;
    const { meta } = parseFrontmatter(raw);
    posts.push({
      slug: slugFromPath(path),
      title: meta.title || 'Untitled',
      date: meta.date || '',
      excerpt: meta.excerpt || '',
      author: meta.author || 'Katie Robblee',
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const path = `/content/writing/${slug}.md`;
  const loader = modules[path];
  if (!loader) return null;
  const raw = (await loader()) as string;
  const { meta, content } = parseFrontmatter(raw);
  return {
    slug,
    title: meta.title || 'Untitled',
    date: meta.date || '',
    excerpt: meta.excerpt || '',
    author: meta.author || 'Katie Robblee',
    content,
  };
}
