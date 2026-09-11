import { Alert, Box, Button, Container, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import { ManagedImage, PhotoEssay } from '@/core/components/media';
import { BenefitFeatures } from '@/core/components/sections/benefit-features';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { ProcessTimeline } from '@/core/components/sections/process-timeline';
import { SectionHeader } from '@/core/components/sections/section-header';
import { brand } from '@/core/content/brand';

const SURVEILLANCE_BENEFITS = [
  {
    title: 'Windowing on young leaves',
    body: 'Small translucent patches where larvae have fed through one leaf surface. This is the earliest visible stage and the one worth acting on.',
    benefit: 'Catch damage while it is still treatable',
  },
  {
    title: 'Frass in the whorl',
    body: 'Moist, sawdust-like droppings packed into the leaf whorl. Often clearer than the damage itself, and a reliable sign larvae are still present.',
    benefit: 'Clear field signal before canopy loss',
  },
  {
    title: 'Clustered reports nearby',
    body: 'One farm reporting damage is an anecdote. Several farms in a district reporting the same thing in the same week is an outbreak forming.',
    benefit: 'District early warning from shared scouting',
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
    body: 'Armyworm, stem borer, and nutrient deficiency can look similar to an untrained eye and call for completely different responses.',
    slot: 'surveillance-leaf-disease' as const,
  },
  {
    label: 'Step four',
    heading: 'Warn the farms downwind',
    body: 'Once a pattern is clear across a district, neighbouring farms can scout sooner and act earlier — protecting harvests that started with a climate-fit variety.',
    slot: 'surveillance-cassava' as const,
  },
];

export default function CropSurveillancePage() {
  return (
    <Box>
      <HeroSplit
        asH1
        eyebrow="Crop Surveillance"
        title="The right seed still loses to an outbreak nobody saw coming"
        description="Pest and disease pressure can erase a climate-resilient variety before harvest. Pooling what farmers observe turns scattered damage into an early warning while there is still time to act."
        visual={
          <Box style={{ position: 'relative', aspectRatio: '5 / 4' }}>
            <ManagedImage slot="surveillance-hero-pest" fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
          </Box>
        }
      >
        <Button
          component={Link}
          href="/seed-advisor#advisor"
          size="lg"
          radius="md"
          color="primary"
          rightSection={<IconArrowRight size={18} />}
          styles={{ root: { height: 48, fontWeight: 600 } }}
        >
          {brand.ctaAdvisor}
        </Button>
      </HeroSplit>

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="lg" maw={760}>
            <SectionHeader title="Early damage is treatable. Late damage is not." />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Fall armyworm has been established across sub-Saharan Africa since 2016 and is now
              a permanent feature of maize production. Caught in the first days of feeding it is
              manageable. Once larvae are large and sheltered deep in the whorl, the field is
              largely lost — and so is the food that planting season was meant to produce.
            </Text>
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              The difference between those two states is often less than a week of looking.
            </Text>
          </Stack>
        </Container>
      </Box>

      <BenefitFeatures
        title="What to look for in the field"
        description="Early signals that turn a scattered farm observation into a district warning."
        features={SURVEILLANCE_BENEFITS}
      />

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
            intro="Several varieties CropX recommends carry genetic resistance to the pest or disease that most threatens their crop — another layer of food-security insurance after climate fit."
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
                  'Mosaic disease is why modern cassava releases such as TME 419 and TMS 070337 are bred for tolerance or resistance as standard.',
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
              reporting network collecting data today.
            </Text>
          </Alert>
        </Container>
      </Box>

      <CtaBand
        title="Find varieties with resistance traits"
        description="Start with climate-fit seed — including options that carry genetic resistance where it matters most."
        buttonLabel={brand.ctaAdvisor}
      />
    </Box>
  );
}
