/**
 * Build @alocare/design-system when installed from GitHub (dist/ is not committed).
 * Skips when dist already exists (local file: install after build).
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const designSystemDir = path.join(root, "node_modules", "@alocare", "design-system");
const distEntry = path.join(designSystemDir, "dist", "index.js");

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit", env: { ...process.env, CI: "true" } });
}

function ensureDistTypes() {
  const distTypes = path.join(designSystemDir, "dist", "index.d.ts");
  const distSrcTypes = path.join(designSystemDir, "dist", "src", "index.d.ts");
  if (fs.existsSync(distTypes)) {
    return;
  }
  if (fs.existsSync(distSrcTypes)) {
    fs.writeFileSync(distTypes, 'export * from "./src/index";\n');
    console.log("[ensure-design-system] Wrote dist/index.d.ts");
    return;
  }
  if (fs.existsSync(path.join(designSystemDir, "src", "index.ts"))) {
    fs.writeFileSync(distTypes, 'export * from "../src/index";\n');
    console.log("[ensure-design-system] Wrote dist/index.d.ts (src fallback)");
  }
}

function main() {
  if (!fs.existsSync(designSystemDir)) {
    console.log("[ensure-design-system] @alocare/design-system not installed — skipped");
    return;
  }

  if (!fs.existsSync(distEntry)) {
    console.log("[ensure-design-system] Building @alocare/design-system…");
    run("npm install", designSystemDir);
    run("npm run build", designSystemDir);

    if (!fs.existsSync(distEntry)) {
      console.error("[ensure-design-system] Build failed: dist/index.js missing");
      process.exit(1);
    }
    console.log("[ensure-design-system] Build complete");
  } else {
    console.log("[ensure-design-system] dist/index.js present");
  }

  ensureDistTypes();
}

main();
