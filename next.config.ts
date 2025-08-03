import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
    unoptimized: true, // Static Export時に必要
  },
  output: "export", // Static Exportを有効化
};

export default nextConfig;
