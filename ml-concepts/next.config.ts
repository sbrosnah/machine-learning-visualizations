
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true
};

export default withContentlayer(nextConfig)
