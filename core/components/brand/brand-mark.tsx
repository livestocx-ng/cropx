import { Group, Text } from '@mantine/core';

interface BrandMarkProps {
  /** Use light text for dark backgrounds (footer). */
  inverted?: boolean;
  size?: number;
  showWordmark?: boolean;
}

/** Interim CropX mark + wordmark — swap public/brand/cropx-mark.svg when the final logo arrives. */
export function BrandMark({ inverted = false, size = 34, showWordmark = true }: BrandMarkProps) {
  return (
    <Group gap={10} wrap="nowrap" align="center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/cropx-mark.svg"
        alt=""
        width={size}
        height={size}
        style={{ borderRadius: 8, flexShrink: 0, display: 'block' }}
      />
      {showWordmark && (
        <Text
          fw={700}
          size="lg"
          c={inverted ? 'white' : undefined}
          style={{
            letterSpacing: '-0.02em',
            fontFamily: 'var(--cropx-font-heading)',
            lineHeight: 1,
          }}
        >
          CropX
        </Text>
      )}
    </Group>
  );
}
