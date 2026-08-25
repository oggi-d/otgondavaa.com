import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.gr-assets.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "images.gr-assets.com",
        pathname: "/**",
      },
      { protocol: "https", hostname: "www.goodreads.com", pathname: "/**" },
    ],
    // Allow dynamic local OG images like `/api/og?title=...`
    // (omitting `search` allows query strings)
    localPatterns: [
      { pathname: "/api/og" },
      // Allow static images from `/public/images/**`
      { pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
