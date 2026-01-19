/** @type {import('next').NextConfig} */
const nextConfig = {
  // For prototype - relaxed settings
  typescript: {
    // Allow builds even with TS errors (prototype mode)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow builds even with ESLint errors (prototype mode)
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow external images for placeholder services
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}

module.exports = nextConfig
