import { type NextRequest, NextResponse } from "next/server";
import {
  getApiUpstreamBase,
  getUpstreamMisconfigurationHint,
} from "@/lib/api/upstream";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

type RouteContext = { params: Promise<{ path?: string[] }> };

async function proxyToApi(
  request: NextRequest,
  pathSegments: string[],
): Promise<NextResponse> {
  const upstreamBase = getApiUpstreamBase();
  const misconfigured = getUpstreamMisconfigurationHint(upstreamBase);
  if (misconfigured) {
    return NextResponse.json({ detail: misconfigured }, { status: 503 });
  }

  const path = pathSegments.join("/");
  const url = `${upstreamBase}/${path}${request.nextUrl.search}`;

  const headers = new Headers();
  const auth = request.headers.get("authorization");
  if (auth) headers.set("authorization", auth);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const init: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
    init.body = request.body;
    init.duplex = "half";
  }

  const upstream = await fetch(url, init);
  const responseHeaders = new Headers();
  const upstreamType = upstream.headers.get("content-type");
  if (upstreamType) responseHeaders.set("content-type", upstreamType);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

async function handle(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const { path = [] } = await context.params;
  return proxyToApi(request, path);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
