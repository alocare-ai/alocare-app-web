/**
 * Copy .env.example to .env (cross-platform).
 * Use --force to overwrite an existing .env
 */
const fs = require("fs");
const path = require("path");

if (process.env.VERCEL || process.env.CI) {
  console.log("generate-env: skipped on Vercel/CI (use project environment variables)");
  process.exit(0);
}

const root = path.join(__dirname, "..");
const examplePath = path.join(root, ".env.example");
const envPath = path.join(root, ".env");
const force = process.argv.includes("--force");

if (!fs.existsSync(examplePath)) {
  console.error("generate-env: .env.example not found at", examplePath);
  process.exit(1);
}

if (fs.existsSync(envPath) && !force) {
  console.log("generate-env: .env already exists — skipped (use --force to overwrite)");
  process.exit(0);
}

fs.copyFileSync(examplePath, envPath);
console.log("generate-env: wrote", envPath, "from .env.example");
