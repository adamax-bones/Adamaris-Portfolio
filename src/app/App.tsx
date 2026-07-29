import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { AboutPage } from "./components/AboutPage";
import { ProjectsPage } from "./components/ProjectsPage";
import { ResumePage } from "./components/ResumePage";
import { ContactPage } from "./components/ContactPage";
import { DrawingCanvas } from "./components/DrawingCanvas";
import { Footer } from "./components/Footer";
import { ScrollVine } from "./components/ScrollVine";
import { EasterEggs } from "./components/EasterEggs";
import { BugJar } from "./components/BugJar";

type Page = "about" | "projects" | "resume" | "contact";

const SECTION_ORDER: Page[] = ["about", "projects", "resume", "contact"];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("about");
  const [isDrawing, setIsDrawing] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const handleNavigate = (page: Page) => {
    document.getElementById(page)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll-spy: highlight whichever section's tab matches what's in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPage(entry.target.id as Page);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
      }}
    >
      {/* Scroll-reactive vine on the left edge */}
      <ScrollVine />

      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main style={{ pointerEvents: isDrawing ? "none" : "auto", position: "relative", zIndex: 3 }}>
        <section id="about" style={{ scrollMarginTop: "88px" }}>
          <AboutPage />
        </section>
        <section id="projects" style={{ scrollMarginTop: "88px" }}>
          <ProjectsPage />
        </section>
        <section id="resume" style={{ scrollMarginTop: "88px" }}>
          <ResumePage />
        </section>
        <section id="contact" style={{ scrollMarginTop: "88px" }}>
          <ContactPage />
        </section>
        <Footer />
      </main>

      {/* Drawing overlay — on top of content */}
      <DrawingCanvas
        isActive={isDrawing}
        onToggle={() => setIsDrawing((v) => !v)}
      />

      {/* Easter eggs */}
      <EasterEggs />

      {/* Roaming bugs — sitewide, draggable, catch them in the jar */}
      <BugJar />
    </div>
  );
}
