import Link from 'next/link';
import { Box, Container, Group, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { brand } from '@/core/content/brand';

interface RecognitionBandProps {
  title?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

/** Short partner / mission highlight — Girlified “Global Recognition” band. */
export function RecognitionBand({
  title = 'Built for climate resilient planting decisions',
  description = brand.missionFull,
  href = '/about-us',
  linkLabel = 'Read our mission',
}: RecognitionBandProps) {
  return (
    <Box
      component="section"
      py="var(--cropx-section-py-sm)"
      style={{ backgroundColor: 'var(--cropx-cream)' }}
    >
      <Container size="md" px={20}>
        <Stack gap="md" ta="center" align="center">
          <Text
            size="xs"
            fw={700}
            c="primary.7"
            tt="uppercase"
            style={{ letterSpacing: '0.08em' }}
          >
            Why CropX exists
          </Text>
          <Text
            component="h2"
            m={0}
            fw={700}
            style={{
              fontFamily: 'var(--cropx-font-heading)',
              fontSize: 'var(--cropx-text-h2)',
              letterSpacing: '-0.025em',
              color: 'var(--cropx-ink)',
              lineHeight: 1.15,
            }}
          >
            {title}
          </Text>
          <Text m={0} maw={560} style={{ lineHeight: 1.7, color: 'var(--cropx-muted)', fontSize: 'var(--cropx-text-body-lg)' }}>
            {description}
          </Text>
          <Group gap={6}>
            <Text
              component={Link}
              href={href}
              size="sm"
              fw={600}
              c="primary.7"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              {linkLabel} <IconArrowRight size={16} />
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
