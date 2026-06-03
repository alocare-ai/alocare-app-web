import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { getApiUpstreamBase } from "@/lib/api/upstream";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export type RefreshedTokens = {
  access_token: string;
  refresh_token: string;
};

export async function refreshAccessToken(
  refresh: string,
): Promise<RefreshedTokens | null> {
  try {
    const res = await fetch(`${getApiUpstreamBase()}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!res.ok) return null;
    return (await res.json()) as RefreshedTokens;
  } catch {
    return null;
  }
}

/** Access token for BFF upstream calls; refreshes when access cookie is missing. */
export async function getAccessTokenForBff(): Promise<{
  token: string | null;
  refreshed: RefreshedTokens | null;
}> {
  const jar = await cookies();
  const access = jar.get(AUTH_COOKIES.access)?.value ?? null;
  const refresh = jar.get(AUTH_COOKIES.refresh)?.value;

  if (access) {
    return { token: access, refreshed: null };
  }

  if (!refresh) {
    return { token: null, refreshed: null };
  }

  const tokens = await refreshAccessToken(refresh);
  if (!tokens) {
    return { token: null, refreshed: null };
  }

  return { token: tokens.access_token, refreshed: tokens };
}

export async function refreshAccessTokenFromCookies(): Promise<{
  token: string | null;
  refreshed: RefreshedTokens | null;
}> {
  const jar = await cookies();
  const refresh = jar.get(AUTH_COOKIES.refresh)?.value;
  if (!refresh) {
    return { token: null, refreshed: null };
  }

  const tokens = await refreshAccessToken(refresh);
  if (!tokens) {
    return { token: null, refreshed: null };
  }

  return { token: tokens.access_token, refreshed: tokens };
}

export function withRefreshedAuthCookies(
  response: Response,
  tokens: RefreshedTokens,
): NextResponse {
  const next = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  next.cookies.set(AUTH_COOKIES.access, tokens.access_token, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60,
  });
  next.cookies.set(AUTH_COOKIES.refresh, tokens.refresh_token, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60 * 24 * 7,
  });
  return next;
}

export function maybeAttachRefreshedCookies(
  response: Response,
  refreshed: RefreshedTokens | null,
): Response | NextResponse {
  if (!refreshed) return response;
  return withRefreshedAuthCookies(response, refreshed);
}
