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

export interface TemplateOrTool {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: any;
  downloadUrl?: string;
  fileUrl?: string;
  date?: string;
}

export interface PodcastEpisode {
  _id: string;
  showName: string;
  host: string;
  episodeTitle: string;
  description?: string;
  thumbnail?: any;
  listenUrl: string;
  date: string;
}

export interface LinkedInPost {
  _id: string;
  title: string;
  thumbnail?: any;
  externalUrl: string;
  date: string;
}

const TEMPLATES_QUERY = `*[_type == "templateOrTool"] | order(date desc){
  _id,
  title,
  description,
  thumbnail,
  downloadUrl,
  "fileUrl": file.asset->url,
  date
}`;

const PODCAST_QUERY = `*[_type == "podcastEpisode"] | order(date desc)[0]{
  _id,
  showName,
  host,
  episodeTitle,
  description,
  thumbnail,
  listenUrl,
  date
}`;

const LINKEDIN_QUERY = `*[_type == "linkedinPost"] | order(date desc){
  _id,
  title,
  thumbnail,
  externalUrl,
  date
}`;

export async function getTemplatesAndTools(): Promise<TemplateOrTool[]> {
  return sanityClient.fetch(TEMPLATES_QUERY);
}

export async function getPodcastEpisode(): Promise<PodcastEpisode | null> {
  return sanityClient.fetch(PODCAST_QUERY);
}

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  return sanityClient.fetch(LINKEDIN_QUERY);
}
