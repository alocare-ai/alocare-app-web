import { NextResponse } from "next/server";
import {
  getAccessTokenForBff,
  maybeAttachRefreshedCookies,
  refreshAccessTokenFromCookies,
} from "@/lib/api/bff-auth";
import { getPublicApiBase } from "@/lib/api/public-api-base";

/**
 * Exposes the httpOnly access token for browser uploads and direct API streaming.
 */
export async function GET() {
  const initial = await getAccessTokenForBff();
  let token = initial.token;
  let tokensToSet = initial.refreshed;

  if (!token) {
    const retry = await refreshAccessTokenFromCookies();
    token = retry.token;
    tokensToSet = retry.refreshed ?? tokensToSet;
  }

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated", code: "no_session" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    apiUrl: getPublicApiBase(),
    accessToken: token,
  });

  return maybeAttachRefreshedCookies(response, tokensToSet);
}
