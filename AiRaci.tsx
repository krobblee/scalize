import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';
import { AI_RACI } from './siteCopy';

const description = 'A free AI RACI template for product and engineering teams. Clarify who reviews AI-generated work, approves decisions, and owns the evaluation process.';

export default function AiRaci() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{`${AI_RACI.title} | Scalize Systems`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={AI_RACI.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.scalizesystems.com${AI_RACI.path}`} />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 md:pt-32">
        <div className="container max-w-4xl">
          <Link href="/writing#templates-tools" className="text-sm font-medium text-[#046CC5]">Templates &amp; Tools</Link>
          <h1 className="mt-5 mb-4 text-3xl md:text-4xl font-bold text-[#073C81]">{AI_RACI.title}</h1>
          <div className="prose-scalize max-w-3xl">
            <p>When AI drafts a specification, writes code, or reviews a change, someone still needs to own the result. Use this spreadsheet with your product and engineering team to agree who does the work, who is accountable, who should be consulted, and who needs to be informed.</p>
            <h2>Example: reviewing an AI-drafted specification</h2>
            <p>The product manager is responsible for checking the draft against customer evidence and is accountable for deciding whether the spec is ready. The engineering lead is consulted on feasibility, and the delivery team is informed once it is ready. Assign one accountable person for each task and agree where an agent should pause for human review.</p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={AI_RACI.download} className="inline-block rounded bg-[#073C81] px-6 py-3 text-sm font-semibold text-white no-underline hover:bg-[#046CC5]">
              Download the Excel template
            </a>
            <Link href="/services#operating-diagnostic" className="text-sm font-medium text-[#046CC5]">
              Explore the Operating Diagnostic
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
