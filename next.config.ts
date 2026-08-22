import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type checking is done separately in CI; skip during Railway build
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
