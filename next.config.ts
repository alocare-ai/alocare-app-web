import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const designSystemSrc = path.join(
  __dirname,
  "../alocare-design-system/src/index.ts",
);
const designSystemCss = path.join(
  __dirname,
  "../alocare-design-system/dist/design-system.css",
);
const designSystemFromNodeModules = path.join(
  __dirname,
  "node_modules/@alocare/design-system/dist/design-system.css",
);

const siblingDesignSystem = fs.existsSync(
  path.join(__dirname, "../alocare-design-system/package.json"),
);
const monorepoRoot = path.join(__dirname, "..");

const nextConfig: NextConfig = {
  transpilePackages: ["@alocare/design-system"],
  ...(siblingDesignSystem ? { outputFileTracingRoot: monorepoRoot } : {}),
  turbopack: {
    resolveAlias: {
      "@alocare/design-system/styles.css": fs.existsSync(designSystemCss)
        ? designSystemCss
        : designSystemFromNodeModules,
      "@alocare/design-system": fs.existsSync(designSystemSrc)
        ? designSystemSrc
        : "@alocare/design-system",
    },
  },
};

export default nextConfig;
