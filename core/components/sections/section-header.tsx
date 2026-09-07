import { Stack, Text, Title } from '@mantine/core';

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, description, align = 'left' }: SectionHeaderProps) {
  const centred = align === 'center';

  return (
    <Stack gap="sm" maw={centred ? 720 : 680} mx={centred ? 'auto' : undefined} ta={centred ? 'center' : 'left'}>
      <Title order={2}>{title}</Title>
      {description && (
        <Text c="dimmed" size="lg" style={{ lineHeight: 1.7 }}>
          {description}
        </Text>
      )}
    </Stack>
  );
}
