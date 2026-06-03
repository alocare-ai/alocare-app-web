import type { Locale } from "@/lib/i18n";
import { extractDocumentText } from "@/lib/report-document";
import { splitDocumentSections } from "@/lib/document-sections";
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

/** SSR metadata shown in the chat panel header. */
export function buildReportChatMeta(
  report: Report,
  result: ReportResult | null,
  locale: Locale,
): ReportChatMeta {
  const fileCount = countUploadedFiles(report, result);
  const hasAnalysis = Boolean(result?.summary?.trim());
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
