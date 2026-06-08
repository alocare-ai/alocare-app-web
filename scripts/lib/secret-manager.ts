import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { applyProjectLocalGoogleCredentials } from "./apply-project-adc";

let client: SecretManagerServiceClient | null = null;

function defaultProjectId(): string {
  return process.env.GOOGLE_CLOUD_PROJECT_ID?.trim() || "personal-suherman";
}

function getClient(projectId: string): SecretManagerServiceClient {
  if (!client) {
    client = new SecretManagerServiceClient({ projectId });
  }
  return client;
}

export function resetSecretManagerClient(): void {
  client = null;
}

export async function getSecret(
  secretName: string,
  projectId: string = defaultProjectId(),
): Promise<string> {
  applyProjectLocalGoogleCredentials();

  const isLocalDev =
    process.env.NODE_ENV !== "production" &&
    !process.env.K_SERVICE &&
    !process.env.K_REVISION &&
    !process.env.GOOGLE_APPLICATION_CREDENTIALS;

  try {
    const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;
    const secretClient = getClient(projectId);
    const [version] = await secretClient.accessSecretVersion({ name });

    if (!version.payload?.data) {
      throw new Error(`Secret ${secretName} has no data`);
    }

    return version.payload.data.toString();
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number; status?: number };
    const errorMessage = err?.message || String(error);
    const errorCode = err?.code || err?.status || "UNKNOWN";
    const isAuthError =
      errorCode === 16 ||
      err?.status === 16 ||
      errorMessage.includes("UNAUTHENTICATED") ||
      errorMessage.includes("authentication credential");

    if (isAuthError && isLocalDev) {
      throw new Error("Secret Manager authentication not available in local development");
    }

    if (isAuthError) {
      resetSecretManagerClient();
      throw new Error(
        `Authentication failed when accessing secret "${secretName}" in project ${projectId}. ` +
          `Run: npm run login`,
      );
    }

    if (errorCode === 7 || errorMessage.includes("PERMISSION_DENIED")) {
      throw new Error(
        `Permission denied accessing secret "${secretName}" in project ${projectId}. ` +
          `Grant roles/secretmanager.secretAccessor to your account or local dev SA.`,
      );
    }

    if (errorCode === 5 || errorMessage.includes("NOT_FOUND")) {
      throw new Error(`Secret "${secretName}" not found in project ${projectId}.`);
    }

    throw new Error(`Failed to fetch secret "${secretName}" from Secret Manager: ${errorMessage}`);
  }
}

export async function getSecretWithFallbacks(
  secretNames: string[],
  projectId: string = defaultProjectId(),
): Promise<{ value: string; secretName: string }> {
  const errors: string[] = [];
  for (const secretName of secretNames) {
    try {
      const value = await getSecret(secretName, projectId);
      if (value.trim()) {
        return { value: value.trim(), secretName };
      }
      errors.push(`${secretName}: empty value`);
    } catch (error) {
      errors.push(`${secretName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(errors.join(" | "));
}
