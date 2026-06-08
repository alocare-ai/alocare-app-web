import { NextResponse } from "next/server";
import { getPortalGoogleAuthUrl } from "@/lib/server/auth/google";
import { getRequestOrigin } from "@/lib/server/auth/request-origin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from") ?? "/dashboard";
  const authUrl = getPortalGoogleAuthUrl(from, getRequestOrigin(request));

  if (!authUrl) {
    return NextResponse.json(
      { error: "Portal Google OAuth is not configured." },
      { status: 503 },
    );
  }

  return NextResponse.redirect(authUrl);
}
