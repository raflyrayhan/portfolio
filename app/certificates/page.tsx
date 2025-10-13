"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Search, Filter, Calendar, SlidersHorizontal, ZoomIn, ZoomOut, ChevronDown } from "lucide-react";

// -------------------------------- Types --------------------------------
type Cert = {
  title: string;
  image: string;
  year: number;
  issuer: string;
  url?: string; // verification / details
  skills?: string[];
  credentialId?: string;
};

// -------------------------------- Data --------------------------------
const certs: Cert[] = [
  {
    title: "Google Project Management",
    image: "/images/certificates/google-pm.png",
    year: 2025,
    issuer: "Google",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    skills: ["Agile", "Scrum", "Risk", "Stakeholder"],
  },
  {
    title: "IBM Microservices with Istio & Kubernetes",
    image: "/images/certificates/ibm.png",
    year: 2022,
    issuer: "IBM",
    url: "https://www.coursera.org/learn/istio-kubernetes-microservices",
    skills: ["Kubernetes", "Istio", "Microservices", "Cloud"],
  },
  {
    title: "Electrical Engineering in Theory",
    image: "/images/certificates/alison.png",
    year: 2024,
    issuer: "Alison",
    url: "https://alison.com/",
    skills: ["Circuits", "Signals", "Power"],
  },
];

// -------------------------------- Helpers --------------------------------
const uniq = (arr: string[]) => Array.from(new Set(arr));

// -------------------------------- Component --------------------------------
export default function CertificatesPageRevamp() {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState<string | "all">("all");
  const [yearFrom, setYearFrom] = useState<number>(Math.min(...certs.map((c) => c.year)));
  const [yearTo, setYearTo] = useState<number>(Math.max(...certs.map((c) => c.year)));
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc" | "title">("year-desc");
  const [selected, setSelected] = useState<Cert | null>(null);
  const [zoom, setZoom] = useState(1);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // keyboard shortcuts: '/' to focus search; Esc to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const issuers = useMemo(() => uniq(certs.map((c) => c.issuer)).sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const data = certs
      .filter((c) => (issuer === "all" ? true : c.issuer === issuer))
      .filter((c) => c.year >= yearFrom && c.year <= yearTo)
      .filter((c) => (q ? `${c.title} ${c.issuer} ${c.skills?.join(" ")}`.toLowerCase().includes(q) : true));

    if (sortBy === "year-asc") return data.sort((a, b) => a.year - b.year);
    if (sortBy === "title") return data.sort((a, b) => a.title.localeCompare(b.title));
    return data.sort((a, b) => b.year - a.year);
  }, [issuer, yearFrom, yearTo, query, sortBy]);

  // derive timeline years
  const years = useMemo(() => uniq(certs.map((c) => String(c.year))).map(Number).sort((a, b) => b - a), []);

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 lg:px-20 text-blue-900 dark:text-black">
      {/* --------------------------- Header --------------------------- */}
      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-800">Certificates</h1>
        <p className="mt-2 text-black dark:text--400 max-w-3xl text-sm">
          Just so you know, I do care about learning and continuous improvement. Here are some of the certificates I've earned to back that up.
        </p>
      </motion.div>

      {/* --------------------------- Controls --------------------------- */}
      <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_auto_auto] items-center">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, issuer, skills…"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Issuer filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="opacity-70" />
          <select
            value={issuer}
            onChange={(e) => setIssuer(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60"
          >
            <option value="all">All issuers</option>
            {issuers.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {/* Year range */}
        <div className="flex items-center gap-2">
          <Calendar size={16} className="opacity-70" />
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={yearFrom}
              onChange={(e) => setYearFrom(Number(e.target.value))}
              className="w-24 px-2 py-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60"
            />
            <span className="opacity-60">to</span>
            <input
              type="number"
              value={yearTo}
              onChange={(e) => setYearTo(Number(e.target.value))}
              className="w-24 px-2 py-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="opacity-70" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60"
          >
            <option value="year-desc">Sort: Newest</option>
            <option value="year-asc">Sort: Oldest</option>
            <option value="title">Sort: Title</option>
          </select>
        </div>
      </div>

      {/* --------------------------- Timeline --------------------------- */}
      <div className="mt-10">
        <div className="relative pl-8 border-l-2 border-dashed border-gray-200 dark:border-gray-800">
          {years.map((y) => (
            <div key={y} className="mb-8">
              <div className="-ml-[9px] w-4 h-4 rounded-full bg-blue-500" />
              <h3 className="mt-2 text-xl font-semibold">{y}</h3>

              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.filter((c) => c.year === y).length === 0 ? (
                  <p className="text-sm text-gray-500">No certificates matching filters for {y}.</p>
                ) : (
                  filtered
                    .filter((c) => c.year === y)
                    .map((c) => (
                      <motion.button
                        key={c.title}
                        onClick={() => {
                          setSelected(c);
                          setZoom(1);
                        }}
                        whileHover={{ y: -4 }}
                        className="text-left group border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 backdrop-blur p-3"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={c.image}
                            alt={c.title}
                            loading="lazy"
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {c.url && (
                            <a
                              href={c.url}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/90 text-gray-900 border border-gray-200 hover:bg-white"
                            >
                              Verify <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium">{c.title}</p>
                          <p className="text-xs text-gray-500">{c.issuer} • {c.year}</p>
                          {!!c.skills?.length && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {c.skills.slice(0, 4).map((s) => (
                                <span key={s} className="text-[10px] px-2 py-0.5 border border-gray-300 dark:border-gray-700">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------- Modal --------------------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.98, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative w-full max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <button
                className="absolute top-3 right-3 p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-3">
                <div>
                  <h2 className="text-xl font-semibold leading-tight">{selected.title}</h2>
                  <p className="text-sm text-gray-500">{selected.issuer} • {selected.year}</p>
                </div>
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    className="ml-auto inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Verify credential <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <div className="p-4 grid md:grid-cols-[1fr_280px] gap-4">
                {/* Preview */}
                <div className="relative bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[380px]">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    style={{ transform: `scale(${zoom})` }}
                    className="max-h-[70vh] object-contain transition-transform"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                      className="px-3 py-2 bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <button
                      onClick={() => setZoom((z) => Math.min(2.4, +(z + 0.1).toFixed(2)))}
                      className="px-3 py-2 bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="border border-gray-200 dark:border-gray-800 p-4">
                  <h3 className="font-semibold mb-2">Details</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <dt className="text-gray-500">Title</dt>
                      <dd>{selected.title}</dd>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <dt className="text-gray-500">Issuer</dt>
                      <dd>{selected.issuer}</dd>
                    </div>
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <dt className="text-gray-500">Year</dt>
                      <dd>{selected.year}</dd>
                    </div>
                    {selected.credentialId && (
                      <div className="grid grid-cols-[120px_1fr] gap-2">
                        <dt className="text-gray-500">Credential ID</dt>
                        <dd>{selected.credentialId}</dd>
                      </div>
                    )}
                  </dl>

                  {!!selected.skills?.length && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-1">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.skills.map((s) => (
                          <span key={s} className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <a
                      href={selected.image}
                      download
                      className="text-center px-3 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                    >
                      Download PNG
                    </a>
                    {selected.url ? (
                      <a
                        href={selected.url}
                        target="_blank"
                        className="text-center px-3 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm inline-flex items-center justify-center gap-1"
                      >
                        Verify <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-center px-3 py-2 border border-dashed border-gray-300 dark:border-gray-700 text-sm opacity-70">
                        No verification link
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
