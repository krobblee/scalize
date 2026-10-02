/**
 * Runs after `vite build` (see the "build" script in package.json).
 * Saves a finished HTML file for every page, including each Sanity article,
 * so people and AI agents get the full page content without running JavaScript.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const server = await import(path.join(root, 'dist-ssr', 'entry-server.js'));

const STATIC_ROUTES = [
  '/',
  '/services',
  '/how-i-work',
  '/case-studies',
  '/about',
  '/contact',
  '/resources/graduated-hitl-eval-ownership-model',
];

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

// Unknown URLs (and articles published after this build) fall back to the plain app shell.
fs.writeFileSync(path.join(dist, 'app-shell.html'), template);

const [posts, templates, podcast, linkedInPosts] = await Promise.all([
  server.getAllPosts(),
  server.getTemplatesAndTools(),
  server.getPodcastEpisode(),
  server.getLinkedInPosts(),
]);

const pages = STATIC_ROUTES.map((url) => ({
  url,
  data: url === '/' ? { homePosts: posts.slice(0, 3) } : {},
}));
pages.push({ url: '/writing', data: { writing: { posts, templates, podcast, linkedInPosts } } });
for (const { slug } of posts) {
  const post = await server.getPostBySlug(slug);
  if (post) pages.push({ url: `/writing/${slug}`, data: { [`post:${slug}`]: post } });
}

for (const { url, data } of pages) {
  const rendered = server.render(url, data);
  // React places page <title>/<meta>/<link> tags at the start of its output; move them into <head>.
  const headTags = rendered.match(/^(?:<title>[^<]*<\/title>|<(?:meta|link)\b[^>]*\/?>)*/)[0];
  const html = rendered.slice(headTags.length);
  // Keep "<" out of the embedded JSON so article text can't close the script tag early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  let page = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `${headTags}<script>window.__PRERENDER_DATA__=${json}</script></head>`);
  if (headTags.includes('<title>')) page = page.replace('<title>Scalize Systems</title>', '');

  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), page);
  console.log(`prerendered ${url}`);
}

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
