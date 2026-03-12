import createNextIntlPlugin from 'next-intl/plugin';

// Specify the path to your request file explicitly for Turbopack
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack: {} provides the config space next-intl needs to inject aliases
  turbopack: {}, 
};

export default withNextIntl(nextConfig);