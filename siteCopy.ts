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

// Comparison of what people bring to their work versus what a process must supply for agents.
export const HUMANS_AGENTS = {
  eyebrow: 'Rethink how work happens',
  headline: 'Agents work differently than humans.',
  question: 'Have you changed your processes to work with them?',
  intro:
    'People bring experience, relationships, and accumulated context to their work. For agents, you have to design how that context is supplied—and how their work connects to yours.',
  peopleHeading: 'What people bring',
  agentsHeading: 'What to build for agents',
  peopleLabel: 'People',
  agentsLabel: 'Agents',
  rows: [
    {
      people: { title: '“I remember why we decided that.”', body: 'History from meetings, past projects, and experience stays with the person.' },
      agents: { title: 'Put the relevant context within reach.', body: 'Supply current decisions, constraints, and supporting evidence at the point of work.' },
    },
    {
      people: { title: '“I know who to ask.”', body: 'Relationships help people find answers and navigate conflicting information.' },
      agents: {
        title: 'Define where answers come from.',
        body: 'Specify authoritative sources, decision owners, and a route to a human when information conflicts.',
      },
    },
    {
      people: { title: '“I’ll pick up where I left off.”', body: 'People carry an understanding of progress, open questions, and recent changes.' },
      agents: {
        title: 'Preserve state between runs.',
        body: 'Record what is complete, what changed, and what remains unresolved so work can resume reliably.',
      },
    },
    {
      people: { title: '“This needs a conversation.”', body: 'A person can recognize an exception and negotiate the next step with colleagues.' },
      agents: {
        title: 'Design the pause and the handoff.',
        body: 'Set decision boundaries, escalation triggers, and the information a human needs to take over.',
      },
    },
    {
      people: {
        title: '“I can work through these one at a time.”',
        body: 'Processes are often paced around individual capacity and sequential handoffs.',
      },
      agents: {
        title: 'Rethink how the work is divided.',
        body: 'Identify tasks agents can run in parallel, checks to automate, and points that need human judgment.',
      },
    },
  ],
  closing: 'Adding an agent changes who does the work.',
  closingEmphasis: 'Redesigning the process changes how well it works.',
  linkLabel: 'Explore how I work',
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
