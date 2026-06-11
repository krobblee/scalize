/*
 * SCALIZE SYSTEMS — About Page
 * Design: Refined Editorial | Inter font | brand palette
 * Layout: Photo + name/title inline at top of bio section, no separate header band
 */

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
      <Navbar />

      {/* Bio — photo + name/title inline, then body copy */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            {/* Photo + name/title row */}
            <div className="flex items-center gap-6 mb-8">
              <div
                aria-label="Katie Robblee"
                className="rounded-sm flex-shrink-0 flex items-center justify-center text-4xl font-bold"
                style={{ width: '120px', height: '120px', background: '#073C81', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                KR
              </div>
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold leading-tight"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                >
                  Katie Robblee
                </h1>
                <p
                  className="text-base mt-1"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
                >
                  Founder, Scalize Systems
                </p>
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-5">
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
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
