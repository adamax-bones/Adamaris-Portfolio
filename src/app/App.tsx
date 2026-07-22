import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { AboutPage } from "./components/AboutPage";
import { ProjectsPage } from "./components/ProjectsPage";
import { ResumePage } from "./components/ResumePage";
import { ContactPage } from "./components/ContactPage";
import { DrawingCanvas } from "./components/DrawingCanvas";
import { Footer } from "./components/Footer";
import { GridBackground } from "./components/GridBackground";
import { ScrollVine } from "./components/ScrollVine";
import { EasterEggs } from "./components/EasterEggs";

type Page = "about" | "projects" | "resume" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("about");
  const [isDrawing, setIsDrawing] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case "about":    return <AboutPage />;
      case "projects": return <ProjectsPage />;
      case "resume":   return <ResumePage />;
      case "contact":  return <ContactPage />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
      }}
    >
      <GridBackground />

      {/* Scroll-reactive vine on the left edge */}
      <ScrollVine />

      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <main style={{ pointerEvents: isDrawing ? "none" : "auto", position: "relative", zIndex: 3 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
        <Footer />
      </main>

      {/* Drawing overlay — on top of content */}
      <DrawingCanvas
        isActive={isDrawing}
        onToggle={() => setIsDrawing((v) => !v)}
      />

      {/* Easter eggs */}
      <EasterEggs />
    </div>
  );
}
