/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["yt3.ggpht.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
    ],
  },
  transpilePackages: ["three"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
