import type { EnterpriseDashboard } from "@/lib/types/api";
import { apiFetch } from "./client";

export async function getEnterpriseDashboard(): Promise<EnterpriseDashboard> {
  return apiFetch<EnterpriseDashboard>("/enterprise/dashboard");
}

export async function uploadEnterpriseReport(
  file: File,
): Promise<{ message: string; filename: string; status: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/backend/enterprise/reports/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Enterprise upload failed");
  }

  return res.json();
}
