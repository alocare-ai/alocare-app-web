import { cookies } from "next/headers";

import {
  getAccessTokenForBff,
  maybeAttachRefreshedCookies,
  refreshAccessTokenFromCookies,
  type RefreshedTokens,
} from "@/lib/api/bff-auth";
import { getApiUpstreamBase } from "@/lib/api/upstream";
import { AUTH_COOKIES } from "@/lib/auth/cookies";

export async function proxyAuthenticatedSse(
  upstreamPath: string,
  body: string,
): Promise<Response> {
  const jar = await cookies();
  const refreshCookie = jar.get(AUTH_COOKIES.refresh)?.value;

  let { token, refreshed } = await getAccessTokenForBff();
  let tokensToSet: RefreshedTokens | null = refreshed;

  if (!token) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let upstream = await fetch(`${getApiUpstreamBase()}${upstreamPath}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body,
    cache: "no-store",
  });

  if (upstream.status === 401 && refreshCookie) {
    const retry = await refreshAccessTokenFromCookies();
    if (retry.token) {
      token = retry.token;
      tokensToSet = retry.refreshed ?? tokensToSet;
      upstream = await fetch(`${getApiUpstreamBase()}${upstreamPath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body,
        cache: "no-store",
      });
    }
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    return new Response(detail || "Upstream stream failed", {
      status: upstream.status,
    });
  }

  const response = new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });

  return maybeAttachRefreshedCookies(response, tokensToSet);
}
