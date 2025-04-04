"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {translations} from "@/app/utils/translations";

export type Language = "en" | "tr";

type LanguageContextType = {
    language: Language;
    translations: Record<string, string>;
    setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") as Language | null;

        if (storedLanguage && (storedLanguage === "en" || storedLanguage === "tr")) {
            setLanguage(storedLanguage);
        } else {
            // Tarayıcı dilini kontrol et
            const browserLang = navigator.language.split('-')[0];
            setLanguage(browserLang === "tr" ? "tr" : "en");
        }
    }, []);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const currentTranslations = translations[language];

    return (
        <LanguageContext.Provider
            value={{
                language,
                translations: currentTranslations,
                setLanguage: changeLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}