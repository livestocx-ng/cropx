import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { SectionHeader } from './section-header';

export interface BenefitFeature {
  title: string;
  body: string;
  benefit: string;
}

interface BenefitFeaturesProps {
  features: BenefitFeature[];
  title?: string;
  description?: string;
}

/** Three benefit cards with green BENEFIT chips — Girlified “Next Generation” pattern. */
export function BenefitFeatures({
  features,
  title = 'Climate-fit seed choice, explained',
  description = 'Three things every recommendation is built on — zone climate, resilience ranking, and reasoning you can read.',
}: BenefitFeaturesProps) {
  return (
    <Box component="section" py="var(--cropx-section-py)" bg="white">
      <Container size="xl" px={20}>
        <Stack gap={48}>
          <SectionHeader title={title} description={description} align="center" />

          <Grid gutter={{ base: 20, md: 24 }}>
            {features.map((feature) => (
              <GridCol key={feature.title} span={{ base: 12, md: 4 }}>
                <Stack
                  gap="md"
                  h="100%"
                  p={{ base: 'lg', md: 28 }}
                  style={{
                    borderRadius: 12,
                    border: '1px solid var(--cropx-border)',
                    backgroundColor: 'var(--cropx-cream)',
                  }}
                >
                  <Title
                    order={3}
                    style={{
                      fontFamily: 'var(--cropx-font-heading)',
                      fontSize: 'var(--cropx-text-h3)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {feature.title}
                  </Title>
                  <Text style={{ lineHeight: 1.7, color: 'var(--cropx-muted)', flex: 1 }}>
                    {feature.body}
                  </Text>
                  <Text
                    size="xs"
                    fw={700}
                    c="primary.8"
                    style={{
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      padding: '8px 10px',
                      borderRadius: 6,
                      backgroundColor: 'var(--mantine-color-primary-0)',
                      width: 'fit-content',
                    }}
                  >
                    Benefit: {feature.benefit}
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
