import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

// Gövde metinleri: Instrument Serif'in grotesk kardeşi
export const instrumentSans = Instrument_Sans({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-instrument-sans',
    weight: ['400', '500', '600'],
    fallback: ['system-ui', 'arial', 'sans-serif'],
});

// Editoryal başlıklar için serif display font
export const instrumentSerif = Instrument_Serif({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-instrument',
    weight: '400',
    style: ['normal', 'italic'],
    fallback: ['Georgia', 'serif'],
});

// Etiketler, katalog numaraları vb. için mono font
export const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-jetbrains',
    weight: ['400', '500'],
    fallback: ['ui-monospace', 'monospace'],
});

// Export default for easier import
export default instrumentSans;
