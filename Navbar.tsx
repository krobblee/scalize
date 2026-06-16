/*
 * SCALIZE SYSTEMS — Navbar
 * Design: White background, real logo image, Inter nav links
 * Logo: public/assets/images/scalize-logo-horizontal.png
 * Mobile: hamburger menu with slide-down drawer
 * Brand: #073C81 navy | #046CC5 blue | #078279 teal
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const LOGO_NAVBAR = '/assets/images/scalize-logo-horizontal.png';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How I Work', href: '/how-i-work' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Resources & Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-200"
      style={{
        background: 'white',
        boxShadow: scrolled ? '0 1px 0 0 #D0D9E8' : 'none',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">

          {/* Logo */}
          <Link href="/" className="flex items-center no-underline" aria-label="Scalize Systems home">
            <img
              src={LOGO_NAVBAR}
              alt="Scalize Systems"
              className="block h-9 md:h-11 w-auto"
              width="186"
              height="44"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const active = link.href === '/' ? location === '/' : location === link.href || location.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm no-underline transition-colors duration-150 relative pb-0.5"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#073C81' : '#3D4A5C',
                    letterSpacing: '0.01em',
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: '#078279' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="block w-5 h-px transition-all duration-200" style={{ background: '#073C81', transform: open ? 'translateY(4px) rotate(45deg)' : 'none' }} />
            <span className="block w-5 h-px transition-all duration-200" style={{ background: '#073C81', opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-px transition-all duration-200" style={{ background: '#073C81', transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-250"
        style={{
          maxHeight: open ? '400px' : '0',
          borderTop: open ? '1px solid #D0D9E8' : 'none',
          background: 'white',
        }}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const active = link.href === '/' ? location === '/' : location === link.href || location.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 text-base no-underline transition-colors duration-150"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#073C81' : '#3D4A5C',
                  borderLeft: active ? '3px solid #078279' : '3px solid transparent',
                  paddingLeft: '0.75rem',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
