import type { Locale } from "@/lib/i18n";
import { isPlaceholderClinicalSummary } from "@/lib/clinical-summary";

const LAB_PATTERNS: { label: string; re: RegExp; unit: string }[] = [
  { label: "Triglycerides", re: /Triglycerides?\s*([\d.]+)/i, unit: "mg/dL" },
  { label: "Total cholesterol", re: /Total\s+Cholesterol\s*([\d.]+)/i, unit: "mg/dL" },
  { label: "HDL cholesterol", re: /HDL\s+Cholesterol\s*([\d.]+)/i, unit: "mg/dL" },
  { label: "LDL cholesterol", re: /LDL\s+Cholesterol\s*([\d.]+)/i, unit: "mg/dL" },
];

const STRESS_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "Stress resilience score", re: /Stress\s+Resilience\s+Assessment\s*(\d{1,3})/i },
  { label: "Stress assessment score", re: /Stress\s+Assessment\s*(\d{1,3})/i },
];

function extractPatient(document: string): string {
  const name = document.match(/Name[：:]\s*([A-Za-z][A-Za-z\s]{0,40})/)?.[1]?.trim();
  return name ?? "";
}

function isLabReport(document: string): boolean {
  if (/chemistry\s+panel|cholesterol|triglycerides|ldl|hdl/i.test(document)) {
    return true;
  }
  return LAB_PATTERNS.filter((p) => p.re.test(document)).length >= 2;
}

function buildLabNarrative(document: string, locale: Locale): string {
  const metrics: string[] = [];
  for (const { label, re, unit } of LAB_PATTERNS) {
    const m = document.match(re);
    if (m) metrics.push(`${label} ${m[1]} ${unit}`);
  }
  const patient = extractPatient(document) || (locale === "id" ? "pasien" : "the patient");
  const metricText =
    metrics.length > 0
      ? metrics.join("; ")
      : locale === "id"
        ? "beberapa parameter kimia dari dokumen"
        : "several chemistry values from the document";

  if (locale === "id") {
    return (
      `Panel kimia darah untuk ${patient} mencatat: ${metricText}. ` +
      `Nilai perlu ditafsirkan dengan riwayat medis dan faktor risiko.\n\n` +
      `Disarankan diskusi hasil dengan pasien dan rencana tindak lanjut sesuai pedoman klinis.`
    );
  }
  return (
    `Chemistry panel for ${patient} records: ${metricText}. ` +
    `Values should be interpreted with medical history and risk factors.\n\n` +
    `Discuss results with the patient and plan appropriate follow-up.`
  );
}

function buildStressNarrative(document: string, locale: Locale): string {
  const metrics: string[] = [];
  for (const { label, re } of STRESS_PATTERNS) {
    const m = document.match(re);
    if (m) metrics.push(`${label} ${m[1]}`);
  }
  const patient = extractPatient(document) || (locale === "id" ? "pasien" : "the patient");
  const metricText =
    metrics.length > 0
      ? metrics.join("; ")
      : locale === "id"
        ? "beberapa indikator stres dari dokumen"
        : "multiple stress indicators from the document";

  if (locale === "id") {
    return (
      `Laporan ketahanan stres untuk ${patient} menunjukkan: ${metricText}. ` +
      `Skor perlu ditafsirkan dengan konteks klinis.\n\n` +
      `Disarankan evaluasi lanjutan dengan tenaga kesehatan bila gejala berkelanjutan.`
    );
  }
  return (
    `Stress resilience report for ${patient} shows: ${metricText}. ` +
    `Scores should be interpreted with clinical context.\n\n` +
    `Follow-up with a clinician is recommended if stress symptoms persist.`
  );
}

/** Rule-based summary when the analyze stream returns a placeholder. */
export function buildClinicalNarrativeFromDocument(
  document: string,
  locale: Locale,
): string {
  if (isLabReport(document)) {
    return buildLabNarrative(document, locale);
  }
  if (STRESS_PATTERNS.some((p) => p.re.test(document))) {
    return buildStressNarrative(document, locale);
  }
  const patient = extractPatient(document) || (locale === "id" ? "pasien" : "the patient");
  const excerpt = document.replace(/\s+/g, " ").slice(0, 400);
  if (locale === "id") {
    return `Ringkasan dokumen untuk ${patient}. Cuplikan: ${excerpt}…`;
  }
  return `Document summary for ${patient}. Excerpt: ${excerpt}…`;
}

/** Short clinician-oriented summary — distinct from clinical narrative. */
export function buildDoctorSummaryFromDocument(
  document: string,
  locale: Locale,
): string {
  const metrics: string[] = [];
  for (const { label, re, unit } of LAB_PATTERNS) {
    const m = document.match(re);
    if (m) metrics.push(`${label} ${m[1]} ${unit}`);
  }
  const patient =
    extractPatient(document) || (locale === "id" ? "pasien" : "the patient");

  if (isLabReport(document) && metrics.length > 0) {
    const list = metrics.slice(0, 6).join(", ");
    if (locale === "id") {
      return (
        `${patient} menjalani panel kimia. Temuan utama: ${list}. ` +
        "Risiko kardiovaskular perlu ditinjau bersama riwayat, gejala, dan target terapi."
      );
    }
    return (
      `${patient} underwent a chemistry panel. Key values: ${list}. ` +
      "Cardiovascular risk should be reviewed with history, symptoms, and treatment goals."
    );
  }

  if (STRESS_PATTERNS.some((p) => p.re.test(document))) {
    return buildStressNarrative(document, locale).split("\n\n")[0] ?? "";
  }

  const excerpt = document.replace(/\s+/g, " ").slice(0, 320);
  if (locale === "id") {
    return (
      `Ringkasan singkat untuk ${patient}: ${excerpt}… ` +
      "Tinjau dokumen lengkap untuk interpretasi klinis."
    );
  }
  return (
    `Brief summary for ${patient}: ${excerpt}… ` +
    "Review the full document for clinical interpretation."
  );
}

export function resolveSummaryAfterStream(
  streamSummary: string,
  document: string,
  locale: Locale,
): string {
  const trimmed = streamSummary.trim();
  if (trimmed && !isPlaceholderClinicalSummary(trimmed)) {
    return trimmed;
  }
  return buildClinicalNarrativeFromDocument(document, locale);
}
