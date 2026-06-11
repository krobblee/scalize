import { Link } from 'wouter';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-[70vh] flex items-center">
        <section className="container py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#078279' }}>404</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Page not found</h1>
          <p className="max-w-2xl mx-auto mb-8" style={{ color: '#3D4A5C' }}>
            The page you are looking for does not exist or has moved.
          </p>
          <Link href="/" className="inline-flex items-center justify-center rounded px-5 py-3 font-semibold text-white no-underline" style={{ background: '#046CC5' }}>
            Return home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
