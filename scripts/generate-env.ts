#!/usr/bin/env tsx
/**
 * Generate .env from .env.example and populate secrets from Secret Manager.
 *
 * Usage:
 *   npm run generate-env
 *   npm run generate-env -- --force
 *
 * Prerequisites:
 *   npm run login
 *   npm run seed-secrets   (first time — upload .env values to Secret Manager)
 */

import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { applyProjectLocalGoogleCredentials } from "./lib/apply-project-adc";
import { getSecretWithFallbacks } from "./lib/secret-manager";

const projectRoot = path.resolve(__dirname, "..");
const secretMapPath = path.join(projectRoot, "scripts", "secret-env-map.json");

type SecretMapping = {
  secrets: string[];
  optional?: boolean;
};

const SECRET_MAPPINGS: Record<string, SecretMapping> = JSON.parse(
  fs.readFileSync(secretMapPath, "utf-8"),
);

const HELP_FLAG = "--help";
const H_FLAG = "-h";
const FORCE_FLAG = "--force";

function defaultProjectId(): string {
  return process.env.GOOGLE_CLOUD_PROJECT_ID?.trim() || "personal-suherman";
}

function printUsage(exitCode: number): never {
  console.log(chalk.bold("Generate .env for alocare-app-web"));
  console.log("");
  console.log("  npm run generate-env");
  console.log("  npm run generate-env -- --force   Overwrite existing .env from template");
  process.exit(exitCode);
}

function readEnvFromFile(envPath: string, key: string): string | null {
  if (!fs.existsSync(envPath)) return null;
  const content = fs.readFileSync(envPath, "utf-8");
  const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function readEnvFromCandidates(key: string): string | null {
  for (const rel of [".env.example", ".env"]) {
    const value = readEnvFromFile(path.join(projectRoot, rel), key);
    if (value) return value;
  }
  return null;
}

function resolveInitialEnvContent(force: boolean): { content: string; source: string } {
  const envExamplePath = path.join(projectRoot, ".env.example");
  const envPath = path.join(projectRoot, ".env");

  if (!fs.existsSync(envExamplePath)) {
    throw new Error(`.env.example not found at ${envExamplePath}`);
  }

  if (fs.existsSync(envPath) && !force) {
    return {
      content: fs.readFileSync(envPath, "utf-8"),
      source: ".env",
    };
  }

  return {
    content: fs.readFileSync(envExamplePath, "utf-8"),
    source: ".env.example",
  };
}

function formatEnvValue(value: string): string {
  if (/[\s#"'\\]/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

async function generateEnvFile(): Promise<void> {
  if (process.env.VERCEL || process.env.CI) {
    console.log("generate-env: skipped on Vercel/CI (use project environment variables)");
    process.exit(0);
  }

  const argv = process.argv.slice(2);
  if (argv.includes(HELP_FLAG) || argv.includes(H_FLAG)) printUsage(0);

  const force = argv.includes(FORCE_FLAG);
  applyProjectLocalGoogleCredentials();

  const envExamplePath = path.join(projectRoot, ".env.example");
  const envPath = path.join(projectRoot, ".env");
  const projectId =
    readEnvFromCandidates("GOOGLE_CLOUD_PROJECT_ID") || defaultProjectId();

  console.log(chalk.bold("Generate .env for alocare-app-web\n"));
  console.log("🔧 Template:", envExamplePath);

  const { content: initialContent, source } = resolveInitialEnvContent(force);
  let envContent = initialContent;
  console.log(`✅ Using ${source}`);

  console.log("\n🔐 Fetching secrets from Secret Manager...");
  console.log(`   Project ID: ${projectId}`);

  const secrets: Record<string, string> = {};
  const errors: Array<{ envVar: string; error: string }> = [];

  for (const [envVarName, mapping] of Object.entries(SECRET_MAPPINGS)) {
    const candidates = mapping.secrets.join(" → ");
    try {
      console.log(`   Fetching ${envVarName} (${candidates})...`);
      const { value, secretName } = await getSecretWithFallbacks(mapping.secrets, projectId);
      secrets[envVarName] = value;
      console.log(`   ✅ Fetched ${secretName} → ${envVarName}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (mapping.optional) {
        console.log(chalk.yellow(`   ⚠️  ${envVarName} optional — keeping template value`));
        continue;
      }
      errors.push({ envVar: envVarName, error: errorMessage });
      console.log(`   ❌ Failed to fetch ${envVarName}: ${errorMessage}`);
    }
  }

  for (const [envVarName, secretValue] of Object.entries(secrets)) {
    const formatted = formatEnvValue(secretValue);
    const regex = new RegExp(`^${envVarName}=.*$`, "m");
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${envVarName}=${formatted}`);
    } else {
      envContent = `${envContent.trimEnd()}\n${envVarName}=${formatted}\n`;
    }
  }

  fs.writeFileSync(envPath, envContent, "utf-8");
  console.log(`\n✅ Generated env file at ${envPath}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} required secrets could not be fetched`);
    console.log("   Upload secrets: npm run seed-secrets");
    process.exit(1);
  }

  console.log("\n🎉 Done! Start portal: npm run dev");
}

generateEnvFile()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error generating env file:", error);
    process.exit(1);
  });
