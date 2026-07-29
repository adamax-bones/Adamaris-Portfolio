import { Leaf, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

type Page = "about" | "projects" | "resume" | "contact";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const links: { id: Page; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

export function Navigation({ currentPage, onNavigate, theme, onToggleTheme }: NavigationProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
      style={{
        background: "var(--card)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
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

      <div className="flex items-center gap-8">
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

        <motion.button
          onClick={onToggleTheme}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle dark mode"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--secondary)",
            color: "var(--foreground)",
            cursor: "pointer",
          }}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </motion.button>
      </div>
    </nav>
  );
}
