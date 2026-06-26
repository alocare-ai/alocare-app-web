import type { Locale } from "@/lib/i18n";
import { extractDocumentText } from "@/lib/report-document";
import { splitDocumentSections } from "@/lib/document-sections";
import {
  hasDisplayableClinicalSummary,
  hasDoctorSummaryContent,
} from "@/lib/report-result-utils";
import type { Report, ReportResult } from "@/lib/types/api";

export type ReportChatMeta = {
  fileCount: number;
  hasAnalysis: boolean;
  hasDocumentText: boolean;
  contextHint: string;
};

export function countUploadedFiles(
  report: Report,
  result: ReportResult | null,
): number {
  if (result?.uploaded_files?.length) {
    return result.uploaded_files.length;
  }
  const ref = report.file_reference?.trim();
  if (!ref) return 0;
  if (ref.includes(",")) {
    return ref.split(",").filter((n) => n.trim()).length;
  }
  return 1;
}

/** True when the report has enough context for AI chat (not only raw API clinical summary). */
export function hasReportChatContext(
  report: Report | null | undefined,
  result: ReportResult | null | undefined,
  documentText = "",
): boolean {
  if (!report) return false;
  if (hasDisplayableClinicalSummary(result)) return true;
  if (hasDoctorSummaryContent(result)) return true;
  if (documentText.trim().length > 200) return true;
  if (
    (report.status === "completed" || report.status === "validated") &&
    countUploadedFiles(report, result ?? null) > 0
  ) {
    return true;
  }
  return false;
}

/** SSR metadata shown in the chat panel header. */
export function buildReportChatMeta(
  report: Report,
  result: ReportResult | null,
  locale: Locale,
): ReportChatMeta {
  const fileCount = countUploadedFiles(report, result);
  const hasAnalysis =
    hasDisplayableClinicalSummary(result) || hasDoctorSummaryContent(result);
  const documentText = result ? extractDocumentText(result) : "";
  const sectionCount = splitDocumentSections(documentText).length;
  const hasDocumentText =
    documentText.length > 200 || sectionCount > 0 || fileCount > 0;

  let contextHint: string;
  if (locale === "id") {
    if (fileCount > 1) {
      contextHint = hasAnalysis
        ? `Chat memakai ${fileCount} berkas yang diunggah dan ringkasan analisis AI.`
        : `Chat memakai ${fileCount} berkas yang diunggah.`;
    } else if (fileCount === 1) {
      contextHint = hasAnalysis
        ? "Chat memakai berkas yang diunggah dan ringkasan analisis AI."
        : "Chat memakai berkas yang diunggah.";
    } else {
      contextHint = hasAnalysis
        ? "Chat memakai ringkasan analisis AI."
        : "Konteks laporan akan tersedia setelah analisis.";
    }
  } else if (fileCount > 1) {
    contextHint = hasAnalysis
      ? `Chat uses ${fileCount} uploaded files and the AI analysis summary.`
      : `Chat uses ${fileCount} uploaded files.`;
  } else if (fileCount === 1) {
    contextHint = hasAnalysis
      ? "Chat uses the uploaded file and AI analysis summary."
      : "Chat uses the uploaded file.";
  } else {
    contextHint = hasAnalysis
      ? "Chat uses the AI analysis summary."
      : "Report context will be available after analysis.";
  }

  return {
    fileCount,
    hasAnalysis,
    hasDocumentText,
    contextHint,
  };
}
