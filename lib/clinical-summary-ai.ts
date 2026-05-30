import type { AiAnalysisProgressState } from "@/lib/ai-analysis-progress";
import {
  analyzeStreamEventToProgress,
  runAnalyzeStream,
} from "@/lib/api/analyze-stream";
import { createAISession } from "@/lib/api/chat";
import { getReportResult } from "@/lib/api/reports";
import {
  isPlaceholderClinicalSummary,
  isUnusableStreamSummary,
  mergeAnalyzeResponseIntoResult,
  resolveClinicalSummary,
} from "@/lib/clinical-summary";
import { bilingual, type BilingualText, type Locale } from "@/lib/i18n";
import { extractDocumentText } from "@/lib/report-document";
import { reportAnalysisInputType } from "@/lib/report-result-utils";
import { resolveSummaryAfterStream } from "@/lib/report-narrative-fallback";
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
    return `${primary.slice(0, MAX_DOCUMENT_CHARS)}\n\n[Document truncated for analysis]`;
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

  params.onProgress?.(
    analyzeStreamEventToProgress(
      {
        step: "started",
        progress: 5,
        message:
          params.locale === "id"
            ? "Membuat sesi AI…"
            : "Creating AI session…",
      },
      params.locale,
      document.length,
    ),
  );

  const complete = await runAnalyzeStream(
    {
      sessionId: session.id,
      reportId: params.reportId,
      content: document,
      inputType: reportAnalysisInputType(params.report),
      preferredLanguage: params.locale,
    },
    (event) => {
      params.onProgress?.(
        analyzeStreamEventToProgress(event, params.locale, document.length),
      );
    },
  );

  const streamSummary = (complete.summary ?? "").trim();
  const streamDoctor = complete.doctorSummary?.trim();
  const streamActions = complete.nextActions ?? [];

  const narrativeEn = resolveSummaryAfterStream(
    params.locale === "en" ? streamSummary : "",
    document,
    "en",
  );
  const narrativeId = resolveSummaryAfterStream(
    params.locale === "id" ? streamSummary : "",
    document,
    "id",
  );
  let summary: BilingualText = bilingual(narrativeEn, narrativeId);
  if (streamSummary && !isPlaceholderClinicalSummary(streamSummary)) {
    summary =
      params.locale === "en"
        ? bilingual(streamSummary, narrativeId)
        : bilingual(narrativeEn, streamSummary);
  }

  try {
    const fresh = await getReportResult(params.reportId);
    const resolved = resolveClinicalSummary(fresh);
    if (!isPlaceholderClinicalSummary(resolved.en)) {
      summary = bilingual(resolved.en, summary.id || resolved.id || resolved.en);
    }
    if (!isPlaceholderClinicalSummary(resolved.id)) {
      summary = bilingual(summary.en || resolved.en, resolved.id);
    }
  } catch {
    /* use narrative from stream + document */
  }

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

  return {
    summary,
    analyzeExtras: {
      doctorSummary: streamDoctor || undefined,
      nextActions: streamActions.length ? streamActions : undefined,
    },
  };
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
