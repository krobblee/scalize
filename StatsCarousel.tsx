/*
 * SCALIZE SYSTEMS — Stats Carousel
 * Design: Dark editorial, large italic metric callout at top, description below
 * Style: Deep navy bg with grain texture, smooth crossfade, teal italic numbers
 */

import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    metric: '$150k',
    unit: 'under budget',
    description: 'Delivered a full product rewrite on time and $150k under budget.',
  },
  {
    metric: '$100M+',
    unit: 'revenue impact',
    description: "Designed a new data structure opening Wayfair's fulfillment centers to 30% more suppliers and increased revenue by $100M+ over three years.",
  },
  {
    metric: '15%',
    unit: 'CLV improvement',
    description: 'Improved Customer Lifetime Value by 15% through better communication and reducing multi-day deliveries.',
  },
  {
    metric: '30%',
    unit: 'conversion increase',
    description: 'Created a new cart and checkout service, increasing conversions by 30% across 5 flagship brands.',
  },
];

export default function StatsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % stats.length);
    }, 4500);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  return (
    <section
      style={{
        background: '#0D1F3C',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container max-w-4xl" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        {/* Fixed-height slide container */}
        <div style={{ position: 'relative', minHeight: '160px', marginBottom: '1.25rem' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: i === active ? 1 : 0,
                transition: 'opacity 600ms cubic-bezier(0.23,1,0.32,1)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              {/* Large italic metric + unit */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'Cambria, Georgia, serif',
                    fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    lineHeight: 1,
                    color: '#4DB8B2',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stat.metric}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.65)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {stat.unit}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.72)',
                  maxWidth: '640px',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {stats.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-label={`Go to stat ${i + 1}`}
              style={{
                width: i === active ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '9999px',
                border: 'none',
                background: i === active ? '#4DB8B2' : 'rgba(255,255,255,0.25)',
                transition: 'all 300ms cubic-bezier(0.23,1,0.32,1)',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
