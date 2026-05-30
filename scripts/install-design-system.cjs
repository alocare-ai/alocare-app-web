/**
 * Install @alocare/design-system without npm git+ssh (Vercel has no deploy keys).
 *
 * - Local: use sibling ../alocare-design-system when present
 * - CI/Vercel: download GitHub tarball with GITHUB_TOKEN (private repo)
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const targetDir = path.join(root, "node_modules", "@alocare", "design-system");
const distEntry = path.join(targetDir, "dist", "index.js");

const REPO = "alocare-ai/alocare-design-system";
const DEFAULT_REF = "472d7c5f72e901a6df5027219bcf301d0b043cfb";

function run(cmd, opts = {}) {
  execSync(cmd, {
    stdio: "inherit",
    env: { ...process.env, CI: "true", ...opts.env },
    ...opts,
  });
}

function shouldForceRebuild() {
  return (
    process.env.VERCEL === "1" ||
    process.env.CI === "true" ||
    process.argv.includes("--force")
  );
}

function siblingDesignSystemDir() {
  return path.join(root, "..", "alocare-design-system");
}

function copyLocalSibling() {
  const sibling = siblingDesignSystemDir();
  if (!fs.existsSync(path.join(sibling, "package.json"))) {
    return false;
  }
  console.log("[install-design-system] Using local", sibling);
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.cpSync(sibling, targetDir, { recursive: true });
  return true;
}

function downloadFromGitHub(ref) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error(
      "[install-design-system] GITHUB_TOKEN is required on Vercel/CI to install the private design-system repo.",
    );
    console.error(
      "[install-design-system] Create a GitHub PAT with read access to alocare-design-system and add it in Vercel → Environment Variables.",
    );
    console.error(
      "[install-design-system] For local dev, clone alocare-design-system next to this repo or set GITHUB_TOKEN.",
    );
    process.exit(1);
  }

  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "alocare-ds-"));
  const tarball = path.join(tmp, "design-system.tar.gz");

  console.log(`[install-design-system] Downloading ${REPO}@${ref} from GitHub API…`);
  run(
    `curl -fsSL -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github+json" ` +
      `"https://api.github.com/repos/${REPO}/tarball/${ref}" -o "${tarball}"`,
  );
  run(`tar -xzf "${tarball}" -C "${tmp}"`);

  const extracted = fs
    .readdirSync(tmp)
    .filter((name) => name !== "design-system.tar.gz")
    .map((name) => path.join(tmp, name))
    .find((p) => fs.statSync(p).isDirectory());

  if (!extracted) {
    console.error("[install-design-system] Tarball extract failed");
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.cpSync(extracted, targetDir, { recursive: true });
  fs.rmSync(tmp, { recursive: true, force: true });
}

function ensureBuilt() {
  if (!fs.existsSync(path.join(targetDir, "package.json"))) {
    console.error("[install-design-system] Package missing at", targetDir);
    process.exit(1);
  }

  const force = shouldForceRebuild();
  if (fs.existsSync(distEntry) && !force) {
    console.log("[install-design-system] dist/index.js present");
    return;
  }

  if (force && fs.existsSync(distEntry)) {
    console.log("[install-design-system] Rebuilding design-system…");
  } else {
    console.log("[install-design-system] Building design-system…");
  }

  run("npm install", { cwd: targetDir });
  run("npm run build", { cwd: targetDir });

  if (!fs.existsSync(distEntry)) {
    console.error("[install-design-system] Build failed: dist/index.js missing");
    process.exit(1);
  }
}

function ensureDistTypes() {
  const distTypes = path.join(targetDir, "dist", "index.d.ts");
  if (fs.existsSync(distTypes)) {
    return;
  }
  const distSrcTypes = path.join(targetDir, "dist", "src", "index.d.ts");
  if (fs.existsSync(distSrcTypes)) {
    fs.writeFileSync(distTypes, 'export * from "./src/index";\n');
  }
}

function main() {
  const ref = process.env.DESIGN_SYSTEM_REF || DEFAULT_REF;
  const force = shouldForceRebuild();
  const isCi = process.env.VERCEL === "1" || process.env.CI === "true";

  if (!fs.existsSync(targetDir) || force) {
    if (!isCi && copyLocalSibling()) {
      // ok
    } else {
      downloadFromGitHub(ref);
    }
  } else {
    console.log("[install-design-system] Already installed at node_modules/@alocare/design-system");
  }

  ensureBuilt();
  ensureDistTypes();
  console.log("[install-design-system] Ready");
}

main();
