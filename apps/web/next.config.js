/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },
  env: {
    DISABLE_AI_FEATURES: 'true',
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
