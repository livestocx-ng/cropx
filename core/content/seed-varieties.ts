import { CropType, SeedVariety } from '@/core/types';

/**
 * PROVENANCE — read before trusting any number in this file.
 *
 * Variety names, releasing institutes, maturity classes, and named traits
 * (striga resistance, rosette resistance, mosaic tolerance, and so on) refer to
 * real varieties released in Nigeria and West Africa by IAR Zaria, IITA,
 * NCRI, NRCRI, AATF, and their partners.
 *
 * The `droughtToleranceScore` and `heatToleranceScore` values are NOT published
 * trial figures. They are composite estimates written for this demo so the
 * ranking has something defensible to sort on. Yield ranges are indicative
 * on farm figures under good management, not trial station maxima.
 *
 * Before this powers real planting advice, these fields must be replaced with
 * measured data from multi location trials.
 */

export const seedVarieties: SeedVariety[] = [
  // ---------------------------------------------------------------- MAIZE
  {
    id: 'maize-sammaz-16',
    name: 'SAMMAZ 16',
    crop: 'MAIZE',
    droughtToleranceScore: 88,
    heatToleranceScore: 82,
    maturityDays: 80,
    expectedYieldTonsPerHa: [2.5, 4.5],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'IAR Zaria with IITA',
    traits: ['Extra early maturing', 'Drought escape', 'Striga tolerant'],
    notes:
      'An extra early open pollinated variety bred to complete its cycle inside a short, unreliable rainy season. The main drought strategy here is escape rather than endurance: it finishes before the rains do.',
  },
  {
    id: 'maize-sammaz-15',
    name: 'SAMMAZ 15',
    crop: 'MAIZE',
    droughtToleranceScore: 78,
    heatToleranceScore: 76,
    maturityDays: 95,
    expectedYieldTonsPerHa: [3.0, 5.0],
    suitableSoils: ['SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IAR Zaria with IITA',
    traits: ['Early maturing', 'Striga resistant', 'Downy mildew tolerant'],
    notes:
      'A widely grown early variety for the northern cereal belt. Its striga resistance matters as much as its drought rating on infested land, where the weed can cost more yield than a dry spell.',
  },
  {
    id: 'maize-tze-w-dt-str',
    name: 'TZE-W DT STR C4',
    crop: 'MAIZE',
    droughtToleranceScore: 90,
    heatToleranceScore: 84,
    maturityDays: 90,
    expectedYieldTonsPerHa: [3.2, 5.5],
    suitableSoils: ['SANDY_LOAM', 'LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IITA',
    traits: ['Drought tolerant', 'Striga resistant', 'White grain'],
    notes:
      'Selected over four cycles explicitly for performance under managed drought stress. Holds grain filling through mid season dry spells better than varieties bred only for escape.',
  },
  {
    id: 'maize-sammaz-52',
    name: 'SAMMAZ 52',
    crop: 'MAIZE',
    droughtToleranceScore: 72,
    heatToleranceScore: 74,
    maturityDays: 105,
    expectedYieldTonsPerHa: [4.0, 6.5],
    suitableSoils: ['LOAM', 'CLAY_LOAM'],
    agroZones: ['NORTHERN_GUINEA', 'SOUTHERN_GUINEA'],
    breeder: 'IAR Zaria',
    traits: ['Quality protein maize', 'Medium maturing', 'High yielding'],
    notes:
      'A quality protein variety with elevated lysine and tryptophan. Worth choosing where household nutrition matters as much as tonnage, given a season long enough to carry it.',
  },
  {
    id: 'maize-oba-super-9',
    name: 'Oba Super 9',
    crop: 'MAIZE',
    droughtToleranceScore: 65,
    heatToleranceScore: 68,
    maturityDays: 110,
    expectedYieldTonsPerHa: [5.0, 8.0],
    suitableSoils: ['LOAM', 'CLAY_LOAM', 'ALLUVIAL'],
    agroZones: ['NORTHERN_GUINEA', 'SOUTHERN_GUINEA', 'DERIVED_SAVANNA'],
    breeder: 'Premier Seed Nigeria',
    traits: ['Hybrid', 'High yield potential', 'Good husk cover'],
    notes:
      'A high ceiling hybrid that rewards fertiliser and reliable rain, and punishes both their absence. Seed must be bought fresh each season rather than saved.',
  },
  {
    id: 'maize-evdt-w-str',
    name: 'EVDT-W 2008 STR',
    crop: 'MAIZE',
    droughtToleranceScore: 85,
    heatToleranceScore: 80,
    maturityDays: 85,
    expectedYieldTonsPerHa: [2.8, 4.8],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'IITA',
    traits: ['Extra early', 'Drought tolerant', 'Striga resistant'],
    notes:
      'An extra early drought tolerant population combining escape with genuine stress tolerance. A common choice for late planting when the rains arrive weeks behind schedule.',
  },

  // -------------------------------------------------------------- SORGHUM
  {
    id: 'sorghum-samsorg-45',
    name: 'SAMSORG 45',
    crop: 'SORGHUM',
    droughtToleranceScore: 92,
    heatToleranceScore: 90,
    maturityDays: 110,
    expectedYieldTonsPerHa: [2.0, 3.5],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'IAR Zaria',
    traits: ['Drought tolerant', 'Striga tolerant', 'Good grain quality'],
    notes:
      'Sorghum is structurally better suited to the dry north than maize, and this is one of the more dependable improved releases. It will hold a harvest in years when maize fails outright.',
  },
  {
    id: 'sorghum-samsorg-46',
    name: 'SAMSORG 46',
    crop: 'SORGHUM',
    droughtToleranceScore: 90,
    heatToleranceScore: 89,
    maturityDays: 115,
    expectedYieldTonsPerHa: [2.2, 3.8],
    suitableSoils: ['SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IAR Zaria',
    traits: ['Drought tolerant', 'Dual purpose grain and fodder'],
    notes:
      'Produces usable stover alongside grain, which matters on mixed crop and livestock farms where dry season feed is as scarce as food.',
  },
  {
    id: 'sorghum-samsorg-17',
    name: 'SAMSORG 17',
    crop: 'SORGHUM',
    droughtToleranceScore: 84,
    heatToleranceScore: 85,
    maturityDays: 130,
    expectedYieldTonsPerHa: [2.0, 3.2],
    suitableSoils: ['LOAM', 'CLAY_LOAM', 'CLAY'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IAR Zaria',
    traits: ['Medium maturing', 'Kaura type', 'Preferred grain colour'],
    notes:
      'A Kaura type sorghum whose grain commands a market premium in northern Nigeria. Needs a longer season than the extra early releases.',
  },
  {
    id: 'sorghum-samsorg-40',
    name: 'SAMSORG 40',
    crop: 'SORGHUM',
    droughtToleranceScore: 87,
    heatToleranceScore: 86,
    maturityDays: 105,
    expectedYieldTonsPerHa: [1.8, 3.0],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'IAR Zaria',
    traits: ['Early maturing', 'Striga resistant'],
    notes:
      'An early release for the driest cropping margins, where the season is too short for medium maturing types in most years.',
  },

  // --------------------------------------------------------------- MILLET
  {
    id: 'millet-sosat-c88',
    name: 'SOSAT-C88',
    crop: 'MILLET',
    droughtToleranceScore: 95,
    heatToleranceScore: 93,
    maturityDays: 85,
    expectedYieldTonsPerHa: [1.5, 2.5],
    suitableSoils: ['SANDY', 'SANDY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'ICRISAT with LCRI Maiduguri',
    traits: ['Extreme drought tolerance', 'Downy mildew tolerant', 'Sandy soil adapted'],
    notes:
      'Pearl millet is the most drought hardy cereal available to Sahelian farmers, and this variety is among the most widely adopted. It yields on sandy soils where nothing else will.',
  },
  {
    id: 'millet-super-sosat',
    name: 'SUPER SOSAT',
    crop: 'MILLET',
    droughtToleranceScore: 94,
    heatToleranceScore: 92,
    maturityDays: 90,
    expectedYieldTonsPerHa: [1.8, 2.8],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'LCRI Maiduguri',
    traits: ['Drought tolerant', 'Improved head length', 'Higher yield than SOSAT-C88'],
    notes:
      'An improved selection out of the SOSAT-C88 background, trading a few days of extra duration for a meaningful yield gain.',
  },
  {
    id: 'millet-lcic-9702',
    name: 'LCIC 9702',
    crop: 'MILLET',
    droughtToleranceScore: 91,
    heatToleranceScore: 90,
    maturityDays: 95,
    expectedYieldTonsPerHa: [1.6, 2.6],
    suitableSoils: ['SANDY', 'SANDY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'LCRI Maiduguri',
    traits: ['Drought tolerant', 'Striga tolerant', 'Compact head'],
    notes:
      'A dependable Sahelian millet with useful striga tolerance on continuously cropped land.',
  },

  // ---------------------------------------------------------------- RICE
  {
    id: 'rice-faro-44',
    name: 'FARO 44 (SIPI)',
    crop: 'RICE',
    droughtToleranceScore: 62,
    heatToleranceScore: 70,
    maturityDays: 115,
    expectedYieldTonsPerHa: [3.5, 6.0],
    suitableSoils: ['CLAY_LOAM', 'CLAY', 'ALLUVIAL'],
    agroZones: ['NORTHERN_GUINEA', 'SOUTHERN_GUINEA', 'DERIVED_SAVANNA'],
    breeder: 'NCRI Badeggi',
    traits: ['Lowland', 'Widely adopted', 'Good milling quality'],
    notes:
      'The most widely grown improved rice in Nigeria. It needs assured water in lowland or irrigated conditions, so drought tolerance is close to irrelevant to the decision.',
  },
  {
    id: 'rice-faro-66',
    name: 'FARO 66',
    crop: 'RICE',
    droughtToleranceScore: 75,
    heatToleranceScore: 74,
    maturityDays: 105,
    expectedYieldTonsPerHa: [3.5, 5.5],
    suitableSoils: ['SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['NORTHERN_GUINEA', 'SOUTHERN_GUINEA', 'DERIVED_SAVANNA'],
    breeder: 'AfricaRice with NCRI Badeggi',
    traits: ['Rainfed lowland', 'Drought tolerant', 'Early maturing'],
    notes:
      'Bred for rainfed lowlands where the water table falls away late in the season. A genuine option where irrigation is not available.',
  },
  {
    id: 'rice-faro-67',
    name: 'FARO 67',
    crop: 'RICE',
    droughtToleranceScore: 78,
    heatToleranceScore: 76,
    maturityDays: 100,
    expectedYieldTonsPerHa: [3.0, 5.0],
    suitableSoils: ['SANDY_LOAM', 'LOAM'],
    agroZones: ['NORTHERN_GUINEA', 'SOUTHERN_GUINEA'],
    breeder: 'AfricaRice with NCRI Badeggi',
    traits: ['Upland', 'Drought tolerant', 'Blast resistant'],
    notes:
      'An upland type for rainfed cultivation without standing water, with blast resistance that matters in humid conditions.',
  },

  // -------------------------------------------------------------- COWPEA
  {
    id: 'cowpea-sampea-14',
    name: 'SAMPEA 14',
    crop: 'COWPEA',
    droughtToleranceScore: 86,
    heatToleranceScore: 84,
    maturityDays: 75,
    expectedYieldTonsPerHa: [1.2, 2.0],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IAR Zaria with IITA',
    traits: ['Early maturing', 'Drought tolerant', 'Nitrogen fixing'],
    notes:
      'Cowpea fixes its own nitrogen, so it improves the soil for whatever follows. Short duration makes it a reliable second crop or a hedge against a failing cereal.',
  },
  {
    id: 'cowpea-sampea-20t',
    name: 'SAMPEA 20-T',
    crop: 'COWPEA',
    droughtToleranceScore: 83,
    heatToleranceScore: 82,
    maturityDays: 80,
    expectedYieldTonsPerHa: [1.5, 2.5],
    suitableSoils: ['SANDY_LOAM', 'LOAM'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA', 'SOUTHERN_GUINEA'],
    breeder: 'IAR Zaria with AATF',
    traits: ['Pod borer resistant', 'Reduced insecticide need', 'Nitrogen fixing'],
    notes:
      'Nigeria\'s pod borer resistant cowpea, engineered against Maruca vitrata. It cuts insecticide sprays sharply. This is a genetically modified variety, which some buyers and export markets restrict.',
  },
  {
    id: 'cowpea-it97k-499-35',
    name: 'IT97K-499-35',
    crop: 'COWPEA',
    droughtToleranceScore: 88,
    heatToleranceScore: 85,
    maturityDays: 70,
    expectedYieldTonsPerHa: [1.0, 1.8],
    suitableSoils: ['SANDY', 'SANDY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'IITA',
    traits: ['Extra early', 'Striga resistant', 'Drought tolerant'],
    notes:
      'An extra early line with strong striga resistance, suited to the shortest seasons and the most degraded land.',
  },

  // ------------------------------------------------------------ GROUNDNUT
  {
    id: 'groundnut-samnut-26',
    name: 'SAMNUT 26',
    crop: 'GROUNDNUT',
    droughtToleranceScore: 84,
    heatToleranceScore: 82,
    maturityDays: 95,
    expectedYieldTonsPerHa: [1.8, 2.8],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IAR Zaria with ICRISAT',
    traits: ['Rosette resistant', 'Drought tolerant', 'High oil content'],
    notes:
      'Groundnut rosette virus can take an entire crop. Resistance is the single most valuable trait in this species, ahead of drought rating.',
  },
  {
    id: 'groundnut-samnut-24',
    name: 'SAMNUT 24',
    crop: 'GROUNDNUT',
    droughtToleranceScore: 80,
    heatToleranceScore: 79,
    maturityDays: 100,
    expectedYieldTonsPerHa: [1.6, 2.5],
    suitableSoils: ['SANDY_LOAM', 'LOAM'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'IAR Zaria',
    traits: ['Rosette resistant', 'Good shelling percentage'],
    notes:
      'A dependable rosette resistant release with strong shelling outturn, which is what actually determines the value a trader will pay.',
  },
  {
    id: 'groundnut-samnut-25',
    name: 'SAMNUT 25',
    crop: 'GROUNDNUT',
    droughtToleranceScore: 86,
    heatToleranceScore: 84,
    maturityDays: 90,
    expectedYieldTonsPerHa: [1.5, 2.4],
    suitableSoils: ['SANDY', 'SANDY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'IAR Zaria with ICRISAT',
    traits: ['Early maturing', 'Rosette resistant', 'Drought escape'],
    notes:
      'The earliest of the improved SAMNUT series, bred for the dry margins where a hundred day crop is a gamble.',
  },

  // -------------------------------------------------------------- CASSAVA
  {
    id: 'cassava-tme-419',
    name: 'TME 419',
    crop: 'CASSAVA',
    droughtToleranceScore: 82,
    heatToleranceScore: 80,
    maturityDays: 365,
    expectedYieldTonsPerHa: [20, 35],
    suitableSoils: ['SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['SOUTHERN_GUINEA', 'DERIVED_SAVANNA', 'HUMID_FOREST'],
    breeder: 'IITA',
    traits: ['High dry matter', 'Mosaic tolerant', 'Industry preferred'],
    notes:
      'The workhorse of Nigerian cassava processing, favoured for high dry matter and strong garri outturn. Cassava tolerates drought by simply waiting, which is why it anchors food security in a bad year.',
  },
  {
    id: 'cassava-tms-070337',
    name: 'TMS 070337 (Game Changer)',
    crop: 'CASSAVA',
    droughtToleranceScore: 85,
    heatToleranceScore: 82,
    maturityDays: 330,
    expectedYieldTonsPerHa: [25, 45],
    suitableSoils: ['SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['SOUTHERN_GUINEA', 'DERIVED_SAVANNA', 'HUMID_FOREST'],
    breeder: 'IITA with NRCRI Umudike',
    traits: ['Very high yielding', 'Mosaic resistant', 'Early bulking'],
    notes:
      'One of the highest yielding releases available, with early bulking that lets a farmer harvest sooner if cash or food is needed.',
  },
  {
    id: 'cassava-tms-980505',
    name: 'TMS 98/0505',
    crop: 'CASSAVA',
    droughtToleranceScore: 80,
    heatToleranceScore: 79,
    maturityDays: 365,
    expectedYieldTonsPerHa: [22, 38],
    suitableSoils: ['SANDY_LOAM', 'LOAM'],
    agroZones: ['DERIVED_SAVANNA', 'HUMID_FOREST', 'SOUTHERN_GUINEA'],
    breeder: 'IITA',
    traits: ['High starch', 'Mosaic resistant', 'Good ground cover'],
    notes:
      'A high starch variety favoured by industrial starch buyers, with canopy architecture that suppresses weeds well.',
  },
  {
    id: 'cassava-tms-011368',
    name: 'TMS 01/1368',
    crop: 'CASSAVA',
    droughtToleranceScore: 83,
    heatToleranceScore: 81,
    maturityDays: 340,
    expectedYieldTonsPerHa: [20, 36],
    suitableSoils: ['SANDY_LOAM', 'LOAM', 'CLAY_LOAM'],
    agroZones: ['SOUTHERN_GUINEA', 'DERIVED_SAVANNA', 'HUMID_FOREST'],
    breeder: 'IITA with NRCRI Umudike',
    traits: ['Good pounding quality', 'Mosaic tolerant', 'Drought tolerant'],
    notes:
      'Selected partly for eating quality in fufu, a reminder that a variety no household wants to eat is not a solution regardless of its yield.',
  },

  // --------------------------------------------------------------- SESAME
  {
    id: 'sesame-ncriben-01m',
    name: 'NCRIBEN 01M',
    crop: 'SESAME',
    droughtToleranceScore: 89,
    heatToleranceScore: 88,
    maturityDays: 95,
    expectedYieldTonsPerHa: [0.8, 1.4],
    suitableSoils: ['SANDY', 'SANDY_LOAM', 'LOAM'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA'],
    breeder: 'NCRI Badeggi',
    traits: ['Drought tolerant', 'High oil content', 'Export grade'],
    notes:
      'Sesame is one of the few high-value export crops that genuinely thrives on marginal, dry land, which makes it a strong income option where cereals struggle.',
  },
  {
    id: 'sesame-ncriben-03l',
    name: 'NCRIBEN 03L',
    crop: 'SESAME',
    droughtToleranceScore: 86,
    heatToleranceScore: 86,
    maturityDays: 105,
    expectedYieldTonsPerHa: [0.9, 1.6],
    suitableSoils: ['SANDY_LOAM', 'LOAM'],
    agroZones: ['SUDAN_SAVANNA', 'NORTHERN_GUINEA', 'SOUTHERN_GUINEA'],
    breeder: 'NCRI Badeggi',
    traits: ['Non-shattering', 'High yielding', 'White seed coat'],
    notes:
      'Reduced capsule shattering cuts harvest losses substantially, and the white seed coat meets export buyer preferences.',
  },
  {
    id: 'sesame-ncriben-04e',
    name: 'NCRIBEN 04E',
    crop: 'SESAME',
    droughtToleranceScore: 90,
    heatToleranceScore: 89,
    maturityDays: 85,
    expectedYieldTonsPerHa: [0.7, 1.2],
    suitableSoils: ['SANDY', 'SANDY_LOAM'],
    agroZones: ['SAHEL', 'SUDAN_SAVANNA'],
    breeder: 'NCRI Badeggi',
    traits: ['Early maturing', 'Drought tolerant'],
    notes:
      'The earliest sesame release, usable as a late-planted catch crop when the main season has already been lost.',
  },
];

export const cropLabels: Record<CropType, string> = {
  MAIZE: 'Maize',
  SORGHUM: 'Sorghum',
  MILLET: 'Pearl millet',
  RICE: 'Rice',
  COWPEA: 'Cowpea',
  GROUNDNUT: 'Groundnut',
  CASSAVA: 'Cassava',
  SESAME: 'Sesame',
};

export const soilLabels: Record<string, string> = {
  SANDY: 'Sandy',
  SANDY_LOAM: 'Sandy loam',
  LOAM: 'Loam',
  CLAY_LOAM: 'Clay loam',
  CLAY: 'Clay',
  ALLUVIAL: 'Alluvial / fadama',
};

export const cropsWithVarieties = Object.keys(cropLabels).filter((crop) =>
  seedVarieties.some((variety) => variety.crop === crop)
) as CropType[];
