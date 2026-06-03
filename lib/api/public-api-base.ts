const DEFAULT_API = "https://api.alocare.net";

/** Browser-facing alocare-api base URL (from NEXT_PUBLIC_API_URL). */
export function getPublicApiBase(): string {
  const trimmed = process.env.NEXT_PUBLIC_API_URL?.trim();
  const base = trimmed && trimmed.length > 0 ? trimmed : DEFAULT_API;
  return base.replace(/\/$/, "");
}

/**
 * Production uploads go browser → API (avoids Vercel 4.5 MB limit).
 * Local dev uses the BFF proxy (same-origin, no CORS) via /api/backend.
 */
export function shouldUseDirectReportUpload(): boolean {
  return process.env.NODE_ENV === "production";
}
