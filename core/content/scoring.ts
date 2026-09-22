import { multiZoneStates, stateToZone, zoneOrder, zoneProfiles } from '@/core/content/agro-zones';
import { cropLabels, seedVarieties, soilLabels } from '@/core/content/seed-varieties';
import { AgroZone, DroughtRisk, FarmProfile, Recommendation, SeedVariety } from '@/core/types';

/**
 * How much the drought and heat components dominate the ranking, by zone risk.
 * In the Sahel, resilience is close to the whole decision. In the humid forest,
 * water is rarely the binding constraint, so yield potential matters more.
 */
const RISK_FACTOR: Record<DroughtRisk, number> = {
  VERY_HIGH: 1,
  HIGH: 0.8,
  MODERATE: 0.5,
  LOW: 0.25,
};

/**
 * Crops that are not constrained by the rainy season in the usual way.
 * Cassava stands in the field across the dry season and resumes growth, so
 * comparing its 330-day cycle against a 90-day rainy season is meaningless.
 */
const SEASON_EXEMPT = new Set(['CASSAVA']);

function zoneFit(variety: SeedVariety, zone: AgroZone): number {
  if (variety.agroZones.includes(zone)) {
    return 1;
  }

  // Partial credit for a neighbouring zone: conditions grade into each other
  // rather than changing at a border.
  const target = zoneOrder.indexOf(zone);
  const nearest = Math.min(
    ...variety.agroZones.map((candidate) => Math.abs(zoneOrder.indexOf(candidate) - target))
  );

  return nearest === 1 ? 0.35 : 0;
}

function seasonFit(variety: SeedVariety, zone: AgroZone): { value: number; risk: boolean } {
  if (SEASON_EXEMPT.has(variety.crop)) {
    return { value: 1, risk: false };
  }

  const [, seasonMax] = zoneProfiles[zone].growingSeasonDays;

  if (variety.maturityDays <= seasonMax) {
    return { value: 1, risk: false };
  }

  // Marginal: needs a good year or supplementary water to finish.
  if (variety.maturityDays <= seasonMax * 1.15) {
    return { value: 0.45, risk: true };
  }

  return { value: 0.05, risk: true };
}

/** Midpoint yield normalised against the best in the same crop, 0-1. */
function yieldFit(variety: SeedVariety): number {
  const peers = seedVarieties.filter((candidate) => candidate.crop === variety.crop);
  const midpoint = (values: [number, number]) => (values[0] + values[1]) / 2;
  const best = Math.max(...peers.map((peer) => midpoint(peer.expectedYieldTonsPerHa)));

  return best === 0 ? 0 : midpoint(variety.expectedYieldTonsPerHa) / best;
}

function buildRationale(
  variety: SeedVariety,
  profile: FarmProfile,
  zone: AgroZone,
  parts: { zone: number; soil: number; season: { value: number; risk: boolean } }
): string[] {
  const rationale: string[] = [];
  const zoneLabel = zoneProfiles[zone].label;
  const [seasonMin, seasonMax] = zoneProfiles[zone].growingSeasonDays;

  if (parts.zone === 1) {
    rationale.push(`Released for the ${zoneLabel}, which is where ${profile.state} sits.`);
  } else if (parts.zone > 0) {
    rationale.push(
      `Bred for a neighbouring zone rather than the ${zoneLabel} itself, so treat it as a second choice option.`
    );
  } else {
    rationale.push(`Not bred for the ${zoneLabel}; included only because few alternatives matched.`);
  }

  if (parts.soil === 1) {
    rationale.push(`Suited to ${soilLabels[profile.soil].toLowerCase()} soils.`);
  } else {
    rationale.push(
      `Not a documented match for ${soilLabels[profile.soil].toLowerCase()} soils, which may cost yield.`
    );
  }

  if (variety.droughtToleranceScore >= 85) {
    rationale.push('Among the most drought resilient options for this crop.');
  } else if (variety.droughtToleranceScore >= 70) {
    rationale.push('Moderately drought resilient; vulnerable to a long mid season dry spell.');
  } else {
    rationale.push('Low drought resilience. Only sensible with assured water.');
  }

  if (SEASON_EXEMPT.has(variety.crop)) {
    rationale.push(
      `Takes about ${variety.maturityDays} days but stands through the dry season, so the rainy season length is not the limiting factor.`
    );
  } else if (parts.season.value === 1) {
    rationale.push(
      `Matures in ${variety.maturityDays} days, inside the ${seasonMin}-${seasonMax} day window here.`
    );
  } else {
    rationale.push(
      `Needs ${variety.maturityDays} days against a ${seasonMin}-${seasonMax} day season. It may not finish before the rains withdraw.`
    );
  }

  if (variety.traits.length > 0) {
    rationale.push(`Other traits: ${variety.traits.join(', ').toLowerCase()}.`);
  }

  return rationale;
}

export interface AdvisorResult {
  zone: AgroZone;
  zoneLabel: string;
  zoneSummary: string;
  droughtRisk: DroughtRisk;
  /** True when the state spans more than one zone and results are approximate. */
  approximateZone: boolean;
  recommendations: Recommendation[];
}

/**
 * Rank seed varieties against a farm profile.
 *
 * Deterministic and synchronous by design: identical inputs always give
 * identical output, and there is no hidden model call. Swapping this for a
 * real service means replacing this one function.
 */
export function recommendVarieties(profile: FarmProfile): AdvisorResult {
  const zone = stateToZone[profile.state];

  if (!zone) {
    throw new Error(`No agro-ecological zone mapped for state: ${profile.state}`);
  }

  const { droughtRisk } = zoneProfiles[zone];
  const risk = RISK_FACTOR[droughtRisk];

  const weights = {
    zone: 28,
    soil: 12,
    drought: 15 + 20 * risk,
    heat: 10 + 8 * risk,
    season: 18,
    yield: 8 + 14 * (1 - risk),
  };

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);

  const recommendations = seedVarieties
    .filter((variety) => variety.crop === profile.crop)
    .map<Recommendation>((variety) => {
      const parts = {
        zone: zoneFit(variety, zone),
        soil: variety.suitableSoils.includes(profile.soil) ? 1 : 0.3,
        season: seasonFit(variety, zone),
      };

      const weighted =
        parts.zone * weights.zone +
        parts.soil * weights.soil +
        (variety.droughtToleranceScore / 100) * weights.drought +
        (variety.heatToleranceScore / 100) * weights.heat +
        parts.season.value * weights.season +
        yieldFit(variety) * weights.yield;

      return {
        variety,
        score: Math.round((weighted / totalWeight) * 100),
        rationale: buildRationale(variety, profile, zone, parts),
        seasonRisk: parts.season.risk,
      };
    })
    .sort((a, b) => b.score - a.score);

  return {
    zone,
    zoneLabel: zoneProfiles[zone].label,
    zoneSummary: zoneProfiles[zone].summary,
    droughtRisk,
    approximateZone: multiZoneStates.has(profile.state),
    recommendations,
  };
}

export const cropOptions = Object.entries(cropLabels).map(([value, label]) => ({ value, label }));

export const soilOptions = Object.entries(soilLabels).map(([value, label]) => ({ value, label }));
