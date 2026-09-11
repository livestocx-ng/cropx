import { Stack, Text, Title } from '@mantine/core';

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, description, align = 'left' }: SectionHeaderProps) {
  const centred = align === 'center';

  return (
    <Stack gap="md" maw={centred ? 760 : 720} mx={centred ? 'auto' : undefined} ta={centred ? 'center' : 'left'}>
      <Title
        order={2}
        style={{
          fontFamily: 'var(--cropx-font-heading)',
          letterSpacing: '-0.025em',
          color: 'var(--cropx-ink)',
        }}
      >
        {title}
      </Title>
      {description && (
        <Text
          m={0}
          style={{
            lineHeight: 1.7,
            fontSize: 'var(--cropx-text-body-lg)',
            color: 'var(--cropx-muted)',
          }}
        >
          {description}
        </Text>
      )}
    </Stack>
  );
}
