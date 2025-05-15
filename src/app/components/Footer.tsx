"use client";

import { useLanguage } from "@/app/components/LanguageProvider";

export function Footer() {
    const { translations } = useLanguage();

    return (
        <footer className="py-6 bg-background border-t border-border">
            <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Mustafa Akagündüz. {translations["footer.rights"]}</p>
            </div>
        </footer>
    );
}