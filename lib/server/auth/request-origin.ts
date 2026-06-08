import { getEnv } from "@/lib/server/config";

export function normalizeOrigin(origin: string): string {
  return origin.replace(/\/$/, "");
}

function originFromHeaders(headers: Headers): string | null {
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host) return null;
  const hostName = host.split(",")[0]!.trim();
  const isLocal =
    hostName.startsWith("localhost") ||
    hostName.startsWith("127.0.0.1") ||
    hostName.startsWith("[::1]");
  const proto = headers.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");
  return normalizeOrigin(`${proto}://${hostName}`);
}

export function getRequestOrigin(request?: Request, headersList?: Headers): string {
  const headers = headersList ?? request?.headers;
  const fromHeaders = headers ? originFromHeaders(headers) : null;
  if (fromHeaders) return fromHeaders;

  if (request) {
    return normalizeOrigin(new URL(request.url).origin);
  }

  return normalizeOrigin(getEnv().NEXT_PUBLIC_APP_URL);
}

export function getGoogleCallbackRedirectUri(origin: string): string {
  return `${normalizeOrigin(origin)}/api/auth/callback/google`;
}
