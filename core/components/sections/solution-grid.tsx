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

export function SolutionGrid({ solutions, title, description }: SolutionGridProps) {
  return (
    <Box component="section" py="var(--cropx-section-py)" bg="white">
      <Container size="xl" px={20}>
        <Stack gap={40}>
          {(title || description) && <SectionHeader title={title ?? 'Platform'} description={description} />}

          <Grid gutter={{ base: 24, md: 28 }}>
            {solutions.map((solution) => (
              <GridCol key={solution.href} span={{ base: 12, sm: 6 }}>
                <Link href={solution.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box
                    style={{
                      border: '1px solid var(--cropx-border-warm)',
                      borderRadius: 12,
                      overflow: 'hidden',
                      backgroundColor: 'var(--cropx-white)',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    className="solution-card"
                  >
                    <Box style={{ position: 'relative', aspectRatio: '16 / 9' }}>
                      <ManagedImage slot={solution.slot} fill sizes="(max-width: 768px) 100vw, 50vw" />
                    </Box>
                    <Stack gap="sm" p="lg">
                      <Title order={3} size="h4">{solution.title}</Title>
                      <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>
                        {solution.description}
                      </Text>
                      <Text
                        size="sm"
                        fw={600}
                        c="primary.7"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                      >
                        Learn more <IconArrowRight size={14} />
                      </Text>
                    </Stack>
                  </Box>
                </Link>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      </Container>

      <style>{`
        .solution-card:hover {
          border-color: var(--mantine-color-primary-3);
          box-shadow: 0 8px 24px rgba(12, 31, 20, 0.06);
        }
      `}</style>
    </Box>
  );
}
