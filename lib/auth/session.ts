import type { UserProfile } from "@/lib/types/api";
import { ApiError } from "@/lib/api/client";

export function isAuthSessionError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;
  if (error.status !== 401) return false;
  const detail = error.detail?.toLowerCase() ?? "";
  return (
    detail.includes("not authenticated") ||
    detail.includes("user not found") ||
    detail.includes("invalid") ||
    detail.includes("expired")
  );
}

export function sessionErrorMessage(
  locale: "en" | "id",
  error?: string | null,
): string {
  if (error === "session") {
    return locale === "id"
      ? "Sesi tidak valid. Silakan masuk lagi."
      : "Your session is invalid. Please sign in again.";
  }
  return locale === "id"
    ? "Email atau kata sandi tidak valid"
    : "Invalid email or password";
}

export type LoginResult = {
  ok: boolean;
  user: UserProfile;
};
