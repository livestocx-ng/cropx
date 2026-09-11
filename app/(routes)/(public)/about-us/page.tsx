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
import { BenefitFeatures } from '@/core/components/sections/benefit-features';
import { CtaBand } from '@/core/components/sections/cta-band';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { LogoStrip } from '@/core/components/sections/logo-strip';
import { SectionHeader } from '@/core/components/sections/section-header';
import { brand } from '@/core/content/brand';
import { platformFaqs, showTeamSection, teamMembers } from '@/core/utilities';

const ABOUT_BENEFITS = [
  {
    title: 'Not selling seed',
    body: 'CropX takes no commission and stocks nothing. That is what lets a recommendation be about agronomy and food security rather than about margin.',
    benefit: 'Advice without a sales commission',
  },
  {
    title: 'Not collecting farmer data',
    body: 'The advisor runs entirely in your browser. There is no account, and nothing you enter is transmitted or stored.',
    benefit: 'No account, nothing stored',
  },
  {
    title: 'Not claiming certainty',
    body: 'The resilience scores in this preview are estimates, and we say so on every result. Overstated confidence in agricultural advice costs farmers harvests.',
    benefit: 'Honest limits on every shortlist',
  },
];

export default function AboutPage() {
  return (
    <Box>
      <HeroSplit
        asH1
        align="center"
        eyebrow="Our mission"
        title={brand.missionShort}
        description={brand.missionFull}
      />

      <LogoStrip />

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
                climate that is no longer last year&rsquo;s climate — and food security pays the
                price when the harvest fails.
              </Text>
              <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
                CropX is an attempt to make that decision legible: to take a location, a soil, and
                a crop, and return a shortlist of drought- and climate-resilient varieties with the
                reasoning attached. Not to sell seed, and not to replace the agronomists who do the
                work that software cannot.
              </Text>
            </Stack>

            <ImageMosaic
              slots={['about-mosaic-1', 'about-mosaic-2', 'about-mosaic-3', 'home-essay-harvest']}
            />
          </Stack>
        </Container>
      </Box>

      <Box component="section" py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="xl" px={20}>
          <Stack gap="lg" maw={760}>
            <SectionHeader title="How the pieces connect" />
            <Text c="dimmed" style={{ fontSize: 'var(--cropx-text-body-lg)', lineHeight: 1.75 }}>
              Warming and unreliable rains → poorly matched seed → lost yield and household food
              risk → the right variety for zone, soil, and season → a more reliable harvest.
              That is the theory of change behind every recommendation.
            </Text>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>
              {brand.sdgLine}
            </Text>
          </Stack>
        </Container>
      </Box>

      <BenefitFeatures
        title="What we are deliberately not doing"
        description="Boundaries that keep recommendations about food security rather than about margin or data extraction."
        features={ABOUT_BENEFITS}
      />

      {showTeamSection && (
        <Box py="var(--cropx-section-py)" bg="white">
          <Container size="xl" px={20}>
            <Stack gap={32}>
              <SectionHeader title="The team" />
              <Stack gap="md">
                {teamMembers.map((member) => (
                  <Box
                    key={member.image}
                    p="lg"
                    style={{ border: '1px solid var(--cropx-border)', borderRadius: 16 }}
                  >
                    <Text fw={700}>{member.name}</Text>
                    <Text size="sm" c="primary.7" fw={600}>
                      {member.role}
                    </Text>
                    <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>
                      {member.bio}
                    </Text>
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
        title={brand.ctaAdvisorOpen}
        description="Four questions about your farm, and a ranked shortlist of climate-resilient varieties."
        buttonLabel={brand.ctaAdvisorOpen}
      />
    </Box>
  );
}
