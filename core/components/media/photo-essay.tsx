'use client';

import { Box, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { ImageSlot } from '@/core/content/image-manifest';
import { ManagedImage } from './managed-image';

export interface EssayPanel {
  slot: ImageSlot;
  /** The caption carries the narrative; it is not a label for the picture. */
  caption: string;
  heading?: string;
}

interface PhotoEssayProps {
  panels: EssayPanel[];
  columns?: 2 | 3 | 4;
  title?: string;
  intro?: string;
}

/** Caption-led photo sequence — borderless editorial crops. */
export function PhotoEssay({ panels, columns = 3, title, intro }: PhotoEssayProps) {
  return (
    <Stack gap={40}>
      {(title || intro) && (
        <Stack gap="sm" maw={680}>
          {title && (
            <Title
              order={2}
              style={{
                fontFamily: 'var(--cropx-font-heading)',
                fontSize: 'var(--cropx-text-h2)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </Title>
          )}
          {intro && (
            <Text style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.7, color: 'var(--cropx-muted)' }}>
              {intro}
            </Text>
          )}
        </Stack>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: columns }} spacing={{ base: 28, md: 32 }}>
        {panels.map((panel) => (
          <Stack key={panel.slot} gap="sm">
            <Box
              className="essay-media"
              style={{
                position: 'relative',
                aspectRatio: '5 / 4',
                overflow: 'hidden',
                borderRadius: 8,
                backgroundColor: 'var(--cropx-cream)',
              }}
            >
              <ManagedImage
                slot={panel.slot}
                fill
                sizes={`(max-width: 768px) 100vw, ${Math.round(100 / columns)}vw`}
                showCredit
                className="essay-media-img"
              />
            </Box>

            {panel.heading && (
              <Text
                fw={700}
                style={{
                  fontFamily: 'var(--cropx-font-heading)',
                  letterSpacing: '-0.02em',
                  color: 'var(--cropx-ink)',
                }}
              >
                {panel.heading}
              </Text>
            )}

            <Text size="sm" style={{ lineHeight: 1.65, color: 'var(--cropx-muted)' }}>
              {panel.caption}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>

      <style>{`
        .essay-media-img {
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .essay-media:hover .essay-media-img {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .essay-media-img { transition: none; }
          .essay-media:hover .essay-media-img { transform: none; }
        }
      `}</style>
    </Stack>
  );
}
