"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Pause,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import Image from "next/image";

// -------------------- Types & Data --------------------
type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  gui?: string;    // optional embedded UI / iframe preview
  anchor?: string; // optional hash anchor for deep-link
};

type SiteKey = "yuansejati" | "rekaenergi" | "cbaenergy";

const projects: Project[] = [
  {
    title: "Portal-IMX 2025",
    description:
      "Cloud-based Engineering Document Management System (EDMS) designed for EPC workflows and document versioning.",
    link: "https://eng-portal.vercel.app/",
    image: "/imxportal.png",
    gui: "https://eng-portal.vercel.app/",
    anchor: "portal-imx",
  },
  {
    title: "Instrument Studio",
    description:
      "Experimental Python-based GUI for Instrument Datasheet Automation and calculation tools.",
    link: "#",
    image: "/studioinst.png",
    gui: "/studioinst.png",
    anchor: "instrument-studio",
  },
];

const websites: Record<
  SiteKey,
  { name: string; url: string; img: string; desc: string }
> = {
  yuansejati: {
    name: "Yuan Sejati",
    url: "https://yuansejati.co.id",
    img: "/images/projects/yuan-sejati.jpg",
    desc: "Company profile — Next.js, Tailwind, SEO optimization.",
  },
  rekaenergi: {
    name: "Rekayasa Energi Bersama",
    url: "https://reka-energi.com",
    img: "/images/projects/reka-energi.jpg",
    desc: "Corporate EPC site — clean architecture, SEO, responsive.",
  },
  cbaenergy: {
    name: "CBA Energy",
    url: "https://cba-energy.com",
    img: "/images/projects/cba-energy.jpg",
    desc: "Industrial consulting — modern UI and performance minded.",
  },
};

// order untuk navigasi panah (scale kalau nambah)
const siteOrder: SiteKey[] = ["yuansejati", "rekaenergi", "cbaenergy"];

// -------------------- Helper UI --------------------
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {children}
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// cross-env interval type (Node/Browser)
type IntervalID = ReturnType<typeof setInterval>;

// -------------------- Main Component --------------------
export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [siteKey, setSiteKey] = useState<SiteKey>("yuansejati");
  const [showEmbedHint, setShowEmbedHint] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  const featureTimer = useRef<IntervalID | null>(null);

  const activeSite = websites[siteKey];
  const feature = projects[activeFeatureIdx];

  // autoplay rotator
  useEffect(() => {
    if (featureTimer.current) {
      clearInterval(featureTimer.current);
      featureTimer.current = null;
    }
    if (!autoRotate) return;

    featureTimer.current = setInterval(() => {
      setActiveFeatureIdx((idx) => (idx + 1) % projects.length);
    }, 6000);

    return () => {
      if (featureTimer.current) {
        clearInterval(featureTimer.current);
        featureTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotate]);

  // hint kalau iframe di-block
  useEffect(() => {
    setShowEmbedHint(false);
    const t = window.setTimeout(() => setShowEmbedHint(true), 2500);
    return () => window.clearTimeout(t);
  }, [siteKey]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setActiveFeatureIdx((i) => (i + 1) % projects.length);
      if (e.key === "ArrowLeft")
        setActiveFeatureIdx((i) => (i - 1 + projects.length) % projects.length);
      if (["1", "2", "3"].includes(e.key)) {
        const k = siteOrder[Number(e.key) - 1];
        if (k) setSiteKey(k);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // bg overlay + image
  const bg = useMemo(
    () => ({
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.45), rgba(0,0,0,.6)), url(${feature.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [feature.image]
  );

  // website nav handlers
  function nextSite() {
    const i = siteOrder.indexOf(siteKey);
    setSiteKey(siteOrder[(i + 1) % siteOrder.length]);
  }
  function prevSite() {
    const i = siteOrder.indexOf(siteKey);
    setSiteKey(siteOrder[(i - 1 + siteOrder.length) % siteOrder.length]);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* -------------------------------- HERO -------------------------------- */}
      <Section className="py-24 md:py-28 px-6 md:px-16 overflow-hidden">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold text-center"
        >
          Projects that <span className="text-[#2563eb]">build impact</span>
        </motion.h1>
        <FadeIn delay={0.15}>
          <p className="max-w-3xl mx-auto text-center text-gray-600 mt-4">
            from me to you, with code.
          </p>
        </FadeIn>
      </Section>

      {/* ------------------------ FEATURE SHOWCASE (FULL-BLEED) ------------------------ */}
      <Section className="relative" id={feature.anchor}>
        <div className="relative h-[68vh] md:h-[78vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={feature.title}
              className="absolute inset-0"
              style={bg}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="px-6 md:px-16 pb-8 md:pb-12">
                  <div className="max-w-5xl">
                    <motion.h2 className="text-white text-3xl md:text-5xl font-semibold drop-shadow">
                      {feature.title}
                    </motion.h2>
                    <p className="text-white/85 max-w-2xl mt-3">
                      {feature.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={feature.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 text-sm md:text-base hover:bg-gray-100"
                      >
                        Visit site <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => setSelected(feature)}
                        className="inline-flex items-center gap-2 border border-white/70 text-white px-4 py-2 text-sm md:text-base hover:bg-white/10"
                      >
                        Quick preview
                      </button>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-6 flex items-center gap-2 text-white/80">
                    <button
                      aria-label="Previous feature"
                      onClick={() =>
                        setActiveFeatureIdx(
                          (i) => (i - 1 + projects.length) % projects.length
                        )
                      }
                      className="p-2 border border-white/30 hover:bg-white/10"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      aria-label="Next feature"
                      onClick={() =>
                        setActiveFeatureIdx((i) => (i + 1) % projects.length)
                      }
                      className="p-2 border border-white/30 hover:bg-white/10"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <button
                      aria-label={autoRotate ? "Pause autoplay" : "Play autoplay"}
                      onClick={() => setAutoRotate((s) => !s)}
                      className="ml-2 p-2 border border-white/30 hover:bg-white/10"
                    >
                      {autoRotate ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <div className="ml-3 flex gap-2">
                      {projects.map((p, i) => (
                        <button
                          key={p.title}
                          aria-label={`Go to feature ${i + 1}`}
                          onClick={() => setActiveFeatureIdx(i)}
                          className={`h-1.5 w-6 ${
                            i === activeFeatureIdx
                              ? "bg-white"
                              : "bg-white/40 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {/* ----------------------------- COMPANY WEBSITES (ARROWS + IFRAME) ----------------------------- */}
      <Section className="py-14 md:py-18 px-6 md:px-16 border-t border-gray-100" id="websites">
        <FadeIn>
          <div className="flex items-center gap-2 text-gray-800 mb-2">
            <Globe className="opacity-70" />
            <h3 className="text-2xl md:text-3xl font-semibold">Company Websites</h3>
          </div>
          <p className="text-gray-600 max-w-3xl text-sm">
            &quot;wow nice website&quot; — what clients say when I hand them a modern, responsive, and fast corporate site :*
          </p>
        </FadeIn>

        {/* Header + Arrows */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={prevSite}
            aria-label="Previous website"
            className="p-2 border border-gray-200 hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-3">
            
            <div>
              <p className="font-medium leading-tight">{activeSite.name}</p>
              <p className="text-xs text-gray-500">{activeSite.desc}</p>
            </div>
          </div>

          <button
            onClick={nextSite}
            aria-label="Next website"
            className="p-2 border border-gray-200 hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>

          <a
            href={activeSite.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open current website"
            className="ml-auto p-2 border border-transparent hover:border-gray-200"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Live preview */}
        <div className="relative mt-4 border border-gray-200 bg-gray-50">
          <iframe
            key={siteKey}
            src={activeSite.url}
            className="w-full h-[420px] md:h-[500px] border-0"
            loading="lazy"
            title={`${activeSite.name} preview`}
          />
          {showEmbedHint && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/85 backdrop-blur px-4 py-2 text-sm text-gray-700 border border-gray-200">
                If the preview looks blank, the site may block embedding. Use{" "}
                <span className="font-medium">Open current</span> to view in a new tab.
              </div>
            </div>
          )}
        </div>

        {/* Dots indicator (opsional, tetap simpel) */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {siteOrder.map((k) => (
            <button
              key={k}
              onClick={() => setSiteKey(k)}
              aria-label={`Go to ${websites[k].name}`}
              className={`h-1.5 w-6 ${
                k === siteKey ? "bg-[#2563eb]" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </Section>

      {/* ----------------------------- MODAL: QUICK PREVIEW ----------------------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white w-full max-w-5xl h-[80vh] overflow-hidden relative shadow-2xl"
              role="dialog"
              aria-modal
              aria-label="Project quick preview"
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={() => setSelected(null)}
                aria-label="Close preview"
              >
                <X size={24} />
              </button>

              <div className="w-full h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold">{selected.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selected.description}
                    </p>
                  </div>
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-[#2563eb] hover:underline"
                  >
                    Open Site <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>

                <div className="flex-1 bg-gray-50">
                  {selected.gui?.startsWith("http") ? (
                    <iframe
                      src={selected.gui}
                      className="w-full h-full border-0"
                      loading="lazy"
                      title={`${selected.title} embedded preview`}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={selected.gui || selected.image}
                        alt="Project GUI"
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
