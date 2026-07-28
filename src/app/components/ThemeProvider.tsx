"use client";

import React, { createContext, useContext, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Server always renders "light" (no way to know the client's stored
    // preference during SSR), so we must start client state at "light" too
    // to match hydration. The inline script in layout.tsx already applied
    // the correct "dark" class to <html> before this ever runs, so this
    // effect just syncs React state to match before the browser paints.
    const [theme, setTheme] = useState<Theme>("light");

    useLayoutEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");

        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}