import { cookies } from "next/headers";

import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { isReportAnalyzing } from "@/lib/report-result-utils";
import type { Report, ReportResult } from "@/lib/types/api";
import type { Locale } from "@/lib/i18n";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.alocare.net";

async function serverApiFetch<T>(path: string): Promise<T | null> {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIES.access)?.value;
  if (!token) return null;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

export async function getReportServer(id: string): Promise<Report | null> {
  return serverApiFetch<Report>(`/reports/${id}`);
}

export async function getReportResultServer(
  id: string,
): Promise<ReportResult | null> {
  return serverApiFetch<ReportResult>(`/reports/${id}/result`);
}

export async function getServerLocale(): Promise<Locale> {
  const jar = await cookies();
  const stored = jar.get("alocare_locale")?.value ?? jar.get("cc_lang")?.value;
  return stored === "id" ? "id" : "en";
}

export { isReportAnalyzing };
