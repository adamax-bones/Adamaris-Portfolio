import { Leaf } from "lucide-react";
import { motion } from "motion/react";

type Page = "about" | "projects" | "resume" | "contact";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const links: { id: Page; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(245, 240, 232, 0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(44, 32, 21, 0.12)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <motion.button
        onClick={() => onNavigate("about")}
        className="flex items-center gap-2"
        whileHover={{ scale: 1.04, rotate: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <motion.div
          animate={{ rotate: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf size={20} className="text-primary" />
        </motion.div>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem",
            color: "var(--primary)",
            fontStyle: "italic",
          }}
        >
          my garden
        </span>
      </motion.button>

      <ul className="flex items-center gap-8">
        {links.map((link) => (
          <li key={link.id} className="relative">
            <motion.button
              onClick={() => onNavigate(link.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "0.9rem",
                letterSpacing: "0.06em",
                color: currentPage === link.id ? "var(--accent)" : "var(--foreground)",
                paddingBottom: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {link.label}
              {currentPage === link.id && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "2px",
                    background: "var(--accent)",
                    borderRadius: "1px",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
