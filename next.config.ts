import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allows production builds to successfully complete even if project has type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during builds as well
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;