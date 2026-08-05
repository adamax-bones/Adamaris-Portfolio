import { useState } from "react";
import { Leaf, Heart } from "lucide-react";

export function Footer() {
  const [hearts, setHearts] = useState(0);
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    const next = hearts + 1;
    setHearts(next);
    if (next >= 5) {
      setBurst(true);
      setTimeout(() => { setBurst(false); setHearts(0); }, 1800);
    }
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: "0.95rem",
        color: "var(--muted-foreground)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {burst && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {["🌿","🌱","🍃","🌾","🍀","🌻","🌲","🌼"].map((e, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                fontSize: "1.5rem",
                animation: `burstOut 1.6s ease-out forwards`,
                transform: `rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes burstOut {
          0%   { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(0); }
          100% { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(-80px); }
        }
      `}</style>

      <Leaf size={13} style={{ color: "var(--primary)", flexShrink: 0 }} />
      <span>cultivated with love</span>
      <button
        onClick={handleClick}
        title="Click a few times…"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0 2px",
          display: "flex",
          alignItems: "center",
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.3)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
      >
        <Heart
          size={13}
          style={{
            color: hearts > 0 ? "var(--accent)" : "var(--muted-foreground)",
            fill: hearts > 0 ? "var(--accent)" : "none",
            transition: "all 0.2s",
          }}
        />
      </button>
      {hearts > 0 && hearts < 5 && (
        <span style={{ fontSize: "0.72rem", color: "var(--accent)", fontStyle: "normal", fontFamily: "'DM Mono', monospace" }}>
          {["💚","🌿🌿","almost…","one more!"][hearts - 1]}
        </span>
      )}
    </footer>
  );
}