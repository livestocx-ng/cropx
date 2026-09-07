import { Box, Group, Stack, Text } from '@mantine/core';

/**
 * Static product preview for marketing heroes — not interactive.
 */
export function AdvisorPreview() {
  return (
    <Box
      p="md"
      style={{
        backgroundColor: 'var(--cropx-white)',
        border: '1px solid var(--cropx-border-warm)',
        borderRadius: 12,
        boxShadow: '0 16px 48px rgba(12, 31, 20, 0.08)',
      }}
    >
      <Stack gap="md">
        <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.08em' }}>
          Seed Advisor — preview
        </Text>

        <Box
          p="sm"
          style={{
            border: '1px solid var(--cropx-border-warm)',
            borderRadius: 8,
            backgroundColor: 'var(--cropx-cream)',
          }}
        >
          <Stack gap={6}>
            <Text size="xs" c="dimmed">State</Text>
            <Text size="sm" fw={600}>Katsina</Text>
          </Stack>
        </Box>

        <Group grow>
          <Box p="sm" style={{ border: '1px solid var(--cropx-border-warm)', borderRadius: 8 }}>
            <Text size="xs" c="dimmed">Soil</Text>
            <Text size="sm" fw={600}>Sandy loam</Text>
          </Box>
          <Box p="sm" style={{ border: '1px solid var(--cropx-border-warm)', borderRadius: 8 }}>
            <Text size="xs" c="dimmed">Crop</Text>
            <Text size="sm" fw={600}>Maize</Text>
          </Box>
        </Group>

        <Stack gap="sm">
          <Text size="xs" fw={700} c="primary.7" tt="uppercase">Top match</Text>
          <Box
            p="sm"
            style={{
              border: '1px solid var(--mantine-color-primary-3)',
              borderRadius: 8,
              backgroundColor: 'var(--mantine-color-primary-0)',
            }}
          >
            <Group justify="space-between" align="flex-start">
              <Stack gap={2}>
                <Text fw={700} size="sm">SAMMAZ 16</Text>
                <Text size="xs" c="dimmed">IAR Zaria · 85 days</Text>
              </Stack>
              <Text fw={800} c="primary.7" size="lg">87</Text>
            </Group>
          </Box>

          <Box p="sm" style={{ border: '1px solid var(--cropx-border-warm)', borderRadius: 8 }}>
            <Group justify="space-between">
              <Text fw={600} size="sm">SAMMAZ 14</Text>
              <Text fw={700} c="dimmed" size="sm">79</Text>
            </Group>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
