"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Magnetic({
  children,
  strength = 12,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 180, damping: 16, mass: 0.3 });

  const canHover = typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;
  if (reduce || !canHover) return <div>{children}</div>;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set((dx / r.width) * strength);
    my.set((dy / r.height) * strength);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}
