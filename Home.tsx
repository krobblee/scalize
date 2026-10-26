/*
 * SCALIZE SYSTEMS: Home Page
 * Design: Refined Editorial | White bg | Inter font
 * Sections: Hero (no label), Proof cards, Humans and Agents comparison, Services Preview
 * Max content width: max-w-4xl for readability
 * Calendly: intro call button in the hero; the embedded calendar is on the Contact page
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';
import { HERO, HUMANS_AGENTS, INTRO_CALL, PROOF, SERVICES } from './siteCopy';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={`fade-in-up ${className}`}>
      {children}
    </div>
  );
}

// Where the hero headline breaks onto its second line on wider screens. If the headline copy changes, this falls back to natural wrapping.
const HERO_BREAK = HERO.headline.indexOf('weren’t');

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>Scalize Systems | Reimagining Processes for Human and Agent Teams</title>
        <meta property="og:title" content="Scalize Systems | Reimagining Processes for Human and Agent Teams" />
        <meta property="og:description" content="Scalize Systems partners with growth-stage companies to redesign the PDLC and SDLC for human and agent collaboration, build operating infrastructure, and remove friction from processes so organizations can scale with confidence." />
        <meta property="og:url" content="https://scalizesystems.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      {/* Hero: no label above headline. Top padding clears the fixed navbar so none of the background art hides behind it */}
      <section className="pt-16 md:pt-[4.5rem]" style={{ background: 'white' }}>
        {/* Hero height follows the text: 48px (phones) / 80px (768px up) above the headline.
            The art covers the box edge to edge at its natural shape, cropping top and bottom on wider screens. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="md:hidden absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'url(/assets/images/hero-bg-mobile.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.2 }}
          />
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'url(/assets/images/hero-bg-desktop.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', opacity: 0.2 }}
          />
          <div className="container max-w-4xl relative pt-12 pb-6 md:pt-20 md:pb-8">
            <FadeSection>
              {/* Two lines from 768px up: breaks before "weren’t", sized so each half fits the text column.
                  From 1280px the headline may run 6rem past the column's right edge so it can stay at 44px.
                  Phones wrap naturally; two lines would need an unreadably small size there. */}
              <h1
                className="text-[28px] md:text-[34px] lg:text-[38px] xl:text-[44px] xl:-mr-24 font-bold mb-7"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81', lineHeight: '1.125' }}
              >
                {HERO_BREAK > 0 ? (
                  <>
                    {HERO.headline.slice(0, HERO_BREAK)}
                    <br className="hidden md:inline" />
                    {HERO.headline.slice(HERO_BREAK)}
                  </>
                ) : (
                  HERO.headline
                )}
              </h1>
              <p
                className="text-base md:text-lg leading-relaxed mb-9"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
              >
                {HERO.subtext}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={INTRO_CALL.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
                  style={{
                    background: '#073C81',
                    color: 'white',
                    border: '1px solid #073C81',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#046CC5';
                    e.currentTarget.style.borderColor = '#046CC5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#073C81';
                    e.currentTarget.style.borderColor = '#073C81';
                  }}
                >
                  {INTRO_CALL.label}
                </a>
                <Link
                  href="/services"
                  className="inline-block px-6 py-3 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
                  style={{
                    background: 'white',
                    color: '#073C81',
                    border: '1px solid #073C81',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#EEF2F8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                >
                  Explore services
                </Link>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Proof cards: their own section, static on purpose (no fade or rotation) */}
      <section className="py-10 md:py-12" style={{ background: '#F8FAFC', borderTop: '1px solid #E5E9F0' }}>
        <div className="container max-w-4xl">
          <div>
            <h2
              id="proof-heading"
              className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#066B63', lineHeight: '1.5' }}
            >
              {PROOF.label}
            </h2>
            <ul aria-labelledby="proof-heading" className="grid md:grid-cols-3 gap-4 md:gap-5 list-none p-0 m-0">
              {PROOF.cards.map((card) => (
                <li
                  key={card.metric}
                  className="p-6 rounded-sm border"
                  style={{ background: 'white', borderColor: '#e5e9f0', borderTop: '3px solid #073C81', fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  <p className="m-0" style={{ color: '#073C81' }}>
                    <span className="block text-4xl md:text-[2.75rem] font-bold" style={{ lineHeight: '1.05', letterSpacing: '-0.02em' }}>
                      {card.metric}
                    </span>
                    <span className="block mt-1.5 text-base font-semibold" style={{ lineHeight: '1.35' }}>{card.unit}</span>
                  </p>
                  <p className="mt-3 mb-0 text-sm" style={{ color: '#3D4A5C', lineHeight: '1.65' }}>{card.description}</p>
                  {card.href && (
                    <Link
                      href={card.href}
                      className="inline-block mt-3 text-sm font-medium no-underline"
                      style={{ color: '#046CC5' }}
                      aria-label={`Read the case study behind ${card.metric} ${card.unit}`}
                    >
                      Read the case study →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Humans and Agents: what people bring vs. what a process must supply for agents.
          Each row pairs one human example with its agent requirement, so the pair stays together when stacked on phones.
          Column headings are visual only; each cell carries its own People/Agents label (shown on phones, read aloud everywhere). */}
      <section aria-labelledby="humans-agents-heading" className="py-10 md:py-14" style={{ background: '#EEF2F8' }}>
        <div className="container max-w-4xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          <FadeSection>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#066B63' }}>
              {HUMANS_AGENTS.eyebrow}
            </p>
            <h2
              id="humans-agents-heading"
              className="text-2xl md:text-[32px] font-semibold mb-4"
              style={{ color: '#073C81', lineHeight: '1.2', letterSpacing: '-0.01em' }}
            >
              {HUMANS_AGENTS.headline}{' '}
              <br className="hidden md:inline" />
              <span style={{ color: '#066B63' }}>{HUMANS_AGENTS.question}</span>
            </h2>
            <p className="text-base mb-8 max-w-2xl" style={{ color: '#3D4A5C', lineHeight: '1.7' }}>
              {HUMANS_AGENTS.intro}
            </p>

            <div className="rounded-sm border overflow-hidden" style={{ background: 'white', borderColor: '#D5DEEA' }}>
              <div aria-hidden="true" className="hidden md:grid grid-cols-2 text-xs font-semibold uppercase tracking-wider">
                <p className="m-0 px-6 py-3" style={{ color: '#073C81' }}>{HUMANS_AGENTS.peopleHeading}</p>
                <p className="m-0 px-6 py-3" style={{ color: '#066B63', background: '#E6F3F2' }}>{HUMANS_AGENTS.agentsHeading}</p>
              </div>
              <ol className="list-none p-0 m-0">
                {HUMANS_AGENTS.rows.map(({ people, agents }, i) => (
                  <li
                    key={people.title}
                    className="grid md:grid-cols-2"
                    style={{ borderTop: i === 0 ? undefined : '1px solid #D5DEEA' }}
                  >
                    <div className="px-5 md:px-6 pt-5 pb-4 md:py-5" style={{ borderTop: i === 0 ? '1px solid #D5DEEA' : undefined }}>
                      <p className="md:sr-only m-0 mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#3D4A5C' }}>
                        {HUMANS_AGENTS.peopleLabel}
                      </p>
                      <h3 className="text-base font-semibold mb-1.5" style={{ color: '#073C81', lineHeight: '1.4' }}>{people.title}</h3>
                      <p className="m-0 text-sm" style={{ color: '#3D4A5C', lineHeight: '1.6' }}>{people.body}</p>
                    </div>
                    <div className="px-5 md:px-6 pt-4 pb-5 md:py-5" style={{ background: '#E6F3F2', borderTop: i === 0 ? '1px solid #D5DEEA' : undefined }}>
                      <p className="md:sr-only m-0 mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#066B63' }}>
                        {HUMANS_AGENTS.agentsLabel}
                      </p>
                      <h3 className="text-base font-semibold mb-1.5" style={{ color: '#066B63', lineHeight: '1.4' }}>{agents.title}</h3>
                      <p className="m-0 text-sm" style={{ color: '#3D4A5C', lineHeight: '1.6' }}>{agents.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8">
              <p className="m-0 text-base" style={{ color: '#3D4A5C', lineHeight: '1.6' }}>
                {HUMANS_AGENTS.closing}
                <br />
                <strong className="font-semibold" style={{ color: '#073C81' }}>{HUMANS_AGENTS.closingEmphasis}</strong>
              </p>
              <Link
                href="/how-i-work"
                className="flex-shrink-0 text-base font-medium no-underline transition-colors duration-150"
                style={{ color: '#046CC5' }}
              >
                {HUMANS_AGENTS.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

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
                    {SERVICES[0].name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}
                  >
                    {SERVICES[0].description}
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
                    {SERVICES[1].name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.7' }}
                  >
                    {SERVICES[1].description}
                  </p>
                </div>
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
