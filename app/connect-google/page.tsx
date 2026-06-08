import { ConnectGooglePrompt } from "@/components/auth/connect-google-prompt";
import { getEnv } from "@/lib/server/config";

export const dynamic = "force-dynamic";

export default function ConnectGooglePage() {
  const googleEnabled = Boolean(getEnv().PORTAL_GOOGLE_CLIENT_ID);

  return <ConnectGooglePrompt googleEnabled={googleEnabled} />;
}
