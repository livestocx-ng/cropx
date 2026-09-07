'use client';

import { Box, SimpleGrid, Stack, Text, Title, rem } from '@mantine/core';
import { ImageSlot } from '@/core/content/image-manifest';
import { ManagedImage } from './managed-image';
import { ScrollReveal } from './scroll-reveal';

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

/**
 * A captioned image sequence.
 *
 * Captions are required rather than optional: an uncaptioned grid of stock
 * photographs is decoration, and the point of this component is to advance
 * the argument the page is making.
 */
export function PhotoEssay({ panels, columns = 3, title, intro }: PhotoEssayProps) {
  return (
    <Stack gap={rem(40)}>
      {(title || intro) && (
        <ScrollReveal>
          <Stack gap="sm" maw={680}>
            {title && (
              <Title order={2} style={{ fontSize: rem(32), fontWeight: 700, lineHeight: 1.2 }}>
                {title}
              </Title>
            )}
            {intro && (
              <Text c="dimmed" style={{ fontSize: rem(17), lineHeight: 1.7 }}>
                {intro}
              </Text>
            )}
          </Stack>
        </ScrollReveal>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, md: columns }} spacing={rem(28)}>
        {panels.map((panel, index) => (
          <ScrollReveal key={panel.slot} index={index}>
            <Stack gap="sm">
              <Box
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  borderRadius: rem(12),
                }}
              >
                <ManagedImage
                  slot={panel.slot}
                  fill
                  sizes={`(max-width: 768px) 100vw, ${Math.round(100 / columns)}vw`}
                  showCredit
                />
              </Box>

              {panel.heading && (
                <Text fw={700} size="md" c="dark.8">
                  {panel.heading}
                </Text>
              )}

              <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>
                {panel.caption}
              </Text>
            </Stack>
          </ScrollReveal>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
