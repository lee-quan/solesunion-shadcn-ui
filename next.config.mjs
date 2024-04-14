/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,

    CLOUDFLARE_URL: process.env.CLOUDFLARE_URL,
  },
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  distDir: ".next",
};

export default nextConfig;
