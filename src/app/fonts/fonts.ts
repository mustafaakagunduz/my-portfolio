import { Nunito } from 'next/font/google';

export const nunito = Nunito({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-nunito',
    weight: ['300', '400', '500', '600', '700'],
    preload: true, // SSG için font'ları preload et
    fallback: ['system-ui', 'arial', 'sans-serif'], // Fallback fontlar
});

// Export default for easier import
export default nunito;