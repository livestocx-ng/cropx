'use client';

import { Badge, Box, Grid, GridCol, Group, Stack, Text, ThemeIcon, Title, rem } from '@mantine/core';
import { ImageSlot } from '@/core/content/image-manifest';
import { ManagedImage } from './managed-image';
import { ScrollReveal } from './scroll-reveal';

export interface SplitStep {
  /** Short step label, e.g. 'Step 1'. */
  label: string;
  heading: string;
  body: string;
  slot: ImageSlot;
}

interface StickySplitProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  steps: SplitStep[];
}

/**
 * A sticky heading column against a scrolling image column.
 *
 * Used for the multi-step explanations: the reader keeps the question in view
 * while the answers scroll past with their supporting photographs.
 */
export function StickySplit({ eyebrow, title, intro, steps }: StickySplitProps) {
  return (
    <Grid gutter={{ base: 30, md: 60 }}>
      <GridCol span={{ base: 12, md: 5 }}>
        <Box
          style={{
            position: 'sticky',
            top: rem(100),
          }}
        >
          <Stack gap="md">
            {eyebrow && (
              <Badge variant="light" color="primary" radius="sm" size="lg" w="fit-content">
                {eyebrow}
              </Badge>
            )}
            <Title order={2} style={{ fontSize: rem(34), fontWeight: 700, lineHeight: 1.15 }}>
              {title}
            </Title>
            {intro && (
              <Text c="dimmed" style={{ fontSize: rem(17), lineHeight: 1.7 }}>
                {intro}
              </Text>
            )}
          </Stack>
        </Box>
      </GridCol>

      <GridCol span={{ base: 12, md: 7 }}>
        <Stack gap={rem(56)}>
          {steps.map((step, index) => (
            <ScrollReveal key={step.heading} index={index}>
              <Stack gap="md">
                <Box
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    borderRadius: rem(14),
                  }}
                >
                  <ManagedImage
                    slot={step.slot}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    showCredit
                  />
                </Box>

                <Group gap="sm" align="flex-start" wrap="nowrap">
                  <ThemeIcon size={34} radius="xl" color="primary" variant="light">
                    <Text fw={700} size="sm">
                      {index + 1}
                    </Text>
                  </ThemeIcon>
                  <Stack gap={6}>
                    <Text size="xs" fw={700} c="primary" tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                      {step.label}
                    </Text>
                    <Title order={3} style={{ fontSize: rem(22), fontWeight: 700 }}>
                      {step.heading}
                    </Title>
                    <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                      {step.body}
                    </Text>
                  </Stack>
                </Group>
              </Stack>
            </ScrollReveal>
          ))}
        </Stack>
      </GridCol>
    </Grid>
  );
}
