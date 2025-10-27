"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  Search,
  Filter,
  Calendar,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";

// ------------------------------ Types ------------------------------
type Cert = {
  title: string;
  image: string;
  year: number;
  issuer: string;
  url?: string;
  skills?: string[];
  credentialId?: string;
};

// ------------------------------ Data ------------------------------
const certs: Cert[] = [
  {
    title: "Google Project Management",
    image: "/images/certificates/google-pm.jpg",
    year: 2025,
    issuer: "Google",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    skills: ["Agile", "Scrum", "Risk", "Stakeholder"],
  },
  {
    title: "IBM Microservices with Istio & Kubernetes",
    image: "/images/certificates/ibm2.jpg",
    year: 2022,
    issuer: "IBM",
    url: "https://www.coursera.org/learn/istio-kubernetes-microservices",
    skills: ["Kubernetes", "Istio", "Microservices", "Cloud"],
  },
  {
    title: "IBM Containers, Kubernetes and OpenShift V2",
    image: "/images/certificates/ibm1.jpg",
    year: 2022,
    issuer: "IBM",
    url: "https://www.coursera.org/learn/istio-kubernetes-microservices",
    skills: ["Kubernetes", "Istio", "Microservices", "Cloud"],
  },
  {
    title: "Electrical Engineering in Theory",
    image: "/images/certificates/alison1.png",
    year: 2024,
    issuer: "Alison",
    url: "https://alison.com/",
    skills: ["Circuits", "Signals", "Power"],
  },
  {
    title: "P&ID Drafting and Design",
    image: "/images/certificates/P&ID.png",
    year: 2024,
    issuer: "Alison",
    url: "https://alison.com/",
    skills: ["Circuits", "Signals", "Power"],
  },
  
];

// ------------------------------ Helpers ------------------------------
const uniq = (arr: string[]) => Array.from(new Set(arr));
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ------------------------------ Component ------------------------------
export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState<string | "all">("all");
  const minYear = useMemo(() => Math.min(...certs.map((c) => c.year)), []);
  const maxYear = useMemo(() => Math.max(...certs.map((c) => c.year)), []);
  const [yearFrom, setYearFrom] = useState<number>(minYear);
  const [yearTo, setYearTo] = useState<number>(maxYear);
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc" | "title">("year-desc");
  const [selected, setSelected] = useState<Cert | null>(null);
  const [zoom, setZoom] = useState(1);

  const searchRef = useRef<HTMLInputElement | null>(null);

  // keyboard: '/' focus search, Esc close modal
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
      .filter((c) =>
        q ? `${c.title} ${c.issuer} ${c.skills?.join(" ")}`.toLowerCase().includes(q) : true
      );

    const sorted =
      sortBy === "year-asc"
        ? [...data].sort((a, b) => a.year - b.year)
        : sortBy === "title"
        ? [...data].sort((a, b) => a.title.localeCompare(b.title))
        : [...data].sort((a, b) => b.year - a.year);

    return sorted;
  }, [issuer, yearFrom, yearTo, query, sortBy]);

  // timeline buckets
  const years = useMemo(
    () => uniq(certs.map((c) => String(c.year))).map(Number).sort((a, b) => b - a),
    []
  );

  // keep year range valid
  useEffect(() => {
    if (yearFrom > yearTo) setYearFrom(yearTo);
    if (yearTo < yearFrom) setYearTo(yearFrom);
  }, [yearFrom, yearTo]);

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 lg:px-20 text-[#0f172a]">
      {/* Header */}
      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d4ed8]">Certificates</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl text-sm">
          Lifelong learning, but make it useful. These are the certs I&apos;ve earned and actually apply to real work.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_auto_auto] items-center">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, issuer, skills…"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search certificates"
          />
        </div>

        {/* Issuer */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="opacity-70" />
          <select
            value={issuer}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setIssuer((e.target.value || "all") as string | "all")
            }
            className="px-3 py-2 border border-gray-300 bg-white"
            aria-label="Filter by issuer"
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
              inputMode="numeric"
              value={yearFrom}
              onChange={(e) => setYearFrom(clamp(Number(e.target.value || minYear), minYear, maxYear))}
              className="w-24 px-2 py-2 border border-gray-300 bg-white"
              aria-label="Year from"
            />
            <span className="opacity-60">to</span>
            <input
              type="number"
              inputMode="numeric"
              value={yearTo}
              onChange={(e) => setYearTo(clamp(Number(e.target.value || maxYear), minYear, maxYear))}
              className="w-24 px-2 py-2 border border-gray-300 bg-white"
              aria-label="Year to"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="opacity-70" />
          <select
            value={sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortBy(e.target.value as "year-desc" | "year-asc" | "title")
            }
            className="px-3 py-2 border border-gray-300 bg-white"
            aria-label="Sort certificates"
          >
            <option value="year-desc">Sort: Newest</option>
            <option value="year-asc">Sort: Oldest</option>
            <option value="title">Sort: Title</option>
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-10">
        <div className="relative pl-8 border-l-2 border-dashed border-gray-200">
          {years.map((y) => {
            const bucket = filtered.filter((c) => c.year === y);
            return (
              <div key={y} className="mb-10">
                <div className="-ml-[9px] w-4 h-4 rounded-full bg-[#2563eb]" />
                <h3 className="mt-2 text-xl font-semibold">{y}</h3>

                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {bucket.length === 0 ? (
                    <p className="text-sm text-gray-500">No certificates matching filters for {y}.</p>
                  ) : (
                    bucket.map((c) => (
                      <motion.button
                        key={`${c.title}-${c.year}`}
                        onClick={() => {
                          setSelected(c);
                          setZoom(1);
                        }}
                        whileHover={{ y: -4 }}
                        className="text-left group border border-gray-200 bg-white p-3"
                      >
                        <div className="relative overflow-hidden aspect-[4/3] bg-white">
                          <Image
                            src={c.image}
                            alt={c.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          {c.url && (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/95 text-gray-900 border border-gray-200 hover:bg-white"
                            >
                              Verify <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium">{c.title}</p>
                          <p className="text-xs text-gray-500">
                            {c.issuer} • {c.year}
                          </p>
                          {!!c.skills?.length && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {c.skills.slice(0, 4).map((s) => (
                                <span
                                  key={`${c.title}-${s}`}
                                  className="text-[10px] px-2 py-0.5 border border-gray-300"
                                >
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
            );
          })}
        </div>
      </div>

      {/* Modal */}
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
              className="relative w-full max-w-5xl bg-white border border-gray-200"
              role="dialog"
              aria-modal
              aria-label="Certificate details"
            >
              <button
                className="absolute top-3 right-3 p-2 text-gray-600 hover:text-black"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="p-5 border-b border-gray-200 flex flex-wrap items-center gap-3">
                <div>
                  <h2 className="text-xl font-semibold leading-tight">{selected.title}</h2>
                  <p className="text-sm text-gray-500">
                    {selected.issuer} • {selected.year}
                  </p>
                </div>
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto inline-flex items-center gap-2 text-[#2563eb] hover:underline"
                  >
                    Verify credential <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <div className="p-4 grid md:grid-cols-[1fr_300px] gap-4">
                {/* Preview */}
                <div className="relative bg-gray-50 border border-gray-200 flex items-center justify-center min-h-[380px]">
                  <div className="relative w-full h-full max-h-[70vh]">
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      className="object-contain transition-transform"
                      style={{ transform: `scale(${zoom})` }}
                      sizes="100vw"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                      className="px-3 py-2 bg-white/95 border border-gray-200 text-sm"
                      aria-label="Zoom out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <button
                      onClick={() => setZoom((z) => Math.min(2.4, +(z + 0.1).toFixed(2)))}
                      className="px-3 py-2 bg-white/95 border border-gray-200 text-sm"
                      aria-label="Zoom in"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>
                </div>

                {/* Meta */}
                <div className="border border-gray-200 p-4">
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
                          <span key={`${selected.title}-${s}`} className="text-xs px-2 py-1 border border-gray-300">
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
                      className="text-center px-3 py-2 border border-gray-300 hover:bg-gray-50 text-sm"
                    >
                      Download PNG
                    </a>
                    {selected.url ? (
                      <a
                        href={selected.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-center px-3 py-2 border border-gray-300 hover:bg-gray-50 text-sm inline-flex items-center justify-center gap-1"
                      >
                        Verify <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-center px-3 py-2 border border-dashed border-gray-300 text-sm opacity-70">
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
