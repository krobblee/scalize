/*
 * SCALIZE SYSTEMS — Contact Page
 * Design: Refined Editorial | White bg | Inter font
 * Structure: Intro → Form → Calendly (tighter spacing) → Email + LinkedIn
 */

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useFadeIn } from './useFadeIn';
import Navbar from './Navbar';
import Footer from './Footer';

const EMAILJS_SERVICE_ID = 'service_s365yrl';
const EMAILJS_TEMPLATE_NOTIFY = 'template_4t4sq5d';  // notification to Katie
const EMAILJS_TEMPLATE_REPLY = 'template_y5oczy9';   // auto-reply to visitor
const EMAILJS_PUBLIC_KEY = 'aMVR-OOelKnao_yuc';

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>(delay);
  return <div ref={ref} className={`fade-in-up ${className}`}>{children}</div>;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSubmitting(true);
    setError(null);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_NOTIFY,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      // Also send auto-reply to the visitor (best-effort, don't block on failure)
      emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_REPLY,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      ).catch(() => {});
      setSucceeded(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email katie@scalizesystems.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F7FA' }}>
      <Navbar />

      {/* Intro paragraph */}
      <section className="pt-24 pb-0 md:pt-28" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            <p
              className="text-base mb-6"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C', lineHeight: '1.8' }}
            >
              Add your name and contact information along with what you'd like help with and I'll be in touch. If you prefer, book a free 15 minute consultation below.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* Contact form */}
      <section className="pb-0 pt-4" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <FadeSection>
            {succeeded ? (
              <div
                className="p-6 rounded-sm"
                style={{ background: '#EEF2F8', border: '1px solid #078279', borderLeft: '3px solid #078279' }}
              >
                <p
                  className="text-base font-semibold mb-1"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
                >
                  Thank you for your interest in Scalize Systems.
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#3D4A5C' }}
                >
                  I will be in touch soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81', letterSpacing: '0.08em' }}
                    >
                      Name <span style={{ color: '#078279' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="px-4 py-3 text-sm rounded-sm outline-none transition-all duration-150"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: '#0F1923',
                        background: '#F4F7FA',
                        border: '1px solid #c8d4e8',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#046CC5')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#c8d4e8')}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="company"
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81', letterSpacing: '0.08em' }}
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="px-4 py-3 text-sm rounded-sm outline-none transition-all duration-150"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        color: '#0F1923',
                        background: '#F4F7FA',
                        border: '1px solid #c8d4e8',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#046CC5')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#c8d4e8')}
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81', letterSpacing: '0.08em' }}
                  >
                    Email <span style={{ color: '#078279' }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="px-4 py-3 text-sm rounded-sm outline-none transition-all duration-150"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#0F1923',
                      background: '#F4F7FA',
                      border: '1px solid #c8d4e8',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#046CC5')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#c8d4e8')}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium uppercase tracking-wide"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81', letterSpacing: '0.08em' }}
                  >
                    Message <span style={{ color: '#078279' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="px-4 py-3 text-sm rounded-sm outline-none transition-all duration-150 resize-none"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: '#0F1923',
                      background: '#F4F7FA',
                      border: '1px solid #c8d4e8',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#046CC5')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#c8d4e8')}
                    placeholder="Tell me about the stage of the company and the shape of the problem."
                  />
                </div>

                {error && (
                  <p className="text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#c0392b' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="self-start px-7 py-3.5 text-sm font-semibold rounded transition-all duration-160 active:scale-97 disabled:opacity-60"
                  style={{
                    background: '#073C81',
                    color: 'white',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = '#046CC5'; }}
                  onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = '#073C81'; }}
                >
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </FadeSection>
        </div>
      </section>

      {/* Calendly — directly below form, with the embed cropped to remove Calendly's default top/bottom whitespace */}
      <section className="pt-0 pb-0" style={{ background: 'white' }}>
        <div className="container max-w-4xl">
          <h2
            className="text-xl font-semibold mb-1"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#073C81' }}
          >
            Book a free 15-minute consultation
          </h2>
          <div
            className="rounded-sm overflow-hidden"
            style={{ height: '690px', background: 'white' }}
          >
            <iframe
              src="https://calendly.com/katie-scalizesystems/15-mins?hide_event_type_details=1&hide_gdpr_banner=1&embed_domain=scalizesystems.com&embed_type=Inline"
              width="100%"
              height="760"
              frameBorder="0"
              scrolling="no"
              title="Book a free 15-minute consultation with Katie Robblee"
              style={{ display: 'block', transform: 'translateY(-58px)' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
