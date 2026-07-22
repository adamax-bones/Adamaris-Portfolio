import { useEffect, useRef, useState } from "react";

// Procedural vine path — replace svgPath with your hand-drawn SVG path data when ready
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

// Little leaf buds branching off the vine
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

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setTotalLength(len);

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 1 : Math.min(scrolled / max, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* Shadow/depth trace */}
        <path
          d={VINE_PATH}
          fill="none"
          stroke="rgba(44,32,21,0.07)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${drawnLength} ${totalLength}`}
          strokeDashoffset={0}
        />
        {/* Main vine */}
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

        {/* Leaf buds that appear as vine grows */}
        {BUDS.map((bud, i) => {
          if (bud.t > progress) return null;
          const path = pathRef.current;
          if (!path || totalLength === 0) return null;
          const pt = path.getPointAtLength(bud.t * totalLength);
          const leafOpacity = Math.min((progress - bud.t) / 0.04, 1);
          const leafScale = Math.min((progress - bud.t) / 0.06, 1);

          return (
            <g key={i} transform={`translate(${pt.x}, ${pt.y})`} opacity={leafOpacity}>
              {/* Stem */}
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
              {/* Leaf */}
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
