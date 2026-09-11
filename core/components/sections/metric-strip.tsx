import { Box, Container, Grid, GridCol, Stack, Text } from '@mantine/core';
import { Stat } from '@/core/types';

interface MetricStripProps {
  stats: Stat[];
  bg?: 'white' | 'cream';
  title?: string;
}

/** Bountiful / ThriveAgric-style impact numerals. */
export function MetricStrip({ stats, bg = 'white', title }: MetricStripProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py-sm)"
      style={{
        backgroundColor: bg === 'cream' ? 'var(--cropx-cream)' : 'var(--cropx-white)',
        borderBottom: '1px solid var(--cropx-border)',
      }}
    >
      <Container size="xl" px={20}>
        <Stack gap={32}>
          {title && (
            <Text
              fw={700}
              style={{
                fontFamily: 'var(--cropx-font-heading)',
                fontSize: 'var(--cropx-text-h2)',
                letterSpacing: '-0.02em',
                color: 'var(--cropx-ink)',
              }}
            >
              {title}
            </Text>
          )}
          <Grid gutter={{ base: 32, md: 48 }}>
            {stats.map((stat) => (
              <GridCol key={stat.label} span={{ base: 6, sm: 3 }}>
                <Stack gap={8}>
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
                  <Text size="sm" style={{ lineHeight: 1.45, color: 'var(--cropx-muted)' }}>
                    {stat.label}
                  </Text>
                  {stat.source && (
                    <Text size="xs" c="dimmed" style={{ lineHeight: 1.4 }}>
                      {stat.source}
                    </Text>
                  )}
                </Stack>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
