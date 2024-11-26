/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  experimental: {
    serverComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "npubsfsnwzoctizdjhvn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
