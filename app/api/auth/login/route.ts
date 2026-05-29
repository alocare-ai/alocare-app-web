import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { createApiClient } from "@/lib/api/client";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    const client = createApiClient();
    const { data: tokens } = await client.post("/auth/login", {
      email,
      password,
    });

    const authed = createApiClient(tokens.access_token);
    const { data: user } = await authed.get("/users/me");

    const response = NextResponse.json({ ok: true, user });
    response.cookies.set(AUTH_COOKIES.access, tokens.access_token, {
      ...COOKIE_OPTS,
      maxAge: 60 * 60,
    });
    response.cookies.set(AUTH_COOKIES.refresh, tokens.refresh_token, {
      ...COOKIE_OPTS,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }
}
