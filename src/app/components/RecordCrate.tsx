"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { projects, Project } from "@/app/lib/project-data";
import { useLanguage } from "@/app/components/LanguageProvider";
import { LanguageSelector } from "@/app/components/LanguageSelector";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { ExperienceDrawer } from "@/app/components/ExperienceDrawer";
import { NowPlaying } from "@/app/components/NowPlaying";

const LINKS = [
    { key: "email", label: "E-mail", href: "mailto:akagunduzmustafa00@gmail.com" },
    { key: "github", label: "GitHub", href: "https://github.com/MustafaAkagunduz" },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mustafa-akagunduz/" },
    { key: "phone", label: "+90 546 556 61 10", href: "tel:+905465566110" },
];

const SKILLS = [
    "Spring Boot", "Java", "Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "PostGIS",
    "Redis", "Docker", "Python", "Django", "GeoDjango", "Django Channels", "GraphQL", "WebSocket",
    "REST API", "AWS", "Supabase", "Firebase", "Express", "Vite", "MapLibre GL", "Zustand",
    "GitHub Actions", "Vercel", "Resend",
];

/* Tüm plakların etiket rengi: sitenin vurgu rengi */
const labelColor = () => "var(--primary)";
const catalogNo = (i: number) => `MA-${String(i + 1).padStart(3, "0")}`;
const pad = (n: number) => String(n).padStart(2, "0");

type Mode = "crate" | "strip";

/* ─────────────────────────── Plak (disk) ─────────────────────────── */

function Vinyl({ index, title, spinning = false, playing }: { index: number; title: string; spinning?: boolean; playing?: boolean }) {
    // playing verilirse: yavaş dönüş, durunca olduğu açıda kalır (başa sıçramaz)
    const slow = playing !== undefined;
    const ringId = useId();
    return (
        <div className="vinyl absolute inset-0">
            {/* Dönen kısım: oluklar + etiket */}
            <div
                className={`vinyl-disc absolute inset-0 rounded-full ${spinning ? "vinyl-spin" : ""} ${slow ? "vinyl-spin-slow" : ""}`}
                style={slow ? { animationPlayState: playing ? "running" : "paused" } : undefined}
            >
                <div className="vinyl-label absolute rounded-full overflow-hidden" style={{ inset: "33.5%", background: labelColor() }}>
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                        <defs>
                            <path id={ringId} d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
                        </defs>
                        <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />
                        <text fill="rgba(20,12,4,0.75)" fontSize="6" letterSpacing="1.6" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                            <textPath href={`#${ringId}`}>
                                {`${catalogNo(index)} · SIDE A · 33⅓ RPM · STEREO · ${catalogNo(index)} · SIDE A ·`}
                            </textPath>
                        </text>
                        <text x="50" y="40" textAnchor="middle" fill="rgba(20,12,4,0.85)" fontSize="11" style={{ fontFamily: "var(--font-instrument), serif" }}>
                            {title.length > 14 ? `${title.slice(0, 13)}…` : title}
                        </text>
                        <line x1="30" y1="62" x2="70" y2="62" stroke="rgba(20,12,4,0.35)" strokeWidth="0.5" />
                        <text x="50" y="70" textAnchor="middle" fill="rgba(20,12,4,0.6)" fontSize="4.5" letterSpacing="1.2" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                            M. AKAGÜNDÜZ
                        </text>
                    </svg>
                    {/* Mil deliği */}
                    <span className="vinyl-hole absolute left-1/2 top-1/2 w-[9%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full" />
                </div>
            </div>
            {/* Sabit ışık yansıması: plak dönerken yerinde kalır */}
            <div className="vinyl-sheen absolute inset-0 rounded-full pointer-events-none" />
        </div>
    );
}

/* ─────────────────────────── Kapak ─────────────────────────── */

function Sleeve({ project, index, language, active, mono = false }: { project: Project; index: number; language: "en" | "tr"; active: boolean; mono?: boolean }) {
    return (
        <div className="absolute inset-0 overflow-hidden bg-neutral-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
            {project.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={project.imageUrl.startsWith("/") ? project.imageUrl : `/${project.imageUrl}`}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-left-top transition-[filter,transform] duration-500"
                    style={{
                        filter: mono ? "grayscale(1) contrast(1.08)" : active ? "none" : "grayscale(1) contrast(1.05) brightness(0.8)",
                        transform: active ? "scale(1.06)" : "scale(1)",
                    }}
                />
            )}
            {/* Kapak tipografisi */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
            <div className="absolute left-0 top-0 bottom-0 w-[6px]" style={{ background: labelColor() }} />
            <div className="absolute top-3 left-5 right-3 flex justify-between font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase">
                <span>{catalogNo(index)}</span>
                <span>33⅓</span>
            </div>
            <div className="absolute bottom-4 left-5 right-4 text-white">
                <p className="font-serif text-[clamp(1.4rem,2.2vw,2.2rem)] leading-[0.95]">{project.title[language]}</p>
                <p lang="en" className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/60 mt-2 truncate">
                    {project.technologies.slice(0, 3).join(" · ")}
                </p>
            </div>
            {/* Karton dokusu / parlama */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]" />
        </div>
    );
}

/* ─────────────────────────── Ana bileşen ─────────────────────────── */

export function RecordCrate() {
    const { language, translations: t } = useLanguage();
    const [mode, setMode] = useState<Mode>("crate");
    const [hovered, setHovered] = useState(-1);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showExperience, setShowExperience] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [dims, setDims] = useState({ w: 0, s: 300 });
    const crateRef = useRef<HTMLDivElement>(null);
    const crateAreaRef = useRef<HTMLDivElement>(null);

    // Hassas işaretçi + geniş ekran → kasa; aksi halde kaydırmalı şerit
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
        const update = () => setMode(mq.matches ? "crate" : "strip");
        update();
        setMounted(true);
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // Plak boyutu: kasanın genişliği ve başlıklardan sonra kalan dikey alan
    useLayoutEffect(() => {
        const area = crateAreaRef.current;
        const crate = crateRef.current;
        if (!area || !crate || mode !== "crate") return;
        const measure = () => {
            const w = crate.clientWidth;
            const h = area.clientHeight - 40 - 56 - 96; // alt boşluk + zemin cetveli + müzik düğmesi ve boşlukları
            const s = Math.round(Math.max(140, Math.min(440, w * 0.32, h / 1.08)));
            setDims({ w, s });
        };
        const ro = new ResizeObserver(measure);
        ro.observe(area);
        ro.observe(crate);
        return () => ro.disconnect();
    }, [mode]);

    const n = projects.length;
    const { w, s } = dims;
    const spread = s * 0.5;
    const step = n > 1 ? Math.max(20, (w - s * 0.8 - spread) / (n - 1)) : 0;
    const isHovering = hovered >= 0 && openIndex === null;
    const xOf = (i: number) =>
        (isHovering ? 0 : spread / 2) + i * step + (isHovering && i > hovered ? spread : 0);

    const sleeveStyle = (i: number): React.CSSProperties => {
        const x = xOf(i);
        const isOpen = openIndex === i;
        const isActive = isHovering && hovered === i;
        let transform: string;
        let origin = "left center";
        if (isOpen) {
            transform = `translate3d(${x}px, -140%, 0) rotateY(0deg)`;
        } else if (isActive) {
            transform = `translate3d(${x}px, -6%, 25px) rotateY(0deg) scale(1.02)`;
        } else if (isHovering && i < hovered) {
            // Geçilen plaklar öne doğru yaslanır
            origin = "right center";
            transform = `translate3d(${Math.max(0, x - s * 0.15)}px, 0, 0) rotateY(-30deg)`;
        } else {
            transform = `translate3d(${x}px, 0, 0) rotateY(28deg)`;
        }
        return {
            width: s,
            height: s,
            transform,
            transformOrigin: origin,
            zIndex: isActive ? 100 : isHovering && i < hovered ? i : n * 2 - i,
            opacity: isOpen ? 0 : 1,
            transition:
                "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease",
        };
    };

    const current = isHovering ? projects[hovered] : null;

    return (
        <section
            id="projects"
            className={`grain relative overflow-hidden flex flex-col pt-6 md:pt-8 ${mode === "crate" ? "h-[100svh]" : "min-h-[100svh]"}`}
            onPointerLeave={() => setHovered(-1)}
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Üst satır */}
                <header className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-8 gap-y-3 font-mono text-xs md:text-sm uppercase tracking-[0.18em] text-foreground">
                    <span className="rise" style={{ animationDelay: "0.05s" }}>
                        <span className="text-foreground">{t["hero.name"]}</span> — {t["hero.title"]}
                    </span>
                    <nav aria-label="Links" className="rise flex flex-wrap items-center gap-x-6 xl:gap-x-8 gap-y-2 order-3 lg:order-none w-full lg:w-auto" style={{ animationDelay: "0.12s" }}>
                        {LINKS.map((l) => (
                            <a
                                key={l.key}
                                lang="en"
                                href={l.href}
                                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="group inline-flex items-center gap-1 hover:text-foreground transition-colors"
                            >
                                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-500">
                                    {l.label}
                                </span>
                                <span className="text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                            </a>
                        ))}
                        <button
                            type="button"
                            onClick={() => setShowExperience(true)}
                            className="group inline-flex items-center gap-1 uppercase tracking-[0.18em] hover:text-foreground transition-colors"
                        >
                            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-500">
                                {t["crate.experience"]}
                            </span>
                            <span className="text-primary transition-transform group-hover:-translate-x-0.5">←</span>
                        </button>
                    </nav>
                    <div className="rise flex items-center gap-2 normal-case tracking-normal" style={{ animationDelay: "0.18s" }}>
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>
                </header>

                {/* Başlık + okuma paneli */}
                <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-[max-content_12px_minmax(0,46rem)] lg:justify-center items-center gap-6 lg:gap-12">
                    <h1 className="w-max font-serif leading-[0.85] tracking-[-0.02em]" style={{ fontSize: "clamp(3.6rem, 7vw, 8.5rem)" }}>
                        <span className="sr-only">{t["hero.name"]} — </span>
                        <span className="inline-block overflow-hidden align-bottom pb-[0.25em] -mb-[0.17em]">
                            <span className="inline-block rise" style={{ animationDelay: "0.1s" }}>{t["crate.pick"]}</span>
                        </span>{" "}
                        <span className="inline-block overflow-hidden align-bottom pb-[0.25em] -mb-[0.17em]">
                            <span className="inline-block rise italic text-primary" style={{ animationDelay: "0.2s" }}>{t["crate.record"]}</span>
                        </span>
                    </h1>

                    {/* Ayraç */}
                    <div aria-hidden className="hidden lg:flex self-stretch flex-col items-center rise" style={{ animationDelay: "0.3s" }}>
                        <span className="flex-1 w-px bg-gradient-to-b from-transparent via-foreground/25 to-foreground/25" />
                        <span className="my-3 text-[10px] leading-none text-primary">✦</span>
                        <span className="flex-1 w-px bg-gradient-to-b from-foreground/25 via-foreground/25 to-transparent" />
                    </div>

                    <div className="lg:min-h-[150px] flex flex-col justify-center rise" style={{ animationDelay: "0.35s" }}>
                        {current ? (
                            <div key={current.id} className="rise" style={{ animationDuration: "0.5s" }}>
                                <p className="text-base md:text-lg leading-relaxed text-foreground line-clamp-3">
                                    <strong className="font-serif font-normal text-foreground text-[1.35em] leading-none">{current.title[language]}</strong>
                                    <span className="text-foreground"> – </span>
                                    {current.description[language]}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-base md:text-lg leading-relaxed text-foreground">{t["about.description"]}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ───── Kasa ───── */}
            {mode === "crate" ? (
                <div ref={crateAreaRef} className="container mx-auto px-4 md:px-6 relative z-10 flex-1 min-h-0 flex flex-col pb-10">
                    {/* Müzik: hakkımda bloğu ile plakların tam ortasında */}
                    <div className="flex-1 min-h-[72px] flex items-center justify-center rise" style={{ animationDelay: "0.45s" }}>
                        <NowPlaying />
                    </div>
                    <div
                        ref={crateRef}
                        className="relative w-full"
                        style={{ height: s * 1.08, perspective: "1800px", perspectiveOrigin: "50% 30%" }}
                    >
                        {mounted && w > 0 && projects.map((project, i) => {
                            const active = isHovering && hovered === i;
                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    aria-label={`${project.title[language]} — ${t["crate.open"]}`}
                                    data-cursor="play"
                                    className="absolute left-0 bottom-0 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    style={sleeveStyle(i)}
                                    onPointerEnter={() => setHovered(i)}
                                    onPointerLeave={() => setHovered((h) => (h === i ? -1 : h))}
                                    onFocus={() => setHovered(i)}
                                    onBlur={() => setHovered((h) => (h === i ? -1 : h))}
                                    onClick={() => setOpenIndex(i)}
                                >
                                  {/* Kalkan plak imlecin altından kaçmasın diye görünmez tutunma alanı */}
                                  {active && <span aria-hidden className="absolute inset-x-0 top-full h-[8%]" />}
                                  <div className="crate-drop absolute inset-0" style={{ animationDelay: `${0.25 + i * 0.06}s` }}>
                                    {/* Kılıftan dışarı süzülen plak */}
                                    <div
                                        className="absolute top-[3%] left-[3%] w-[94%] h-[94%] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                                        style={{ transform: active ? "translateX(24%)" : "translateX(0)" }}
                                    >
                                        <Vinyl index={i} title={project.title[language]} playing={active} />
                                    </div>
                                    <Sleeve project={project} index={i} language={language} active={active} />
                                  </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Zemin cetveli */}
                    <div className="relative h-9 border-t border-foreground/20 mt-3 font-mono text-[10px] tracking-[0.2em] text-foreground">
                        {mounted && w > 0 && projects.map((p, i) => (
                            <span
                                key={p.id}
                                className={`absolute top-2 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isHovering && hovered === i ? "text-primary" : ""}`}
                                style={{ transform: `translateX(${xOf(i)}px)` }}
                            >
                                {pad(i + 1)}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                /* ───── Dokunmatik / dar ekran: kaydırmalı şerit ───── */
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex-1 min-h-[72px] flex items-center justify-center rise" style={{ animationDelay: "0.45s" }}>
                        <NowPlaying />
                    </div>
                    <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 md:px-6 pb-6 pt-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {projects.map((project, i) => (
                            <button
                                key={project.id}
                                type="button"
                                onClick={() => setOpenIndex(i)}
                                data-cursor="play"
                                className="crate-drop snap-center shrink-0 text-left group"
                                style={{ animationDelay: `${0.2 + i * 0.06}s` }}
                            >
                                <div className="relative w-[68vw] max-w-[320px] aspect-square">
                                    <div className="absolute top-[3%] left-[3%] w-[94%] h-[94%] -translate-y-[14%]">
                                        <Vinyl index={i} title={project.title[language]} />
                                    </div>
                                    <Sleeve project={project} index={i} language={language} active mono />
                                </div>
                            </button>
                        ))}
                        <div className="shrink-0 w-2" />
                    </div>
                    <div className="mx-4 md:mx-6 border-t border-foreground/20 py-2 flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-foreground">
                        <span>← {pad(n)} {t["crate.projects"]} →</span>
                    </div>
                </div>
            )}

            {/* Yetenek bandı */}
            <div lang="en" className="relative z-10 mt-2 shrink-0 overflow-hidden group/marquee" aria-label="Skills">
                <div className="marquee flex w-max py-4 font-mono text-sm md:text-base uppercase tracking-[0.15em] text-foreground group-hover/marquee:[animation-play-state:paused]">
                    {[0, 1].map((copy) => (
                        <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                            {SKILLS.map((skill) => (
                                <li key={skill} className="flex items-center">
                                    <span className="px-6 hover:text-primary transition-colors">{skill}</span>
                                    <span className="text-primary/70">✦</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>

            {showExperience && <ExperienceDrawer onClose={() => setShowExperience(false)} />}

            {openIndex !== null && (
                <RecordModal
                    key={openIndex}
                    index={openIndex}
                    onClose={() => setOpenIndex(null)}
                    onNavigate={(dir) => setOpenIndex((i) => (i === null ? i : (i + dir + n) % n))}
                />
            )}
        </section>
    );
}

/* ─────────────────────────── Proje penceresi ─────────────────────────── */

function RecordModal({ index, onClose, onNavigate }: { index: number; onClose: () => void; onNavigate: (dir: 1 | -1) => void }) {
    const { language, translations: t } = useLanguage();
    const project = projects[index];
    const images = (project.images ?? [project.imageUrl]).map((src) => (src.startsWith("/") ? src : `/${src}`));
    const [closing, setClosing] = useState(false);
    const [shot, setShot] = useState<number | null>(null);
    const closeBtn = useRef<HTMLButtonElement>(null);

    const requestClose = useCallback(() => {
        setClosing(true);
        window.setTimeout(onClose, 350);
    }, [onClose]);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeBtn.current?.focus({ preventScroll: true });
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (shot !== null) {
                if (e.key === "Escape") setShot(null);
                if (e.key === "ArrowLeft") setShot((s) => (s! - 1 + images.length) % images.length);
                if (e.key === "ArrowRight") setShot((s) => (s! + 1) % images.length);
                return;
            }
            if (e.key === "Escape") requestClose();
            if (e.key === "ArrowLeft") onNavigate(-1);
            if (e.key === "ArrowRight") onNavigate(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [shot, images.length, requestClose, onNavigate]);

    const half = Math.ceil(project.technologies.length / 2);
    const sides: [string, string[]][] = [
        ["A", project.technologies.slice(0, half)],
        ["B", project.technologies.slice(half)],
    ];
    const delay = (i: number) => ({ animationDelay: `${0.25 + i * 0.07}s` });

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={project.title[language]}
            className={`fixed inset-0 z-50 ${closing ? "modal-closing" : ""}`}
        >
            <div className="modal-backdrop absolute inset-0 bg-background/90 backdrop-blur-xl" onClick={requestClose} />
            <div className="grain absolute inset-0 pointer-events-none" />

            {/* Üst bar */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 md:px-10 py-6 font-mono text-sm md:text-base uppercase tracking-[0.18em] text-foreground">
                <span>
                    <span className="text-foreground">{pad(index + 1)}</span> / {pad(projects.length)}
                </span>
                <div className="flex items-center">
                    <button
                        ref={closeBtn}
                        onClick={requestClose}
                        aria-label={t["crate.close"]}
                        className="-m-2 p-2 text-foreground hover:text-primary hover:rotate-90 transition-all duration-300 cursor-pointer outline-none focus-visible:text-primary"
                    >
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                            <path d="M5 5l14 14M19 5L5 19" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Önceki / sonraki: sayfanın iki kenarında */}
            {[
                { dir: -1 as const, label: "Previous", side: "left-3 md:left-6", d: "M15 5l-7 7 7 7", nudge: "hover:-translate-x-1" },
                { dir: 1 as const, label: "Next", side: "right-3 md:right-6", d: "M9 5l7 7-7 7", nudge: "hover:translate-x-1" },
            ].map(({ dir, label, side, d, nudge }) => (
                <button
                    key={label}
                    onClick={() => onNavigate(dir)}
                    aria-label={label}
                    className={`absolute ${side} top-1/2 -translate-y-1/2 z-20 p-3 text-foreground hover:text-primary ${nudge} transition-all duration-300 cursor-pointer`}
                >
                    <svg viewBox="0 0 24 24" className="w-9 h-9 md:w-11 md:h-11" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d={d} />
                    </svg>
                </button>
            ))}

            {/* İçerik */}
            <div className="relative z-10 h-full overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && requestClose()}>
                <div className="min-h-full container mx-auto px-5 md:px-10 pt-24 pb-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center pointer-events-none [&>*]:pointer-events-auto">
                    {/* Sol: kılıf + dışarı çıkan plak */}
                    <div className="w-full">
                    <div className="relative w-[62%] lg:w-[64%] max-w-[480px] aspect-square mx-auto lg:mx-0" style={{ ["--disc-out" as string]: "52%" }}>
                        <div className="modal-disc absolute top-[2%] left-[2%] w-[96%] h-[96%]">
                            <Vinyl index={index} title={project.title[language]} spinning />
                        </div>
                        <div className="modal-sleeve absolute inset-0">
                            <Sleeve project={project} index={index} language={language} active mono />
                        </div>
                    </div>
                    </div>

                    {/* Sağ: bilgi paneli */}
                    <div className="modal-panel">
                        <h2 className="font-serif leading-[0.9] tracking-[-0.02em]" style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)", ...delay(0) }}>
                            {project.title[language]}
                        </h2>
                        <p className="mt-6 text-base md:text-lg leading-relaxed text-foreground max-w-xl" style={delay(2)}>
                            {project.description[language]}
                        </p>

                        {/* Parça listesi = teknolojiler */}
                        <div className="mt-8" style={delay(3)}>
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground mb-3">{t["crate.tracklist"]}</p>
                            <div className="grid grid-cols-2 gap-x-8 border-t border-foreground/15">
                                {sides.map(([side, list]) => (
                                    <ol key={side}>
                                        {list.map((tech, k) => (
                                            <li key={tech} className="flex items-baseline gap-3 py-2 border-b border-foreground/10 text-sm">
                                                <span className="font-mono text-[10px] text-foreground w-5">{side}{k + 1}</span>
                                                <span>{tech}</span>
                                            </li>
                                        ))}
                                    </ol>
                                ))}
                            </div>
                        </div>

                        {/* Bağlantılar */}
                        {(project.githubUrl || project.demoUrl) && (
                            <div className="mt-8 flex flex-wrap gap-3" style={delay(4)}>
                                {project.demoUrl && (
                                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                       className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:gap-5 transition-all">
                                        {t["projects.live"]} <span>↗</span>
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" lang="en"
                                       className="group inline-flex items-center gap-3 rounded-full border border-foreground/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary hover:gap-5 transition-all">
                                        {t["projects.github"]} <span>↗</span>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Ekran görüntüleri */}
                        <div className="mt-10" style={delay(5)}>
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground mb-3">
                                {t["crate.screens"]} · {pad(images.length)}
                            </p>
                            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin]">
                                {images.map((src, k) => (
                                    <button key={src} onClick={() => setShot(k)}
                                            className="shrink-0 w-36 aspect-video overflow-hidden border border-foreground/15 hover:border-primary transition-colors cursor-zoom-in">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={src} alt={`${project.title[language]} ${k + 1}`} className="w-full h-full object-cover grayscale contrast-[1.08] hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tam ekran görsel */}
            {shot !== null && (
                <div className="modal-backdrop fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4" onClick={() => setShot(null)}>
                    <button aria-label={t["crate.close"]} title={t["crate.close"]}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/80 hover:text-primary hover:rotate-90 transition-all duration-300 cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); setShot(null); }}>
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                            <path d="M5 5l14 14M19 5L5 19" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-1 sm:gap-4 max-w-full">
                        {images.length > 1 && (
                            <button aria-label="Previous"
                                    className="shrink-0 p-1 sm:p-2 text-white/80 hover:text-primary hover:-translate-x-1 transition-all duration-300 cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); setShot((shot - 1 + images.length) % images.length); }}>
                                <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 5l-7 7 7 7" />
                                </svg>
                            </button>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[shot]} alt={`${project.title[language]} ${shot + 1}`}
                             className="min-w-0 max-w-full max-h-[80vh] object-contain" onClick={(e) => e.stopPropagation()} />
                        {images.length > 1 && (
                            <button aria-label="Next"
                                    className="shrink-0 p-1 sm:p-2 text-white/80 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); setShot((shot + 1) % images.length); }}>
                                <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="mt-5 font-mono text-xs tracking-[0.2em] text-white/70" onClick={(e) => e.stopPropagation()}>
                        {pad(shot + 1)} / {pad(images.length)}
                    </div>
                </div>
            )}
        </div>
    );
}
