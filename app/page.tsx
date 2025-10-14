"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

/* ----------------------- tiny typewriter ----------------------- */
function useTypewriter(text: string, speed = 34) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOut(text.slice(0, i + 1));
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

/* ----------------------- rotating messages for hero ----------------------- */
const MESSAGES = [
  "Engineer, with a touch of </code>"
] as const;

function useRotatingIndex(length: number, delay = 5200) {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (length <= 1 || reduce) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % length), delay);
    return () => clearInterval(id);
  }, [length, delay, reduce]);
  return idx;
}

function HeroText({ text }: { text: string }) {
  // warnai literal </code> jadi biru tua
  const parts = text.split("</code>");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((chunk, i) => (
        <span key={i}>
          {chunk}
          {i < parts.length - 1 && <span style={{ color: "#1e3a8a" }}>{"</code>"}</span>}
        </span>
      ))}
    </>
  );
}

/* ----------------------- background grid (parallax micro) ----------------------- */
function TechGridParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -6]); // ≤ 6px: aman & halus
  return (
    <motion.div ref={ref} className="fixed inset-0 -z-20 text-[#0f172a] opacity-[0.06]" style={{ y }}>
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

/* ----------------------- ultra-light noise overlay ----------------------- */
function NoiseOverlay() {
  const data = useMemo(
    () =>
      `url("data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
           <filter id='n'>
             <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
             <feColorMatrix type='saturate' values='0'/>
             <feComponentTransfer><feFuncA type='table' tableValues='0 0 0 .035 .07 .035 0 0 0'/></feComponentTransfer>
           </filter>
           <rect width='100%' height='100%' filter='url(%23n)'/>
         </svg>`
      )}")`,
    []
  );
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.12] mix-blend-multiply"
      style={{ backgroundImage: data, backgroundSize: "120px 120px" }}
    />
  );
}

/* ----------------------- spotlight cursor (spring) ----------------------- */
function Spotlight() {
  const reduce = useReducedMotion();
  const enabled = typeof window !== "undefined" && matchMedia("(pointer:fine)").matches && !reduce;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
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

/* ----------------------- magnetic wrapper (for CTA) ----------------------- */
function Magnetic({
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

  if (reduce || typeof window === "undefined" || !matchMedia("(pointer:fine)").matches) {
    return <div>{children}</div>;
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    mx.set((dx / r.width) * strength);
    my.set((dy / r.height) * strength);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}

/* ----------------------- shimmer card ----------------------- */
function ShimmerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden border border-gray-100 bg-white ${className}`}>
      {/* shimmer layer (mask) */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(75deg,transparent,black,transparent)] [background:linear-gradient(75deg,rgba(37,99,235,.08),rgba(56,189,248,.06),rgba(37,99,235,.08))] animate-[shimmer_3.6s_linear_infinite]" />
      {children}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-60%);
          }
          100% {
            transform: translateX(60%);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------- tilt container (3D on hover) ----------------------- */
function Tilt3D({
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

  if (reduce || typeof window === "undefined" || !matchMedia("(pointer:fine)").matches) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ----------------------- data ----------------------- */
const DISCIPLINES = [
  { k: "Instrumentation", d: "P&ID • Loop • Datasheet" },
  { k: "Software", d: "Next.js • NestJS • Prisma" },
  { k: "Cloud", d: "GCP • Docker • K8s" },
  { k: "Project", d: "Agile • Stakeholders" },
  { k: "Quality", d: "Docs • Versioning" },
];

const GENERAL_PROJECTS = [
  {
    title: "Engineering Platforms",
    desc: "EDMS, Piping Calc, CFD Calcs, & more.",
    href: "/projects#portal-imx",
    img: "/imxportal.png",
  },
  {
    title: "Instrumentation Tooling",
    desc: "Autamation, calculation, & documentation for instrument engineers.",
    href: "/projects#instrument-studio",
    img: "/studioinst.png",
  },
  {
    title: "Web & Cloud Systems",
    desc: "UI/UX, frontend, backend, & infra for various needs.",
    href: "/projects#websites",
    img: "/website.png",
  },
];

/* ----------------------- page ----------------------- */
export default function HomeProfileFX() {
  const reduce = useReducedMotion();

  // rotating headline + typewriter
  const rotatingIdx = useRotatingIndex(MESSAGES.length, 2100);
  const typed = useTypewriter(MESSAGES[rotatingIdx], 34);

  return (
    <main className="relative min-h-screen bg-white text-[#0f172a]">
      <TechGridParallax />
      <NoiseOverlay />
      <Spotlight />

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-28 md:pt-32 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-center">
          <Tilt3D className="mx-auto md:mx-0">
            <div className="relative w-40 h-40 md:w-50 md:h-50">
              <Image
                src="/head.png"
                alt="Rafly portrait"
                fill
                sizes="180px"
                className="object-cover grayscale hover:grayscale-0 transition"
                priority
              />
            </div>
          </Tilt3D>
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.45 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            >
              <span className="align-middle">
                <HeroText text={typed} />
              </span>
              <span className="text-[#2563eb] align-middle">|</span>
            </motion.h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
              Not your typical engineer
            </p>
            <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
              {DISCIPLINES.map((x) => (
                <motion.span
                  key={x.k}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 text-xs border border-gray-200 bg-white"
                  title={x.d}
                >
                  {x.k}
                </motion.span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <Magnetic>
                <a className="inline-block px-5 md:px-6 py-3 bg-[#2563eb] text-white hover:brightness-95" href="/projects">
                  See work
                </a>
              </Magnetic>
              <Magnetic strength={9}>
                <a className="inline-block px-5 md:px-6 py-3 border border-gray-300 hover:bg-gray-50" href="/about">
                  About me
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 text-center">
          {[{ h: "Disciplines", v: "3+" }, { h: "Projects", v: "10+" }, { h: "Focus", v: "EPC/IT" }].map((s) => (
            <ShimmerCard key={s.h} className="p-4">
              <div className="relative z-10">
                <div className="text-2xl font-semibold text-[#2563eb]">{s.v}</div>
                <div className="text-xs text-gray-500">{s.h}</div>
              </div>
            </ShimmerCard>
          ))}
        </div>
      </section>

      {/* General Projects (singkat) */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-6 pb-6 sm:pb-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">What I work on</h2>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          {GENERAL_PROJECTS.map((p) => (
            <Tilt3D key={p.title} max={8}>
              <a href={p.href} className="block">
                <ShimmerCard className="bg-white">
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-contain p-3"
                      sizes="(min-width:1024px) 30vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-base sm:text-lg text-[#2563eb]">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{p.desc}</p>
                  </div>
                </ShimmerCard>
              </a>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* Work discipline highlights */}
      <section className="relative max-w-6xl mx-auto px-5 sm:px-6 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">How I work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            { h: "Clarity over cleverness", p: "Docs singkat, diagram seperlunya, keputusan tercatat." },
            { h: "Automate the repeatable", p: "CI/CD, template, linting → energi fokus ke hal penting." },
            { h: "Measure, then optimize", p: "Observability dulu (logs, traces, metrics) baru tuning." },
            { h: "Safety by default", p: "Typed API, migrasi terencana, rollback path jelas." },
          ].map((x) => (
            <Tilt3D key={x.h} max={6}>
              <ShimmerCard className="p-5 sm:p-6 bg-white">
                <h3 className="font-bold text-[#2563eb] text-center">{x.h}</h3>
              </ShimmerCard>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-5xl mx-auto px-5 sm:px-6 py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold">build responsibly, then beautifully.</h2>
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
            let us catch up and build something great together.
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3">
            <Magnetic>
              <a href="/contact" className="px-6 sm:px-7 py-3 bg-[#2563eb] text-white hover:brightness-95">
                Get in touch
              </a>
            </Magnetic>
            <Magnetic strength={9}>
              <a href="/projects" className="px-6 sm:px-7 py-3 border border-gray-300 hover:bg-gray-50">
                See portfolio
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      <ScrollHint />
    </main>
  );
}

/* ----------------------- scroll hint ----------------------- */
function ScrollHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < window.innerHeight * 0.2);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-sm z-[60]"
        >
          scroll ↓
        </motion.div>
      )}
    </AnimatePresence>
  );
}
