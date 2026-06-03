import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { getPublicApiBase } from "@/lib/api/public-api-base";

/**
 * Exposes the httpOnly access token for browser uploads via /api/upstream rewrite
 * (production) or /api/backend BFF (local dev).
 */
export async function GET() {
  const jar = await cookies();
  const accessToken = jar.get(AUTH_COOKIES.access)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Not authenticated", code: "no_session" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    apiUrl: getPublicApiBase(),
    accessToken,
  });
}
