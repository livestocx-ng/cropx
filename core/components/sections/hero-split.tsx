'use client';

import { Box, Container, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface HeroSplitProps {
  title: string;
  description?: string;
  children?: ReactNode;
  visual?: ReactNode;
  align?: 'left' | 'center';
  narrow?: boolean;
  asH1?: boolean;
  bg?: 'white' | 'cream';
  /** Plain text label above the title — not a Badge. */
  eyebrow?: string;
  descriptionMaxWidth?: number | string;
}

/** Product-led page hero — white by default (Bountiful SaaS pattern). */
export function HeroSplit({
  title,
  description,
  children,
  visual,
  align = 'left',
  narrow = false,
  asH1 = false,
  bg = 'white',
  eyebrow,
  descriptionMaxWidth,
}: HeroSplitProps) {
  const centred = align === 'center';

  return (
    <Box
      component="section"
      style={{
        backgroundColor: bg === 'cream' ? 'var(--cropx-cream)' : 'var(--cropx-white)',
        borderBottom: '1px solid var(--cropx-border)',
      }}
      py={narrow ? 'var(--cropx-hero-py-narrow)' : 'var(--cropx-hero-py)'}
    >
      <Container size="xl" px={20}>
        <Grid gutter={{ base: 40, md: 64 }} align="center">
          <GridCol span={{ base: 12, md: centred ? 12 : 6 }}>
            <Stack
              gap="lg"
              maw={centred ? 760 : undefined}
              mx={centred ? 'auto' : undefined}
              ta={centred ? 'center' : 'left'}
              align={centred ? 'center' : 'flex-start'}
            >
              {eyebrow && (
                <Text size="sm" fw={600} c="primary.7" style={{ letterSpacing: '-0.01em' }}>
                  {eyebrow}
                </Text>
              )}
              <Title
                order={asH1 ? 1 : 2}
                style={{
                  fontFamily: 'var(--cropx-font-heading)',
                  fontSize: 'var(--cropx-text-display)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                  color: 'var(--cropx-ink)',
                }}
              >
                {title}
              </Title>
              {description && (
                <Box
                  component="p"
                  m={0}
                  style={{
                    fontSize: 'var(--cropx-text-body-lg)',
                    lineHeight: 1.65,
                    color: 'var(--cropx-muted)',
                    maxWidth: descriptionMaxWidth ?? (centred ? 640 : undefined),
                  }}
                >
                  {description}
                </Box>
              )}
              {children}
            </Stack>
          </GridCol>

          {!centred && visual && (
            <GridCol span={{ base: 12, md: 6 }}>
              <Box
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: 'var(--cropx-cream)',
                }}
              >
                {visual}
              </Box>
            </GridCol>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
