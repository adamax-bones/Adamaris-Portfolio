import { useCallback, useEffect, useRef, useState } from "react";
import pillbug from "../../imports/1.png";
import worm from "../../imports/2.png";
import ladybug from "../../imports/3.png";
import dragonfly from "../../imports/4.png";
import butterfly from "../../imports/5.png";
import bee from "../../imports/6.png";

const BUG_DEFS = [
  { id: "pillbug", src: pillbug, w: 56, h: 42 },
  { id: "worm", src: worm, w: 50, h: 50 },
  { id: "ladybug", src: ladybug, w: 44, h: 44 },
  { id: "dragonfly", src: dragonfly, w: 60, h: 52 },
  { id: "butterfly", src: butterfly, w: 54, h: 48 },
  { id: "bee", src: bee, w: 50, h: 46 },
];

type BugStatus = "wandering" | "dragging" | "caught";

interface BugState {
  id: string;
  x: number;
  y: number;
  status: BugStatus;
  duration: number;
}

const JAR_W = 92;
const JAR_H = 116;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function BugJar() {
  const jarRef = useRef<HTMLDivElement>(null);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const statusRef = useRef<Record<string, BugStatus>>({});
  const dragInfo = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const [bugs, setBugs] = useState<BugState[]>(() =>
    BUG_DEFS.map((def) => ({
      id: def.id,
      x: rand(60, Math.max(200, window.innerWidth - 120)),
      y: rand(140, Math.max(300, window.innerHeight - 160)),
      status: "wandering" as BugStatus,
      duration: 1200,
    }))
  );

  const [caughtIds, setCaughtIds] = useState<string[]>([]);

  const scheduleMove = useCallback((id: string) => {
    const def = BUG_DEFS.find((b) => b.id === id)!;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const goesOffscreen = Math.random() < 0.18;

    let targetX: number;
    let targetY: number;

    if (goesOffscreen) {
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) { targetX = -def.w - 40; targetY = rand(60, vh - 100); }
      else if (edge === 1) { targetX = vw + 40; targetY = rand(60, vh - 100); }
      else if (edge === 2) { targetX = rand(40, vw - 100); targetY = -def.h - 40; }
      else { targetX = rand(40, vw - 100); targetY = vh + 40; }
    } else {
      targetX = rand(20, vw - def.w - 20);
      targetY = rand(90, vh - def.h - 30);
    }

    setBugs((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const dist = Math.hypot(targetX - b.x, targetY - b.y);
        const duration = Math.max(900, Math.min(3200, dist * 6));

        clearTimeout(timers.current[id]);
        timers.current[id] = setTimeout(() => {
          if (statusRef.current[id] !== "wandering") return;
          const pause = goesOffscreen ? 1000 + rand(0, 400) : rand(500, 1800);
          timers.current[id] = setTimeout(() => {
            if (statusRef.current[id] === "wandering") scheduleMove(id);
          }, pause);
        }, duration);

        return { ...b, x: targetX, y: targetY, duration };
      })
    );
  }, []);

  useEffect(() => {
    BUG_DEFS.forEach((def) => {
      statusRef.current[def.id] = "wandering";
      timers.current[def.id] = setTimeout(() => scheduleMove(def.id), rand(200, 1500));
    });
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, [scheduleMove]);

  const onBugMouseDown = (e: React.MouseEvent, id: string) => {
    if (caughtIds.includes(id)) return;
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragInfo.current = { id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
    statusRef.current[id] = "dragging";
    clearTimeout(timers.current[id]);
    setBugs((prev) => prev.map((b) => (b.id === id ? { ...b, status: "dragging", duration: 0 } : b)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const info = dragInfo.current;
      if (!info) return;
      const newX = e.clientX - info.offsetX;
      const newY = e.clientY - info.offsetY;
      setBugs((prev) => prev.map((b) => (b.id === info.id ? { ...b, x: newX, y: newY } : b)));
    };

    const onUp = () => {
      const info = dragInfo.current;
      if (!info) return;
      dragInfo.current = null;
      const { id } = info;

      setBugs((prev) => {
        const bug = prev.find((b) => b.id === id);
        const def = BUG_DEFS.find((d) => d.id === id)!;
        if (bug && jarRef.current) {
          const jarRect = jarRef.current.getBoundingClientRect();
          const overlap =
            bug.x < jarRect.right &&
            bug.x + def.w > jarRect.left &&
            bug.y < jarRect.bottom &&
            bug.y + def.h > jarRect.top;

          if (overlap) {
            statusRef.current[id] = "caught";
            setCaughtIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
            return prev.map((b) => (b.id === id ? { ...b, status: "caught" } : b));
          }
        }
        statusRef.current[id] = "wandering";
        return prev.map((b) => (b.id === id ? { ...b, status: "wandering" } : b));
      });

      setTimeout(() => {
        if (statusRef.current[id] === "wandering") scheduleMove(id);
      }, 50);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [scheduleMove]);

  const freeBugs = bugs.filter((b) => !caughtIds.includes(b.id));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 20, pointerEvents: "none" }}>
      {freeBugs.map((bug) => {
        const def = BUG_DEFS.find((d) => d.id === bug.id)!;
        return (
          <img
            key={bug.id}
            src={def.src}
            alt=""
            draggable={false}
            onMouseDown={(e) => onBugMouseDown(e, bug.id)}
            style={{
              position: "fixed",
              left: bug.x,
              top: bug.y,
              width: def.w,
              height: def.h,
              objectFit: "contain",
              cursor: bug.status === "dragging" ? "grabbing" : "grab",
              pointerEvents: "auto",
              transition:
                bug.status === "wandering"
                  ? `left ${bug.duration}ms ease-in-out, top ${bug.duration}ms ease-in-out`
                  : "none",
              filter: "drop-shadow(0 3px 6px rgba(44,32,21,0.25))",
            }}
          />
        );
      })}

      {/* Jar — the drop target, initially empty */}
      <div
        ref={jarRef}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: JAR_W,
          height: JAR_H,
          pointerEvents: "auto",
        }}
      >
        <svg
          viewBox={`0 0 ${JAR_W} ${JAR_H}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <rect x={JAR_W * 0.28} y="4" width={JAR_W * 0.44} height="8" rx="3" fill="#5a7a35" />
          <rect x={JAR_W * 0.22} y="10" width={JAR_W * 0.56} height="14" rx="4" fill="#8aab6c" />
          <path
            d={`M ${JAR_W * 0.24} 24 Q ${JAR_W * 0.08} 32 ${JAR_W * 0.07} 60 L ${JAR_W * 0.07} ${JAR_H - 12} Q ${JAR_W * 0.07} ${JAR_H} ${JAR_W * 0.5} ${JAR_H} Q ${JAR_W * 0.93} ${JAR_H} ${JAR_W * 0.93} ${JAR_H - 12} L ${JAR_W * 0.93} 60 Q ${JAR_W * 0.92} 32 ${JAR_W * 0.76} 24 Z`}
            fill="rgba(214,232,196,0.32)"
            stroke="rgba(44,80,22,0.4)"
            strokeWidth="2"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: "26px 10px 10px 10px",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-end",
            gap: "3px",
            justifyContent: "center",
          }}
        >
          {caughtIds.map((id) => {
            const def = BUG_DEFS.find((d) => d.id === id)!;
            return (
              <img
                key={id}
                src={def.src}
                alt=""
                style={{ width: 22, height: 22, objectFit: "contain" }}
              />
            );
          })}
        </div>

        <p
          style={{
            position: "absolute",
            bottom: "-20px",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.62rem",
            color: "var(--muted-foreground)",
            letterSpacing: "0.05em",
          }}
        >
          {caughtIds.length}/{BUG_DEFS.length} caught
        </p>
      </div>
    </div>
  );
}
