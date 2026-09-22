'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mantine/core';
import { Sponsors } from '@/core/utilities';
import type { Sponsor } from '@/core/types';

interface LogoStripProps {
  title?: string;
}

function shuffleSponsors(list: Sponsor[]): Sponsor[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Continuous partner marquee — Girlified “Supported & Backed By” pattern. */
export function LogoStrip({ title = 'In the climate & agritech ecosystem' }: LogoStripProps) {
  const [sponsors, setSponsors] = useState(Sponsors);

  useEffect(() => {
    setSponsors(shuffleSponsors(Sponsors));
  }, []);

  const loop = [...sponsors, ...sponsors];

  return (
    <Box
      component="section"
      py={36}
      style={{
        backgroundColor: 'var(--cropx-white)',
        borderTop: '1px solid var(--cropx-border)',
        borderBottom: '1px solid var(--cropx-border)',
        overflow: 'hidden',
      }}
    >
      {/* Title reserved: {title} */}

      <Box className="logo-marquee" style={{ position: 'relative' }}>
        <Box className="logo-marquee-track">
          {loop.map((sponsor, index) => (
            <Box
              key={`${sponsor.name}-${index}`}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingInline: 36,
                height: 72,
              }}
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                height={56}
                width={180}
                style={{ width: 'auto', maxWidth: 180, height: 56, objectFit: 'contain', opacity: 0.85 }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <style>{`
        .logo-marquee-track {
          display: flex;
          width: max-content;
          animation: cropx-marquee 32s linear infinite;
        }
        @keyframes cropx-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            gap: 16px;
            padding-inline: 20px;
          }
        }
      `}</style>
    </Box>
  );
}
