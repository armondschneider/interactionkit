import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/interactionkit/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/interactionkit' : '',
};

export default nextConfig;
