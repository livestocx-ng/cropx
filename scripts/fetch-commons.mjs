/**
 * Upgrades image slots using Wikimedia Commons directly.
 *
 * Openverse returns good subject matter but most of its Flickr results cap at
 * 1024px, which is too soft for a full-bleed panel. Commons holds much larger
 * originals, so this pass re-fetches any slot where Commons can beat what we
 * already have, and leaves the existing file alone otherwise.
 *
 * Usage: node scripts/fetch-commons.mjs [--min 1800] [slot ...]
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const RAW_DIR = 'public/images/cropx/raw';
const CREDITS_JSON = 'scripts/image-credits.json';
const USER_AGENT = 'CropX-site-build/1.0 (agricultural advisory site; contact via repo)';

/** Commons-specific searches, chosen to favour African agriculture. */
const QUERIES = {
  'home-hero-dry-field': ['drought farmland africa', 'dry season savanna farm', 'arid farmland'],
  'home-before-drought-maize': ['failed maize crops Ghana', 'drought stressed maize field', 'dry maize field'],
  'home-after-healthy-maize': ['green corn rows field', 'healthy maize field', 'maize plantation farm'],
  'home-essay-farmer': ['farmer nigeria', 'farmer ghana field', 'agriculture nigeria'],
  'home-essay-soil': ['soil sampling', 'soil profile agriculture'],
  'home-essay-seed': ['maize seed', 'sorghum seed', 'cereal grain'],
  'home-essay-harvest': ['maize harvest africa', 'harvest nigeria', 'grain harvest africa'],
  'home-impact-market': ['grain market nigeria', 'market africa food', 'cereal market africa'],
  'home-cta-farmland': ['farmland africa landscape', 'savanna farmland', 'agriculture landscape africa'],

  'advisor-hero-seedlings': ['seedling nursery', 'plant nursery agriculture', 'tree nursery africa'],
  'advisor-seed-closeup': ['sorghum grain', 'millet grain', 'seeds macro'],
  'advisor-trial-plots': ['agricultural experiment field', 'field trial agriculture', 'research plots'],
  'advisor-millet-field': ['pearl millet field', 'millet nigeria', 'millet crop'],
  'advisor-planting': ['sowing seed', 'planting maize', 'farmer planting africa'],

  'climate-hero-drought': ['cracked soil drought', 'drought land', 'desiccated soil'],
  'climate-rain-clouds': ['rain clouds landscape', 'storm clouds farmland', 'monsoon clouds'],
  'climate-irrigation': ['irrigation africa', 'irrigation canal farm', 'drip irrigation'],
  'climate-sahel': ['sahel landscape', 'sahel niger', 'semi arid landscape africa'],
  'climate-dry-riverbed': ['dry riverbed', 'dried river africa'],

  'surveillance-hero-pest': ['maize pest damage', 'fall armyworm', 'crop pest damage'],
  'surveillance-leaf-disease': ['plant disease leaf', 'leaf rust', 'crop disease symptom'],
  'surveillance-scouting': ['farmer field inspection', 'crop scouting', 'agronomist field'],
  'surveillance-phone-field': ['mobile phone africa', 'smartphone farmer', 'mobile phone agriculture'],
  'surveillance-cassava': ['cassava field', 'cassava plantation', 'cassava nigeria'],

  'agronomist-hero-extension': ['agricultural extension', 'extension officer farmers', 'agricultural advisory africa'],
  'agronomist-training': ['farmer training africa', 'agricultural training', 'farmer field school'],
  'agronomist-soil-test': ['soil analysis', 'soil laboratory', 'soil science laboratory'],
  'agronomist-field-demo': ['demonstration plot', 'agricultural demonstration', 'agronomy field day'],

  'about-mosaic-1': ['farmer portrait africa', 'african farmer', 'farmer field nigeria'],
  'about-mosaic-2': ['women farmers africa', 'woman farmer agriculture africa', 'women agriculture'],
  'about-mosaic-3': ['plant breeding research', 'agricultural research laboratory', 'crop science'],
  'about-mosaic-4': ['sorghum field', 'savanna agriculture landscape', 'grain field'],

  'blog-drought-varieties': ['drought resistant crop', 'drought tolerant maize'],
  'blog-soil-health': ['soil organic matter', 'healthy soil', 'compost agriculture'],
  'blog-planting-calendar': ['planting season africa', 'sowing field', 'agricultural calendar'],
  'blog-armyworm': ['armyworm', 'caterpillar maize', 'lepidoptera larva crop'],
  'blog-seed-systems': ['seed bags', 'seed storage', 'seed distribution africa'],
  'blog-cowpea-nitrogen': ['cowpea field', 'cowpea plant', 'legume field africa'],

  'contact-support': ['mobile phone call africa', 'telephone africa', 'mobile phone user africa'],
};

/** Licence short names on Commons that permit commercial use and derivatives. */
const ALLOWED = [
  /^cc0/i,
  /^cc[- ]by(?![- ]nc)(?![- ]nd)/i,
  /^public domain/i,
  /^pd/i,
];

function licenceAllowed(shortName) {
  if (!shortName) {
    return false;
  }

  if (/nc|nd|noncommercial|no derivative/i.test(shortName)) {
    return false;
  }

  return ALLOWED.some((pattern) => pattern.test(shortName));
}

function currentWidth(slot) {
  const file = path.join(RAW_DIR, `${slot}.jpg`);

  if (!existsSync(file)) {
    return 0;
  }

  try {
    const output = execFileSync('sips', ['-g', 'pixelWidth', file], { encoding: 'utf8' });
    return Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
  } catch {
    return 0;
  }
}

async function searchCommons(query) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: '6',
    gsrlimit: '20',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '2400',
  }).toString();

  // Commons rate-limits hard. Back off and retry rather than burning the slot.
  let response = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });

    if (response.status !== 429) {
      break;
    }

    const wait = 4000 * (attempt + 1);
    console.log(`  rate limited, waiting ${wait / 1000}s`);
    await new Promise((resolve) => setTimeout(resolve, wait));
  }

  if (!response || !response.ok) {
    throw new Error(`commons search failed: ${response?.status ?? 'no response'}`);
  }

  const body = await response.json();
  const pages = body.query?.pages ?? {};

  return Object.values(pages)
    .map((page) => {
      const info = page.imageinfo?.[0];

      if (!info) {
        return null;
      }

      const meta = info.extmetadata ?? {};
      const licence = meta.LicenseShortName?.value ?? '';
      const artist = (meta.Artist?.value ?? 'Unknown').replace(/<[^>]*>/g, '').trim();

      return {
        title: page.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, ''),
        width: info.width,
        height: info.height,
        // thumburl is the downscaled 2400px render; much smaller than originals
        // that can run to 50MB.
        url: info.thumburl ?? info.url,
        descriptionUrl: info.descriptionurl,
        licence,
        artist,
        mime: info.mime,
      };
    })
    .filter(
      (candidate) =>
        candidate &&
        candidate.mime === 'image/jpeg' &&
        licenceAllowed(candidate.licence) &&
        candidate.width >= 1200
    )
    .sort((a, b) => b.width - a.width);
}

async function main() {
  const args = process.argv.slice(2);
  const minIndex = args.indexOf('--min');
  const minWidth = minIndex >= 0 ? Number(args[minIndex + 1]) : 1800;
  const only = args.filter((arg, index) => {
    if (arg === '--min') return false;
    if (minIndex >= 0 && index === minIndex + 1) return false;
    return true;
  });

  const credits = existsSync(CREDITS_JSON) ? JSON.parse(await readFile(CREDITS_JSON, 'utf8')) : {};
  const slots = only.length > 0 ? only : Object.keys(QUERIES);

  let upgraded = 0;
  let kept = 0;

  for (const slot of slots) {
    const have = currentWidth(slot);

    if (have >= minWidth && only.length === 0) {
      console.log(`keep   ${slot} (already ${have}px)`);
      kept += 1;
      continue;
    }

    let best = null;

    for (const query of QUERIES[slot] ?? []) {
      try {
        const candidates = await searchCommons(query);
        const winner = candidates.find((candidate) => candidate.width > Math.max(have, 1200));

        if (winner && (!best || winner.width > best.width)) {
          best = winner;
        }

        if (best && best.width >= minWidth) {
          break;
        }
      } catch (error) {
        console.log(`  warn ${slot}: ${error.message}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    if (!best) {
      console.log(`keep   ${slot} (${have}px, commons had nothing better)`);
      kept += 1;
      continue;
    }

    try {
      const response = await fetch(best.url, { headers: { 'User-Agent': USER_AGENT } });

      if (!response.ok) {
        throw new Error(`download ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(path.join(RAW_DIR, `${slot}.jpg`), buffer);

      credits[slot] = {
        title: best.title,
        creator: best.artist,
        creatorUrl: null,
        licence: best.licence,
        licenceVersion: null,
        licenceUrl: null,
        source: 'wikimedia',
        sourceUrl: best.descriptionUrl,
        originalUrl: best.url,
        query: 'commons upgrade',
        requiresAttribution: !/^cc0|^public domain|^pd/i.test(best.licence),
      };

      console.log(
        `UP     ${slot}  ${have}px -> ${best.width}px  ${(buffer.byteLength / 1024 / 1024).toFixed(1)}MB  ${best.licence}  ${best.artist.slice(0, 40)}`
      );
      upgraded += 1;
    } catch (error) {
      console.log(`keep   ${slot} (download failed: ${error.message})`);
      kept += 1;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  await writeFile(CREDITS_JSON, `${JSON.stringify(credits, null, 2)}\n`);
  console.log(`\ndone: ${upgraded} upgraded, ${kept} kept`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
