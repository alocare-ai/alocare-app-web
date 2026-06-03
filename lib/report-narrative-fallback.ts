import type { Locale } from "@/lib/i18n";
import { isPlaceholderClinicalSummary } from "@/lib/clinical-summary";
import { splitDocumentSections } from "@/lib/document-sections";
import { isFramedAsSingleVendorReport } from "@/lib/report-summary-framing";

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

function isLabSection(document: string): boolean {
  if (/chemistry\s+panel|cholesterol|triglycerides|ldl|hdl/i.test(document)) {
    return true;
  }
  return LAB_PATTERNS.filter((p) => p.re.test(document)).length >= 2;
}

function isStressSection(document: string, filename?: string): boolean {
  if (STRESS_PATTERNS.some((p) => p.re.test(document))) return true;
  const hint = `${filename ?? ""}\n${document.slice(0, 2000)}`;
  return /airdoc|monitoring report|stress\s+resilience/i.test(hint);
}

function stressLabel(
  document: string,
  locale: Locale,
  filename?: string,
  options?: { multiFile?: boolean },
): string {
  const isAirdoc = /airdoc/i.test(`${filename ?? ""}\n${document.slice(0, 2000)}`);
  if (isAirdoc && !options?.multiFile && filename) {
    return locale === "id"
      ? `Skrining wellness Airdoc (${filename})`
      : `Airdoc wellness (${filename})`;
  }
  if (isAirdoc && !options?.multiFile && !filename) {
    return locale === "id" ? "Skrining wellness Airdoc" : "Airdoc wellness screening";
  }
  return filename
    ? locale === "id"
      ? `Skrining stres (${filename})`
      : `Stress screening (${filename})`
    : locale === "id"
      ? "Skrining stres"
      : "Stress screening";
}

function buildLabNarrative(document: string, locale: Locale, filename?: string): string {
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
        ? "beberapa parameter kimia dari berkas ini"
        : "several chemistry values in this file";
  const fileBit = filename ? ` (${filename})` : "";

  if (locale === "id") {
    return (
      `Panel kimia darah${fileBit} untuk ${patient} mencatat: ${metricText}. ` +
      `Nilai perlu ditafsirkan dengan riwayat medis dan faktor risiko.\n\n` +
      `Disarankan diskusi hasil dengan pasien dan rencana tindak lanjut sesuai pedoman klinis.`
    );
  }
  return (
    `Chemistry panel${fileBit} for ${patient} records: ${metricText}. ` +
    `Values should be interpreted with medical history and risk factors.\n\n` +
    `Discuss results with the patient and plan appropriate follow-up.`
  );
}

function buildStressNarrative(
  document: string,
  locale: Locale,
  filename?: string,
  options?: { multiFile?: boolean },
): string {
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
        ? "beberapa indikator stres pada berkas ini"
        : "stress indicators in this file";
  const label = stressLabel(document, locale, filename, options);

  if (locale === "id") {
    return (
      `${label} untuk ${patient} menunjukkan: ${metricText}. ` +
      `Skor perlu ditafsirkan dengan konteks klinis.\n\n` +
      `Disarankan evaluasi lanjutan dengan tenaga kesehatan bila gejala berkelanjutan.`
    );
  }
  return (
    `${label} for ${patient} shows: ${metricText}. ` +
    `Scores should be interpreted with clinical context.\n\n` +
    `Follow-up with a clinician is recommended if stress symptoms persist.`
  );
}

function buildSectionNarrative(
  document: string,
  locale: Locale,
  filename?: string,
): string {
  if (isLabSection(document)) {
    return buildLabNarrative(document, locale, filename);
  }
  if (isStressSection(document, filename)) {
    return buildStressNarrative(document, locale, filename);
  }
  const patient = extractPatient(document) || (locale === "id" ? "pasien" : "the patient");
  const excerpt = document.replace(/\s+/g, " ").slice(0, 400);
  const fileBit = filename ? ` (${filename})` : "";
  if (locale === "id") {
    return `Ringkasan dokumen${fileBit} untuk ${patient}. Awalan teks: ${excerpt}…`;
  }
  return `Document summary${fileBit} for ${patient}. Opening text: ${excerpt}…`;
}

/** Rule-based summary when the analyze stream returns a placeholder. */
export function buildClinicalNarrativeFromDocument(
  document: string,
  locale: Locale,
  fileCount = 1,
): string {
  const sections = splitDocumentSections(document);
  if (sections.length > 1) {
    const intro =
      locale === "id"
        ? `Ringkasan gabungan dari ${sections.length} berkas yang diunggah (lab, wellness, dan dokumen lainnya).\n\n`
        : `Combined summary across ${sections.length} uploaded files (labs, wellness, and other documents).\n\n`;
    const parts = sections.map(
      (section) =>
        `**${section.filename}**\n${buildSectionNarrative(section.text, locale, section.filename)}`,
    );
    return intro + parts.join("\n\n");
  }

  if (fileCount > 1 && isLabSection(document) && isStressSection(document)) {
    const intro =
      locale === "id"
        ? `Ringkasan gabungan dari ${fileCount} berkas (termasuk lab dan skrining stres).\n\n`
        : `Combined summary across ${fileCount} files (labs, wellness screening, and other documents).\n\n`;
    const labPart = buildLabNarrative(document, locale);
    const stressPart = buildStressNarrative(document, locale, undefined, {
      multiFile: true,
    });
    return `${intro}**Labs**\n${labPart}\n\n**Wellness / stress**\n${stressPart}`;
  }

  return buildSectionNarrative(document, locale);
}

/** Short clinician-oriented summary — distinct from clinical narrative. */
export function buildDoctorSummaryFromDocument(
  document: string,
  locale: Locale,
  fileCount = 1,
): string {
  const sections = splitDocumentSections(document);
  if (sections.length > 1) {
    const parts = sections.map((section) => {
      const head = buildDoctorSummaryFromDocument(section.text, locale, 1);
      return `${section.filename}: ${head}`;
    });
    return parts.join("\n\n");
  }

  const metrics: string[] = [];
  for (const { label, re, unit } of LAB_PATTERNS) {
    const m = document.match(re);
    if (m) metrics.push(`${label} ${m[1]} ${unit}`);
  }
  const patient =
    extractPatient(document) || (locale === "id" ? "pasien" : "the patient");

  if (isLabSection(document) && metrics.length > 0) {
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

  if (isStressSection(document) && fileCount <= 1) {
    return buildStressNarrative(document, locale).split("\n\n")[0] ?? "";
  }

  if (locale === "id") {
    return (
      `${patient} memiliki hasil laboratorium pada dokumen ini. ` +
      "Tinjau nilai lengkap di sistem dan diskusikan interpretasi klinis dengan pasien."
    );
  }
  return (
    `${patient} has laboratory results on file. ` +
    "Review full values in the chart and discuss clinical interpretation with the patient."
  );
}

export function resolveSummaryAfterStream(
  streamSummary: string,
  document: string,
  locale: Locale,
  fileCount = 1,
): string {
  const trimmed = streamSummary.trim();
  const effectiveCount = Math.max(
    fileCount,
    splitDocumentSections(document).length,
    1,
  );
  if (
    trimmed &&
    !isPlaceholderClinicalSummary(trimmed) &&
    effectiveCount > 1 &&
    isFramedAsSingleVendorReport(trimmed)
  ) {
    return buildClinicalNarrativeFromDocument(document, locale, effectiveCount);
  }
  if (trimmed && !isPlaceholderClinicalSummary(trimmed)) {
    return trimmed;
  }
  return buildClinicalNarrativeFromDocument(document, locale, effectiveCount);
}
