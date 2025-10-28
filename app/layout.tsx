"use client";
import "@/styles/globals.css";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EasterEggs } from "@/components/EasterEgg";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased selection:bg-blue-200/60">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <EasterEggs />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {ready && (
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
