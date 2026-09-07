import Image from 'next/image';
import { Box, Container, Group, Text } from '@mantine/core';
import { Sponsors } from '@/core/utilities';

interface LogoStripProps {
  title?: string;
}

export function LogoStrip({ title = 'Supported by' }: LogoStripProps) {
  return (
    <Box
      component="section"
      py={40}
      style={{
        backgroundColor: 'var(--cropx-white)',
        borderTop: '1px solid var(--cropx-border-warm)',
      }}
    >
      <Container size="xl" px={20}>
        <Text
          size="xs"
          fw={700}
          c="dimmed"
          tt="uppercase"
          ta="center"
          mb="lg"
          style={{ letterSpacing: '0.1em' }}
        >
          {title}
        </Text>
        <Group justify="center" gap={32} wrap="wrap">
          {Sponsors.map((sponsor) => (
            <Image
              key={sponsor.name}
              src={sponsor.image}
              alt={sponsor.name}
              height={36}
              width={120}
              style={{ width: 'auto', maxWidth: 120, height: 36, objectFit: 'contain', opacity: 0.85 }}
            />
          ))}
        </Group>
      </Container>
    </Box>
  );
}
