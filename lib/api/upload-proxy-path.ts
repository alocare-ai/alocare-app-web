/**
 * Same-origin path rewritten to alocare-api (see next.config.ts).
 * Must NOT live under /api/* — Vercel still applies the 4.5 MB function
 * payload limit to /api routes even when using rewrites.
 */
export const UPSTREAM_UPLOAD_PREFIX = "/upstream-api";

export function upstreamUploadUrl(reportId: string): string {
  return `${UPSTREAM_UPLOAD_PREFIX}/reports/${reportId}/upload`;
}

/** Vercel Hobby/Pro ingress limit per request (multipart). */
export const VERCEL_MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;
