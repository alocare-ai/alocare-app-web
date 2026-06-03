const DEFAULT_API = "https://api.alocare.net";

function normalizePublicApiBase(raw: string): string {
  const base = raw.replace(/\/$/, "");
  try {
    if (new URL(base).hostname.toLowerCase() === "app.alocare.net") {
      return DEFAULT_API;
    }
  } catch {
    return DEFAULT_API;
  }
  return base;
}

/** Browser-facing alocare-api base URL (from NEXT_PUBLIC_API_URL). */
export function getPublicApiBase(): string {
  const trimmed = process.env.NEXT_PUBLIC_API_URL?.trim();
  const base = trimmed && trimmed.length > 0 ? trimmed : DEFAULT_API;
  return normalizePublicApiBase(base);
}

/**
 * Production: `/upstream-api` same-origin proxy first; direct API if proxy fails.
 * Development: `/api/backend/*` BFF with httpOnly cookies.
 */
export function shouldUseUpstreamRewriteUpload(): boolean {
  return process.env.NODE_ENV === "production";
}

/** @deprecated Use shouldUseUpstreamRewriteUpload */
export function shouldUseDirectReportUpload(): boolean {
  return shouldUseUpstreamRewriteUpload();
}
