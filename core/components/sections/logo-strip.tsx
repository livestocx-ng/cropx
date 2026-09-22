'use client';

import Image from 'next/image';
import { Box, Container, Text } from '@mantine/core';
import { Sponsors } from '@/core/utilities';

interface LogoStripProps {
  title?: string;
}

/** Continuous partner marquee — Girlified “Supported & Backed By” pattern. */
export function LogoStrip({ title = 'In the climate & agritech ecosystem' }: LogoStripProps) {
  const loop = [...Sponsors, ...Sponsors];

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
      {/* <Container size="xl" px={20} mb="md">
        <Text size="sm" fw={600} c="dimmed" ta="center" style={{ letterSpacing: '-0.01em' }}>
          {title}
        </Text>
      </Container> */}

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
