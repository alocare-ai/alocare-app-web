import { SettingsContent } from "@/components/settings/settings-content";
import { getEnv } from "@/lib/server/config";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const googleEnabled = Boolean(getEnv().PORTAL_GOOGLE_CLIENT_ID);
  return <SettingsContent googleEnabled={googleEnabled} />;
}
