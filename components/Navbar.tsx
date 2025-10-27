"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md
                 supports-[backdrop-filter]:bg-white/60 border-b border-slate-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
       <Link
  href="/"
  aria-label="Go to home"
  className="inline-flex items-center"
>
  <Image
    src="/head.png"
    alt="Rafly — Home"
    width={32}
    height={32}
    priority
    className="h-14 w-14 rounded-md object-cover"
  />
</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/projects" className="hover:text-blue-600 transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/certificates" className="hover:text-blue-600 transition-colors">
            Certificates
          </Link>
          <Link
            href="/contact"
            className="rounded-xl bg-blue-600 px-3 py-1.5 text-white hover:brightness-95 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded-lg border border-slate-300 px-2 py-1 text-sm text-slate-700"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm font-medium text-slate-700">
            <Link href="/projects" className="hover:text-blue-600 transition-colors">
              Projects
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/certificates" className="hover:text-blue-600 transition-colors">
              Certificates
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-blue-600 px-3 py-2 text-white w-max hover:brightness-95 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
