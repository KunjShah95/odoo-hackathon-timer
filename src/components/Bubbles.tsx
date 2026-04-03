import { useMemo } from "react";

const Bubbles = () => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: Math.random() * 10 + 12,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: "-10%",
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;