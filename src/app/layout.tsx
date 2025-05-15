import type { Metadata } from "next";
import "./globals.css";
import { nunito } from "@/app/fonts/fonts";
import { ClientProviders } from "@/app/components/ClientProviders";

export const metadata: Metadata = {
    title: "Mustafa Akagündüz | Portfolio",
    description: "Personal portfolio website of Mustafa Akagündüz, a Software Developer",
    keywords: ["portfolio", "web developer", "Next.js", "React", "TypeScript", "Mustafa Akagündüz"],
    openGraph: {
        title: "Mustafa Akagündüz | Portfolio",
        description: "Personal portfolio website of Mustafa Akagündüz, a Software Developer",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mustafa Akagündüz | Portfolio",
        description: "Personal portfolio website of Mustafa Akagündüz, a Software Developer",
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={nunito.variable}>
        <body className={`font-nunito ${nunito.className}`}>
        <ClientProviders>
            {children}
        </ClientProviders>
        </body>
        </html>
    );
}