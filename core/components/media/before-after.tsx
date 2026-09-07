'use client';

import { useCallback, useRef, useState } from 'react';
import { Badge, Box, Grid, GridCol, Stack, Text, Title, rem } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { ImageSlot } from '@/core/content/image-manifest';
import { ManagedImage } from './managed-image';

interface BeforeAfterProps {
  beforeSlot: ImageSlot;
  afterSlot: ImageSlot;
  beforeLabel: string;
  afterLabel: string;
  title?: string;
  caption?: string;
}

/**
 * Paired photographs with a draggable divider.
 *
 * Falls back to a plain side-by-side pair when the visitor prefers reduced
 * motion, since the drag interaction is the whole point of the slider and a
 * static comparison communicates the same thing.
 */
export function BeforeAfter({
  beforeSlot,
  afterSlot,
  beforeLabel,
  afterLabel,
  title,
  caption,
}: BeforeAfterProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const bounds = containerRef.current?.getBoundingClientRect();

    if (!bounds || bounds.width === 0) {
      return;
    }

    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  if (reduceMotion) {
    return (
      <Stack gap="lg">
        {title && (
          <Title order={2} style={{ fontSize: rem(30), fontWeight: 700 }}>
            {title}
          </Title>
        )}
        <Grid gutter="md">
          <GridCol span={{ base: 12, sm: 6 }}>
            <StaticPane slot={beforeSlot} label={beforeLabel} tone="dark" />
          </GridCol>
          <GridCol span={{ base: 12, sm: 6 }}>
            <StaticPane slot={afterSlot} label={afterLabel} tone="green" />
          </GridCol>
        </Grid>
        {caption && (
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
            {caption}
          </Text>
        )}
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      {title && (
        <Title order={2} style={{ fontSize: rem(30), fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </Title>
      )}

      <Box
        ref={containerRef}
        role="group"
        aria-label={`Comparison between ${beforeLabel} and ${afterLabel}`}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          borderRadius: rem(14),
          cursor: dragging ? 'grabbing' : 'ew-resize',
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
        onPointerDown={(event) => {
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging) {
            updateFromClientX(event.clientX);
          }
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <ManagedImage slot={afterSlot} fill sizes="100vw" />

        <Box
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <ManagedImage slot={beforeSlot} fill sizes="100vw" />
        </Box>

        <Box
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: 2,
            backgroundColor: 'white',
            boxShadow: '0 0 12px rgba(0,0,0,0.45)',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
              fontSize: 14,
              color: '#06160e',
            }}
          >
            ↔
          </Box>
        </Box>

        <Badge
          color="dark"
          variant="filled"
          style={{ position: 'absolute', top: 12, left: 12, opacity: 0.9 }}
        >
          {beforeLabel}
        </Badge>
        <Badge
          color="primary"
          variant="filled"
          style={{ position: 'absolute', top: 12, right: 12, opacity: 0.95 }}
        >
          {afterLabel}
        </Badge>
      </Box>

      <Box>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(event) => setPosition(Number(event.currentTarget.value))}
          aria-label={`Reveal more of ${beforeLabel} or ${afterLabel}`}
          style={{ width: '100%', accentColor: '#006838' }}
        />
      </Box>

      {caption && (
        <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
          {caption}
        </Text>
      )}
    </Stack>
  );
}

function StaticPane({
  slot,
  label,
  tone,
}: {
  slot: ImageSlot;
  label: string;
  tone: 'dark' | 'green';
}) {
  return (
    <Stack gap="xs">
      <Box style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: rem(12) }}>
        <ManagedImage slot={slot} fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
      </Box>
      <Badge color={tone === 'green' ? 'primary' : 'dark'} variant="light" radius="sm">
        {label}
      </Badge>
    </Stack>
  );
}
