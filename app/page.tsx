"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

function useTypewriter(text: string, speed = 42) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

function GridBG() {
  return (
    <svg className="absolute inset-0 w-full h-full -z-10 opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function GradientBlob({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute blur-3xl opacity-60 ${className}`}
      style={{
        background:
          "radial-gradient(35% 35% at 50% 50%, rgba(37,99,235,0.25) 0%, rgba(56,189,248,0.18) 45%, rgba(255,255,255,0) 70%)",
      }}
    />
  );
}

export default function HomePageRevamp() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const sections = 4;
  const containerHeight = `${sections * 100}vh`;

  const yHero = useTransform(scrollYProgress, [0, 0.25], ["0%", "-60%"]);
  const yWork = useTransform(scrollYProgress, [0.2, 0.85], ["100%", "0%"]);
  const yCTA = useTransform(scrollYProgress, [0.8, 1], ["100%", "0%"]);

  const line1 = useTypewriter("Where engineering meets </code>");
  const line2 = useTypewriter("What I’m shipping lately.", 32);
  const line3 = useTypewriter("Built from the field, for the cloud.", 34);

  return (
    <div ref={ref} className="relative" style={{ height: containerHeight }}>
      <motion.section
        style={{ y: yHero }}
        className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-white text-[#0f172a]"
      >
        <GridBG />
        <GradientBlob className="w-[50vw] h-[50vw] left-[-10vw] top-[-10vh]" />
        <GradientBlob className="w-[40vw] h-[40vw] right-[-8vw] bottom-[10vh]" />

        <div className="px-6 text-center max-w-4xl">
          <motion.h1
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold leading-tight tracking-tight"
          >
            {line1} <span className="text-[#2563eb]">|</span>
          </motion.h1>
          <p className="text-base md:text-xl text-gray-600 mt-5 leading-relaxed">
            Thanks for stopping by. Welcome to my digital portofolio.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/projects"
              className="px-6 py-3 bg-[#2563eb] text-white hover:brightness-95"
            >
              See projects
            </a>
            <a
              href="/about"
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50"
            >
              About me
            </a>
          </div>
          <div className="mt-8 text-xs text-gray-500">Scroll to explore ↓</div>
        </div>
      </motion.section>

      <motion.section
        style={{ y: yWork }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-[#f6f8fb] text-gray-800"
      >
        <GridBG />
        <div className="relative z-10 w-full max-w-7xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-semibold text-center mb-6"
          >
            {line2} <span className="text-[#2563eb]">|</span>
          </motion.h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Here’s a glimpse of the ecosystem I’m actively shaping — blending engineering, software, and design
            into scalable, real‑world tools.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Portal‑IMX 2025",
                desc: "A fully cloud‑based Engineering Document Management System (EDMS) tailored for EPC projects. Built with Next.js, NestJS, Prisma, and GCP for version‑controlled document handling and task tracking.",
                href: "/projects#portal-imx",
              },
              {
                title: "Instrument Studio",
                desc: "Python‑driven application for instrument datasheet automation, control valve sizing, and process data calculations — now evolving into a web‑connected environment with Pyodide integration.",
                href: "/projects#instrument-studio",
              },
              {
                title: "Corporate Web Ecosystem",
                desc: "Suite of modern, responsive websites for the energy & EPC sector — emphasizing performance, SEO, and modern UI built with Next.js, Tailwind, and clean design systems.",
                href: "/projects#websites",
              },
            ].map((p) => (
              <motion.a
                key={p.title}
                href={p.href}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="block p-6 bg-white/95 backdrop-blur border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                <h3 className="font-semibold text-lg text-[#2563eb] mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </motion.a>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white shadow-md border border-gray-100"
            >
              <h4 className="font-semibold text-lg text-[#2563eb] mb-2">Procurement & MTO Integration</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Developing digital pipelines connecting Material Take‑Offs (MTO) with procurement workflows. The goal: streamline instrument BOMs, vendor selection, and cost evaluation into an automated process.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white shadow-md border border-gray-100"
            >
              <h4 className="font-semibold text-lg text-[#2563eb] mb-2">Cloud Infrastructure Automation</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Deploying microservices on Google Cloud Run with containerized workflows — full DevOps chain including Cloud SQL, Artifact Registry, and CI/CD automation using Cloud Build.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <a href="/projects" className="inline-block px-5 py-2 border border-gray-300 hover:bg-white">View all projects</a>
          </div>
        </div>
      </motion.section>

      <motion.section
        style={{ y: yCTA }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white text-[#0f172a]"
      >
        <GridBG />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold mb-4">
            {line3} <span className="text-[#38bdf8]">|</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let’s build systems that think smarter, connect deeper, and simplify the complex.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="/contact" className="px-7 py-3 bg-[#2563eb] text-white hover:brightness-95">Get in touch</a>
            <a href="/certificates" className="px-7 py-3 border border-gray-300 hover:bg-gray-50">Certificates</a>
          </div>
        </div>
      </motion.section>

      <ScrollHint />
    </div>
  );
}

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
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-sm z-[60]"
        >
          scroll ↓
        </motion.div>
      )}
    </AnimatePresence>
  );
}
