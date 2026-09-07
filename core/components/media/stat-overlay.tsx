'use client';

import { Box, Container, SimpleGrid, Stack, Text, Title, rem, useMantineTheme } from '@mantine/core';
import { ImageSlot } from '@/core/content/image-manifest';
import { Stat } from '@/core/types';
import { ManagedImage } from './managed-image';
import { ScrollReveal } from './scroll-reveal';

export type { Stat };

interface StatOverlayProps {
  slot: ImageSlot;
  title?: string;
  stats: Stat[];
}

/**
 * Figures anchored over a photograph.
 *
 * Replaces the floating white stat cards that were hardcoded into each of the
 * old solutions pages.
 */
export function StatOverlay({ slot, title, stats }: StatOverlayProps) {
  const theme = useMantineTheme();

  return (
    <Box style={{ position: 'relative', overflow: 'hidden', backgroundColor: theme.other.ink }}>
      <Box style={{ position: 'absolute', inset: 0 }}>
        <ManagedImage slot={slot} fill sizes="100vw" />
      </Box>

      <Box style={{ position: 'absolute', inset: 0, background: theme.other.scrimFull }} />

      <Container size="xl" px={20} py={{ base: 56, md: 80 }} style={{ position: 'relative' }}>
        <Stack gap={rem(40)}>
          {title && (
            <ScrollReveal>
              <Title
                order={2}
                c="white"
                maw={720}
                style={{ fontSize: rem(32), fontWeight: 700, lineHeight: 1.2 }}
              >
                {title}
              </Title>
            </ScrollReveal>
          )}

          <SimpleGrid cols={{ base: 1, sm: 2, md: stats.length >= 4 ? 4 : stats.length }} spacing={rem(28)}>
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} index={index}>
                <Stack gap={6}>
                  <Text
                    c="accent.3"
                    style={{ fontSize: rem(38), fontWeight: 800, lineHeight: 1.05 }}
                  >
                    {stat.figure}
                  </Text>
                  <Text c="white" fw={600} size="sm" style={{ lineHeight: 1.5 }}>
                    {stat.label}
                  </Text>
                  {stat.source && (
                    <Text c="gray.5" style={{ fontSize: 11, lineHeight: 1.5 }}>
                      {stat.source}
                    </Text>
                  )}
                </Stack>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
