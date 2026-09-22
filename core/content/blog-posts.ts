import { BlogPost } from '@/core/types';

/**
 * Field Notes: the site's agronomy writing, stored locally and rendered with
 * react-markdown. No CMS and no backend call.
 *
 * The agronomy in these pieces is general and widely documented. Specific
 * variety numbers cite the releasing institute so a reader can verify them.
 */
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'what-drought-tolerance-actually-means',
    title: 'What "drought tolerance" actually means on a seed packet',
    excerpt:
      'Two varieties can both be sold as drought tolerant and survive a dry year by completely different strategies. Knowing which one you are buying changes when you plant it.',
    author: 'CropX Agronomy',
    publishedAt: '2026-08-18',
    readMinutes: 6,
    tags: ['Seed selection', 'Drought'],
    cover: 'blog-drought-varieties',
    body: `Ask three seed sellers what drought tolerance means and you will get three answers. The label covers at least two genuinely different plant strategies, and confusing them is how farmers end up with the wrong seed for the right reason.

## Escape versus endurance

**Drought escape** means finishing early. An extra early maize such as SAMMAZ 16 from IAR Zaria matures in around 80 days. It does not withstand drought so much as sidestep it, completing grain fill before the rains withdraw. In the Sahel Savanna, where the reliable window is 75 to 90 days, this is often the only workable approach.

**Drought endurance** means holding on. Varieties selected under managed drought stress, such as IITA's TZE-W DT STR populations, keep filling grain through a mid season dry spell that would abort the ears of a less tolerant variety. This matters where the season is long enough but unreliable in the middle.

The two strategies fail in different ways. An escape variety planted in a long season simply leaves yield on the table. An endurance variety planted where the season is too short will not finish at all.

## Why maturity duration is the first question

Before comparing tolerance ratings, compare duration against your season. A variety needing 120 days cannot finish where the rains last 90, regardless of how it is marketed. This is the single most common mismatch, and it gets worse as rainfall becomes less predictable.

## What to ask for

- The variety name and the institute that released it, not just "improved seed"
- Days to maturity, and how that compares with your normal season
- Whether the drought claim is about early maturity or about stress tolerance
- Whether the seed is certified, and what germination percentage it is sold at

A seller who cannot answer the first two is not selling you a known variety.`,
  },
  {
    id: '2',
    slug: 'reading-your-soil-before-you-buy-seed',
    title: 'Reading your soil before you buy seed',
    excerpt:
      'Soil texture decides how long rainfall stays available to a crop. It is cheap to assess by hand and it changes which varieties are worth planting.',
    author: 'CropX Agronomy',
    publishedAt: '2026-08-04',
    readMinutes: 5,
    tags: ['Soil', 'Seed selection'],
    cover: 'blog-soil-health',
    body: `Rainfall figures describe what arrives. Soil decides how much of it a crop can actually use, and for how long. Two farms in the same district with the same rainfall can face very different drought pressure because one holds water and the other does not.

## The hand test

Wet a handful of soil and work it between your fingers.

- **Sandy**: gritty, will not hold a shape, falls apart immediately. Drains fast, dries fast, holds little. Pearl millet and sesame do well here; maize struggles without reliable rain.
- **Loam**: slightly gritty but holds a shape that crumbles under light pressure. The most forgiving texture, and where most varieties perform close to their potential.
- **Clay**: sticky, smears, rolls into a ribbon without cracking. Holds a lot of water but releases it slowly and waterlogs. Rice tolerates it; groundnut resents it.

## What this changes

On sandy soils, prioritise early maturity even more heavily than the rainfall figures suggest, because available water runs out sooner than the rain gauge implies. On clay-rich soils in high-rainfall zones, the binding constraint is usually drainage and disease rather than drought, so disease resistance should outrank drought rating.

## Organic matter is the lever you control

Texture is fixed; organic matter is not. Returning residues, applying manure where it is available, and keeping the soil covered all raise water-holding capacity over several seasons. It is slow, unglamorous, and does more for drought resilience on a sandy field than any single seed choice.`,
  },
  {
    id: '3',
    slug: 'planting-when-the-rains-are-unreliable',
    title: 'Planting when you cannot trust the rains',
    excerpt:
      'False starts to the rainy season destroy more seed than drought does. A few rules reduce how often you have to replant.',
    author: 'CropX Agronomy',
    publishedAt: '2026-07-21',
    readMinutes: 7,
    tags: ['Planting', 'Climate'],
    cover: 'blog-planting-calendar',
    body: `The costly failure at the start of a season is rarely drought. It is a false start: enough rain to justify planting, then a two-week gap that kills the emerged seedlings and forces a replant with seed you may not have.

## Wait for the pattern, not the first rain

A common rule of thumb across the Nigerian savanna is to plant after cumulative rainfall of roughly 20 to 25mm across two or three days, rather than on the strength of one heavy storm. One storm proves nothing about whether the rains have established.

## Stagger, do not gamble

Where you have the labour, splitting planting across two or three dates a week or so apart spreads the risk. Losing one planting to a dry spell is survivable; losing the whole field is not. This costs more labour and it is the most reliable protection available without irrigation.

## Match duration to what is left

If the rains arrive three weeks late, the variety you planned for is often no longer the right one. The season has shortened, and a medium maturing variety may no longer finish. This is exactly when an extra early variety earns its place, even at a lower yield ceiling. A smaller harvest beats none.

## Keep a fallback

Short-duration cowpea, at around 70 to 75 days, can still produce after a failed cereal planting, and fixes nitrogen for next season while doing it. Keeping some in reserve is cheap insurance.`,
  },
  {
    id: '4',
    slug: 'spotting-fall-armyworm-early',
    title: 'Spotting fall armyworm before it costs you the field',
    excerpt:
      'Armyworm damage is unmistakable once it is severe and easy to miss when it is still treatable. The difference is a few days of looking.',
    author: 'CropX Agronomy',
    publishedAt: '2026-07-07',
    readMinutes: 6,
    tags: ['Pests', 'Surveillance'],
    cover: 'blog-armyworm',
    body: `Fall armyworm established itself across sub-Saharan Africa from 2016 and is now a permanent feature of maize production. It is manageable when caught early and close to unstoppable once larvae are large and sheltered deep in the whorl.

## What early damage looks like

- Small translucent "windows" in young leaves where larvae have fed through one surface
- Moist sawdust like frass in the leaf whorl, which is often the clearest early sign
- Ragged holes with irregular edges, distinct from the neat cuts of other feeders

Late damage is obvious and largely untreatable: the whorl shredded, frass packed in, and larvae too large and too well protected for contact sprays to reach.

## Scout deliberately

Walk the field twice a week from emergence, checking the whorls of plants at several points rather than only at the edges. Damage is patchy, and the margins of a field are not representative.

## Why reporting matters beyond your own field

Armyworm moves. A district where several farms report early damage in the same week can act together, and the value of one farmer's observation is much greater when it is pooled. That is the reasoning behind crop surveillance: individually these are anecdotes, collectively they are an early warning system.`,
  },
  {
    id: '5',
    slug: 'certified-seed-and-why-it-costs-more',
    title: 'Certified seed, and why it costs more than grain',
    excerpt:
      'Saved grain and certified seed are not the same product. The price gap buys germination, genetic purity, and knowing what you actually planted.',
    author: 'CropX Agronomy',
    publishedAt: '2026-06-23',
    readMinutes: 5,
    tags: ['Seed systems'],
    cover: 'blog-seed-systems',
    body: `Recommending a variety is only useful if a farmer can obtain that variety and be confident that is what is in the bag. In practice this is where a lot of good advice breaks down.

## What certification actually guarantees

Certified seed is produced under inspection and tested before sale. What you are buying is a stated germination percentage, freedom from other varieties and weed seed, and traceability to a known variety. Grain saved from last year's harvest carries none of these guarantees, and if last year's crop was a hybrid, the saved seed will not perform like its parent at all.

## Hybrids cannot be saved

Open-pollinated varieties such as the SAMMAZ maize series can be saved and replanted for a few seasons with modest decline. Hybrids such as Oba Super 9 lose much of their advantage in the first saved generation, because the uniformity you paid for does not carry through. If you are buying a hybrid, budget for fresh seed every season.

## Practical checks at the point of sale

- The bag states the variety name, not just "improved maize"
- There is a germination percentage and a test or packing date
- The seal is intact
- The seller is an accredited dealer who can name the producing company

## Where to look

State agricultural development programmes, accredited agro-dealers, and seed companies are the usual routes. CropX does not sell seed; it tells you what to ask for so that the conversation with a dealer starts from a specific variety rather than a vague description.`,
  },
  {
    id: '6',
    slug: 'cowpea-the-crop-that-pays-you-back',
    title: 'Cowpea: the crop that pays the next season back',
    excerpt:
      'Cowpea produces food in under 80 days and leaves nitrogen behind. In a rotation it is doing two jobs at once.',
    author: 'CropX Agronomy',
    publishedAt: '2026-06-09',
    readMinutes: 5,
    tags: ['Legumes', 'Soil'],
    cover: 'blog-cowpea-nitrogen',
    body: `Cowpea rarely gets the attention maize does, which understates its usefulness. It is drought hardy, quick, edible in several forms, and it improves the soil rather than depleting it.

## Nitrogen, without buying it

Cowpea forms a partnership with soil bacteria that convert atmospheric nitrogen into a form plants can use. Some of that nitrogen remains in the residues after harvest, so a cereal following cowpea starts from a better position than one following a cereal. Where fertiliser is expensive or simply unavailable, this is one of the few levers a farmer genuinely controls.

## Short enough to rescue a season

At roughly 70 to 80 days, varieties such as SAMPEA 14 or IITA's IT97K-499-35 can be planted well into a season and still produce. That makes cowpea the standard fallback when a cereal planting fails.

## The pest problem, and one answer to it

The honest difficulty with cowpea is Maruca pod borer, which can require repeated insecticide sprays that many farmers cannot afford or apply safely. SAMPEA 20-T, developed by IAR Zaria with AATF, is resistant to the pod borer and sharply reduces spraying. It is a genetically modified variety, which is a real consideration for anyone selling into markets that restrict GM produce, so it is a choice to make deliberately.

## Fitting it in

Rotate rather than monocrop, and give it reasonable spacing rather than treating it as a filler between cereal rows. Intercropping works, but a crowded cowpea plant fixes less nitrogen and yields less of everything.`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);
