# scalize
Scalize Systems website

## Content (Writing / Blog)

The `/writing` and `/writing/:slug` pages are powered by **Sanity CMS** (project "Scalize Writing CMS").

- **Studio (write/edit posts):** https://www.sanity.io/@oQyJYQm13/studio/g621g2fn9e74v171cunozm5g/default
- **Project ID:** `z13orr0o`
- **Dataset:** `production` (public read access, no API token required)

### How it works

- [`sanity.ts`](sanity.ts) configures the Sanity client and image URL builder.
- [`posts.ts`](posts.ts) fetches posts from Sanity via GROQ (`getAllPosts`, `getPostBySlug`).
- [`Writing.tsx`](Writing.tsx) lists published posts.
- [`Post.tsx`](Post.tsx) renders an individual post's `body` (Portable Text) via `@portabletext/react`.

Posts only appear once **published** in Studio (drafts are not shown). The site reads through Sanity's CDN, so changes typically appear within ~1 minute.

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
