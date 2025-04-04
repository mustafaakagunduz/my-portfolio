"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/app/components/Navbar";
import { About } from "@/app/components/About";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";
import { useLanguage} from "@/app/components/LanguageProvider";

export default function Home() {
    const { translations } = useLanguage();
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when scrolled down 300px
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <main className="min-h-screen">
            <Navbar />
            <About />
            <Projects />
            <Contact />

            {/* Scroll to top button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-primary/20 hover:bg-primary/30 text-primary rounded-full p-3 shadow-md backdrop-blur-sm transition-all duration-300 z-40"
                    aria-label="Scroll to top"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                    </svg>
                </button>
            )}

            <footer className="py-6 bg-background border-t border-border">
                <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Mustafa Akagündüz. {translations["footer.rights"]}</p>
                </div>
            </footer>
        </main>
    );
}