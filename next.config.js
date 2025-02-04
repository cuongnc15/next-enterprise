/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');
const path = require('path');
const pathToLessFileWithVariables = path.resolve(
  './src/assets/styles/layouts/antd-custom.less'
);
module.exports = withLess({
  lessLoaderOptions: {
    additionalData: (content) =>
      `${content}\n\n@import '${pathToLessFileWithVariables}';`,
  },
  reactStrictMode: false,

  swcMinify: true,
  poweredByHeader: false,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  // optimizeFonts: false,
  images: {
    domains: [
      'api.enterprise.chickendev.space',
      'storage.googleapis.com',
      '103.3.62.244',
      'tiemaocuoi.xyz',
      'accounts.youth.com.vn',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: { images: { layoutRaw: true }, appDir: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    });
    return config;
  },
});
