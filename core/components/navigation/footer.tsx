import Link from 'next/link';
import { IconMail, IconMapPin, IconPhone, IconSeeding } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { contactChannels } from '@/core/utilities';

export function Footer() {
  return (
    <Box component="footer" style={{ backgroundColor: 'var(--cropx-ink)', color: 'white' }}>
      <style>
        {`
          .footer-link {
            color: rgba(255, 255, 255, 0.72);
            text-decoration: none;
            font-size: var(--mantine-font-size-sm);
            transition: color 0.2s ease;
            display: inline-block;
            width: fit-content;
          }
          .footer-link:hover {
            color: var(--mantine-color-white) !important;
          }
        `}
      </style>

      <Box py={{ base: 48, md: 56 }}>
        <Container size="xl" px={20}>
          <Grid gutter={{ base: 'xl', md: 48 }}>
            <GridCol span={{ base: 12, md: 5 }}>
              <Stack gap="lg">
                <Flex align="center" gap="sm">
                  <ThemeIcon size={36} radius="md" variant="light" color="accent">
                    <IconSeeding size={20} />
                  </ThemeIcon>
                  <Title order={3} c="white" size="h4">
                    CropX
                  </Title>
                </Flex>
                <Text size="sm" c="gray.4" style={{ maxWidth: 400, lineHeight: 1.65 }}>
                  Safeguarding African food security by matching farms with the drought and
                  climate-resilient crop varieties that can still yield in a warming environment.
                </Text>

                <Group gap="lg" wrap="wrap">
                  <Flex gap="xs" align="center">
                    <IconMail size={16} color="#adb5bd" />
                    <Anchor href={`mailto:${contactChannels.email}`} className="footer-link">
                      {contactChannels.email}
                    </Anchor>
                  </Flex>
                  <Flex gap="xs" align="center">
                    <IconPhone size={16} color="#adb5bd" />
                    <Anchor href={`tel:${contactChannels.phone.replace(/\s/g, '')}`} className="footer-link">
                      {contactChannels.phone}
                    </Anchor>
                  </Flex>
                </Group>
              </Stack>
            </GridCol>

            <GridCol span={{ base: 12, md: 7 }}>
              <Grid gutter="xl">
                <GridCol span={{ base: 6, sm: 4 }}>
                  <FooterColumn title="Platform">
                    <Link href="/seed-advisor" className="footer-link">
                      Seed Advisor
                    </Link>
                    <Link href="/climate-insights" className="footer-link">
                      Climate Insights
                    </Link>
                    <Link href="/crop-surveillance" className="footer-link">
                      Crop Surveillance
                    </Link>
                    <Link href="/agronomist-network" className="footer-link">
                      Agronomist Network
                    </Link>
                  </FooterColumn>
                </GridCol>

                <GridCol span={{ base: 6, sm: 4 }}>
                  <FooterColumn title="Company">
                    <Link href="/about-us" className="footer-link">
                      About
                    </Link>
                    <Link href="/blog" className="footer-link">
                      Field Notes
                    </Link>
                    <Link href="/contact-us" className="footer-link">
                      Contact
                    </Link>
                  </FooterColumn>
                </GridCol>

                <GridCol span={{ base: 12, sm: 4 }}>
                  <FooterColumn title="Legal">
                    <Link href="/terms-of-service" className="footer-link">
                      Terms of Service
                    </Link>
                    <Link href="/privacy-policy" className="footer-link">
                      Privacy Policy
                    </Link>
                    <Link href="/image-credits" className="footer-link">
                      Photo credits
                    </Link>
                  </FooterColumn>
                </GridCol>
              </Grid>
            </GridCol>
          </Grid>

          <Grid mt={40} gutter="md">
            {contactChannels.offices.map((office) => (
              <GridCol key={office.label} span={{ base: 12, sm: 6 }}>
                <Flex gap="xs" align="flex-start">
                  <IconMapPin size={16} color="#eec95e" style={{ flexShrink: 0, marginTop: 2 }} />
                  <Stack gap={4}>
                    <Text size="xs" fw={700} c="gray.3" tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                      {office.label}
                    </Text>
                    {office.lines.map((line) => (
                      <Text key={line} size="sm" c="gray.4" style={{ lineHeight: 1.5 }}>
                        {line}
                      </Text>
                    ))}
                  </Stack>
                </Flex>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box py="md" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Container size="xl" px={20}>
          <Text size="xs" ta="center" c="gray.5">
            CropX &copy; {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="sm">
      <Text
        size="xs"
        fw={700}
        c="gray.3"
        tt="uppercase"
        style={{ letterSpacing: '0.08em' }}
      >
        {title}
      </Text>
      {children}
    </Stack>
  );
}
