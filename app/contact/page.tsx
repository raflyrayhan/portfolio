"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Copy, Check } from "lucide-react";

const WHATSAPP_E164 = "6282130840365";
const EMAIL = "raflyray00@gmail.com";

export default function ContactPage() {
  const [copied, setCopied] = useState<"email" | "wa" | null>(null);

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry — from portfolio")}&body=${encodeURIComponent("Hi Rafly, I saw your portfolio. I&apos;d love to discuss a project/collaboration. Cheers!")}`;
  const waHref = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent("Hi Rafly! I saw your portfolio — let&apos;s chat about a project.")}`;

  async function copy(text: string, key: "email" | "wa") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-white text-[#0f172a] px-6">
      {/* Subtle tech grid */}
      <svg className="absolute inset-0 -z-10 opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <motion.h1 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold mb-2">
        Let&apos;s Connect
      </motion.h1>
      <p className="text-gray-600 max-w-2xl text-center mb-8">
        Casual chat or serious build — both welcome. Ping me via email or WhatsApp. I usually reply fast during UTC+7 evenings.
      </p>

      <div className="w-full max-w-2xl grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <motion.a
          whileHover={{ y: -2 }}
          href={mailHref}
          className="group flex items-center justify-between gap-3 border border-gray-200 bg-white px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-[#2563eb]" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-600">{EMAIL}</p>
            </div>
          </div>
          <button type="button" onClick={(e) => { e.preventDefault(); copy(EMAIL, "email"); }} aria-label="Copy email" className="inline-flex items-center gap-1 text-sm text-gray-600">
            {copied === "email" ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          whileHover={{ y: -2 }}
          href={waHref}
          target="_blank"
          className="group flex items-center justify-between gap-3 border border-gray-200 bg-white px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-[#2563eb]" />
            <div>
              <p className="font-medium">WhatsApp</p>
              <p className="text-sm text-gray-600">+62 821-3084-0365</p>
            </div>
          </div>
          <button type="button" onClick={(e) => { e.preventDefault(); copy("+62 821-3084-0365", "wa"); }} aria-label="Copy WhatsApp" className="inline-flex items-center gap-1 text-sm text-gray-600">
            {copied === "wa" ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </motion.a>
      </div>

      {/* socials */}
      <div className="mt-8 flex items-center gap-4">
        <a href="https://linkedin.com/in/raflyray" target="_blank" className="inline-flex items-center gap-2 text-gray-700 hover:text-[#2563eb]"><Linkedin size={18}/> LinkedIn</a>
        <span className="text-gray-300">•</span>
        <a href="https://github.com/raflyrayhan" target="_blank" className="inline-flex items-center gap-2 text-gray-700 hover:text-[#2563eb]"><Github size={18}/> GitHub</a>
      </div>

      {/* small note */}
      <p className="mt-4 text-xs text-gray-500">Availability: weekday evenings (UTC+7) • quick calls work too</p>
    </section>
  );
}