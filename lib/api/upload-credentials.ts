import { getPublicApiBase } from "@/lib/api/public-api-base";

export type UploadCredentials = {
  apiUrl: string;
  accessToken: string;
};

export async function fetchUploadCredentials(): Promise<UploadCredentials> {
  const res = await fetch("/api/auth/upload-token", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new Error(
      "Your session expired. Please sign in again before uploading files.",
    );
  }

  if (!res.ok) {
    throw new Error("Could not prepare file upload. Please try again.");
  }

  const body = (await res.json()) as UploadCredentials;
  if (!body.accessToken?.trim() || !body.apiUrl?.trim()) {
    throw new Error("Could not prepare file upload. Please try again.");
  }

  return {
    apiUrl: body.apiUrl.replace(/\/$/, ""),
    accessToken: body.accessToken,
  };
}

/** Resolve API base for direct uploads (dev: NEXT_PUBLIC_API_URL → local :8080). */
export function resolveDirectUploadApiBase(credentials: UploadCredentials): string {
  return credentials.apiUrl || getPublicApiBase();
}

function extractUploadErrorDetail(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined;
  const detail = (body as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "object" && first && "msg" in first) {
      return String((first as { msg: unknown }).msg);
    }
  }
  return undefined;
}

export async function parseDirectUploadError(res: Response): Promise<string> {
  const fallback =
    res.status === 413
      ? "Upload too large for the server limit."
      : `Upload failed (${res.status})`;

  try {
    const body = (await res.json()) as unknown;
    return extractUploadErrorDetail(body) ?? fallback;
  } catch {
    return fallback;
  }
}

export function directUploadNetworkError(err: unknown, apiUrl: string): string {
  if (err instanceof TypeError) {
    const isLocal =
      apiUrl.includes("127.0.0.1") || apiUrl.includes("localhost");
    if (isLocal) {
      return `Could not reach the API at ${apiUrl}. Start alocare-api (port 8080) or use npm run dev from alocare-tech-stack.`;
    }
    return `Could not reach the API at ${apiUrl}. Ensure CORS_ORIGINS on the API includes https://app.alocare.net.`;
  }
  if (err instanceof Error) return err.message;
  return "Upload failed.";
}
