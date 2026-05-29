import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 0,
};

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIES.access, "", COOKIE_OPTS);
  response.cookies.set(AUTH_COOKIES.refresh, "", COOKIE_OPTS);
  return response;
}
