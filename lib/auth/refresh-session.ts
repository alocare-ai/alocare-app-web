/** Refresh httpOnly auth cookies via the BFF before long-lived or streaming requests. */
export async function refreshSessionCookies(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
