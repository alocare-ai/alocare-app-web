import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Self-registration is disabled. Contact your administrator for an account.",
    },
    { status: 403 },
  );
}
