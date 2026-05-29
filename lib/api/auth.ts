import type { TokenResponse, UserProfile } from "@/lib/types/api";
import { apiFetch } from "./client";

export async function login(email: string, password: string): Promise<void> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Login failed");
  }
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
