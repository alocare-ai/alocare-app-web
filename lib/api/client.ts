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

async function backendFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  return fetch(`/api/backend${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  let res = await backendFetch(path, options);

  if (res.status === 401) {
    const refreshed = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (refreshed.ok) {
      res = await backendFetch(path, options);
    }
  }

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
