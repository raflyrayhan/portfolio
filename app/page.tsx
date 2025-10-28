"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroText, useTypewriter } from "@/components/Typewriter";
import { Tilt3D } from "@/components/Tilt3D";
import { Magnetic } from "@/components/Magnetic";
import { ShimmerCard } from "@/components/ShimmerCard";
import { TechGridParallax } from "@/components/TechGridParallax";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Spotlight } from "@/components/Spotlight";
import { PrincipleRing } from "@/components/PrincipleRing";
import { ProjectCards } from "@/components/ProjectCards";

/* Tagline */
const MESSAGES = [
  "I simply </code>",
  "Cloud-native builder",
  "Instrument & Control + Software",
] as const;

/* Easing & Variants */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, ease: EASE } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const leftIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_SOFT } },
};

export default function HomePage() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(MESSAGES[0], 28);

  // subtle parallax for hero art
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 300], [0, reduce ? 0 : -24]);

  return (
    <div className="relative bg-white text-slate-900 overflow-x-hidden">
      {/* lightweight global micro-fx */}
      <TechGridParallax />
      <NoiseOverlay />
      <Spotlight />

      {/* =============================== HERO =============================== */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-12">
        {/* gradient halo (very subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[80%] max-w-5xl rounded-[52px] bg-gradient-to-r from-blue-600/10 via-cyan-400/10 to-amber-300/10 blur-2xl -z-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-[1.06fr_0.94fr] items-center gap-8 md:gap-14">
          {/* left: copy */}
          <motion.div variants={staggerParent} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2rem,4.8vw,3.7rem)] font-black leading-[0.98] tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">
                Engineering the future,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600">
                one line of code at a time.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-slate-600 text-sm sm:text-base"
            >
              <HeroText text={typed} />
              <span className="ml-1 align-baseline animate-blink" aria-hidden>
                ▍
              </span>
            </motion.p>

            {/* badges (replace marquee) */}
            <motion.ul
              variants={staggerParent}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {[
                "Next.js",
                "NestJS",
                "Prisma",
                "GCP · Cloud Run/SQL/GCS",
                "Docker",
                "Kubernetes",
                "EDMS",
                "Instrumentation",
                "CI/CD",
                "Observability",
              ].map((t) => (
                <motion.li key={t} variants={scaleIn}>
                  <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:border-slate-300">
                    {t}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* stats */}
            <motion.div
              variants={staggerParent}
              className="mt-7 grid grid-cols-3 gap-3 sm:gap-4 text-center"
            >
              {[
                { h: "Disciplines", v: "3+" },
                { h: "Projects", v: "10+" },
                { h: "Focus", v: "I&C/IT" },
              ].map((s) => (
                <motion.div key={s.h} variants={scaleIn}>
                  <ShimmerCard className="p-4 bg-white">
                    <div className="text-2xl font-semibold text-blue-700">
                      {s.v}
                    </div>
                    <div className="text-xs text-slate-500">{s.h}</div>
                  </ShimmerCard>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              <Magnetic strength={10}>
                <Link
                  href="/about"
                  className="rounded-xl px-6 py-3 border border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
                >
                  About me
                </Link>
              </Magnetic>
              
            </motion.div>
          </motion.div>

          {/* right: hero art (tilt + parallax) */}
          <motion.div
            variants={leftIn}
            initial="hidden"
            animate="show"
            className="order-first md:order-none"
            style={{ y: imgY as any }}
          >
            <Tilt3D max={8}>
              <div className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-[0_8px_30px_rgba(2,6,23,0.08)]">
                <Image
                  src="/ilustrasi.png"
                  alt="Rafly illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </section>

      {/* ========================== PROJECTS TEASER ========================== */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="text-[clamp(1.35rem,3.2vw,2.25rem)] font-semibold"
          >
            Selected Work
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="mt-2 text-slate-600 text-sm"
          >
            Engineering Platforms • Instrumentation Tooling • Web &amp; Cloud
            Systems
          </motion.p>
        </div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* subtle mask to avoid harsh edges while scrolling */}
          <div className="pointer-events-none absolute -inset-x-2 -top-6 h-6 bg-gradient-to-b from-white to-transparent" />
          <ProjectCards />
          <div className="pointer-events-none absolute -inset-x-2 -bottom-6 h-6 bg-gradient-to-t from-white to-transparent" />
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

      {/* ============================= PRINCIPLES ============================= */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="text-[clamp(1.35rem,3vw,2rem)] font-semibold"
          >
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
            ].map((label) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
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
          ].map((label) => (
            <motion.div
              key={label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-120px" }}
            >
              <PrincipleRing label={label} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================= CTA ================================ */}
      <section className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 text-center">
        {/* dual halo */}
        <div
          aria-hidden
          className="hidden md:block absolute -top-10 left-[-6%] w-[54vw] max-w-[720px] h-[200px] bg-gradient-to-r from-amber-300/60 to-amber-300/20 rounded-xl blur-2xl -z-10"
        />
        <div
          aria-hidden
          className="hidden md:block absolute top-16 right-[-10%] w-[48vw] max-w-[620px] h-[180px] bg-gradient-to-r from-cyan-400/40 to-blue-600/25 rounded-xl blur-2xl -z-10"
        />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-tight"
        >
          build responsibly, then beautifully.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-3 sm:mt-4 text-slate-600 text-sm sm:text-base md:text-lg"
        >
          let’s catch up and build something great together.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-7 sm:mt-9 flex items-center justify-center gap-3"
        >
          <Magnetic>
            <Link
              href="/contact"
              className="rounded-xl px-6 sm:px-7 py-3 bg-blue-600 text-white hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
            >
              Get in touch
            </Link>
          </Magnetic>
   
        </motion.div>
      </section>

      {/* iOS spacing fixer */}
      <div className="pb-2" />

      {/* Local keyframes (no global pollution) */}
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s steps(2, start) infinite; }
      `}</style>
    </div>
  );
}
