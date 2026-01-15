/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-notion-x', 'notion-client', 'notion-utils'],
  images: {
    domains: ['www.notion.so', 'images.unsplash.com', 's3.us-west-2.amazonaws.com'],
  },
}

module.exports = nextConfig
