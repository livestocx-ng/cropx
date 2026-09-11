'use client';

import { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconMail, IconMapPin, IconPhone, IconSend } from '@tabler/icons-react';
import { HeroSplit } from '@/core/components/sections/hero-split';
import { contactChannels } from '@/core/utilities';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const complete = name.trim() && email.trim() && message.trim();

  /**
   * There is no backend, so the form composes a prefilled email rather than
   * pretending to submit and silently dropping the message.
   */
  const mailtoHref = (() => {
    const body = [`From: ${name}`, `Email: ${email}`, '', message].join('\n');

    return `mailto:${contactChannels.email}?subject=${encodeURIComponent(
      subject || 'CropX enquiry'
    )}&body=${encodeURIComponent(body)}`;
  })();

  return (
    <Box>
      <HeroSplit
        asH1
        narrow
        align="center"
        eyebrow="Contact"
        title="Get in touch"
        description="Questions about climate-resilient variety recommendations, partnering as an agronomist, or the data behind the advisor."
      />

      <Box py="var(--cropx-section-py)" style={{ backgroundColor: 'var(--cropx-cream)' }}>
        <Container size="xl" px={20}>
          <Grid gutter={{ base: 30, md: 48 }}>
            <GridCol span={{ base: 12, md: 7 }}>
              <Card
                withBorder
                radius="md"
                p={{ base: 'lg', md: 'xl' }}
                style={{ backgroundColor: 'var(--cropx-white)', borderColor: 'var(--cropx-border)', borderRadius: 12 }}
              >
                <Stack gap="md">
                  <Text fw={700} size="lg">Send us a message</Text>

                  <Text size="sm" c="dimmed" style={{ lineHeight: 1.65 }}>
                    This form opens your email application with the message prefilled. Nothing is
                    sent or stored by this site.
                  </Text>

                  <TextInput
                    label="Name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    required
                  />

                  <TextInput
                    label="Email"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    required
                  />

                  <TextInput
                    label="Subject"
                    placeholder="What is this about?"
                    value={subject}
                    onChange={(event) => setSubject(event.currentTarget.value)}
                  />

                  <Textarea
                    label="Message"
                    placeholder="How can we help?"
                    minRows={5}
                    autosize
                    value={message}
                    onChange={(event) => setMessage(event.currentTarget.value)}
                    required
                  />

                  <Button
                    component="a"
                    href={complete ? mailtoHref : undefined}
                    disabled={!complete}
                    size="md"
                    radius="md"
                    color="primary"
                    rightSection={<IconSend size={16} />}
                  >
                    Open in email
                  </Button>
                </Stack>
              </Card>
            </GridCol>

            <GridCol span={{ base: 12, md: 5 }}>
              <Stack gap="lg">
                {contactChannels.offices.map((office) => (
                  <Card
                    key={office.label}
                    withBorder
                    radius="md"
                    p="lg"
                    style={{ backgroundColor: 'var(--cropx-white)', borderColor: 'var(--cropx-border)', borderRadius: 12 }}
                  >
                    <Group gap="sm" wrap="nowrap" align="flex-start">
                      <IconMapPin size={18} color="var(--mantine-color-primary-7)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <Stack gap={4}>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                          {office.label}
                        </Text>
                        {office.lines.map((line) => (
                          <Text key={line} size="sm">{line}</Text>
                        ))}
                      </Stack>
                    </Group>
                  </Card>
                ))}

                <Card
                  withBorder
                  radius="md"
                  p="lg"
                  style={{ backgroundColor: 'var(--cropx-white)', borderColor: 'var(--cropx-border)', borderRadius: 12 }}
                >
                  <Stack gap="md">
                    <Group gap="sm" wrap="nowrap">
                      <IconMail size={18} color="var(--mantine-color-primary-7)" />
                      <Stack gap={2}>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Email</Text>
                        <Anchor href={`mailto:${contactChannels.email}`} size="sm">
                          {contactChannels.email}
                        </Anchor>
                      </Stack>
                    </Group>

                    <Group gap="sm" wrap="nowrap">
                      <IconPhone size={18} color="var(--mantine-color-primary-7)" />
                      <Stack gap={2}>
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Phone</Text>
                        <Anchor href={`tel:${contactChannels.phone.replace(/\s/g, '')}`} size="sm">
                          {contactChannels.phone}
                        </Anchor>
                      </Stack>
                    </Group>
                  </Stack>
                </Card>
              </Stack>
            </GridCol>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
