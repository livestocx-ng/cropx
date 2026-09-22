'use client';

import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { ManagedImage } from '@/core/components/media/managed-image';

interface FounderBandProps {
  name?: string;
  role?: string;
  quote?: string;
}

/** Early home spotlight — founder in the field, not a generic stock band. */
export function FounderBand({
  name = 'Idokoh Divine Ojochide',
  role = 'Cofounder / CEO',
  quote = 'CropX is built from the farm gate outward, matching varieties to the season that is actually coming.',
}: FounderBandProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py)"
      style={{ backgroundColor: 'var(--cropx-cream)' }}
    >
      <Container size="xl" px={20}>
        <Grid gutter={{ base: 32, md: 48 }} align="center">
          <GridCol span={{ base: 12, md: 5 }}>
            <Stack gap="md" maw={480}>
              <Text
                size="xs"
                fw={700}
                c="primary.7"
                style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                From the field
              </Text>
              <Title
                order={2}
                style={{
                  fontFamily: 'var(--cropx-font-heading)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: 'var(--cropx-ink)',
                }}
              >
                Built by people who walk the farm
              </Title>
              <Text
                style={{
                  fontSize: 'var(--cropx-text-body-lg)',
                  lineHeight: 1.7,
                  color: 'var(--cropx-muted)',
                }}
              >
                {quote}
              </Text>
              <Stack gap={2} mt="sm">
                <Text fw={700} style={{ color: 'var(--cropx-ink)' }}>
                  {name}
                </Text>
                <Text size="sm" c="dimmed">
                  {role}, CropX
                </Text>
              </Stack>
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 7 }}>
            <Grid gutter={{ base: 12, md: 16 }}>
              <GridCol span={6}>
                <Box
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: 12,
                    backgroundColor: 'var(--cropx-white)',
                  }}
                >
                  <ManagedImage
                    slot="home-essay-harvest"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </Box>
              </GridCol>
              <GridCol span={6}>
                <Box
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: 12,
                    backgroundColor: 'var(--cropx-white)',
                    marginTop: 28,
                  }}
                >
                  <ManagedImage
                    slot="agronomist-hero-extension"
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    style={{ objectPosition: 'center 25%' }}
                  />
                </Box>
              </GridCol>
            </Grid>
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}
