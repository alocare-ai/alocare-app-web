import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import {
  upstreamFailureResponse,
  upstreamGetJson,
  upstreamPostJson,
} from "@/lib/api/upstream";
import type { TokenResponse, UserProfile } from "@/lib/types/api";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as {
    email: string;
    password: string;
  };

  const loginResult = await upstreamPostJson<TokenResponse>("/auth/login", {
    email,
    password,
  });

  if (!loginResult.ok) {
    return upstreamFailureResponse(loginResult.failure);
  }

  const tokens = loginResult.data;
  const profileResult = await upstreamGetJson<UserProfile>(
    "/users/me",
    tokens.access_token,
  );

  if (!profileResult.ok) {
    const failure = profileResult.failure;
    return NextResponse.json(
      {
        error:
          failure.kind === "invalid_credentials"
            ? "Sign-in succeeded but your session was rejected. Please try again."
            : "Sign-in succeeded but your profile could not be loaded. Please try again or contact support.",
        code: failure.kind,
        ...(failure.hint ? { hint: failure.hint } : {}),
      },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true, user: profileResult.data });
  response.cookies.set(AUTH_COOKIES.access, tokens.access_token, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60,
  });
  response.cookies.set(AUTH_COOKIES.refresh, tokens.refresh_token, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
