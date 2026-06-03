import axios, { type AxiosInstance } from "axios";
import { getPublicApiBase } from "@/lib/api/public-api-base";

const API_BASE = getPublicApiBase();

export function createApiClient(token?: string): AxiosInstance {
  return axios.create({
    baseURL: API_BASE,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public detail?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`/api/backend${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    let detail: string | undefined;
    try {
      const body = (await res.json()) as { detail?: string };
      detail = typeof body.detail === "string" ? body.detail : undefined;
    } catch {
      /* ignore */
    }
    throw new ApiError(
      detail ?? `Request failed (${res.status})`,
      res.status,
      detail,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
