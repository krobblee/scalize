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
  category: 'Product Operations consulting for growth-stage software companies',
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
      unit: 'release frequency',
      description:
        'Diagnosed an outdated architecture and redesigned product workflows for a full product rewrite at a B2B SaaS startup, reaching full CI/CD and a 30x improvement in release frequency.',
      href: '/case-studies/product-operations-saas-rewrite',
    },
    {
      metric: 'UK expansion',
      unit: 'for a legal AI product',
      description:
        'Built an expert review workflow that helped a legal AI product expand to the UK and open a new revenue stream.',
      href: '/case-studies/human-in-the-loop-ai-evaluation',
    },
    {
      metric: '25%',
      unit: 'lower operating costs',
      description:
        'Led product strategy and delivery for a shared customer acquisition platform that replaced four legacy systems across more than 100 brands.',
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
      'In two to three weeks, see where product and engineering work gets stuck, who owns key decisions, and what to change first.',
  },
  {
    name: 'Build Engagement',
    href: '/services#build-engagement',
    description:
      'A three to six month engagement scoped directly from the diagnostic findings, producing human and agent ready processes, decision frameworks, and an executable plan to scale and measure reimagined processes across the organization.',
  },
];

export const CASE_STUDY_PAGES = {
  'legal-tech': {
    path: '/case-studies/human-in-the-loop-ai-evaluation',
    title: 'Human-in-the-Loop AI Evaluation for a UK Expansion',
    description: 'How Katie Robblee designed expert review and feedback for a legal AI product expanding into the UK.',
  },
  'product-rewrite': {
    path: '/case-studies/product-operations-saas-rewrite',
    title: 'Product Operations Case Study: Rebuilding a B2B SaaS Product',
    description: 'How Katie Robblee reworked product discovery, delivery, and success criteria during a B2B SaaS product rewrite.',
  },
} as const;

export const AI_RACI = {
  title: 'AI RACI for Product and Engineering Teams',
  path: '/resources/ai-raci-product-engineering',
  download: 'https://cdn.sanity.io/files/z13orr0o/production/e3700eaa228aefc594f0765fbe83d9c2d4116d54.xlsx',
} as const;
