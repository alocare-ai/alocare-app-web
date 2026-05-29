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
