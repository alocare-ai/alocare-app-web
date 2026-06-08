import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { getPostLoginPath } from "@/lib/auth/post-login";
import { upstreamGetJson, upstreamPostJson } from "@/lib/api/upstream";
import { exchangePortalGoogleCode } from "@/lib/server/auth/google";
import {
  getGoogleCallbackRedirectUri,
  getRequestOrigin,
} from "@/lib/server/auth/request-origin";
import { getEnv } from "@/lib/server/config";
import type { TokenResponse, UserProfile } from "@/lib/types/api";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const from = url.searchParams.get("state") ?? "/dashboard";
  const appUrl = getEnv().NEXT_PUBLIC_APP_URL.replace(/\/$/, "");

  if (error || !code) {
    return NextResponse.redirect(`${appUrl}/login?error=oauth`);
  }

  try {
    const redirectUri = getGoogleCallbackRedirectUri(getRequestOrigin(request));
    const tokens = await exchangePortalGoogleCode(code, redirectUri);

    if (!tokens.id_token) {
      throw new Error("Google response missing id_token");
    }

    const loginResult = await upstreamPostJson<TokenResponse>("/auth/google", {
      id_token: tokens.id_token,
    });

    if (!loginResult.ok) {
      console.error("Portal Google login failed:", loginResult.failure);
      if (
        loginResult.failure.status === 404 ||
        loginResult.failure.kind === "unreachable" ||
        loginResult.failure.kind === "misconfigured"
      ) {
        return NextResponse.redirect(`${appUrl}/login?error=api`);
      }
      if (
        loginResult.failure.status === 401 ||
        loginResult.failure.status === 403 ||
        loginResult.failure.kind === "invalid_credentials"
      ) {
        return NextResponse.redirect(`${appUrl}/login?error=forbidden`);
      }
      return NextResponse.redirect(`${appUrl}/login?error=oauth`);
    }

    const apiTokens = loginResult.data;
    const profileResult = await upstreamGetJson<UserProfile>(
      "/users/me",
      apiTokens.access_token,
    );

    if (!profileResult.ok) {
      return NextResponse.redirect(`${appUrl}/login?error=oauth`);
    }

    const user = profileResult.data;
    const destination = getPostLoginPath(user, from);
    const response = NextResponse.redirect(`${appUrl}${destination}`);
    response.cookies.set(AUTH_COOKIES.access, apiTokens.access_token, {
      ...COOKIE_OPTS,
      maxAge: 60 * 60,
    });
    response.cookies.set(AUTH_COOKIES.refresh, apiTokens.refresh_token, {
      ...COOKIE_OPTS,
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    console.error("Google OAuth callback failed:", err);
    return NextResponse.redirect(`${appUrl}/login?error=oauth`);
  }
}
