/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "reapertrans.com",
      },
      {
        protocol: "https",
        hostname: "nexamanga-files.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**", // Allow any other HTTPS domains (wildcard)
      },
    ],
  },
};

export default nextConfig;
