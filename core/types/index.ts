import type { ImageSlot } from '@/core/content/image-manifest';

export interface Sponsor {
  name: string;
  image: string;
  /** How the organisation relates to CropX — default unconfirmed until classified. */
  relationship: 'programme' | 'accelerator' | 'funder' | 'ecosystem' | 'unconfirmed';
}

export type CropType =
  | 'MAIZE'
  | 'SORGHUM'
  | 'MILLET'
  | 'RICE'
  | 'COWPEA'
  | 'GROUNDNUT'
  | 'CASSAVA'
  | 'SESAME';

export type SoilType = 'SANDY' | 'SANDY_LOAM' | 'LOAM' | 'CLAY_LOAM' | 'CLAY' | 'ALLUVIAL';

export type AgroZone =
  | 'SAHEL'
  | 'SUDAN_SAVANNA'
  | 'NORTHERN_GUINEA'
  | 'SOUTHERN_GUINEA'
  | 'DERIVED_SAVANNA'
  | 'HUMID_FOREST';

export type DroughtRisk = 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'LOW';

export interface ZoneProfile {
  zone: AgroZone;
  label: string;
  /** Long-term mean annual rainfall range, millimetres. */
  rainfallMm: [number, number];
  /** Length of the reliable cropping window, days. */
  growingSeasonDays: [number, number];
  /** Mean daily maximum temperature in the hottest month, degrees Celsius. */
  peakTempC: number;
  droughtRisk: DroughtRisk;
  summary: string;
}

export interface SeedVariety {
  id: string;
  /** Released variety name, e.g. 'SAMMAZ 16'. */
  name: string;
  crop: CropType;
  /** 0-100 composite tolerance rating. See provenance note in seed-varieties.ts. */
  droughtToleranceScore: number;
  heatToleranceScore: number;
  /** Days from sowing to physiological maturity. */
  maturityDays: number;
  /** Realistic on-farm yield range under good management, tonnes per hectare. */
  expectedYieldTonsPerHa: [number, number];
  suitableSoils: SoilType[];
  agroZones: AgroZone[];
  /** Releasing or developing institute. */
  breeder: string;
  /** Notable agronomic traits beyond drought and heat tolerance. */
  traits: string[];
  notes: string;
}

export interface Recommendation {
  variety: SeedVariety;
  /** 0-100 suitability score for the submitted farm profile. */
  score: number;
  /** Human-readable reasons the variety scored as it did. */
  rationale: string[];
  /** True when the maturity window does not fit the zone's season. */
  seasonRisk: boolean;
}

export interface FarmProfile {
  state: string;
  soil: SoilType;
  crop: CropType;
  hectares: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown body, rendered with react-markdown. */
  body: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  cover: ImageSlot;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  quote: string;
}

export interface Stat {
  figure: string;
  label: string;
  /** Where the number comes from. Unsourced statistics are not persuasive. */
  source?: string;
}
