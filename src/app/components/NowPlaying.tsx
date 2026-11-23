"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Çalma listesi. Yeni şarkı: mp3'ü public/ klasörüne koy, buraya bir satır ekle.
 */
const TRACKS = [
    { src: "/cem-karaca-resimdeki-gozyaslari.mp3", artist: "Cem Karaca", title: "Resimdeki Gözyaşları" },
    { src: "/baris-manco-kol-dugmeleri.mp3", artist: "Barış Manço", title: "Kol Düğmeleri" },
    { src: "/erkin-koray-seni-her-gordugumde.mp3", artist: "Erkin Koray", title: "Seni Her Gördüğümde" },
];

const TARGET_VOLUME = 0.5;
const MUTED_KEY = "music-muted";

/**
 * Siteye girince listeyi çalar; şarkı bitince sıradakine geçer.
 * Tarayıcı sesli otomatik oynatmayı engellerse ilk etkileşimde (tık / tuş / kaydırma) başlar.
 * Ziyaretçi durdurursa tercih hatırlanır.
 */
export function NowPlaying() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeRef = useRef<number>(0);
    const autoPlayNext = useRef(false);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [peek, setPeek] = useState(false);
    const track = TRACKS[index];

    const fadeTo = (target: number, ms: number, done?: () => void) => {
        const audio = audioRef.current;
        if (!audio) return;
        cancelAnimationFrame(fadeRef.current);
        const from = audio.volume;
        const start = performance.now();
        const step = (now: number) => {
            const k = Math.min(1, (now - start) / ms);
            audio.volume = from + (target - from) * k;
            if (k < 1) fadeRef.current = requestAnimationFrame(step);
            else done?.();
        };
        fadeRef.current = requestAnimationFrame(step);
    };

    const play = (fadeMs = 1800) => {
        const audio = audioRef.current;
        if (!audio) return Promise.reject();
        audio.volume = 0;
        return audio.play().then(() => fadeTo(TARGET_VOLUME, fadeMs));
    };

    // İlk açılış: otomatik oynatmayı dene, engellenirse ilk etkileşimi bekle
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        const onEnded = () => {
            autoPlayNext.current = true;
            setIndex((i) => (i + 1) % TRACKS.length);
        };
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);

        const events = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
        const onGesture = (e: Event) => {
            // Çalar kontrollerine basıldıysa onClick halleder
            if ((e.target as Element | null)?.closest?.("[data-music-toggle]")) return;
            removeGestures();
            if (audio.paused) play().catch(() => {});
        };
        const removeGestures = () => events.forEach((ev) => window.removeEventListener(ev, onGesture));

        if (localStorage.getItem(MUTED_KEY) !== "1") {
            play().catch(() => {
                events.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
            });
        }

        return () => {
            removeGestures();
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
            cancelAnimationFrame(fadeRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Şarkı değişince adı birkaç saniye göster (ilk açılış hariç)
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        setPeek(true);
        const id = window.setTimeout(() => setPeek(false), 2800);
        return () => window.clearTimeout(id);
    }, [index]);

    // Şarkı değişince: çalıyorsa yenisini çalmaya devam et
    useEffect(() => {
        if (!autoPlayNext.current) return;
        autoPlayNext.current = false;
        play(600).catch(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            localStorage.removeItem(MUTED_KEY);
            play(800).catch(() => {});
        } else {
            localStorage.setItem(MUTED_KEY, "1");
            fadeTo(0, 400, () => audio.pause());
        }
    };

    const skip = (dir: 1 | -1) => {
        const audio = audioRef.current;
        // "Önceki": şarkının ortasındaysak başa sar, başındaysak bir öncekine geç
        if (dir === -1 && audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        autoPlayNext.current = playing;
        setIndex((i) => (i + dir + TRACKS.length) % TRACKS.length);
    };

    const iconBtn =
        "flex items-center justify-center w-7 h-7 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors";

    return (
        <div data-music-toggle className="group/np inline-flex items-center gap-1 rounded-full bg-secondary/50 px-1.5 py-1.5">
            <audio ref={audioRef} src={track.src} preload="auto" />

            <button type="button" onClick={() => skip(-1)} aria-label="Previous track" className={iconBtn}>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <rect x="5" y="5" width="2.5" height="14" rx="1" />
                    <path d="M19 5.6v12.8a1 1 0 0 1-1.55.83L9 13.13a1.35 1.35 0 0 1 0-2.26l8.45-6.1A1 1 0 0 1 19 5.6z" />
                </svg>
            </button>

            <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause music" : "Play music"}
                aria-pressed={playing}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
            >
                {playing ? (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 translate-x-[1px]" fill="currentColor">
                        <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
                    </svg>
                )}
            </button>

            <button type="button" onClick={() => skip(1)} aria-label="Next track" className={iconBtn}>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <rect x="16.5" y="5" width="2.5" height="14" rx="1" />
                    <path d="M5 5.6v12.8a1 1 0 0 0 1.55.83L15 13.13a1.35 1.35 0 0 0 0-2.26L6.55 4.77A1 1 0 0 0 5 5.6z" />
                </svg>
            </button>

            {/* Şarkı adı: kapalıyken gizli, hover / odak / şarkı değişiminde açılır */}
            <span
                className={`grid transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/np:grid-cols-[1fr] group-hover/np:opacity-100 group-focus-within/np:grid-cols-[1fr] group-focus-within/np:opacity-100 ${
                    peek ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
                }`}
            >
                <span className="overflow-hidden">
                    <span
                        key={track.src}
                        className="rise inline-block pl-2 pr-3 font-mono text-xs uppercase tracking-[0.15em] text-foreground/70 whitespace-nowrap"
                        style={{ animationDuration: "0.5s" }}
                    >
                        {track.artist} — {track.title}
                    </span>
                </span>
            </span>
        </div>
    );
}
