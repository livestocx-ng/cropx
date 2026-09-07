import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  outputFileTracingRoot: import.meta.dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // The site is image-led, so serve modern formats rather than the JPEG
    // sources sitting in public/images/cropx.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600, 2048],
  },
  experimental: {
    // @mantine/core compound components (Table.Thead, Accordion.Item, etc.)
    // resolve to undefined when core is optimised. Hooks are safe.
    optimizePackageImports: ['@mantine/hooks'],
  },
});
