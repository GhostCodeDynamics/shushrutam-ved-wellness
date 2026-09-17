import { useEffect, useRef } from "react";

function Leaf({ className = "", delay = 0, duration = 6, tint = "text-brand/20" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const handlePointer = (e) => {
      const rx = (e.clientX / root.clientWidth - 0.5) * 10;
      const ry = (e.clientY / root.clientHeight - 0.5) * 10;
      el.style.setProperty("--par-x", `${rx}deg`);
      el.style.setProperty("--par-y", `${ry}deg`);
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  return (
    <div
      ref={ref}
      className={`leaf-3d pointer-events-none absolute ${className}`}
      style={{
        "--par-x": "0deg",
        "--par-y": "0deg",
        transform: "perspective(900px) rotateX(var(--par-x)) rotateY(var(--par-y))",
      }}
    >
      <div
        className="leaf-3d"
        style={{ animation: `sway-y ${duration}s ease-in-out ${delay}s infinite` }}
      >
        <div
          className="leaf-3d"
          style={{ animation: `sway-x ${duration + 1.5}s ease-in-out ${delay + 0.4}s infinite` }}
        >
          <div
            className="leaf-3d"
            style={{ animation: `bob ${duration + 2}s ease-in-out ${delay}s infinite` }}
          >
            <svg viewBox="0 0 64 64" className={`w-full ${tint}`}>
              <path
                fill="currentColor"
                d="M32 4 C 46 14, 58 28, 60 46 C 60 54, 54 60, 46 60 C 32 56, 16 44, 8 30 C 4 22, 8 12, 14 8 C 20 4, 28 2, 32 4 Z"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                d="M32 8 C 32 22, 40 40, 52 54"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BotanicalFloat() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      <Leaf className="top-[8%] left-[2%] w-24" duration={7} tint="text-brand/15" />
      <Leaf className="top-[44%] left-[5%] w-16" duration={8} delay={1} tint="text-gold/25" />
      <Leaf className="right-[2%] bottom-[6%] w-28" duration={6} delay={0.5} tint="text-brand/15" />
      <Leaf
        className="right-[9%] bottom-[26%] w-14"
        duration={9}
        delay={1.5}
        tint="text-brand/10"
      />
    </div>
  );
}
