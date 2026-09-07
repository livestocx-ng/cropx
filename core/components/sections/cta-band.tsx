'use client';

import Link from 'next/link';
import { Box, Button, Container, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface CtaBandProps {
  title: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
  children?: ReactNode;
}

export function CtaBand({
  title,
  description,
  href = '/seed-advisor#advisor',
  buttonLabel = 'Try the Seed Advisor',
  children,
}: CtaBandProps) {
  return (
    <Box
      component="section"
      py={{ base: 56, md: 72 }}
      style={{ backgroundColor: 'var(--cropx-ink)' }}
    >
      <Container size="md" px={20}>
        <Stack gap="lg" align="center" ta="center">
          <Text
            component="h2"
            m={0}
            c="white"
            fw={700}
            style={{ fontSize: 'var(--cropx-text-h2)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
          >
            {title}
          </Text>
          {description && (
            <Text c="gray.4" maw={520} style={{ lineHeight: 1.7, fontSize: 'var(--cropx-text-body-lg)' }}>
              {description}
            </Text>
          )}
          {children ?? (
            <Button
              component={Link}
              href={href}
              size="lg"
              color="primary"
              radius="md"
              rightSection={<IconArrowRight size={18} />}
            >
              {buttonLabel}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
