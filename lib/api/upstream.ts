/**
 * Upstream alocare-api URL for server-side BFF routes (not browser-facing).
 * In development, default to local :8080 so `npm run dev` stack works without
 * editing .env when NEXT_PUBLIC_API_URL points at production.
 */
const PRODUCTION_API_DEFAULT = "https://api.alocare.net";

function normalizeBaseUrl(raw: string | undefined, fallback: string): string {
  const trimmed = raw?.trim();
  const base = trimmed && trimmed.length > 0 ? trimmed : fallback;
  return base.replace(/\/$/, "");
}

export function getApiUpstreamBase(): string {
  if (process.env.API_PROXY_URL) {
    return normalizeBaseUrl(process.env.API_PROXY_URL, PRODUCTION_API_DEFAULT);
  }
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:8080";
  }
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_API_URL,
    PRODUCTION_API_DEFAULT,
  );
}

export type UpstreamFailureKind =
  | "misconfigured"
  | "unreachable"
  | "invalid_credentials"
  | "upstream_error";

export type UpstreamFailure = {
  kind: UpstreamFailureKind;
  message: string;
  hint?: string;
  upstream: string;
  status?: number;
};

/** Detect common Vercel env mistakes before calling the API. */
export function getUpstreamMisconfigurationHint(base: string): string | null {
  if (process.env.NODE_ENV !== "production") return null;

  let host: string;
  try {
    host = new URL(base).hostname.toLowerCase();
  } catch {
    return `NEXT_PUBLIC_API_URL / API_PROXY_URL is not a valid URL (${base}). Set https://api.alocare.net in Vercel and redeploy.`;
  }

  if (host === "localhost" || host === "127.0.0.1") {
    return "Server-side API URL points at localhost. In Vercel → Environment Variables, set NEXT_PUBLIC_API_URL and API_PROXY_URL to https://api.alocare.net, then redeploy.";
  }
  if (host === "app.alocare.net") {
    return "NEXT_PUBLIC_API_URL must be https://api.alocare.net (the API host), not https://app.alocare.net (the portal).";
  }
  if (host.endsWith("alocare.net") && !host.startsWith("api.")) {
    return `API URL host is ${host}; production should use https://api.alocare.net.`;
  }
  return null;
}

function extractApiDetail(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const detail = (body as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "object" && first && "msg" in first) {
      return String((first as { msg: unknown }).msg);
    }
  }
  return undefined;
}

function isInvalidCredentials(status: number, detail?: string): boolean {
  if (status !== 401 && status !== 403) return false;
  const lower = detail?.toLowerCase() ?? "";
  return (
    lower.includes("invalid email") ||
    lower.includes("email or password") ||
    lower.includes("incorrect") ||
    !detail
  );
}

function failureStatus(failure: UpstreamFailure): number {
  switch (failure.kind) {
    case "invalid_credentials":
      return 401;
    case "misconfigured":
    case "unreachable":
      return 503;
    default:
      return failure.status && failure.status >= 500 ? 503 : 502;
  }
}

export function upstreamFailureResponse(failure: UpstreamFailure): Response {
  return Response.json(
    {
      error: failure.message,
      code: failure.kind,
      ...(failure.hint ? { hint: failure.hint } : {}),
    },
    { status: failureStatus(failure) },
  );
}

export async function upstreamPostJson<T>(
  path: string,
  body: unknown,
  options?: { token?: string },
): Promise<{ ok: true; data: T } | { ok: false; failure: UpstreamFailure }> {
  const upstream = getApiUpstreamBase();
  const misconfigured = getUpstreamMisconfigurationHint(upstream);
  if (misconfigured) {
    return {
      ok: false,
      failure: {
        kind: "misconfigured",
        message: "Sign-in service is misconfigured.",
        hint: misconfigured,
        upstream,
      },
    };
  }

  const url = `${upstream}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      failure: {
        kind: "unreachable",
        message: "Could not reach the API. Try again shortly.",
        hint: `Server could not connect to ${upstream}. Confirm api.alocare.net is up and Vercel env NEXT_PUBLIC_API_URL / API_PROXY_URL point there.`,
        upstream,
      },
    };
  }

  const text = await res.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (res.ok) {
    return { ok: true, data: parsed as T };
  }

  const detail = extractApiDetail(parsed);
  const contentType = res.headers.get("content-type") ?? "";

  if (
    res.status === 404 ||
    (res.status >= 400 && !contentType.includes("application/json"))
  ) {
    return {
      ok: false,
      failure: {
        kind: "misconfigured",
        message: "Sign-in service returned an unexpected response.",
        hint: `POST ${url} returned HTTP ${res.status}. Use https://api.alocare.net as NEXT_PUBLIC_API_URL / API_PROXY_URL in Vercel, not the app URL.`,
        upstream,
        status: res.status,
      },
    };
  }

  if (isInvalidCredentials(res.status, detail)) {
    return {
      ok: false,
      failure: {
        kind: "invalid_credentials",
        message: detail ?? "Invalid email or password",
        upstream,
        status: res.status,
      },
    };
  }

  return {
    ok: false,
    failure: {
      kind: "upstream_error",
      message: detail ?? "Sign-in service error. Try again later.",
      hint:
        res.status >= 500
          ? `API at ${upstream} returned HTTP ${res.status}.`
          : undefined,
      upstream,
      status: res.status,
    },
  };
}

export async function upstreamGetJson<T>(
  path: string,
  token: string,
): Promise<{ ok: true; data: T } | { ok: false; failure: UpstreamFailure }> {
  const upstream = getApiUpstreamBase();
  const misconfigured = getUpstreamMisconfigurationHint(upstream);
  if (misconfigured) {
    return {
      ok: false,
      failure: {
        kind: "misconfigured",
        message: "Profile service is misconfigured.",
        hint: misconfigured,
        upstream,
      },
    };
  }

  const url = `${upstream}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return {
      ok: false,
      failure: {
        kind: "unreachable",
        message: "Could not reach the API after sign-in.",
        hint: `Server could not connect to ${upstream}.`,
        upstream,
      },
    };
  }

  const text = await res.text();
  let parsed: unknown = null;
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (res.ok) {
    return { ok: true, data: parsed as T };
  }

  const detail = extractApiDetail(parsed);
  return {
    ok: false,
    failure: {
      kind: res.status === 401 ? "invalid_credentials" : "upstream_error",
      message:
        detail ??
        (res.status === 401
          ? "Session invalid after sign-in."
          : "Profile could not be loaded."),
      upstream,
      status: res.status,
    },
  };
}
