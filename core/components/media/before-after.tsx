'use client';

import { useCallback, useRef, useState } from 'react';
import { Box, Grid, GridCol, Stack, Text, Title } from '@mantine/core';
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
 * Cinematic compare slider — full-bleed crop, minimal chrome.
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
      <Stack gap={28}>
        {title && (
          <Title
            order={2}
            style={{
              fontFamily: 'var(--cropx-font-heading)',
              fontSize: 'var(--cropx-text-h2)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            {title}
          </Title>
        )}
        <Grid gutter={{ base: 16, md: 20 }}>
          <GridCol span={{ base: 12, sm: 6 }}>
            <StaticPane slot={beforeSlot} label={beforeLabel} />
          </GridCol>
          <GridCol span={{ base: 12, sm: 6 }}>
            <StaticPane slot={afterSlot} label={afterLabel} accent />
          </GridCol>
        </Grid>
        {caption && (
          <Text size="sm" style={{ lineHeight: 1.7, color: 'var(--cropx-muted)', maxWidth: 640 }}>
            {caption}
          </Text>
        )}
      </Stack>
    );
  }

  return (
    <Stack gap={28}>
      {title && (
        <Title
          order={2}
          style={{
            fontFamily: 'var(--cropx-font-heading)',
            fontSize: 'var(--cropx-text-h2)',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
          }}
        >
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
          aspectRatio: '21 / 10',
          overflow: 'hidden',
          borderRadius: 8,
          cursor: dragging ? 'grabbing' : 'ew-resize',
          userSelect: 'none',
          touchAction: 'pan-y',
          backgroundColor: 'var(--cropx-cream)',
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
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 0 0 1px rgba(10, 31, 18, 0.12)',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: 'var(--cropx-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(10, 31, 18, 0.18)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--cropx-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            ↔
          </Box>
        </Box>

        <CompareLabel side="left">{beforeLabel}</CompareLabel>
        <CompareLabel side="right">{afterLabel}</CompareLabel>
      </Box>

      <Box>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(event) => setPosition(Number(event.currentTarget.value))}
          aria-label={`Reveal more of ${beforeLabel} or ${afterLabel}`}
          style={{ width: '100%', accentColor: '#006838', height: 4 }}
        />
      </Box>

      {caption && (
        <Text size="sm" style={{ lineHeight: 1.7, color: 'var(--cropx-muted)', maxWidth: 640 }}>
          {caption}
        </Text>
      )}
    </Stack>
  );
}

function CompareLabel({ side, children }: { side: 'left' | 'right'; children: string }) {
  return (
    <Text
      component="span"
      size="xs"
      fw={600}
      style={{
        position: 'absolute',
        top: 16,
        [side]: 16,
        padding: '6px 10px',
        borderRadius: 6,
        backgroundColor: 'rgba(10, 31, 18, 0.72)',
        color: 'white',
        letterSpacing: '-0.01em',
        backdropFilter: 'blur(6px)',
      }}
    >
      {children}
    </Text>
  );
}

function StaticPane({
  slot,
  label,
  accent = false,
}: {
  slot: ImageSlot;
  label: string;
  accent?: boolean;
}) {
  return (
    <Stack gap="sm">
      <Box
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          borderRadius: 8,
        }}
      >
        <ManagedImage slot={slot} fill sizes="(max-width: 768px) 100vw, 50vw" showCredit />
      </Box>
      <Text size="sm" fw={600} c={accent ? 'primary.7' : 'dark.6'}>
        {label}
      </Text>
    </Stack>
  );
}
