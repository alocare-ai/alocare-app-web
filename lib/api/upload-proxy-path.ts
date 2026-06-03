/**
 * Same-origin streaming proxy to alocare-api (app/upstream-api route).
 * Must NOT live under /api/* — Vercel applies the 4.5 MB limit to /api routes.
 */
export const UPSTREAM_UPLOAD_PREFIX = "/upstream-api";

export function upstreamUploadUrl(reportId: string): string {
  return `${UPSTREAM_UPLOAD_PREFIX}/reports/${reportId}/upload`;
}

/** Vercel Hobby/Pro ingress limit per request (multipart). */
export const VERCEL_MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;
