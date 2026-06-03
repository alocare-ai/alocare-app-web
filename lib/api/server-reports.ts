import { cookies } from "next/headers";

import { getPublicApiBase } from "@/lib/api/public-api-base";
import { getApiUpstreamBase } from "@/lib/api/upstream";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { isReportAnalyzing } from "@/lib/report-result-utils";
import type { Report, ReportResult } from "@/lib/types/api";
import type { Locale } from "@/lib/i18n";

/** Server-side report prefetch (RSC). Prefer API_PROXY_URL; never call the portal host. */
function getServerReportApiBase(): string {
  if (process.env.API_PROXY_URL?.trim()) {
    return getApiUpstreamBase();
  }
  return getPublicApiBase();
}

async function serverApiFetch<T>(path: string): Promise<T | null> {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIES.access)?.value;
  if (!token) return null;

  const res = await fetch(`${getServerReportApiBase()}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
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
