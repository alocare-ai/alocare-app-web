import type { Locale } from "@/lib/i18n";
import { isPlaceholderClinicalSummary } from "@/lib/clinical-summary";

const METRIC_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "Stress resilience score", re: /Stress\s+Resilience\s+Assessment\s*(\d{1,3})/i },
  { label: "Stress assessment score", re: /Stress\s+Assessment\s*(\d{1,3})/i },
  { label: "Physical stress score", re: /Physical\s+Stress\s*(\d{1,3})/i },
  { label: "Psychological stress score", re: /Psychological\s+Stress\s*(\d{1,3})/i },
  { label: "Autonomic balance score", re: /Autonomic\s+Nervous\s+Balance\s*(\d{1,3})/i },
  { label: "Autonomic activity score", re: /Autonomic\s+Nervous\s+Activity\s*(\d{1,3})/i },
];

function extractAdvice(document: string): string {
  const match = document.match(
    /Comprehensive\s+Advice\s*([\s\S]{40,1200}?)(?:Suggested\s+Next\s+Check|Disclaimer|Health\s+Life\s+Plan|$)/i,
  );
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function extractPatient(document: string): string {
  const name = document.match(/Name[：:]\s*([A-Za-z][A-Za-z\s]{0,40})/)?.[1]?.trim();
  const age = document.match(/Age[：:]\s*(\d{1,3})/)?.[1];
  const parts: string[] = [];
  if (name) parts.push(name);
  if (age) parts.push(`age ${age}`);
  return parts.join(", ") || "the patient";
}

/** Rule-based two-paragraph summary when the analyze stream returns a placeholder. */
export function buildClinicalNarrativeFromDocument(
  document: string,
  locale: Locale,
): string {
  const metrics: string[] = [];
  const seen = new Set<string>();
  for (const { label, re } of METRIC_PATTERNS) {
    const m = document.match(re);
    if (!m || seen.has(label)) continue;
    seen.add(label);
    metrics.push(`${label} ${m[1]}`);
  }

  const patient = extractPatient(document);
  const advice = extractAdvice(document);
  const metricText =
    metrics.length > 0
      ? metrics.join("; ")
      : locale === "id"
        ? "beberapa indikator stres dari dokumen"
        : "multiple stress indicators from the document";

  if (locale === "id") {
    const p1 = `Laporan ketahanan stres untuk ${patient} menunjukkan: ${metricText}. Skor perlu ditafsirkan dengan konteks klinis.`;
    const p2 = advice
      ? `Rekomendasi utama: ${advice.slice(0, 500)}`
      : "Disarankan evaluasi lanjutan dengan tenaga kesehatan bila gejala berkelanjutan.";
    return `${p1}\n\n${p2}`;
  }

  const p1 = `This stress resilience report for ${patient} shows: ${metricText}. Scores should be interpreted with clinical context.`;
  const p2 = advice
    ? `Primary recommendations: ${advice.slice(0, 500)}`
    : "Follow-up with a clinician is recommended if stress symptoms persist.";
  return `${p1}\n\n${p2}`;
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
