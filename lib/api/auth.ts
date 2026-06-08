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
    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      detail?: string;
      hint?: string;
      code?: string;
    };
    const message = body.error ?? body.detail ?? "Login failed";
    const detail = body.hint ? `${message}\n\n${body.hint}` : message;
    throw new ApiError(message, res.status, detail);
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

export type RegisterPayload = {
  email: string;
  password: string;
  full_name: string;
  role: "PATIENT" | "DOCTOR" | "CLINICIAN";
  language: string;
};

export type RegisterResult = {
  message: string;
  email: string;
};

export async function register(payload: RegisterPayload): Promise<RegisterResult> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await res.json().catch(() => ({}))) as {
    message?: string;
    email?: string;
    error?: string;
    detail?: string;
  };

  if (!res.ok) {
    throw new ApiError(
      body.error ?? body.detail ?? "Registration failed",
      res.status,
      body.detail,
    );
  }

  return {
    message: body.message ?? "Registration successful.",
    email: body.email ?? payload.email,
  };
}

export async function verifyEmail(token: string): Promise<string> {
  const res = await fetch("/api/auth/verify-email", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const body = (await res.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
    detail?: string;
  };

  if (!res.ok) {
    throw new ApiError(
      body.error ?? body.detail ?? "Verification failed",
      res.status,
      body.detail,
    );
  }

  return body.message ?? "Email verified successfully.";
}

export async function resendVerification(
  email: string,
  language: string,
): Promise<string> {
  const res = await fetch("/api/auth/resend-verification", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, language }),
  });

  const body = (await res.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
    detail?: string;
  };

  if (!res.ok) {
    throw new ApiError(
      body.error ?? body.detail ?? "Could not resend verification email",
      res.status,
      body.detail,
    );
  }

  return body.message ?? "Verification email sent.";
}
