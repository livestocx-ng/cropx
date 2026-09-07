import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Stack,
  Text,
} from '@mantine/core';
import { ImageMosaic } from '@/core/components/media';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { PillarGrid } from '@/core/components/sections/pillar-grid';
import { SectionHeader } from '@/core/components/sections/section-header';
import { platformFaqs, showTeamSection, teamMembers } from '@/core/utilities';

const ABOUT_PILLARS = [
  {
    title: 'Not selling seed',
    body: 'CropX takes no commission and stocks nothing. That is what lets a recommendation be about agronomy rather than about margin.',
  },
  {
    title: 'Not collecting farmer data',
    body: 'The advisor runs entirely in your browser. There is no account, and nothing you enter is transmitted or stored.',
  },
  {
    title: 'Not claiming certainty',
    body: 'The resilience scores in this preview are estimates, and we say so on every result. Overstated confidence in agricultural advice costs farmers harvests.',
  },
];

export default function AboutPage() {
  return (
    <Box>
      <HeroSplit
        asH1
        align="center"
        title="Safeguarding African food security, one planting decision at a time"
        description="CropX exists to close the gap between the climate-resilient varieties research has already produced and the farmers who have no practical way to find them."
      />

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="xl" px={20}>
          <Stack gap={48}>
            <Stack gap="lg" maw={780}>
              <SectionHeader title="The problem is distribution, not discovery" />
              <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
                Institutes including IAR Zaria, IITA, NCRI and NRCRI have spent decades breeding
                crop varieties for exactly the conditions African farmers now face: shorter
                seasons, mid-season dry spells, higher temperatures, and heavy pest pressure. Those
                varieties exist. Many are certified and available.
              </Text>
              <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
                What does not exist, for most farmers, is a way to find out which of them suits a
                particular field. So the default is to plant what was planted last year, in a
                climate that is no longer last year&rsquo;s climate.
              </Text>
              <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
                CropX is an attempt to make that decision legible: to take a location, a soil, and
                a crop, and return a shortlist with the reasoning attached. Not to sell seed, and
                not to replace the agronomists who do the work that software cannot.
              </Text>
            </Stack>

            <ImageMosaic
              slots={['about-mosaic-1', 'about-mosaic-2', 'about-mosaic-3', 'home-essay-harvest']}
            />
          </Stack>
        </Container>
      </Box>

      <PillarGrid title="What we are deliberately not doing" pillars={ABOUT_PILLARS} />

      {showTeamSection && (
        <Box py="var(--cropx-section-py)" bg="white">
          <Container size="xl" px={20}>
            <Stack gap={32}>
              <SectionHeader title="The team" />
              <Stack gap="md">
                {teamMembers.map((member) => (
                  <Box key={member.image} p="lg" style={{ border: '1px solid var(--cropx-border-warm)', borderRadius: 12 }}>
                    <Text fw={700}>{member.name}</Text>
                    <Text size="sm" c="primary.7" fw={600}>{member.role}</Text>
                    <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>{member.bio}</Text>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}

      <Box component="section" py="var(--cropx-section-py)" bg="white">
        <Container size="md" px={20}>
          <Stack gap={32}>
            <SectionHeader title="Common questions" />

            <Accordion variant="separated" radius="md">
              {platformFaqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionControl>
                    <Text fw={600}>{faq.value}</Text>
                  </AccordionControl>
                  <AccordionPanel>
                    <Text c="dimmed" style={{ lineHeight: 1.75 }}>
                      {faq.description}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      <CtaBand
        title="Try the Seed Advisor"
        description="Four questions about your farm, and a ranked shortlist with the reasoning attached."
        buttonLabel="Open the Seed Advisor"
      />
    </Box>
  );
}
