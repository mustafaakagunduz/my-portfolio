import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider} from "@/app/components/ThemeProvider";
import { LanguageProvider} from "@/app/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mustafa Akagündüz | Portfolio",
    description: "Personal portfolio website of Mustafa Akagündüz, a Software Developer",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}