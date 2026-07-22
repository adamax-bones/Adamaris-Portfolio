export function GridBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(44, 32, 21, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(44, 32, 21, 0.055) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  );
}
