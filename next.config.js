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
                hostname: 'thomas-res-wordpress-d1dd47.ingress-earth.ewp.live',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
}
