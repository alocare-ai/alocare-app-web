import { proxyAuthenticatedSse } from "@/lib/api/bff-sse-proxy";

/** Long-running SSE proxy (production analyze uses direct API from the browser). */
export const maxDuration = 300;
export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  return proxyAuthenticatedSse("/ai/analyze/stream", body);
}
