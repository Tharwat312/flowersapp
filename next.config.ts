import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'flower.elevateegy.com',
            pathname: '/**',
        }]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
