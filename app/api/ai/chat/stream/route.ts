import { proxyAuthenticatedSse } from "@/lib/api/bff-sse-proxy";

export const maxDuration = 300;
export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  return proxyAuthenticatedSse("/ai/chat/stream", body);
}
