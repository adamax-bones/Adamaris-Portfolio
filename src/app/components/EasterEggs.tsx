import { useState, useEffect } from "react";

// Frog that hops in when you've scrolled to the very bottom
function BottomFrog() {
  const [visible, setVisible] = useState(false);
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const atBottom = doc.scrollTop + window.innerHeight >= doc.scrollHeight - 60;
      setVisible(atBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5.5rem",
        left: "4rem",
        zIndex: 10,
        fontSize: "2.2rem",
        cursor: "pointer",
        animation: "hopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        transition: "transform 0.2s",
        userSelect: "none",
      }}
      onClick={() => setWaving((w) => !w)}
      title="🐸"
    >
      <style>{`
        @keyframes hopIn {
          from { transform: translateY(60px) scale(0.5); opacity: 0; }
          to   { transform: translateY(0)    scale(1);   opacity: 1; }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
      `}</style>
      <span style={{ display: "inline-block", animation: waving ? "wave 0.5s ease 3" : "none" }}>
        🐸
      </span>
      {waving && (
        <div style={{
          position: "absolute",
          bottom: "110%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "0.75rem",
          padding: "0.4rem 0.75rem",
          fontSize: "0.75rem",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          color: "var(--primary)",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(44,32,21,0.12)",
        }}>
          ribbit 🌿
        </div>
      )}
    </div>
  );
}

// Secret word that reveals a doodle on hover — place near the About hero
export function SecretWord({ children, emoji = "🌱", note = "" }: { children: string; emoji?: string; note?: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        style={{
          cursor: "default",
          borderBottom: "1px dashed var(--muted-foreground)",
          transition: "color 0.15s",
          color: revealed ? "var(--accent)" : "inherit",
        }}
      >
        {children}
      </span>
      {revealed && (
        <span
          style={{
            position: "absolute",
            bottom: "115%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "0.75rem",
            padding: "0.35rem 0.65rem",
            fontSize: "1.1rem",
            whiteSpace: "nowrap",
            zIndex: 20,
            boxShadow: "0 4px 12px rgba(44,32,21,0.12)",
            animation: "popUp 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
            pointerEvents: "none",
          }}
        >
          <style>{`@keyframes popUp { from { transform: translateX(-50%) scale(0.7); opacity:0; } to { transform: translateX(-50%) scale(1); opacity:1; } }`}</style>
          {emoji} {note && <span style={{ fontSize: "0.7rem", fontFamily: "'DM Mono',monospace", color: "var(--muted-foreground)" }}>{note}</span>}
        </span>
      )}
    </span>
  );
}

// Konami code → celebration
function KonamiEgg() {
  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  const [seq, setSeq] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setActive(true);
          setTimeout(() => setActive(false), 3000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  const items = ["🌿","🌱","🍃","🌾","🍀","🌻","🌲","🌼","🐸","🦋","🌈","✨"];

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: "1.4rem",
        color: "var(--primary)",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1rem 2rem",
        boxShadow: "0 8px 32px rgba(44,32,21,0.15)",
        animation: "popUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        zIndex: 1,
        textAlign: "center",
      }}>
        🎮 you found the secret garden!
        <div style={{ fontSize: "0.75rem", fontFamily: "'DM Mono',monospace", color: "var(--muted-foreground)", marginTop: "0.3rem" }}>
          ↑↑↓↓←→←→BA
        </div>
      </div>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${-10 + Math.random() * 20}%`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
            animation: `rain ${1.5 + Math.random() * 2}s linear ${Math.random() * 0.8}s forwards`,
          }}
        >
          {items[i % items.length]}
        </div>
      ))}
      <style>{`
        @keyframes rain {
          from { transform: translateY(0) rotate(0deg); opacity: 1; }
          to   { transform: translateY(110vh) rotate(360deg); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export function EasterEggs() {
  return (
    <>
      <BottomFrog />
      <KonamiEgg />
    </>
  );
}
