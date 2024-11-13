import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  basePath: isProd ? "/machine-learning-visualizations" : "",
  output: isProd ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;