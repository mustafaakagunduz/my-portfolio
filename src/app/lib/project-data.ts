import { Language} from "@/app/components/LanguageProvider";

export interface Project {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    technologies: string[];
    imageUrl: string;
    demoUrl?: string;
    githubUrl?: string;
}

export const projects: Project[] = [
    {
        id: "project-1",
        title: {
            en: "DGD Global Website",
            tr: "DGD Global Web Sitesi",
        },
        description: {
            en: "The website of DGD Global, a company operating in the field of green technology.",
            tr: "Yeşil teknoloji alanında faaliyet göstermekte olan DGD Global şirketinin web sayfası"
        },
        technologies: ["Supabase", "Next.js", "React", "TypeScript", "Tailwind CSS", "Resend", "Brevo", "Vercel"],
        imageUrl: "/dgd.png",
        demoUrl: "https://dgd-taupe.vercel.app",

    },{
        id: "project-2",
        title: {
            en: "SkillFit",
            tr: "SkillFit",
        },
        description: {
            en: "SkillFit is an innovative AI-powered web platform designed to help individuals and companies adapt to today's rapidly changing workforce market.",
            tr: "SkillFit, bireylerin ve şirketlerin günümüzün hızla değişen iş gücü piyasasına uyum sağlamalarına yardımcı olmak için tasarlanmış, yapay zeka destekli yenilikçi bir web platformdur."
        },
        technologies: ["Spring Boot", "Next.js", "React", "TypeScript", "Tailwind CSS", "OpenAI API", "AWS", "Vercel"],
        imageUrl: "/hrsam.png",
        demoUrl: "https://www.hrsam.org/",
        githubUrl: "https://github.com/mustafaakagunduz/BBM479-BE"
    },{
        id: "project-3",
        title: {
            en: "Algorithm Question Tracker",
            tr: "Algoritma Soru Takipçisi ",
        },
        description: {
            en: "A web application that helps users repeat previously solved algorithm questions at intervals according to the difficulty levels they determine.",
            tr: "Kullanıcıların daha önce çözdükleri algoritma sorularını, kendi belirledikleri zorluk seviyelerine göre aralıklı tekrar etmelerine yardımcı olan web uygulaması."
        },
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
        imageUrl: "/question.png",
        demoUrl: "https://question-tracker-seven.vercel.app",
        githubUrl: "https://github.com/mustafaakagunduz/question-tracker"
    },
    {
        id: "project-4",
        title: {
            en: "My Kanban",
            tr: "Kanbanım",
        },
        description: {
            en: "A personal Kanban board application that allows users to organize and track their tasks through customizable task cards or daily schedules, similar to Jira. Helps with personal productivity and project management.",
            tr: "Kullanıcıların görevlerini özelleştirilebilir görev kartları veya günlük programlar aracılığıyla (Jira benzeri) düzenlemesine ve takip etmesine olanak tanıyan kişisel bir Kanban tahta uygulaması. Kişisel üretkenlik ve proje yönetiminde yardımcı olur."
        },
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
        imageUrl: "/kanban.png",
        demoUrl: "https://www.kanban.im",
        githubUrl: "https://github.com/mustafaakagunduz/personal-kanban-board"
    },
    {
        id: "project-5",
        title: {
            en: "Sorry, but..",
            tr: "Üzgünüz, fakat..",
        },
        description: {
            en: "An AI-powered application for the recruitment process that helps candidates create personalized cover letters based on job postings. It also allows employers to evaluate how suitable candidates are for specific job positions.",
            tr: "İş ilanlarına göre adayların kişiselleştirilmiş niyet mektupları oluşturmasına yardımcı olan, aynı zamanda işverenlerin adayların belirli iş pozisyonlarına ne kadar uygun olduğunu değerlendirmesine olanak tanıyan yapay zeka destekli bir işe alım süreci uygulaması."
        },
        technologies: ["React", "TypeScript", "Tailwind CSS", "OpenAI API", "Vercel"],
        imageUrl: "/uzgunuz.png",
        demoUrl: "https://www.uzgunuz-fakat.com",
        githubUrl: "https://github.com/mustafaakagunduz/match-app-react"
    },
    {
        id: "project-6",
        title: {
            en: "Weather Wear",
            tr: "Weather Wear",
        },
        description: {
            en: "An AI-powered application that automatically detects the user's location and provides clothing recommendations based on their location and gender. Helps users dress appropriately for the weather conditions in their area.",
            tr: "Kullanıcının konumunu otomatik olarak tespit eden ve bulunduğu konuma ve cinsiyetine göre kıyafet önerileri sunan yapay zeka destekli bir uygulama. Kullanıcıların bulundukları bölgedeki hava koşullarına uygun giyinmelerine yardımcı olur."
        },
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "OpenAI API", "Vercel"],
        imageUrl: "/ww.png",
        demoUrl: "https://weather-wear-three.vercel.app",
        githubUrl: "https://github.com/mustafaakagunduz/weather-wear"
    },
    {
        id: "project-7",
        title: {
            en: "Shopsmart",
            tr: "Shopsmart",
        },
        description: {
            en: "A concept e-commerce platform showcasing modern web design and user experience principles. Features product listings, search functionality, favorites, and a responsive layout for all devices.",
            tr: "Modern web tasarım ve kullanıcı deneyimi prensiplerini sergileyen konsept bir e-ticaret platformu. Ürün listeleri, arama işlevi, favoriler ve tüm cihazlar için duyarlı bir düzen içerir."
        },
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
        imageUrl: "/shopsmart.png",
        demoUrl: "https://e-commerce-website-react-xi.vercel.app/favorites",
        githubUrl: "https://github.com/mustafaakagunduz/e-commerce-website-react"
    },
    {
        id: "project-8",
        title: {
            en: "Spring Concepts",
            tr: "Spring Concepts",
        },
        description: {
            en: "A concept presentation website for an interior design company. Showcases the company's portfolio, services, and design philosophy with a clean, modern interface and responsive design.",
            tr: "Bir iç mimarlık şirketi için konsept tanıtım web sitesi. Şirketin portföyünü, hizmetlerini ve tasarım felsefesini temiz, modern bir arayüz ve duyarlı tasarımla sergiler."
        },
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
        imageUrl: "/spring.png",
        demoUrl: "https://interior-design-company-website.vercel.app",
        githubUrl: "https://github.com/mustafaakagunduz/interior-design-company-website"
    }
];