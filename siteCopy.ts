/**
 * Home page copy that AI-agent files also use.
 * Home.tsx renders it, and prerender.mjs writes it into llms.txt and the
 * structured data, so agents always read the same words as visitors.
 * Edit the copy here, not in those files.
 */

// The intro call button: same wording and booking link everywhere it appears.
export const INTRO_CALL = {
  label: 'Book an intro call',
  href: 'https://calendly.com/katie-scalizesystems/30-mins',
};

export const HERO = {
  headline: 'Traditional product development processes weren’t designed for AI agents.',
  subtext:
    'I help growth-stage product and engineering teams redesign decisions, workflows, and handoffs so people and agents can work together with clear accountability.',
};

// Historical results from past roles, shown as static cards below the hero. Not forecasts or promises.
// Each href points to the case study that substantiates that result.
export const PROOF = {
  label: 'Selected results from consulting and in-house leadership roles',
  cards: [
    {
      metric: '30×',
      unit: 'faster releases',
      description:
        'Diagnosed an outdated architecture and redesigned product workflows for a full product rewrite at a B2B SaaS startup, reaching full CI/CD and a 30x improvement in release frequency.',
      href: '/case-studies#product-rewrite',
    },
    {
      metric: '50%',
      unit: 'faster time to first value',
      description:
        'Improved design and onboarding in the rewritten product, so customers reached first value 50% faster than with the previous product.',
      href: '/case-studies#product-rewrite',
    },
    {
      metric: '25%',
      unit: 'lower operating costs',
      description:
        'Led product strategy and delivery for a shared customer acquisition platform that replaced seven legacy systems across more than 100 brands.',
      href: '/case-studies#greenfield-platform',
    },
  ],
};

export const PROBLEMS = {
  heading: 'Problems Scalize Systems helps solve',
  problemLabel: 'What you may be seeing',
  helpLabel: 'How Scalize helps',
  rows: [
    {
      problem: 'It’s hard to tell how much product and engineering effort supports your stated priorities.',
      help: 'A heat-map-style view compares actual work with those priorities, so leaders can see where to adjust course.',
    },
    {
      problem: 'Work slows when teams don’t know who can decide, which reviews matter, or when to escalate.',
      help: 'A decision audit identifies bottlenecks and informs clearer ownership and review rules, so decisions can move faster.',
    },
    {
      problem: 'Context gets lost as work moves between people and AI agents.',
      help: 'Handoff standards define the inputs, checks, and owners at each stage, so work moves forward with clear accountability.',
    },
  ],
};

export const SERVICES = [
  {
    name: 'Operating Diagnostic',
    href: '/services#operating-diagnostic',
    description:
      'A two to three week engagement that maps how your organization operates across the PDLC and SDLC, where effort is going, which work belongs to humans, agents, or both, and where the friction is.',
  },
  {
    name: 'Build Engagement',
    href: '/services#build-engagement',
    description:
      'A three to six month engagement scoped directly from the diagnostic findings, producing human and agent ready processes, decision frameworks, and an executable plan to scale and measure reimagined processes across the organization.',
  },
];
