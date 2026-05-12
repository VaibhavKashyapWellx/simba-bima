export function FakeQR({ size = 78 }: { size?: number }) {
  const cornerSize = Math.max(14, size * 0.22);
  return (
    <div
      style={{
        width: size,
        height: size,
        padding: Math.max(4, size * 0.05),
        background: "#fff",
        border: "1px solid var(--line)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(0deg, transparent 50%, var(--ink) 50%), linear-gradient(90deg, transparent 50%, var(--ink) 50%)",
          backgroundSize:
            size > 120 ? "9% 9%, 9% 9%" : size > 90 ? "10% 10%, 10% 10%" : "12% 12%, 12% 12%",
          imageRendering: "pixelated",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          width: cornerSize,
          height: cornerSize,
          background: "#fff",
          border: `${Math.max(3, size * 0.04)}px solid var(--ink)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          width: cornerSize,
          height: cornerSize,
          background: "#fff",
          border: `${Math.max(3, size * 0.04)}px solid var(--ink)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: 6,
          width: cornerSize,
          height: cornerSize,
          background: "#fff",
          border: `${Math.max(3, size * 0.04)}px solid var(--ink)`,
        }}
      />
    </div>
  );
}
