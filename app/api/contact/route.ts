import { NextRequest } from "next/server";
import { upstreamFailureResponse, upstreamPostJson } from "@/lib/api/upstream";
import type { MessageResponse } from "@/lib/types/api";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    full_name: string;
    email: string;
    message: string;
    organization?: string;
    role_interest?: string;
    language?: string;
  };

  const result = await upstreamPostJson<MessageResponse>("/auth/contact-us", body);

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return Response.json(result.data);
}
