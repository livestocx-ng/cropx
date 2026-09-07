'use client';

import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { cropLabels, soilLabels } from '@/core/content/seed-varieties';
import { Recommendation } from '@/core/types';

function scoreTone(score: number) {
  if (score >= 80) return { color: 'primary', label: 'Strong match' };
  if (score >= 65) return { color: 'accent', label: 'Reasonable match' };
  if (score >= 50) return { color: 'orange', label: 'Marginal match' };
  return { color: 'red', label: 'Poor match' };
}

export function VarietyCard({
  recommendation,
  rank,
}: {
  recommendation: Recommendation;
  rank: number;
}) {
  const { variety, score, rationale, seasonRisk } = recommendation;
  const tone = scoreTone(score);
  const [yieldLow, yieldHigh] = variety.expectedYieldTonsPerHa;

  return (
    <Card
      withBorder
      radius="md"
      p="lg"
      style={{ borderColor: 'var(--cropx-border-warm)', backgroundColor: 'var(--cropx-white)' }}
    >
      <Stack gap="md">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Stack gap={4}>
            <Group gap="sm" align="baseline">
              <Text size="sm" c="dimmed" fw={600}>#{rank}</Text>
              <Title order={3} size="h4">{variety.name}</Title>
            </Group>
            <Text size="sm" c="dimmed">
              {cropLabels[variety.crop]} &middot; {variety.breeder}
            </Text>
          </Stack>

          <Stack gap={2} align="flex-end" style={{ flexShrink: 0 }}>
            <Text fw={800} style={{ fontSize: '1.75rem', lineHeight: 1 }} c={`${tone.color}.7`}>
              {score}
            </Text>
            <Text size="xs" c="dimmed">{tone.label}</Text>
          </Stack>
        </Group>

        {seasonRisk && (
          <Group
            gap="xs"
            align="flex-start"
            wrap="nowrap"
            p="sm"
            style={{
              backgroundColor: 'var(--mantine-color-orange-0)',
              border: '1px solid var(--mantine-color-orange-3)',
              borderRadius: 8,
            }}
          >
            <IconAlertTriangle size={14} color="var(--mantine-color-orange-8)" style={{ flexShrink: 0, marginTop: 2 }} />
            <Text size="xs" c="orange.9" style={{ lineHeight: 1.5 }}>
              This variety may not reach maturity before the rains withdraw in your zone.
            </Text>
          </Group>
        )}

        <Group gap="xl" wrap="wrap">
          <Metric label="Maturity" value={`${variety.maturityDays} days`} />
          <Metric label="Expected yield" value={`${yieldLow}\u2013${yieldHigh} t/ha`} />
          <Metric label="Drought" value={`${variety.droughtToleranceScore}/100`} />
          <Metric label="Heat" value={`${variety.heatToleranceScore}/100`} />
        </Group>

        {variety.traits.length > 0 && (
          <Text size="sm" c="dark.6">
            <Text component="span" fw={600}>Traits: </Text>
            {variety.traits.join(' · ')}
          </Text>
        )}

        <Text size="sm" c="dimmed">
          <Text component="span" fw={600} c="dark.6">Suited to: </Text>
          {variety.suitableSoils.map((soil) => soilLabels[soil]).join(', ')}
        </Text>

        <Box>
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={8} style={{ letterSpacing: '0.06em' }}>
            Why it ranked here
          </Text>
        <Box component="ul" pl="md" style={{ margin: 0 }}>
            {rationale.map((reason) => (
              <Box component="li" key={reason} mb={6}>
                <Text size="sm" c="dark.6" style={{ lineHeight: 1.6 }}>
                  {reason}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Text size="sm" c="dimmed" fs="italic" style={{ lineHeight: 1.65 }}>
          {variety.notes}
        </Text>
      </Stack>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap={2}>
      <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.06em' }}>
        {label}
      </Text>
      <Text fw={600} size="sm">{value}</Text>
    </Stack>
  );
}
