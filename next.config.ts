import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // SSG Configuration - static export kaldırıldı
    // output: "export", // Bu satırı kaldırıyoruz
    trailingSlash: true,
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    images: {
        // Static export olmadığı için unoptimized kaldırılabilir
        domains: [], // Eğer external image'lar varsa buraya ekleyin
    },
    // Asset prefix için (CDN kullanıyorsanız)
    // assetPrefix: isProd ? 'https://cdn.mustafaakagunduz.com' : '',
};

export default nextConfig;