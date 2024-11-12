import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/machine-learning-visualizations",
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;