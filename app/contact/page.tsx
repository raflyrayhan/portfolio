"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Trophy, Zap, RefreshCcw, Lock, Unlock } from "lucide-react";

/**
 * ContactPage — Interactive Game Unlock
 * Mini-game: Pop 7 energy orbs within 20s to unlock contact buttons.
 * - Click/tap the floating orbs. They drift & bounce.
 * - When unlocked, show Email + WhatsApp + socials.
 * - Has a "Skip game" link (accessibility/HR-friendly).
 */

const WHATSAPP_E164 = "6282130840365"; // 082130840365 -> remove leading 0, add country code 62
const DEFAULT_MESSAGE = encodeURIComponent(
  "Hi Rafly! I saw your portfolio — let’s chat about a project."
);

function useInterval(cb: () => void, delay: number | null) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(28)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 800, opacity: [1, 1, 0] }}
          transition={{ duration: 1.6 + Math.random() * 0.6, ease: "easeOut" }}
          className="absolute inline-block w-1.5 h-3"
          style={{
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            background: i % 3 === 0 ? "#2563eb" : i % 3 === 1 ? "#38bdf8" : "#0ea5e9",
          }}
        />
      ))}
    </div>
  );
}

export default function ContactGamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [round, setRound] = useState(0);

  const TARGET = 7;

  // countdown
  useInterval(() => {
    if (!running) return;
    setTimeLeft((t) => {
      if (t <= 1) {
        setRunning(false);
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  // unlock check
  useEffect(() => {
    if (score >= TARGET && !unlocked) {
      setUnlocked(true);
      setRunning(false);
    }
  }, [score, TARGET, unlocked]);

  function resetGame() {
    setScore(0);
    setTimeLeft(20);
    setRunning(true);
    setUnlocked(false);
    setRound((r) => r + 1);
  }

  // generate orbs each round
  const orbs = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `${round}-${i}`,
      size: 42 + Math.floor(Math.random() * 22),
      speed: 8 + Math.random() * 10,
      x: Math.random() * 90 + 5,
      y: Math.random() * 70 + 10,
    }));
  }, [round]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white text-[#0f172a] px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-[0.08]" aria-hidden>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-3xl text-center">
        <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-2">
          Let’s Connect
        </motion.h1>
        <p className="text-gray-600 mb-4">Pop <span className="font-semibold">{TARGET}</span> energy orbs in <span className="font-semibold">20s</span> to unlock my contact portals. Prefer no play? <button onClick={() => setUnlocked(true)} className="underline text-[#2563eb]">Skip game</button>.</p>

        {/* HUD */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-3 text-sm">
          <div className="px-3 py-1.5 border">Score: <span className="font-semibold">{score}</span></div>
          <div className={`px-3 py-1.5 border ${timeLeft <= 5 && running ? "bg-red-50" : ""}`}>Time: <span className="font-semibold">{timeLeft}s</span></div>
          <div className="px-3 py-1.5 border">Goal: {TARGET}</div>
          <button onClick={resetGame} className="px-3 py-1.5 border inline-flex items-center gap-2"><RefreshCcw size={14}/> Reset</button>
        </div>

        {/* Playfield */}
        <div className="relative mx-auto w-full max-w-3xl h-[380px] md:h-[440px] border bg-[#f6f8fb] overflow-hidden">
          {/* Orbs */}
          {orbs.map((o, idx) => (
            <Orb key={o.id} idx={idx} size={o.size} speed={o.speed} x={o.x} y={o.y} onPop={() => running && setScore((s) => s + 1)} disabled={!running || unlocked} />
          ))}

          {/* Lock/Unlock overlay */}
          <div className="absolute top-2 left-2 flex items-center gap-2 text-xs bg-white/80 px-2 py-1 border">
            {unlocked ? <Unlock size={14} className="text-emerald-600"/> : <Lock size={14} className="text-gray-500"/>}
            {unlocked ? "Unlocked" : "Locked"}
          </div>

          <Confetti show={unlocked} />

          {!running && !unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <div className="text-center">
                <p className="font-medium mb-2">Time’s up!</p>
                <p className="text-sm text-gray-600 mb-3">Score {score}/{TARGET}. Try again?</p>
                <button onClick={resetGame} className="px-4 py-2 border hover:bg-gray-50 inline-flex items-center gap-2"><Zap size={14}/> Retry</button>
              </div>
            </div>
          )}
        </div>

        {/* Unlocked actions */}
        <AnimatePresence>
          {unlocked && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-8">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={`mailto:rafly@yourdomain.dev?subject=${encodeURIComponent("Project inquiry — from portfolio")}&body=${DEFAULT_MESSAGE}`} className="px-5 py-3 border hover:bg-gray-50 inline-flex items-center gap-2"><Mail size={16}/> Email</a>
                <a href={`https://wa.me/${WHATSAPP_E164}?text=${DEFAULT_MESSAGE}`} target="_blank" className="px-5 py-3 border hover:bg-gray-50 inline-flex items-center gap-2"><Phone size={16}/> WhatsApp</a>
                <a href="https://linkedin.com/in/raflyray" target="_blank" className="px-5 py-3 border hover:bg-gray-50 inline-flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
                <a href="https://github.com/raflyrayhan" target="_blank" className="px-5 py-3 border hover:bg-gray-50 inline-flex items-center gap-2"><Github size={16}/> GitHub</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Orb({ idx, size, speed, x, y, onPop, disabled }: { idx: number; size: number; speed: number; x: number; y: number; onPop: () => void; disabled: boolean; }) {
  const [gone, setGone] = useState(false);
  const duration = 6 + (idx % 5) + Math.random() * 3;
  return (
    <AnimatePresence>
      {!gone && (
        <motion.button
          type="button"
          className="absolute rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08)] focus:outline-none"
          style={{ width: size, height: size, left: `${x}%`, top: `${y}%`, background: "radial-gradient(circle at 30% 30%, #ffffff, #e7f2ff)" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 80 - x, 0, -Math.min(x - 5, 30), 0],
            y: [0, -Math.min(y - 10, 30), 0, Math.min(80 - y, 30), 0],
          }}
          transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
          whileTap={{ scale: 0.85 }}
          onClick={() => {
            if (disabled) return;
            setGone(true);
            onPop();
          }}
        />
      )}
    </AnimatePresence>
  );
}