import { Box, Container, Grid, GridCol, Stack, Text } from '@mantine/core';
import { Stat } from '@/core/types';

interface MetricStripProps {
  stats: Stat[];
  bg?: 'white' | 'cream';
}

export function MetricStrip({ stats, bg = 'white' }: MetricStripProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py-sm)"
      style={{
        backgroundColor: bg === 'cream' ? 'var(--cropx-cream)' : 'var(--cropx-white)',
        borderTop: '1px solid var(--cropx-border-warm)',
        borderBottom: '1px solid var(--cropx-border-warm)',
      }}
    >
      <Container size="xl" px={20}>
        <Grid gutter={{ base: 28, md: 40 }}>
          {stats.map((stat) => (
            <GridCol key={stat.label} span={{ base: 6, sm: 3 }}>
              <Stack gap={6}>
                <Text
                  fw={800}
                  c="primary.7"
                  style={{ fontSize: 'var(--cropx-stat-size)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
                >
                  {stat.figure}
                </Text>
                <Text size="sm" c="dark.7" style={{ lineHeight: 1.5 }}>
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
      </Container>
    </Box>
  );
}
