import { NextRequest } from "next/server";
import { upstreamFailureResponse, upstreamPostJson } from "@/lib/api/upstream";
import type { MessageResponse } from "@/lib/types/api";

export async function POST(request: NextRequest) {
  const { email, language } = (await request.json()) as {
    email: string;
    language?: string;
  };

  const result = await upstreamPostJson<MessageResponse>("/auth/forgot-password", {
    email,
    language: language ?? "en",
  });

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return Response.json(result.data);
}
