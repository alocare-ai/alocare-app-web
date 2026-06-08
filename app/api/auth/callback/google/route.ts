import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { getPostLoginPath } from "@/lib/auth/post-login";
import { upstreamGetJson, upstreamPostJson } from "@/lib/api/upstream";
import { exchangePortalGoogleCode } from "@/lib/server/auth/google";
import { parseOAuthState } from "@/lib/server/auth/oauth-state";
import {
  getGoogleCallbackRedirectUri,
  getRequestOrigin,
} from "@/lib/server/auth/request-origin";
import { getEnv } from "@/lib/server/config";
import type { MessageResponse, TokenResponse, UserProfile } from "@/lib/types/api";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function googleLoginErrorCode(detail?: string): string {
  const lower = detail?.toLowerCase() ?? "";
  if (lower.includes("not connected")) return "google_not_linked";
  if (lower.includes("no portal account")) return "google_no_account";
  if (lower.includes("disabled")) return "google_disabled";
  return "forbidden";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const { mode, returnPath } = parseOAuthState(url.searchParams.get("state"));
  const appUrl = getEnv().NEXT_PUBLIC_APP_URL.replace(/\/$/, "");

  if (error || !code) {
    const target =
      mode === "link"
        ? `${appUrl}/settings?google=error`
        : `${appUrl}/login?error=oauth`;
    return NextResponse.redirect(target);
  }

  try {
    const redirectUri = getGoogleCallbackRedirectUri(getRequestOrigin(request));
    const tokens = await exchangePortalGoogleCode(code, redirectUri);

    if (!tokens.id_token) {
      throw new Error("Google response missing id_token");
    }

    if (mode === "link") {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get(AUTH_COOKIES.access)?.value;
      if (!accessToken) {
        return NextResponse.redirect(`${appUrl}/login?from=${encodeURIComponent(returnPath)}`);
      }

      const linkResult = await upstreamPostJson<MessageResponse>(
        "/auth/google/link",
        { id_token: tokens.id_token },
        { token: accessToken },
      );

      if (!linkResult.ok) {
        console.error("Portal Google link failed:", linkResult.failure);
        return NextResponse.redirect(`${appUrl}/settings?google=error`);
      }

      return NextResponse.redirect(`${appUrl}/settings?google=linked`);
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
        const code = googleLoginErrorCode(loginResult.failure.message);
        return NextResponse.redirect(`${appUrl}/login?error=${code}`);
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
    const destination = getPostLoginPath(user, returnPath);
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
    const target =
      mode === "link"
        ? `${appUrl}/settings?google=error`
        : `${appUrl}/login?error=oauth`;
    return NextResponse.redirect(target);
  }
}
