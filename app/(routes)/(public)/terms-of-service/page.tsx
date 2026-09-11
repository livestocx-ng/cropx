import { Alert, Anchor, Box, Container, List, ListItem, Stack, Text, Title, rem } from '@mantine/core';
import { IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react';
import { contactChannels } from '@/core/utilities';

const LAST_UPDATED = '7 September 2026';

export default function TermsOfServicePage() {
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
              Terms of Service
            </Title>
            <Text size="sm" c="dimmed">
              Last updated {LAST_UPDATED}
            </Text>
          </Stack>

          <Alert variant="light" color="blue" radius="md" icon={<IconInfoCircle size={18} />}>
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              This document describes the site as it currently stands. It has not been reviewed by
              a lawyer and should be before launch.
            </Text>
          </Alert>

          <Alert
            variant="light"
            color="orange"
            radius="md"
            icon={<IconAlertTriangle size={18} />}
            title="Agricultural guidance, not a guarantee"
          >
            <Text size="sm" style={{ lineHeight: 1.65 }}>
              CropX provides general information to help you decide which crop varieties to
              investigate. It does not guarantee any yield or outcome. Farming decisions depend on
              weather, soil, management, seed quality, and pest pressure, most of which are outside
              both your control and ours. Confirm any recommendation with a qualified agronomist
              before you commit land, labour, or money to it.
            </Text>
          </Alert>

          <Section title="What this service is">
            <Text style={{ lineHeight: 1.8 }}>
              CropX is an informational website. It ranks publicly released crop varieties against
              the conditions you describe and explains the reasoning behind each suggestion. It
              does not sell seed, take orders, process payments, or act as an intermediary in any
              transaction.
            </Text>
          </Section>

          <Section title="The preview status of the data">
            <Text style={{ lineHeight: 1.8 }}>
              Variety names, releasing institutes, maturity classes, and named traits refer to real
              varieties released in Nigeria and West Africa. The numeric drought and heat tolerance
              scores are composite estimates written to demonstrate how the ranking works. They are
              not published trial results. Do not treat them as measured performance data.
            </Text>
          </Section>

          <Section title="Acceptable use">
            <List spacing="sm">
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>
                  Use the site for lawful purposes related to agriculture, research, or advisory
                  work
                </Text>
              </ListItem>
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>
                  Do not present CropX output as certified agronomic advice or as a warranty of
                  yield
                </Text>
              </ListItem>
              <ListItem>
                <Text style={{ lineHeight: 1.7 }}>
                  Do not attempt to disrupt, overload, or gain unauthorised access to the site
                </Text>
              </ListItem>
            </List>
          </Section>

          <Section title="Photographs and third-party content">
            <Text style={{ lineHeight: 1.8 }}>
              Photographs on this site are used under open licences and remain the property of
              their creators, credited on the{' '}
              <Anchor href="/image-credits">photo credits page</Anchor>. Variety names and
              institute names belong to the organisations that own them, and their appearance here
              does not imply any endorsement of CropX by those organisations.
            </Text>
          </Section>

          <Section title="Limitation of liability">
            <Text style={{ lineHeight: 1.8 }}>
              The site is provided as-is, without warranty of any kind. To the fullest extent
              permitted by law, CropX is not liable for any loss of crop, income, or other damage
              arising from decisions made in reliance on information published here.
            </Text>
          </Section>

          <Section title="Changes to these terms">
            <Text style={{ lineHeight: 1.8 }}>
              These terms may be updated as the service develops, particularly if features that
              handle user data or facilitate transactions are added. The date at the top reflects
              the current version.
            </Text>
          </Section>

          <Section title="Contact">
            <Text style={{ lineHeight: 1.8 }}>
              Questions about these terms can go to{' '}
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
