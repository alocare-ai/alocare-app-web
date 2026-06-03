const DEFAULT_API = "https://api.alocare.net";

/** Browser-facing alocare-api base URL (from NEXT_PUBLIC_API_URL). */
export function getPublicApiBase(): string {
  const trimmed = process.env.NEXT_PUBLIC_API_URL?.trim();
  const base = trimmed && trimmed.length > 0 ? trimmed : DEFAULT_API;
  return base.replace(/\/$/, "");
}

/**
 * Production: same-origin `/api/upstream/*` rewrite → API (no CORS, no function body cap).
 * Development: `/api/backend/*` BFF with httpOnly cookies.
 */
export function shouldUseUpstreamRewriteUpload(): boolean {
  return process.env.NODE_ENV === "production";
}

/** @deprecated Use shouldUseUpstreamRewriteUpload */
export function shouldUseDirectReportUpload(): boolean {
  return shouldUseUpstreamRewriteUpload();
}
