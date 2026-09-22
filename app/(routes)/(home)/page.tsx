import { Box, Container, Stack, Text } from '@mantine/core';
import { BenefitFeatures } from '@/core/components/sections/benefit-features';
import { CrisisStatBoard } from '@/core/components/sections/crisis-stat-board';
import { CtaBand } from '@/core/components/sections/cta-band';
import { FieldNotesCarousel } from '@/core/components/sections/field-notes-carousel';
import { FounderBand } from '@/core/components/sections/founder-band';
import { HomeHero } from '@/core/components/sections/home-hero';
import { ImpactGrid } from '@/core/components/sections/impact-grid';
import { LogoStrip } from '@/core/components/sections/logo-strip';
import { ProcessTimeline } from '@/core/components/sections/process-timeline';
import { RecognitionBand } from '@/core/components/sections/recognition-band';
import { SectionHeader } from '@/core/components/sections/section-header';
import { SolutionGrid } from '@/core/components/sections/solution-grid';
import { brand } from '@/core/content/brand';
import {
  benefitFeatures,
  crisisStats,
  howItWorksSteps,
  impactGridMetrics,
  solutionCards,
} from '@/core/utilities';

export default function HomePage() {
  return (
    <Box>
      <HomeHero />

      <LogoStrip />

      <RecognitionBand />

      {/* <FounderBand /> */}

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap="xl" maw={760}>
            <SectionHeader title="Why choose CropX?" />
            <Text style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75, color: 'var(--cropx-muted)' }}>
              Most farmers are still planting seed bred for a climate that no longer exists. Across
              the Sahel and the savanna, rains start later, stop earlier, and break mid season more
              often than a generation ago, and a failed harvest is a food security problem, not
              only a yield problem.
            </Text>
            <Text style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75, color: 'var(--cropx-muted)' }}>
              Research institutes have already released drought and heat resilient varieties.
              CropX closes the gap between that science and the farm gate: {brand.valueProp}
            </Text>
            <Box
              p="lg"
              style={{
                borderLeft: '3px solid var(--mantine-color-primary-6)',
                backgroundColor: 'var(--cropx-cream)',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <Text
                style={{
                  fontFamily: 'var(--cropx-font-heading)',
                  fontSize: 'var(--cropx-text-h3)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.35,
                  color: 'var(--cropx-ink)',
                }}
              >
                “Match the variety to the season that is actually coming, not the one that used to
                come.”
              </Text>
              <Text size="sm" c="dimmed" mt="sm">
                CropX agronomy principle
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      <BenefitFeatures features={benefitFeatures} />

      <CrisisStatBoard stats={crisisStats} />

      {/* <Box py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <BeforeAfter
            beforeSlot="home-before-drought-maize"
            afterSlot="home-after-healthy-maize"
            beforeLabel="Poorly matched variety"
            afterLabel="Climate matched variety"
            title="Not all seed fails the same way"
            caption="Drag to compare. Both fields faced the same season. The difference is whether the variety could finish inside the water that was actually available. Photographs are illustrative rather than a documented trial pair."
          />
        </Container>
      </Box> */}

      <ProcessTimeline
        title="How a shortlist is built"
        intro="Four steps from farm conditions to a climate fit variety ranking: no account, no data stored, and the reasoning shown for every match."
        steps={howItWorksSteps}
      />

      {/* <SolutionGrid
        title="Seed choice is the start of food security work"
        description="Four tools around the planting decision: climate context, pest pressure, and human advisory, with the Seed Advisor at the centre."
        solutions={solutionCards}
      /> */}

      <ImpactGrid
        title="What we are building toward"
        description="A practical path from location to a climate resilient variety shortlist that protects yield under warming conditions."
        metrics={impactGridMetrics}
      />

      <FieldNotesCarousel />

      <CtaBand
        title="Protect next season’s harvest"
        description="Four questions, no account, and a ranked shortlist of drought and climate resilient varieties for your farm."
        buttonLabel={brand.ctaAdvisorOpen}
      />
    </Box>
  );
}
