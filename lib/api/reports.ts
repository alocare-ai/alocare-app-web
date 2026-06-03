import type {
  Report,
  ReportFileAnalysis,
  ReportResult,
  ReportUploadedFile,
} from "@/lib/types/api";
import { apiFetch } from "./client";

export async function createReport(data: {
  title: string;
  patient_id?: string;
  file_reference?: string;
}): Promise<Report> {
  return apiFetch<Report>("/reports", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export type ReportUploadResult = {
  ok: boolean;
  count: number;
  files: { filename: string; size: number }[];
  filename: string;
  size: number;
};

export async function uploadReportFiles(
  reportId: string,
  files: File[],
): Promise<ReportUploadResult> {
  if (!files.length) {
    throw new Error("No files selected");
  }

  const form = new FormData();
  for (const file of files) {
    form.append("files", file);
  }

  const res = await fetch(`/api/backend/reports/${reportId}/upload`, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  if (!res.ok) {
    let detail = "Upload failed";
    try {
      const body = (await res.json()) as { detail?: string };
      detail = body.detail ?? detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }

  return res.json() as Promise<ReportUploadResult>;
}

/** @deprecated Use uploadReportFiles */
export async function uploadReportFile(
  reportId: string,
  file: File,
): Promise<ReportUploadResult> {
  return uploadReportFiles(reportId, [file]);
}

export async function getReport(id: string): Promise<Report> {
  return apiFetch<Report>(`/reports/${id}`);
}

export async function getReportResult(id: string): Promise<ReportResult> {
  return apiFetch<ReportResult>(`/reports/${id}/result`);
}

export async function validateReport(
  id: string,
  notes?: string,
): Promise<Report> {
  return apiFetch<Report>(`/reports/${id}/validate`, {
    method: "POST",
    body: JSON.stringify({ notes, approved: true }),
  });
}

export async function getReportFiles(
  reportId: string,
): Promise<ReportUploadedFile[]> {
  return apiFetch<ReportUploadedFile[]>(`/reports/${reportId}/files`);
}

export async function deleteReportFile(
  reportId: string,
  filename: string,
): Promise<{ ok: boolean; remaining: number; filename: string }> {
  const params = new URLSearchParams({ filename });
  return apiFetch<{ ok: boolean; remaining: number; filename: string }>(
    `/reports/${reportId}/files?${params.toString()}`,
    { method: "DELETE" },
  );
}

export async function buildReportFileAnalyses(
  reportId: string,
): Promise<{ ok: boolean; count: number }> {
  return apiFetch<{ ok: boolean; count: number }>(
    `/reports/${reportId}/file-analyses/build`,
    { method: "POST" },
  );
}

export async function saveReportFileAnalyses(
  reportId: string,
  analyses: ReportFileAnalysis[],
): Promise<{ ok: boolean; count: number }> {
  return apiFetch<{ ok: boolean; count: number }>(
    `/reports/${reportId}/file-analyses`,
    {
      method: "PUT",
      body: JSON.stringify({ analyses }),
    },
  );
}
