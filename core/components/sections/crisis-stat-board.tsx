import { Box, Container, Grid, GridCol, Stack, Text } from '@mantine/core';
import { SectionHeader } from './section-header';

export interface CrisisStat {
  figure: string;
  label: string;
  body: string;
  category: string;
  /** Required for grant-facing honesty — cite or mark as pending. */
  source: string;
  sourceUrl?: string;
}

interface CrisisStatBoardProps {
  stats: CrisisStat[];
  title?: string;
  description?: string;
}

/** Oversized problem-stat cards — Girlified dual-crisis layout. */
export function CrisisStatBoard({
  stats,
  title = 'A dual crisis of climate stress and seed mismatch',
  description = 'Warming seasons and poorly matched varieties hit the same harvest. CropX exists to close that gap at planting time.',
}: CrisisStatBoardProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py)"
      style={{ backgroundColor: 'var(--cropx-cream)' }}
    >
      <Container size="xl" px={20}>
        <Stack gap={48}>
          <SectionHeader title={title} description={description} align="center" />

          <Grid gutter={{ base: 20, md: 24 }}>
            {stats.map((stat) => (
              <GridCol key={stat.label} span={{ base: 12, md: 4 }}>
                <Stack
                  gap="md"
                  h="100%"
                  p={{ base: 'lg', md: 28 }}
                  style={{
                    borderRadius: 12,
                    backgroundColor: 'var(--cropx-white)',
                    border: '1px solid var(--cropx-border)',
                  }}
                >
                  <Text size="xs" fw={700} c="primary.7" tt="uppercase" style={{ letterSpacing: '0.08em' }}>
                    {stat.category}
                  </Text>
                  <Text
                    fw={700}
                    c="primary.7"
                    style={{
                      fontFamily: 'var(--cropx-font-heading)',
                      fontSize: 'var(--cropx-stat-size)',
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {stat.figure}
                  </Text>
                  <Text fw={700} style={{ fontFamily: 'var(--cropx-font-heading)', letterSpacing: '-0.02em' }}>
                    {stat.label}
                  </Text>
                  <Text size="sm" style={{ lineHeight: 1.65, color: 'var(--cropx-muted)' }}>
                    {stat.body}
                  </Text>
                  <Text size="xs" c="dimmed" style={{ lineHeight: 1.45 }}>
                    {stat.sourceUrl ? (
                      <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        style={{ color: 'inherit' }}
                      >
                        {stat.source}
                      </a>
                    ) : (
                      stat.source
                    )}
                  </Text>
                </Stack>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
