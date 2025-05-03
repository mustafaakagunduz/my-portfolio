"use client";

import { useLanguage } from "@/app/components/LanguageProvider";
import {useState, useEffect, JSX} from "react";

// Define TypeScript interfaces
interface ContactInfo {
    icon: JSX.Element;
    label: string;
    value: string;
    link?: string;
}

export function Contact() {
    const { translations } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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

        const contactSection = document.getElementById("contact");
        if (contactSection) {
            observer.observe(contactSection);
        }

        // Add keyframes animation to head
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes contactFadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(30px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .contact-card {
                opacity: 0;
            }
            .contact-card.visible {
                animation: contactFadeIn 0.8s ease forwards;
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
            .contact-gradient-title {
                background-size: 200% 200%;
                animation: gradientAnimation 15s ease infinite;
            }
            @keyframes iconPulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
            .contact-icon:hover {
                animation: iconPulse 1s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);

        return () => {
            // Clean up
            if (contactSection) {
                observer.unobserve(contactSection);
            }
            document.head.removeChild(style);
        };
    }, []);

    const contactInfo: ContactInfo[] = [
        {
            icon: (
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
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                </svg>
            ),
            label: translations["contact.phone"],
            value: "+90 546 556 61 10",
        },
        {
            icon: (
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            ),
            label: translations["contact.email"],
            value: "akagunduzmustafa00@gmail.com",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            ),
            label: translations["contact.github"],
            value: "github.com/MustafaAkagunduz",
            link: "https://github.com/MustafaAkagunduz",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            ),
            label: translations["contact.linkedin"],
            value: "linkedin.com/in/mustafa-akagunduz/",
            link: "https://www.linkedin.com/in/mustafa-akagunduz/",
        },
    ];

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary opacity-10"></div>
                <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-primary opacity-10"></div>
                <div className="absolute -bottom-24 right-1/4 w-64 h-64 rounded-full bg-primary opacity-10"></div>
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(to right, var(--primary) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative inline-block">
                        {translations["contact.title"]}
                        {/* Text shadow effect */}
                        <span className="absolute -z-10 opacity-10 blur-md" style={{ color: "var(--primary)", left: "0.5rem", top: "0.5rem" }}>
                            {translations["contact.title"]}
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-primary mx-auto mb-6 contact-gradient-title rounded-full"
                         style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%)" }}>
                    </div>
                    <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                        {translations["contact.subtitle"] || "Feel free to reach out to me through any of these channels"}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className={`contact-card p-8 rounded-xl bg-card relative transition-all duration-500 group ${isVisible ? 'visible' : ''}`}
                                style={{
                                    boxShadow: hoveredCard === index ?
                                        "0 20px 40px -20px var(--primary), 0 10px 20px rgba(0, 0, 0, 0.1)" :
                                        "0 10px 30px rgba(0, 0, 0, 0.07)",
                                    border: "1px solid var(--border)",
                                    borderLeft: "4px solid var(--primary)",
                                    transform: hoveredCard === index ? "translateY(-5px)" : "translateY(0)",
                                    animationDelay: `${index * 0.2}s`
                                }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-4 rounded-full bg-primary/10 text-primary contact-icon relative">
                                        {/* Pulse effect */}
                                        <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-10 animate-ping"></div>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-primary mb-2">
                                            {info.label}
                                        </h3>
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center group"
                                            >
                                                {info.value}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        ) : (
                                            <p className="text-foreground font-medium">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer section */}

            </div>
        </section>
    );
}