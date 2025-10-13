"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Cpu, Cloud, Rocket, ChevronRight, ChevronDown, TerminalSquare, Link2 } from "lucide-react";

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

// =================== DATA (from CV) ===================
const quickFacts = [
  { label: "Based", value: "Indonesia (UTC+7)" },
  { label: "Focus", value: "Instrumentation, EDMS, Cloud" },
  { label: "Stack", value: "Next.js • NestJS • Prisma • GCP" },
  { label: "Industries", value: "Oil & Gas • EPC" },
];

const timeline = [
  {
    year: "2025 — Present",
    title: "Instrument & Control Engineer — PT Infimech Harmoni Teknologi",
    bullets: [
      "Produced engineering docs: datasheets, I/O list, instrument index, loop & wiring schedules.",
      "Instrument sizing, calibration, selection (transmitters, control valves, flow elements) per ISA 75 & ISO 5167.",
      "SIS compliance (IEC 61511), SIL validation; ATEX/IECEx compliance checks.",
      "PLC/DCS/SCADA integration for process control & monitoring.",
      "FAT/SAT & commissioning support; ensured readiness and safety.",
      "Standardized EDMS workflows across disciplines.",
    ],
  },
  {
    year: "2024 — Present",
    title: "Front‑End / Cloud Engineer — IT Project Engineer",
    bullets: [
      "Built Modular ERP & EDMS using Next.js + NestJS monorepo with Prisma & PostgreSQL.",
      "Deployed to Google Cloud Run; Cloud SQL, Artifact Registry, GCS storage.",
      "Front‑end systems with React Query, TypeScript, Tailwind; REST APIs.",
      "Automated CI/CD via Cloud Build & Docker.",
      "Interconnected modules for Project Management, Procurement, and R&D.",
      "Delivered corporate websites: yuansejati.co.id, reka‑energi.com, cba‑energy.com.",
    ],
  },
  {
    year: "2020",
    title: "Network Engineer — Telkom Indonesia Area Cirebon",
    bullets: [
      "Installed & configured fiber devices and networks.",
      "Documentation for network architecture & configurations.",
      "Routing & switching optimization for efficiency & security.",
    ],
  },
];

const skills: { area: string; items: { name: string; level: number }[] }[] = [
  {
    area: "Instrumentation & Control",
    items: [
      { name: "ISA S5.1 Tagging", level: 88 },
      { name: "IEC 61511 / SIS", level: 86 },
      { name: "SIL Assessment", level: 80 },
      { name: "Control Valve Sizing (Cv)", level: 84 },
      { name: "Flow Measurement (ISO 5167)", level: 82 },
      { name: "P&ID Development", level: 83 },
      { name: "Loop Diagram / I&O", level: 85 },
      { name: "FAT / SAT Support", level: 78 },
    ],
  },
  {
    area: "Software & Cloud",
    items: [
      { name: "Next.js", level: 90 },
      { name: "NestJS", level: 86 },
      { name: "React", level: 88 },
      { name: "TypeScript", level: 88 },
      { name: "Prisma", level: 82 },
      { name: "PostgreSQL", level: 80 },
      { name: "Python", level: 78 },
      { name: "Docker", level: 84 },
      { name: "Google Cloud Run", level: 82 },
      { name: "Cloud SQL / GCS", level: 80 },
      { name: "CI/CD (Cloud Build)", level: 78 },
      { name: "REST API / SEO", level: 72 },
    ],
  },
];

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/raflyray", hint: "professional footprint" },
  { label: "GitHub", href: "https://github.com/raflyrayhan", hint: "code & experiments" },
  { label: "Email", href: "/contact", hint: "let’s collaborate" },
];

// =================== PAGE ===================
export default function AboutPageCVSynced() {
  const [tab, setTab] = useState<"engineer" | "developer">("engineer");
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills
      .map((group) => ({ area: group.area, items: group.items.filter((it) => it.name.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative bg-white text-[#0f172a] min-h-screen overflow-hidden">
      <GridBG />
      <GradientBlob className="w-[52vw] h-[52vw] left-[-10vw] top-[-10vh]" />
      <GradientBlob className="w-[40vw] h-[40vw] right-[-8vw] bottom-[10vh]" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 space-y-20">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">Hey, I’m <span className="text-[#2563eb]">Rafly</span>.</h1>
            <p className="text-lg text-gray-600 leading-relaxed">I’m an Instrument & Control Engineer and Cloud‑based Software Engineer — merging industrial automation with modern web to make workflows traceable, connected, and fast.</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {quickFacts.map((f) => (
                <div key={f.label} className="p-3 border border-gray-200 bg-white">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">{f.label}</p>
                  <p className="font-medium mt-1">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:bg-gray-50"><Link2 size={14} /> {l.label}</a>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="relative flex justify-center">
            <div className="[perspective:1000px]">
              <motion.div whileHover={{ rotateX: -4, rotateY: 6 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="relative w-64 h-64 md:w-80 md:h-80 border border-gray-200 bg-white">
                <Image src="/portrait.jpg" alt="Rafly portrait" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Roles Toggle */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setTab("engineer")} className={`px-4 py-2 text-sm border ${tab === "engineer" ? "bg-[#2563eb] text-white border-[#2563eb]" : "border-gray-300 hover:bg-gray-50"}`}>Engineer</button>
            <button onClick={() => setTab("developer")} className={`px-4 py-2 text-sm border ${tab === "developer" ? "bg-[#2563eb] text-white border-[#2563eb]" : "border-gray-300 hover:bg-gray-50"}`}>Developer</button>
          </div>
          <AnimatePresence mode="wait">
            {tab === "engineer" ? (
              <motion.div key="eng" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid md:grid-cols-2 gap-10">
                <div className="p-6 border border-gray-200 bg-white">
                  <div className="flex items-center gap-2 mb-2 text-[#2563eb]"><Cpu size={18}/> Field to Cloud</div>
                  <p className="text-gray-600">Loop diagrams, control valves, datasheets — translated into structured models with versioning and audit trails. PLC/DCS/SCADA integration and commissioning support.</p>
                </div>
                <div className="p-6 border border-gray-200 bg-white">
                  <div className="flex items-center gap-2 mb-2 text-[#2563eb]"><Rocket size={18}/> EDMS Workflows</div>
                  <p className="text-gray-600">SIS awareness (IEC 61511) and ATEX/IECEx checks; automated submission cycles, numbering, review gates, and transmittals.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="dev" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid md:grid-cols-2 gap-10">
                <div className="p-6 border border-gray-200 bg-white">
                  <div className="flex items-center gap-2 mb-2 text-[#2563eb]"><Cloud size={18}/> Cloud‑Native</div>
                  <p className="text-gray-600">Next.js + NestJS on Cloud Run; SQL via Prisma; artifact management; CI/CD with Cloud Build. Design systems that scale for EPC operations.</p>
                </div>
                <div className="p-6 border border-gray-200 bg-white">
                  <div className="flex items-center gap-2 mb-2 text-[#2563eb]"><TerminalSquare size={18}/> Python Bridges</div>
                  <p className="text-gray-600">Sizing/calculation scripts bridged to the web with Pyodide/FastAPI; live output and verification hooks.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Timeline (accordion from CV) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Experience</h2>
          <div className="border-l-2 border-dashed border-gray-200">
            {timeline.map((t, idx) => {
              const open = openIdx === idx;
              return (
                <div key={t.title} className="pl-6 relative">
                  <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#2563eb]" />
                  <button onClick={() => setOpenIdx(open ? null : idx)} className="w-full text-left py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{t.year}</span>
                      <p className="font-medium">{t.title}</p>
                      {open ? <ChevronDown size={16} className="ml-auto"/> : <ChevronRight size={16} className="ml-auto"/>}
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.ul initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="pb-4 list-disc pl-5 text-gray-600 space-y-1">
                        {t.bullets.map((b) => (<li key={b}>{b}</li>))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Skills (searchable) */}
        <section>
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-semibold">Technical Skills</h2>
            <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="/ to focus — search skills…" className="px-3 py-2 border border-gray-300 bg-white" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSkills.map((group) => (
              <div key={group.area} className="p-6 border border-gray-200 bg-white">
                <h3 className="font-medium mb-3 text-[#2563eb]">{group.area}</h3>
                <div className="space-y-3">
                  {group.items.map((it) => (
                    <div key={it.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span>{it.name}</span>
                        <span className="text-gray-500">{it.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 mt-1">
                        <div className="h-2 bg-[#38bdf8]" style={{ width: `${it.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h3 className="text-3xl font-semibold">Let’s work smarter, not harder</h3>
          <p className="text-gray-600 mt-2">Have a system to build or a workflow to untangle? I’m in.</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a href="/projects" className="px-6 py-3 bg-[#2563eb] text-white hover:brightness-95">See projects</a>
            <a href="/contact" className="px-6 py-3 border border-gray-300 hover:bg-gray-50">Contact</a>
          </div>
        </section>
      </div>
    </section>
  );
}
