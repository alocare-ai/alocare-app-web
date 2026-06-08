export function getEnv() {
  return {
    PORTAL_GOOGLE_CLIENT_ID: process.env.PORTAL_GOOGLE_CLIENT_ID?.trim() || undefined,
    PORTAL_GOOGLE_CLIENT_SECRET: process.env.PORTAL_GOOGLE_CLIENT_SECRET?.trim() || undefined,
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000",
  };
}
