/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  env: {
    SERVER_URL: "https://servirail2-production.up.railway.app",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "servirail2-production.up.railway.app",
        port: "3000",
      },
    ],
  },
};

module.exports = nextConfig;
