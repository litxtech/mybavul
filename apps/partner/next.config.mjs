/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'xcvcplwimicylaxghiak.supabase.co' },
  ]},
  async rewrites() {
    const base = process.env.NEXT_PUBLIC_API_BASE || '';
    if (!base) return [];
    return [{ source: '/api/:path*', destination: `${base}/api/:path*` }];
  },
};
export default nextConfig;
