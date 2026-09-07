'use client';

import { Badge, Box, Container, Stack, Text, Title, rem, useMantineTheme } from '@mantine/core';
import { image, ImageSlot } from '@/core/content/image-manifest';
import { ImageCredit, ManagedImage } from './managed-image';

interface FullBleedSceneProps {
  slot: ImageSlot;
  eyebrow?: string;
  title: string;
  /** Lead paragraph under the headline. */
  lead?: string;
  children?: React.ReactNode;
  /** Vertical size of the panel. */
  height?: 'page' | 'hero' | 'band';
  align?: 'left' | 'centre';
  /** First scene on the page: loads eagerly rather than lazily. */
  priority?: boolean;
  /** Render the headline as h1. Exactly one per page should. */
  asH1?: boolean;
}

const HEIGHTS = {
  page: { base: 480, md: 640 },
  hero: { base: 380, md: 520 },
  band: { base: 300, md: 380 },
};

/**
 * Edge-to-edge photograph with overlaid copy, used to open every page.
 *
 * The theme scrim does the contrast work so white text stays legible over
 * whatever the photograph happens to contain.
 */
export function FullBleedScene({
  slot,
  eyebrow,
  title,
  lead,
  children,
  height = 'hero',
  align = 'left',
  priority = false,
  asH1 = false,
}: FullBleedSceneProps) {
  const theme = useMantineTheme();
  const entry = image(slot);
  const size = HEIGHTS[height];
  const centred = align === 'centre';

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: theme.other.ink,
      }}
      h={size}
    >
      <ManagedImage slot={slot} fill priority={priority} sizes="100vw" />

      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: centred ? theme.other.scrimFull : theme.other.scrimSide,
        }}
      />

      <Container
        size="xl"
        px={20}
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: centred ? 'center' : 'flex-end',
          justifyContent: centred ? 'center' : 'flex-start',
          paddingBottom: centred ? undefined : rem(56),
          paddingTop: centred ? rem(80) : undefined,
        }}
      >
        <Stack gap="md" maw={centred ? 780 : 680} ta={centred ? 'center' : 'left'}>
          {eyebrow && (
            <Badge
              variant="light"
              color="accent"
              radius="sm"
              size="lg"
              style={{ alignSelf: centred ? 'center' : 'flex-start' }}
            >
              {eyebrow}
            </Badge>
          )}

          <Title
            order={asH1 ? 1 : 2}
            c="white"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </Title>

          {lead && (
            <Text c="gray.3" style={{ fontSize: rem(19), lineHeight: 1.6, maxWidth: 620 }}>
              {lead}
            </Text>
          )}

          {children}
        </Stack>
      </Container>

      {entry.credit && <ImageCredit credit={entry.credit} url={entry.creditUrl} />}
    </Box>
  );
}
