import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { SectionHeader } from './section-header';

export interface Pillar {
  title: string;
  body: string;
}

interface PillarGridProps {
  pillars: Pillar[];
  title?: string;
  description?: string;
}

export function PillarGrid({ pillars, title, description }: PillarGridProps) {
  return (
    <Box component="section" py="var(--cropx-section-py)" bg="white">
      <Container size="xl" px={20}>
        <Stack gap={48}>
          {title && <SectionHeader title={title} description={description} />}

          <Grid gutter={{ base: 28, md: 40 }}>
            {pillars.map((pillar, index) => (
              <GridCol key={pillar.title} span={{ base: 12, md: 4 }}>
                <Stack
                  gap="md"
                  h="100%"
                  p={{ base: 'lg', md: 28 }}
                  style={{
                    borderRadius: 16,
                    border: '1px solid var(--cropx-border)',
                    backgroundColor: 'var(--cropx-cream)',
                  }}
                >
                  <Text
                    fw={700}
                    c="primary.7"
                    style={{
                      fontFamily: 'var(--cropx-font-heading)',
                      fontSize: '1.5rem',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                  <Title
                    order={3}
                    style={{
                      fontFamily: 'var(--cropx-font-heading)',
                      fontSize: 'var(--cropx-text-h3)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {pillar.title}
                  </Title>
                  <Text style={{ lineHeight: 1.7, color: 'var(--cropx-muted)' }}>
                    {pillar.body}
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
