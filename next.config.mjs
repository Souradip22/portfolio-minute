/** @type {import('next').NextConfig} */
const nextConfig = {
  httpAgentOptions: {
    keepAlive: false,
  },
  reactStrictMode: false,
};

export default nextConfig;
