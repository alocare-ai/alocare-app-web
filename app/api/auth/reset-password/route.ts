import { NextRequest } from "next/server";
import { upstreamFailureResponse, upstreamPostJson } from "@/lib/api/upstream";
import type { MessageResponse } from "@/lib/types/api";

export async function POST(request: NextRequest) {
  const { token, password } = (await request.json()) as {
    token: string;
    password: string;
  };

  const result = await upstreamPostJson<MessageResponse>("/auth/reset-password", {
    token,
    password,
  });

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return Response.json(result.data);
}
