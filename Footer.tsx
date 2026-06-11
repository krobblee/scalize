/*
 * SCALIZE SYSTEMS — Footer
 * Design: Navy background (#073C81), white public logo asset, Inter font
 * Icons: Lucide Mail + Link for contact links
 */

import { Link } from 'wouter';
import { Mail, Link as LinkIcon } from 'lucide-react';

const LOGO_FOOTER = '/assets/images/scalize-logo-white-tagline.png';

export default function Footer() {
  return (
    <footer style={{ background: '#073C81', color: '#E8EDF5' }}>
      <div className="container section-band-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Brand logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block no-underline" aria-label="Scalize Systems home">
              <img
                src={LOGO_FOOTER}
                alt="Scalize Systems — Build, Scale, Optimize"
                className="block h-14 w-auto"
                width="220"
                height="60"
              />
            </Link>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:pt-1">
            {[
              { label: 'Services', href: '/services' },
              { label: 'How I Work', href: '/how-i-work' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: 'Writing', href: '/writing' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm no-underline transition-colors duration-150 hover:text-white"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9BB8E0' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact + social with icons */}
          <div className="flex flex-col gap-3 text-sm md:pt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <a
              href="mailto:katie@scalizesystems.com"
              className="flex items-center gap-2 no-underline transition-colors duration-150 hover:text-white"
              style={{ color: '#9BB8E0' }}
            >
              <Mail size={15} strokeWidth={1.75} />
              katie@scalizesystems.com
            </a>
            <a
              href="https://www.linkedin.com/in/katierobblee/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 no-underline transition-colors duration-150 hover:text-white"
              style={{ color: '#9BB8E0' }}
              aria-label="Katie Robblee on LinkedIn"
            >
              <LinkIcon size={15} strokeWidth={1.75} />
              Katie Robblee on LinkedIn
            </a>
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-xs"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            color: '#6B8AB5',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          © {new Date().getFullYear()} Scalize Systems LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
