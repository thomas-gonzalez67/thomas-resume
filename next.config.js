/** @type {import('next').NextConfig} */
module.exports = {

    webpack: (config, options) =>
    {
        config.module.rules.push({
            test: /\.pdf$/i,
            type: 'asset/source'
        })

        return config
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'http://thomasreswordpress.com',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
}
