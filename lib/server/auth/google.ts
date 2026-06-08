import { getEnv } from "@/lib/server/config";

export type GoogleTokenResponse = {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
};

export function getPortalGoogleAuthUrl(state: string, origin?: string): string | null {
  const { PORTAL_GOOGLE_CLIENT_ID, NEXT_PUBLIC_APP_URL } = getEnv();
  if (!PORTAL_GOOGLE_CLIENT_ID) return null;

  const baseUrl = (origin ?? NEXT_PUBLIC_APP_URL).replace(/\/$/, "");
  const redirectUri = `${baseUrl}/api/auth/callback/google`;
  const params = new URLSearchParams({
    client_id: PORTAL_GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangePortalGoogleCode(
  code: string,
  redirectUri: string,
): Promise<GoogleTokenResponse> {
  const env = getEnv();

  const body = new URLSearchParams({
    code,
    client_id: env.PORTAL_GOOGLE_CLIENT_ID ?? "",
    client_secret: env.PORTAL_GOOGLE_CLIENT_SECRET ?? "",
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Google token exchange failed: ${detail}`);
  }
  return res.json() as Promise<GoogleTokenResponse>;
}
