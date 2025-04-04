"use client";

import { useLanguage } from "@/app/components/LanguageProvider";
import { useEffect, useState } from "react";

export function About() {
    const { translations } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set visible after mount for animations
        setIsVisible(true);
    }, []);

    const scrollToProjects = () => {
        const element = document.getElementById("projects");
        if (element) {
            // Add offset to scroll a bit higher
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            // Add offset to scroll a bit higher
            const yOffset = -100;
            const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const stats = [
        {
            label: translations["about.experience"],
            value: "2+"
        },
        {
            label: translations["about.projects"],
            value: "12+"
        },
    ];

    const skills = [
        "Next.js", "React", "TypeScript", "Tailwind CSS",
        "Spring Boot", "PostgreSQL", "Github", "Java",
        "Python", "HTML", "CSS", "Javascript"
    ];

    return (
        <section
            id="about"
            data-section
            className="min-h-screen py-12 md:py-0 flex flex-col justify-center"
            style={{
                background: "linear-gradient(135deg, var(--background) 0%, var(--card) 100%)",
            }}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div
                            className="inline-block px-3 py-1 mb-4 rounded-full text-primary"
                            style={{ background: "var(--primary-foreground)", border: "1px solid var(--primary)" }}
                        >
                            {translations["hero.greeting"]}
                        </div>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                            style={{ color: "var(--foreground)" }}
                        >
                            {translations["hero.name"]}
                        </h1>
                        <h2
                            className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6"
                            style={{ color: "var(--primary)" }}
                        >
                            {translations["hero.title"]}
                        </h2>

                        <p
                            className="text-lg mb-8 max-w-2xl"
                            style={{ color: "var(--foreground)", opacity: 0.9 }}
                        >
                            {translations["about.description"]}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
                                    style={{
                                        background: "var(--card)",
                                        border: "1px solid var(--border)"
                                    }}
                                >
                                    <p
                                        className="text-2xl font-bold mb-1"
                                        style={{ color: "var(--primary)" }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p
                                        className="text-sm"
                                        style={{ color: "var(--muted-foreground)" }}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mb-8">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                                    style={{
                                        background: "var(--secondary)",
                                        color: "var(--secondary-foreground)",
                                        borderLeft: "3px solid var(--primary)"
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">
                            <button
                                onClick={scrollToProjects}
                                className="hover:scale-105 text-primary-foreground px-5 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "var(--primary)",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                {translations["hero.cta"]}
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="hover:scale-105 px-5 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "var(--secondary)",
                                    color: "var(--secondary-foreground)",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)"
                                }}
                            >
                                {translations["nav.contact"]}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            <a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center hover:scale-105 border px-5 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "var(--background)",
                                    color: "var(--foreground)",
                                    borderColor: "var(--input)"
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    />
                                </svg>
                                {translations["about.downloadCV"] || "Download CV"}
                            </a>
                            <a
                                href="https://cv-uwdm.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center hover:scale-105 border px-5 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "var(--background)",
                                    color: "var(--foreground)",
                                    borderColor: "var(--input)"
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                {translations["about.viewCV"] || "View CV"}
                            </a>
                        </div>
                    </div>

                    <div className={`flex justify-center items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div
                            className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden"
                            style={{
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                border: "4px solid var(--primary)",
                                transform: "rotate(5deg)"
                            }}
                        >
                            <img
                                src="/pp.jpeg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}