import { Accordion, AccordionControl, AccordionItem, AccordionPanel, Box, Container, Stack, Text } from '@mantine/core';
import { AdvisorPreview } from '@/core/components/advisor/advisor-preview';
import { SeedAdvisor } from '@/core/components/advisor/seed-advisor';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { SectionHeader } from '@/core/components/sections/section-header';
import { zoneOrder, zoneProfiles } from '@/core/content/agro-zones';

export default function SeedAdvisorPage() {
  return (
    <Box>
      <HeroSplit
        asH1
        title="Which variety should you actually plant?"
        description="Tell CropX where the farm is, what the soil is like, and what you intend to grow. It ranks released varieties for those conditions and shows the reasoning behind each one."
        visual={<AdvisorPreview />}
      />

      <Box py={{ base: 40, md: 64 }} style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <SeedAdvisor />
      </Box>

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap={32}>
            <SectionHeader
              title="The six zones the advisor reasons about"
              description="Nigeria runs from near-desert in the far north to humid forest on the coast. A variety that thrives in one of these zones can fail outright in another, which is why location is the first question rather than an afterthought."
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
      />
    </Box>
  );
}
