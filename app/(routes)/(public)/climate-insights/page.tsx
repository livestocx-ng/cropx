import {
  Alert,
  Box,
  Container,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ManagedImage, PhotoEssay } from '@/core/components/media';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { PillarGrid } from '@/core/components/sections/pillar-grid';
import { ProcessTimeline } from '@/core/components/sections/process-timeline';
import { SectionHeader } from '@/core/components/sections/section-header';
import { zoneOrder, zoneProfiles } from '@/core/content/agro-zones';

const RISK_TEXT: Record<string, string> = {
  VERY_HIGH: 'Very high',
  HIGH: 'High',
  MODERATE: 'Moderate',
  LOW: 'Low',
};

const CLIMATE_PILLARS = [
  {
    title: 'Zone-level rainfall ranges',
    body: 'Each agro-ecological zone carries a rainfall band and a reliable growing-season length derived from Nigerian agricultural research classifications.',
  },
  {
    title: 'Drought risk profiles',
    body: 'The Sahel faces very high drought risk; the humid south faces low risk but different constraints. Recommendations weight traits accordingly.',
  },
  {
    title: 'Stated assumptions',
    body: 'Every recommendation can be traced back to the zone assumptions behind it. Local variation within a zone is substantial and worth checking.',
  },
];

const CLIMATE_STEPS = [
  {
    label: 'Shift one',
    heading: 'The season starts later and ends earlier',
    body: 'A shorter reliable window means varieties that used to finish comfortably now run out of water during grain fill. The same seed, in the same place, is now a riskier choice than it was.',
    slot: 'climate-rain-clouds' as const,
  },
  {
    label: 'Shift two',
    heading: 'Mid-season dry spells are more common',
    body: 'A two or three week break at flowering does more damage than the same shortfall spread across the season. This is where genuine stress tolerance, as opposed to early maturity, earns its place.',
    slot: 'climate-dry-riverbed' as const,
  },
  {
    label: 'Shift three',
    heading: 'Heat is rising alongside the variability',
    body: 'Higher night temperatures shorten grain filling and cut yields even when rainfall is adequate. Heat tolerance is becoming a separate requirement rather than a by-product of drought tolerance.',
    slot: 'climate-sahel' as const,
  },
  {
    label: 'Response',
    heading: 'Match duration to the season you now have',
    body: 'Where irrigation is not an option, the practical response is choosing varieties whose maturity fits the window that actually exists, and accepting a lower ceiling in exchange for reliability.',
    slot: 'climate-irrigation' as const,
  },
];

export default function ClimateInsightsPage() {
  return (
    <Box>
      <HeroSplit
        asH1
        title="You cannot choose seed without knowing the climate you are choosing it for"
        description="Rainfall totals, season length, and drought risk differ enormously across Nigeria. These are the assumptions every CropX recommendation rests on, stated openly."
        visual={
          <Box style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: 12, overflow: 'hidden' }}>
            <ManagedImage slot="climate-hero-drought" fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
          </Box>
        }
      />

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="lg" maw={760}>
            <SectionHeader title="Six zones, one country" />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Nigeria spans from semi-desert in the far north to humid forest on the coast. The
              far north gets under 600mm of rain in a season lasting under three months. The
              south-east can get five times that across most of the year. Advice that ignores this
              is not advice.
            </Text>
          </Stack>
        </Container>
      </Box>

      <PillarGrid title="What climate data underpins" pillars={CLIMATE_PILLARS} />

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="lg">
            <SectionHeader title="Zone reference" />
            <Box style={{ overflowX: 'auto' }}>
              <Table striped highlightOnHover withTableBorder verticalSpacing="sm" miw={640}>
                <TableThead>
                  <TableTr>
                    <TableTh>Zone</TableTh>
                    <TableTh>Rainfall</TableTh>
                    <TableTh>Season</TableTh>
                    <TableTh>Peak temp</TableTh>
                    <TableTh>Drought risk</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>
                  {zoneOrder.map((zone) => {
                    const profile = zoneProfiles[zone];

                    return (
                      <TableTr key={zone}>
                        <TableTd fw={600}>{profile.label}</TableTd>
                        <TableTd>
                          {profile.rainfallMm[0]}&ndash;{profile.rainfallMm[1]}mm
                        </TableTd>
                        <TableTd>
                          {profile.growingSeasonDays[0]}&ndash;{profile.growingSeasonDays[1]} days
                        </TableTd>
                        <TableTd>{profile.peakTempC}&deg;C</TableTd>
                        <TableTd>{RISK_TEXT[profile.droughtRisk]}</TableTd>
                      </TableTr>
                    );
                  })}
                </TableTbody>
              </Table>
            </Box>
            <Text size="xs" c="dimmed" style={{ lineHeight: 1.6 }}>
              Long-term averages from the standard agro-ecological classification used by
              Nigerian agricultural research institutes. These describe a zone, not a field:
              local variation within a zone is substantial.
            </Text>
          </Stack>
        </Container>
      </Box>

      <ProcessTimeline
        title="It is less about totals and more about timing"
        intro="Annual rainfall figures can look stable while becoming far harder to farm against, because what matters to a crop is when the water arrives, not how much fell over twelve months."
        steps={CLIMATE_STEPS}
      />

      <Box py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <PhotoEssay
            columns={2}
            title="Two constraints, two different answers"
            intro="Drought and waterlogging both destroy crops, and they call for opposite decisions. Knowing which one you face is most of the problem."
            panels={[
              {
                slot: 'climate-hero-drought',
                heading: 'Too little water, too unpredictably',
                caption:
                  'In the north the question is whether a variety can finish before the water runs out. Duration and stress tolerance dominate everything else.',
              },
              {
                slot: 'climate-irrigation',
                heading: 'Enough water, other problems',
                caption:
                  'In the humid south, rainfall is rarely limiting. Disease pressure, waterlogging and soil acidity are what actually cap yields, so resistance traits outrank drought ratings.',
              },
            ]}
          />
        </Container>
      </Box>

      <Box py="var(--cropx-section-py-sm)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="md" px={20}>
          <Alert variant="light" color="blue" radius="md" icon={<IconInfoCircle size={18} />} title="Not yet operational">
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              Climate Insights describes the zone model the Seed Advisor uses today. Live weather
              feeds and seasonal forecasts are planned but not yet connected.
            </Text>
          </Alert>
        </Container>
      </Box>

      <CtaBand
        title="See which varieties suit your zone"
        description="Four questions about your farm, and a ranked shortlist with the reasoning attached."
        buttonLabel="Try the Seed Advisor"
      />
    </Box>
  );
}
