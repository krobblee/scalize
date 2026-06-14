# scalize
Scalize Systems website

## Content (Library)

The `/writing` (Library) and `/writing/:slug` pages are powered by **Sanity CMS** (project "Scalize Writing CMS").

- **Studio (write/edit content):** https://scalize.sanity.studio/
- **Project ID:** `z13orr0o`
- **Dataset:** `production` (public read access, no API token required)
- **Studio source:** maintained separately at `scalize-studio` (sibling project, not part of this repo). Schema changes are made there and deployed with `npx sanity deploy`.

### How it works

- [`sanity.ts`](sanity.ts) configures the Sanity client and image URL builder.
- [`posts.ts`](posts.ts) fetches content from Sanity via GROQ: `getAllPosts`/`getPostBySlug` (articles), `getTemplatesAndTools`, `getPodcastEpisode`, `getLinkedInPosts`.
- [`Writing.tsx`](Writing.tsx) renders the Library page's four sections — Articles, Templates & Tools, Podcast, LinkedIn — each capped at 5 items with a "Show more" expansion.
- [`Post.tsx`](Post.tsx) renders an individual article's `body` (Portable Text) via `@portabletext/react`.

Content only appears once **published** in Studio (drafts are not shown). The site reads through Sanity's CDN, so changes typically appear within ~1 minute.

### Environment variables

Required for both local dev and Vercel deployments:

```
VITE_SANITY_PROJECT_ID=z13orr0o
VITE_SANITY_DATASET=production
```

- Local dev: copy `.env.example` to `.env.local` (already gitignored).
- Vercel: add both vars under Project Settings → Environment Variables for all environments.

### Editing or removing content

Content changes (publish/unpublish/edit a post) are independent of code deploys — no rebuild needed, and any post can be unpublished from Studio at any time without affecting the codebase.
