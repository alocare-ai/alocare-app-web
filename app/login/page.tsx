import { PortalLoginForm } from "@/components/auth/portal-login-form";
import { getEnv } from "@/lib/server/config";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const googleEnabled = Boolean(getEnv().PORTAL_GOOGLE_CLIENT_ID);

  return <PortalLoginForm googleEnabled={googleEnabled} />;
}
