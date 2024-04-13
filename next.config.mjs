/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    distDir: ".next",
};

export default nextConfig;
