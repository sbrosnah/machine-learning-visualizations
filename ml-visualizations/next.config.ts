import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
};

export default nextConfig;