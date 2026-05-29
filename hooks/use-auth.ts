"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/auth";

export function useAuth() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 1,
    staleTime: 60_000,
  });
}
