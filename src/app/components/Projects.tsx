"use client";

import { Project, projects} from "@/app/lib/project-data";
import { useLanguage} from "@/app/components/LanguageProvider";

export function Projects() {
    const { language, translations } = useLanguage();

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {translations["projects.title"]}
                    </h2>
                    <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
                </div>

                <div className="space-y-16">
                    {projects.map((project, index) => (
                        <div
                            id={project.id}
                            key={project.id}
                            className="bg-card rounded-xl overflow-hidden shadow-lg transition group"
                        >
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${index % 2 !== 0 ? 'md:flex md:flex-row-reverse' : ''}`}>
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title[language]}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title[language]}</h3>
                                    <p className="text-foreground/70 mb-4 line-clamp-3">
                                        {project.description[language]}
                                    </p>

                                    <div className="mb-4">
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {translations["projects.technologies"]}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs px-2 py-1 bg-secondary rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
                                            >
                                                {translations["projects.view"]}
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
                                            >
                                                {translations["projects.github"]}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}