"use client";

import { useState, useEffect, useRef } from "react";
import {Language, useLanguage} from "@/app/components/LanguageProvider";

export function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languageNames = {
        en: "English",
        tr: "Türkçe"
    };

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
        setIsOpen(false);
    };

    // Dropdown dışına tıklandığında kapatma işlemi
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select language"
            >
                <span className="sr-only">Current language: {languageNames[language]}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 p-1 z-50">
                    <div className="py-1">
                        {(["en", "tr"] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                className={`block px-4 py-2 text-sm rounded-md w-full text-left cursor-pointer ${
                                    lang === language
                                        ? "bg-primary text-primary-foreground"
                                        : "text-foreground hover:bg-secondary"
                                }`}
                                onClick={() => handleLanguageChange(lang)}
                            >
                                {languageNames[lang]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}