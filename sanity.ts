import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'z13orr0o',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-06-11',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source);
}
