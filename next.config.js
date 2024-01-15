/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['upload.wikimedia.org', 'picsum.photos', 'i.ibb.co'],
    },
}

module.exports = nextConfig
