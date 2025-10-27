"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs
                 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
