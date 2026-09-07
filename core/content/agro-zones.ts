import { AgroZone, ZoneProfile } from '@/core/types';

/**
 * Nigeria's six broad agro-ecological zones, ordered driest to wettest.
 *
 * Rainfall and season figures are long-term averages drawn from the standard
 * agro-ecological classification used by Nigerian agricultural research
 * institutes. They describe a zone, not a field: local variation is large.
 */
export const zoneProfiles: Record<AgroZone, ZoneProfile> = {
  SAHEL: {
    zone: 'SAHEL',
    label: 'Sahel Savanna',
    rainfallMm: [250, 600],
    growingSeasonDays: [75, 90],
    peakTempC: 40,
    droughtRisk: 'VERY_HIGH',
    summary:
      'A single short rainy season with high year-to-year variability. Only extra-early and early varieties reliably complete their cycle before the rains withdraw.',
  },
  SUDAN_SAVANNA: {
    zone: 'SUDAN_SAVANNA',
    label: 'Sudan Savanna',
    rainfallMm: [600, 1000],
    growingSeasonDays: [90, 140],
    peakTempC: 39,
    droughtRisk: 'HIGH',
    summary:
      'Nigeria\'s cereal and legume belt. Rain is adequate in a good year but mid-season dry spells and a sharp end to the rains make maturity timing critical.',
  },
  NORTHERN_GUINEA: {
    zone: 'NORTHERN_GUINEA',
    label: 'Northern Guinea Savanna',
    rainfallMm: [1000, 1300],
    growingSeasonDays: [140, 190],
    peakTempC: 36,
    droughtRisk: 'MODERATE',
    summary:
      'The most productive cereal zone in the country. A long enough season for medium-maturing varieties, with drought tolerance still valuable as insurance.',
  },
  SOUTHERN_GUINEA: {
    zone: 'SOUTHERN_GUINEA',
    label: 'Southern Guinea Savanna',
    rainfallMm: [1300, 1500],
    growingSeasonDays: [190, 230],
    peakTempC: 34,
    droughtRisk: 'MODERATE',
    summary:
      'A long, largely reliable season supporting roots, tubers, and late-maturing cereals. Drought pressure is episodic rather than structural.',
  },
  DERIVED_SAVANNA: {
    zone: 'DERIVED_SAVANNA',
    label: 'Derived Savanna',
    rainfallMm: [1300, 1600],
    growingSeasonDays: [200, 250],
    peakTempC: 33,
    droughtRisk: 'LOW',
    summary:
      'Former forest now under savanna vegetation. Two cropping opportunities in most years, with a short August break between rainfall peaks.',
  },
  HUMID_FOREST: {
    zone: 'HUMID_FOREST',
    label: 'Humid Forest',
    rainfallMm: [1600, 3000],
    growingSeasonDays: [250, 330],
    peakTempC: 32,
    droughtRisk: 'LOW',
    summary:
      'Abundant rainfall over a long season. The binding constraints here are disease pressure, waterlogging, and soil acidity rather than water supply.',
  },
};

/**
 * Dominant agro-ecological zone for each state and the FCT.
 *
 * Several large states genuinely span two zones. Niger, Kaduna, Borno, and
 * Taraba are the clearest cases. Each is mapped to the zone covering most of
 * its cropped area, and the advisor surfaces this as a caveat rather than
 * pretending state-level resolution is field-level resolution.
 */
export const stateToZone: Record<string, AgroZone> = {
  Borno: 'SAHEL',
  Yobe: 'SAHEL',
  Sokoto: 'SAHEL',
  Katsina: 'SAHEL',
  Jigawa: 'SAHEL',

  Kano: 'SUDAN_SAVANNA',
  Kebbi: 'SUDAN_SAVANNA',
  Zamfara: 'SUDAN_SAVANNA',
  Bauchi: 'SUDAN_SAVANNA',
  Gombe: 'SUDAN_SAVANNA',

  Kaduna: 'NORTHERN_GUINEA',
  Niger: 'NORTHERN_GUINEA',
  Plateau: 'NORTHERN_GUINEA',
  Adamawa: 'NORTHERN_GUINEA',
  Taraba: 'NORTHERN_GUINEA',
  Nasarawa: 'NORTHERN_GUINEA',

  Benue: 'SOUTHERN_GUINEA',
  Kogi: 'SOUTHERN_GUINEA',
  Kwara: 'SOUTHERN_GUINEA',
  'Federal Capital Territory': 'SOUTHERN_GUINEA',

  Oyo: 'DERIVED_SAVANNA',
  Osun: 'DERIVED_SAVANNA',
  Ekiti: 'DERIVED_SAVANNA',
  Enugu: 'DERIVED_SAVANNA',
  Ebonyi: 'DERIVED_SAVANNA',
  Anambra: 'DERIVED_SAVANNA',

  Lagos: 'HUMID_FOREST',
  Ogun: 'HUMID_FOREST',
  Ondo: 'HUMID_FOREST',
  Edo: 'HUMID_FOREST',
  Delta: 'HUMID_FOREST',
  Imo: 'HUMID_FOREST',
  Abia: 'HUMID_FOREST',
  Rivers: 'HUMID_FOREST',
  Bayelsa: 'HUMID_FOREST',
  'Cross River': 'HUMID_FOREST',
  'Akwa Ibom': 'HUMID_FOREST',
};

/** States whose cropped area spans more than one zone, for advisor caveats. */
export const multiZoneStates = new Set(['Niger', 'Kaduna', 'Borno', 'Taraba', 'Kwara', 'Oyo']);

export const nigerianStates = Object.keys(stateToZone).sort();

export const zoneOrder: AgroZone[] = [
  'SAHEL',
  'SUDAN_SAVANNA',
  'NORTHERN_GUINEA',
  'SOUTHERN_GUINEA',
  'DERIVED_SAVANNA',
  'HUMID_FOREST',
];
