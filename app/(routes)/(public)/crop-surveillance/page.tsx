import {
  Alert,
  Box,
  Container,
  Stack,
  Text,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { ManagedImage, PhotoEssay } from '@/core/components/media';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { PillarGrid } from '@/core/components/sections/pillar-grid';
import { ProcessTimeline } from '@/core/components/sections/process-timeline';
import { SectionHeader } from '@/core/components/sections/section-header';

const SURVEILLANCE_PILLARS = [
  {
    title: 'Windowing on young leaves',
    body: 'Small translucent patches where larvae have fed through one leaf surface. This is the earliest visible stage and the one worth acting on.',
  },
  {
    title: 'Frass in the whorl',
    body: 'Moist, sawdust-like droppings packed into the leaf whorl. Often clearer than the damage itself, and a reliable sign larvae are still present.',
  },
  {
    title: 'Clustered reports nearby',
    body: 'One farm reporting damage is an anecdote. Several farms in a district reporting the same thing in the same week is an outbreak forming.',
  },
];

const SURVEILLANCE_STEPS = [
  {
    label: 'Step one',
    heading: 'Scout deliberately, twice a week',
    body: 'Walk the field from emergence, checking whorls at several points rather than only along the edges. Damage is patchy, and field margins are not representative of what is happening inside.',
    slot: 'surveillance-scouting' as const,
  },
  {
    label: 'Step two',
    heading: 'Report what you find',
    body: 'A photograph and a location are enough. The value of a single observation is low; the value of many observations from the same district in the same week is high.',
    slot: 'surveillance-phone-field' as const,
  },
  {
    label: 'Step three',
    heading: 'Identify the problem correctly',
    body: 'Armyworm, stem borer, and nutrient deficiency can look similar to an untrained eye and call for completely different responses. Getting the identification right prevents wasted spraying.',
    slot: 'surveillance-leaf-disease' as const,
  },
  {
    label: 'Step four',
    heading: 'Warn the farms downwind',
    body: 'Once a pattern is clear across a district, neighbouring farms can scout sooner and act earlier. This is the whole point: the observation that helps you most is usually somebody else\u2019s.',
    slot: 'surveillance-cassava' as const,
  },
];

export default function CropSurveillancePage() {
  return (
    <Box>
      <HeroSplit
        asH1
        title="The right seed still loses to an outbreak nobody saw coming"
        description="Pest and disease pressure moves across districts faster than word of mouth. Pooling what farmers observe turns scattered damage reports into an early warning that arrives while there is still time to act."
        visual={
          <Box style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: 12, overflow: 'hidden' }}>
            <ManagedImage slot="surveillance-hero-pest" fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
          </Box>
        }
      />

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="lg" maw={760}>
            <SectionHeader title="Early damage is treatable. Late damage is not." />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Fall armyworm has been established across sub-Saharan Africa since 2016 and is now
              a permanent feature of maize production. Caught in the first days of feeding it is
              manageable. Once larvae are large and sheltered deep in the whorl, contact sprays
              cannot reach them and the field is largely lost.
            </Text>
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              The difference between those two states is often less than a week of looking.
            </Text>
          </Stack>
        </Container>
      </Box>

      <PillarGrid title="What to look for in the field" pillars={SURVEILLANCE_PILLARS} />

      <ProcessTimeline
        title="A district-level picture built from field-level observation"
        intro="None of this requires new hardware. It requires a way for what a farmer already sees to reach the people who can act on it."
        steps={SURVEILLANCE_STEPS}
      />

      <Box py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <PhotoEssay
            columns={2}
            title="Resistance is a seed decision, not just a spray decision"
            intro="Several of the varieties CropX recommends carry genetic resistance to the pest or disease that most threatens their crop. Choosing them reduces how much spraying is needed at all."
            panels={[
              {
                slot: 'surveillance-leaf-disease',
                heading: 'Groundnut rosette',
                caption:
                  'Rosette virus can take an entire groundnut crop. Resistance in the SAMNUT series is the single most valuable trait in that species, ahead of drought rating.',
              },
              {
                slot: 'surveillance-cassava',
                heading: 'Cassava mosaic',
                caption:
                  'Mosaic disease is why modern cassava releases such as TME 419 and TMS 070337 are bred for tolerance or resistance as standard rather than as a premium feature.',
              },
            ]}
          />
        </Container>
      </Box>

      <Box py="var(--cropx-section-py-sm)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="md" px={20}>
          <Alert variant="light" color="blue" radius="md" icon={<IconInfoCircle size={18} />} title="Not yet operational">
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              Crop surveillance is described here as designed, not as running. There is no
              reporting network collecting data today, and this page should not be read as a
              service you can currently rely on for outbreak warnings.
            </Text>
          </Alert>
        </Container>
      </Box>

      <CtaBand
        title="Find varieties with resistance traits"
        description="Several recommended varieties carry genetic resistance to the pests and diseases that matter most in your zone."
        buttonLabel="Try the Seed Advisor"
      />
    </Box>
  );
}
