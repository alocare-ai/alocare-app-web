/**
 * Upstream alocare-api URL for server-side BFF routes (not browser-facing).
 * In development, default to local :8080 so `npm run dev` stack works without
 * editing .env when NEXT_PUBLIC_API_URL points at production.
 */
export function getApiUpstreamBase(): string {
  if (process.env.API_PROXY_URL) {
    return process.env.API_PROXY_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:8080";
  }
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "https://api.alocare.net"
  );
}
