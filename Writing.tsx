/*
 * SCALIZE SYSTEMS — Writing Page
 * Design: Refined Editorial | White bg | Playfair Display headlines | DM Sans body
 * Articles are loaded from the Sanity "Scalize Writing CMS" project — no hardcoded posts
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getAllPosts, type PostMeta } from './posts';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Writing() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((p) => {
      setPosts(p);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Navbar />

      {/* Page header — no label per approved copy */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>Writing</h1>
          </FadeSection>
        </div>
      </section>

      {/* Articles list */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-3xl">
          {loading ? (
            <div
              className="text-sm"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
            >
              Loading articles...
            </div>
          ) : posts.length === 0 ? (
            <FadeSection>
              <div
                className="py-12 text-center"
                style={{ border: '1px dashed #c8d4e8', borderRadius: '4px' }}
              >
                <p
                  className="text-base mb-2"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                >
                  Articles coming soon.
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
                >
                  Check back after launch for writing on operations, AI systems, and scaling teams.
                </p>
              </div>
            </FadeSection>
          ) : (
            <div className="flex flex-col gap-0">
              {posts.map((post, i) => (
                <FadeSection key={post.slug} delay={i * 50}>
                  <Link href={`/writing/${post.slug}`} className="block no-underline group">
                    <div
                      className="py-8 border-b transition-colors duration-150"
                      style={{ borderColor: '#e5e9f0' }}
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                        <h2
                          className="text-xl font-semibold transition-colors duration-150 group-hover:text-blue-700"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                        >
                          {post.title}
                        </h2>
                        <span
                          className="text-xs flex-shrink-0"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}
                        >
                          {formatDate(post.date)}
                        </span>
                      </div>
                      {post.excerpt && (
                        <p
                          className="text-sm leading-relaxed mb-3"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}
                        >
                          {post.author}
                        </span>
                        <span
                          className="text-xs font-medium transition-colors duration-150 group-hover:text-blue-600"
                          style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
