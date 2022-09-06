/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async headers() {
        return [
            {
                source: '/_next/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'http://31.220.6.203:7789',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
