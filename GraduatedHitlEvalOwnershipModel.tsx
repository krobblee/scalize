import Navbar from './Navbar';
import Footer from './Footer';

export default function GraduatedHitlEvalOwnershipModel() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#073C81' }}
          >
            Graduated HITL Eval Ownership Model
          </h1>
          <p
            className="text-lg md:text-xl mb-10"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#3D4A5C' }}
          >
            A step-by-step framework for building product judgment through human-in-the-loop evaluation.
          </p>

          <div className="prose-scalize mb-10" style={{ maxWidth: 'none' }}>
            <p>
              AI removed the friction that used to train product managers. This framework puts it back deliberately.
            </p>
            <p>
              It gives senior PMs a structured approach for running evals with junior PMs as active participants. It
              gives junior PMs a clear picture of what is expected at each stage and what evidence demonstrates
              readiness to advance. It gives organizational leaders a model for what skill-building in an AI-native
              product team actually requires.
            </p>
            <p>
              Five stages. Evidence-based progression gates. Built to be run repeatedly as complexity increases.
            </p>
          </div>

          <a
            href="/resources/downloads/Graduated_HITL_Eval_Ownership_Model.pdf"
            download
            className="inline-block px-7 py-3.5 text-sm font-semibold no-underline rounded transition-all duration-160 active:scale-97"
            style={{ background: '#078279', color: 'white', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#056b63')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#078279')}
          >
            Download the framework
          </a>

          <p
            className="text-sm mt-3"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#6B8AB5' }}
          >
            Free to use and share with attribution.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
