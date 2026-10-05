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

const oneLine = (text) => text.replace(/\s+/g, ' ').trim();

// Structured data (schema.org JSON-LD): states key facts in a format search engines and AI agents read directly.
const SITE = 'https://www.scalizesystems.com';
const ORG_ID = `${SITE}/#organization`;
const PERSON_ID = `${SITE}/about#katie-robblee`;
const organization = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Scalize Systems',
  url: SITE,
  logo: `${SITE}/assets/images/scalize-logo-horizontal.png`,
  image: `${SITE}/assets/images/scalize-logo-horizontal.png`,
  email: 'katie@scalizesystems.com',
  description:
    'Scalize Systems reimagines product and software development lifecycles for growth-stage companies, designing and building the workflows, decision frameworks, and handoffs that work for humans and agents.',
  founder: { '@id': PERSON_ID },
  address: { '@type': 'PostalAddress', addressRegion: 'MA', addressCountry: 'US' },
  areaServed: 'Worldwide',
};
const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Katie Robblee',
  jobTitle: 'Founder',
  worksFor: { '@id': ORG_ID },
  url: `${SITE}/about`,
  image: `${SITE}/assets/images/katie-headshot-charcoal-720.png`,
  email: 'katie@scalizesystems.com',
  homeLocation: { '@type': 'Place', name: 'Outside of Boston, Massachusetts' },
  sameAs: ['https://www.linkedin.com/in/katierobblee/'],
};
const services = [
  {
    '@type': 'Service',
    name: 'Operating Diagnostic',
    provider: { '@id': ORG_ID },
    description:
      'A two to three week engagement that maps how your organization operates across the PDLC and SDLC, where effort is going, which work belongs to humans, agents, or both, and where the friction is.',
  },
  {
    '@type': 'Service',
    name: 'Build Engagement',
    provider: { '@id': ORG_ID },
    description:
      'A three to six month engagement scoped directly from the diagnostic findings, producing human and agent ready processes, decision frameworks, and an executable plan to scale and measure reimagined processes across the organization.',
  },
];

// First ~200 characters of the article's text, cut at a word boundary.
function articleSummary(post) {
  const text = oneLine(
    (post.body || [])
      .filter((b) => b._type === 'block')
      .map((b) => (b.children || []).map((c) => c.text || '').join(''))
      .join(' '),
  );
  if (text.length <= 200) return text;
  return `${text.slice(0, 200).replace(/\s+\S*$/, '')}…`;
}

function structuredData(url, data) {
  const graph = [organization, person];
  if (url === '/services') graph.push(...services.map((s) => ({ ...s, url: `${SITE}/services` })));
  const post = url.startsWith('/writing/') ? data[`post:${url.slice('/writing/'.length)}`] : null;
  if (post) {
    graph.push({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE}${url}`,
      mainEntityOfPage: `${SITE}${url}`,
      ...(articleSummary(post) && { description: articleSummary(post) }),
      author: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID },
      ...(post.date && { datePublished: post.date }),
      ...(post.image && {
        image: server.urlForImage(post.image).width(1200).height(630).fit('crop').url(),
      }),
    });
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
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
    .replace('</head>', `${headTags}${structuredData(url, data)}<script>window.__PRERENDER_DATA__=${json}</script></head>`);
  if (headTags.includes('<title>')) page = page.replace('<title>Scalize Systems</title>', '');

  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), page);
  console.log(`prerendered ${url}`);
}

// sitemap.xml: every page on this site, including each article, rebuilt from Sanity on every build.
const SITEMAP_HOST = 'https://scalizesystems.com';
const sitemapEntries = [
  { url: '/', priority: '1.0', changefreq: 'monthly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/how-i-work', priority: '0.8', changefreq: 'monthly' },
  { url: '/case-studies', priority: '0.8', changefreq: 'monthly' },
  { url: '/writing', priority: '0.7', changefreq: 'weekly' },
  { url: '/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/resources/graduated-hitl-eval-ownership-model', priority: '0.6', changefreq: 'monthly' },
  ...posts.map((p) => ({ url: `/writing/${p.slug}`, priority: '0.6', changefreq: 'monthly', lastmod: p.date })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(({ url, priority, changefreq, lastmod }) =>
    [
      '  <url>',
      `    <loc>${SITEMAP_HOST}${url}</loc>`,
      lastmod ? `    <lastmod>${lastmod.slice(0, 10)}</lastmod>` : null,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`wrote sitemap.xml (${sitemapEntries.length} pages)`);

// llms.txt: a plain-text summary of the site for AI agents (https://llmstxt.org).
const llms = `# Scalize Systems

> Scalize Systems reimagines product and software development lifecycles for growth-stage companies, designing and building the workflows, decision frameworks, and handoffs that work for humans and agents.

Scalize Systems was founded by Katie Robblee, whose background spans product management, product operations, technical program management, and engineering management. Traditional product and software development processes don't work with AI. Scalize Systems helps teams reimagine workflows, decision frameworks, and systemwide handoffs to work for humans and agents alike, so they can ship faster with clear accountability at every stage of the build lifecycle.

Engagements:
- Operating Diagnostic (two to three weeks): maps how an organization operates across the PDLC and SDLC, where effort is going, which work belongs to humans, agents, or both, and where the friction is. Deliverables are a Process Alignment Map, a Decision Friction Audit, and a Prioritized Recommendation Roadmap.
- Build Engagement (three to six months): scoped directly from the diagnostic findings, producing human and agent ready processes, decision frameworks, and an executable plan to scale and measure reimagined processes across the organization.

Contact: katie@scalizesystems.com, or book a free 15-minute consultation at ${SITE}/contact

## Pages

- [Services](${SITE}/services): Operating Diagnostic and Build Engagement in detail
- [How I Work](${SITE}/how-i-work): methodology and engagement arc
- [Case Studies](${SITE}/case-studies): client problems, the work, and results
- [About](${SITE}/about): Katie Robblee's background
- [Contact](${SITE}/contact): get in touch or book a consultation
- [Graduated HITL Eval Ownership Model](${SITE}/resources/graduated-hitl-eval-ownership-model): a step-by-step framework for building product judgment through human-in-the-loop evaluation, with a PDF download

## Articles

${posts.map((p) => `- [${p.title}](${SITE}/writing/${p.slug})`).join('\n')}

## Templates and Tools

${templates
  .filter((t) => t.downloadUrl || t.fileUrl)
  .map((t) => `- [${t.title}](${t.downloadUrl || t.fileUrl})${t.description ? `: ${oneLine(t.description)}` : ''}`)
  .join('\n')}
${podcast ? `
## Podcast

- [${podcast.episodeTitle}](${podcast.listenUrl}): ${podcast.showName}, hosted by ${podcast.host}${podcast.description ? `. ${oneLine(podcast.description)}` : ''}
` : ''}${linkedInPosts.length ? `
## LinkedIn Posts

${linkedInPosts.map((l) => `- [${l.title}](${l.externalUrl.split('?')[0]})`).join('\n')}
` : ''}
## Optional

- [Library](${SITE}/writing): all articles, templates and tools, podcast, and LinkedIn posts in one place
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
console.log('wrote llms.txt');

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
