/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'xcvcplwimicylaxghiak.supabase.co' },
  ]},
};
export default nextConfig;
\nexport async function rewrites() {\n  const base = process.env.NEXT_PUBLIC_API_BASE || '';\n  return [{ source: '/api/:path*', destination: ${base}/api/:path* }];\n}\n
