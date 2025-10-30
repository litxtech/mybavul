/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'xcvcplwimicylaxghiak.supabase.co' },
  ]},
};
export default nextConfig;
