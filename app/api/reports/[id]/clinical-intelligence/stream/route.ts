import {
  getAccessTokenForBff,
  maybeAttachRefreshedCookies,
  refreshAccessTokenFromCookies,
} from "@/lib/api/bff-auth";
import { getApiUpstreamBase } from "@/lib/api/upstream";

export const maxDuration = 300;
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(request.url);
  const preferredLanguage = url.searchParams.get("preferredLanguage") ?? "en";

  const initial = await getAccessTokenForBff();
  let token = initial.token;
  let tokensToSet = initial.refreshed;

  if (!token) {
    return new Response(JSON.stringify({ detail: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const fetchUpstream = (accessToken: string) =>
    fetch(
      `${getApiUpstreamBase()}/reports/${id}/clinical-intelligence/stream?preferredLanguage=${encodeURIComponent(preferredLanguage)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "text/event-stream",
        },
        cache: "no-store",
      },
    );

  let upstream = await fetchUpstream(token);

  if (upstream.status === 401) {
    const retry = await refreshAccessTokenFromCookies();
    if (retry.token) {
      token = retry.token;
      tokensToSet = retry.refreshed ?? tokensToSet;
      upstream = await fetchUpstream(token);
    }
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    return new Response(detail || "Clinical intelligence stream failed", {
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
