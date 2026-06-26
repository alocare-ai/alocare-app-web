import { splitDocumentSections } from "@/lib/document-sections";
import { extractHospitalLabMetrics } from "@/lib/hospital-lab-narrative";
import {
  normalizeFindingStatus,
  type StoredKeyFinding,
} from "@/lib/report-analysis";
import type { ReportResult } from "@/lib/types/api";

function formatMetricValue(value: string, unit?: string): string {
  const trimmed = value.trim();
  if (!unit?.trim()) return trimmed;
  if (trimmed.toLowerCase().includes(unit.toLowerCase())) return trimmed;
  return `${trimmed} ${unit.trim()}`;
}

function findingsFromHospitalOcr(text: string): StoredKeyFinding[] {
  const merged: StoredKeyFinding[] = [];
  const seen = new Set<string>();

  const sections = splitDocumentSections(text);
  const bodies =
    sections.length > 0 ? sections.map((section) => section.text) : [text];

  for (const body of bodies) {
    for (const metric of extractHospitalLabMetrics(body)) {
      const key = metric.name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push({
        name: metric.name,
        value: formatMetricValue(metric.value, metric.unit),
        status: normalizeFindingStatus(metric.status),
        referenceRange: metric.referenceRange ?? null,
      });
    }
  }

  return merged;
}

function normalizeStoredFinding(raw: {
  name?: string;
  value?: string;
  status?: string;
  reference_range?: string | null;
  referenceRange?: string | null;
}): StoredKeyFinding | null {
  const name = raw.name?.trim();
  const value = raw.value?.trim();
  if (!name || !value) return null;
  return {
    name,
    value,
    status: normalizeFindingStatus(raw.status ?? "normal"),
    referenceRange: raw.reference_range ?? raw.referenceRange ?? null,
  };
}

function mergeFindings(
  primary: StoredKeyFinding[],
  secondary: StoredKeyFinding[],
): StoredKeyFinding[] {
  const merged = [...primary];
  const seen = new Set(primary.map((f) => f.name.toLowerCase()));
  for (const item of secondary) {
    const key = item.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }
  return merged;
}

function sortFindings(findings: StoredKeyFinding[]): StoredKeyFinding[] {
  const rank: Record<string, number> = {
    critical: 0,
    high: 1,
    low: 2,
    normal: 3,
  };
  return [...findings].sort(
    (a, b) => (rank[a.status] ?? 4) - (rank[b.status] ?? 4),
  );
}

/** Stored key findings, clinical intelligence labs, per-file findings, or OCR extraction. */
export function resolveReportKeyFindings(
  result: ReportResult | null | undefined,
  documentText: string,
): StoredKeyFinding[] {
  const ci = result?.clinical_intelligence ?? result?.clinicalIntelligence;
  const fromCi = (ci?.normalized_results ?? ci?.normalizedResults ?? [])
    .map((row) =>
      normalizeStoredFinding({
        name: row.test,
        value:
          row.value == null || row.value === ""
            ? undefined
            : row.unit
              ? `${row.value} ${row.unit}`
              : String(row.value),
        status: row.status,
        reference_range: row.reference_range ?? row.referenceRange,
      }),
    )
    .filter((f): f is StoredKeyFinding => f != null);

  const stored = (result?.key_findings ?? [])
    .map((f) => normalizeStoredFinding(f))
    .filter((f): f is StoredKeyFinding => f != null);

  const fromFiles = (result?.file_analyses ?? []).flatMap((entry) =>
    (entry.key_findings ?? [])
      .map((f) => normalizeStoredFinding(f))
      .filter((f): f is StoredKeyFinding => f != null),
  );

  const ocrParts = [documentText];
  for (const entry of result?.file_analyses ?? []) {
    if (entry.ocr_text?.trim()) ocrParts.push(entry.ocr_text);
    else if (entry.extract_preview?.trim()) ocrParts.push(entry.extract_preview);
  }
  const fromOcr = findingsFromHospitalOcr(ocrParts.filter(Boolean).join("\n\n"));

  return sortFindings(
    mergeFindings(mergeFindings(mergeFindings(fromCi, stored), fromFiles), fromOcr),
  ).slice(0, 8);
}

export function resolveReportRiskIndicator(
  storedRisk: string | null | undefined,
  findings: StoredKeyFinding[],
): "low" | "medium" | "high" | null {
  if (storedRisk) {
    const v = storedRisk.toLowerCase();
    if (v.includes("high") || v === "critical") return "high";
    if (v.includes("medium") || v.includes("review")) return "medium";
    if (v.includes("low")) return "low";
    return "medium";
  }

  const abnormal = findings.filter((f) =>
    ["low", "high", "critical"].includes(f.status),
  );
  if (abnormal.some((f) => f.status === "critical" || f.status === "high")) {
    return "high";
  }
  if (abnormal.length >= 2) return "medium";
  if (abnormal.length === 1) return "medium";
  if (findings.length > 0) return "low";
  return null;
}
