"use client";

import { ThemeProvider } from "@/app/components/ThemeProvider";
import { LanguageProvider } from "@/app/components/LanguageProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ThemeProvider>
    );
}