import {
  IconChartBar,
  IconCloudRain,
  IconCpu,
  IconLeaf,
  IconSeeding,
  IconUsers,
} from '@tabler/icons-react';
import { Sponsor } from '../types';

export const navLinks = [
  { link: '/seed-advisor', label: 'Seed Advisor' },
  { link: '/climate-insights', label: 'Climate Insights' },
  { link: '/crop-surveillance', label: 'Crop Surveillance' },
  { link: '/agronomist-network', label: 'Agronomist Network' },
  { link: '/blog', label: 'Field Notes' },
  // { link: '/about-us', label: 'About' },
];

export const platformFeatures = [
  {
    title: 'Variety matching',
    description:
      'Every recommendation starts from where the farm actually is. Location fixes the agro-ecological zone, which fixes the rainfall a crop can expect and the length of the window it has to finish in.',
    icon: IconSeeding,
  },
  {
    title: 'Climate aware ranking',
    description:
      'Drought and heat tolerance are weighted by how much they matter locally. In the Sahel resilience is close to the whole decision; in the humid south, yield potential and disease resistance matter more.',
    icon: IconCloudRain,
  },
  {
    title: 'Pest and disease surveillance',
    description:
      'Choosing the right seed is wasted if armyworm or cassava mosaic takes the field in August. Reports from nearby farms build into an early warning picture across a district.',
    icon: IconChartBar,
  },
  {
    title: 'Human advisory in the loop',
    description:
      'A model can rank varieties, but it cannot walk a field. Recommendations route to agronomists and extension officers who can confirm, correct, and follow up in person.',
    icon: IconUsers,
  },
];

export const platformFaqs = [
  {
    value: 'What does CropX actually do?',
    description:
      'CropX helps safeguard African food security by matching farms to drought and climate resilient crop varieties. You give it a location, a soil type, and the crop you intend to grow; it ranks released varieties by how well they suit those conditions and explains the reasoning behind each one.',
  },
  {
    value: 'How does the recommendation work?',
    description:
      'Your state determines the agro-ecological zone, which carries a rainfall range and a reliable growing season length. Varieties are then filtered by crop and soil compatibility and ranked on drought tolerance, heat tolerance, whether they can mature inside the local season, and yield potential. Drought and heat carry more weight in drier zones.',
  },
  {
    value: 'Is this AI or machine learning?',
    description:
      'The Seed Advisor uses AI assisted ranking against a curated variety dataset: location, soil, and crop drive a transparent score. In this preview the numeric resilience scores are composite estimates written to demonstrate the method, not outputs from a trained field model. Treat them as a starting point for an agronomist conversation.',
  },
  {
    value: 'Are these varieties genetically modified?',
    description:
      'Almost all are conventionally bred releases from institutes such as IAR Zaria, IITA, NCRI, and NRCRI. Where a variety is genetically modified, notably the pod borer resistant cowpea SAMPEA 20-T, the listing says so explicitly, because some buyers and export markets restrict it.',
  },
  {
    value: 'Why does maturity duration matter so much?',
    description:
      'A variety that needs 120 days cannot finish in a zone whose rains last 90. In the Sahel, drought tolerance often means escaping drought by maturing early rather than enduring it. Where a variety needs longer than the local season, the advisor flags it rather than burying it.',
  },
  {
    value: 'Where do I actually buy the seed?',
    description:
      'CropX does not sell seed and is not a marketplace. It tells you which variety to ask for, so you can source certified seed from an accredited agro-dealer, a seed company, or your state agricultural development programme.',
  },
  {
    value: 'Can I rely on this for planting decisions?',
    description:
      'Not yet. The variety names, breeders, and named traits are real, but the numeric resilience scores in this preview are composite estimates rather than measured trial results. Treat the output as a starting point for a conversation with an agronomist, not as a substitute for one.',
  },
];

export const impactStats = [
  {
    figure: '60%+',
    label: 'of sub Saharan Africa\u2019s workforce depends on agriculture for a living',
    source: 'Broad estimate; varies widely by country. Citation pending',
  },
  {
    figure: '2 in 3',
    label: 'farms in the region are smallholdings under two hectares',
    source: 'Indicative; citation pending',
  },
  {
    figure: '1.5-2x',
    label: 'faster warming across the Sahel than the global average',
    source: 'Indicative; citation pending',
  },
  {
    figure: '30%',
    label: 'typical yield loss when a mid season dry spell hits a poorly matched variety',
    source: 'Indicative range, not a measured figure',
  },
];

/** Girlified-style dual-crisis board — three crop-risk cards. */
export const crisisStats = [
  {
    figure: '1.5–2×',
    label: 'Faster Sahel warming',
    body: 'The growing season is shortening and mid season dry spells are more common. Varieties bred for yesterday’s climate are a food security risk.',
    category: 'Climate',
    source: 'Indicative; citation pending',
  },
  {
    figure: '30%',
    label: 'Yield at stake',
    body: 'A poorly matched variety can lose a large share of harvest when rains break early. That is household food, not only farm income.',
    category: 'Seed mismatch',
    source: 'Indicative range, not a measured trial figure',
  },
  {
    figure: '2 in 3',
    label: 'Smallholder farms',
    body: 'Most farms are under two hectares. Seed choice has to be legible without accounts, dashboards, or specialist jargon.',
    category: 'Food security',
    source: 'Indicative; citation pending',
  },
];

export const benefitFeatures = [
  {
    title: 'Zone first matching',
    body: 'Your state maps to one of six agro-ecological zones with rainfall and season length, so recommendations start from the climate you actually farm in.',
    benefit: 'Location becomes a climate fact, not a guess',
  },
  {
    title: 'Drought and heat aware ranking',
    body: 'Released varieties are scored on drought tolerance, heat tolerance, season fit, and yield potential, weighted by how much each matters locally.',
    benefit: 'Resilience weighted where it counts most',
  },
  {
    title: 'Reasoning on every match',
    body: 'Every shortlist entry explains why it ranked where it did, including risks such as a maturity window that may outlast the rains.',
    benefit: 'No black box planting advice',
  },
];

export const howItWorksSteps = [
  {
    label: 'Step one',
    heading: 'Describe the farm',
    body: 'State, soil type, the crop you plan to grow, and how much land you are planting. No account, no personal details, nothing stored.',
    slot: 'home-essay-harvest' as const,
    aspect: '1 / 1',
    objectPosition: 'center 20%',
  },
  {
    label: 'Step two',
    heading: 'Locate it in a climate',
    body: 'Your state resolves to one of six agro-ecological zones, each with a rainfall range, a growing season length, and a drought risk profile. This is what turns a general question into a specific one.',
    slot: 'agronomist-hero-extension' as const,
    aspect: '4 / 3',
    objectPosition: 'center 30%',
  },
  {
    label: 'Step three',
    heading: 'Rank the released varieties',
    body: 'Varieties bred for that zone and suited to that soil are scored on drought tolerance, heat tolerance, season fit, and yield potential, weighted by how much each matters where you are.',
    slot: 'advisor-hero-seedlings' as const,
    aspect: '16 / 11',
    objectPosition: 'center 40%',
  },
  {
    label: 'Step four',
    heading: 'Read the reasoning',
    body: 'Every recommendation explains why it ranked where it did, including the reasons against it. A variety that may not finish before the rains withdraw is flagged, not hidden.',
    slot: 'agronomist-training' as const,
    aspect: '16 / 11',
    objectPosition: 'center 30%',
  },
];

export const solutionCards = [
  {
    title: 'Seed Advisor',
    description:
      'The core food security tool: rank drought and climate resilient varieties for your state, soil, and crop, with the reasoning shown.',
    href: '/seed-advisor',
    slot: 'home-essay-harvest' as const,
    status: 'live' as const,
  },
  {
    title: 'Climate Insights',
    description:
      'Six agro-ecological zones, rainfall ranges, and season lengths: the climate assumptions behind every seed recommendation.',
    href: '/climate-insights',
    slot: 'climate-hero-drought' as const,
    status: 'live' as const,
  },
  {
    title: 'Crop Surveillance',
    description:
      'A planned early warning model for pest and disease pressure that can erase a well chosen variety before harvest. Not operational yet.',
    href: '/crop-surveillance',
    slot: 'surveillance-hero-pest' as const,
    status: 'planned' as const,
  },
  {
    title: 'Agronomist Network',
    description:
      'A planned advisory layer so climate fit shortlists can be confirmed on the ground. Describes the model, not a live request network today.',
    href: '/agronomist-network',
    slot: 'agronomist-hero-extension' as const,
    status: 'planned' as const,
  },
];

export const impactGridMetrics = [
  { figure: '6', label: 'Agro-ecological zones in the Nigeria preview map' },
  { figure: '30+', label: 'Released varieties in the curated preview dataset' },
  { figure: '0', label: 'Accounts required: advisor runs in the browser' },
  { figure: '4', label: 'Questions to generate a ranked shortlist' },
  { figure: '100%', label: 'Client side preview: no farm data transmitted' },
  { figure: 'IAR · IITA · NCRI', label: 'Breeder institutes named in the variety dataset' },
];

/**
 * PLACEHOLDER TEAM DATA — needs replacing before launch.
 *
 * The five photographs in public/images/team/ carry over from the previous
 * site. Only the first name and role survived the rebrand; the remaining
 * names, roles and biographies must be supplied.
 */
export const teamMembers = [
  {
    name: 'Idokoh Divine Ojochide',
    role: 'Cofounder / CEO',
    bio: 'TODO: supply biography.',
    image: '/images/team/team_member_1.png',
    linkedin: null,
  },
  {
    name: 'TODO: name',
    role: 'TODO: role',
    bio: 'TODO: supply biography.',
    image: '/images/team/team_member_2.png',
    linkedin: null,
  },
  {
    name: 'TODO: name',
    role: 'TODO: role',
    bio: 'TODO: supply biography.',
    image: '/images/team/team_member_3.jpg',
    linkedin: null,
  },
  {
    name: 'TODO: name',
    role: 'TODO: role',
    bio: 'TODO: supply biography.',
    image: '/images/team/team_member_4.jpeg',
    linkedin: null,
  },
  {
    name: 'TODO: name',
    role: 'TODO: role',
    bio: 'TODO: supply biography.',
    image: '/images/team/team_member_5.jpeg',
    linkedin: null,
  },
];

/** Set false until teamMembers holds real data, to keep placeholders off the site. */
export const showTeamSection = false;

export const Sponsors: Sponsor[] = [
  { name: 'Kenya Climate Innovation Centre', image: '/sponsors/logo_KCIC.png', relationship: 'unconfirmed' },
  { name: 'Global Center on Adaptation', image: '/sponsors/gca.png', relationship: 'unconfirmed' },
  { name: 'African Development Bank Group', image: '/sponsors/adbgroup.png', relationship: 'unconfirmed' },
  { name: 'European Union', image: '/sponsors/eu.jpg', relationship: 'unconfirmed' },
  { name: 'GIZ', image: '/sponsors/giz.jpg', relationship: 'unconfirmed' },
  { name: 'NITDA', image: '/sponsors/nitda.png', relationship: 'unconfirmed' },
  { name: 'NCAIR', image: '/sponsors/ncair.png', relationship: 'unconfirmed' },
  { name: 'Climate Investment Funds', image: '/sponsors/cif.jpg', relationship: 'unconfirmed' },
  { name: 'OACPS', image: '/sponsors/oacps.jpg', relationship: 'unconfirmed' },
  { name: 'Federal Ministry of Communications and Digital Economy', image: '/sponsors/fmcide.png', relationship: 'unconfirmed' },
  { name: 'AI Collective', image: '/sponsors/ai_collective.png', relationship: 'unconfirmed' },
  { name: 'Heave Ventures', image: '/sponsors/heave-ventures.png', relationship: 'unconfirmed' },
  { name: 'VC4A', image: '/sponsors/vc4a.jpg', relationship: 'unconfirmed' },
  { name: 'FCMB', image: '/sponsors/fcmb.png', relationship: 'unconfirmed' },
  { name: 'AEIP', image: '/sponsors/aeip.png', relationship: 'unconfirmed' },
];

export const contactChannels = {
  email: 'hello@cropx.africa',
  phone: '+234 810 859 7000',
  offices: [
    {
      label: 'Abuja',
      lines: ['Shimex Estate', 'Lugbe FCT, Nigeria'],
    },
    {
      label: 'Asaba',
      lines: ['Opposite Infant Jesus', 'Old Anwai Road, Asaba, Delta State'],
    },
  ],
};

export const featureIcons = { IconCpu, IconLeaf };
