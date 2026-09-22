import type { Metadata } from 'next';
import { brand } from '@/core/content/brand';

export const SITE_NAME = 'CropX';
export const SITE_URL = 'https://cropx.africa';

export const SITE_DESCRIPTION = brand.siteDescription;

const OG_IMAGE = {
  url: `${SITE_URL}/og/cropx-og.jpg`,
  width: 1200,
  height: 630,
  alt: 'CropX cofounder holding harvested maize in a cornfield',
};

/** Shared metadata builder for all routes. */
export function buildMetadata(title: string, description: string = SITE_DESCRIPTION): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${SITE_NAME} | ${title}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'CropX',
      'African food security',
      'climate resilient seed varieties',
      'drought tolerant varieties',
      'climate smart agriculture',
      'smallholder farmers',
      'seed selection',
      'agronomy',
    ],
    openGraph: {
      title: fullTitle,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
    icons: {
      icon: [{ url: '/brand/cropx-mark.svg', type: 'image/svg+xml' }, { url: '/favicon.ico' }],
      apple: '/favicon.png',
    },
  };
}
