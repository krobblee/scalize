/**
 * Content fetched from Sanity at build time (see prerender.mjs).
 * Pages use it as their starting state so the saved HTML already contains
 * the article text, then still fetch fresh content in the browser.
 */

import { createContext, useContext } from 'react';

export type PrefetchData = Record<string, any>;

const PrefetchContext = createContext<PrefetchData>({});

export const PrefetchProvider = PrefetchContext.Provider;

export function usePrefetched<T>(key: string): T | undefined {
  return useContext(PrefetchContext)[key];
}
