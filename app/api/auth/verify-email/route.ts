import { NextRequest, NextResponse } from "next/server";
import {
  upstreamFailureResponse,
  upstreamPostJson,
} from "@/lib/api/upstream";

type MessageResponse = {
  message: string;
};

export async function POST(request: NextRequest) {
  const { token } = (await request.json()) as { token: string };

  const result = await upstreamPostJson<MessageResponse>("/auth/verify-email", {
    token,
  });

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return NextResponse.json(result.data);
}
