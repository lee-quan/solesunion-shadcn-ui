// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     NEXTAUTH_SECRET: "ZylHDU+ysoMlhKdLlZh+6KYuWXR3RbDYl2OGQ74PYw0=",
//     NEXTAUTH_URL: process.env.NEXT_PUBLIC_REACT_APP_URL,
//     BACKEND_URL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
//     FRONTEND_ENV: process.env.NEXT_PUBLIC_ENV,
//     FRONTEND_URL: process.env.NEXT_PUBLIC_REACT_APP_URL,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // remove private variables from processEnv
    processEnv: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes("NEXT_PUBLIC_")
      )
    ),
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    FRONTEND_ENV: process.env.NEXT_PUBLIC_ENV,
    FRONTEND_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
};

module.exports = nextConfig;