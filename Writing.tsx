/*
 * SCALIZE SYSTEMS — Library Page
 * Design: Refined Editorial | White bg | Playfair Display headlines | DM Sans body
 * Four sections (Articles, Templates & Tools, Podcast, LinkedIn), alternating
 * white / light-blue bands, content loaded from the Sanity "Scalize Writing CMS" project
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import {
  getAllPosts,
  getTemplatesAndTools,
  getPodcastEpisode,
  getLinkedInPosts,
  type PostMeta,
  type TemplateOrTool,
  type PodcastEpisode,
  type LinkedInPost,
} from './posts';
import { urlForImage } from './sanity';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

const MAX_ITEMS = 5;

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm font-semibold uppercase tracking-[0.2em] mb-10 text-center"
      style={{ color: '#078279', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {children}
    </p>
  );
}

function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        className="text-sm font-medium no-underline transition-colors duration-150"
        style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#046CC5', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Show more →
      </button>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <FadeSection>
      <div
        className="py-12 text-center"
        style={{ border: '1px dashed #c8d4e8', borderRadius: '4px' }}
      >
        <p
          className="text-base mb-2"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
        >
          {title}
        </p>
        <p
          className="text-sm"
          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
        >
          {body}
        </p>
      </div>
    </FadeSection>
  );
}

function Thumbnail({ image, size }: { image?: any; size: number }) {
  const src = image ? urlForImage(image).width(size * 2).height(size * 2).fit('crop').url() : null;
  return (
    <div
      className="flex-shrink-0 overflow-hidden"
      style={{ width: size, height: size, background: '#EEF1F6', border: '1px solid #e5e9f0', borderRadius: '4px' }}
    >
      {src && (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

export default function Writing() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [templates, setTemplates] = useState<TemplateOrTool[]>([]);
  const [podcast, setPodcast] = useState<PodcastEpisode | null>(null);
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const [showAllLinkedIn, setShowAllLinkedIn] = useState(false);

  useEffect(() => {
    Promise.all([getAllPosts(), getTemplatesAndTools(), getPodcastEpisode(), getLinkedInPosts()]).then(
      ([p, t, pod, li]) => {
        setPosts(p);
        setTemplates(t);
        setPodcast(pod);
        setLinkedInPosts(li);
        setLoading(false);
      }
    );
  }, []);

  const visiblePosts = showAllArticles ? posts : posts.slice(0, MAX_ITEMS);
  const visibleTemplates = showAllTemplates ? templates : templates.slice(0, MAX_ITEMS);
  const visibleLinkedIn = showAllLinkedIn ? linkedInPosts : linkedInPosts.slice(0, MAX_ITEMS);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>Library</h1>
          </FadeSection>
        </div>
      </section>

      {/* Articles */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <SectionTitle>Articles</SectionTitle>
          </FadeSection>

          {loading ? (
            <div className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}>
              Loading articles...
            </div>
          ) : posts.length === 0 ? (
            <EmptyState
              title="Articles coming soon."
              body="Check back after launch for writing on operations, AI systems, and scaling teams."
            />
          ) : (
            <>
              <div className="flex flex-col gap-0">
                {visiblePosts.map((post, i) => (
                  <FadeSection key={post.slug} delay={i * 50}>
                    <Link href={`/writing/${post.slug}`} className="block no-underline group">
                      <div className="py-8 border-b transition-colors duration-150" style={{ borderColor: '#e5e9f0' }}>
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                          <h2
                            className="text-xl font-semibold transition-colors duration-150 group-hover:text-blue-700"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                          >
                            {post.title}
                          </h2>
                          <span className="text-xs flex-shrink-0" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}>
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
                          <span className="text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}>
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
              {!showAllArticles && posts.length > MAX_ITEMS && (
                <ShowMoreButton onClick={() => setShowAllArticles(true)} />
              )}
            </>
          )}
        </div>
      </section>

      {/* Templates & Tools */}
      <section className="section-band" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <SectionTitle>Templates &amp; Tools</SectionTitle>
          </FadeSection>

          {loading ? (
            <div className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}>
              Loading...
            </div>
          ) : templates.length === 0 ? (
            <EmptyState
              title="Templates & tools coming soon."
              body="Practical resources for operators will be available here after launch."
            />
          ) : (
            <>
              <div className="flex flex-col gap-0">
                {visibleTemplates.map((item, i) => (
                  <FadeSection key={item._id} delay={i * 50}>
                    <div className="py-6 border-b flex items-start gap-4" style={{ borderColor: '#e5e9f0' }}>
                      <Thumbnail image={item.thumbnail} size={72} />
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
                          {item.title}
                        </h3>
                        <p className="text-xs mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}>
                          {item.date ? formatDate(item.date) : 'Coming soon'}
                        </p>
                        {(item.downloadUrl || item.fileUrl) && (
                          <a
                            href={item.downloadUrl || item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium no-underline"
                            style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                          >
                            Download →
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
              {!showAllTemplates && templates.length > MAX_ITEMS && (
                <ShowMoreButton onClick={() => setShowAllTemplates(true)} />
              )}
            </>
          )}
        </div>
      </section>

      {/* Podcast */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <SectionTitle>Podcast</SectionTitle>
          </FadeSection>

          {loading ? (
            <div className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}>
              Loading...
            </div>
          ) : !podcast ? (
            <EmptyState
              title="Podcast appearances coming soon."
              body="Episodes featuring Katie will be linked here after launch."
            />
          ) : (
            <FadeSection>
              <div className="flex items-start gap-5">
                <Thumbnail image={podcast.thumbnail} size={88} />
                <div className="flex-1">
                  <p className="text-xs mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}>
                    {podcast.showName} · {podcast.host}
                  </p>
                  <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
                    {podcast.episodeTitle}
                  </h3>
                  {podcast.description && (
                    <p className="text-sm leading-relaxed mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}>
                      {podcast.description}
                    </p>
                  )}
                  <a
                    href={podcast.listenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium no-underline"
                    style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Listen →
                  </a>
                </div>
              </div>
            </FadeSection>
          )}
        </div>
      </section>

      {/* LinkedIn */}
      <section className="section-band" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <SectionTitle>LinkedIn</SectionTitle>
          </FadeSection>

          {loading ? (
            <div className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}>
              Loading...
            </div>
          ) : linkedInPosts.length === 0 ? (
            <EmptyState
              title="LinkedIn posts coming soon."
              body="Recent posts will be linked here after launch."
            />
          ) : (
            <>
              <div className="flex flex-col gap-0">
                {visibleLinkedIn.map((item, i) => (
                  <FadeSection key={item._id} delay={i * 50}>
                    <div className="py-6 border-b flex items-start gap-4" style={{ borderColor: '#e5e9f0' }}>
                      <Thumbnail image={item.thumbnail} size={72} />
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
                          {item.title}
                        </h3>
                        <p className="text-xs mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}>
                          {formatDate(item.date)}
                        </p>
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium no-underline"
                          style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          View on LinkedIn →
                        </a>
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
              {!showAllLinkedIn && linkedInPosts.length > MAX_ITEMS && (
                <ShowMoreButton onClick={() => setShowAllLinkedIn(true)} />
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
