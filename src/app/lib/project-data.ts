import { Language} from "@/app/components/LanguageProvider";

export interface Project {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    technologies: string[];
    imageUrl?: string;
    images?: string[];
    demoUrl?: string;
    githubUrl?: string;
}

export const projects: Project[] = [
    {
        id: "pilens",
        title: {
            en: "PiLens",
            tr: "PiLens",
        },
        description: {
            en: "A multi-tenant business intelligence and sales/operations platform for SMEs that aren't digitalized yet: users upload their own Excel/CSV files and get a working dashboard in minutes, without writing SQL. A secure query engine turns JSON query specs into SQL; it also includes drag-and-drop dashboards, drill-down, scheduled PDF reports, threshold alerts, an AI assistant that answers only from the tenant's own data, dynamic role and permission management, and a CRM module covering accounts, meetings, opportunities, quotes, projects, orders, stock and a product catalog.",
            tr: "Henüz dijitalleşmemiş KOBİ'ler için çok kiracılı bir iş zekâsı ve satış/operasyon platformu: kullanıcı SQL bilmeden kendi Excel/CSV dosyasını yükleyip dakikalar içinde çalışan bir dashboard elde eder. JSON sorgu tanımlarını güvenli SQL'e çeviren bir sorgu motoru; sürükle-bırak panolar, detaya inme, zamanlanmış PDF raporları, eşik alarmları, yalnızca kiracının kendi verisinden cevap veren yapay zekâ asistanı, dinamik rol/yetki yönetimi ve cari, görüşme, fırsat, teklif, proje, sipariş, stok ve ürün kataloğunu kapsayan bir CRM modülü içerir."
        },
        technologies: ["NestJS", "React", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "ECharts", "OpenAI API", "Socket.IO", "Cloudflare R2"],
        imageUrl: "/projects/pilens/pilens-1.webp",
        images: ["/projects/pilens/pilens-1.webp", "/projects/pilens/pilens-2.webp", "/projects/pilens/pilens-3.webp"],
        demoUrl: "https://pilens.com.tr",
    },
    {
        id: "vea",
        title: {
            en: "Virtual Exhibition Art",
            tr: "Virtual Exhibition Art",
        },
        description: {
            en: "A digital art platform where artworks are exhibited and sold in explorable 3D virtual galleries, accessible from web and mobile. Artists create and publish their own exhibitions from a panel; visitors walk through the rooms with first-person controls and collision detection, make offers on artworks through a concurrency-safe sales flow, and see live visitor counts over WebSockets.",
            tr: "Sanat eserlerinin gezilebilir 3D sanal galerilerde sergilenip satılabildiği, web ve mobilden erişilebilen bir dijital sanat platformu. Sanatçılar panelden kendi sergilerini oluşturup yayınlar; ziyaretçiler odaları birinci şahıs kontrolleri ve çarpışma algılamayla gezer, eşzamanlılığa karşı korumalı satış akışıyla eserlere teklif verir ve canlı ziyaretçi sayısını WebSocket üzerinden görür."
        },
        technologies: ["React Three Fiber", "Three.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Socket.IO", "React Native"],
        imageUrl: "/projects/virtual-exhibition-art/vea-1.webp",
        images: ["/projects/virtual-exhibition-art/vea-1.webp", "/projects/virtual-exhibition-art/vea-2.webp", "/projects/virtual-exhibition-art/vea-3.webp"],
        demoUrl: "https://virtualexhibitionart.com",
    },
    {
        id: "assid",
        title: {
            en: "ASSİD Association Platform",
            tr: "ASSİD Dernek Platformu",
        },
        description: {
            en: "The web platform and mobile app of ASSİD (Ankara Siteler Industrialists and Businesspeople Association): a public website with news, events, board and president pages and a searchable member company directory, plus member and admin panels for online membership applications, membership fees, messaging, push notifications and PDF document generation.",
            tr: "ASSİD'in (Ankara Siteler Sanayici ve İş İnsanları Derneği) web platformu ve mobil uygulaması: haberler, etkinlikler, yönetim kurulu ve başkanın mesajı sayfaları ile aranabilir üye firma rehberi içeren kurumsal bir site; online üyelik başvurusu, aidat takibi, mesajlaşma, anlık bildirimler ve PDF belge üretimi sunan üye ve yönetici panelleri."
        },
        technologies: ["NestJS", "React", "React Native", "Expo", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Socket.IO", "Tailwind CSS"],
        imageUrl: "/projects/assid/assid-1.webp",
        images: ["/projects/assid/assid-1.webp", "/projects/assid/assid-2.webp", "/projects/assid/assid-3.webp"],
        demoUrl: "https://assid-frontend-react.vercel.app",
    },
    {
        id: "greenpi-enerji",
        title: {
            en: "Green Pi Energy Website",
            tr: "Green Pi Enerji Web Sitesi",
        },
        description: {
            en: "The corporate website of Green Pi Energy: an interactive map of buildings such as solar power plants, malls, hospitals and data centers; clicking a building opens a filter drawer listing products suited to that location. Products, 3D models and videos are managed from a hidden admin panel backed by an API and a Postgres database, with media served via Cloudinary and automatic deployment to a VPS.",
            tr: "Green Pi Enerji'nin kurumsal web sitesi: GES santrali, AVM, hastane, veri merkezi gibi binaların yer aldığı interaktif bir harita; bir binaya tıklayınca o lokasyona uygun ürünleri listeleyen bir filtre paneli açılır. Ürünler, 3D modeller ve videolar API ve Postgres veritabanına bağlı gizli bir yönetim panelinden yönetilir; medya Cloudinary üzerinden sunulur, VPS'e otomatik deploy edilir."
        },
        technologies: ["React", "TypeScript", "Vite", "Fastify", "PostgreSQL", "Prisma", "GSAP", "Tailwind CSS", "Cloudinary", "Docker"],
        imageUrl: "/projects/greenpi/greenpi-1.webp",
        images: ["/projects/greenpi/greenpi-1.webp", "/projects/greenpi/greenpi-2.webp", "/projects/greenpi/greenpi-3.webp", "/projects/greenpi/greenpi-4.webp"],
        demoUrl: "https://greenpi.com.tr",
    },
    {
        id: "adanex",
        title: {
            en: "Adanex Website",
            tr: "Adanex Web Sitesi",
        },
        description: {
            en: "The bilingual corporate website of Adanex, a company selling ATEX-certified equipment for flammable and explosive environments. Built for an award-level experience with scroll-driven GSAP animations, smooth scrolling, custom page transitions and a custom cursor, with SEO-friendly language-based routing.",
            tr: "Yanıcı ve patlayıcı ortamlarda kullanılan ATEX sertifikalı ekipmanlar satan Adanex firmasının iki dilli kurumsal web sitesi. Scroll'a bağlı GSAP animasyonları, yumuşak kaydırma, özel sayfa geçişleri ve özel imleçle ödül seviyesinde bir deneyim hedeflenerek, SEO dostu dil bazlı yönlendirmeyle geliştirildi."
        },
        technologies: ["React", "TypeScript", "Vite", "GSAP", "Lenis", "i18next", "Vercel"],
        imageUrl: "/projects/adanex/adanex-1.webp",
        images: ["/projects/adanex/adanex-1.webp", "/projects/adanex/adanex-2.webp", "/projects/adanex/adanex-3.webp", "/projects/adanex/adanex-4.webp"],
        demoUrl: "https://adanex.greenpiworks.com",
    },
    {
        id: "ergu",
        title: {
            en: "Ergu Energy Website",
            tr: "Ergu Enerji Web Sitesi",
        },
        description: {
            en: "The bilingual corporate website of Ergu Energy, opening with a full-screen, real-time 3D city scene. Features GSAP-driven page transitions and animations, nested navigation for industries and products, and an admin panel for managing the gallery and certificates, with images stored on Cloudflare R2.",
            tr: "Ergu Enerji'nin, tam ekran ve gerçek zamanlı bir 3D şehir sahnesiyle açılan iki dilli kurumsal web sitesi. GSAP ile sayfa geçişleri ve animasyonlar, endüstri ve ürünler için iç içe menüler, galeri ve belgeleri yönetmek için bir yönetim paneli içerir; görseller Cloudflare R2'de saklanır."
        },
        technologies: ["React", "TypeScript", "Vite", "React Three Fiber", "Three.js", "GSAP", "Cloudflare R2", "Vercel"],
        imageUrl: "/projects/ergu/ergu-1.webp",
        images: ["/projects/ergu/ergu-1.webp", "/projects/ergu/ergu-2.webp", "/projects/ergu/ergu-3.webp"],
        demoUrl: "https://ergu.greenpiworks.com",
    },
    {
        id: "davinci",
        title: {
            en: "Da Vinci Board Game Cafe",
            tr: "Da Vinci Board Game Cafe",
        },
        description: {
            en: "The bilingual website of Da Vinci Board Game Cafe: an animated hero slider introducing the cafe, the monthly activity calendar and the latest Instagram posts pulled from an API, plus location and contact sections.",
            tr: "Da Vinci Board Game Cafe'nin iki dilli web sitesi: kafeyi tanıtan animasyonlu bir slider, API'den çekilen aylık etkinlik takvimi ve son Instagram paylaşımları, konum ve iletişim bölümleri."
        },
        technologies: ["React", "TypeScript", "Vite", "Framer Motion", "TanStack Query", "Swiper", "i18next"],
        imageUrl: "/projects/davinci/davinci-1.webp",
        images: ["/projects/davinci/davinci-1.webp", "/projects/davinci/davinci-2.webp", "/projects/davinci/davinci-3.webp"],
        demoUrl: "https://www.davinciboardgame.com",
    },
    {
        id: "rolefit",
        title: {
            en: "RoleFit",
            tr: "RoleFit",
        },
        description: {
            en: "An AI-powered service that analyzes how well a CV (text or PDF) fits a job description: a multi-step pipeline extracts candidate skills and role requirements, then compares them via OpenAI structured outputs to produce a fit score, matched skills with evidence, gaps with concrete suggestions, and CV bullet ideas.",
            tr: "Bir CV'nin (metin veya PDF) bir iş ilanına ne kadar uyduğunu analiz eden yapay zekâ destekli bir servis: çok adımlı bir akış önce aday becerilerini ve rol gereksinimlerini çıkarır, sonra OpenAI'ın yapılandırılmış çıktısıyla karşılaştırıp bir uyum skoru, kanıtlı eşleşen beceriler, somut önerili açıklar ve CV madde önerileri üretir."
        },
        technologies: ["ASP.NET Core", "C#", "React", "TypeScript", "OpenAI API", "PdfPig"],
        imageUrl: "/projects/rolefit/rolefit-1.webp",
        images: ["/projects/rolefit/rolefit-1.webp", "/projects/rolefit/rolefit-2.webp"],
        githubUrl: "https://github.com/mustafaakagunduz/RoleFit",
    },
    {
        id: "pinorex",
        title: {
            en: "Pinorex",
            tr: "Pinorex",
        },
        description: {
            en: "A real estate portfolio management panel that lets agencies list, filter, and track their properties on an interactive map, with team-based access and status management.",
            tr: "Emlak ofislerinin mülk portföylerini interaktif bir harita üzerinde listeleyip filtreleyebildiği, ekip bazlı erişim ve durum yönetimi sunan bir gayrimenkul yönetim paneli."
        },
        technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
        imageUrl: "/projects/pinorex/pinorex-1.webp",
        images: ["/projects/pinorex/pinorex-1.webp", "/projects/pinorex/pinorex-2.webp"],
        githubUrl: "https://github.com/mustafaakagunduz/emlakci-tenant",
    },
    {
        id: "skytrack",
        title: {
            en: "SkyTrack",
            tr: "SkyTrack",
        },
        description: {
            en: "A real-time aircraft tracking platform: a simulator or the live OpenSky Network API feeds positions into PostGIS, broadcast over WebSockets and rendered live on a MapLibre map, with radius search, flight trails, and filters.",
            tr: "Gerçek zamanlı hava aracı takip platformu: simülatör veya canlı OpenSky Network API'sinden gelen konumlar PostGIS'e işlenir, WebSocket üzerinden yayınlanır ve MapLibre haritasında canlı olarak gösterilir; yarıçap araması, uçuş izleri ve filtreler içerir."
        },
        technologies: ["Django", "PostgreSQL", "PostGIS", "Redis", "React", "TypeScript", "MapLibre GL", "Tailwind CSS", "Docker"],
        imageUrl: "/projects/skytrack/skytrack-1.webp",
        images: ["/projects/skytrack/skytrack-1.webp", "/projects/skytrack/skytrack-2.webp"],
        githubUrl: "https://github.com/mustafaakagunduz/sky-track",
    },
    /*{
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
        imageUrl: "/projects/dgd/dgd.webp",
        demoUrl: "https://dgd-taupe.vercel.app",

    },*/{
        id: "project-0",
        title: {
            en: "AIR Guard",
            tr: "AIR Guard",
        },
        description: {
            en: "Real-time aircraft tracking application",
            tr: "Gerçek zamanlı hava aracı takip uygulaması"
        },
        technologies: ["React", "TypeScript", "Vite", "Express", "WebSocket"],
        imageUrl: "/projects/air-guard/aircommand-2.webp",
        images: ["/projects/air-guard/aircommand-2.webp", "/projects/air-guard/aircommand-1.webp"],
    },

    {
        id: "project-new",
        title: {
            en: "Transyük",
            tr: "Transyük",
        },
        description: {
            en: "A logistics platform that connects shippers, carriers, and brokers in road and maritime transportation, streamlining bidding, matching, and end-to-end shipment management.",
            tr: "Karayolu ve denizyolu taşımacılığında yük sahipleri, taşıyıcılar ve brokerları tek bir platformda buluşturan; teklif, eşleştirme ve süreç yönetimini kolaylaştıran bir lojistik platform."
        },
        technologies: ["Spring Boot", "Next.js", "React", "TypeScript", "Tailwind CSS", "WebSocket", "AWS", "Vercel"],
        imageUrl: "/projects/transyuk/transyuk-1.webp",
        images: ["/projects/transyuk/transyuk-1.webp", "/projects/transyuk/transyuk-2.webp", "/projects/transyuk/transyuk-3.webp", "/projects/transyuk/transyuk-4.webp", "/projects/transyuk/transyuk-5.webp", "/projects/transyuk/transyuk-6.webp", "/projects/transyuk/transyuk-7.webp", "/projects/transyuk/transyuk-8.webp"],
    },

    {
        id: "project-new-2",
        title: {
            en: "Encera",
            tr: "Ençera",
        },
        description: {
            en: "A real estate platform where listings are evaluated through user ratings and reviews, enabling low-commission transactions while promoting more transparent and fair pricing through community-driven feedback.",
            tr: "Emlak ilanlarının kullanıcı yorumları ve puanlamalarıyla değerlendirildiği; düşük komisyonlu işlem imkânı sunarken topluluk geri bildirimleriyle daha şeffaf ve adil fiyatlandırmayı teşvik eden bir emlak platformu."
        },
        technologies: ["Spring Boot", "Next.js", "React", "TypeScript", "Redis", "Tailwind CSS", "WebSocket", "AWS"],
        imageUrl: "/projects/encera/encera-1.webp",
        images: ["/projects/encera/encera-1.webp", "/projects/encera/encera-2.webp","/projects/encera/encera-3.webp"],
        githubUrl: "https://github.com/mustafaakagunduz/encera-be"
    },

    {
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
        imageUrl: "/projects/skillfit/hrsam.webp",
        images: ["/projects/skillfit/hrsam.webp" , "/projects/skillfit/skillfit-1.webp","/projects/skillfit/skillfit-2.webp","/projects/skillfit/skillfit-5.webp","/projects/skillfit/skillfit-6.webp"],

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
        imageUrl: "/projects/question-tracker/question.webp",
        images: ["/projects/question-tracker/question.webp"],
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
        imageUrl: "/projects/kanban/kanban.webp",
        images: ["/projects/kanban/kanban.webp"],
        demoUrl: "https://personal-kanban-board.vercel.app",
        githubUrl: "https://github.com/mustafaakagunduz/personal-kanban-board"
    },
    /*{
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
        imageUrl: "/projects/uzgunuz/uzgunuz.webp",
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
        imageUrl: "/projects/weather-wear/ww.webp",
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
        imageUrl: "/projects/shopsmart/shopsmart.webp",
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
        imageUrl: "/projects/spring-concepts/spring.webp",
        demoUrl: "https://interior-design-company-website.vercel.app",
        githubUrl: "https://github.com/mustafaakagunduz/interior-design-company-website"
    }*/
];