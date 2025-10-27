"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Tilt3D({
  children,
  max = 10,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18, mass: 0.4 });

  const canHover = typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;
  if (reduce || !canHover) return <div className={className}>{children}</div>;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
