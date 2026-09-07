'use client';

import NextImage from 'next/image';
import { Box, Text } from '@mantine/core';
import { image, ImageSlot } from '@/core/content/image-manifest';

interface ManagedImageProps {
  slot: ImageSlot;
  /** Overrides the manifest alt text. Pass '' only for decorative images. */
  alt?: string;
  /** Fill the parent box instead of laying out at intrinsic size. */
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
  /** Show the licence credit as a corner overlay. */
  showCredit?: boolean;
}

/**
 * The single way photographs enter the page.
 *
 * Wraps next/image so every photograph gets optimisation, correct intrinsic
 * dimensions and lazy loading by default, and so alt text and licence credit
 * come from the manifest rather than being retyped per page.
 */
export function ManagedImage({
  slot,
  alt,
  fill = false,
  priority = false,
  sizes,
  radius,
  className,
  style,
  showCredit = false,
}: ManagedImageProps) {
  const entry = image(slot);
  const resolvedAlt = alt ?? entry.alt;

  const picture = (
    <NextImage
      src={entry.src}
      alt={resolvedAlt}
      {...(fill
        ? { fill: true, sizes: sizes ?? '100vw' }
        : { width: entry.width, height: entry.height, sizes })}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      style={{
        objectFit: 'cover',
        borderRadius: radius,
        ...(fill ? {} : { width: '100%', height: 'auto' }),
        ...style,
      }}
      className={className}
    />
  );

  if (!showCredit || !entry.credit) {
    return picture;
  }

  return (
    <Box style={{ position: 'relative', width: '100%', height: fill ? '100%' : undefined }}>
      {picture}
      <ImageCredit credit={entry.credit} url={entry.creditUrl} />
    </Box>
  );
}

/**
 * Visible attribution. CC BY and CC BY-SA both require credit to be shown,
 * so this is a licence obligation rather than a courtesy.
 */
export function ImageCredit({ credit, url }: { credit: string; url: string | null }) {
  const content = (
    <Text
      component="span"
      style={{
        fontSize: 10,
        lineHeight: 1.4,
        color: 'rgba(255, 255, 255, 0.72)',
        textDecoration: 'none',
      }}
    >
      {credit}
    </Text>
  );

  return (
    <Box
      style={{
        position: 'absolute',
        right: 6,
        bottom: 6,
        padding: '2px 6px',
        borderRadius: 4,
        backgroundColor: 'rgba(6, 22, 14, 0.55)',
        backdropFilter: 'blur(2px)',
        pointerEvents: url ? 'auto' : 'none',
        maxWidth: '60%',
      }}
    >
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer nofollow" style={{ textDecoration: 'none' }}>
          {content}
        </a>
      ) : (
        content
      )}
    </Box>
  );
}
