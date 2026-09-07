import type { Metadata } from 'next';

export const SITE_NAME = 'CropX';
export const SITE_URL = 'https://cropx.africa';

export const SITE_DESCRIPTION =
  'CropX uses AI to match African farms with drought and climate-resilient crop varieties, so smallholders get the best yield an ever-warming environment allows.';

/**
 * Shared metadata builder.
 *
 * The previous site repeated a ~90-line block in every route layout, including
 * hardcoded S3 open-graph images and a Facebook domain verification token.
 * Each layout now calls this instead.
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
      'climate-resilient seeds',
      'drought tolerant varieties',
      'African agriculture',
      'food security',
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
