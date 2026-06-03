import type {
  Report,
  ReportFileAnalysis,
  ReportResult,
  ReportUploadedFile,
} from "@/lib/types/api";
import { apiFetch } from "./client";
import { shouldUseUpstreamRewriteUpload } from "@/lib/api/public-api-base";
import {
  upstreamUploadUrl,
  VERCEL_MAX_UPLOAD_BYTES,
} from "@/lib/api/upload-proxy-path";
import {
  directUploadNetworkError,
  fetchUploadCredentials,
  parseDirectUploadError,
  proxiedUploadNetworkError,
  resolveDirectUploadApiBase,
} from "./upload-credentials";

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

async function uploadReportFilesViaBff(
  reportId: string,
  form: FormData,
): Promise<ReportUploadResult> {
  const res = await fetch(`/api/backend/reports/${reportId}/upload`, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  if (!res.ok) {
    throw new Error(await parseDirectUploadError(res));
  }

  return res.json() as Promise<ReportUploadResult>;
}

function assertFileWithinUploadLimit(file: File): void {
  if (file.size > VERCEL_MAX_UPLOAD_BYTES) {
    throw new Error(
      `${file.name} exceeds the 4.5 MB per-file upload limit. Compress the file or upload fewer pages at a time.`,
    );
  }
}

/** Production: browser → api.alocare.net (requires CORS on API). */
async function uploadReportFilesDirectApi(
  reportId: string,
  files: File[],
): Promise<ReportUploadResult> {
  const credentials = await fetchUploadCredentials();
  const apiBase = resolveDirectUploadApiBase(credentials);
  const url = `${apiBase}/reports/${reportId}/upload`;

  const form = new FormData();
  for (const file of files) {
    form.append("files", file);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${credentials.accessToken}` },
      body: form,
    });
  } catch (err) {
    if (err instanceof TypeError) throw err;
    throw new Error(directUploadNetworkError(err, apiBase));
  }

  if (!res.ok) {
    throw new Error(await parseDirectUploadError(res));
  }

  return res.json() as Promise<ReportUploadResult>;
}

/** Production fallback: same-origin streaming proxy (no Vercel /api/* limit). */
async function uploadReportFilesViaAppProxy(
  reportId: string,
  files: File[],
): Promise<ReportUploadResult> {
  const credentials = await fetchUploadCredentials();
  const url = upstreamUploadUrl(reportId);

  const form = new FormData();
  for (const file of files) {
    form.append("files", file);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${credentials.accessToken}` },
      body: form,
    });
  } catch (err) {
    throw new Error(proxiedUploadNetworkError(err));
  }

  if (!res.ok) {
    throw new Error(await parseDirectUploadError(res));
  }

  return res.json() as Promise<ReportUploadResult>;
}

async function uploadOneFileProduction(
  reportId: string,
  file: File,
): Promise<ReportUploadResult> {
  try {
    return await uploadReportFilesDirectApi(reportId, [file]);
  } catch (err) {
    if (err instanceof TypeError) {
      return uploadReportFilesViaAppProxy(reportId, [file]);
    }
    throw err;
  }
}

export async function uploadReportFiles(
  reportId: string,
  files: File[],
): Promise<ReportUploadResult> {
  if (!files.length) {
    throw new Error("No files selected");
  }

  for (const file of files) {
    assertFileWithinUploadLimit(file);
  }

  if (shouldUseUpstreamRewriteUpload()) {
    let last: ReportUploadResult | undefined;
    for (const file of files) {
      last = await uploadOneFileProduction(reportId, file);
    }
    return last!;
  }

  const form = new FormData();
  for (const file of files) {
    form.append("files", file);
  }
  return uploadReportFilesViaBff(reportId, form);
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
