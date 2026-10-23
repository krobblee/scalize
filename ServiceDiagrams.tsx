/*
 * SCALIZE SYSTEMS: Services Diagrams
 * Connects the Operating Diagnostic to the Build Engagement as a three-step flow.
 * Built in HTML/CSS (a real ordered list) so screen readers get the steps and labels reflow on mobile.
 */

const FONT = 'Inter, system-ui, sans-serif';
const NAVY = '#073C81';
const TEAL = '#066B63';
const MUTED = '#3D4A5C';
const BORDER = '#D5DEEA';

const FLOW = [
  { step: 'Understand where work stalls', service: 'Operating Diagnostic', href: '#operating-diagnostic' },
  { step: 'Decide what to change', service: 'Diagnostic findings and roadmap', href: '#operating-diagnostic' },
  { step: 'Build and measure the improvement', service: 'Build Engagement', href: '#build-engagement' },
];

export default function DiagnosticToBuild() {
  return (
    <section aria-labelledby="diagnostic-to-build-heading" className="section-band" style={{ background: '#F8FAFC', borderTop: '1px solid #E5E9F0', borderBottom: '1px solid #E5E9F0' }}>
      <div className="container max-w-4xl" style={{ fontFamily: FONT }}>
        <h2
          id="diagnostic-to-build-heading"
          className="text-2xl md:text-3xl font-semibold leading-snug mb-3 text-center"
          style={{ color: NAVY }}
        >
          How the diagnostic leads to the build
        </h2>
        <p className="text-base text-center mb-8 mx-auto max-w-2xl" style={{ color: MUTED, lineHeight: '1.7' }}>
          The diagnostic shows where work stalls and what to change first. The build puts those changes in place and measures them.
        </p>

        <ol className="flex flex-col md:flex-row gap-1 md:gap-8 list-none p-0 m-0">
          {FLOW.map((item, i) => (
            <li key={item.step} className="relative flex flex-col md:flex-1">
              {i > 0 && (
                <>
                  <span aria-hidden="true" className="md:hidden block text-center text-xl leading-none pb-1" style={{ color: TEAL }}>↓</span>
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -translate-y-1/2 text-xl"
                    style={{ color: TEAL, left: '-1.45rem' }}
                  >
                    →
                  </span>
                </>
              )}
              <a
                href={item.href}
                className="flex-1 block rounded-sm border px-4 py-4 no-underline transition-shadow duration-200 hover:shadow-md"
                style={{ background: i === 2 ? '#E6F3F2' : 'white', borderColor: i === 2 ? TEAL : BORDER }}
              >
                <span className="block text-xs font-semibold mb-1" style={{ color: TEAL }}>Step {i + 1}</span>
                <span className="block text-base font-semibold" style={{ color: NAVY, lineHeight: '1.4' }}>{item.step}</span>
                <span className="block text-xs mt-1" style={{ color: MUTED }}>{item.service}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
