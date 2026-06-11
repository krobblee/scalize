/*
 * SCALIZE SYSTEMS — Services Page
 * Design: Refined Editorial | White bg | Inter font
 * Sections: Page header, AI Stats Carousel, Operating Diagnostic, Build Engagement, FAQ, Bottom CTA
 * Max content width: max-w-4xl
 */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

const AI_STATS = [
  {
    metric: '40–50%',
    unit: 'of LLM‑generated code snippets',
    description: 'contain at least one security vulnerability',
  },
  {
    metric: '<5%',
    unit: 'of companies using generative AI',
    description: 'report having formal AI security policies',
  },
  {
    metric: 'More likely',
    unit: 'to introduce security flaws',
    description: 'Developers using AI assistants are more likely to introduce security flaws, even while feeling more productive',
  },
  {
    metric: '~1/3',
    unit: 'of internal gen‑AI pilots',
    description: 'leak at least some sensitive or confidential data in testing',
  },
  {
    metric: '50%+',
    unit: 'of organizations deploying gen‑AI',
    description: 'admit they don\'t fully track where sensitive data flows',
  },
  {
    metric: '20–70%',
    unit: 'of unprotected AI systems',
    description: 'are successfully compromised by prompt‑injection and jailbreak attacks in red‑team tests',
  },
];

function AiStatsCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
    }, 350);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      const next = (current + 1) % AI_STATS.length;
      goTo(next);
    }, 4500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused]);

  const stat = AI_STATS[current];

  return (
    <section
      style={{
        background: '#0A1628',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container max-w-4xl" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <div style={{ position: 'relative', minHeight: '120px', marginBottom: '1rem' }}>
          {AI_STATS.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: i === current ? (visible ? 1 : 0) : 0,
                transition: 'opacity 0.6s cubic-bezier(0.23,1,0.32,1)',
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'Cambria, Georgia, serif',
                    fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    lineHeight: 1,
                    color: '#4DB8B2',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.metric}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 'clamp(0.8rem, 1.6vw, 1rem)',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.65)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {s.unit}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 'clamp(0.88rem, 2vw, 1.2rem)',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.72)',
                  maxWidth: '640px',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
        {/* Dot nav */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {AI_STATS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '9999px',
                background: i === current ? '#4DB8B2' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: 'What stage companies do you work with?',
    a: 'I work with pre-seed through Series C growth stage companies. This is the stage where the organization is still building toward scale, and the right operational foundation can be put in place before the complexity of growth makes it harder to do. The goal is always to build processes that are optimized for how the organization works today and designed to scale as it grows.',
  },
  {
    q: 'How long does an engagement take?',
    a: 'The Operating Diagnostic runs two to three weeks. If the diagnostic surfaces work worth building, the Build Engagement typically runs three to six months, depending on the scope of findings. Every build is scoped directly from the diagnostic, so clients know exactly what they are committing to before work begins.',
  },
  {
    q: 'What does the first conversation look like?',
    a: 'A 15-minute call to determine fit. I want to understand the stage of the company and the shape of the problem. If an Operating Diagnostic is the right starting point, we schedule the kickoff. If it isn\'t, I will do my best to point you in the right direction.',
  },
  {
    q: 'What does success look like at the end of an engagement?',
    a: 'At the start of every engagement, we define success and done together. That definition becomes the measure at the end. The closeout includes documented processes, a decision-making framework, a 30/60/90 day plan with clear milestones and accountable owners, and knowledge transfer to the teams who will carry the work forward. The goal is an organization that can sustain and build on the work we did together, without me in the room.',
  },
  {
    q: 'What makes working with Scalize Systems different from hiring a full-time product operations or AI strategy leader?',
    a: 'Often organizations don\'t know what roles they need to hire for until it\'s too late. Part of my assessment is determining any roles or skills missing across teams, drawing on my depth of experience across roles, industries, and company stages that has taken years to accumulate. In many cases, the engagement produces the blueprint for exactly who to hire and what to look for in candidates. The build phase often includes writing job descriptions, building a hiring rubric, and interviewing candidates to set up the organization for long-term success.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: '#e5e9f0' }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-base font-medium" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
          {q}
        </span>
        <span
          className="flex-shrink-0 mt-0.5 text-lg transition-transform duration-200"
          style={{ color: '#078279', transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-250" style={{ maxHeight: open ? '400px' : '0' }}>
        <p className="pb-5 text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

const DIAGNOSTIC_DELIVERABLES = [
  {
    title: 'Process Alignment Map',
    desc: 'A visual artifact similar to a heat map that shows where an organization\'s stated priorities and team effort are out of sync.',
  },
  {
    title: 'Decision Friction Audit',
    desc: 'Identifies where decisions are getting stuck, how long it takes to resolve priority conflicts, and what that lag is costing in shipping speed and engineering cycles.',
  },
  {
    title: 'Prioritized Recommendation Roadmap',
    desc: 'Addresses the gaps in order of impact, starting with systemic issues and any quick wins identified along the way.',
  },
];

const BUILD_DELIVERABLES = [
  {
    title: '30/60/90 Day Plan',
    desc: 'Built from the diagnostic findings with clear milestones and measurable outcomes at each stage.',
  },
  {
    title: 'Documented Process Updates',
    desc: 'Lightweight frameworks that teams can adapt as they scale. All knowledge will be transferred to teams before the engagement closes.',
  },
  {
    title: 'Before-and-After Operations View',
    desc: 'Shows what efficiency gaps were filled and who is accountable for outcomes across teams.',
  },
  {
    title: 'Decision Making Framework',
    desc: 'For leadership to ensure future planning and work adheres to organizational priorities.',
  },
];

function DeliverableCard({ title, desc, bg }: { title: string; desc: string; bg: string }) {
  return (
    <div className="p-5 rounded-sm" style={{ background: bg, border: '1px solid #e5e9f0', borderLeft: '3px solid #078279' }}>
      <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>{title}</p>
      <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}>{desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-16 pb-6 md:pt-20 md:pb-8" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>Services</h1>
          </FadeSection>
        </div>
      </section>

      {/* Operating Diagnostic */}
      <section id="operating-diagnostic" className="section-band" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            {/* Centered heading */}
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-8 text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
              Operating Diagnostic
            </h2>
            {/* Two columns: body copy left, deliverables right */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Left column: body copy + italic duration */}
              <div className="md:w-1/2">
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  The Operating Diagnostic maps how an organization currently operates, where teams are expending the most effort, and where there are opportunities to make that work more efficient and directly tied to stated priorities.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  Over two to three weeks, I conduct structured interviews and workshops with the project sponsor, core decision makers, and key team members across the organization. I review strategy documents, OKRs, GitHub commits, Jira tickets, and other internal documentation. I pull signal from everywhere teams work, then synthesize that information to identify key opportunities to remove friction and increase predictability.
                </p>
                <p className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', fontStyle: 'italic' }}>
                  Duration: Two to three weeks
                </p>
              </div>
              {/* Right column: deliverables */}
              <div className="md:w-1/2">
                <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
                  The engagement produces the following deliverables:
                </p>
                <div className="flex flex-col gap-3">
                  {DIAGNOSTIC_DELIVERABLES.map((item) => (
                    <DeliverableCard key={item.title} title={item.title} desc={item.desc} bg="white" />
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* AI Stats Carousel */}
      <AiStatsCarousel />

      {/* Build Engagement */}
      <section id="build-engagement" className="section-band" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            {/* Centered heading */}
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-8 text-center" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
              Build Engagement
            </h2>
            {/* Two columns: body copy left, deliverables right */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16">
              {/* Left column: body copy + italic duration */}
              <div className="md:w-1/2">
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  Every build engagement begins where the Operating Diagnostic ends. If we haven't completed the diagnostic together, that's where we start.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  I scope the build engagement directly from the diagnostic findings, tying what to build, and in what order, directly to a specific finding from the diagnostic. Clients never pay for work that hasn't been specifically tied to a gap identified together.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  Build engagements typically run from three to six months dependent upon the diagnostic findings. Before I start on the build, I define the exact scope, timeline, and investment together with clients, identifying what improvements will add direct value, along with a clear plan to scale those improvements as the organization grows.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  The build engagement is a mix of structured working sessions, async document review, and time spent in meetings observing how teams work.
                </p>
                <p className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', fontStyle: 'italic' }}>
                  Duration: Three to six months
                </p>
              </div>
              {/* Right column: deliverables */}
              <div className="md:w-1/2">
                <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
                  The engagement produces the following deliverables:
                </p>
                <div className="flex flex-col gap-3">
                  {BUILD_DELIVERABLES.map((item) => (
                    <DeliverableCard key={item.title} title={item.title} desc={item.desc} bg="#EEF2F8" />
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#EEF2F8', paddingTop: '2.5rem', paddingBottom: '1.25rem' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <h2 className="text-2xl md:text-3xl font-semibold mb-10" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>
              Frequently Asked Questions
            </h2>
            <div>
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: '#EEF2F8', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <p className="text-xl font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81', margin: 0 }}>Ready to get started?</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
                style={{ background: '#073C81', color: 'white', fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '0.02em', flexShrink: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#046CC5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#073C81')}
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
