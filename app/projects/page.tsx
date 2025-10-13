"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Pause, Play, X, ChevronLeft, ChevronRight, Globe } from "lucide-react";

// -------------------- Types & Data --------------------
type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  gui?: string; // optional embedded UI / iframe preview
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
  },
  {
    title: "Instrument Studio",
    description:
      "Experimental Python-based GUI for Instrument Datasheet Automation and calculation tools.",
    link: "#",
    image: "/studioinst.png",
    gui: "/studioinst.png",
  },
];

const websites: Record<SiteKey, { name: string; url: string; img: string; desc: string }> = {
  yuansejati: {
    name: "Yuan Sejati Energy",
    url: "https://yuansejati.co.id",
    img: "/images/projects/yuan-sejati.jpg",
    desc: "Company profile — Next.js, Tailwind, SEO optimization.",
  },
  rekaenergi: {
    name: "Reka Energi Nusantara",
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

// -------------------- Helper UI --------------------
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`relative w-full ${className}`}>{children}</section>
);

const FadeIn = ({ children, delay = 0, y = 24 }: any) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

// -------------------- Main Component --------------------
export default function ProjectsPageRevamp() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [siteKey, setSiteKey] = useState<SiteKey>("yuansejati");
  const [showEmbedHint, setShowEmbedHint] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  const featureTimer = useRef<NodeJS.Timeout | null>(null);

  const activeSite = websites[siteKey];

  // Rotate feature (projects) without using cards
 useEffect(() => {
  // matikan interval lama dulu
  if (featureTimer.current) {
    clearInterval(featureTimer.current);
    featureTimer.current = null;
  }

  // kalau autoRotate off: selesai (return undefined = valid)
  if (!autoRotate) return;

  // start baru
  featureTimer.current = setInterval(() => {
    setActiveFeatureIdx((idx) => (idx + 1) % projects.length);
  }, 6000);

  // cleanup SELALU void
  return () => {
    if (featureTimer.current) {
      clearInterval(featureTimer.current);
      featureTimer.current = null;
    }
  };
}, [autoRotate, projects.length]);

  // Hint overlay if iframe is blocked
  useEffect(() => {
    setShowEmbedHint(false);
    const t = setTimeout(() => setShowEmbedHint(true), 2500);
    return () => clearTimeout(t);
  }, [siteKey]);

  // Keyboard shortcuts: ←/→ for features, 1..3 for tabs, Esc to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setActiveFeatureIdx((i) => (i + 1) % projects.length);
      if (e.key === "ArrowLeft") setActiveFeatureIdx((i) => (i - 1 + projects.length) % projects.length);
      if (["1", "2", "3"].includes(e.key)) {
        const keys: SiteKey[] = ["yuansejati", "rekaenergi", "cbaenergy"];
        setSiteKey(keys[Number(e.key) - 1] || "yuansejati");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const feature = projects[activeFeatureIdx];

  const bg = useMemo(() => ({
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.45), rgba(0,0,0,.6)), url(${feature.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }), [feature.image]);

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
      <Section className="relative">
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
                      onClick={() => setActiveFeatureIdx((i) => (i - 1 + projects.length) % projects.length)}
                      className="p-2 border border-white/30 hover:bg-white/10"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      aria-label="Next feature"
                      onClick={() => setActiveFeatureIdx((i) => (i + 1) % projects.length)}
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
                      {projects.map((_, i) => (
                        <button
                          key={i}
                          aria-label={`Go to feature ${i + 1}`}
                          onClick={() => setActiveFeatureIdx(i)}
                          className={`h-1.5 w-6 ${
                            i === activeFeatureIdx ? "bg-white" : "bg-white/40 hover:bg-white/70"
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

      {/* ----------------------------- COMPANY WEBSITES (TABS + IFRAME) ----------------------------- */}
      <Section className="py-14 md:py-18 px-6 md:px-16 border-t border-gray-100">
        <FadeIn>
          <div className="flex items-center gap-2 text-gray-800 mb-4">
            <Globe className="opacity-70" />
            <h3 className="text-2xl md:text-3xl font-semibold">Company Websites</h3>
          </div>
          <p className="text-gray-600 max-w-3xl text-sm">
            "wow nice website" — what clients say when I hand them a modern, responsive, and fast corporate site :*
          </p>
        </FadeIn>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(websites) as SiteKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSiteKey(key)}
              className={`px-4 py-2 text-sm transition-all border ${
                siteKey === key
                  ? "bg-[#2563eb] text-white border-[#2563eb]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {websites[key].name}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="mt-4 flex items-center gap-3">
          
          <div>
            <p className="font-medium leading-tight">{activeSite.name}</p>
            <p className="text-xs text-gray-500">{activeSite.desc}</p>
          </div>
          <a
            href={activeSite.url}
            target="_blank"
            className="ml-auto inline-flex items-center text-[#2563eb] text-sm hover:underline"
          >
            Open current <ExternalLink size={14} className="ml-1" />
          </a>
        </div>

        {/* Live preview */}
        <div className="relative mt-4 border border-gray-200 bg-gray-50">
          <iframe
            key={siteKey}
            src={activeSite.url}
            className="w-full h-[420px] md:h-[500px] border-0"
            loading="lazy"
          />
          {showEmbedHint && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/85 backdrop-blur px-4 py-2 text-sm text-gray-700 border border-gray-200">
                If the preview looks blank, the site may block embedding. Use <span className="font-medium">Open current</span> to view in a new tab.
              </div>
            </div>
          )}
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
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={() => setSelected(null)}
              >
                <X size={24} />
              </button>

              <div className="w-full h-full flex flex-col">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold">{selected.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selected.description}</p>
                  </div>
                  <a
                    href={selected.link}
                    target="_blank"
                    className="inline-flex items-center text-[#2563eb] hover:underline"
                  >
                    Open Site <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>

                <div className="flex-1 bg-gray-50">
                  {selected.gui?.includes("http") ? (
                    <iframe src={selected.gui} className="w-full h-full border-0" loading="lazy" />
                  ) : (
                    <img src={selected.gui || selected.image} alt="Project GUI" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------- FOOTER MINI-HELP ----------------------------- */}
      <Section className="py-10 px-6 md:px-16 text-center text-sm text-gray-500">
        <p>
          Pro tip: Use ←/→ to switch featured projects. Press 1–3 to switch company sites. Press Esc to close the preview.
        </p>
      </Section>
    </div>
  );
}
