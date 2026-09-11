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

const AGRONOMIST_BENEFITS = [
  {
    title: 'Confirm or correct the shortlist',
    body: 'The ranking is built from zone-level assumptions. An agronomist who knows the district can tell a farmer where those assumptions do not hold.',
    benefit: 'Human judgement on local exceptions',
  },
  {
    title: 'Diagnose what a photograph cannot',
    body: 'Soil chemistry, root damage, and several look-alike diseases need hands and sometimes a laboratory, not an image.',
    benefit: 'Escalate what software cannot settle',
  },
  {
    title: 'Train in groups where possible',
    body: 'Farmer field schools reach many more people per officer-day than individual visits, and farmers learn from each other in the process.',
    benefit: 'More farms reached per advisory hour',
  },
];

const AGRONOMIST_STEPS = [
  {
    label: 'Step one',
    heading: 'Arrive with the basics settled',
    body: 'A farmer who already has a shortlist of climate-fit varieties suited to their zone and soil starts the conversation much further along than one asking what to plant.',
    slot: 'agronomist-field-demo' as const,
  },
  {
    label: 'Step two',
    heading: 'Escalate what needs a human',
    body: 'Unclear pest identification, an unusual soil problem, or a variety that is recommended but unavailable locally are exactly the cases where judgement is irreplaceable.',
    slot: 'agronomist-soil-test' as const,
  },
  {
    label: 'Step three',
    heading: 'Train in groups where possible',
    body: 'Farmer field schools reach many more people per officer-day than individual visits, and farmers learn a good deal from each other in the process.',
    slot: 'agronomist-training' as const,
  },
];

export default function AgronomistNetworkPage() {
  return (
    <Box>
      <HeroSplit
        asH1
        eyebrow="Agronomist Network"
        title="A model can rank varieties. It cannot walk a field."
        description="Every CropX recommendation is a starting point for a conversation with someone who knows the district — so climate-fit seed choices become planting decisions farmers can trust."
        visual={
          <Box style={{ position: 'relative', aspectRatio: '5 / 4' }}>
            <ManagedImage slot="agronomist-hero-extension" fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
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
            <SectionHeader title="The extension gap is the real bottleneck" />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Research institutes have released the varieties. The difficulty is that the ratio of
              extension officers to farmers across much of the region means most farmers will
              never have a technical conversation about seed choice in a given season — even when
              food security depends on it.
            </Text>
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Software cannot close that gap on its own, but it can make each hour of an
              agronomist&rsquo;s time count for more, by arriving with the routine climate and
              soil questions already answered.
            </Text>
          </Stack>
        </Container>
      </Box>

      <BenefitFeatures
        title="Software handles the routine, people handle the judgement"
        description="Anything that can be answered from location, soil, and crop should not consume an agronomist's visit."
        features={AGRONOMIST_BENEFITS}
      />

      <ProcessTimeline steps={AGRONOMIST_STEPS} />

      <Box py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap={40}>
            <PhotoEssay
              columns={2}
              title="What CropX asks of an agronomist"
              panels={[
                {
                  slot: 'agronomist-field-demo',
                  heading: 'Confirm or correct the shortlist',
                  caption:
                    'The ranking is built from zone-level assumptions. An agronomist who knows the district can tell a farmer where those assumptions do not hold.',
                },
                {
                  slot: 'agronomist-soil-test',
                  heading: 'Diagnose what a photograph cannot',
                  caption:
                    'Soil chemistry, root damage, and several look-alike diseases need hands and sometimes a laboratory, not an image.',
                },
              ]}
            />

            <Stack gap="md" maw={720}>
              <SectionHeader title="For agronomists and extension officers" />
              <Text c="dimmed" style={{ lineHeight: 1.75 }}>
                If you advise farmers professionally, the parts of CropX likely to be useful are a
                consistent zone reference, released variety details with breeder attribution, and
                written reasoning for each suggestion — including the arguments against it.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box py="var(--cropx-section-py-sm)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="md" px={20}>
          <Alert variant="light" color="blue" radius="md" icon={<IconInfoCircle size={18} />} title="Not yet operational">
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              There is no agronomist network taking requests today. This page describes the
              intended model; consultation and referral features have not been built.
            </Text>
          </Alert>
        </Container>
      </Box>

      <CtaBand
        title="Partner with CropX"
        description="Questions about joining as an agronomist or extension partner? Get in touch."
        href="/contact-us"
        buttonLabel="Contact us"
      />
    </Box>
  );
}
