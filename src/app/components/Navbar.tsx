"use client";

import { useState, useEffect } from "react";
import { Project, projects} from "@/app/lib/project-data";
import { ThemeToggle} from "@/app/components/ThemeToggle";
import { LanguageSelector} from "@/app/components/LanguageSelector";
import { useLanguage} from "@/app/components/LanguageProvider";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { language, translations } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if scrolled from the top
            setIsScrolled(currentScrollY > 10);

            // Hide/show logic with fix for top position
            if (currentScrollY <= 50) {
                // En üstteyken (0-50px) her zaman göster
                setIsHidden(false);
            } else if (currentScrollY > prevScrollY && currentScrollY > 100) {
                // Aşağı scroll yapılıyor ve 100px'den fazla - gizle
                setIsHidden(true);
            } else if (currentScrollY < prevScrollY) {
                // Yukarı scroll yapılıyor - göster
                setIsHidden(false);
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    const navItems = [
        { name: translations["nav.about"], href: "#about", isDropdown: false },
        {
            name: translations["nav.projects"],
            href: "#projects",
            isDropdown: true,
            dropdownItems: projects.map(project => ({
                name: project.title[language],
                href: `#${project.id}`
            }))
        },
        { name: translations["nav.contact"], href: "#contact", isDropdown: false },
    ];

    const scrollToSection = (sectionId: string) => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        const element = document.getElementById(sectionId.replace("#", ""));
        if (element) {
            // Add an offset (e.g., 100px) to scroll a bit higher than the exact element position
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    const toggleDropdown = (href: string) => {
        if (openDropdown === href) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(href);
        }
    };

    return (
        <nav
            className={`fixed w-full z-30 transition-all duration-300 ${
                isScrolled
                    ? isHidden
                        ? "bg-background/50 backdrop-blur-md shadow-sm -translate-y-full"
                        : "bg-background/50 backdrop-blur-md shadow-sm translate-y-0"
                    : "bg-background/80 backdrop-blur-md translate-y-0"
            } ${
                isScrolled ? "py-2" : "py-4"
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Left space for symmetry */}
                    <div className="w-1/4 md:block hidden"></div>

                    {/* Centered Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:justify-center md:space-x-8 flex-1">
                        {navItems.map((item) => (
                            <div key={item.href} className="relative">
                                {item.isDropdown ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.href)}
                                            className="text-foreground/90 hover:text-primary transition duration-200 flex items-center cursor-pointer"
                                        >
                                            {item.name}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`w-4 h-4 ml-1 transition-transform ${
                                                    openDropdown === item.href ? "rotate-180" : ""
                                                }`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </button>
                                        {openDropdown === item.href && (
                                            <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 p-1 z-50">
                                                <div className="py-1">
                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                        <button
                                                            key={dropdownItem.href}
                                                            className="block w-full text-left px-4 py-2 text-sm text-foreground/90 hover:bg-secondary rounded-md transition cursor-pointer"
                                                            onClick={() => scrollToSection(dropdownItem.href)}
                                                        >
                                                            {dropdownItem.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        onClick={() => scrollToSection(item.href)}
                                        className="text-foreground/90 hover:text-primary transition duration-200 cursor-pointer"
                                    >
                                        {item.name}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4 w-1/4 justify-end">
                        <LanguageSelector />
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-foreground cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 pt-2 border-t border-border">
                        <div className="flex flex-col space-y-4 items-center">
                            {navItems.map((item) => (
                                <div key={item.href} className="w-full text-center">
                                    {item.isDropdown ? (
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => toggleDropdown(item.href)}
                                                className="flex items-center justify-center w-full text-foreground/90 hover:text-primary transition duration-200 cursor-pointer"
                                            >
                                                <span>{item.name}</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className={`w-4 h-4 ml-1 transition-transform ${
                                                        openDropdown === item.href ? "rotate-180" : ""
                                                    }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </button>

                                            {openDropdown === item.href && (
                                                <div className="space-y-2 border-t border-border pt-2 mt-2">
                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                        <button
                                                            key={dropdownItem.href}
                                                            className="block w-full text-center text-foreground/80 hover:text-primary transition cursor-pointer py-1"
                                                            onClick={() => scrollToSection(dropdownItem.href)}
                                                        >
                                                            {dropdownItem.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => scrollToSection(item.href)}
                                            className="text-foreground/90 hover:text-primary transition duration-200 text-center w-full cursor-pointer"
                                        >
                                            {item.name}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}