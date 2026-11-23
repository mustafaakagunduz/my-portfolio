"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "link" | "play";

/* Pikap kolu boyutu (px) ve iğne ucunun SVG içindeki konumu (%) */
const ARM = 72;
const TIP_X = 0.08;
const TIP_Y = 0.92;

/**
 * Sayfa genelinde özel imleç: nokta → (bağlantıda) halka → (plakta) pikap iğnesi.
 * Plak öğeleri `data-cursor="play"` ile işaretlenir.
 * Yalnızca hassas işaretçili (fare/trackpad) cihazlarda devreye girer.
 */
export function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [mode, setMode] = useState<CursorMode>("default");
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setEnabled(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        document.documentElement.classList.add("has-custom-cursor");

        let x = -100, y = -100, cx = -100, cy = -100, raf = 0;

        const move = (e: PointerEvent) => {
            x = e.clientX;
            y = e.clientY;
            setVisible(true);
        };
        const over = (e: PointerEvent) => {
            const el = e.target as Element | null;
            if (!el || !el.closest) return;
            if (el.closest('[data-cursor="play"]')) setMode("play");
            else if (el.closest("a, button, [role='button'], label, select")) setMode("link");
            else setMode("default");
        };
        const leave = () => setVisible(false);
        const down = () => setPressed(true);
        const up = () => setPressed(false);

        const tick = () => {
            // Hafif yumuşatma: imleç gecikmeden takip etsin ama titremesin
            cx += (x - cx) * 0.45;
            cy += (y - cy) * 0.45;
            if (rootRef.current) rootRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("pointermove", move);
        window.addEventListener("pointerover", over);
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        document.documentElement.addEventListener("pointerleave", leave);
        raf = requestAnimationFrame(tick);

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerover", over);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
            document.documentElement.removeEventListener("pointerleave", leave);
            cancelAnimationFrame(raf);
        };
    }, [enabled]);

    if (!enabled) return null;

    const isPlay = mode === "play";
    const isLink = mode === "link";

    return (
        <div
            ref={rootRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
        >
            {/* Nokta / halka */}
            <div
                className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                    width: isLink ? 38 : isPlay ? 6 : 8,
                    height: isLink ? 38 : isPlay ? 6 : 8,
                    background: isLink ? "transparent" : "var(--primary)",
                    border: isLink ? "1px solid var(--foreground)" : "0px solid transparent",
                    opacity: isPlay ? 0 : 1,
                    scale: pressed ? 0.75 : 1,
                }}
            />

            {/* Pikap kolu: iğne ucu imlecin tam üzerinde */}
            <div
                className="absolute text-foreground"
                style={{
                    width: ARM,
                    height: ARM,
                    left: -ARM * TIP_X,
                    top: -ARM * TIP_Y,
                    transformOrigin: "82% 16%",
                    transform: isPlay
                        ? `rotate(${pressed ? -4 : 0}deg)`
                        : "rotate(32deg)",
                    opacity: isPlay ? 1 : 0,
                    transition: "transform 0.55s cubic-bezier(0.3, 1.4, 0.4, 1), opacity 0.25s ease",
                }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]">
                    <defs>
                        {/* Fırçalanmış alüminyum */}
                        <linearGradient id="ta-metal" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#fbfaf7" />
                            <stop offset="0.45" stopColor="#c9c5bd" />
                            <stop offset="0.55" stopColor="#8f8b84" />
                            <stop offset="1" stopColor="#e4e1da" />
                        </linearGradient>
                        <radialGradient id="ta-base" cx="40%" cy="35%" r="70%">
                            <stop offset="0" stopColor="#4a4a4a" />
                            <stop offset="1" stopColor="#141414" />
                        </radialGradient>
                        <linearGradient id="ta-weight" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#2b2b2b" />
                            <stop offset="0.5" stopColor="#6a6a6a" />
                            <stop offset="1" stopColor="#1c1c1c" />
                        </linearGradient>
                    </defs>

                    {/* Karşı ağırlık (silindir) */}
                    <g transform="rotate(-45 87 11)">
                        <rect x="81" y="6" width="13" height="10" rx="1.5" fill="url(#ta-weight)" stroke="#0b0b0b" strokeWidth="1" />
                        <line x1="85" y1="6" x2="85" y2="16" stroke="#0b0b0b" strokeOpacity="0.5" strokeWidth="0.6" />
                        <line x1="90" y1="6" x2="90" y2="16" stroke="#0b0b0b" strokeOpacity="0.5" strokeWidth="0.6" />
                    </g>

                    {/* S biçimli kol: önce kontur, sonra metal */}
                    <path d="M80 18 C70 26 68 40 56 48 C46 55 38 60 30 68" fill="none" stroke="#0b0b0b" strokeWidth="5" strokeLinecap="round" />
                    <path d="M80 18 C70 26 68 40 56 48 C46 55 38 60 30 68" fill="none" stroke="url(#ta-metal)" strokeWidth="3" strokeLinecap="round" />

                    {/* Kafa (headshell) + parmak tutamağı */}
                    <line x1="31" y1="67" x2="19" y2="79" stroke="#0b0b0b" strokeWidth="8.5" strokeLinecap="round" />
                    <line x1="31" y1="67" x2="19" y2="79" stroke="url(#ta-metal)" strokeWidth="6.5" strokeLinecap="round" />
                    <line x1="23" y1="77" x2="30" y2="85" stroke="#0b0b0b" strokeWidth="3" strokeLinecap="round" />
                    <line x1="23" y1="77" x2="30" y2="85" stroke="url(#ta-metal)" strokeWidth="1.4" strokeLinecap="round" />

                    {/* Kartuş */}
                    <line x1="19" y1="80" x2="13.5" y2="85.5" stroke="#0b0b0b" strokeWidth="6.5" strokeLinecap="round" />
                    <line x1="19" y1="80" x2="13.5" y2="85.5" stroke="#2a2a2a" strokeWidth="4.5" strokeLinecap="round" />

                    {/* İğne kolu (cantilever) + uç */}
                    <line x1="13.5" y1="86" x2="8" y2="92" stroke="#d9d5cd" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="8" cy="92" r="1.6" fill="var(--primary)" stroke="#0b0b0b" strokeWidth="0.6" />

                    {/* Pivot gövdesi ve yatak */}
                    <circle cx="80" cy="18" r="10" fill="url(#ta-base)" stroke="#0b0b0b" strokeWidth="1" />
                    <circle cx="80" cy="18" r="7" fill="none" stroke="#5a5a5a" strokeWidth="0.6" />
                    <circle cx="80" cy="18" r="4.2" fill="url(#ta-metal)" stroke="#0b0b0b" strokeWidth="0.8" />
                    <circle cx="80" cy="18" r="1.2" fill="#0b0b0b" />
                </svg>
            </div>
        </div>
    );
}
