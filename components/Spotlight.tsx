"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Spotlight() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (!mounted || reduce || !matchMedia("(pointer:fine)").matches) return;
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mounted, reduce, x, y]);

  // Pastikan render pertama = null (sama seperti SSR)
  if (!mounted || reduce || !matchMedia("(pointer:fine)").matches) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed -z-10 pointer-events-none"
      style={{
        left: sx,
        top: sy,
        width: 420,
        height: 420,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(220px 220px at center, rgba(37,99,235,0.14), rgba(56,189,248,0.08) 40%, rgba(255,255,255,0) 70%)",
        filter: "blur(20px)",
      }}
    />
  );
}
