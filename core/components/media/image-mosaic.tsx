'use client';

import { Box, Grid, GridCol, rem } from '@mantine/core';
import { ImageSlot } from '@/core/content/image-manifest';
import { ManagedImage } from './managed-image';
import { ScrollReveal } from './scroll-reveal';

interface ImageMosaicProps {
  /** Exactly four slots: one tall feature and three supporting images. */
  slots: [ImageSlot, ImageSlot, ImageSlot, ImageSlot];
}

/**
 * Asymmetric four-image grid: a tall feature image beside a stack of three.
 * Used where a page needs visual weight without another block of prose.
 */
export function ImageMosaic({ slots }: ImageMosaicProps) {
  const [feature, ...rest] = slots;

  return (
    <Grid gutter={rem(16)}>
      <GridCol span={{ base: 12, md: 5 }}>
        <ScrollReveal>
          <Box
            style={{
              position: 'relative',
              height: '100%',
              minHeight: rem(320),
              aspectRatio: '3 / 4',
              overflow: 'hidden',
              borderRadius: rem(14),
            }}
          >
            <ManagedImage
              slot={feature}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              showCredit
            />
          </Box>
        </ScrollReveal>
      </GridCol>

      <GridCol span={{ base: 12, md: 7 }}>
        <Grid gutter={rem(16)}>
          {rest.map((slot, index) => (
            <GridCol key={slot} span={index === 0 ? 12 : 6}>
              <ScrollReveal index={index + 1}>
                <Box
                  style={{
                    position: 'relative',
                    aspectRatio: index === 0 ? '16 / 9' : '1 / 1',
                    overflow: 'hidden',
                    borderRadius: rem(14),
                  }}
                >
                  <ManagedImage
                    slot={slot}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    showCredit
                  />
                </Box>
              </ScrollReveal>
            </GridCol>
          ))}
        </Grid>
      </GridCol>
    </Grid>
  );
}
