import { NextRequest, NextResponse } from "next/server";
import {
  upstreamFailureResponse,
  upstreamPostJson,
} from "@/lib/api/upstream";

type MessageResponse = {
  message: string;
};

export async function POST(request: NextRequest) {
  const { email, language } = (await request.json()) as {
    email: string;
    language: string;
  };

  const result = await upstreamPostJson<MessageResponse>(
    "/auth/resend-verification",
    { email, language },
  );

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return NextResponse.json(result.data);
}
