import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { getApiUpstreamBase } from "@/lib/api/upstream";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const EMPTY_BODY_STATUSES = new Set([204, 205, 304]);

function buildProxyResponse(
  status: number,
  body: string,
  contentType: string | null,
): NextResponse {
  if (EMPTY_BODY_STATUSES.has(status)) {
    return new NextResponse(null, { status });
  }

  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": contentType ?? "application/json",
    },
  });
}

async function refreshAccessToken(
  refresh: string,
): Promise<{ access_token: string; refresh_token: string } | null> {
  try {
    const res = await fetch(`${getApiUpstreamBase()}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!res.ok) return null;
    return (await res.json()) as {
      access_token: string;
      refresh_token: string;
    };
  } catch {
    return null;
  }
}

async function forward(
  request: NextRequest,
  path: string,
  token?: string,
): Promise<NextResponse> {
  const url = `${getApiUpstreamBase()}${path}${request.nextUrl.search}`;
  const contentType = request.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isMultipart) headers["Content-Type"] = "application/json";

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    if (isMultipart) {
      init.body = await request.arrayBuffer();
      headers["Content-Type"] = contentType;
    } else {
      const body = await request.text();
      if (body) init.body = body;
    }
  }

  const upstream = await fetch(url, init);
  const responseBody = await upstream.text();

  return buildProxyResponse(
    upstream.status,
    responseBody,
    upstream.headers.get("content-type"),
  );
}

async function proxyRequest(
  request: NextRequest,
  path: string,
): Promise<NextResponse> {
  const jar = await cookies();
  const access = jar.get(AUTH_COOKIES.access)?.value;
  const refresh = jar.get(AUTH_COOKIES.refresh)?.value;

  let response = await forward(request, path, access);

  if (response.status === 401 && refresh) {
    const tokens = await refreshAccessToken(refresh);
    if (tokens) {
      response = await forward(request, path, tokens.access_token);
      const nextResponse = buildProxyResponse(
        response.status,
        await response.text(),
        response.headers.get("content-type"),
      );
      nextResponse.cookies.set(AUTH_COOKIES.access, tokens.access_token, {
        ...COOKIE_OPTS,
        maxAge: 60 * 60,
      });
      nextResponse.cookies.set(AUTH_COOKIES.refresh, tokens.refresh_token, {
        ...COOKIE_OPTS,
        maxAge: 60 * 60 * 24 * 7,
      });
      return nextResponse;
    }
  }

  return response;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, `/${path.join("/")}`);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, `/${path.join("/")}`);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, `/${path.join("/")}`);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, `/${path.join("/")}`);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, `/${path.join("/")}`);
}
