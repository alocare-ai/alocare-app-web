import { ApiError } from "./client";

export type ContactUsPayload = {
  full_name: string;
  email: string;
  message: string;
  organization?: string;
  role_interest?: string;
  language: string;
};

export async function submitContactUs(payload: ContactUsPayload): Promise<string> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await res.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
    detail?: string;
  };

  if (!res.ok) {
    throw new ApiError(
      body.error ?? body.detail ?? "Could not submit your request",
      res.status,
      body.detail,
    );
  }

  return body.message ?? "Thank you. Our team will review your request.";
}
