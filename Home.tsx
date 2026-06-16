/*
 * SCALIZE SYSTEMS — Home Page
 * Design: Refined Editorial | White bg | Inter font
 * Sections: Hero (no label), Positioning, Services Preview, Case Studies Preview, Writing Preview
 * Max content width: max-w-4xl for readability
 * Calendly: Contact page only
 */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';
import StatsCarousel from './StatsCarousel';
import { getAllPosts, type PostMeta } from './posts';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Home() {
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    getAllPosts().then((all) => setPosts(all.slice(0, 3)));
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>Scalize Systems | Operational Systems for Growth-Stage Companies</title>
        <meta property="og:title" content="Scalize Systems | Operational Systems for Growth-Stage Companies" />
        <meta property="og:description" content="Scalize Systems partners with pre-seed through Series C growth stage companies to build operating infrastructure, develop AI strategy, and remove friction from processes so organizations can scale with confidence." />
        <meta property="og:url" content="https://scalizesystems.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      {/* Hero — no label above headline */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-12" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-7"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
            >
              Operational systems for companies scaling faster than their processes can support.
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-9 max-w-2xl"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
            >
              I build scalable processes, design decision frameworks, and help teams figure out where AI adds value and where humans need to stay in the loop.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
              style={{
                background: '#073C81',
                color: 'white',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#046CC5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#073C81')}
            >
              Get in touch
            </Link>
          </FadeSection>
        </div>
      </section>

      {/* Positioning paragraph — exact copy from brief */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.85' }}
            >
              Most organizations set priorities but don't have the tools in place to see where teams are expending the majority of their efforts. That gap makes it difficult for leadership to know where to course correct. Scalize Systems identifies the right signals through Slack messages, Jira tickets, Git commits, meeting transcripts, customer feedback, and sales calls, and surfaces where priorities and effort diverge. Then I build the plan and implement lightweight processes to close them.
            </p>
          </FadeSection>
        </div>
      </section>

      <StatsCarousel />

      {/* Services Preview */}
      <section className="section-band" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <div className="flex items-baseline justify-between mb-10">
              <h2
                className="text-xl md:text-2xl font-semibold"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
              >
                Services
              </h2>
              <Link
                href="/services"
                className="text-sm font-medium no-underline transition-colors duration-150"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#046CC5' }}
              >
                View all →
              </Link>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeSection delay={0}>
              <Link href="/services#operating-diagnostic" className="block no-underline group h-full">
                <div
                  className="h-full p-7 rounded-sm border transition-shadow duration-200 group-hover:shadow-md"
                  style={{ borderColor: '#e5e9f0', background: 'white', borderLeft: '3px solid #078279' }}
                >
                  <h3
                    className="text-lg font-semibold mb-3 transition-colors duration-150"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                  >
                    Operating Diagnostic
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}
                  >
                    A two to three week engagement that maps how your organization operates, where effort is going, and where the friction is.
                  </p>
                </div>
              </Link>
            </FadeSection>
            <FadeSection delay={60}>
              <Link href="/services#build-engagement" className="block no-underline group h-full">
                <div
                  className="h-full p-7 rounded-sm border transition-shadow duration-200 group-hover:shadow-md"
                  style={{ borderColor: '#e5e9f0', background: 'white', borderLeft: '3px solid #078279' }}
                >
                  <h3
                    className="text-lg font-semibold mb-3 transition-colors duration-150"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                  >
                    Build Engagement
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}
                  >
                    A three to six month engagement scoped directly from the diagnostic findings, producing processes and frameworks and a plan to scale them with the company.
                  </p>
                </div>
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <div className="flex items-baseline justify-between mb-10">
              <h2
                className="text-xl md:text-2xl font-semibold"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
              >
                Case Studies
              </h2>
              <Link
                href="/case-studies"
                className="text-sm font-medium no-underline transition-colors duration-150"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#046CC5' }}
              >
                View all →
              </Link>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <FadeSection delay={0} className="h-full">
              <Link href="/case-studies#legal-tech" className="block no-underline group h-full">
                <div
                  className="p-7 rounded-sm border transition-shadow duration-200 group-hover:shadow-md h-full flex flex-col"
                  style={{ borderColor: '#e5e9f0', background: 'white', borderLeft: '3px solid #046CC5' }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Legal Technology', 'LLM Extension', 'Human-in-the-Loop'].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#EEF1F6', color: '#3D4A5C', fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-base font-semibold mb-2 transition-colors duration-150"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                  >
                    Expanding an AI Product into a New Market
                  </h3>
                  <span
                    className="text-xs font-medium mt-auto pt-3 block"
                    style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            </FadeSection>
            <FadeSection delay={60} className="h-full">
              <Link href="/case-studies#supply-chain" className="block no-underline group h-full">
                <div
                  className="p-7 rounded-sm border transition-shadow duration-200 group-hover:shadow-md h-full flex flex-col"
                  style={{ borderColor: '#e5e9f0', background: 'white', borderLeft: '3px solid #046CC5' }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['E-Commerce', 'Supply Chain Operations', 'Cross-Functional Build'].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: '#EEF1F6', color: '#3D4A5C', fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-base font-semibold mb-2 transition-colors duration-150"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                  >
                    Unlocking Growth at Scale Through a First-of-Its-Kind Supply Chain Data Architecture
                  </h3>
                  <span
                    className="text-xs font-medium mt-auto pt-3 block"
                    style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Writing Preview — 3 most recent articles from /content/writing/ */}
      <section className="section-band" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <div className="flex items-baseline justify-between mb-10">
              <h2
                className="text-xl md:text-2xl font-semibold"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
              >
                Writing
              </h2>
              <Link
                href="/writing"
                className="text-sm font-medium no-underline transition-colors duration-150"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#046CC5' }}
              >
                View all →
              </Link>
            </div>
          </FadeSection>

          {posts.length === 0 ? (
            <FadeSection>
              <div
                className="py-10 text-center"
                style={{ border: '1px dashed #c8d4e8', borderRadius: '4px' }}
              >
                <p
                  className="text-sm"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
                >
                  Articles coming soon.
                </p>
              </div>
            </FadeSection>
          ) : (
            <div className="flex flex-col">
              {posts.map((post, i) => (
                <FadeSection key={post.slug} delay={i * 50}>
                  <Link href={`/writing/${post.slug}`} className="block no-underline group">
                    <div
                      className="py-7 border-b transition-colors duration-150"
                      style={{ borderColor: '#e5e9f0' }}
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                        <h3
                          className="text-base font-semibold transition-colors duration-150 group-hover:text-blue-700"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                        >
                          {post.title}
                        </h3>
                        <span
                          className="text-xs flex-shrink-0"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#6B8AB5' }}
                        >
                          {formatDate(post.date)}
                        </span>
                      </div>
                      {post.excerpt && (
                        <p
                          className="text-sm leading-relaxed mb-2"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <span
                        className="text-xs font-medium"
                        style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        Read →
                      </span>
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
