/*
 * SCALIZE SYSTEMS — How I Work Page
 * Design: Refined Editorial | White bg | Playfair Display headlines | DM Sans body
 * Sections: Methodology, Engagement Arc (4 phases), Knowledge Transfer
 */

import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

const PHASES = [
  {
    number: '01',
    title: 'Operating Diagnostic',
    duration: 'Two to three weeks',
    desc: 'The engagement begins with the diagnostic. I conduct structured interviews and workshops with the project sponsor, core decision makers, and key team members, and review internal documentation, OKRs, and the places where work actually happens. At the end, I deliver three artifacts: a process alignment map, a decision friction audit, and a prioritized recommendation roadmap. The findings presentation is a working session, not a report handoff.',
  },
  {
    number: '02',
    title: 'Build Scoping',
    duration: 'One week',
    desc: 'If the diagnostic surfaces work worth building, I scope the build directly from the findings, tying every item in the scope to a specific gap identified in the diagnostic. Nothing gets added because it seems useful in the abstract.',
  },
  {
    number: '03',
    title: 'Build Engagement',
    duration: 'Three to six months',
    desc: 'The build is a mix of structured working sessions, async document review, and time spent in meetings observing how teams operate. Deliverables are defined at scoping and do not shift without a documented reason. The engagement closes with a before-and-after operating view, a decision-making framework, and a 30/60/90 day plan with clear milestones and accountable owners.',
  },
  {
    number: '04',
    title: 'Knowledge Transfer',
    duration: 'Ongoing through engagement close',
    desc: 'Every process is documented before the engagement closes, and the goal is a team that can run the system without me in the room.',
  },
];

export default function HowIWork() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Navbar />

      {/* Page header — no label per approved copy */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>How I Work</h1>
          </FadeSection>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <h2
              className="text-2xl md:text-3xl font-semibold leading-snug mb-8 text-center"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
            >
              Methodology
            </h2>
            <div className="flex flex-col gap-5">
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
                >
                  As an outside observer, I'm able to provide a fresh perspective, identifying any potential blind spots. I use a variety of methods to uncover how work moves across an organization and where any gaps in ownership, process, or expected value might exist.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
                >
                  My job is to close those gaps. I do it by going to the source: Slack threads, Jira tickets, Git commits, meeting transcripts, sales calls, and customer feedback. The signal I'm looking for isn't what teams say they prioritize; it's what the work record shows they do with their time. That gap between stated priority and actual effort is where the most important opportunities tend to live, and it's difficult for organizations to surface it from the inside.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
                >
                  I come in as an outside partner who observes, diagnoses, coaches, and builds. When the engagement ends, the client owns everything: the processes are documented, the frameworks are in place, and the team knows how to run them without me.
                </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Engagement Arc */}
      <section className="section-band" style={{ background: 'white' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <h2
              className="text-2xl md:text-3xl font-semibold leading-snug mb-8 text-center"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
            >
              Engagement Arc
            </h2>
          </FadeSection>

          <div className="flex flex-col gap-0">
            {PHASES.map((phase, i) => (
              <FadeSection key={phase.number} delay={i * 60}>
                <div
                  className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b"
                  style={{ borderColor: '#e5e9f0' }}
                >
                  <div className="md:w-1/4 flex-shrink-0">
                    <span
                      className="text-4xl font-bold leading-none block mb-2"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#EEF1F6' }}
                    >
                      {phase.number}
                    </span>
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                    >
                      {phase.title}
                    </h3>
                    <p
                      className="text-xs font-medium"
                      style={{ color: '#078279', fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {phase.duration}
                    </p>
                  </div>
                  <div className="md:w-3/4">
                    <p
                      className="text-base leading-relaxed"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
                    >
                      {phase.desc}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Simple text link CTA — no dark section */}
      <section className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-3xl">
          <FadeSection>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors duration-160"
              style={{ color: '#046CC5', fontFamily: 'Inter, system-ui, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#073C81')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#046CC5')}
            >
              View case studies →
            </Link>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
