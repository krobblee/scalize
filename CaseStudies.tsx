/*
 * SCALIZE SYSTEMS: Case Studies Page
 * Design: Refined Editorial | White bg | Playfair Display headlines | DM Sans body
 * All case studies on a single scrollable page with anchor IDs
 * Each block: tags, title, summary panel, diagram, then problem / contribution / result
 */

import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';
import { EvaluationLoopDiagram, MultiboxDiagram, ProductRewriteDiagram, SharedPlatformDiagram } from './CaseStudyDiagrams';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

function CaseStudyBlock({
  id,
  title,
  tags,
  summary,
  diagram,
  problem,
  work,
  result,
  bg,
}: {
  id: string;
  title: string;
  tags: string[];
  summary: { setting: string; role: string; challenge: string; outcomes: string[] };
  diagram: React.ReactNode;
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

          {/* Summary panel: setting, role, challenge, and outcomes the narrative below supports */}
          <dl
            className="grid md:grid-cols-2 gap-x-10 gap-y-5 rounded-sm border p-5 md:p-7 mb-8 m-0"
            style={{ background: 'white', borderColor: '#e5e9f0', borderLeft: '3px solid #078279', fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {[
              { label: 'Setting', body: summary.setting },
              { label: 'My role', body: summary.role },
              { label: 'Operating challenge', body: summary.challenge },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#078279' }}>{item.label}</dt>
                <dd className="m-0 text-base" style={{ color: '#073C81', lineHeight: '1.6' }}>{item.body}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#078279' }}>Outcomes</dt>
              <dd className="m-0">
                <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                  {summary.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2 text-base" style={{ color: '#073C81', lineHeight: '1.6' }}>
                      <span aria-hidden="true" style={{ color: '#078279' }}>•</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <div className="mb-10">{diagram}</div>

          <div className="flex flex-col gap-8">
            {[
              { label: 'The problem', body: problem },
              { label: 'My contribution', body: work },
              { label: 'The result', body: result },
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
        <meta property="og:description" content="Scalize Systems partners with growth-stage companies to redesign the PDLC and SDLC for human and agent collaboration, build operating infrastructure, and remove friction from processes so organizations can scale with confidence." />
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
        summary={{
          setting: 'Canadian legal technology startup (client anonymized)',
          role: 'Built the process to extend the company’s LLM to UK legal data, including the human-in-the-loop evaluation process',
          challenge: 'Replace a manual UK process with a systematic one that met UK legal standards while trust in AI legal tools was low',
          outcomes: ['Opened a new revenue stream', 'Model-produced outputs reviewed through a defensible expert evaluation process'],
        }}
        diagram={<EvaluationLoopDiagram />}
        problem={`A Canadian legal tech startup built a bespoke LLM trained on Canadian legal data. The model was producing strong results in its home market, and leadership wanted to expand into the UK. The challenge was that UK legal case judgments required a different approach: the model needed to ingest UK-specific inputs, extract the relevant information, and produce summaries and court-specific document formats that met the standards of a UK legal audience. The UK team had been doing this manually, and the goal was to replace that process with something systematic and autonomous that could scale.\n\nThe work was also happening against a difficult backdrop. Lawyers across North America were being sanctioned for submitting AI-generated briefs with hallucinated citations, and trust in AI legal tools was at a low point. Any expansion into a new market had to be defensible, not just functional.`}
        work={`I built the process to extend the model to UK legal data, defining the output types the new market required and the criteria the model needed to meet to produce them reliably. I designed and implemented a human-in-the-loop feedback process so that UK legal experts could evaluate outputs against market-specific standards and feed that signal back into retraining. The loop was structured so that expert corrections informed each round of retraining, rather than requiring the same manual fixes indefinitely.`}
        result={`The expansion opened a new revenue stream. Outputs that had always required manual lawyer time were produced by the model at scale, reviewed through the evaluation process, and delivered with a defensible quality standard. The human-in-the-loop process became the trust infrastructure the market required, not an afterthought added once something went wrong.`}
      />

      <CaseStudyBlock
        id="supply-chain"
        title="Unlocking Growth at Scale Through a First-of-Its-Kind Supply Chain Data Architecture"
        tags={['E-Commerce', 'Supply Chain Operations', 'Cross-Functional Systems Build']}
        bg="white"
        summary={{
          setting: 'Wayfair',
          role: 'The only technical owner of the work; designed and built the multibox data architecture from scratch',
          challenge: 'An industry-standard one-to-one carton data model couldn’t link the separate boxes of a multibox product',
          outcomes: [
            'First year: supplier participation up 30%, customer lifetime value up 15%, revenue up $48M',
            'Over three years: revenue up $100M in total, including the first year’s $48M',
            'By year three: multibox shipping costs down 40%',
            'More than $40M in shipping cost reductions',
          ],
        }}
        diagram={<MultiboxDiagram />}
        problem={`The supply chain industry operates on a 1:1 data model: one product, one shipment record, one carton, one identifier. That structure is the global standard, and it made it structurally impossible to coordinate multibox products at scale.\n\nConsider a bed frame: the headboard, footboard, and rails each ship in a separate box, each box could come from a different fulfillment center, and the rails might fit ten other beds by the same supplier while the headboard is sold separately on its own. Nothing on the outside of any box indicated what was inside or what it needed to arrive with.\n\nIndividual cartons do not carry relationships to one another within the international supply chain, and every major retailer, including Amazon, Target, and Walmart, faced the same constraint. None of them had found a way around it. The result was the same across the industry: incomplete deliveries, customers unpacking what arrived only to find an entire box missing, and no systematic fix in sight.`}
        work={`I was the only person working on this from a technical capacity at Wayfair, and I built it from scratch. I redesigned the data architecture from a 1:1 model to a many-to-one structure, making it possible to associate multiple cartons with a single product and track each one individually through the supply chain. I worked with suppliers to define and document the carton relationships for every multibox product, building a process where each carton was assigned a visual identifier on the outside of the packaging so fulfillment center staff could verify at a glance that they had box one, box two, and box three before a shipment left the building.\n\nGetting there required coordinating across eight siloed divisions within Wayfair to update supplier-facing systems, internal fulfillment center infrastructure, and the scanning hardware on the warehouse floor. Suppliers needed to understand the problem, buy into the solution, and complete the carton mapping work for their product catalogs. After the first wave, the ongoing process became lightweight: only new products required updates.`}
        result={`The architecture made it possible to pick and validate complete multibox products before they shipped, eliminating the structural reason incomplete deliveries happened. Within the first year, supplier participation grew by 30%, customer lifetime value increased by 15%, and the program drove a $48M revenue surge. Over three years, the program increased revenue by $100M in total, including that first-year $48M. By year three, multibox shipping costs had dropped by 40%. Shipping cost reductions totaled more than $40M. What had been an unsolvable coordination problem across the entire industry became a solvable operational one, because the data model finally reflected how the products were actually built.`}
      />

      <CaseStudyBlock
        id="greenfield-platform"
        title="Greenfield Customer Acquisition Platform and Cloud Migration"
        tags={['SaaS Platform', 'Cloud Migration', 'Multi-Brand Architecture']}
        bg="#F5F7FA"
        summary={{
          setting: 'Endurance International Group, a portfolio of 100+ small-business brands',
          role: 'Led the organization’s first greenfield platform build: product strategy, roadmap, delivery, and the AWS cloud migration',
          challenge: 'The 100+ brands each ran on one of seven legacy systems, and marketing depended on engineering for routine changes',
          outcomes: [
            'Conversion up 30% and CSAT up 30% for flagship brands',
            'Operating costs down 25% after retiring legacy systems and moving releases to CI/CD on AWS',
            'On-time delivery improved 20% across 7 offices',
            'Core infrastructure supporting a $1B annual revenue target across the portfolio',
          ],
        }}
        diagram={<SharedPlatformDiagram />}
        problem={`Endurance International Group grew through an acquisition model, owning more than 100 brands serving small and mid-sized businesses, including Constant Contact and Domain.com as well as a number of hosting platforms such as HostGator and Bluehost. Each acquired brand needed its own customer acquisition flow, but no shared platform existed to support them. Each of the 100+ brands ran on one of seven legacy systems built independently over time, with no common architecture for promotions, domain search, or payments. Marketing depended on engineering for basic updates like a new promotion or a landing page change, which meant slow iteration across a portfolio that needed to move fast. The legacy systems also carried accumulated vulnerability surface from years of independent, uncoordinated builds.`}
        work={`I led the organization's first greenfield platform build: a white-label customer acquisition platform designed to serve all 100+ brands from shared infrastructure. My team was the first at the organization to move to the cloud, and I oversaw that migration on AWS, then built best practice playbooks from that work for cloud infrastructure and AWS use across the organization. I owned the product strategy and roadmap, defining and delivering A/B testing, promotions, semantic domain search, Payment-as-a-Service, and a bespoke CMS that gave marketing direct control over campaigns and landing pages without routing every change through engineering. Alongside the new build, I decomposed the legacy systems underneath it and rebuilt them on a microservice infrastructure, making the platform extensible to any brand the organization acquired going forward. I also created the company's first multi-location annual planning process, coordinating delivery across 7 offices.`}
        result={`The platform eliminated the dependency that had kept marketing waiting on engineering for routine changes, giving flagship brands direct control over their acquisition flows. Conversion rates improved 30% and CSAT gained 30% for those brands. Operating costs fell 25%. Replacing seven different legacy systems, built on outdated monolithic architecture, meant engineering teams no longer had to maintain old code just to keep the lights on. And because my team released through CI/CD on AWS and monitored its own releases, system administrators no longer had to push code to bare-metal servers and oversee each launch. The annual planning process improved on-time delivery by 20% across all 7 offices. The platform became core infrastructure supporting a $1B annual revenue target across the brand portfolio.`}
      />

      <CaseStudyBlock
        id="product-rewrite"
        title="Rebuilding a Legal Research and Drafting Platform for Faster Releases and Faster Customer Value"
        tags={['B2B SaaS', 'Product Rewrite', 'Product Operations']}
        bg="white"
        summary={{
          setting: 'B2B SaaS startup with a litigation research and document drafting platform (client anonymized)',
          role: 'Diagnosed the technical and leadership gaps, recommended the rewrite, built the product management team, and redesigned how the team worked',
          challenge: 'An outdated VSTO codebase blocked CI/CD, the features law firms wanted most, and expansion into new markets',
          outcomes: [
            'Full product rewrite delivered on time and $150K under budget',
            'Full CI/CD and a 30x improvement in release frequency',
            'Customers reached first value 50% faster than with the previous product',
            'Expansion into a new market',
          ],
        }}
        diagram={<ProductRewriteDiagram />}
        problem={`The company built a litigation research and document drafting platform designed to bridge the gap between online legal research and document assembly. The original product was written in VSTO (Visual Studio Tools for Office), a Microsoft technology that was headed for deprecation. The codebase was cumbersome, and VSTO's implementation limits made continuous integration and continuous delivery (CI/CD) impossible. The team couldn't build the features law firms were requesting most, because the technology wouldn't support them.\n\nThe architecture kept the product from being improved at all, kept the organization from expanding into new markets, and was incapable of scaling beyond its current state. Technical leadership hadn't kept pace with modern architecture or languages like React, so the organization stayed on outdated technology instead of building toward the future. The product's design and onboarding also meant customers took longer than they should to reach first value.`}
        work={`I diagnosed the core issues: technical leadership was lacking, and the architecture was outdated and couldn't scale. Drawing on my experience, I recommended rewriting the product in a modern language on a scalable architecture that would support practices like A/B testing and a more modern approach to software development. I also coached the CEO on product development best practices and on using customer data to plan new features and functionality.\n\nI created a voice of the customer program so the team spent its time on features that were both marketable to other firms and responsive to current customers' needs. I oversaw the creation of a product management team, hiring a product manager, a product owner, and a UX designer.\n\nI redesigned how the team worked. I introduced definitions of done and business success criteria so everyone understood the objective before work began, which made planning more efficient. Because success and testing criteria were defined before development started, tickets were completed faster and there were fewer rounds of back-and-forth between QA and developers. I also moved the team from Scrum to Kanban, so it could move with more agility and respond continuously as customer feedback updated priorities.`}
        result={`The company brought in new engineering leadership, and together we built a more efficient, scalable, cloud-based microservice architecture. The full product rewrite was delivered on time and $150K under budget. The team reached full CI/CD, and release frequency improved 30x. Through improved design and onboarding, customers achieved first value 50% faster than with the previous product. The new architecture also allowed the organization to expand into a new market.`}
      />

      <Footer />
    </div>
  );
}
