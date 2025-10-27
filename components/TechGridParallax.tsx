"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TechGridParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-20 text-slate-900 opacity-[0.06]"
      style={{ y }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </motion.div>
  );
}
