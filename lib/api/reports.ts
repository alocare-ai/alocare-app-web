import type { Report, ReportResult } from "@/lib/types/api";
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

export async function uploadReportFile(
  reportId: string,
  file: File,
): Promise<{ ok: boolean; filename: string; size: number }> {
  const form = new FormData();
  form.append("file", file);

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

  return res.json() as Promise<{ ok: boolean; filename: string; size: number }>;
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
