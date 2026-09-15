/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isProdGithub = process.env.GITHUB_ACTIONS === 'true' || process.env.GH_PAGES === 'true' || isProd;

const nextConfig = {
  ...(isProd ? { output: 'export', trailingSlash: true } : {}),
  images: {
    unoptimized: true,
  },
  basePath: isProdGithub ? '/templefit-admin' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProdGithub ? '/templefit-admin' : '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
