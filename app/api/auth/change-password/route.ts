import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth/cookies";
import { upstreamFailureResponse, upstreamPostJson } from "@/lib/api/upstream";
import type { MessageResponse } from "@/lib/types/api";

export async function POST(request: NextRequest) {
  const jar = await cookies();
  const access = jar.get(AUTH_COOKIES.access)?.value;
  if (!access) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { current_password, new_password } = (await request.json()) as {
    current_password: string;
    new_password: string;
  };

  const result = await upstreamPostJson<MessageResponse>(
    "/auth/change-password",
    { current_password, new_password },
    { token: access },
  );

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return Response.json(result.data);
}
