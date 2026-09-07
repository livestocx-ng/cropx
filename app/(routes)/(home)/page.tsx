import Link from 'next/link';
import { Box, Button, Container, Group, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { AdvisorPreview } from '@/core/components/advisor/advisor-preview';
import { BeforeAfter } from '@/core/components/media';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { ImpactGrid } from '@/core/components/sections/impact-grid';
import { LogoStrip } from '@/core/components/sections/logo-strip';
import { MetricStrip } from '@/core/components/sections/metric-strip';
import { ProcessTimeline } from '@/core/components/sections/process-timeline';
import { SectionHeader } from '@/core/components/sections/section-header';
import { SolutionGrid } from '@/core/components/sections/solution-grid';
import {
  howItWorksSteps,
  impactGridMetrics,
  impactStats,
  solutionCards,
} from '@/core/utilities';

export default function HomePage() {
  return (
    <Box>
      <HeroSplit
        asH1
        title="The rains have changed. The seed has to change with them."
        description="CropX uses AI to match farms with the drought and heat-resilient crop varieties that can still deliver a harvest in an ever-warming environment."
        visual={<AdvisorPreview />}
      >
        <Group gap="md">
          <Button
            component={Link}
            href="/seed-advisor#advisor"
            size="lg"
            radius="md"
            color="primary"
            rightSection={<IconArrowRight size={18} />}
          >
            Find seed for your farm
          </Button>
          <Button
            component={Link}
            href="/climate-insights"
            size="lg"
            radius="md"
            variant="outline"
            color="dark"
          >
            See the climate picture
          </Button>
        </Group>
      </HeroSplit>

      <MetricStrip stats={impactStats} />

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="lg" maw={760}>
            <SectionHeader title="Most farmers are planting seed bred for a climate that no longer exists" />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Across the Sahel and the savanna, the rains start later, stop earlier, and break in
              the middle more often than they did a generation ago. A variety that reliably
              finished its cycle in 1990 may now run out of water three weeks before harvest.
            </Text>
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Meanwhile research institutes have released dozens of varieties bred precisely for
              these conditions. The gap is not science. It is that a farmer in Katsina has no
              practical way to know which of those varieties suits their field, their soil, and
              the length of the season they can actually expect.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Box py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="xl" px={20}>
          <BeforeAfter
            beforeSlot="home-before-drought-maize"
            afterSlot="home-after-healthy-maize"
            beforeLabel="Poorly matched variety"
            afterLabel="Zone-matched variety"
            title="Not all seed fails the same way"
            caption="Drag to compare. Both fields faced the same season. The difference is whether the variety planted could finish its cycle inside the water that was actually available. Photographs are illustrative rather than a documented trial pair."
          />
        </Container>
      </Box>

      <ProcessTimeline
        title="From a location to a shortlist, with the reasoning shown"
        intro="No account, no data collection, and no black box. Every recommendation can be traced back to the rainfall, soil, and season assumptions behind it."
        steps={howItWorksSteps}
      />

      <SolutionGrid
        title="Seed choice is the start, not the whole job"
        description="Four tools designed around the planting decision — and the climate, pest, and advisory context that surrounds it."
        solutions={solutionCards}
      />

      <ImpactGrid metrics={impactGridMetrics} />

      <LogoStrip />

      <CtaBand
        title="Find out which varieties suit your farm"
        description="Four questions, no account, and the reasoning behind every suggestion."
        buttonLabel="Open the Seed Advisor"
      />
    </Box>
  );
}
