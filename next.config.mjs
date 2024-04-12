/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
};

export default nextConfig;
