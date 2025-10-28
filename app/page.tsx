"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { HeroText, useTypewriter } from "@/components/Typewriter";
import { Tilt3D } from "@/components/Tilt3D";
import { Magnetic } from "@/components/Magnetic";
import { ShimmerCard } from "@/components/ShimmerCard";
import { TechGridParallax } from "@/components/TechGridParallax";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Spotlight } from "@/components/Spotlight";
import { PrincipleRing } from "@/components/PrincipleRing";
import { ProjectCards } from "@/components/ProjectCards";

/* Tagline (typewriter optional) */
const MESSAGES = [
  "I simply </code>",
  "Cloud-native builder",
  "Instrument & Control + Software",
] as const;

/* Anim presets */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: EASE },
  }),
};

const leftIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: EASE },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.5, ease: EASE_SOFT },
  }),
};

export default function HomePage() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(MESSAGES[0], 28);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      {/* global micro-FX */}
      <TechGridParallax />
      <NoiseOverlay />
      <Spotlight />

      {/* =========================== HERO =========================== */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-10">
        {/* color slabs (statis, no animation) */}
        <div
          aria-hidden
          className="hidden md:block absolute top-10 right-[-8%] w-[58vw] max-w-[860px] h-[360px] bg-cyan-400/80 rounded-md rotate-[-2deg] -z-10 pointer-events-none"
        />
        <div
          aria-hidden
          className="hidden md:block absolute top-[62%] left-[-3%] w-[56%] max-w-[680px] h-16 bg-yellow-300 rounded-sm rotate-[-1.2deg] -z-10 pointer-events-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-6 md:gap-14">
          {/* left: copy */}
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-[clamp(2rem,4.8vw,4rem)] font-black leading-[0.95] tracking-tight">
              Engineering the future,<br /> one line of code at a time.
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              <HeroText text={typed} />
              <span className="animate-blink" aria-hidden>▍</span>
            </p>

            {/* quick stats */}
            <div className="mt-7 grid grid-cols-3 gap-3 sm:gap-4 text-center">
              {[
                { h: "Disciplines", v: "3+" },
                { h: "Projects", v: "10+" },
                { h: "Focus", v: "I&C/IT" },
              ].map((s, i) => (
                <motion.div key={s.h} variants={scaleIn} initial="hidden" animate="show" custom={i}>
                  <ShimmerCard className="p-4 bg-white">
                    <div className="text-2xl font-semibold text-blue-600">{s.v}</div>
                    <div className="text-xs text-slate-500">{s.h}</div>
                  </ShimmerCard>
                </motion.div>
              ))}
            </div>

            {/* primary CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic strength={10}>
                <Link
                  href="/about"
                  className="rounded-xl px-6 py-3 border border-slate-300 hover:bg-slate-50
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
                >
                  About me
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/projects"
                  className="rounded-xl px-6 py-3 bg-blue-600 text-white hover:brightness-95
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
                >
                  See work
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          {/* right: feature art (tilt) */}
          <motion.div variants={leftIn} initial="hidden" animate="show" className="order-first md:order-none">
            <Tilt3D>
              <div className="relative w-full aspect-[1/1] rounded-1xl overflow-hidden ring-1 ring-slate-200 shadow-[0_8px_30px_rgba(2,6,23,0.08)]">
                <Image src="/ilustrasi.png" alt="Rafly illustration" fill className="object-cover" priority />
              </div>
            </Tilt3D>
          </motion.div>
        </div>

        {/* stack marquee */}
        <div className="mt-10 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap animate-[marq_18s_linear_infinite] text-xs sm:text-sm text-slate-600">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="flex gap-8">
                Next.js • NestJS • Prisma • GCP (Cloud Run, Cloud SQL, GCS) •
                Docker • Typed APIs • EDMS • Instrument Datasheets • P&ID Design • Kubernetes • Istio • CI/CD • Observability
              </span>
            ))}
          </div>
          <style jsx>{`
            @keyframes marq {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </section>

      {/* =========================== WHAT I WORK ON =========================== */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left:1/2 left-1/2 top-0 -translate-x-1/2 h-1 w-36 rounded-full bg-gradient-to-r from-blue-600/70 to-cyan-400/70"
        />
        <div className="text-center mb-8">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="text-[clamp(1.35rem,3.2vw,2.25rem)] font-semibold">
            What I work on
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="mt-2 text-slate-600 text-sm">
            Engineering Platforms • Instrumentation Tooling • Web & Cloud Systems
          </motion.p>
        </div>

        <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <ProjectCards />
        </motion.div>

        <div className="mt-8 flex justify-center">
          <Magnetic>
            <Link
              href="/projects"
              className="rounded-xl px-5 py-2.5 border border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 text-sm"
            >
              Explore full portfolio →
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ============================= HOW I WORK ============================= */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center mb-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="text-[clamp(1.35rem,3vw,2rem)] font-semibold">
            How I work
          </motion.h2>
        </div>

        {/* Mobile: horizontal snap; Desktop: grid */}
        <div className="md:hidden -mx-4 px-4 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" />
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
            {[
              "Clarity over cleverness",
              "Automate the repeatable",
              "Measure, then optimize",
              "Safety by default",
            ].map((label, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                transition={{ duration: 0.4, ease: EASE }}
                className="snap-center min-w-[72%]"
              >
                <PrincipleRing label={label} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            "Clarity over cleverness",
            "Automate the repeatable",
            "Measure, then optimize",
            "Safety by default",
          ].map((label, i) => (
            <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} custom={i}>
              <PrincipleRing label={label} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================ CTA ================================ */}
      <section className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 text-center">
        {/* offset blocks for continuity */}
        <div aria-hidden className="hidden md:block absolute -top-10 left-[-6%] w-[56vw] max-w-[720px] h-[220px] bg-yellow-300/70 rounded-md rotate-[-1.5deg] -z-10" />
        <div aria-hidden className="hidden md:block absolute top-16 right-[-10%] w-[50vw] max-w-[620px] h-[200px] bg-cyan-400/45 rounded-md rotate-[1.5deg] -z-10" />

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-tight">
          build responsibly, then beautifully.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="mt-3 sm:mt-4 text-slate-600 text-sm sm:text-base md:text-lg">
          let’s catch up and build something great together.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="mt-7 sm:mt-9 flex items-center justify-center gap-3">
          <Magnetic>
            <Link href="/contact" className="rounded-xl px-6 sm:px-7 py-3 bg-blue-600 text-white hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40">
              Get in touch
            </Link>
          </Magnetic>
         
        </motion.div>
      </section>

      {/* iOS spacing */}
      <div className="pb-2" />
    </div>
  );
}
