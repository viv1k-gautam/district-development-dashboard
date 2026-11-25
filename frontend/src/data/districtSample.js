// Demonstration dataset only. Replace/import verified observations before policy use.
export const sectors = ["Health", "Education", "Agriculture", "Infrastructure", "Economy"];
export const periods = ["2019-21", "2015-16", "2011"];

export const indicators = [
  { key: "institutional_delivery", name: "Institutional delivery", sector: "Health", unit: "%", direction: "higher", source: "NFHS-5 District Factsheet (demo values)" },
  { key: "immunization", name: "Full immunization coverage", sector: "Health", unit: "%", direction: "higher", source: "NFHS-5 District Factsheet (demo values)" },
  { key: "stunting", name: "Child stunting (under 5)", sector: "Health", unit: "%", direction: "lower", source: "NFHS-5 District Factsheet (demo values)" },
  { key: "maternal_anemia", name: "Women with anaemia (15-49)", sector: "Health", unit: "%", direction: "lower", source: "NFHS-5 District Factsheet (demo values)" },
  { key: "literacy", name: "Literacy rate", sector: "Education", unit: "%", direction: "higher", source: "Census of India 2011 (demo values)" },
  { key: "school_enrolment", name: "School enrolment", sector: "Education", unit: "%", direction: "higher", source: "Illustrative project data" },
  { key: "teacher_ratio", name: "Pupil-teacher ratio", sector: "Education", unit: "students/teacher", direction: "lower", source: "Illustrative project data" },
  { key: "irrigated_area", name: "Net irrigated area", sector: "Agriculture", unit: "%", direction: "higher", source: "Illustrative project data" },
  { key: "farmer_coverage", name: "Farmer scheme coverage", sector: "Agriculture", unit: "%", direction: "higher", source: "Illustrative project data" },
  { key: "road_connectivity", name: "Rural road connectivity", sector: "Infrastructure", unit: "%", direction: "higher", source: "Illustrative project data" },
  { key: "tap_water", name: "Households with tap water", sector: "Infrastructure", unit: "%", direction: "higher", source: "Illustrative project data" },
  { key: "electricity", name: "Household electrification", sector: "Infrastructure", unit: "%", direction: "higher", source: "Illustrative project data" },
  { key: "worker_participation", name: "Worker participation", sector: "Economy", unit: "%", direction: "higher", source: "Census of India 2011 (demo values)" },
  { key: "bank_access", name: "Households with banking access", sector: "Economy", unit: "%", direction: "higher", source: "Illustrative project data" },
];

const rows = [
  ["Jaunpur", "Uttar Pradesh", "DEMO-UP-001", [78.2, 62.5, 32.7, 54.1, 73.4, 86, 32, 48, 68, 71, 82, 93, 58.4, 79]],
  ["Varanasi", "Uttar Pradesh", "DEMO-UP-002", [86.4, 68.3, 28.1, 49.6, 75.6, 91, 29, 54, 82, 77, 76, 96, 60.2, 86]],
  ["Lucknow", "Uttar Pradesh", "DEMO-UP-003", [89.1, 72.4, 25.2, 48.3, 79.8, 94, 26, 42, 75, 89, 84, 98, 62.8, 92]],
  ["Gorakhpur", "Uttar Pradesh", "DEMO-UP-004", [80.4, 64.2, 31.4, 53.7, 69.2, 83, 35, 51, 71, 70, 73, 91, 55.1, 77]],
  ["Prayagraj", "Uttar Pradesh", "DEMO-UP-005", [82.1, 66.1, 29.8, 56.3, 72.4, 88, 31, 47, 74, 74, 79, 94, 59.6, 83]],
  ["Agra", "Uttar Pradesh", "DEMO-UP-006", [84.7, 69.1, 27.5, 51.4, 71.8, 89, 30, 39, 65, 86, 79, 97, 63.3, 90]],
];
const base = rows.map(([name, state, code, values]) => ({ name, state, code, values: Object.fromEntries(indicators.map((i, n) => [i.key, values[n]])) }));

export const districts = base.map((d, index) => ({
  ...d,
  population: [4.41, 3.69, 4.59, 44.4, 5.95, 4.42][index],
  area: [4038, 1535, 2528, 3483, 5482, 4041][index],
  // Demonstration trend points; clearly marked forecast in UI.
  history: [0.86, 0.94, 1].map((factor) => Object.fromEntries(indicators.map((i) => [i.key, +(d.values[i.key] * factor).toFixed(1)]))),
}));

export function normalize(value, indicator) {
  const values = districts.map((d) => d.values[indicator.key]);
  const min = Math.min(...values), max = Math.max(...values);
  if (max === min) return 50;
  const score = ((value - min) / (max - min)) * 100;
  return Math.round(indicator.direction === "lower" ? 100 - score : score);
}
export function sectorScore(district, sector) {
  const list = indicators.filter((i) => i.sector === sector);
  return list.reduce((sum, i) => sum + normalize(district.values[i.key], i), 0) / list.length;
}
export function compositeScore(district) {
  return sectors.reduce((sum, s) => sum + sectorScore(district, s), 0) / sectors.length;
}
