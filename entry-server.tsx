/**
 * Used only at build time by prerender.mjs: turns one page of the site into
 * finished HTML so visitors and AI agents get real content without running JavaScript.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { PrefetchData } from './prefetch';

export { getAllPosts, getPostBySlug, getTemplatesAndTools, getPodcastEpisode } from './posts';
export { urlForImage } from './sanity';
export { AI_RACI, CASE_STUDY_PAGES, HERO, HUMANS_AGENTS, INTRO_CALL, PROOF, SERVICES } from './siteCopy';

export function render(url: string, data: PrefetchData) {
  return renderToString(
    <React.StrictMode>
      <App ssrPath={url} helmetContext={{}} data={data} />
    </React.StrictMode>,
  );
}
