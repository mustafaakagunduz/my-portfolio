"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/components/LanguageProvider";
import { education, jobs } from "@/app/lib/experience-data";

/** Sağdan açılan tecrübe çekmecesi */
export function ExperienceDrawer({ onClose }: { onClose: () => void }) {
    const { language, translations: t } = useLanguage();
    const [closing, setClosing] = useState(false);
    const closeBtn = useRef<HTMLButtonElement>(null);

    const requestClose = useCallback(() => {
        setClosing(true);
        window.setTimeout(onClose, 350);
    }, [onClose]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeBtn.current?.focus({ preventScroll: true });
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [requestClose]);

    const delay = (i: number) => ({ animationDelay: `${0.2 + i * 0.06}s` });

    return (
        <div role="dialog" aria-modal="true" aria-label={t["crate.experience"]} className={`fixed inset-0 z-50 ${closing ? "drawer-closing" : ""}`}>
            <div className="drawer-backdrop absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={requestClose} />

            <aside className="drawer-panel grain absolute right-0 top-0 h-full w-full max-w-[600px] bg-background border-l border-foreground/15 shadow-[-30px_0_60px_-30px_rgba(0,0,0,0.5)] flex flex-col">
                <div className="drawer-scroll relative z-10 flex-1 overflow-y-auto overscroll-contain px-7 md:px-10 pt-8 md:pt-10 pb-10 modal-panel">
                    {/* Başlık + kapat: X'in üst kenarı "Y"nin üst kenarıyla aynı hizada */}
                    <div className="flex items-start justify-between gap-6" style={delay(0)}>
                        <h2 className="font-serif leading-[0.9] tracking-[-0.02em]" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
                            {t["crate.journey"]}<span className="italic text-primary">.</span>
                        </h2>
                        <button
                            ref={closeBtn}
                            onClick={requestClose}
                            aria-label={t["crate.close"]}
                            className="-m-2 p-2 shrink-0 text-foreground hover:text-primary hover:rotate-90 transition-all duration-300 outline-none focus-visible:text-primary"
                        >
                            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                                <path d="M5 5l14 14M19 5L5 19" />
                            </svg>
                        </button>
                    </div>

                    {/* Eğitim */}
                    <p className="mt-8 mb-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground" style={delay(1)}>
                        {t["crate.education"]}
                    </p>
                    <div style={delay(2)}>
                        {education.map((school) => (
                            <div key={school.name.en} className="border-t border-foreground/15 pt-4">
                                <p className="font-serif text-[1.75rem] leading-tight">{school.name[language]}</p>
                                <p className="mt-1 text-base text-foreground">{school.degree[language]}</p>
                            </div>
                        ))}
                    </div>

                    {/* İş deneyimi: zaman çizelgesi */}
                    <p className="mt-10 mb-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground" style={delay(3)}>
                        {t["crate.work"]}
                    </p>
                    <ol className="relative border-l border-foreground/15 ml-1" style={delay(4)}>
                        {jobs.map((job) => (
                            <li key={job.company} className="relative pl-7 pb-7 last:pb-0">
                                <span
                                    className={`absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full border ${
                                        job.current ? "bg-primary border-primary animate-pulse" : "bg-background border-foreground/40"
                                    }`}
                                />
                                <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground">{job.period[language]}</p>
                                <p className="mt-1 font-serif text-[1.75rem] leading-tight">
                                    {job.company}
                                    <span className="text-foreground"> · </span>
                                    <span className="text-[1.05rem] font-sans text-foreground">{job.role[language]}</span>
                                </p>
                                <p className="mt-1.5 text-base leading-relaxed text-foreground">{job.summary[language]}</p>
                            </li>
                        ))}
                    </ol>

                    <a
                        href="/resume.pdf"
                        download="CV-Mustafa-Ihsan-Akagunduz.pdf"
                        className="group mt-10 mx-auto flex w-fit items-center gap-3 rounded-full border border-foreground/30 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary hover:gap-5 transition-all"
                        style={delay(5)}
                    >
                        {t["crate.fullCv"]} <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                    </a>
                </div>
            </aside>
        </div>
    );
}
