'use client';

import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { ManagedImage } from '@/core/components/media/managed-image';
import { ImageSlot } from '@/core/content/image-manifest';
import { SectionHeader } from './section-header';

export interface ProcessStep {
  label: string;
  heading: string;
  body: string;
  slot: ImageSlot;
  /** CSS aspect-ratio for the photo frame. Defaults to 4 / 3. */
  aspect?: string;
  /** next/image object-position when the crop needs anchoring. */
  objectPosition?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  intro?: string;
}

/** Numbered editorial sequence — large photos, step labels, alternating layout. */
export function ProcessTimeline({ steps, title, intro }: ProcessTimelineProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py)"
      style={{ backgroundColor: 'var(--cropx-cream)' }}
    >
      <Container size="xl" px={20}>
        <Stack gap={72}>
          {(title || intro) && (
            <SectionHeader title={title ?? 'How it works'} description={intro} />
          )}

          <Stack gap={0} className="process-track">
            {steps.map((step, index) => {
              const imageFirst = index % 2 === 0;
              const isLast = index === steps.length - 1;
              const aspect = step.aspect ?? '4 / 3';
              const stepNo = String(index + 1).padStart(2, '0');

              const textCol = (
                <GridCol span={{ base: 12, md: 5 }}>
                  <Stack gap="md" maw={440} justify="center" h="100%" py={8}>
                    <Text
                      size="xs"
                      fw={700}
                      c="primary.7"
                      style={{
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {step.label || `Step ${stepNo}`}
                    </Text>
                    <Text
                      fw={700}
                      c="primary.8"
                      style={{
                        fontFamily: 'var(--cropx-font-heading)',
                        fontSize: 'clamp(3rem, 6vw, 4.25rem)',
                        lineHeight: 0.9,
                        letterSpacing: '-0.05em',
                      }}
                    >
                      {stepNo}
                    </Text>
                    <Title
                      order={3}
                      style={{
                        fontFamily: 'var(--cropx-font-heading)',
                        fontSize: 'var(--cropx-text-h2)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.15,
                        color: 'var(--cropx-ink)',
                      }}
                    >
                      {step.heading}
                    </Title>
                    <Text
                      style={{
                        lineHeight: 1.75,
                        fontSize: 'var(--cropx-text-body-lg)',
                        color: 'var(--cropx-muted)',
                      }}
                    >
                      {step.body}
                    </Text>
                  </Stack>
                </GridCol>
              );

              const imageCol = (
                <GridCol span={{ base: 12, md: 7 }}>
                  <Box
                    className="process-media"
                    style={{
                      position: 'relative',
                      aspectRatio: aspect,
                      overflow: 'hidden',
                      borderRadius: 12,
                      backgroundColor: 'var(--cropx-white)',
                    }}
                  >
                    <ManagedImage
                      slot={step.slot}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"

                      className="process-media-img"
                      style={
                        step.objectPosition
                          ? { objectPosition: step.objectPosition }
                          : undefined
                      }
                    />
                  </Box>
                </GridCol>
              );

              return (
                <Box
                  key={step.heading}
                  className="process-step"
                  style={{
                    position: 'relative',
                    paddingBottom: isLast ? 0 : 'clamp(3.5rem, 7vw, 5.5rem)',
                  }}
                >
                  {!isLast && <Box className="process-connector" aria-hidden />}
                  <Grid gutter={{ base: 28, md: 56 }} align="center">
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
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>

      <style>{`
        .process-media-img {
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .process-media:hover .process-media-img {
          transform: scale(1.035);
        }
        .process-connector {
          display: none;
        }
        @media (min-width: 62em) {
          .process-connector {
            display: block;
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 1px;
            height: clamp(3.5rem, 7vw, 5.5rem);
            transform: translateX(-50%);
            background: linear-gradient(
              180deg,
              var(--mantine-color-primary-3) 0%,
              transparent 100%
            );
            pointer-events: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-media-img {
            transition: none;
          }
          .process-media:hover .process-media-img {
            transform: none;
          }
        }
      `}</style>
    </Box>
  );
}
