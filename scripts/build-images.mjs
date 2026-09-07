/**
 * Compresses the raw photo set into web-ready files and generates the typed
 * image manifest the site renders from.
 *
 * Uses macOS-native `sips`, so there is no image-processing dependency to
 * install. Never upscales: a slot simply gets the best its source can give.
 *
 * Usage: node scripts/build-images.mjs
 */

import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const RAW_DIR = 'public/images/cropx/raw';
const OUT_DIR = 'public/images/cropx';
const CREDITS_JSON = 'scripts/image-credits.json';
const MANIFEST_TS = 'core/content/image-manifest.ts';
const CREDITS_MD = 'public/images/cropx/CREDITS.md';

/**
 * Target width and JPEG quality by the role a slot plays in the layout.
 * Larger images get more aggressive compression: at full-bleed scale the
 * artefacts are invisible, and the byte budget is what the visitor feels.
 */
const ROLE_OUTPUT = {
  FULL_BLEED: { width: 2000, quality: 58 },
  INLINE: { width: 1400, quality: 64 },
  CARD: { width: 800, quality: 70 },
};

/**
 * Alt text, authored per slot. This is content, not metadata: it is what a
 * screen-reader user gets instead of the photograph, so it describes the
 * subject rather than naming the file.
 */
const SLOTS = {
  // ------------------------------------------------------------------ home
  'home-hero-dry-field': {
    role: 'FULL_BLEED',
    alt: 'Parched farmland under a hazy sky at the end of a failed rainy season',
  },
  'home-before-drought-maize': {
    role: 'FULL_BLEED',
    alt: 'Maize plants stunted and browning after a prolonged mid-season dry spell',
  },
  'home-after-healthy-maize': {
    role: 'FULL_BLEED',
    alt: 'A dense stand of healthy green maize reaching well above waist height',
  },
  'home-essay-farmer': {
    role: 'FULL_BLEED',
    alt: 'A smallholder farmer standing among crops on their own land',
  },
  'home-essay-soil': {
    role: 'INLINE',
    alt: 'Hands taking a soil sample from a freshly dug pit',
  },
  'home-essay-seed': {
    role: 'INLINE',
    alt: 'A handful of cereal seed held up close to the camera',
  },
  'home-essay-harvest': {
    role: 'INLINE',
    alt: 'Harvested grain being gathered and sorted after threshing',
  },
  'home-impact-market': {
    role: 'FULL_BLEED',
    alt: 'Sacks of grain stacked at an open-air market stall',
  },
  'home-cta-farmland': {
    role: 'FULL_BLEED',
    alt: 'Cultivated farmland stretching to the horizon in low evening light',
  },

  // ---------------------------------------------------------- seed advisor
  'advisor-hero-seedlings': {
    role: 'FULL_BLEED',
    alt: 'Rows of young seedlings raised in a nursery before transplanting',
  },
  'advisor-seed-closeup': {
    role: 'INLINE',
    alt: 'A close view of cereal grain showing seed size and colour',
  },
  'advisor-trial-plots': {
    role: 'FULL_BLEED',
    alt: 'Adjacent research plots used to compare crop varieties side by side',
  },
  'advisor-millet-field': {
    role: 'CARD',
    alt: 'Millet growing in a field, heads formed and drying',
  },
  'advisor-planting': {
    role: 'INLINE',
    alt: 'A farmer placing seed into prepared soil by hand',
  },

  // ------------------------------------------------------- climate insights
  'climate-hero-drought': {
    role: 'FULL_BLEED',
    alt: 'Bare soil broken into deep cracks by sustained heat and no rain',
  },
  'climate-rain-clouds': {
    role: 'FULL_BLEED',
    alt: 'Heavy rain clouds building over open farmland',
  },
  'climate-irrigation': {
    role: 'INLINE',
    alt: 'Water running along an irrigation channel between cultivated beds',
  },
  'climate-sahel': {
    role: 'FULL_BLEED',
    alt: 'Sparse semi-arid savanna landscape typical of the Sahel',
  },
  'climate-dry-riverbed': {
    role: 'INLINE',
    alt: 'A river reduced to dry sand and exposed stones',
  },

  // ----------------------------------------------------- crop surveillance
  'surveillance-hero-pest': {
    role: 'FULL_BLEED',
    alt: 'Maize leaves torn and windowed by feeding caterpillars',
  },
  'surveillance-leaf-disease': {
    role: 'INLINE',
    alt: 'A crop leaf showing the lesions and discolouration of active disease',
  },
  'surveillance-scouting': {
    role: 'INLINE',
    alt: 'A farmer bending into the crop canopy to inspect plants for damage',
  },
  'surveillance-phone-field': {
    role: 'FULL_BLEED',
    alt: 'A mobile phone being used out in the field beside standing crops',
  },
  'surveillance-cassava': {
    role: 'INLINE',
    alt: 'Cassava plants in the field with their distinctive lobed leaves',
  },

  // ---------------------------------------------------- agronomist network
  'agronomist-hero-extension': {
    role: 'FULL_BLEED',
    alt: 'An extension officer explaining crop management to a group of farmers',
  },
  'agronomist-training': {
    role: 'FULL_BLEED',
    alt: 'Farmers gathered around a demonstration during a field training session',
  },
  'agronomist-soil-test': {
    role: 'CARD',
    alt: 'A soil sample being analysed in a laboratory',
  },
  'agronomist-field-demo': {
    role: 'INLINE',
    alt: 'An advisor and farmers examining a crop in a demonstration plot',
  },

  // ----------------------------------------------------------------- about
  'about-mosaic-1': { role: 'CARD', alt: 'Portrait of a farmer on their land' },
  'about-mosaic-2': { role: 'INLINE', alt: 'Women working together on a harvest' },
  'about-mosaic-3': { role: 'INLINE', alt: 'Crop research being carried out in a laboratory' },
  'about-mosaic-4': {
    role: 'FULL_BLEED',
    alt: 'A wide field of sorghum ripening under an open sky',
  },

  // ------------------------------------------------------------------ blog
  'blog-drought-varieties': { role: 'INLINE', alt: 'A drought-tolerant crop standing in dry conditions' },
  'blog-soil-health': { role: 'CARD', alt: 'Dark, well-structured soil rich in organic matter' },
  'blog-planting-calendar': { role: 'INLINE', alt: 'Seed being sown at the start of the planting season' },
  'blog-armyworm': { role: 'INLINE', alt: 'A caterpillar crop pest on a damaged leaf' },
  'blog-seed-systems': { role: 'INLINE', alt: 'Bagged seed stacked ready for distribution' },
  'blog-cowpea-nitrogen': { role: 'INLINE', alt: 'Cowpea plants growing in a field' },

  // --------------------------------------------------------------- contact
  'contact-support': { role: 'CARD', alt: 'A farmer making a call on a mobile phone' },
};

function dimensions(file) {
  const output = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], {
    encoding: 'utf8',
  });

  return {
    width: Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0),
    height: Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0),
  };
}

function optimize(slot, role) {
  const source = path.join(RAW_DIR, `${slot}.jpg`);
  const target = path.join(OUT_DIR, `${slot}.jpg`);

  const original = dimensions(source);
  const output = ROLE_OUTPUT[role];
  const targetWidth = Math.min(output.width, original.width);

  execFileSync(
    'sips',
    [
      '--resampleWidth',
      String(targetWidth),
      '-s',
      'format',
      'jpeg',
      '-s',
      'formatOptions',
      String(output.quality),
      source,
      '--out',
      target,
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] }
  );

  const final = dimensions(target);

  return {
    width: final.width,
    height: final.height,
    bytes: statSync(target).size,
    originalWidth: original.width,
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const credits = JSON.parse(await readFile(CREDITS_JSON, 'utf8'));
  const available = new Set(
    (await readdir(RAW_DIR)).filter((file) => file.endsWith('.jpg')).map((file) => file.replace(/\.jpg$/, ''))
  );

  const entries = [];
  const missing = [];
  let totalBytes = 0;

  for (const [slot, config] of Object.entries(SLOTS)) {
    if (!available.has(slot)) {
      missing.push(slot);
      continue;
    }

    const result = optimize(slot, config.role);
    const credit = credits[slot] ?? null;

    totalBytes += result.bytes;

    entries.push({ slot, config, result, credit });

    console.log(
      `${slot.padEnd(30)} ${String(result.width).padStart(4)}x${String(result.height).padEnd(4)} ` +
        `${(result.bytes / 1024).toFixed(0).padStart(4)}KB  (from ${result.originalWidth}px)`
    );
  }

  // ------------------------------------------------------------- manifest
  const manifest = `// GENERATED by scripts/build-images.mjs — do not edit by hand.
// Re-run: node scripts/build-images.mjs

export type ImageSlot =
${entries.map((entry) => `  | '${entry.slot}'`).join('\n')};

export interface ManagedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Attribution string to render when the licence requires it. */
  credit: string | null;
  creditUrl: string | null;
  licence: string | null;
}

export const images: Record<ImageSlot, ManagedImage> = {
${entries
  .map((entry) => {
    const { slot, config, result, credit } = entry;
    const needsCredit = credit?.requiresAttribution ?? false;
    const creditText = needsCredit
      ? `${credit.creator} (${credit.licence})`.replace(/'/g, "\\'")
      : null;

    return `  '${slot}': {
    src: '/images/cropx/${slot}.jpg',
    alt: '${config.alt.replace(/'/g, "\\'")}',
    width: ${result.width},
    height: ${result.height},
    credit: ${creditText ? `'${creditText}'` : 'null'},
    creditUrl: ${credit?.sourceUrl ? `'${credit.sourceUrl}'` : 'null'},
    licence: ${credit?.licence ? `'${String(credit.licence).replace(/'/g, "\\'")}'` : 'null'},
  },`;
  })
  .join('\n')}
};

export function image(slot: ImageSlot): ManagedImage {
  return images[slot];
}

/** Every image that carries an attribution requirement, for the credits page. */
export const attributedImages = Object.entries(images)
  .filter(([, value]) => value.credit !== null)
  .map(([slot, value]) => ({ slot: slot as ImageSlot, ...value }));
`;

  await writeFile(MANIFEST_TS, manifest);

  // -------------------------------------------------------------- credits
  const md = `# Photo credits

Every photograph in \`public/images/cropx/\` is used under a licence permitting
commercial use and modification. Files have been resized and recompressed from
their originals; the licence of each derivative is unchanged.

Sourced via [Openverse](https://openverse.org) and
[Wikimedia Commons](https://commons.wikimedia.org).

| File | Title | Creator | Licence | Source |
| --- | --- | --- | --- | --- |
${entries
  .map((entry) => {
    const credit = entry.credit;

    if (!credit) {
      return `| \`${entry.slot}.jpg\` | — | — | unknown | — |`;
    }

    const source = credit.sourceUrl ? `[link](${credit.sourceUrl})` : '—';

    return `| \`${entry.slot}.jpg\` | ${credit.title} | ${credit.creator} | ${credit.licence} | ${source} |`;
  })
  .join('\n')}

## Attribution requirements

Files under CC BY and CC BY-SA require visible attribution. The site renders
these credits through the \`credit\` field on each manifest entry, and lists them
all on the image credits page.
`;

  await writeFile(CREDITS_MD, md);

  console.log(`\n${entries.length} images, ${(totalBytes / 1024 / 1024).toFixed(1)}MB total`);

  if (missing.length > 0) {
    console.log(`\nmissing raw files for: ${missing.join(', ')}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
