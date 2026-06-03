import { cookies } from "next/headers";

import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { getApiUpstreamBase } from "@/lib/api/upstream";

export async function POST(request: Request) {
  const jar = await cookies();
  const access = jar.get(AUTH_COOKIES.access)?.value;

  if (!access) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.text();

  const upstream = await fetch(`${getApiUpstreamBase()}/ai/chat/stream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body,
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    return new Response(detail || "AI chat stream failed", {
      status: upstream.status,
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
