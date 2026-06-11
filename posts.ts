/**
 * Blog/Writing utilities
 * Articles are written and managed in Sanity Studio (the "Scalize Writing CMS" project)
 * and fetched here via the Sanity content API.
 */

import { sanityClient } from './sanity';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  image?: any;
}

export interface Post extends PostMeta {
  body: any[];
}

const LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current,
  title,
  "date": publishedAt,
  "excerpt": pt::text(body)[0...200],
  image
}`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  "date": publishedAt,
  "excerpt": pt::text(body)[0...200],
  image,
  body
}`;

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await sanityClient.fetch(LIST_QUERY);
  return posts.map((p: any) => ({
    ...p,
    date: p.date || '',
    excerpt: p.excerpt || '',
    author: 'Katie Robblee',
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await sanityClient.fetch(POST_QUERY, { slug });
  if (!post) return null;
  return {
    ...post,
    date: post.date || '',
    excerpt: post.excerpt || '',
    author: 'Katie Robblee',
    body: post.body || [],
  };
}
