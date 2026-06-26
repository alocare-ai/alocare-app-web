"use client";

import { useQuery } from "@tanstack/react-query";
import { runOcrStream } from "@/lib/api/ocr-stream";
import {
  extractDocumentText,
  fileAnalysesNeedFullOcr,
} from "@/lib/report-document";
import type { Report, ReportResult } from "@/lib/types/api";

/** Full OCR for doctor-summary repair — fetches when stored file_analyses are truncated. */
export function useReportFullDocumentText(
  reportId: string,
  report: Report | null | undefined,
  result: ReportResult | null | undefined,
): string {
  const stored = result ? extractDocumentText(result) : "";
  const needsFetch =
    Boolean(result) &&
    fileAnalysesNeedFullOcr(result) &&
    report?.status === "completed";

  const { data: fetched } = useQuery({
    queryKey: ["report-full-ocr", reportId],
    queryFn: () => runOcrStream(reportId, () => {}),
    enabled: needsFetch,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const fetchedText = fetched?.trim() ?? "";
  if (fetchedText.length > stored.length) {
    return fetchedText;
  }
  return stored;
}
