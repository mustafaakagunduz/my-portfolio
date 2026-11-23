"use client";

import { useLanguage } from "@/app/components/LanguageProvider";

/** Tek tıkla diğer dile geçer (tr ⇄ en) */
export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const next = language === "tr" ? "en" : "tr";

    return (
        <button
            type="button"
            onClick={() => setLanguage(next)}
            aria-label={next === "en" ? "Switch to English" : "Türkçe'ye geç"}
            className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary/80 transition flex items-center justify-center gap-2 cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[22px] h-[22px]"
                aria-hidden
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                />
            </svg>
            <span className="lowercase pr-0.5">{language}</span>
        </button>
    );
}
