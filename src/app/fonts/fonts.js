import { Nunito } from 'next/font/google';

export const nunito = Nunito({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--fonts-nunito',
    weight: ['300', '400', '500', '600', '700'],
});