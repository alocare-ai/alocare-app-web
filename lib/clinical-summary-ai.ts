import {
  createAiAnalysisProgressController,
  type AiAnalysisProgressState,
} from "@/lib/ai-analysis-progress";
import { runAnalyzeStream } from "@/lib/api/analyze-stream";
import { createAISession } from "@/lib/api/chat";
import {
  isPlaceholderClinicalSummary,
  isUnusableStreamSummary,
  mergeAnalyzeResponseIntoResult,
} from "@/lib/clinical-summary";
import { bilingual, type BilingualText, type Locale } from "@/lib/i18n";
import {
  buildBalancedDocumentExcerpt,
  splitDocumentSections,
} from "@/lib/document-sections";
import { extractDocumentText } from "@/lib/report-document";
import { reportAnalysisInputType } from "@/lib/report-result-utils";
import { resolveSummaryAfterStream } from "@/lib/report-narrative-fallback";
import { isFramedAsSingleVendorReport } from "@/lib/report-summary-framing";
import type { Report, ReportResult } from "@/lib/types/api";

const MAX_DOCUMENT_CHARS = 24_000;

/** Full OCR / report text used as the primary input for summarization. */
export function buildFullDocumentForSummary(
  result: ReportResult,
  locale: Locale,
  documentText?: string,
): string {
  const primary =
    documentText?.trim() ||
    extractDocumentText(result) ||
    result.doctor_summary?.trim() ||
    "";

  if (!primary) return "";

  if (primary.length > MAX_DOCUMENT_CHARS) {
    return buildBalancedDocumentExcerpt(primary, MAX_DOCUMENT_CHARS);
  }

  return primary;
}

export type ClinicalSummaryAiProgress = (
  state: AiAnalysisProgressState,
) => void;

export async function generateClinicalSummaryFromAI(params: {
  report: Report;
  result: ReportResult;
  reportId: string;
  locale: Locale;
  /** Raw full-document text (e.g. from OCR) when available */
  documentText?: string;
  /** When >1, fallbacks avoid labeling the whole upload as a single Airdoc report */
  fileCount?: number;
  onProgress?: ClinicalSummaryAiProgress;
}): Promise<{
  summary: BilingualText;
  analyzeExtras?: {
    doctorSummary?: string;
    nextActions?: string[];
  };
}> {
  const document = buildFullDocumentForSummary(
    params.result,
    params.locale,
    params.documentText,
  );

  if (!document.trim()) {
    throw new Error("No document text available for AI summary");
  }

  const session = await createAISession({
    preferred_language: params.locale,
  });

  const progressCtrl = params.onProgress
    ? createAiAnalysisProgressController(params.locale, params.onProgress, {
        contentLength: document.length,
        creepIntervalMs: 2600,
      })
    : null;

  progressCtrl?.fromEvent({
    step: "started",
    progress: 5,
    message:
      params.locale === "id"
        ? "Membuat sesi AI…"
        : "Creating AI session…",
  });

  try {
    const complete = await runAnalyzeStream(
      {
        sessionId: session.id,
        reportId: params.reportId,
        content: document,
        inputType: reportAnalysisInputType(params.report),
        preferredLanguage: params.locale,
      },
      (event) => {
        progressCtrl?.fromEvent(event);
      },
    );

    progressCtrl?.enterSaving(
      params.locale === "id"
        ? "Mengurai keluaran model dan menyiapkan penyimpanan…"
        : "Parsing model output and preparing to save…",
    );
    progressCtrl?.advanceSaving("parse_response");

    const streamSummary = (complete.summary ?? "").trim();
    const streamDoctor = complete.doctorSummary?.trim();
    const streamActions = complete.nextActions ?? [];

    const sectionCount = splitDocumentSections(document).length;
    const fileCount =
      params.fileCount ?? (sectionCount > 1 ? sectionCount : 1);

    const narrativeEn = resolveSummaryAfterStream(
      params.locale === "en" ? streamSummary : "",
      document,
      "en",
      fileCount,
    );
    const narrativeId = resolveSummaryAfterStream(
      params.locale === "id" ? streamSummary : "",
      document,
      "id",
      fileCount,
    );
    const rejectStreamVendorFraming =
      fileCount > 1 && isFramedAsSingleVendorReport(streamSummary);

    progressCtrl?.advanceSaving("validate_output");

    let summary: BilingualText = bilingual(narrativeEn, narrativeId);
    if (
      streamSummary &&
      !isPlaceholderClinicalSummary(streamSummary) &&
      !rejectStreamVendorFraming
    ) {
      summary =
        params.locale === "en"
          ? bilingual(streamSummary, narrativeId)
          : bilingual(narrativeEn, streamSummary);
    }

    progressCtrl?.advanceSaving("bilingual_merge");

    if (isPlaceholderClinicalSummary(summary.en)) {
      summary = bilingual(narrativeEn, summary.id);
    }
    if (isPlaceholderClinicalSummary(summary.id)) {
      summary = bilingual(summary.en, narrativeId);
    }

    const en = summary.en.trim();
    const id = summary.id.trim();
    if (isUnusableStreamSummary(en) && isUnusableStreamSummary(id)) {
      throw new Error("Could not build a clinical summary from this report");
    }

    progressCtrl?.advanceSaving("persist_analysis");
    progressCtrl?.finish();

    return {
      summary,
      analyzeExtras: {
        doctorSummary: streamDoctor || undefined,
        nextActions: streamActions.length ? streamActions : undefined,
      },
    };
  } finally {
    progressCtrl?.stop();
  }
}

/** Apply stream output to an in-memory result (e.g. upload flow cache). */
export function applyStreamAnalysisToResult(
  result: ReportResult,
  complete: {
    summary?: string;
    doctorSummary?: string;
    nextActions?: string[];
  },
  summary: BilingualText,
): ReportResult {
  return mergeAnalyzeResponseIntoResult(result, {
    summaryBilingual: summary,
    doctorSummary: complete.doctorSummary,
    nextActions: complete.nextActions,
  });
}
