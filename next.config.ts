import type { NextConfig } from "next";

// If running on Vercel, avoid adding a basePath/assetPrefix; Vercel hosts the site
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  output: 'export',
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    unoptimized: true,
  },
  // Only use a basePath/assetPrefix when explicitly requested.
  // We avoid forcing basePath on Vercel deployments (which host the project at the root)
  assetPrefix: !isVercel && process.env.NODE_ENV === 'production' ? '/interactionkit/' : '',
  basePath: !isVercel && process.env.NODE_ENV === 'production' ? '/interactionkit' : '',
};

export default nextConfig;
