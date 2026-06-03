import { getReport, getReportResult } from "@/lib/api/reports";
import { hasMeaningfulClinicalSummary } from "@/lib/clinical-summary";
import type { Report, ReportResult } from "@/lib/types/api";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type ReportAnalysisReady = {
  report: Report;
  result: ReportResult;
};

/**
 * Poll until the API returns a persisted clinical summary (after analyze stream).
 * Used before navigating to the report results page.
 */
export async function waitForReportAnalysisReady(
  reportId: string,
  options?: {
    timeoutMs?: number;
    intervalMs?: number;
    /** Client-side merge to accept if the API is slow but analysis already finished. */
    fallbackResult?: ReportResult | null;
  },
): Promise<ReportAnalysisReady> {
  const timeoutMs = options?.timeoutMs ?? 60_000;
  const intervalMs = options?.intervalMs ?? 750;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const [report, result] = await Promise.all([
      getReport(reportId),
      getReportResult(reportId),
    ]);

    if (
      hasMeaningfulClinicalSummary(result) &&
      (report.status === "completed" || report.status === "validated")
    ) {
      return { report, result };
    }

    await sleep(intervalMs);
  }

  if (
    options?.fallbackResult &&
    hasMeaningfulClinicalSummary(options.fallbackResult)
  ) {
    const report = await getReport(reportId);
    return { report, result: options.fallbackResult };
  }

  throw new Error(
    "Clinical summary was not saved in time. Try opening the report again or retry analysis.",
  );
}
