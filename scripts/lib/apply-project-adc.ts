import fs from "fs";
import path from "path";

function repositoryRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function localDevServiceAccountKeyPath(): string {
  const explicit = process.env.LOCAL_DEV_GCP_SA_KEY_PATH?.trim();
  if (explicit) {
    return path.isAbsolute(explicit) ? explicit : path.join(repositoryRoot(), explicit);
  }
  const id = process.env.LOCAL_DEV_GCP_SA_ID?.trim() || "alocare-app-web-local";
  return path.join(repositoryRoot(), ".credentials", "keys", `${id}.json`);
}

export function applyLocalDevServiceAccountKeyIfPresent(): void {
  if (process.env.NODE_ENV === "production" || process.env.K_SERVICE) {
    return;
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return;
  }
  const saPath = localDevServiceAccountKeyPath();
  if (!fs.existsSync(saPath)) {
    return;
  }
  try {
    const raw = fs.readFileSync(saPath, "utf8");
    const j = JSON.parse(raw) as { type?: string };
    if (j.type !== "service_account") {
      return;
    }
  } catch {
    return;
  }
  process.env.GOOGLE_APPLICATION_CREDENTIALS = saPath;
}

export function projectLocalApplicationDefaultCredentialsPath(): string {
  return path.join(repositoryRoot(), ".credentials", "gcloud", "application_default_credentials.json");
}

export function applyProjectLocalApplicationDefaultCredentials(): void {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return;
  }
  const adcPath = projectLocalApplicationDefaultCredentialsPath();
  if (fs.existsSync(adcPath)) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = adcPath;
  }
}

export function applyProjectLocalGoogleCredentials(): void {
  applyLocalDevServiceAccountKeyIfPresent();
  applyProjectLocalApplicationDefaultCredentials();
}
