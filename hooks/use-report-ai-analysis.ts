"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/hooks/use-locale";
import { runClinicalIntelligenceStream } from "@/lib/api/clinical-intelligence-stream";
import {
  applyCiStreamEvent,
  createCiFilesProgress,
  pipelineStepFromCiEvent,
} from "@/lib/clinical-intelligence-progress";
import type { OcrFilesProgressState } from "@/lib/ocr-file-progress";
import { reportNeedsAiClinicalSummary } from "@/lib/report-result-utils";
import type { Report, ReportResult } from "@/lib/types/api";
import type { ReportPipelineStep } from "@/lib/report-pipeline";

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
  const [pipelineStep, setPipelineStep] = useState<ReportPipelineStep>("analyzing");
  const [ciFilesProgress, setCiFilesProgress] =
    useState<OcrFilesProgressState | null>(null);
  const runIdRef = useRef(0);
  const runningRef = useRef(false);

  const needsAnalysis =
    enabled && reportNeedsAiClinicalSummary(report, result);

  const runAnalysis = useCallback(async (force = false) => {
    if (!report || runningRef.current) return;
    if (!force && !reportNeedsAiClinicalSummary(report, result)) return;

    const runId = ++runIdRef.current;
    runningRef.current = true;
    setIsRunning(true);
    setError(null);
    setPipelineStep("ocr");

    const filenames =
      result?.uploaded_files?.map((f) => f.filename) ??
      (report.file_reference?.includes(",")
        ? report.file_reference.split(",").map((s) => s.trim())
        : [report.file_reference || report.title || "document"]);

    const initialProgress = createCiFilesProgress(
      filenames.filter(Boolean),
      locale,
    );
    setCiFilesProgress(initialProgress);

    try {
      await runClinicalIntelligenceStream(
        reportId,
        locale,
        (event) => {
          if (runId !== runIdRef.current) return;
          setPipelineStep(pipelineStepFromCiEvent(event));
          setCiFilesProgress((prev) =>
            applyCiStreamEvent(prev ?? initialProgress, event, locale),
          );
        },
      );

      if (runId !== runIdRef.current) return;

      await queryClient.invalidateQueries({ queryKey: ["report", reportId] });
      await queryClient.invalidateQueries({
        queryKey: ["report-result", reportId],
      });
      setPipelineStep("completed");
    } catch (err) {
      if (runId !== runIdRef.current) return;
      const message =
        err instanceof Error ? err.message : "Clinical intelligence failed";
      setError(message);
    } finally {
      if (runId === runIdRef.current) {
        runningRef.current = false;
        setIsRunning(false);
      }
    }
  }, [locale, queryClient, report, reportId, result]);

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
    void runAnalysis(true);
  }, [runAnalysis]);

  return {
    needsAnalysis,
    isAnalyzing,
    isRunning,
    error,
    retry,
    pipelineStep,
    ciFilesProgress,
  };
}
