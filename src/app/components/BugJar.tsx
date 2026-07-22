import { useRef, useState, useCallback, useEffect } from "react";
import pillbug   from "../../imports/1.png";
import worm      from "../../imports/2.png";
import ladybug   from "../../imports/3.png";
import dragonfly from "../../imports/4.png";
import butterfly from "../../imports/5.png";
import bee       from "../../imports/6.png";

const BUGS = [
  { id: "pillbug",   src: pillbug,   w: 90,  h: 68  },
  { id: "worm",      src: worm,      w: 80,  h: 80  },
  { id: "ladybug",   src: ladybug,   w: 72,  h: 72  },
  { id: "dragonfly", src: dragonfly, w: 100, h: 88  },
  { id: "butterfly", src: butterfly, w: 88,  h: 80  },
  { id: "bee",       src: bee,       w: 82,  h: 78  },
];

interface BugState { id: string; x: number; y: number; }

const JAR_W = 380;
const JAR_H = 480;
const PAD = { top: 70, bottom: 45, left: 35, right: 35 };

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

export function BugJar() {
  const jarRef = useRef<HTMLDivElement>(null);

  const [bugs, setBugs] = useState<BugState[]>([
    { id: "pillbug",   x: 55,  y: 80  },
    { id: "worm",      x: 220, y: 75  },
    { id: "ladybug",   x: 160, y: 200 },
    { id: "dragonfly", x: 40,  y: 290 },
    { id: "butterfly", x: 210, y: 290 },
    { id: "bee",       x: 100, y: 360 },
  ]);

  const dragging = useRef<{
    id: string; startX: number; startY: number; origX: number; origY: number;
  } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const bug = bugs.find((b) => b.id === id)!;
    dragging.current = { id, startX: e.clientX, startY: e.clientY, origX: bug.x, origY: bug.y };
  }, [bugs]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const d = dragging.current;
      const def = BUGS.find((b) => b.id === d.id)!;
      setBugs((prev) => prev.map((b) =>
        b.id !== d.id ? b : {
          ...b,
          x: clamp(d.origX + e.clientX - d.startX, PAD.left, JAR_W - PAD.right  - def.w),
          y: clamp(d.origY + e.clientY - d.startY, PAD.top,  JAR_H - PAD.bottom - def.h),
        }
      ));
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <div ref={jarRef} style={{ position: "relative", width: JAR_W, height: JAR_H, userSelect: "none" }}>

        {/* Jar SVG shell */}
        <svg
          viewBox={`0 0 ${JAR_W} ${JAR_H}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(245,240,232,0.55)" />
              <stop offset="35%"  stopColor="rgba(245,240,232,0.10)" />
              <stop offset="70%"  stopColor="rgba(245,240,232,0.18)" />
              <stop offset="100%" stopColor="rgba(245,240,232,0.55)" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#8aab6c" />
              <stop offset="100%" stopColor="#5a7a35" />
            </linearGradient>
          </defs>

          {/* Lid */}
          <rect x="86" y="10" width="208" height="20" rx="7" fill="#5a7a35" />
          <rect x="78" y="22" width="224" height="36" rx="6" fill="url(#lidGrad)" />
          {[100,130,160,190,220,250,280].map((x) => (
            <line key={x} x1={x} y1="22" x2={x} y2="58" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          ))}

          {/* Body fill */}
          <path
            d="M 95 60 Q 30 80 28 190 L 28 420 Q 28 458 190 458 Q 352 458 352 420 L 352 190 Q 350 80 285 60 Z"
            fill="rgba(214,232,196,0.28)"
            stroke="rgba(44,80,22,0.35)"
            strokeWidth="2.5"
          />
          {/* Glass sheen overlay */}
          <path
            d="M 95 60 Q 30 80 28 190 L 28 420 Q 28 458 190 458 Q 352 458 352 420 L 352 190 Q 350 80 285 60 Z"
            fill="url(#glassGrad)"
          />
          {/* Highlight stripe */}
          <path d="M 58 115 Q 48 200 52 340" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="9" strokeLinecap="round" />
        </svg>

        {/* Bug images */}
        {BUGS.map((def) => {
          const state = bugs.find((b) => b.id === def.id)!;
          return (
            <img
              key={def.id}
              src={def.src}
              alt={def.id}
              draggable={false}
              onMouseDown={(e) => onMouseDown(e, def.id)}
              style={{
                position: "absolute",
                left: state.x,
                top: state.y,
                width: def.w,
                height: def.h,
                objectFit: "contain",
                cursor: "grab",
                zIndex: 2,
                /* white backgrounds disappear on the light jar surface */
                mixBlendMode: "multiply",
                filter: "drop-shadow(0 2px 5px rgba(44,32,21,0.22))",
                transition: "filter 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!dragging.current)
                  (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 4px 10px rgba(44,32,21,0.35)) brightness(1.05)";
              }}
              onMouseLeave={(e) => {
                if (!dragging.current)
                  (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 2px 5px rgba(44,32,21,0.22))";
              }}
            />
          );
        })}
      </div>

      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.68rem",
        color: "var(--muted-foreground)",
        letterSpacing: "0.06em",
        textAlign: "center",
      }}>
        drag the bugs around ↑
      </p>
    </div>
  );
}
