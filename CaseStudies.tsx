/*
 * SCALIZE SYSTEMS — Case Studies Page
 * Design: Refined Editorial | White bg | Playfair Display headlines | DM Sans body
 * Both case studies on a single scrollable page with anchor IDs
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

function CaseStudyBlock({
  id,
  title,
  tags,
  problem,
  work,
  result,
  bg,
}: {
  id: string;
  title: string;
  tags: string[];
  problem: string;
  work: string;
  result: string;
  bg: string;
}) {
  return (
    <section id={id} className="section-band" style={{ background: bg }}>
      <div className="container max-w-4xl">
        <FadeSection>
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: '#EEF1F6', color: '#3D4A5C', fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2
              className="text-2xl md:text-3xl font-semibold leading-snug"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
            >
              {title}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {[
              { label: 'The Problem', body: problem },
              { label: 'The Work', body: work },
              { label: 'The Result', body: result },
            ].map((section) => (
              <div
                key={section.label}
                className="flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <div className="md:w-1/4 flex-shrink-0">
                  <h3
                    className="text-base font-semibold"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                  >
                    {section.label}
                  </h3>
                </div>
                <div className="md:w-3/4">
                  <p
                    className="text-base leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
                  >
                    {section.body}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </FadeSection>
      </div>
    </section>
  );
}

export default function CaseStudies() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>Case Studies | Scalize Systems</title>
        <meta property="og:title" content="Case Studies | Scalize Systems" />
        <meta property="og:description" content="Scalize Systems partners with pre-seed through Series C growth stage companies to build operating infrastructure, develop AI strategy, and remove friction from processes so organizations can scale with confidence." />
        <meta property="og:url" content="https://scalizesystems.com/case-studies" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}>Case Studies</h1>
          </FadeSection>
        </div>
      </section>

      <CaseStudyBlock
        id="legal-tech"
        title="Expanding an AI Product into a New Market"
        tags={['Legal Technology', 'LLM Extension', 'Human-in-the-Loop Evaluation']}
        bg="#F5F7FA"
        problem={`A Canadian legal tech startup had built a bespoke LLM trained on Canadian legal data. The model was producing strong results in its home market, and leadership wanted to expand into the UK. The challenge was that UK legal case judgments required a different approach: the model needed to ingest UK-specific inputs, extract the relevant information, and produce summaries and court-specific document formats that met the standards of a UK legal audience. The UK team had been doing this manually, and the goal was to replace that process with something systematic and autonomous that could scale.\n\nThe work was also happening against a difficult backdrop. Lawyers across North America were being sanctioned for submitting AI-generated briefs with hallucinated citations, and trust in AI legal tools was at a low point. Any expansion into a new market had to be defensible, not just functional.`}
        work={`I built the process to extend the model to UK legal data, defining the output types the new market required and the criteria the model needed to meet to produce them reliably. I designed and implemented a human-in-the-loop feedback process so that UK legal experts could evaluate outputs against market-specific standards and feed that signal back into retraining. The loop was structured so that every correction made the model more accurate on the next pass, rather than requiring ongoing manual intervention indefinitely.`}
        result={`The expansion opened a new revenue stream. Outputs that had always required manual lawyer time were produced by the model at scale, reviewed through the evaluation process, and delivered with a defensible quality standard. The human-in-the-loop process became the trust infrastructure the market required, not an afterthought added once something went wrong.`}
      />

      <CaseStudyBlock
        id="supply-chain"
        title="Unlocking Growth at Scale Through a First-of-Its-Kind Supply Chain Data Architecture"
        tags={['E-Commerce', 'Supply Chain Operations', 'Cross-Functional Systems Build']}
        bg="white"
        problem={`The supply chain industry operates on a 1:1 data model: one product, one shipment record, one carton, one identifier. That structure is the global standard, and it made it structurally impossible to coordinate multibox products at scale. Consider a bed frame: the headboard, footboard, and rails each ship in a separate box, each box could come from a different fulfillment center, and the rails might fit ten other beds by the same supplier while the headboard is sold separately on its own. Nothing on the outside of any box indicated what was inside or what it needed to arrive with. Individual cartons do not carry relationships to one another within the international supply chain, and every major retailer, including Amazon, Target, and Walmart, faced the same constraint. None of them had found a way around it. The result was the same across the industry: incomplete deliveries, customers unpacking what arrived only to find an entire box missing, and no systematic fix in sight.`}
        work={`I was the only person working on this from a technical capacity at Wayfair, and I built it from scratch. I redesigned the data architecture from a 1:1 model to a many-to-one structure, making it possible to associate multiple cartons with a single product and track each one individually through the supply chain. I worked with suppliers to define and document the carton relationships for every multibox product, building a process where each carton was assigned a visual identifier on the outside of the packaging so fulfillment center staff could verify at a glance that they had box one, box two, and box three before a shipment left the building.\n\nGetting there required coordinating across eight siloed divisions within Wayfair to update supplier-facing systems, internal fulfillment center infrastructure, and the scanning hardware on the warehouse floor. Suppliers needed to understand the problem, buy into the solution, and complete the carton mapping work for their product catalogs. After the first wave, the ongoing process became lightweight: only new products required updates.`}
        result={`The architecture made it possible to pick and validate complete multibox products before they shipped, eliminating the structural reason incomplete deliveries happened. Within the first year, supplier participation grew by 30%, customer lifetime value increased by 15%, and the program drove a $48M revenue surge. By year three, multibox shipping costs had dropped by 40%. What had been an unsolvable coordination problem across the entire industry became a solvable operational one, because the data model finally reflected how the products were actually built.`}
      />



      <Footer />
    </div>
  );
}
