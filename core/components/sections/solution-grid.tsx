'use client';

import Link from 'next/link';
import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { ManagedImage } from '@/core/components/media/managed-image';
import { ImageSlot } from '@/core/content/image-manifest';
import { SectionHeader } from './section-header';

export interface SolutionCard {
  title: string;
  description: string;
  href: string;
  slot: ImageSlot;
}

interface SolutionGridProps {
  solutions: SolutionCard[];
  title?: string;
  description?: string;
}

/**
 * Editorial solution tiles — image + type, no card chrome.
 * First item spans full width for a magazine lead.
 */
export function SolutionGrid({ solutions, title, description }: SolutionGridProps) {
  const [lead, ...rest] = solutions;

  return (
    <Box
      component="section"
      py="var(--cropx-section-py)"
      style={{ backgroundColor: 'var(--cropx-cream)' }}
    >
      <Container size="xl" px={20}>
        <Stack gap={48}>
          {(title || description) && (
            <SectionHeader title={title ?? 'Solutions'} description={description} />
          )}

          <Stack gap={40}>
            {lead && <SolutionTile solution={lead} featured />}

            {rest.length > 0 && (
              <Grid gutter={{ base: 28, md: 32 }}>
                {rest.map((solution) => (
                  <GridCol key={solution.href} span={{ base: 12, sm: 4 }}>
                    <SolutionTile solution={solution} />
                  </GridCol>
                ))}
              </Grid>
            )}
          </Stack>
        </Stack>
      </Container>

      <style>{`
        .solution-media-img {
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .solution-tile:hover .solution-media-img {
          transform: scale(1.035);
        }
        .solution-tile:hover .solution-arrow {
          transform: translateX(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          .solution-media-img,
          .solution-arrow {
            transition: none;
          }
          .solution-tile:hover .solution-media-img {
            transform: none;
          }
          .solution-tile:hover .solution-arrow {
            transform: none;
          }
        }
      `}</style>
    </Box>
  );
}

function SolutionTile({
  solution,
  featured = false,
}: {
  solution: SolutionCard;
  featured?: boolean;
}) {
  return (
    <Link
      href={solution.href}
      className="solution-tile"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: '100%',
      }}
    >
      <Stack gap="md" h="100%">
        <Box
          style={{
            position: 'relative',
            aspectRatio: featured ? '21 / 9' : '4 / 3',
            overflow: 'hidden',
            borderRadius: 8,
            backgroundColor: 'var(--cropx-white)',
          }}
        >
          <ManagedImage
            slot={solution.slot}
            fill
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
            className="solution-media-img"
          />
        </Box>

        <Stack gap={6} maw={featured ? 560 : undefined}>
          <Title
            order={3}
            style={{
              fontFamily: 'var(--cropx-font-heading)',
              fontSize: featured ? 'var(--cropx-text-h2)' : 'var(--cropx-text-h3)',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
            }}
          >
            {solution.title}
          </Title>
          <Text
            size={featured ? 'md' : 'sm'}
            style={{ lineHeight: 1.65, color: 'var(--cropx-muted)' }}
          >
            {solution.description}
          </Text>
          <Text
            size="sm"
            fw={600}
            c="primary.7"
            mt={4}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            Learn more{' '}
            <IconArrowRight size={16} className="solution-arrow" style={{ transition: 'transform 0.25s ease' }} />
          </Text>
        </Stack>
      </Stack>
    </Link>
  );
}
