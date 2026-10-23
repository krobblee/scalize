/*
 * SCALIZE SYSTEMS: Services Page
 * Design: Refined Editorial | White bg | Inter font
 * Sections: Page header, Operating Diagnostic, Diagnostic-to-build flow, Build Engagement, FAQ, Bottom CTA
 * Max content width: max-w-4xl
 */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';
import DiagnosticToBuild from './ServiceDiagrams';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

const FAQ_ITEMS = [
  {
    q: 'What stage companies do you work with?',
    a: 'I work with growth-stage companies. This is the stage where the organization is still building toward scale, and the right operational foundation can be put in place before the complexity of growth makes it harder to do. The goal is always to build processes that are optimized for how the organization works today and designed to scale as it grows.',
  },
  {
    q: 'What does it mean to design processes for humans and agents?',
    a: 'Traditional PDLC and SDLC practices assume that humans read the specs, attend the reviews, and pass work between functions. When agents write code, draft requirements, and review changes, each of those stages needs inputs an agent can act on, outputs a person can verify, and clear rules for when work moves between the two. I define those stages, handoffs, and decision-making responsibilities so that humans and agents operate from the same process and leadership can see where human judgment is required.',
  },
  {
    q: 'Do you implement AI tools?',
    a: 'I design the operating model: which stages of the lifecycle use agents, what each agent needs as input, where humans review, and how the team measures the result. Tool and vendor selection follows from those decisions and stays with your team, and I advise on evaluation criteria where that is useful.',
  },
  {
    q: 'How long does an engagement take?',
    a: 'The Operating Diagnostic runs two to three weeks. If the diagnostic surfaces work worth building, the Build Engagement typically runs three to six months, depending on the scope of findings. Every build is scoped directly from the diagnostic, so clients know exactly what they are committing to before work begins.',
  },
  {
    q: 'What does the first conversation look like?',
    a: 'Book an intro call to determine fit. I want to understand the stage of the company and the shape of the problem. If an Operating Diagnostic is the right starting point, we schedule the kickoff. If it isn\'t, I will do my best to point you in the right direction.',
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
    desc: 'A visual artifact similar to a heat map that shows where an organization\'s stated priorities and team effort are out of sync, paired with a stage-by-stage view of the PDLC and SDLC showing which work is owned by humans or agents, and where the two hand off to each other.',
  },
  {
    title: 'Decision Friction Audit',
    desc: 'Identifies where decisions are getting stuck, including human review gates that add delay without adding value, how long it takes to resolve priority conflicts, and what those inefficiencies cost the organization\'s shipping speed and engineering cycles.',
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
    desc: 'Lightweight frameworks that teams can adapt as they scale, including specs, acceptance criteria, escalation rules, and handoff standards written so that both humans and agents can act on them. All knowledge will be transferred to teams before the engagement closes.',
  },
  {
    title: 'Before-and-After Operations View',
    desc: 'Shows what efficiency gaps were filled and who is accountable for outcomes across teams.',
  },
  {
    title: 'Decision-Making Framework',
    desc: 'For leadership to ensure future planning and work adhere to organizational priorities, defining which decisions agents make, which they recommend, and which stay with humans.',
  },
];

// A selected result from a past role, placed beside the service it relates to. Not a promised engagement outcome.
function PastResult({ metric, unit, description, href, tinted = false }: { metric: string; unit: string; description: string; href?: string; tinted?: boolean }) {
  return (
    <aside
      aria-label={`Selected past result: ${metric} ${unit}`}
      className="h-full flex flex-col p-5 rounded-sm border"
      style={{ background: tinted ? '#F4F7FA' : 'white', borderColor: '#e5e9f0', borderTop: '3px solid #073C81', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#066B63' }}>Selected past result</p>
      <p className="m-0" style={{ color: '#073C81' }}>
        <span className="block text-3xl font-bold" style={{ lineHeight: '1.1', letterSpacing: '-0.02em' }}>{metric}</span>
        <span className="block mt-1 text-base font-semibold">{unit}</span>
      </p>
      <p className="mt-2 mb-0 text-sm" style={{ color: '#3D4A5C', lineHeight: '1.65' }}>{description}</p>
      {href && (
        <Link href={href} className="inline-block mt-auto pt-3 text-sm font-medium no-underline" style={{ color: '#046CC5' }}>
          Read the case study →
        </Link>
      )}
    </aside>
  );
}

// Past results for one service, side by side on wider screens, with the disclaimer stated once.
function PastResultsRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
      <p className="mt-3 mb-0 text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.5' }}>
        Selected results from my past work. Historical examples, not guaranteed engagement outcomes.
      </p>
    </div>
  );
}

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
      <Helmet>
        <title>Services | Scalize Systems</title>
        <meta property="og:title" content="Services | Scalize Systems" />
        <meta property="og:description" content="Scalize Systems partners with growth-stage companies to redesign the PDLC and SDLC for human and agent collaboration, build operating infrastructure, and remove friction from processes so organizations can scale with confidence." />
        <meta property="og:url" content="https://scalizesystems.com/services" />
        <meta property="og:type" content="website" />
      </Helmet>
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
                  The Operating Diagnostic maps how an organization currently operates across its product development lifecycle (PDLC) and software development lifecycle (SDLC), where humans and agents are expending the most effort, and where there are opportunities to make that work more efficient and directly tied to stated priorities.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}>
                  Over two to three weeks, I conduct structured interviews and workshops with the project sponsor, core decision makers, and key team members across the organization. I review strategy documents, OKRs, GitHub commits, Jira tickets, agent activity logs, and other internal documentation. I map each stage of the lifecycle from discovery and specification through build, review, release, and measurement. I pull signal from everywhere teams and agents work, then synthesize that information to identify key opportunities to remove friction and increase predictability.
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
            <PastResultsRow>
              <PastResult
                metric="$100M"
                unit="revenue increase over three years"
                description="Soon after joining Wayfair, identified opportunities across eight divisions to improve multibox outcomes, leading to a redesigned data structure that increased revenue by $100M over three years and customer lifetime value by 15% in the first year."
                href="/case-studies#supply-chain"
              />
              <PastResult
                metric="20%"
                unit="improvement in on-time delivery"
                description="Established a cross-location annual planning process that surfaced critical dependencies and improved on-time delivery."
                href="/case-studies#greenfield-platform"
              />
            </PastResultsRow>
          </FadeSection>
        </div>
      </section>

      {/* Diagnostic-to-build flow: replaces the former third-party AI statistics carousel */}
      <DiagnosticToBuild />

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
            <PastResultsRow>
              <PastResult
                tinted
                metric="25%"
                unit="lower operating costs"
                description="Led product strategy and delivery for a shared customer acquisition platform deployed across more than 100 brands."
                href="/case-studies#greenfield-platform"
              />
              <PastResult
                tinted
                metric="30x"
                unit="improvement in release frequency"
                description="Oversaw a full product rewrite, delivered on time and $150K under budget, that brought full CI/CD, 50% faster time to first value, and expansion into a new market."
                href="/case-studies#product-rewrite"
              />
            </PastResultsRow>
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
