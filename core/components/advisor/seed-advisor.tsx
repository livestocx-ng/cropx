'use client';

import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconArrowRight,
  IconInfoCircle,
  IconMapPin,
  IconPlant2,
  IconRuler,
  IconSeeding,
} from '@tabler/icons-react';
import { nigerianStates, zoneProfiles } from '@/core/content/agro-zones';
import { cropOptions, recommendVarieties, soilOptions } from '@/core/content/scoring';
import { CropType, FarmProfile, SoilType } from '@/core/types';
import { VarietyCard } from './variety-card';

const RISK_LABELS: Record<string, { label: string; color: string }> = {
  VERY_HIGH: { label: 'Very high drought risk', color: 'red' },
  HIGH: { label: 'High drought risk', color: 'orange' },
  MODERATE: { label: 'Moderate drought risk', color: 'yellow' },
  LOW: { label: 'Low drought risk', color: 'primary' },
};

const STEPS = [
  { key: 'location', label: 'Location', icon: IconMapPin },
  { key: 'soil', label: 'Soil', icon: IconPlant2 },
  { key: 'crop', label: 'Crop', icon: IconSeeding },
  { key: 'area', label: 'Area', icon: IconRuler },
] as const;

export function SeedAdvisor() {
  const [state, setState] = useState<string | null>(null);
  const [soil, setSoil] = useState<string | null>(null);
  const [crop, setCrop] = useState<string | null>(null);
  const [hectares, setHectares] = useState<number | string>(1);
  const [submitted, setSubmitted] = useState<FarmProfile | null>(null);

  const complete = Boolean(state && soil && crop);

  const result = useMemo(() => {
    if (!submitted) {
      return null;
    }

    return recommendVarieties(submitted);
  }, [submitted]);

  const stateOptions = useMemo(
    () => nigerianStates.map((name) => ({ value: name, label: name })),
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!complete) {
      return;
    }

    setSubmitted({
      state: state as string,
      soil: soil as SoilType,
      crop: crop as CropType,
      hectares: Number(hectares) || 1,
    });
  };

  return (
    <Container size="xl" px={20} id="advisor">
      <Stack gap={32}>
        <Alert
          variant="light"
          color="orange"
          radius="md"
          icon={<IconAlertTriangle size={18} />}
          title="Preview, not planting advice"
        >
          <Text size="sm" style={{ lineHeight: 1.65 }}>
            Variety names, breeders and named traits are real released varieties. The numeric
            resilience scores are composite estimates written to demonstrate the ranking, not
            measured trial results. Confirm any choice with an agronomist or your state
            agricultural development programme before you buy seed.
          </Text>
        </Alert>

        <Grid gutter={{ base: 24, md: 40 }}>
          <GridCol span={{ base: 12, lg: 5 }}>
            <Card
              withBorder
              radius="md"
              p="xl"
              style={{
                position: 'sticky',
                top: 96,
                backgroundColor: 'var(--cropx-white)',
                borderColor: 'var(--cropx-border-warm)',
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack gap="lg">
                  <Stack gap={4}>
                    <Title order={3}>Describe your farm</Title>
                    <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                      Nothing is stored and no account is needed. The ranking runs in your browser.
                    </Text>
                  </Stack>

                  <Group gap="xs" wrap="wrap">
                    {STEPS.map((step, index) => (
                      <Text key={step.key} size="xs" c="dimmed" fw={600}>
                        {index + 1}. {step.label}
                      </Text>
                    ))}
                  </Group>

                  <Divider color="var(--cropx-border-warm)" />

                  <Select
                    label="State"
                    placeholder="Where is the farm?"
                    data={stateOptions}
                    value={state}
                    onChange={setState}
                    searchable
                    required
                    leftSection={<IconMapPin size={16} />}
                    comboboxProps={{ withinPortal: true }}
                  />

                  <Select
                    label="Soil type"
                    placeholder="Best description of your soil"
                    data={soilOptions}
                    value={soil}
                    onChange={setSoil}
                    required
                    leftSection={<IconPlant2 size={16} />}
                    comboboxProps={{ withinPortal: true }}
                    description="Not sure? Wet a handful and squeeze it: gritty and crumbly is sandy, sticky and smearing is clay."
                  />

                  <Select
                    label="Crop"
                    placeholder="What do you intend to plant?"
                    data={cropOptions}
                    value={crop}
                    onChange={setCrop}
                    required
                    leftSection={<IconSeeding size={16} />}
                    comboboxProps={{ withinPortal: true }}
                  />

                  <NumberInput
                    label="Area (hectares)"
                    value={hectares}
                    onChange={setHectares}
                    min={0.1}
                    max={10000}
                    step={0.5}
                    decimalScale={1}
                    leftSection={<IconRuler size={16} />}
                  />

                  <Button
                    type="submit"
                    color="primary"
                    radius="md"
                    size="md"
                    disabled={!complete}
                    rightSection={<IconArrowRight size={16} />}
                    fullWidth
                  >
                    Rank varieties
                  </Button>
                </Stack>
              </form>
            </Card>
          </GridCol>

          <GridCol span={{ base: 12, lg: 7 }}>
            {!result ? (
              <EmptyState />
            ) : (
              <Stack gap="lg">
                <Paper
                  withBorder
                  radius="md"
                  p="lg"
                  style={{ borderColor: 'var(--cropx-border-warm)', backgroundColor: 'var(--cropx-white)' }}
                >
                  <Stack gap="sm">
                    <Group gap="md" wrap="wrap">
                      <Text fw={700} c="primary.8">{result.zoneLabel}</Text>
                      <Text size="sm" c={`${RISK_LABELS[result.droughtRisk].color}.8`} fw={600}>
                        {RISK_LABELS[result.droughtRisk].label}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {zoneProfiles[result.zone].rainfallMm[0]}&ndash;
                        {zoneProfiles[result.zone].rainfallMm[1]}mm &middot;{' '}
                        {zoneProfiles[result.zone].growingSeasonDays[0]}&ndash;
                        {zoneProfiles[result.zone].growingSeasonDays[1]} day season
                      </Text>
                    </Group>

                    <Text size="sm" c="dark.6" style={{ lineHeight: 1.7 }}>
                      {result.zoneSummary}
                    </Text>

                    {result.approximateZone && (
                      <Group gap="xs" align="flex-start" wrap="nowrap">
                        <IconInfoCircle size={16} color="var(--mantine-color-yellow-7)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
                          {submitted?.state} spans more than one agro-ecological zone. These results
                          use the zone covering most of its cropped area, so treat them as
                          approximate and check locally.
                        </Text>
                      </Group>
                    )}
                  </Stack>
                </Paper>

                {result.recommendations.length === 0 ? (
                  <Alert color="gray" variant="light" radius="md">
                    No varieties for that crop are in the current dataset.
                  </Alert>
                ) : (
                  <>
                    <Text size="sm" c="dimmed">
                      {result.recommendations.length} varieties ranked for{' '}
                      {submitted?.hectares} ha in {submitted?.state}.
                    </Text>

                    <Stack gap="md">
                      {result.recommendations.map((recommendation, index) => (
                        <VarietyCard
                          key={recommendation.variety.id}
                          recommendation={recommendation}
                          rank={index + 1}
                        />
                      ))}
                    </Stack>
                  </>
                )}
              </Stack>
            )}
          </GridCol>
        </Grid>
      </Stack>
    </Container>
  );
}

function EmptyState() {
  return (
    <Card
      withBorder
      radius="md"
      p={{ base: 'lg', md: 40 }}
      style={{
        borderStyle: 'dashed',
        borderColor: 'var(--cropx-border-warm)',
        height: '100%',
        backgroundColor: 'var(--cropx-white)',
      }}
    >
      <Stack gap="md" justify="center" align="center" h="100%" ta="center" py={40}>
        <Box
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'var(--mantine-color-primary-0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconSeeding size={28} color="var(--mantine-color-primary-7)" />
        </Box>
        <Title order={3}>Your recommendations will appear here</Title>
        <Text c="dimmed" maw={420} style={{ lineHeight: 1.7 }}>
          Fill in where the farm is, what the soil is like, and what you plan to plant. Each
          suggestion comes with the reasoning behind it, including the arguments against.
        </Text>
      </Stack>
    </Card>
  );
}
