/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apicarshowcase.kilder-cf.com',
        port: '',
        pathname: '/rails/**',
      },
    ],
  },
  output: 'standalone',
}

export default nextConfig
