/**
 * Copy a built alocare-design-system into vendor/ for Vercel (no GITHUB_TOKEN).
 * Run after design-system changes: npm run sync-design-system
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const vendorDir = path.join(root, "vendor", "alocare-design-system");
const sibling = path.join(root, "..", "alocare-design-system");

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

function main() {
  if (!fs.existsSync(path.join(sibling, "package.json"))) {
    console.error("[sync-design-system] Expected", sibling);
    process.exit(1);
  }

  if (!fs.existsSync(path.join(sibling, "dist", "index.js"))) {
    console.log("[sync-design-system] Building design-system…");
    run("npm run build", sibling);
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(sibling, "package.json"), "utf8"),
  );
  const vendorPkg = {
    name: pkg.name,
    version: pkg.version,
    private: true,
    type: pkg.type,
    main: pkg.main,
    module: pkg.module,
    types: pkg.types,
    exports: pkg.exports,
    peerDependencies: pkg.peerDependencies,
  };

  fs.mkdirSync(vendorDir, { recursive: true });
  fs.writeFileSync(
    path.join(vendorDir, "package.json"),
    `${JSON.stringify(vendorPkg, null, 2)}\n`,
  );

  const distSrc = path.join(sibling, "dist");
  const distDest = path.join(vendorDir, "dist");
  if (fs.existsSync(distDest)) {
    fs.rmSync(distDest, { recursive: true, force: true });
  }
  fs.cpSync(distSrc, distDest, { recursive: true });

  console.log("[sync-design-system] Updated", vendorDir);
}

main();
