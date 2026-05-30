import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

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
    },
  },
};

export default nextConfig;
