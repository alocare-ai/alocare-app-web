/** Key figures from Alocare AI strategic presentation (2026). */

export const PLATFORM_PILLARS = {
  en: [
    "Predictive AI",
    "Longitudinal Tracking",
    "Health Twin",
    "B2B Wellness",
  ],
  id: [
    "AI Prediktif",
    "Pelacakan Longitudinal",
    "Health Twin",
    "Wellness B2B",
  ],
} as const;

/** AI in Healthcare global market ($B) — slide 3. */
export const AI_HEALTHCARE_MARKET_GROWTH = [
  { year: 2024, value: 28 },
  { year: 2025, value: 37.7 },
  { year: 2026, value: 52 },
  { year: 2027, value: 72 },
  { year: 2028, value: 98 },
  { year: 2029, value: 132 },
  { year: 2030, value: 175 },
  { year: 2031, value: 230 },
  { year: 2032, value: 310 },
  { year: 2033, value: 476 },
];

/** Industry impact benchmarks (%) — slide 10. */
export const IMPACT_BENCHMARKS = [
  {
    key: "readmission",
    value: 18,
    labelEn: "Readmission reduction",
    labelId: "Penurunan readmission",
  },
  {
    key: "diagnostic",
    value: 90,
    labelEn: "AI diagnostic precision",
    labelId: "Presisi diagnostik AI",
  },
  {
    key: "chronic",
    value: 20,
    labelEn: "Chronic outcome gain",
    labelId: "Peningkatan penyakit kronis",
  },
  {
    key: "admin",
    value: 50,
    labelEn: "Admin time saved",
    labelId: "Waktu admin terhemat",
  },
] as const;

export const MARKET_HIGHLIGHTS = {
  en: [
    { label: "Global AI healthcare (2025)", value: "$37.7B" },
    { label: "Market CAGR", value: "37.3%" },
    { label: "SE Asia digital health", value: "$17B" },
  ],
  id: [
    { label: "AI kesehatan global (2025)", value: "$37,7B" },
    { label: "CAGR pasar", value: "37,3%" },
    { label: "Kesehatan digital Asia Tenggara", value: "$17B" },
  ],
} as const;
