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

function isReportReady(report: Report, result: ReportResult): boolean {
  return (
    hasMeaningfulClinicalSummary(result) &&
    (report.status === "completed" || report.status === "validated")
  );
}

/**
 * Poll until the API returns a persisted clinical summary (after analyze stream).
 * When `fallbackResult` already has a summary, stop after a short sync window instead
 * of blocking for the full timeout.
 */
export async function waitForReportAnalysisReady(
  reportId: string,
  options?: {
    timeoutMs?: number;
    /** How long to wait for API persistence when the client already has a summary. */
    syncTimeoutMs?: number;
    intervalMs?: number;
    fallbackResult?: ReportResult | null;
  },
): Promise<ReportAnalysisReady> {
  const timeoutMs = options?.timeoutMs ?? 45_000;
  const syncTimeoutMs = options?.syncTimeoutMs ?? 12_000;
  const intervalMs = options?.intervalMs ?? 750;
  const deadline = Date.now() + timeoutMs;
  const syncDeadline =
    options?.fallbackResult && hasMeaningfulClinicalSummary(options.fallbackResult)
      ? Date.now() + syncTimeoutMs
      : deadline;

  while (Date.now() < deadline) {
    try {
      const [report, result] = await Promise.all([
        getReport(reportId),
        getReportResult(reportId),
      ]);

      if (isReportReady(report, result)) {
        return { report, result };
      }
    } catch {
      /* ignore transient poll errors */
    }

    if (Date.now() >= syncDeadline) {
      break;
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
