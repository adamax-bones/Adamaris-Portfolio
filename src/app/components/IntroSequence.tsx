import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import bee from "../../imports/6.png";

type Phase = "seeding" | "rain" | "sun" | "welcome" | "done";

const SEED_POSITIONS = [8, 18, 28, 38, 48, 58, 68, 78, 88];

interface RainDrop {
  left: number;
  duration: number;
  delay: number;
}

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<Phase>("seeding");

  const rainDrops = useMemo<RainDrop[]>(() => {
    return Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      duration: 0.6 + Math.random() * 0.5,
      delay: Math.random() * 1.2,
    }));
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("rain"), 3000));
    timers.push(setTimeout(() => setPhase("sun"), 5200));
    timers.push(setTimeout(() => setPhase("welcome"), 7000));
    timers.push(
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 9600)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const skip = () => {
    setPhase("done");
    onComplete();
  };

  if (phase === "done") return null;

  return (
    <motion.div
      key="intro-overlay"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflow: "hidden",
        background:
          phase === "rain"
            ? "#cdd6d0"
            : phase === "sun" || phase === "welcome"
            ? "#f5f0e8"
            : "#f5f0e8",
        transition: "background 1.2s ease",
      }}
    >
      <button
        onClick={skip}
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          zIndex: 10,
          background: "none",
          border: "1px solid rgba(44,32,21,0.25)",
          borderRadius: "999px",
          padding: "6px 16px",
          fontFamily: "'Nunito', sans-serif",
          fontSize: "0.8rem",
          color: "#2c2015",
          cursor: "pointer",
          opacity: 0.7,
        }}
      >
        Skip
      </button>

      {/* Seeding phase: bee flies across, dropping seeds */}
      {phase === "seeding" && (
        <>
          <motion.img
            src={bee}
            alt=""
            initial={{ x: "-10vw", y: "45vh", rotate: -6 }}
            animate={{
              x: "100vw",
              y: ["45vh", "40vh", "48vh", "42vh", "45vh"],
              rotate: [-6, 4, -4, 4, 0],
            }}
            transition={{ duration: 3, ease: "linear" }}
            style={{ position: "absolute", width: "70px", height: "70px" }}
          />
          {SEED_POSITIONS.map((left, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (left / 100) * 3, duration: 0.3 }}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: "62%",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#3b6d11",
              }}
            />
          ))}
        </>
      )}

      {/* Rain phase */}
      {phase === "rain" &&
        rainDrops.map((drop, i) => (
          <motion.div
            key={i}
            initial={{ y: "-10vh", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${drop.left}%`,
              width: "1.5px",
              height: "22px",
              background: "rgba(70, 90, 110, 0.55)",
            }}
          />
        ))}

      {/* Sun phase */}
      {(phase === "sun" || phase === "welcome") && (
        <motion.div
          initial={{ y: "60vh", opacity: 0 }}
          animate={{ y: "18vh", opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: "50%",
            marginLeft: "-60px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #fac775 0%, #ef9f27 70%, rgba(239,159,39,0) 100%)",
          }}
        />
      )}

      {/* Welcome text */}
      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                color: "#2d5016",
              }}
            >
              Welcome to Adamaris' Garden
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}