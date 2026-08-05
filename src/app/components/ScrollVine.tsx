import { useEffect, useRef, useState } from "react";

const VINE_PATH = `
  M 28 0
  C 22 40, 38 80, 18 120
  C 5 155, 42 185, 30 225
  C 18 260, 8 280, 35 315
  C 50 340, 15 375, 28 410
  C 38 440, 10 470, 32 505
  C 48 530, 20 565, 28 600
  C 18 635, 42 660, 26 700
  C 12 735, 38 765, 25 800
  C 14 830, 40 860, 28 900
  C 16 935, 38 965, 26 1000
  C 15 1035, 42 1060, 28 1100
  C 18 1130, 38 1155, 26 1190
  C 14 1225, 40 1255, 28 1290
  C 16 1325, 38 1355, 25 1400
`;

const BUDS = [
  { t: 0.06, side: 1 },
  { t: 0.11, side: -1 },
  { t: 0.18, side: 1 },
  { t: 0.24, side: -1 },
  { t: 0.31, side: 1 },
  { t: 0.37, side: -1 },
  { t: 0.44, side: 1 },
  { t: 0.50, side: -1 },
  { t: 0.57, side: 1 },
  { t: 0.63, side: -1 },
  { t: 0.70, side: 1 },
  { t: 0.77, side: -1 },
  { t: 0.84, side: 1 },
  { t: 0.90, side: -1 },
  { t: 0.96, side: 1 },
];

export function ScrollVine() {
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const rafRef = useRef<number>(0);
  const smoothedRef = useRef(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      const path = pathRef.current;
      if (path) setTotalLength(path.getTotalLength());
    });
  }, []);

  // Poll the page's real visual position every frame instead of relying on scroll
  // events (which weren't reliably firing) — this reads live layout directly,
  // so it can't get stuck regardless of how scrolling is happening.
  useEffect(() => {
    const tick = () => {
      // Use the max of several measurements — some pages report inconsistent
      // scrollHeight on document.documentElement vs document.body, so we
      // don't trust just one source.
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );
      const maxScroll = scrollHeight - window.innerHeight;

      const scrollTop = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      const rawProgress = maxScroll <= 0 ? 0 : Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      // simple smoothing so it still feels gentle, not robotic
      smoothedRef.current += (rawProgress - smoothedRef.current) * 0.12;
      setProgress(smoothedRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const drawnLength = totalLength * progress;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "60px",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 60 1400"
        preserveAspectRatio="xMinYMin meet"
        style={{ width: "60px", height: "100%" }}
      >
        <path
          d={VINE_PATH}
          fill="none"
          stroke="rgba(44,32,21,0.07)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${drawnLength} ${totalLength}`}
          strokeDashoffset={0}
        />
        <path
          ref={pathRef}
          d={VINE_PATH}
          fill="none"
          stroke="#2d5016"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${drawnLength} ${totalLength}`}
          strokeDashoffset={0}
          opacity={0.7}
        />

        {BUDS.map((bud, i) => {
          if (bud.t > progress) return null;
          const path = pathRef.current;
          if (!path || totalLength === 0) return null;
          const pt = path.getPointAtLength(bud.t * totalLength);
          const leafOpacity = Math.min((progress - bud.t) / 0.04, 1);
          const leafScale = Math.min((progress - bud.t) / 0.06, 1);

          return (
            <g key={i} transform={`translate(${pt.x}, ${pt.y})`} opacity={leafOpacity}>
              <line
                x1={0}
                y1={0}
                x2={bud.side * 14 * leafScale}
                y2={-8 * leafScale}
                stroke="#2d5016"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity={0.65}
              />
              <ellipse
                cx={bud.side * 14 * leafScale}
                cy={-8 * leafScale}
                rx={5 * leafScale}
                ry={3 * leafScale}
                fill={i % 3 === 0 ? "#8aab6c" : i % 3 === 1 ? "#2d5016" : "#5a7a35"}
                opacity={0.75}
                transform={`rotate(${bud.side * -30}, ${bud.side * 14 * leafScale}, ${-8 * leafScale})`}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}