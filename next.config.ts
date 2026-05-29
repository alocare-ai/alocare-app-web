import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@alocare/design-system"],
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
