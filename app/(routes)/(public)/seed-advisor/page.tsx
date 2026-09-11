'use client';

import Link from 'next/link';
import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Box, Button, Container, Group, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { AdvisorPreview } from '@/core/components/advisor/advisor-preview';
import { SeedAdvisor } from '@/core/components/advisor/seed-advisor';
import { BenefitFeatures } from '@/core/components/sections/benefit-features';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { LogoStrip } from '@/core/components/sections/logo-strip';
import { SectionHeader } from '@/core/components/sections/section-header';
import { brand } from '@/core/content/brand';
import { zoneOrder, zoneProfiles } from '@/core/content/agro-zones';
import { benefitFeatures } from '@/core/utilities';

export default function SeedAdvisorPage() {
  return (
    <Box>
      <HeroSplit
        asH1
        eyebrow="Seed Advisor"
        title="Which climate-resilient variety should you plant?"
        description={`${brand.valueProp} ${brand.howAi}`}
        visual={<AdvisorPreview />}
      >
        <Group gap="sm" wrap="wrap">
          <Button
            component={Link}
            href="#advisor"
            size="lg"
            radius="md"
            color="primary"
            rightSection={<IconArrowRight size={18} />}
            styles={{ root: { height: 48, fontWeight: 600 } }}
          >
            {brand.ctaAdvisor}
          </Button>
          <Button
            component={Link}
            href="/climate-insights"
            size="lg"
            radius="md"
            variant="subtle"
            color="dark"
            styles={{ root: { height: 48, fontWeight: 600 } }}
          >
            See climate zones
          </Button>
        </Group>
      </HeroSplit>

      <LogoStrip title="Built with open agronomy references" />

      <BenefitFeatures
        title="How the Seed Advisor ranks varieties"
        description="Zone climate, resilience traits, and transparent reasoning — the same three pillars as the rest of CropX."
        features={benefitFeatures}
      />

      <Box id="advisor" py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <SeedAdvisor />
      </Box>

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap={32}>
            <SectionHeader
              title="The six zones behind every recommendation"
              description="Nigeria runs from near-desert in the far north to humid forest on the coast. Matching variety to zone is how seed choice protects yield — and food security — when the rains are unreliable."
            />

            <Accordion variant="separated" radius="md">
              {zoneOrder.map((zone) => {
                const profile = zoneProfiles[zone];

                return (
                  <AccordionItem key={zone} value={zone}>
                    <AccordionControl>
                      <Text fw={600}>{profile.label}</Text>
                    </AccordionControl>
                    <AccordionPanel>
                      <Stack gap={6}>
                        <Text size="sm" c="primary.8" fw={600}>
                          {profile.rainfallMm[0]}&ndash;{profile.rainfallMm[1]}mm rainfall &middot;{' '}
                          {profile.growingSeasonDays[0]}&ndash;{profile.growingSeasonDays[1]} day season
                        </Text>
                        <Text c="dimmed" style={{ lineHeight: 1.7 }}>
                          {profile.summary}
                        </Text>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      <CtaBand
        title="Ready to compare varieties for your farm?"
        description="The advisor runs in your browser. Nothing you enter is stored or transmitted."
        buttonLabel={brand.ctaAdvisor}
      />
    </Box>
  );
}
