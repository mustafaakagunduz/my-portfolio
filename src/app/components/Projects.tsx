"use client";

import { useState, useEffect, useCallback } from "react";
import { Project, projects} from "@/app/lib/project-data";
import { useLanguage} from "@/app/components/LanguageProvider";

export function Projects() {
    const { language, translations } = useLanguage();
    const [visibleProjects, setVisibleProjects] = useState<Record<string, boolean>>({});
    const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

    const openLightbox = (project: Project, index = 0) => {
        setLightbox({ project, index });
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = useCallback(() => {
        setLightbox(null);
        document.body.style.overflow = "";
    }, []);

    const prevImage = useCallback(() => {
        if (!lightbox) return;
        const images = lightbox.project.images!;
        setLightbox({ ...lightbox, index: (lightbox.index - 1 + images.length) % images.length });
    }, [lightbox]);

    const nextImage = useCallback(() => {
        if (!lightbox) return;
        const images = lightbox.project.images!;
        setLightbox({ ...lightbox, index: (lightbox.index + 1) % images.length });
    }, [lightbox]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!lightbox) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightbox, closeLightbox, prevImage, nextImage]);

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes projectFadeIn {
                0% { opacity: 0; transform: translateY(15px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .project-card { opacity: 0; }
            .project-card.visible { animation: projectFadeIn 0.4s ease forwards; }
            @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .project-gradient-title {
                background-size: 200% 200%;
                animation: gradientAnimation 15s ease infinite;
            }
            @keyframes techBadgePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .tech-badge:hover { animation: techBadgePulse 0.5s ease-in-out; }
            @keyframes lightboxFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .lightbox-overlay { animation: lightboxFadeIn 0.2s ease; }
        `;
        document.head.appendChild(style);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleProjects(prevState => ({
                            ...prevState,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.05, rootMargin: '100px' }
        );

        const projectElements = document.querySelectorAll('.project-card');
        projectElements.forEach(el => observer.observe(el));

        return () => {
            document.head.removeChild(style);
            projectElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const getTechColor = (tech: string): string => {
        const techColors: Record<string, string> = {
            "Angular": "#DD0031",
            "AWS": "#FF9900",
            "Bootstrap": "#7952B3",
            "CSS": "#1572B6",
            "Django": "#092E20",
            "Docker": "#2496ED",
            "Express": "#888888",
            "Firebase": "#FFCA28",
            "Flask": "#000000",
            "Github": "#cccccc",
            "GraphQL": "#E10098",
            "HTML": "#E34F26",
            "Java": "#007396",
            "JavaScript": "#F7DF1E",
            "Material UI": "#0081CB",
            "MongoDB": "#47A248",
            "MySQL": "#4479A1",
            "Next.js": "#7928CA",
            "Node.js": "#339933",
            "OpenAI API": "#3bbfae",
            "PostgreSQL": "#336791",
            "Python": "#3776AB",
            "React": "#61DAFB",
            "Redux": "#764ABC",
            "REST API": "#FF5733",
            "Spring Boot": "#6DB33F",
            "Supabase": "#099b5e",
            "Svelte": "#FF3E00",
            "Tailwind CSS": "#06B6D4",
            "TypeScript": "#3178C6",
            "Vue.js": "#4FC08D",
            "Vite": "#646CFF",
            "WebSocket": "#f6a623",
            "Vercel" : "#948f8a",
            "Brevo" : "#40d248",
            "Resend" : "#ffffff"
        };
        return techColors[tech] || "#6E6E6E";
    };

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary opacity-10"></div>
                <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-primary opacity-10"></div>
                <div className="absolute -bottom-24 right-1/4 w-64 h-64 rounded-full bg-primary opacity-10"></div>
            </div>

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
                        {translations["projects.title"]}
                        <span className="absolute -z-10 opacity-10 blur-md" style={{ color: "var(--primary)", left: "0.5rem", top: "0.5rem" }}>
                            {translations["projects.title"]}
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-primary mx-auto mb-6 project-gradient-title rounded-full"
                         style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%)" }}>
                    </div>
                    <p className="text-lg text-foreground/70">
                        {translations["projects.subtitle"]}
                    </p>
                </div>

                <div className="space-y-24">
                    {projects.map((project, index) => (
                        <div
                            id={project.id}
                            key={project.id}
                            className={`project-card bg-card rounded-xl overflow-hidden ${visibleProjects[project.id] ? 'visible' : ''}`}
                            style={{
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                                animationDelay: `${index * 0.05}s`
                            }}
                        >
                            <div className="h-1 w-full project-gradient-title"
                                 style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, var(--primary) 100%)" }}>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="aspect-video w-full overflow-hidden relative">
                                    {project.imageUrl && (
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title[language]}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                </div>

                                <div className="p-8 flex flex-col h-full justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 relative inline-block">
                                            {project.title[language]}
                                            <div className="h-1 w-12 bg-primary mt-2 opacity-80 rounded-full"></div>
                                        </h3>
                                        <p className="text-foreground/70 mb-6 leading-relaxed">
                                            {project.description[language]}
                                        </p>

                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-primary mb-3">
                                                {translations["projects.technologies"]}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs px-3 py-1.5 rounded-full tech-badge transition-all duration-300 flex items-center"
                                                        style={{
                                                            background: `${getTechColor(tech)}20`,
                                                            color: getTechColor(tech),
                                                            border: `1px solid ${getTechColor(tech)}40`
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {project.images && project.images.length > 0 && (
                                            <button
                                                onClick={() => openLightbox(project, 0)}
                                                className="group relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                                            >
                                                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {translations["projects.view"]}
                                                </span>
                                            </button>
                                        )}
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                                            >
                                                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    {translations["projects.live"]}
                                                </span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                                            >
                                                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                                <span className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                    {translations["projects.github"]}
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={closeLightbox}
                >
                    <div
                        className="relative max-w-5xl w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image */}
                        <img
                            src={lightbox.project.images![lightbox.index]}
                            alt={`${lightbox.project.title[language]} - ${lightbox.index + 1}`}
                            className="w-full max-h-[75vh] object-contain rounded-lg"
                        />

                        {/* Navigation arrows */}
                        {lightbox.project.images!.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white/80 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white/80 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Dots indicator */}
                        {lightbox.project.images!.length > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                {lightbox.project.images!.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setLightbox({ ...lightbox, index: i })}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === lightbox.index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Counter */}
                        <p className="text-center text-white/60 text-sm mt-3">
                            {lightbox.index + 1} / {lightbox.project.images!.length}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
