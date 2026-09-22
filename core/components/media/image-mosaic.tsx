'use client';

import { Box, Grid, GridCol } from '@mantine/core';
import { ImageSlot } from '@/core/content/image-manifest';
import { ManagedImage } from './managed-image';

interface ImageMosaicProps {
  /** Exactly four slots: one tall feature and three supporting images. */
  slots: [ImageSlot, ImageSlot, ImageSlot, ImageSlot];
}

/** Asymmetric editorial collage — tight gaps, no borders. */
export function ImageMosaic({ slots }: ImageMosaicProps) {
  const [feature, ...rest] = slots;

  return (
    <Grid gutter={10}>
      <GridCol span={{ base: 12, md: 5 }}>
        <Box
          className="mosaic-media"
          style={{
            position: 'relative',
            height: '100%',
            minHeight: 360,
            aspectRatio: '3 / 4',
            overflow: 'hidden',
            borderRadius: 8,
            backgroundColor: 'var(--cropx-cream)',
          }}
        >
          <ManagedImage
            slot={feature}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"

            className="mosaic-media-img"
          />
        </Box>
      </GridCol>

      <GridCol span={{ base: 12, md: 7 }}>
        <Grid gutter={10}>
          {rest.map((slot, index) => (
            <GridCol key={slot} span={index === 0 ? 12 : 6}>
              <Box
                className="mosaic-media"
                style={{
                  position: 'relative',
                  aspectRatio: index === 0 ? '16 / 9' : '1 / 1',
                  overflow: 'hidden',
                  borderRadius: 8,
                  backgroundColor: 'var(--cropx-cream)',
                }}
              >
                <ManagedImage
                  slot={slot}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"

                  className="mosaic-media-img"
                />
              </Box>
            </GridCol>
          ))}
        </Grid>
      </GridCol>

      <style>{`
        .mosaic-media-img {
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mosaic-media:hover .mosaic-media-img {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .mosaic-media-img { transition: none; }
          .mosaic-media:hover .mosaic-media-img { transform: none; }
        }
      `}</style>
    </Grid>
  );
}
