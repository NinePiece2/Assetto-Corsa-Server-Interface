import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React strict mode for development */
  reactStrictMode: true,
  
  /* Enable SWR caching */
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },

  /* Image optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* Security headers and redirects can be configured here if needed */
};

export default nextConfig;
