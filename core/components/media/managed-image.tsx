'use client';

import NextImage from 'next/image';
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
}

/**
 * The single way photographs enter the page.
 *
 * Wraps next/image so every photograph gets optimisation, correct intrinsic
 * dimensions and lazy loading by default, and so alt text comes from the
 * manifest rather than being retyped per page. Licence credits live on
 * /image-credits — not as on-image overlays.
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
}: ManagedImageProps) {
  const entry = image(slot);
  const resolvedAlt = alt ?? entry.alt;

  return (
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
}
