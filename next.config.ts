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
const PRODUCTION_API = "https://api.alocare.net";

/** Build-time base for /v1/* rewrites only. Uploads use app/upstream-api route (runtime env). */
function resolveApiRewriteBase(): string {
  const explicit = process.env.API_REWRITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (isDev) return "http://127.0.0.1:8080";
  const pub = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (pub) {
    try {
      const host = new URL(pub).hostname.toLowerCase();
      if (host === "app.alocare.net") return PRODUCTION_API;
      return pub.replace(/\/$/, "");
    } catch {
      /* fall through */
    }
  }
  return PRODUCTION_API;
}

const apiRewriteBase = resolveApiRewriteBase();

const nextConfig: NextConfig = {
  transpilePackages: ["@alocare/design-system"],
  ...(siblingDesignSystem ? { outputFileTracingRoot: monorepoRoot } : {}),
  async rewrites() {
    const apiBase = apiRewriteBase.replace(/\/$/, "");
    return {
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
