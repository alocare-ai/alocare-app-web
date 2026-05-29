"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { getMe, logout } from "@/lib/api/auth";
import { isAuthSessionError } from "@/lib/auth/session";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearing = useRef(false);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!query.isError || clearing.current) return;
    if (!isAuthSessionError(query.error)) return;

    clearing.current = true;
    void logout().then(() => {
      queryClient.removeQueries({ queryKey: ["me"] });
      router.replace("/login?error=session");
    });
  }, [query.isError, query.error, queryClient, router]);

  return query;
}
