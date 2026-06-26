import type { ReportResult } from "@/lib/types/api";

/** True when text looks like raw OCR / lab printout, not a short AI summary. */
export function isRawOcrDump(text: string | null | undefined): boolean {
  const t = text?.trim() ?? "";
  if (t.length < 500) return false;
  if (
    /laboratory report|rumah sakit|klinik|glukosa darah|dr\.?\s*sp\.|ihc\s+rumah/i.test(
      t,
    )
  ) {
    return true;
  }
  if ((t.match(/[：:]/g) ?? []).length >= 8) return true;
  if (/name[：:]|nama[：:]/i.test(t) && t.length > 700) return true;
  return false;
}

function normalizeForCompare(text: string): string {
  return text.replace(/\s+/g, " ").trim().toLowerCase().slice(0, 280);
}

export function isNearDuplicateSummary(a: string, b: string): boolean {
  if (!a.trim() || !b.trim()) return false;
  const na = normalizeForCompare(a);
  const nb = normalizeForCompare(b);
  if (na === nb) return true;
  return na.length > 80 && (na.includes(nb.slice(0, 120)) || nb.includes(na.slice(0, 120)));
}

function documentTextFromFileAnalyses(result: ReportResult): string {
  const parts = (result.file_analyses ?? [])
    .map((entry) => {
      const preview = entry.extract_preview?.trim();
      if (!preview) return "";
      return `--- ${entry.filename} ---\n${preview}`;
    })
    .filter(Boolean);
  return parts.join("\n\n");
}

/** Prefer OCR / lab printout from file previews or doctor_summary fields. */
export function extractDocumentText(result: ReportResult): string {
  const fromFiles = documentTextFromFileAnalyses(result);
  const candidates = [
    fromFiles,
    result.doctor_summary?.trim(),
    result.doctor_summary_bilingual?.en?.trim(),
    result.doctor_summary_bilingual?.id?.trim(),
  ].filter((c): c is string => Boolean(c));

  const ocr = candidates.find((c) => isRawOcrDump(c));
  if (ocr) return ocr;

  const hospitalLab = candidates.find((c) =>
    /namapasien|no\.?\s*lab\b|no\.?\s*rm\b/i.test(c),
  );
  if (hospitalLab) return hospitalLab;

  return [...candidates].sort((a, b) => b.length - a.length)[0] ?? "";
}
