import { useEffect, useState } from "react";
import terrariumJar from "../../assets/terrarium-jar.png";
import { BUG_DEFS, type BugJarState } from "../hooks/useBugJar";

// Desktop — big jar fixed in place near the hero heading (unchanged from your current setup)
const BIG_JAR_W = 500;
const BIG_JAR_H = 500;
const BIG_JAR_BUG_SIZE = 40;

// Mobile — smaller jar, placed exactly between the two hero paragraphs
const MOBILE_BIG_JAR_W = 200;
const MOBILE_BIG_JAR_H = 200;
const MOBILE_BIG_JAR_BUG_SIZE = 18;

const MOBILE_BUG_SCALE = 0.62;

interface BugJarProps {
  state: BugJarState;
}

export function BugJar({ state }: BugJarProps) {
  const {
    freeBugs,
    caughtIds,
    jarBugs,
    atTop,
    isMobile,
    bigJarRef,
    onBugMouseDown,
    selectedBugId,
    onBugTap,
    onJarTap,
  } = state;

  // Measure the real position of the anchor placed between the two hero paragraphs on mobile,
  // rather than guessing a fixed pixel offset
  const [mobileTop, setMobileTop] = useState<number | null>(null);

  useEffect(() => {
    if (!isMobile) return;

    const measure = () => {
      const anchor = document.getElementById("bugjar-mobile-anchor");
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        setMobileTop(rect.top + window.scrollY);
      }
    };

    // Measure after layout settles (fonts/images can shift things right after mount)
    const raf = requestAnimationFrame(measure);
    const timeout = setTimeout(measure, 300);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  const bigJarW = isMobile ? MOBILE_BIG_JAR_W : BIG_JAR_W;
  const bigJarH = isMobile ? MOBILE_BIG_JAR_H : BIG_JAR_H;
  const bigJarBugSize = isMobile ? MOBILE_BIG_JAR_BUG_SIZE : BIG_JAR_BUG_SIZE;

  // On mobile, hide the jar until we've actually measured the anchor (avoids a flash at the wrong spot)
  const mobileReady = !isMobile || mobileTop !== null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
      {freeBugs.map((bug) => {
        const def = BUG_DEFS.find((d) => d.id === bug.id)!;
        const scale = isMobile ? MOBILE_BUG_SCALE : 1;
        const isSelected = bug.id === selectedBugId;
        return (
          <img
            key={bug.id}
            src={def.src}
            alt=""
            draggable={false}
            onMouseDown={(e) => onBugMouseDown(e, bug.id)}
            onClick={() => onBugTap(bug.id)}
            style={{
              position: "fixed",
              left: bug.x,
              top: bug.y,
              width: def.w * scale,
              height: def.h * scale,
              objectFit: "contain",
              cursor: bug.status === "dragging" ? "grabbing" : "grab",
              pointerEvents: "auto",
              transition:
                bug.status === "wandering"
                  ? `left ${bug.duration}ms ease-in-out, top ${bug.duration}ms ease-in-out`
                  : "none",
              filter: isSelected
                ? "drop-shadow(0 0 8px rgba(239,159,39,0.9)) drop-shadow(0 3px 6px rgba(44,32,21,0.25))"
                : "drop-shadow(0 3px 6px rgba(44,32,21,0.25))",
              transform: isSelected ? "scale(1.15)" : "scale(1)",
            }}
          />
        );
      })}

      {/* Big jar — near the hero heading on desktop; between the two hero paragraphs on mobile.
          Fades out once scrolled past (desktop) or once you scroll past the mobile anchor. */}
      <div
        ref={bigJarRef}
        onClick={onJarTap}
        style={
          isMobile
            ? {
                position: "absolute",
                top: mobileTop !== null ? `${mobileTop}px` : 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: bigJarW,
                height: bigJarH,
                pointerEvents: mobileReady && atTop ? "auto" : "none",
                opacity: mobileReady && atTop ? 1 : 0,
                transition: "opacity 0.45s ease",
              }
            : {
                position: "absolute",
                top: "150px",
                right: "20%",
                width: bigJarW,
                height: bigJarH,
                pointerEvents: atTop ? "auto" : "none",
                opacity: atTop ? 1 : 0,
                transition: "opacity 0.45s ease",
              }
        }
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

        {caughtIds.map((id) => {
          const def = BUG_DEFS.find((d) => d.id === id)!;
          const pos = jarBugs[id];
          if (!pos) return null;
          return (
            <img
              key={id}
              src={def.src}
              alt=""
              style={{
                position: "absolute",
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: bigJarBugSize,
                height: bigJarBugSize,
                objectFit: "contain",
                transform: "translate(-50%, -50%)",
                transition: `left ${pos.duration}ms ease-in-out, top ${pos.duration}ms ease-in-out`,
              }}
            />
          );
        })}

        <p
          style={{
            position: "absolute",
            bottom: isMobile ? "6px" : "30px",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: isMobile ? "0.58rem" : "0.68rem",
            color: "var(--muted-foreground)",
            letterSpacing: "0.05em",
          }}
        >
          Place bugs in the jar
        </p>
      </div>
    </div>
  );
}
