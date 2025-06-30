/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add this line to transpile the problematic package
  transpilePackages: ['react-syntax-highlighter'],
};

module.exports = nextConfig;
