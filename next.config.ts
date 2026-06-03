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

const isDev = process.env.NODE_ENV === "development";
const apiRewriteBase =
  process.env.API_REWRITE_URL ??
  (isDev ? "http://127.0.0.1:8080" : process.env.NEXT_PUBLIC_API_URL) ??
  "http://127.0.0.1:8080";

const nextConfig: NextConfig = {
  transpilePackages: ["@alocare/design-system"],
  ...(siblingDesignSystem ? { outputFileTracingRoot: monorepoRoot } : {}),
  async rewrites() {
    const apiBase = apiRewriteBase.replace(/\/$/, "");
    return {
      /** Must run before App Router filesystem — array rewrites only run afterFiles and 404. */
      beforeFiles: [
        {
          source: "/upstream-api/:path*",
          destination: `${apiBase}/:path*`,
        },
      ],
      afterFiles: [
        {
          source: "/v1/:path*",
          destination: `${apiBase}/v1/:path*`,
        },
      ],
    };
  },
  turbopack: {
    resolveAlias: {
      "@alocare/design-system/styles.css": fs.existsSync(designSystemCss)
        ? designSystemCss
        : designSystemFromNodeModules,
    },
  },
};

export default nextConfig;
