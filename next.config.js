/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'umgltemlffceoehkynug.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/profile-pictures/**',
      },
      {
        protocol: 'https',
        hostname: 'umgltemlffceoehkynug.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/item-pictures/**',
      },
    ],
  },
  staticPageGenerationTimeout: 60,
}

module.exports = nextConfig