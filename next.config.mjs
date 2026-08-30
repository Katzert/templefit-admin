/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isProdGithub = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  ...(isProd ? { output: 'export', trailingSlash: true } : {}),
  images: {
    unoptimized: true,
  },
  basePath: isProdGithub ? '/templefit-admin' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  ...(!isProd ? {
    async rewrites() {
      return [
        {
          source: '/templefit-admin',
          destination: '/',
        },
        {
          source: '/templefit-admin/:path*',
          destination: '/:path*',
        },
      ];
    },
  } : {}),
};

export default nextConfig;
