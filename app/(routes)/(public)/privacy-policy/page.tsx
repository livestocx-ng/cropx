import { Alert, Anchor, Box, Container, List, ListItem, Stack, Text, Title, rem } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { contactChannels } from '@/core/utilities';

const LAST_UPDATED = '7 September 2026';

export default function PrivacyPolicyPage() {
  return (
    <Box style={{ backgroundColor: 'var(--cropx-white)', minHeight: '100%' }}>
      <Container size="md" px={20} py="var(--cropx-section-py)">
        <Stack gap="xl">
          <Stack gap="sm">
            <Title
              order={1}
              style={{
                fontFamily: 'var(--cropx-font-heading)',
                fontSize: 'var(--cropx-text-display)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--cropx-ink)',
              }}
            >
              Privacy Policy
            </Title>
            <Text size="sm" c="dimmed">
              Last updated {LAST_UPDATED}
            </Text>
          </Stack>

          <Alert variant="light" color="blue" radius="md" icon={<IconInfoCircle size={18} />}>
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              This document describes what the site does today. It has not been reviewed by a
              lawyer and should be before launch.
            </Text>
          </Alert>

          <Section title="The short version">
            <Text style={{ lineHeight: 1.8 }}>
              CropX does not ask you to create an account, and it does not collect personal
              information about you or your farm. The Seed Advisor runs entirely in your browser.
              The state, soil type, crop, and area you enter are used to calculate a ranking on
              your own device and are never transmitted to us or stored anywhere.
            </Text>
          </Section>

          <Section title="What we do not collect">
            <List spacing="sm">
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>
                  No accounts, passwords, or login records, because there is no sign-in
                </Text>
              </ListItem>
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>
                  No payment or financial information, because nothing is sold here
                </Text>
              </ListItem>
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>
                  No farm locations or advisor inputs, because those never leave your browser
                </Text>
              </ListItem>
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>No advertising or tracking cookies</Text>
              </ListItem>
            </List>
          </Section>

          <Section title="If you email us">
            <Text style={{ lineHeight: 1.8 }}>
              The contact form does not submit anything to a server. It opens your own email
              application with a prefilled message, which you then choose to send. If you do email
              us, we hold that correspondence in order to reply to it, and we do not use it for
              anything else.
            </Text>
          </Section>

          <Section title="Hosting and server logs">
            <Text style={{ lineHeight: 1.8 }}>
              Like almost all websites, the infrastructure serving these pages may record standard
              technical information such as IP addresses and requested URLs for security and
              reliability purposes. We do not use this to build any profile of you.
            </Text>
          </Section>

          <Section title="Third parties">
            <Text style={{ lineHeight: 1.8 }}>
              This site loads fonts from Google Fonts, which means your browser makes a request to
              Google when a page loads. Photographs are served from this site rather than from
              third parties. We do not embed analytics or social media trackers.
            </Text>
          </Section>

          <Section title="Children">
            <Text style={{ lineHeight: 1.8 }}>
              This site is intended for farmers, agronomists, and researchers. It is not directed
              at children, and since it collects no personal information it does not knowingly
              hold any relating to a child.
            </Text>
          </Section>

          <Section title="Changes">
            <Text style={{ lineHeight: 1.8 }}>
              If the site starts collecting information, for example by adding accounts or saved
              recommendations, this policy will be updated before that happens rather than after.
            </Text>
          </Section>

          <Section title="Contact">
            <Text style={{ lineHeight: 1.8 }}>
              Questions about this policy can go to{' '}
              <Anchor href={`mailto:${contactChannels.email}`}>{contactChannels.email}</Anchor>.
            </Text>
          </Section>
        </Stack>
      </Container>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="sm">
      <Title order={2} style={{ fontSize: rem(23), fontWeight: 700 }}>
        {title}
      </Title>
      {children}
    </Stack>
  );
}
