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

const AGRONOMIST_PILLARS = [
  {
    title: 'Confirm or correct the shortlist',
    body: 'The ranking is built from zone-level assumptions. An agronomist who knows the district can tell a farmer where those assumptions do not hold.',
  },
  {
    title: 'Diagnose what a photograph cannot',
    body: 'Soil chemistry, root damage, and several look-alike diseases need hands and sometimes a laboratory, not an image.',
  },
  {
    title: 'Train in groups where possible',
    body: 'Farmer field schools reach many more people per officer-day than individual visits, and farmers learn a good deal from each other in the process.',
  },
];

const AGRONOMIST_STEPS = [
  {
    label: 'Step one',
    heading: 'Arrive with the basics settled',
    body: 'A farmer who already has a shortlist of varieties suited to their zone and soil starts the conversation much further along than one asking what to plant.',
    slot: 'agronomist-field-demo' as const,
  },
  {
    label: 'Step two',
    heading: 'Escalate what needs a human',
    body: 'Unclear pest identification, an unusual soil problem, or a variety that is recommended but unavailable locally are exactly the cases where judgement and local knowledge are irreplaceable.',
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
        title="A model can rank varieties. It cannot walk a field."
        description="Every CropX recommendation is a starting point for a conversation with someone who knows the district, not a replacement for one."
        visual={
          <Box style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: 12, overflow: 'hidden' }}>
            <ManagedImage slot="agronomist-hero-extension" fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
          </Box>
        }
      />

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="lg" maw={760}>
            <SectionHeader title="The extension gap is the real bottleneck" />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Research institutes have released the varieties. The difficulty is that the ratio of
              extension officers to farmers across much of the region means most farmers will
              never have a technical conversation about seed choice in a given season.
            </Text>
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Software cannot close that gap on its own, but it can make each hour of an
              agronomist&rsquo;s time count for more, by arriving at the conversation with the
              routine questions already answered.
            </Text>
          </Stack>
        </Container>
      </Box>

      <PillarGrid
        title="Software handles the routine, people handle the judgement"
        description="The division of labour matters. Anything that can be answered from location, soil, and crop should not consume an agronomist's visit."
        pillars={AGRONOMIST_PILLARS}
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
                If you advise farmers professionally, the parts of CropX likely to be useful to you
                are:
              </Text>
              <Box component="ul" pl="lg" style={{ lineHeight: 1.7 }}>
                <Box component="li" mb="sm">
                  A consistent zone reference to explain rainfall and season assumptions to farmers
                </Box>
                <Box component="li" mb="sm">
                  Released variety details with breeder attribution, so recommendations are traceable
                </Box>
                <Box component="li">
                  Written reasoning for each suggestion, including the arguments against it
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box py="var(--cropx-section-py-sm)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="md" px={20}>
          <Alert variant="light" color="blue" radius="md" icon={<IconInfoCircle size={18} />} title="Not yet operational">
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              There is no agronomist network taking requests today. This page describes the
              intended model, and the consultation and referral features it depends on have not
              been built.
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
