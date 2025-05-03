import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider} from "@/app/components/ThemeProvider";
import { LanguageProvider} from "@/app/components/LanguageProvider";
import { nunito} from "@/app/fonts/fonts";

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
        <html lang="en" suppressHydrationWarning className={nunito.variable}>
        <body className={`font-nunito ${nunito.className}`}>
        <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}