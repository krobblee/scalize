/*
 * SCALIZE SYSTEMS: Case Study Diagrams
 * One explanatory diagram per case study, built in HTML/CSS so labels stay sharp and reflow on mobile.
 * They render on the Case Studies page.
 * Every diagram only shows steps the written case study supports.
 */

const FONT = 'Inter, system-ui, sans-serif';
const NAVY = '#073C81';
const TEAL = '#066B63';
const MUTED = '#3D4A5C';
const BORDER = '#D5DEEA';

function DiagramFigure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="m-0 rounded-sm border p-5 md:p-7" style={{ background: 'white', borderColor: '#e5e9f0', fontFamily: FONT }}>
      {children}
      <figcaption className="mt-5 pt-4 text-sm" style={{ color: MUTED, borderTop: '1px solid #E5E9F0', lineHeight: '1.6' }}>
        {caption}
      </figcaption>
    </figure>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: TEAL }}>
      {children}
    </p>
  );
}

// Points right on desktop, down on mobile, between two stacked panels.
function TransitionArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-2xl md:px-2" style={{ color: TEAL }}>
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  );
}

function Node({ title, detail, tone = 'plain' }: { title: string; detail?: string; tone?: 'plain' | 'strong' | 'muted' }) {
  const styles = {
    plain: { background: '#F4F7FA', borderColor: BORDER, color: NAVY },
    strong: { background: '#E6F3F2', borderColor: TEAL, color: NAVY },
    muted: { background: 'white', borderColor: BORDER, color: MUTED },
  }[tone];
  return (
    <div className="rounded-sm border px-3 py-2" style={{ ...styles, borderStyle: tone === 'muted' ? 'dashed' : 'solid' }}>
      <p className="text-sm font-semibold" style={{ lineHeight: '1.4' }}>{title}</p>
      {detail && <p className="text-xs mt-0.5" style={{ color: MUTED, lineHeight: '1.5' }}>{detail}</p>}
    </div>
  );
}

// Inline route, e.g. "Marketing → Engineering queue → Live", with an optional highlighted step.
function Route({ label, steps }: { label: string; steps: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold mb-1.5" style={{ color: MUTED }}>{label}</p>
      <p className="flex flex-wrap items-center gap-1.5 text-xs" style={{ color: NAVY }}>
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" style={{ color: TEAL }}>→</span>}
            <span className="rounded-full px-2 py-0.5" style={{ background: '#EEF2F8' }}>{step}</span>
          </span>
        ))}
      </p>
    </div>
  );
}

/* ---------- Wayfair: separate carton records → connected multibox product ---------- */

const CARTONS = ['Headboard', 'Footboard', 'Rails'];

export function MultiboxDiagram() {
  return (
    <DiagramFigure caption="How the multibox data structure worked, using the bed frame example from this case study. Linking every carton to its product made it possible to confirm that all boxes were present before a shipment left the fulfillment center.">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-2 items-stretch">
        <div>
          <PanelLabel>Before: one record per carton</PanelLabel>
          <div className="flex flex-col gap-2">
            {CARTONS.map((part) => (
              <Node key={part} tone="muted" title={`Carton: ${part}`} detail="No link to the other cartons" />
            ))}
          </div>
        </div>
        <TransitionArrow />
        <div>
          <PanelLabel>After: one connected product</PanelLabel>
          <Node tone="strong" title="Bed frame" detail="One product record linked to every carton" />
          <div className="ml-4 pl-4 flex flex-col gap-2 pt-2" style={{ borderLeft: `2px solid ${TEAL}` }}>
            {CARTONS.map((part, i) => (
              <Node key={part} title={`Box ${i + 1} of ${CARTONS.length}: ${part}`} detail="Visual identifier on the packaging" />
            ))}
          </div>
          <p className="mt-3 rounded-sm px-3 py-2 text-sm font-semibold" style={{ background: NAVY, color: 'white', lineHeight: '1.4' }}>
            <span aria-hidden="true">✓ </span>Complete shipment identified and validated before it ships
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
}

/* ---------- Legal technology: human-in-the-loop evaluation ---------- */

const EVAL_STEPS = [
  { title: 'Model output', detail: 'Summaries and UK court-specific document formats' },
  { title: 'Expert evaluation', detail: 'UK legal experts review outputs against market-specific standards' },
  { title: 'Documented correction', detail: 'Experts record where an output misses the standard' },
  { title: 'Feedback into retraining', detail: 'Correction signal becomes input to later model improvement' },
];

export function EvaluationLoopDiagram() {
  return (
    <DiagramFigure caption="The human-in-the-loop evaluation process described in this case study. Expert corrections were fed back as input to retraining, so manual review informed subsequent improvements instead of being repeated indefinitely.">
      <PanelLabel>Human-in-the-loop evaluation</PanelLabel>
      <ol className="grid md:grid-cols-4 gap-2 md:gap-3 list-none p-0 m-0">
        {EVAL_STEPS.map((step, i) => (
          <li key={step.title} className="relative flex flex-col">
            <div className="h-full rounded-sm border px-3 py-3" style={{ background: i === 1 ? '#E6F3F2' : '#F4F7FA', borderColor: i === 1 ? TEAL : BORDER }}>
              <p className="text-xs font-semibold mb-1" style={{ color: TEAL }}>Step {i + 1}</p>
              <p className="text-sm font-semibold" style={{ color: NAVY, lineHeight: '1.4' }}>{step.title}</p>
              <p className="text-xs mt-1" style={{ color: MUTED, lineHeight: '1.5' }}>{step.detail}</p>
            </div>
            {i < EVAL_STEPS.length - 1 && (
              <span aria-hidden="true" className="md:hidden block text-center text-lg leading-none py-1" style={{ color: TEAL }}>↓</span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-center gap-2 text-xs" style={{ color: MUTED }}>
        <span aria-hidden="true" className="text-base" style={{ color: TEAL }}>↺</span>
        The next model iteration returns to expert evaluation.
      </p>
    </DiagramFigure>
  );
}

/* ---------- Endurance International Group: separate brand systems → shared platform ---------- */

const BRANDS = ['Brand A', 'Brand B', 'Brand C', '100+ brands'];
const MODULES = ['A/B testing', 'Promotions', 'Domain search', 'Payment-as-a-Service', 'Marketing CMS'];

export function SharedPlatformDiagram() {
  return (
    <DiagramFigure caption="How the shared customer acquisition platform changed the operating model. Brand names are placeholders. A shared platform and CMS let marketing make routine acquisition-flow changes without routing each one through engineering.">
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-2 items-stretch">
        <div>
          <PanelLabel>Before: brands spread across seven legacy systems</PanelLabel>
          <div className="grid grid-cols-2 gap-2">
            {BRANDS.map((brand) => (
              <Node key={brand} tone="muted" title={brand} detail="On one of 7 legacy systems" />
            ))}
          </div>
          <Route label="Routine change (new promotion or landing page)" steps={['Marketing', 'Engineering queue', 'Live']} />
        </div>
        <TransitionArrow />
        <div>
          <PanelLabel>After: one shared platform</PanelLabel>
          <div className="grid grid-cols-4 gap-1.5">
            {BRANDS.map((brand) => (
              <p key={brand} className="rounded-sm border px-1.5 py-1.5 text-center text-xs font-medium" style={{ borderColor: BORDER, color: NAVY, lineHeight: '1.3' }}>
                {brand}
              </p>
            ))}
          </div>
          <div aria-hidden="true" className="h-3 mx-6" style={{ borderLeft: `2px solid ${TEAL}`, borderRight: `2px solid ${TEAL}` }} />
          <div className="rounded-sm border px-3 py-3" style={{ background: '#E6F3F2', borderColor: TEAL }}>
            <p className="text-sm font-semibold mb-2" style={{ color: NAVY }}>Shared acquisition platform</p>
            <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
              {MODULES.map((m) => (
                <li key={m} className="rounded-full px-2 py-0.5 text-xs" style={{ background: 'white', color: NAVY }}>{m}</li>
              ))}
            </ul>
          </div>
          <Route label="Routine change" steps={['Marketing', 'CMS', 'Live']} />
        </div>
      </div>
    </DiagramFigure>
  );
}

/* ---------- B2B SaaS product rewrite: outdated product → product and process changes → rewrite results ---------- */

const REWRITE_CHANGES = [
  { title: 'Diagnosis and recommendation', detail: 'Leadership gap and outdated architecture identified; modern rewrite recommended' },
  { title: 'Product management team', detail: 'Product manager, product owner, and UX designer hired; voice of the customer program' },
  { title: 'Clearer workflow', detail: 'Definitions of done, success criteria, and a move from Scrum to Kanban' },
  { title: 'New engineering leadership', detail: 'Scalable, cloud-based microservice architecture' },
];
const REWRITE_RESULTS = ['Full CI/CD', '30x release frequency', 'First value 50% faster', 'Expansion into a new market', 'On time and $150K under budget'];

export function ProductRewriteDiagram() {
  return (
    <DiagramFigure caption="How the rewrite came together. Product, process, and leadership changes made the new architecture possible, and the results followed from all of them together.">
      <div className="grid md:grid-cols-[0.9fr_auto_1.4fr_auto_0.9fr] gap-4 md:gap-2 items-stretch">
        <div>
          <PanelLabel>Before</PanelLabel>
          <Node tone="muted" title="VSTO product" detail="Headed for deprecation, no CI/CD, couldn't support the features law firms requested" />
        </div>
        <TransitionArrow />
        <div>
          <PanelLabel>What changed</PanelLabel>
          <div className="flex flex-col gap-2">
            {REWRITE_CHANGES.map((change) => (
              <Node key={change.title} tone="strong" title={change.title} detail={change.detail} />
            ))}
          </div>
        </div>
        <TransitionArrow />
        <div>
          <PanelLabel>Results</PanelLabel>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {REWRITE_RESULTS.map((result) => (
              <li key={result} className="rounded-sm px-3 py-2 text-sm font-semibold" style={{ background: NAVY, color: 'white', lineHeight: '1.4' }}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
}
