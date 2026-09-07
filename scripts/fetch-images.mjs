/**
 * Sources the CropX photo set from Openverse, restricted to licences that
 * permit commercial use, then records the attribution each licence requires.
 *
 * Openverse aggregates Wikimedia Commons, Flickr and others, which is why this
 * returns genuine West African field photography instead of generic stock.
 *
 * Usage: node scripts/fetch-images.mjs [slot-name ...]
 * With no arguments it fetches every slot that is not already downloaded.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const RAW_DIR = 'public/images/cropx/raw';
const CREDITS_JSON = 'scripts/image-credits.json';
const USER_AGENT = 'CropX-site-build/1.0 (agricultural advisory site; contact via repo)';

/**
 * Every image slot in the site, with the search that should fill it.
 * `wide` slots become full-bleed panels; `square` and `tall` are inline.
 */
const SLOTS = [
  // ------------------------------------------------------------------ home
  {
    slot: 'home-hero-dry-field',
    q: 'drought dry farmland africa',
    ratio: 'wide',
    fallbacks: ['dry savanna farmland', 'drought field'],
  },
  {
    slot: 'home-before-drought-maize',
    q: 'drought damaged maize crop',
    ratio: 'wide',
    fallbacks: ['wilted maize', 'dry maize stalks field', 'maize crop failure'],
  },
  {
    slot: 'home-after-healthy-maize',
    q: 'maize field green africa',
    ratio: 'wide',
    fallbacks: ['maize farm ghana', 'green maize plants field', 'corn field'],
  },
  {
    slot: 'home-essay-farmer',
    q: 'farmer nigeria',
    ratio: 'square',
    fallbacks: ['african farmer working', 'smallholder farmer africa', 'farmer hoe field africa'],
  },
  { slot: 'home-essay-soil', q: 'soil sampling agriculture', ratio: 'square' },
  {
    slot: 'home-essay-seed',
    q: 'seeds in hands',
    ratio: 'square',
    fallbacks: ['maize seed grain', 'holding grain seeds', 'seed close up'],
  },
  {
    slot: 'home-essay-harvest',
    q: 'maize harvest africa',
    ratio: 'square',
    fallbacks: ['harvest grain africa', 'maize cobs harvest', 'harvesting crops africa'],
  },
  { slot: 'home-impact-market', q: 'grain market africa', ratio: 'wide' },
  { slot: 'home-cta-farmland', q: 'farmland sunset africa', ratio: 'wide' },

  // ---------------------------------------------------------- seed advisor
  { slot: 'advisor-hero-seedlings', q: 'seedlings nursery agriculture', ratio: 'wide' },
  {
    slot: 'advisor-seed-closeup',
    q: 'sorghum grain',
    ratio: 'square',
    fallbacks: ['sorghum seeds', 'grain seeds macro', 'cereal grain close up'],
  },
  { slot: 'advisor-trial-plots', q: 'agricultural research trial plots', ratio: 'wide' },
  {
    slot: 'advisor-millet-field',
    q: 'pearl millet',
    ratio: 'square',
    fallbacks: ['millet crop field', 'millet plant', 'sorghum field africa'],
  },
  {
    slot: 'advisor-planting',
    q: 'planting seeds farm',
    ratio: 'square',
    fallbacks: ['sowing seeds by hand', 'planting crops africa', 'farmer planting'],
  },

  // ------------------------------------------------------- climate insights
  { slot: 'climate-hero-drought', q: 'cracked dry earth drought', ratio: 'wide' },
  { slot: 'climate-rain-clouds', q: 'rain clouds over farmland', ratio: 'wide' },
  { slot: 'climate-irrigation', q: 'irrigation farm africa', ratio: 'square' },
  { slot: 'climate-sahel', q: 'sahel savanna landscape', ratio: 'wide' },
  {
    slot: 'climate-dry-riverbed',
    q: 'dry riverbed',
    ratio: 'square',
    fallbacks: ['dried river africa', 'drought water scarcity africa', 'arid landscape africa'],
  },

  // ----------------------------------------------------- crop surveillance
  {
    slot: 'surveillance-hero-pest',
    q: 'armyworm maize damage',
    ratio: 'wide',
    fallbacks: ['crop pest damage field', 'insect damage maize leaves', 'damaged crop field'],
  },
  { slot: 'surveillance-leaf-disease', q: 'plant disease leaf symptoms', ratio: 'square' },
  { slot: 'surveillance-scouting', q: 'farmer inspecting crop field', ratio: 'square' },
  {
    slot: 'surveillance-phone-field',
    q: 'mobile phone farmer africa',
    ratio: 'wide',
    fallbacks: ['smartphone agriculture field', 'mobile phone rural africa', 'phone farm technology'],
  },
  {
    slot: 'surveillance-cassava',
    q: 'cassava plant',
    ratio: 'square',
    fallbacks: ['cassava farm', 'cassava leaves', 'manioc plant field'],
  },

  // ---------------------------------------------------- agronomist network
  { slot: 'agronomist-hero-extension', q: 'agricultural extension officer training', ratio: 'wide' },
  {
    slot: 'agronomist-training',
    q: 'farmer training africa',
    ratio: 'wide',
    fallbacks: ['agricultural training group', 'farmer field school', 'farmers meeting africa'],
  },
  {
    slot: 'agronomist-soil-test',
    q: 'soil testing',
    ratio: 'square',
    fallbacks: ['soil analysis laboratory', 'soil sample testing', 'agronomy laboratory'],
  },
  {
    slot: 'agronomist-field-demo',
    q: 'agriculture demonstration plot',
    ratio: 'square',
    fallbacks: ['agronomist field farmers', 'agricultural advisor field', 'extension agriculture'],
  },

  // ----------------------------------------------------------------- about
  { slot: 'about-mosaic-1', q: 'african farmer portrait field', ratio: 'tall' },
  {
    slot: 'about-mosaic-2',
    q: 'women farmers africa',
    ratio: 'square',
    fallbacks: ['african women agriculture', 'woman farmer harvest africa', 'women farming'],
  },
  {
    slot: 'about-mosaic-3',
    q: 'agricultural research africa',
    ratio: 'square',
    fallbacks: ['crop research scientist', 'plant breeding research', 'agricultural laboratory'],
  },
  {
    slot: 'about-mosaic-4',
    q: 'sorghum field',
    ratio: 'wide',
    fallbacks: ['savanna farmland africa', 'grain field landscape', 'millet field landscape'],
  },

  // ------------------------------------------------------------------ blog
  { slot: 'blog-drought-varieties', q: 'drought tolerant crop field', ratio: 'wide' },
  { slot: 'blog-soil-health', q: 'soil health organic matter farm', ratio: 'wide' },
  { slot: 'blog-planting-calendar', q: 'sowing planting season farm africa', ratio: 'wide' },
  {
    slot: 'blog-armyworm',
    q: 'maize leaf damage pest',
    ratio: 'wide',
    fallbacks: ['caterpillar crop pest', 'insect pest maize', 'crop damage insect'],
  },
  { slot: 'blog-seed-systems', q: 'seed bags storage agriculture', ratio: 'wide' },
  { slot: 'blog-cowpea-nitrogen', q: 'cowpea legume field', ratio: 'wide' },

  // --------------------------------------------------------------- contact
  {
    slot: 'contact-support',
    q: 'farmer mobile phone africa',
    ratio: 'square',
    fallbacks: ['phone call rural africa', 'mobile phone hand africa', 'farmer communication'],
  },
];

const LICENCE_LABELS = {
  cc0: 'CC0 1.0',
  pdm: 'Public Domain Mark',
  by: 'CC BY',
  'by-sa': 'CC BY-SA',
};

/** Licences we accept: commercial use permitted, no NoDerivatives. */
const ALLOWED = new Set(['cc0', 'pdm', 'by', 'by-sa']);

async function searchOnce(query, { ratio, extension }) {
  const url = new URL('https://api.openverse.org/v1/images/');
  url.searchParams.set('q', query);
  url.searchParams.set('license_type', 'commercial');
  url.searchParams.set('page_size', '20');
  if (extension) {
    url.searchParams.set('extension', extension);
  }
  if (ratio) {
    url.searchParams.set('aspect_ratio', ratio);
  }

  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });

  if (!response.ok) {
    throw new Error(`search failed for "${query}": ${response.status}`);
  }

  const body = await response.json();

  return (body.results ?? [])
    .filter(
      (result) =>
        ALLOWED.has(result.license) &&
        result.url &&
        // Skip thumbnails, icons and diagrams; we want real photographs.
        (result.filesize === null || result.filesize > 80_000)
    )
    // Largest first: a bigger original survives downscaling to 2400px better.
    .sort((a, b) => (b.filesize ?? 0) - (a.filesize ?? 0));
}

/**
 * Progressively relax the search until something usable turns up: the exact
 * query at the requested aspect ratio first, then without the ratio, then
 * without the file-type restriction, then each fallback query in turn.
 */
async function search(entry) {
  const queries = [entry.q, ...(entry.fallbacks ?? [])];
  const relaxations = [
    { ratio: entry.ratio, extension: 'jpg' },
    { ratio: undefined, extension: 'jpg' },
    { ratio: undefined, extension: undefined },
  ];

  for (const query of queries) {
    for (const relaxation of relaxations) {
      const results = await searchOnce(query, relaxation);

      if (results.length > 0) {
        return results;
      }

      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  return [];
}

async function download(result, slot) {
  const response = await fetch(result.url, { headers: { 'User-Agent': USER_AGENT } });

  if (!response.ok) {
    throw new Error(`download failed: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.byteLength < 40_000) {
    throw new Error('file too small to be a usable photograph');
  }

  const target = path.join(RAW_DIR, `${slot}.jpg`);
  await writeFile(target, buffer);

  return { target, bytes: buffer.byteLength };
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });

  const only = process.argv.slice(2);
  const queue = only.length > 0 ? SLOTS.filter((entry) => only.includes(entry.slot)) : SLOTS;

  let credits = {};
  if (existsSync(CREDITS_JSON)) {
    credits = JSON.parse(await readFile(CREDITS_JSON, 'utf8'));
  }

  const failures = [];

  for (const entry of queue) {
    const existing = path.join(RAW_DIR, `${entry.slot}.jpg`);

    if (existsSync(existing) && credits[entry.slot] && only.length === 0) {
      console.log(`skip   ${entry.slot} (already downloaded)`);
      continue;
    }

    try {
      const candidates = await search(entry);

      if (candidates.length === 0) {
        throw new Error('no candidates passed the licence and size filter');
      }

      let saved = null;
      let chosen = null;

      for (const candidate of candidates.slice(0, 4)) {
        try {
          saved = await download(candidate, entry.slot);
          chosen = candidate;
          break;
        } catch (error) {
          console.log(`  retry ${entry.slot}: ${error.message}`);
        }
      }

      if (!chosen) {
        throw new Error('every candidate failed to download');
      }

      credits[entry.slot] = {
        title: chosen.title ?? 'Untitled',
        creator: chosen.creator ?? 'Unknown',
        creatorUrl: chosen.creator_url ?? null,
        licence: LICENCE_LABELS[chosen.license] ?? chosen.license,
        licenceVersion: chosen.license_version ?? null,
        licenceUrl: chosen.license_url ?? null,
        source: chosen.source ?? 'openverse',
        sourceUrl: chosen.foreign_landing_url ?? null,
        originalUrl: chosen.url,
        query: entry.q,
        requiresAttribution: chosen.license === 'by' || chosen.license === 'by-sa',
      };

      console.log(
        `ok     ${entry.slot}  ${(saved.bytes / 1024 / 1024).toFixed(1)}MB  ${credits[entry.slot].licence}  ${credits[entry.slot].creator}`
      );
    } catch (error) {
      failures.push({ slot: entry.slot, reason: error.message });
      console.log(`FAIL   ${entry.slot}: ${error.message}`);
    }

    // Stay well inside Openverse's anonymous rate limit.
    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  await writeFile(CREDITS_JSON, `${JSON.stringify(credits, null, 2)}\n`);

  console.log(`\ndone: ${Object.keys(credits).length} images credited, ${failures.length} failed`);

  if (failures.length > 0) {
    console.log('failed slots:');
    failures.forEach((failure) => console.log(`  ${failure.slot} — ${failure.reason}`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
