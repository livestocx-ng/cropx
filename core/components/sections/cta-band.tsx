'use client';

import Link from 'next/link';
import { Box, Button, Container, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { brand } from '@/core/content/brand';
import { ReactNode } from 'react';

interface CtaBandProps {
  title: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
  children?: ReactNode;
}

/** Solid primary band — ThriveAgric / Bountiful “Get Started” energy. */
export function CtaBand({
  title,
  description,
  href = '/seed-advisor#advisor',
  buttonLabel = brand.ctaAdvisor,
  children,
}: CtaBandProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py-sm)"
      style={{ backgroundColor: 'var(--mantine-color-primary-7)' }}
    >
      <Container size="md" px={20}>
        <Stack gap="lg" align="center" ta="center">
          <Text
            component="h2"
            m={0}
            c="white"
            fw={700}
            style={{
              fontFamily: 'var(--cropx-font-heading)',
              fontSize: 'var(--cropx-text-h2)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </Text>
          {description && (
            <Text
              m={0}
              maw={520}
              style={{ lineHeight: 1.65, fontSize: 'var(--cropx-text-body-lg)', color: 'rgba(255,255,255,0.85)' }}
            >
              {description}
            </Text>
          )}
          {children ?? (
            <Button
              component={Link}
              href={href}
              size="xl"
              radius="md"
              variant="white"
              color="dark"
              rightSection={<IconArrowRight size={20} />}
              styles={{
                root: {
                  height: 52,
                  paddingInline: 28,
                  fontWeight: 700,
                  fontSize: 16,
                  marginTop: 8,
                },
              }}
            >
              {buttonLabel}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
