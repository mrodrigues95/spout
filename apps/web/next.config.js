module.exports = {
  swcMinify: true,
  // reactStrictMode: true,
  experimental: {
    concurrentFeatures: false,
  },
  compiler: {
    relay: {
      // This should match `relay.config.json`.
      src: 'apps/web/src',
      schema: 'apps/web/schema.graphql',
      artifactDirectory: 'apps/web/src/__generated__',
      exclude: ['**/node_modules/**', '**/__generated__/**'],
      language: 'typescript',
      customScalars: {
        DateTime: 'string',
        URL: 'string',
      },
    },
  },
  // Enable fast refresh to work inside WSL2.
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: ['res.cloudinary.com', 'spoutstorage.blob.core.windows.net'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
};
