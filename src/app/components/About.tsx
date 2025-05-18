"use client";

import { useLanguage } from "@/app/components/LanguageProvider";
import {JSX, useEffect, useState} from "react";

export function About() {
    const { translations } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    // Change null to number | null to fix the TypeScript error
    const [hoverStat, setHoverStat] = useState<number | null>(null);

    useEffect(() => {
        // Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        // Add keyframes animation to head
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes profilePulse {
                0% {
                    box-shadow: 0 0 25px 10px rgba(var(--primary-rgb), 0.4);
                }
                50% {
                    box-shadow: 0 0 40px 20px rgba(var(--primary-rgb), 0.6);
                }
                100% {
                    box-shadow: 0 0 25px 10px rgba(var(--primary-rgb), 0.4);
                }
            }
            .profile-glow {
                animation: profilePulse 5s infinite ease-in-out;
            }
            @keyframes floatAnimation {
                0% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
                100% {
                    transform: translateY(0px);
                }
            }
            .float {
                animation: floatAnimation 5s infinite ease-in-out;
            }
            @keyframes gradientAnimation {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
            .gradient-animate {
                background-size: 200% 200%;
                animation: gradientAnimation 15s ease infinite;
            }
            @keyframes fadeInStagger {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .skill-item {
                animation: fadeInStagger 0.5s ease forwards;
                opacity: 0;
            }
            .profile-background-glow {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(var(--primary-rgb), 0.3) 0%, rgba(var(--primary-rgb), 0) 70%);
                filter: blur(20px);
                opacity: 0.8;
                z-index: -1;
                transform: scale(1.5);
            }
        `;
        document.head.appendChild(style);

        return () => {
            // Clean up
            if (aboutSection) {
                observer.unobserve(aboutSection);
            }
            document.head.removeChild(style);
        };
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

    // Type definition for stat items
    interface StatItem {
        label: string;
        value: string;
        icon: JSX.Element;
    }

    // Type definition for skill items
    interface SkillItem {
        name: string;
        color: string;
    }

    const stats: StatItem[] = [
        {
            label: translations["about.experience"],
            value: "2+",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: translations["about.projects"],
            value: "12+",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
    ];

    const skills: SkillItem[] = [
        { name: "Spring Boot", color: "#6DB33F" },
        { name: "Supabase", color: "#099b5e" },
        { name: "Java", color: "#007396" },
        { name: "Next.js", color: "#7928CA" },
        { name: "React", color: "#61DAFB" },
        { name: "TypeScript", color: "#3178C6" },
        { name: "Tailwind CSS", color: "#06B6D4" },
        { name: "PostgreSQL", color: "#336791" },
        { name: "OpenAI API", color: "#3bbfae" },
        { name: "Github", color: "#cccccc" },
        { name: "HTML", color: "#E34F26" },
        { name: "CSS", color: "#1572B6" },
        { name: "JavaScript", color: "#F7DF1E" },
        { name: "Docker", color: "#2496ED" },
        { name: "Firebase", color: "#FFCA28" },
        { name: "Python", color: "#3776AB" },
        { name: "REST API", color: "#FF5733" },
        { name: "AWS", color: "#FF9900" },
        { name: "Vercel", color: "#948f8a" }




    ];

    return (
        <section
            id="about"
            data-section
            className="min-h-screen pt-32 pb-20 md:pt-32 md:pb-0 flex flex-col justify-center relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, var(--background) 0%, var(--card) 100%)",
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary opacity-10"></div>
                <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-primary opacity-10"></div>
                <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-primary opacity-10"></div>
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(to right, var(--primary) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {/* Animated heading with gradient underline */}
                        <div className="relative mb-2">
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                                style={{ color: "var(--foreground)" }}
                            >
                                {translations["hero.name"]}
                            </h1>
                            <div className="h-1 w-24 mt-2 gradient-animate rounded-full" style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)" }}></div>
                        </div>

                        <h2
                            className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 relative"
                            style={{ color: "var(--primary)" }}
                        >
                            {translations["hero.title"]}
                            <span className="absolute -z-10 opacity-10 blur-xl" style={{ color: "var(--primary)", left: "0.5rem", top: "0.5rem" }}>
                                {translations["hero.title"]}
                            </span>
                        </h2>

                        <p
                            className="text-lg mb-10 max-w-2xl leading-relaxed"
                            style={{ color: "var(--foreground)", opacity: 0.9 }}
                        >
                            {translations["about.description"]}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="p-5 rounded-lg relative overflow-hidden transition-all hover:scale-105 duration-300 cursor-pointer group"
                                    style={{
                                        background: "var(--card)",
                                        borderLeft: "3px solid var(--primary)",
                                        boxShadow: hoverStat === index ? "0 10px 30px -10px var(--primary)" : "0 5px 15px rgba(0, 0, 0, 0.1)"
                                    }}
                                    onMouseEnter={() => setHoverStat(index)}
                                    onMouseLeave={() => setHoverStat(null)}
                                >
                                    {/* Background gradient on hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                        style={{ background: "linear-gradient(135deg, var(--primary) 0%, transparent 100%)" }}
                                    ></div>

                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="text-primary opacity-80">{stat.icon}</div>
                                        <p
                                            className="text-3xl font-bold"
                                            style={{ color: "var(--primary)" }}
                                        >
                                            {stat.value}
                                        </p>
                                    </div>
                                    <p
                                        className="text-sm font-medium"
                                        style={{ color: "var(--muted-foreground)" }}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mb-10">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-md skill-item"
                                    style={{
                                        background: "var(--card)",
                                        color: "var(--foreground)",
                                        borderLeft: `3px solid ${skill.color}`,
                                        animationDelay: `${index * 0.1}s`,
                                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
                                    }}
                                >
                                    <span style={{ color: skill.color }}>●</span>{" "}
                                    {skill.name}
                                </span>
                            ))}
                        </div>

                        {/* Buttons with improved hover effects */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button
                                onClick={scrollToProjects}
                                className="group relative overflow-hidden text-primary-foreground px-7 py-3.5 rounded-md font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "var(--primary)",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                                }}
                            >
                                {/* Hover overlay */}
                                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                <span className="relative flex items-center">
                                    {translations["hero.cta"]}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </button>
                            <button
                                onClick={scrollToContact}
                                className="group relative overflow-hidden px-7 py-3.5 rounded-md font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "var(--secondary)",
                                    color: "var(--secondary-foreground)",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <span className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                <span className="relative flex items-center">
                                    {translations["nav.contact"]}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">

                            <a
                                href="https://cv-uwdm.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center border px-5 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer relative overflow-hidden"
                                style={{
                                    background: "var(--muted)",
                                    color: "var(--foreground)",
                                    borderColor: "var(--primary)",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <span className="absolute inset-0 w-full h-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
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
                                <span className="relative">{translations["about.viewCV"] || "View CV"}</span>
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="group inline-flex items-center border px-5 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer relative overflow-hidden"
                                style={{
                                    background: "var(--accent)",
                                    color: "var(--accent-foreground)",
                                    borderColor: "var(--primary)",
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <span className="absolute inset-0 w-full h-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                    />
                                </svg>
                                <span className="relative">{translations["about.downloadCV"] || "Download CV"}</span>
                            </a>
                        </div>
                    </div>

                    <div className={`flex justify-center items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div
                            className="relative w-72 h-72 md:w-96 md:h-96 float"
                        >
                            {/* Enhanced background glow for the profile */}
                            <div className="profile-background-glow"></div>

                            {/* Decorative rings around the profile image */}
                            <div className="absolute w-full h-full rounded-full opacity-20"
                                 style={{
                                     border: "2px solid var(--primary)",
                                     transform: "scale(1.1)",
                                     animation: "profilePulse 8s infinite ease-in-out"
                                 }}>
                            </div>
                            <div className="absolute w-full h-full rounded-full opacity-15"
                                 style={{
                                     border: "4px solid var(--primary)",
                                     transform: "scale(1.2)",
                                     animation: "profilePulse 8s infinite ease-in-out reverse"
                                 }}>
                            </div>

                            {/* Image wrapper with enhanced glowing effect */}
                            <div
                                className="absolute inset-0 rounded-full overflow-hidden profile-glow"
                                style={{
                                    boxShadow: "0 0 30px 15px rgba(var(--primary-rgb), 0.5)",
                                    background: "rgba(var(--primary-rgb), 0.05)"
                                }}
                            >
                                {/* Additional glow layer */}
                                <div className="absolute -inset-0 bg-primary opacity-5"></div>

                                {/* Overlay to add a slight tint matching the primary color */}
                                <div className="absolute inset-0 bg-primary opacity-10 mix-blend-overlay z-10"></div>

                                <img
                                    src="/pp.webp"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    style={{
                                        transform: "rotate(5deg) scale(1.05)", // dsfdsSlightly larger to fill the circle better
                                        transition: "transform 0.5s ease-in-out",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}