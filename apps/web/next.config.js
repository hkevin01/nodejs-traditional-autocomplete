/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features
  experimental: {
    // Enable optimized package imports for better tree shaking
    optimizePackageImports: ['lucide-react'],
    // Enable turbo mode for faster builds (if available)
    turbo: {
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
  },

  // TypeScript configuration
  typescript: {
    // Type checking is handled by our separate type-check script
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Linting is handled by our separate lint script
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },

  // Bundle analyzer
  bundlePagesExternals: false,

  // Webpack configuration for better autocomplete and traditional tooling
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Improve build performance
    config.optimization = {
      ...config.optimization,
      // Enable better tree shaking
      usedExports: true,
      sideEffects: false,
    };

    // Enable better TypeScript support in development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },

  // Environment variables
  env: {
    // Explicitly disable any AI/Copilot features
    DISABLE_AI_FEATURES: 'true',
    NODE_ENV: process.env.NODE_ENV,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Compression and performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  distDir: '.next',

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // API routes
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ],
    };
  },
};

export default nextConfig;