import { useCallback, useEffect, useRef, useState } from "react";
import pillbug from "../../imports/1.png";
import worm from "../../imports/2.png";
import ladybug from "../../imports/3.png";
import dragonfly from "../../imports/4.png";
import butterfly from "../../imports/5.png";
import bee from "../../imports/6.png";
import terrariumJar from "../../assets/terrarium-jar.png";

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

// Big jar (shown at the top of the page, next to the hero heading)
const BIG_JAR_W = 300;
const BIG_JAR_H = 388;

// Small widget (shown once you've scrolled past the hero)
const SMALL_JAR_W = 70;
const SMALL_JAR_H = 90;

const SCROLL_THRESHOLD = 420;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function BugJar() {
  const jarRef = useRef<HTMLDivElement>(null);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const statusRef = useRef<Record<string, BugStatus>>({});
  const dragInfo = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const [atTop, setAtTop] = useState(true);

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

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        const duration = Math.max(2200, Math.min(6500, dist * 13));

        clearTimeout(timers.current[id]);
        timers.current[id] = setTimeout(() => {
          if (statusRef.current[id] !== "wandering") return;
          const pause = goesOffscreen ? 1000 + rand(0, 400) : rand(1200, 3200);
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

      {atTop ? (
        /* Big terrarium jar — shown near the hero heading at the top of the page */
        <div
          ref={jarRef}
          style={{
            position: "fixed",
            top: "150px",
            right: "8%",
            width: BIG_JAR_W,
            height: BIG_JAR_H,
            pointerEvents: "auto",
            transition: "opacity 0.4s ease",
          }}
        >
          <img
            src={terrariumJar}
            alt="A glass jar terrarium"
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "18%",
              right: "18%",
              bottom: "22%",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-end",
              gap: "4px",
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
                  style={{ width: 26, height: 26, objectFit: "contain" }}
                />
              );
            })}
          </div>

          <p
            style={{
              position: "absolute",
              bottom: "-24px",
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              color: "var(--muted-foreground)",
              letterSpacing: "0.05em",
            }}
          >
            Place bugs in the jar
          </p>
        </div>
      ) : (
        /* Small catch widget — shown once scrolled past the hero */
        <div
          ref={jarRef}
          style={{
            position: "fixed",
            top: "76px",
            right: "24px",
            width: SMALL_JAR_W,
            height: SMALL_JAR_H,
            pointerEvents: "auto",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            boxShadow: "0 4px 14px rgba(44,32,21,0.15)",
            padding: "6px",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            gap: "2px",
            justifyContent: "center",
          }}
        >
          {caughtIds.length === 0 && (
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.55rem",
                color: "var(--muted-foreground)",
                textAlign: "center",
                margin: 0,
              }}
            >
              drop a bug here
            </p>
          )}
          {caughtIds.map((id) => {
            const def = BUG_DEFS.find((d) => d.id === id)!;
            return (
              <img
                key={id}
                src={def.src}
                alt=""
                style={{ width: 16, height: 16, objectFit: "contain" }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
