/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Durante o build de produção, ignora erros de tipos se necessário
    ignoreBuildErrors: false,
  },
  eslint: {
    // Durante o build de produção, ignora erros de lint se necessário
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
