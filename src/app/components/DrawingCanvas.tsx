import { useRef, useEffect, useState, useCallback } from "react";
import { Pencil, Eraser, Trash2, Check, X, ChevronUp } from "lucide-react";

const COLORS = [
  "#2d5016", // forest green
  "#c4622d", // terracotta
  "#2c2015", // dark brown
  "#7a6a52", // warm grey
  "#8aab6c", // sage
  "#d4a017", // amber
  "#5a2d82", // purple
  "#1a5470", // deep teal
];

const BRUSH_SIZES = [2, 4, 8, 14];

type DrawMode = "pen" | "eraser";

interface DrawingCanvasProps {
  isActive: boolean;
  onToggle: () => void;
}

export function DrawingCanvas({ isActive, onToggle }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(4);
  const [drawMode, setDrawMode] = useState<DrawMode>("pen");
  const [hasDrawn, setHasDrawn] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  // Size canvas to full document (not just viewport) so drawings stay in place when scrolling
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prevW = canvas.width;
    const prevH = canvas.height;
    const newW = document.documentElement.scrollWidth;
    const newH = document.documentElement.scrollHeight;
    if (prevW === newW && prevH === newH) return;
    // Preserve existing drawing (only if canvas had valid dimensions)
    const ctx = canvas.getContext("2d");
    const imageData = prevW > 0 && prevH > 0 ? ctx?.getImageData(0, 0, prevW, prevH) : null;
    canvas.width = newW;
    canvas.height = newH;
    if (imageData) ctx?.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    syncCanvasSize();
    const obs = new ResizeObserver(syncCanvasSize);
    obs.observe(document.body);
    return () => obs.disconnect();
  }, [syncCanvasSize]);

  const getPos = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX + window.scrollX, y: touch.clientY + window.scrollY };
    }
    return { x: (e as MouseEvent).clientX + window.scrollX, y: (e as MouseEvent).clientY + window.scrollY };
  };

  const startDrawing = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isActive) return;
      isDrawingRef.current = true;
      lastPosRef.current = getPos(e);
      setHasDrawn(true);
    },
    [isActive]
  );

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current || !isActive) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      const pos = getPos(e);
      const last = lastPosRef.current;
      if (!last) return;

      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (drawMode === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = brushSize * 4;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.globalAlpha = 0.85;
      }

      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      lastPosRef.current = pos;
    },
    [isActive, color, brushSize, drawMode]
  );

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing, { passive: true });
    canvas.addEventListener("touchmove", draw, { passive: true });
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  return (
    <>
      {/* Full-page canvas — pointer events only when drawing is active */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 30,
          pointerEvents: isActive ? "auto" : "none",
          cursor: isActive
            ? drawMode === "eraser"
              ? "cell"
              : "crosshair"
            : "default",
        }}
      />

      {/* Floating launcher button */}
      {!isActive && (
        <button
          onClick={onToggle}
          title="Open drawing tool"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 50,
            width: "3.25rem",
            height: "3.25rem",
            borderRadius: "50%",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(44, 32, 21, 0.25)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(44,32,21,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(44,32,21,0.25)";
          }}
        >
          <Pencil size={18} />
        </button>
      )}

      {/* Drawing toolbar (visible when active) */}
      {isActive && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 50,
            background: "rgba(250, 247, 240, 0.97)",
            border: "1px solid var(--border)",
            borderRadius: "1.25rem",
            boxShadow: "0 8px 32px rgba(44, 32, 21, 0.18)",
            fontFamily: "'Nunito', sans-serif",
            overflow: "hidden",
            minWidth: "220px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Pencil size={13} />
              <span style={{ fontSize: "0.82rem", letterSpacing: "0.05em" }}>Draw on this page</span>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button
                onClick={() => setPanelOpen((v) => !v)}
                title="Collapse"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "4px",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "2px 5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronUp
                  size={13}
                  style={{
                    transform: panelOpen ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              <button
                onClick={onToggle}
                title="Done drawing"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "4px",
                  color: "inherit",
                  cursor: "pointer",
                  padding: "2px 5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Check size={13} />
              </button>
            </div>
          </div>

          {panelOpen && (
            <div style={{ padding: "1rem" }}>
              {/* Mode toggle */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.875rem" }}>
                <button
                  onClick={() => setDrawMode("pen")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.45rem",
                    borderRadius: "0.4rem",
                    border: "1px solid",
                    borderColor: drawMode === "pen" ? "var(--primary)" : "var(--border)",
                    background: drawMode === "pen" ? "var(--primary)" : "transparent",
                    color: drawMode === "pen" ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    transition: "all 0.15s",
                  }}
                >
                  <Pencil size={12} />
                  Pen
                </button>
                <button
                  onClick={() => setDrawMode("eraser")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.45rem",
                    borderRadius: "0.4rem",
                    border: "1px solid",
                    borderColor: drawMode === "eraser" ? "var(--primary)" : "var(--border)",
                    background: drawMode === "eraser" ? "var(--primary)" : "transparent",
                    color: drawMode === "eraser" ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    transition: "all 0.15s",
                  }}
                >
                  <Eraser size={12} />
                  Eraser
                </button>
              </div>

              {/* Colors */}
              <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginBottom: "0.5rem", letterSpacing: "0.06em" }}>
                COLOR
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "0.875rem" }}>
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setColor(c); setDrawMode("pen"); }}
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: c,
                      border: color === c && drawMode === "pen" ? "2.5px solid var(--foreground)" : "2px solid transparent",
                      outline: color === c && drawMode === "pen" ? "2px solid rgba(255,255,255,0.7)" : "none",
                      cursor: "pointer",
                      transition: "transform 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.2)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
                  />
                ))}
              </div>

              {/* Brush size */}
              <p style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginBottom: "0.5rem", letterSpacing: "0.06em" }}>
                SIZE
              </p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "1rem" }}>
                {BRUSH_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushSize(size)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: brushSize === size ? "2px solid var(--primary)" : "2px solid var(--border)",
                      background: brushSize === size ? "var(--secondary)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(size * 1.5, 16)}px`,
                        height: `${Math.min(size * 1.5, 16)}px`,
                        borderRadius: "50%",
                        background: "var(--foreground)",
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Clear button */}
              {hasDrawn && (
                <button
                  onClick={clearCanvas}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.45rem",
                    borderRadius: "0.4rem",
                    border: "1px solid rgba(196, 98, 45, 0.4)",
                    background: "rgba(196, 98, 45, 0.07)",
                    color: "var(--accent)",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(196, 98, 45, 0.15)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(196, 98, 45, 0.07)")}
                >
                  <Trash2 size={12} />
                  Clear all
                </button>
              )}
            </div>
          )}

          {/* Dismiss hint */}
          <div
            style={{
              padding: "0.5rem 1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onToggle}
              style={{
                fontSize: "0.7rem",
                color: "var(--muted-foreground)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <X size={10} />
              Done — keep drawing visible
            </button>
          </div>
        </div>
      )}
    </>
  );
}
