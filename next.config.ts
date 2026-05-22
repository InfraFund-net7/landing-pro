import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const dashboardProxyOrigin = (
  process.env.DASHBOARD_PROXY_ORIGIN ?? process.env.DASHBOARD_DEV_PROXY_ORIGIN
)?.replace(/\/$/, '');

const nextConfig: NextConfig = {
  output: 'standalone',
  // Keep native drivers out of the server bundle (avoids ws "mask is not a function" on Vercel).
  serverExternalPackages: [
    'pg',
    'payload',
    '@payloadcms/db-postgres',
    '@neondatabase/serverless',
    'ws',
    'bufferutil',
  ],
  images: {
    localPatterns: [
      { pathname: '/cms/api/media/file/**' },
      { pathname: '/api/media/file/**' },
    ],
    // Payload (and CMS content) may use absolute URLs; `next/image` then requires remotePatterns.
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/cms/api/media/file/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/cms/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'infrafund.net',
        pathname: '/cms/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'www.infrafund.net',
        pathname: '/cms/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/cms/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      'payload-init-req': path.resolve(
        dirname,
        'node_modules/@payloadcms/next/dist/utilities/initReq.js'
      ),
    };
    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async rewrites() {
    if (!dashboardProxyOrigin) return [];
    return [
      {
        source: '/register',
        destination: `${dashboardProxyOrigin}/register`,
      },
      {
        source: '/login',
        destination: `${dashboardProxyOrigin}/login`,
      },
      {
        source: '/sign-out',
        destination: `${dashboardProxyOrigin}/sign-out`,
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
