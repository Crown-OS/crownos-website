import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
