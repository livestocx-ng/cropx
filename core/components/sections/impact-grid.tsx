import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { SectionHeader } from './section-header';

export interface ImpactMetric {
  figure: string;
  label: string;
}

interface ImpactGridProps {
  metrics: ImpactMetric[];
  title?: string;
  description?: string;
}

export function ImpactGrid({ metrics, title, description }: ImpactGridProps) {
  return (
    <Box component="section" py="var(--cropx-section-py)" bg="white">
      <Container size="xl" px={20}>
        <Stack gap={40}>
          <SectionHeader
            title={title ?? 'What we are building toward'}
            description={description}
            align="center"
          />

          <Grid gutter={{ base: 24, md: 32 }}>
            {metrics.map((metric) => (
              <GridCol key={metric.label} span={{ base: 6, md: 4 }}>
                <Box
                  p="lg"
                  style={{
                    border: '1px solid var(--cropx-border-warm)',
                    borderRadius: 12,
                    backgroundColor: 'var(--cropx-cream)',
                    height: '100%',
                  }}
                >
                  <Stack gap={8}>
                    <Text
                      fw={800}
                      c="primary.7"
                      style={{ fontSize: 'var(--cropx-stat-size)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                    >
                      {metric.figure}
                    </Text>
                    <Text size="sm" c="dark.7" style={{ lineHeight: 1.55 }}>
                      {metric.label}
                    </Text>
                  </Stack>
                </Box>
              </GridCol>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
