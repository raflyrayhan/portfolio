"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft",
  "ArrowRight","ArrowLeft","ArrowRight","b","a",
];

/** Custom event type (type-safe, no 'any') */
declare global {
  interface WindowEventMap {
    "rafly:logo-tap": CustomEvent<void>;
  }
}

export function EasterEggs() {
  const [active, setActive] = useState(false);
  const [burst, setBurst] = useState(0);
  const seq = useRef<string[]>([]);
  const taps = useRef<number>(0);
  const timer = useRef<number | null>(null);

  // Konami listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seq.current.push(key);
      if (seq.current.length > KONAMI.length) seq.current.shift();
      const ok = KONAMI.every((k, i) => seq.current[i] === k);
      if (ok) trigger();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Logo-tap listener (type-safe)
  useEffect(() => {
    const onTap = () => {
      taps.current += 1;
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => (taps.current = 0), 1200);
      if (taps.current >= 7) {
        taps.current = 0;
        trigger();
      }
    };
    window.addEventListener("rafly:logo-tap", onTap);
    return () => window.removeEventListener("rafly:logo-tap", onTap);
  }, []);

  function trigger() {
    setActive(true);
    setBurst((b) => b + 1);
    window.setTimeout(() => setActive(false), 3800);
  }

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.35, ease: EASE } }}
            exit={{ y: -40, opacity: 0, transition: { duration: 0.3, ease: EASE } }}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-[90]"
          >
            <div className="rounded-full border border-slate-200 bg-white/90 backdrop-blur px-4 py-2 shadow-sm text-sm font-medium text-slate-800">
              🎉 Nerd Mode Unlocked — nice fingers.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <Confetti key={burst} fire={active} />
    </>
  );
}

function Confetti({ fire }: { fire: boolean }) {
  if (!fire) return null;
  const EMOJIS = ["💥","⚙️","✨","🧪","🚀","💡","🛠️","📐"];
  const pieces = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    rot: (Math.random() * 40) - 20,
    dur: 1.1 + Math.random() * 0.9,
    emoji: EMOJIS[i % EMOJIS.length],
    delay: Math.random() * 0.2,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: "-10vh", rotate: p.rot, opacity: 0 }}
          animate={{ y: "110vh", rotate: p.rot + 120, opacity: 1 }}
          transition={{ duration: p.dur, ease: "easeOut", delay: p.delay }}
          className="absolute text-2xl"
          style={{ left: 0 }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
