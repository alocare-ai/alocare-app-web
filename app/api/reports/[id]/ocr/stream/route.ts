import { cookies } from "next/headers";

import { AUTH_COOKIES } from "@/lib/auth/cookies";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.alocare.net";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const jar = await cookies();
  const access = jar.get(AUTH_COOKIES.access)?.value;

  if (!access) {
    return new Response("Unauthorized", { status: 401 });
  }

  const upstream = await fetch(`${API_BASE}/reports/${id}/ocr/stream`, {
    headers: {
      Authorization: `Bearer ${access}`,
      Accept: "text/event-stream",
    },
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    return new Response(detail || "OCR stream failed", {
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
