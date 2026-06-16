/*
 * SCALIZE SYSTEMS — About Page
 * Design: Refined Editorial | Inter font | brand palette
 * Layout: Standard page header, centered name/title, inline right-aligned headshot with bio copy
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>About | Scalize Systems</title>
        <meta property="og:title" content="About | Scalize Systems" />
        <meta property="og:description" content="Scalize Systems partners with pre-seed through Series C growth stage companies to build operating infrastructure, develop AI strategy, and remove friction from processes so organizations can scale with confidence." />
        <meta property="og:url" content="https://scalizesystems.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>About</h1>
          </FadeSection>
        </div>
      </section>

      {/* Bio — centered name/title, then body copy with inline right-aligned headshot */}
      <section className="section-band pt-12 md:pt-14" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <div className="text-center mb-8 md:mb-10">
              <h2
                className="text-2xl md:text-3xl font-bold leading-tight"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
              >
                Katie Robblee
              </h2>
              <p
                className="text-base mt-1"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
              >
                Founder, Scalize Systems
              </p>
            </div>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-5">
              <p
                className="text-base leading-relaxed flow-root"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
                <img
                  src="/assets/images/katie-headshot-charcoal-720.png"
                  alt="Katie Robblee, Founder of Scalize Systems"
                  className="block w-40 sm:w-48 md:w-56 lg:w-64 rounded-sm object-cover mb-5 sm:mb-4 sm:ml-8 md:ml-10 sm:float-right"
                  width="720"
                  height="832"
                />
                I'm Katie Robblee and my background spans product management, product operations, technical program management, and engineering management. I build the operating infrastructure that allows product and engineering teams to work with less friction and greater efficiency. Over the course of my career I have worked across ed tech, legal tech, supply chain, enterprise billing, and SMB, on SaaS and enterprise products at companies ranging from pre-seed to multibillion dollar scale, and have overseen product lines exceeding $3B in gross revenue.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
                I founded Scalize Systems because the same set of problems keeps showing up regardless of industry, stage, or size. Leadership is unclear on objectives and success criteria. Teams don't have a shared understanding of priorities, roles, or accountability. Handoffs between functions are messy, context gets lost, and the communication infrastructure to prevent that doesn't exist. And organizations rush into building before the foundation is in place, without thinking through how the work will be maintained, monitored, measured, or rolled out.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
                I bring a wealth of experience with failure. I have seen why projects don't work out, where the risks live inside an organization, and what it takes to get work back on track. I build lightweight processes that give teams a clear framework for what they're supposed to do and how to measure whether it's working. I coach leaders to define objectives that are specific enough to break into milestones, so there are markers along the way that tell us early if something is drifting off course.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
                I excel at systems thinking and can operate across multiple layers of complexity at once, moving between the 30,000 foot view and the ground level without losing either one. A lot of companies don't know what good looks like. That's what I bring to the table.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
                I live in New England with my two dogs and spend most mornings walking in the woods. I practice Krav Maga and Brazilian Jiu-Jitsu, have lived and studied in Morocco and Turkey, and like to try to recreate recipes from the far flung places I've traveled.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CTAs */}
      <section className="section-band" style={{ background: '#073C81' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/services"
                className="inline-block px-7 py-3.5 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
                style={{ background: '#078279', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#056b63')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#078279')}
              >
                View services
              </Link>
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
                style={{ background: 'transparent', color: 'white', fontFamily: 'Inter, system-ui, sans-serif', border: '1px solid rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Get in touch
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
