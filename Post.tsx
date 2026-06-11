/*
 * SCALIZE SYSTEMS — Individual Article/Post Page
 * Design: Refined Editorial | White bg | Playfair Display headlines | DM Sans body
 * Renders Markdown content from /content/writing/*.md files
 * Includes author bio and Calendly CTA at bottom
 */

import { useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { marked } from 'marked';
import { getPostBySlug, type Post } from './posts';
import Navbar from './Navbar';
import Footer from './Footer';

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function PostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug).then(async (p) => {
      setPost(p);
      if (p) {
        const rendered = await marked(p.content);
        setHtml(rendered);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#3D4A5C' }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#073C81' }}
          >
            Article not found.
          </h1>
          <Link
            href="/writing"
            className="text-sm font-medium no-underline"
            style={{ color: '#046CC5', fontFamily: 'DM Sans, sans-serif' }}
          >
            ← Back to Writing
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Article header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1 text-sm no-underline mb-8 transition-colors duration-150"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B8AB5' }}
          >
            ← Writing
          </Link>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#073C81' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <span
              className="text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif', color: '#3D4A5C' }}
            >
              {post.author}
            </span>
            <span style={{ color: '#c8d4e8' }}>·</span>
            <span
              className="text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B8AB5' }}
            >
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="pb-16" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <div
            className="prose-scalize"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      {/* Author bio */}
      <section className="section-band" style={{ background: '#F5F7FA' }}>
        <div className="container max-w-3xl">
          <div
            className="p-7 rounded-sm"
            style={{ background: 'white', border: '1px solid #e5e9f0', borderLeft: '3px solid #078279' }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: '#078279', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.12em' }}
            >
              About the author
            </p>
            <p
              className="text-base font-semibold mb-2"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#073C81' }}
            >
              Katie Robblee
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif', color: '#3D4A5C', lineHeight: '1.75' }}
            >
              Founder of Scalize Systems. I work with pre-seed through Series C growth-stage companies to build, optimize, and scale operational systems. My background spans product management, product operations, technical program management, and engineering management.
            </p>
          </div>
        </div>
      </section>

      {/* Calendly CTA */}
      <section className="section-band" style={{ background: '#073C81' }}>
        <div className="container max-w-3xl text-center">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: 'white' }}
          >
            Does this resonate?
          </h2>
          <p
            className="text-base mb-8"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#9BB8E0' }}
          >
            A 15-minute call to see if there's a fit.
          </p>
          <Link
            href="/contact"
            className="inline-block px-7 py-3.5 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
            style={{ background: '#078279', color: 'white', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#056b63')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#078279')}
          >
            Book a free 15-minute call
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
