import type { NextConfig } from "next";
import path from "path";

const designSystemSrc = path.join(
  __dirname,
  "../alocare-design-system/src/index.ts",
);
const designSystemCss = path.join(
  __dirname,
  "../alocare-design-system/dist/design-system.css",
);

const nextConfig: NextConfig = {
  transpilePackages: ["@alocare/design-system"],
  outputFileTracingRoot: path.join(__dirname, ".."),
  turbopack: {
    resolveAlias: {
      "@alocare/design-system/styles.css": designSystemCss,
      "@alocare/design-system": designSystemSrc,
    },
  },
};

export default nextConfig;
