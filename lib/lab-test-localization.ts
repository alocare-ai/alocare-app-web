/** Client-side lab test name localization (mirrors alocare-ai-engine). */

import type { Locale } from "@/hooks/use-locale";

const INDONESIAN_TO_ENGLISH: Record<string, string> = {
  "asam urat": "Uric Acid",
  "asam urat darah": "Uric Acid",
  "asam urat serum": "Uric Acid",
  basofil: "Basophils",
  "basofil absolut": "Absolute Basophils",
  "bilirubin total": "Total Bilirubin",
  "cholesterol total": "Total Cholesterol",
  creatinin: "Creatinine",
  creatinine: "Creatinine",
  egfr: "eGFR",
  eosinofil: "Eosinophils",
  "eosinofil absolut": "Absolute Eosinophils",
  eritrosit: "Red Blood Cell",
  glukosa: "Glucose",
  "glukosa darah": "Blood Glucose",
  "glukosa darah puasa": "Fasting Blood Glucose",
  "glukosa puasa": "Fasting Glucose",
  "glukosa sewaktu": "Random Blood Glucose",
  hba1c: "HbA1c",
  hematokrit: "Hematocrit",
  hemoglobin: "Hemoglobin",
  "hitung jenis": "Differential Count",
  "kadar gula darah": "Blood Glucose",
  kolesterol: "Total Cholesterol",
  "kolesterol hdl": "HDL Cholesterol",
  "kolesterol ldl": "LDL Cholesterol",
  "kolesterol total": "Total Cholesterol",
  kreatinin: "Creatinine",
  leukosit: "White Blood Cell",
  limfosit: "Lymphocytes",
  "limfosit absolut": "Absolute Lymphocytes",
  mcv: "MCV",
  mch: "MCH",
  mchc: "MCHC",
  monosit: "Monocytes",
  "monosit absolut": "Absolute Monocytes",
  natrium: "Sodium",
  neutrofil: "Neutrophils",
  "neutrofil absolut": "Absolute Neutrophils",
  "nitrogen urea darah": "Blood Urea Nitrogen",
  "packed cell volume": "Packed Cell Volume",
  pcv: "Packed Cell Volume",
  "pemeriksaan darah lengkap": "Complete Blood Count",
  platelet: "Platelet",
  potasium: "Potassium",
  "protein total": "Total Protein",
  sgot: "AST",
  "sgot (ast)": "AST",
  sgpt: "ALT",
  "sgpt (alt)": "ALT",
  trombosit: "Platelet",
  trigliserida: "Triglycerides",
  trigliseride: "Triglycerides",
  urea: "Urea",
  "urea darah": "Blood Urea",
  wbc: "White Blood Cell",
};

const ENGLISH_TO_INDONESIAN: Record<string, string> = {
  "absolute basophils": "Basofil Absolut",
  "absolute eosinophils": "Eosinofil Absolut",
  "absolute lymphocytes": "Limfosit Absolut",
  "absolute monocytes": "Monosit Absolut",
  "absolute neutrophils": "Neutrofil Absolut",
  alt: "SGPT (ALT)",
  ast: "SGOT (AST)",
  basophils: "Basofil",
  "blood glucose": "Glukosa Darah",
  "blood urea": "Urea Darah",
  "blood urea nitrogen": "Nitrogen Urea Darah",
  "complete blood count": "Pemeriksaan Darah Lengkap",
  creatinine: "Kreatinin",
  "differential count": "Hitung Jenis",
  eosinophils: "Eosinofil",
  "fasting blood glucose": "Glukosa Darah Puasa",
  "fasting glucose": "Glukosa Puasa",
  glucose: "Glukosa",
  hba1c: "HbA1c",
  "hdl cholesterol": "Kolesterol HDL",
  hematocrit: "Hematokrit",
  hemoglobin: "Hemoglobin",
  "ldl cholesterol": "Kolesterol LDL",
  lymphocytes: "Limfosit",
  monocytes: "Monosit",
  neutrophils: "Neutrofil",
  "packed cell volume": "Hematokrit",
  platelet: "Trombosit",
  potassium: "Kalium",
  "random blood glucose": "Glukosa Sewaktu",
  "red blood cell": "Eritrosit",
  sodium: "Natrium",
  "total bilirubin": "Bilirubin Total",
  "total cholesterol": "Kolesterol Total",
  "total protein": "Protein Total",
  triglycerides: "Trigliserida",
  "uric acid": "Asam Urat",
  urea: "Urea",
  "white blood cell": "Leukosit",
};

const CATEGORY_ID_TO_EN: Record<string, string> = {
  hematologi: "Hematology",
  "fungsi ginjal": "Kidney Function",
  "fungsi hati": "Liver Function",
  "fungsi pankreas": "Pancreatic Function",
  elektrolit: "Electrolytes",
  "glukosa darah": "Blood Glucose",
  laboratorium: "Laboratory",
  diabetes: "Diabetes",
};

const CATEGORY_EN_TO_ID: Record<string, string> = {
  hematology: "Hematologi",
  "kidney function": "Fungsi Ginjal",
  "liver function": "Fungsi Hati",
  "pancreatic function": "Fungsi Pankreas",
  electrolytes: "Elektrolit",
  "blood glucose": "Glukosa Darah",
  laboratory: "Laboratorium",
  diabetes: "Diabetes",
};

function normalizeKey(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function translateFromMap(
  name: string,
  map: Record<string, string>,
  sortedKeys: string[],
): string {
  const key = normalizeKey(name);
  if (map[key]) return map[key];
  for (const sourceKey of sortedKeys) {
    if (key.includes(sourceKey)) return map[sourceKey];
  }
  return name.trim();
}

const ID_KEYS_DESC = Object.keys(INDONESIAN_TO_ENGLISH).sort(
  (a, b) => b.length - a.length,
);
const EN_KEYS_DESC = Object.keys(ENGLISH_TO_INDONESIAN).sort(
  (a, b) => b.length - a.length,
);

export function translateTestName(name: string, locale: Locale): string {
  if (!name?.trim()) return name;
  if (locale === "en") {
    return translateFromMap(name, INDONESIAN_TO_ENGLISH, ID_KEYS_DESC);
  }
  if (locale === "id") {
    return translateFromMap(name, ENGLISH_TO_INDONESIAN, EN_KEYS_DESC);
  }
  return name.trim();
}

export function translateCategoryName(category: string, locale: Locale): string {
  if (!category?.trim()) return category;
  const key = normalizeKey(category);
  if (locale === "en") {
    return CATEGORY_ID_TO_EN[key] ?? category;
  }
  if (locale === "id") {
    return CATEGORY_EN_TO_ID[key] ?? category;
  }
  return category;
}

const CLINICAL_PHRASE_ID_TO_EN: [RegExp, string][] = [
  [/\bdalam batas normal\b/gi, "within normal limits"],
  [/\bdalam rentang referensi\b/gi, "within reference range"],
  [/\bkorelasi klinis disarankan\b/gi, "clinical correlation recommended"],
  [/\binterpretasikan dengan konteks klinis\b/gi, "interpret with clinical context"],
  [/\bHasil laboratorium sebagian besar dalam batas normal\b/gi, "Laboratory results are largely within normal range"],
  [/\bBeberapa temuan abnormal memerlukan korelasi klinis\b/gi, "Some abnormal findings require clinical correlation"],
  [/\bTinjau temuan yang diekstrak dan korelasikan dengan presentasi klinis\b/gi, "Review extracted findings and correlate with clinical presentation"],
  [/\bDiskusikan hasil dengan dokter Anda untuk panduan yang personal\b/gi, "Discuss results with your doctor for personalised guidance"],
];

export function localizeClinicalPhrase(text: string, locale: Locale): string {
  if (!text?.trim() || locale !== "en") return text;
  let out = text;
  for (const [pattern, replacement] of CLINICAL_PHRASE_ID_TO_EN) {
    out = out.replace(pattern, replacement);
  }
  return out.replace(/\brendah\b/gi, "low").replace(/\btinggi\b/gi, "high");
}
