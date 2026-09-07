'use client';

import { Box, Container, Grid, GridCol, Stack, Title } from '@mantine/core';
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
}

export function HeroSplit({
  title,
  description,
  children,
  visual,
  align = 'left',
  narrow = false,
  asH1 = false,
  bg = 'cream',
}: HeroSplitProps) {
  const centred = align === 'center';

  return (
    <Box
      component="section"
      style={{
        backgroundColor: bg === 'cream' ? 'var(--cropx-cream)' : 'var(--cropx-white)',
        borderBottom: '1px solid var(--cropx-border-warm)',
      }}
      py={{ base: 48, md: narrow ? 56 : 72 }}
    >
      <Container size="xl" px={20}>
        <Grid gutter={{ base: 32, md: 56 }} align="center">
          <GridCol span={{ base: 12, md: centred ? 12 : 6 }}>
            <Stack
              gap="lg"
              maw={centred ? 720 : undefined}
              mx={centred ? 'auto' : undefined}
              ta={centred ? 'center' : 'left'}
              align={centred ? 'center' : 'flex-start'}
            >
              <Title order={asH1 ? 1 : 2} style={{ fontSize: 'var(--cropx-text-display)', lineHeight: 1.12 }}>
                {title}
              </Title>
              {description && (
                <Box
                  component="p"
                  m={0}
                  style={{
                    fontSize: 'var(--cropx-text-body-lg)',
                    lineHeight: 1.7,
                    color: 'var(--mantine-color-gray-7)',
                    maxWidth: centred ? 640 : undefined,
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
              <Box style={{ borderRadius: 12, overflow: 'hidden' }}>{visual}</Box>
            </GridCol>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
