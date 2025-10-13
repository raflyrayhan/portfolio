"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search, ChevronRight } from "lucide-react";

const NAV_ITEMS: { name: string; href: string; desc?: string }[] = [
  { name: "Home", href: "/", desc: "Landing page" },
  { name: "About", href: "/about", desc: "Who I am" },
  { name: "Projects", href: "/projects", desc: "What I build" },
  { name: "Certificates", href: "/certificates", desc: "Proof of work" },
  { name: "Contact", href: "/contact", desc: "Let’s talk" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">(() => (typeof window !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // palette shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setPaletteOpen((s) => !s);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_ITEMS;
    return NAV_ITEMS.filter((i) => `${i.name} ${i.desc}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] ${
          scrolled
            ? "bg-white/70 dark:bg-black/25 border-b border-black/5 dark:border-white/10"
            : "bg-white/40 dark:bg-black/10"
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-5">
          <div className="h-14 md:h-16 flex items-center justify-between">
            {/* Brand */}
            <Link href="/" className="font-semibold tracking-tight text-lg md:text-xl">
              .dev
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`px-1.5 py-1 transition-colors ${
                        active ? "text-[#2563eb]" : "text-black dark:text-black hover:text-[#2563eb]"
                      }`}
                    >
                      {item.name}
                    </Link>
                    <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#2563eb] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Search (⌘K)"
                onClick={() => setPaletteOpen(true)}
                className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-1.5 border border-gray-700 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <Search size={16} />
                <span className="text-gray-600 dark:text-gray-800">Search</span>
                <kbd className="ml-1 text-[10px] opacity-60">⌘K</kbd>
              </button>


              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-gray-200 dark:border-white/10"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
       
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-[84%] max-w-sm bg-white/90 dark:bg-gray-950/80 backdrop-blur-xl border-l border-gray-200 dark:border-white/10 shadow-2xl"
            aria-label="Mobile menu"
          >
            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-white/10">
              <span className="font-semibold">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="w-9 h-9 inline-flex items-center justify-center">
                <X />
              </button>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <Search size={16} className="opacity-70" />
                <input
                  placeholder="Search pages…"
                  className="flex-1 px-2 py-2 border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/30"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <ul className="space-y-1">
                {filtered.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 border border-transparent hover:border-gray-200 dark:hover:border-white/10 ${
                        pathname === item.href ? "text-[#2563eb]" : ""
                      }`}
                    >
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <ChevronRight className="opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="mx-auto mt-24 w-[92%] max-w-xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl"
              role="dialog"
              aria-modal
              aria-label="Command palette"
            >
              <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 px-3 py-2">
                <Search size={16} className="opacity-70" />
                <input
                  autoFocus
                  placeholder="Type to search (e.g. Projects)"
                  className="flex-1 bg-transparent py-2 outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <kbd className="text-[10px] opacity-60">Esc</kbd>
              </div>
              <ul className="max-h-80 overflow-auto">
                {filtered.length === 0 && (
                  <li className="px-4 py-4 text-sm text-gray-500">No results</li>
                )}
                {filtered.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setPaletteOpen(false)}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50/80 dark:hover:bg-white/5"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <ChevronRight className="opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}