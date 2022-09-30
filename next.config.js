/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['fe.dev.dxtr.asia', 'cdn.pixabay.com'], }
}

module.exports = nextConfig
