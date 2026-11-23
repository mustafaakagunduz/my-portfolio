import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

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

// Dev sunucusu ayrı klasöre yazsın: dev açıkken `next build` alınınca
// .next silinip dev sunucusu "Internal Server Error" vermesin.
// Production build (Vercel) varsayılan .next klasörünü kullanmaya devam eder.
export default function config(phase: string): NextConfig {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return { ...nextConfig, distDir: ".next-dev" };
    }
    return nextConfig;
}