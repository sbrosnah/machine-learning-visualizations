import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';
const repositoryName = '/machine-learning-visualizations';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProduction ? repositoryName : '',
  assetPrefix: isProduction ? repositoryName : '',
  publicRuntimeConfig: {
    basePath: isProduction ? repositoryName : '',
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
};

export default nextConfig;
