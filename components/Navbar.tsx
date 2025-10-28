"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const pathname = usePathname();

  const taglines = [
    "raflyrm.site",
    "↑ ↑ ↓ ↓ ← → ← → B A",
    "Code. Create. Conquer.",
    "← Click me 7",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/certificates", label: "Certificates" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60",
        scrolled ? "shadow-[0_2px_12px_rgba(2,6,23,0.06)]" : "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo + Dynamic tagline */}
        <Link
          href="/"
          aria-label="Go to home"
          className="inline-flex items-center gap-3"
          onClick={() => {
            const ev = new CustomEvent("rafly:logo-tap");
            window.dispatchEvent(ev);
          }}
>
          <Image
            src="/head.png"
            alt="Rafly — Home"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-md object-cover ring-1 ring-slate-200"
          />

          <div className="relative overflow-hidden h-6 sm:h-7 min-w-[200px] sm:min-w-[240px] md:min-w-[260px]">
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-transparent to-transparent pointer-events-none z-10" />
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-base sm:text-lg font-semibold text-slate-900 whitespace-nowrap"
              >
                {taglines[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={[
                "relative text-slate-700 hover:text-blue-600 transition-colors",
                isActive(it.href) ? "text-blue-700" : "",
              ].join(" ")}
            >
              {it.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-xl bg-blue-600 px-3 py-1.5 text-white hover:brightness-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm"
          >
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm font-medium text-slate-700">
              {navItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={[
                    "py-1",
                    isActive(it.href) ? "text-blue-700" : "hover:text-blue-600",
                  ].join(" ")}
                >
                  {it.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-1 rounded-lg bg-blue-600 px-3 py-2 text-white w-max hover:brightness-95 transition"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
