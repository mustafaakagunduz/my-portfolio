import { Navbar } from "@/app/components/Navbar";
import { About } from "@/app/components/About";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { Footer } from "@/app/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <About />
            <Projects />
            <Contact />
            <ScrollToTop />
            <Footer />
        </main>
    );
}