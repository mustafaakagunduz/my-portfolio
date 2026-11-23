import { Language } from "@/app/components/LanguageProvider";

type L = Record<Language, string>;

export interface Job {
    company: string;
    role: L;
    period: L;
    summary: L;
    current?: boolean;
}

export interface School {
    name: L;
    degree: L;
}

const intern: L = { en: "Software Engineer Intern", tr: "Yazılım Mühendisi Stajyeri" };

export const jobs: Job[] = [
    {
        company: "Green Pi Works",
        role: { en: "Fullstack Developer", tr: "Fullstack Developer" },
        period: { en: "Aug 2026 — Present", tr: "Ağu 2026 — Günümüz" },
        summary: {
            en: "Client business systems and dashboards, the in-house CRM/ERP/BI platform Pilens, and a 3D virtual art gallery with React and Three.js.",
            tr: "Müşterilere özel yönetim sistemleri ve dashboard'lar, şirketin CRM/ERP/BI platformu Pilens ve React + Three.js ile 3D sanal sanat galerisi.",
        },
        current: true,
    },
    {
        company: "Da Vinci Board Game",
        role: { en: "Fullstack Developer", tr: "Fullstack Developer" },
        period: { en: "Oct 2025 — Jul 2026", tr: "Eki 2025 — Tem 2026" },
        summary: {
            en: "High-traffic business platform with React and NestJS: real-time WebSocket flows and Shopify, Trendyol, Hepsiburada integrations.",
            tr: "React ve NestJS ile yüksek trafikli yönetim platformu: WebSocket ile gerçek zamanlı akışlar; Shopify, Trendyol, Hepsiburada entegrasyonları.",
        },
    },
    {
        company: "OBSS Technology",
        role: intern,
        period: { en: "Jul 2025 — Aug 2025", tr: "Tem 2025 — Ağu 2025" },
        summary: {
            en: "Real-time 3D aircraft tracking app with React and CesiumJS — ranked 1st among all interns.",
            tr: "React ve CesiumJS ile gerçek zamanlı 3D uçak takip uygulaması — stajyerler arasında 1. oldu.",
        },
    },
    {
        company: "TÜBİTAK BİLGEM YTE",
        role: intern,
        period: { en: "Jun 2024 — Aug 2024", tr: "Haz 2024 — Ağu 2024" },
        summary: {
            en: "Full-stack personnel management system with Spring Boot, Next.js and PostgreSQL.",
            tr: "Spring Boot, Next.js ve PostgreSQL ile full-stack personel yönetim sistemi.",
        },
    },
    {
        company: "Turkcell",
        role: intern,
        period: { en: "Aug 2023 — Sep 2023", tr: "Ağu 2023 — Eyl 2023" },
        summary: {
            en: "Backend documentation system for onboarding; testing during a legacy CRM migration.",
            tr: "Ekibe katılımı hızlandıran backend dokümantasyon sistemi; legacy CRM geçişinde test.",
        },
    },
];

export const education: School[] = [
    {
        name: { en: "Hacettepe University", tr: "Hacettepe Üniversitesi" },
        degree: { en: "B.Sc. in Computer Engineering", tr: "Bilgisayar Mühendisliği, Lisans" },
    },
];
