import type { LoginResult } from "@/lib/auth/session";
import type { TokenResponse, UserProfile } from "@/lib/types/api";
import { ApiError, apiFetch } from "./client";

export async function login(
  email: string,
  password: string,
): Promise<UserProfile> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(body.error ?? "Login failed", res.status, body.error);
  }

  const body = (await res.json()) as LoginResult;
  if (!body.user?.id) {
    throw new ApiError("Login succeeded but profile could not be loaded", 500);
  }

  return body.user;
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

export async function refreshToken(): Promise<TokenResponse> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Session expired");
  }
  return res.json() as Promise<TokenResponse>;
}

export async function getMe(): Promise<UserProfile> {
  return apiFetch<UserProfile>("/users/me");
}
