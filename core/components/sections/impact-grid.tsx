import { Box, Container, Grid, GridCol, Stack, Text } from '@mantine/core';

export interface ImpactMetric {
  figure: string;
  label: string;
}

interface ImpactGridProps {
  metrics: ImpactMetric[];
  title?: string;
  description?: string;
}

/** ThriveAgric-style impact board — oversized numerals, no heavy cards. */
export function ImpactGrid({ metrics, title, description }: ImpactGridProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py)"
      style={{ backgroundColor: 'var(--cropx-ink)', color: 'white' }}
    >
      <Container size="xl" px={20}>
        <Stack gap={48}>
          <Stack gap="md" maw={720} mx="auto" ta="center">
            <Text
              component="h2"
              m={0}
              c="white"
              fw={700}
              style={{
                fontFamily: 'var(--cropx-font-heading)',
                fontSize: 'var(--cropx-text-h2)',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              {title ?? 'What we are building toward'}
            </Text>
            {description && (
              <Text m={0} style={{ lineHeight: 1.65, fontSize: 'var(--cropx-text-body-lg)', color: 'rgba(255,255,255,0.72)' }}>
                {description}
              </Text>
            )}
          </Stack>

          <Grid gutter={{ base: 32, md: 48 }}>
            {metrics.map((metric) => (
              <GridCol key={metric.label} span={{ base: 6, md: 4 }}>
                <Stack gap={10}>
                  <Text
                    fw={700}
                    c="accent.3"
                    style={{
                      fontFamily: 'var(--cropx-font-heading)',
                      fontSize: 'var(--cropx-stat-size)',
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {metric.figure}
                  </Text>
                  <Text size="sm" style={{ lineHeight: 1.55, color: 'rgba(255,255,255,0.78)' }}>
                    {metric.label}
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
