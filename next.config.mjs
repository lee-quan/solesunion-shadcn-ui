/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "solesunion.com",
                port: "",
                pathname: "/images/**",
            },
        ],
    },
    env: {
        NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    },
};

export default nextConfig;
