import { splitDocumentSections } from "@/lib/document-sections";
import type { ReportFileAnalysis, ReportResult } from "@/lib/types/api";

/** True when copy frames the whole upload as one vendor report (e.g. Airdoc only). */
export function isFramedAsSingleVendorReport(text: string | null | undefined): boolean {
  const t = text?.trim() ?? "";
  if (!t) return false;
  if (/combined summary|ringkasan gabungan|\*\*[^*]+\*\*/i.test(t)) {
    return false;
  }
  if (/^this airdoc\b/i.test(t)) return true;
  if (/\bairdoc\b/i.test(t) && /\bstress\s+resilience\s+report\b/i.test(t)) {
    return true;
  }
  if (/^this stress resilience report\b/i.test(t)) return true;
  return false;
}

export function countUploadedFilesFromResult(
  result: ReportResult | null | undefined,
): number {
  if (!result) return 0;
  return result.uploaded_files?.length ?? 0;
}

export function effectiveReportFileCount(
  document: string,
  uploadedFileCount = 0,
): number {
  const sections = splitDocumentSections(document);
  if (sections.length > 1) return sections.length;
  if (uploadedFileCount > 1) return uploadedFileCount;
  return 1;
}

export function shouldRebuildMultiFileClinicalSummary(
  summaryText: string,
  document: string,
  uploadedFileCount = 0,
): boolean {
  const fileCount = effectiveReportFileCount(document, uploadedFileCount);
  if (fileCount <= 1) return false;
  return isFramedAsSingleVendorReport(summaryText);
}

export function buildClinicalNarrativeFromFileAnalyses(
  analyses: ReportFileAnalysis[],
  locale: "en" | "id",
): string | null {
  if (analyses.length < 2) return null;

  const parts = analyses
    .map((entry) => {
      const text =
        locale === "id"
          ? entry.summary.id?.trim() || entry.summary.en?.trim()
          : entry.summary.en?.trim() || entry.summary.id?.trim();
      if (!text) return "";
      return `**${entry.filename}**\n${text}`;
    })
    .filter(Boolean);

  if (parts.length < 2) return null;

  const intro =
    locale === "id"
      ? `Ringkasan gabungan dari ${analyses.length} berkas yang diunggah (lab, wellness, dan dokumen lainnya).\n\n`
      : `Combined summary across ${analyses.length} uploaded files (labs, wellness screening, and other documents).\n\n`;

  return intro + parts.join("\n\n");
}
