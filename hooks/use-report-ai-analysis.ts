"use client";

import type { BilingualText } from "@/lib/i18n";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  hasMeaningfulClinicalSummary,
  mergeAnalyzeResponseIntoResult,
} from "@/lib/clinical-summary";
import {
  buildFullDocumentForSummary,
  generateClinicalSummaryFromAI,
} from "@/lib/clinical-summary-ai";
import { runOcrStream } from "@/lib/api/ocr-stream";
import type { Locale } from "@/hooks/use-locale";
import { reportNeedsAiClinicalSummary } from "@/lib/report-result-utils";
import type { Report, ReportResult } from "@/lib/types/api";

type UseReportAiAnalysisOptions = {
  reportId: string;
  report: Report | null | undefined;
  result: ReportResult | null | undefined;
  locale: Locale;
  enabled?: boolean;
};

export function useReportAiAnalysis({
  reportId,
  report,
  result,
  locale,
  enabled = true,
}: UseReportAiAnalysisOptions) {
  const queryClient = useQueryClient();
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<BilingualText | null>(null);
  const runIdRef = useRef(0);
  const runningRef = useRef(false);

  const needsAnalysis =
    enabled && reportNeedsAiClinicalSummary(report, result);

  const runAnalysis = useCallback(async () => {
    if (!report || !result || runningRef.current) return;
    if (!reportNeedsAiClinicalSummary(report, result)) return;

    const runId = ++runIdRef.current;
    runningRef.current = true;
    setIsRunning(true);
    setError(null);

    try {
      let workingResult = result;

      let ocrDocument = "";
      if (
        !(workingResult.doctor_summary?.trim() ||
          workingResult.doctor_summary_bilingual?.en?.trim()) &&
        (workingResult.key_findings?.length ?? 0) === 0
      ) {
        ocrDocument = (await runOcrStream(reportId, () => {})).trim();
        await queryClient.invalidateQueries({
          queryKey: ["report-result", reportId],
        });
      }

      const documentText =
        ocrDocument ||
        buildFullDocumentForSummary(workingResult, locale);

      const fileCount = Math.max(
        workingResult.uploaded_files?.length ?? 0,
        report.file_reference?.includes(",")
          ? report.file_reference.split(",").length
          : 0,
        1,
      );

      const { summary, analyzeExtras } = await generateClinicalSummaryFromAI({
        report,
        result: workingResult,
        reportId,
        locale,
        documentText: documentText || undefined,
        fileCount,
      });

      if (runId !== runIdRef.current) return;

      setAiSummary(summary);

      const merged = mergeAnalyzeResponseIntoResult(workingResult, {
        summaryBilingual: summary,
        doctorSummary: analyzeExtras?.doctorSummary,
        nextActions: analyzeExtras?.nextActions,
        analysisEngine: "ai",
      });

      queryClient.setQueryData(["report-result", reportId], merged);

      await queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      await queryClient.invalidateQueries({
        queryKey: ["report-result", reportId],
      });

      const fresh = queryClient.getQueryData<ReportResult>([
        "report-result",
        reportId,
      ]);
      if (fresh && !hasMeaningfulClinicalSummary(fresh)) {
        queryClient.setQueryData(["report-result", reportId], merged);
      }
    } catch (err) {
      if (runId !== runIdRef.current) return;
      const message =
        err instanceof Error ? err.message : "AI analysis failed";
      setError(message);
      setAiSummary(null);
    } finally {
      if (runId === runIdRef.current) {
        runningRef.current = false;
        setIsRunning(false);
      }
    }
  }, [report, reportId, result, locale, queryClient]);

  const autoRunRef = useRef(false);

  useEffect(() => {
    if (!needsAnalysis) {
      autoRunRef.current = false;
      return;
    }
    if (autoRunRef.current) return;
    autoRunRef.current = true;
    void runAnalysis();
  }, [needsAnalysis, runAnalysis]);

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
    };
  }, []);

  const isAnalyzing = needsAnalysis || isRunning;

  const retry = useCallback(() => {
    autoRunRef.current = true;
    void runAnalysis();
  }, [runAnalysis]);

  return {
    needsAnalysis,
    isAnalyzing,
    isRunning,
    error,
    aiSummary,
    retry,
  };
}
