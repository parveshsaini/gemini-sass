/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {key: 'referrer-policy', value: 'no-referrer'}
                ]
            }
        ]
    },
    images: {
        domains: [
            'cdn-icons-png.flaticon.com',
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",]
    }
};

export default nextConfig;
