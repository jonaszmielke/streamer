import type { NextConfig } from 'next'

module.exports = {
    allowedDevOrigins: ['192.168.1.10'],
}

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
}

export default nextConfig
