export const AUTH_COOKIES = {
  access: "alocare_access_token",
  refresh: "alocare_refresh_token",
} as const;

export const PROTECTED_PREFIXES = [
  "/dashboard",
  "/reports",
  "/chat",
  "/patients",
  "/consultations",
  "/enterprise",
  "/telemedicine",
  "/settings",
  "/connect-google",
] as const;
