import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image to optimize media served from our DigitalOcean Spaces CDN.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capturex2026.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "capturex2026.sgp1.digitaloceanspaces.com",
      },
    ],
    // Prefer AVIF (smallest), then WebP, then fall back to original.
    formats: ["image/avif", "image/webp"],
    // Common breakpoints. next/image's `sizes` prop picks from these.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 64, 96, 128, 256, 384, 512],
    // Cache CDN responses for a year on the Next Image optimizer.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Aggressively compress text responses (HTML/CSS/JS).
  compress: true,

  // Stricter checks help us catch perf-impacting issues early.
  reactStrictMode: true,

  // Long-cache hashed static assets at the edge.
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
