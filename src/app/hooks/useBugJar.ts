import { useCallback, useEffect, useRef, useState } from "react";
import pillbug from "../../imports/1.png";
import worm from "../../imports/2.png";
import ladybug from "../../imports/3.png";
import dragonfly from "../../imports/4.png";
import butterfly from "../../imports/5.png";
import bee from "../../imports/6.png";

export const BUG_DEFS = [
  { id: "pillbug", src: pillbug, w: 68, h: 51 },
  { id: "worm", src: worm, w: 60, h: 60 },
  { id: "ladybug", src: ladybug, w: 54, h: 54 },
  { id: "dragonfly", src: dragonfly, w: 72, h: 62 },
  { id: "butterfly", src: butterfly, w: 65, h: 58 },
  { id: "bee", src: bee, w: 60, h: 55 },
];

const MOBILE_BUG_SCALE = 0.62;
const MOBILE_BREAKPOINT = 768;

// Percent-based area matching the visible glass interior of the (sideways) jar image
export const JAR_AREA = { xMin: 40, xMax: 86, yMin: 42, yMax: 66 };

export type BugStatus = "wandering" | "dragging" | "caught";

export interface BugState {
  id: string;
  x: number;
  y: number;
  status: BugStatus;
  duration: number;
}

export interface JarBugState {
  x: number;
  y: number;
  duration: number;
}

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export type BugJarState = ReturnType<typeof useBugJar>;

export function useBugJar() {
  const bigJarRef = useRef<HTMLDivElement>(null);
  const headerJarRef = useRef<HTMLDivElement>(null);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const statusRef = useRef<Record<string, BugStatus>>({});
  const dragInfo = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const jarTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const [atTop, setAtTop] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );

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
  const [jarBugs, setJarBugs] = useState<Record<string, JarBugState>>({});
  const [selectedBugId, setSelectedBugId] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = bigJarRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtTop(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const scheduleJarMove = useCallback((id: string) => {
    const targetX = rand(JAR_AREA.xMin, JAR_AREA.xMax);
    const targetY = rand(JAR_AREA.yMin, JAR_AREA.yMax);
    const duration = rand(3200, 5800);

    setJarBugs((prev) => ({ ...prev, [id]: { x: targetX, y: targetY, duration } }));

    clearTimeout(jarTimers.current[id]);
    jarTimers.current[id] = setTimeout(() => {
      const pause = rand(2600, 5200);
      jarTimers.current[id] = setTimeout(() => scheduleJarMove(id), pause);
    }, duration);
  }, []);

  const scheduleMove = useCallback(
    (id: string) => {
      const def = BUG_DEFS.find((b) => b.id === id)!;
      const scale = isMobile ? MOBILE_BUG_SCALE : 1;
      const w = def.w * scale;
      const h = def.h * scale;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const goesOffscreen = Math.random() < 0.18;

      let targetX: number;
      let targetY: number;

      if (goesOffscreen) {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { targetX = -w - 40; targetY = rand(60, vh - 100); }
        else if (edge === 1) { targetX = vw + 40; targetY = rand(60, vh - 100); }
        else if (edge === 2) { targetX = rand(40, vw - 100); targetY = -h - 40; }
        else { targetX = rand(40, vw - 100); targetY = vh + 40; }
      } else {
        targetX = rand(20, vw - w - 20);
        targetY = rand(90, vh - h - 30);
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
    },
    [isMobile]
  );

  useEffect(() => {
    BUG_DEFS.forEach((def) => {
      statusRef.current[def.id] = "wandering";
      timers.current[def.id] = setTimeout(() => scheduleMove(def.id), rand(200, 1500));
    });
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
      Object.values(jarTimers.current).forEach(clearTimeout);
    };
  }, [scheduleMove]);

  // Mobile-only: tap a bug to select it (pauses its wander), tap the jar to catch the selected one.
  // Does nothing on desktop, where dragging is still the only way to catch a bug.
  const onBugTap = useCallback(
    (id: string) => {
      if (!isMobile) return;
      if (caughtIds.includes(id)) return;

      setSelectedBugId((prev) => {
        if (prev === id) {
          // tapping the already-selected bug again deselects it
          statusRef.current[id] = "wandering";
          scheduleMove(id);
          return null;
        }
        if (prev) {
          // switching selection — let the previously-selected bug resume wandering
          statusRef.current[prev] = "wandering";
          scheduleMove(prev);
        }
        statusRef.current[id] = "dragging"; // reuse "dragging" to pause wander + freeze in place
        clearTimeout(timers.current[id]);
        setBugs((b) => b.map((bug) => (bug.id === id ? { ...bug, status: "dragging", duration: 0 } : bug)));
        return id;
      });
    },
    [isMobile, caughtIds, scheduleMove]
  );

  const onJarTap = useCallback(() => {
    if (!isMobile) return;
    if (!selectedBugId) return;
    const id = selectedBugId;

    statusRef.current[id] = "caught";
    setCaughtIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    scheduleJarMove(id);
    setBugs((prev) => prev.map((b) => (b.id === id ? { ...b, status: "caught" } : b)));
    setSelectedBugId(null);
  }, [isMobile, selectedBugId, scheduleJarMove]);

  const onBugMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      if (caughtIds.includes(id)) return;
      e.preventDefault();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      dragInfo.current = { id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
      statusRef.current[id] = "dragging";
      clearTimeout(timers.current[id]);
      setBugs((prev) => prev.map((b) => (b.id === id ? { ...b, status: "dragging", duration: 0 } : b)));
    },
    [caughtIds]
  );

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
        const scale = isMobile ? MOBILE_BUG_SCALE : 1;
        const w = def.w * scale;
        const h = def.h * scale;
        // On desktop, the big jar next to the hero is the active target while at top.
        // Once scrolled (or on mobile, always), the header widget is the active target.
        const activeJarRef = atTop && !isMobile ? bigJarRef : headerJarRef;

        if (bug && activeJarRef.current) {
          const jarRect = activeJarRef.current.getBoundingClientRect();
          const overlap =
            bug.x < jarRect.right &&
            bug.x + w > jarRect.left &&
            bug.y < jarRect.bottom &&
            bug.y + h > jarRect.top;

          if (overlap) {
            statusRef.current[id] = "caught";
            setCaughtIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
            scheduleJarMove(id);
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
  }, [scheduleMove, scheduleJarMove, atTop, isMobile]);

  const freeBugs = bugs.filter((b) => !caughtIds.includes(b.id));

  return {
    freeBugs,
    caughtIds,
    jarBugs,
    atTop,
    isMobile,
    bigJarRef,
    headerJarRef,
    onBugMouseDown,
    selectedBugId,
    onBugTap,
    onJarTap,
  };
}