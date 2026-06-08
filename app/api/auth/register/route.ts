import { NextRequest, NextResponse } from "next/server";
import {
  upstreamFailureResponse,
  upstreamPostJson,
} from "@/lib/api/upstream";

type RegisterResponse = {
  message: string;
  email: string;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    email: string;
    password: string;
    full_name: string;
    role: string;
    language: string;
  };

  const result = await upstreamPostJson<RegisterResponse>("/auth/register", body);

  if (!result.ok) {
    return upstreamFailureResponse(result.failure);
  }

  return NextResponse.json(result.data, { status: 201 });
}
