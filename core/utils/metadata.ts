import type { Metadata } from 'next';
import { brand } from '@/core/content/brand';

export const SITE_NAME = 'CropX';
export const SITE_URL = 'https://cropx.africa';

export const SITE_DESCRIPTION = brand.siteDescription;

/**
 * Shared metadata builder.
 *
 * TODO: add a real open-graph image at public/og/cropx-og.jpg (1200x630).
 */
export function buildMetadata(title: string, description: string = SITE_DESCRIPTION): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${SITE_NAME} — ${title}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'CropX',
      'African food security',
      'climate-resilient seed varieties',
      'drought tolerant varieties',
      'climate-smart agriculture',
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
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.png',
    },
  };
}
