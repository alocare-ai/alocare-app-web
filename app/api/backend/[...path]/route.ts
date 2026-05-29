import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.alocare.net";

async function forward(
  request: NextRequest,
  path: string,
): Promise<NextResponse> {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIES.access)?.value;

  const url = `${API_BASE}${path}${request.nextUrl.search}`;
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

  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forward(request, `/${path.join("/")}`);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forward(request, `/${path.join("/")}`);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forward(request, `/${path.join("/")}`);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forward(request, `/${path.join("/")}`);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return forward(request, `/${path.join("/")}`);
}
