import type { UserProfile } from "@/lib/types/api";

const PENDING_KEY = "alocare_pending_google_link";
const DISMISSED_PREFIX = "alocare_google_connect_dismissed_";

export function markPendingGoogleConnect(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(PENDING_KEY, "1");
}

export function clearPendingGoogleConnect(): void {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(PENDING_KEY);
}

export function hasPendingGoogleConnect(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(PENDING_KEY) === "1";
}

export function dismissGoogleConnectPrompt(userId: string): void {
  clearPendingGoogleConnect();
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(`${DISMISSED_PREFIX}${userId}`, "1");
}

export function isGoogleConnectDismissed(userId: string): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem(`${DISMISSED_PREFIX}${userId}`) === "1";
}

export function shouldPromptGoogleConnect(
  user: UserProfile,
  googleEnabled: boolean,
): boolean {
  if (!googleEnabled) return false;
  if (user.google_linked) return false;
  if (user.google_sign_in_disabled) return false;
  if (isGoogleConnectDismissed(user.id)) return false;
  return hasPendingGoogleConnect();
}

export function googleNotLinkedLoginMessage(locale: "en" | "id"): {
  title: string;
  body: string;
} {
  if (locale === "id") {
    return {
      title: "Akun Google belum terhubung",
      body: "Masuk dengan email dan kata sandi portal Anda di bawah ini. Setelah masuk, Anda dapat menghubungkan Google untuk login lebih cepat di lain waktu.",
    };
  }
  return {
    title: "Google account not linked yet",
    body: "Sign in below with your portal email and password. After signing in, you can connect Google for faster sign-in next time.",
  };
}
