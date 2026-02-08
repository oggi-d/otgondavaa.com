import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow dynamic local OG images like `/api/og?title=...`
    // (omitting `search` allows query strings)
    localPatterns: [{ pathname: "/api/og" }],
  },
};

export default nextConfig;
