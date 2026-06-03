import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import {
  upstreamFailureResponse,
  upstreamPostJson,
} from "@/lib/api/upstream";
import type { TokenResponse } from "@/lib/types/api";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST() {
  const jar = await cookies();
  const refresh = jar.get(AUTH_COOKIES.refresh)?.value;

  if (!refresh) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const refreshResult = await upstreamPostJson<TokenResponse>("/auth/refresh", {
    refresh_token: refresh,
  });

  if (!refreshResult.ok) {
    return upstreamFailureResponse(refreshResult.failure);
  }

  const data = refreshResult.data;
  const response = NextResponse.json(data);
  response.cookies.set(AUTH_COOKIES.access, data.access_token, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60,
  });
  response.cookies.set(AUTH_COOKIES.refresh, data.refresh_token, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
