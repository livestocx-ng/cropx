import { Box, Container, Stack, Text } from '@mantine/core';

interface QuoteBlockProps {
  quote: string;
  author: string;
  role?: string;
}

export function QuoteBlock({ quote, author, role }: QuoteBlockProps) {
  return (
    <Box component="section" py="var(--cropx-section-py-sm)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
      <Container size="md" px={20}>
        <Stack gap="md" ta="center">
          <Text
            style={{
              fontSize: 'var(--cropx-text-body-lg)',
              lineHeight: 1.75,
              fontStyle: 'italic',
              color: 'var(--mantine-color-dark-7)',
            }}
          >
            &ldquo;{quote}&rdquo;
          </Text>
          <Text size="sm" fw={600} c="dark.8">
            {author}
            {role && (
              <Text component="span" c="dimmed" fw={400}>
                {' '}
                &middot; {role}
              </Text>
            )}
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
