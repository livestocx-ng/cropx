import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { ManagedImage } from '@/core/components/media/managed-image';
import { ImageSlot } from '@/core/content/image-manifest';
import { SectionHeader } from './section-header';

export interface ProcessStep {
  label: string;
  heading: string;
  body: string;
  slot: ImageSlot;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  intro?: string;
}

export function ProcessTimeline({ steps, title, intro }: ProcessTimelineProps) {
  return (
    <Box component="section" py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
      <Container size="xl" px={20}>
        <Stack gap={48}>
          {(title || intro) && (
            <SectionHeader title={title ?? 'How it works'} description={intro} />
          )}

          <Stack gap={56}>
            {steps.map((step, index) => {
              const imageFirst = index % 2 === 0;

              const textCol = (
                <GridCol key={`${step.heading}-text`} span={{ base: 12, md: 6 }}>
                  <Stack gap="md">
                    <Text
                      size="xs"
                      fw={700}
                      c="primary.7"
                      tt="uppercase"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                    <Title order={3}>{step.heading}</Title>
                    <Text c="dimmed" style={{ lineHeight: 1.75, fontSize: 'var(--cropx-text-body-lg)' }}>
                      {step.body}
                    </Text>
                  </Stack>
                </GridCol>
              );

              const imageCol = (
                <GridCol key={`${step.heading}-image`} span={{ base: 12, md: 6 }}>
                  <Box
                    style={{
                      position: 'relative',
                      aspectRatio: '4 / 3',
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid var(--cropx-border-warm)',
                    }}
                  >
                    <ManagedImage slot={step.slot} fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
                  </Box>
                </GridCol>
              );

              return (
                <Grid key={step.heading} gutter={{ base: 24, md: 48 }} align="center">
                  {imageFirst ? (
                    <>
                      {imageCol}
                      {textCol}
                    </>
                  ) : (
                    <>
                      {textCol}
                      {imageCol}
                    </>
                  )}
                </Grid>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
