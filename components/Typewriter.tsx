"use client";
import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 34) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let raf: number;
    let last = performance.now();
    const step = (t: number) => {
      if (t - last >= speed) {
        i = Math.min(i + 1, text.length);
        setOut(text.slice(0, i));
        last = t;
      }
      if (i < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, speed]);
  return out;
}

export function HeroText({ text }: { text: string }) {
  const parts = text.split("</code>");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((chunk, i) => (
        <span key={i}>
          {chunk}
          {i < parts.length - 1 && <span className="text-blue-900">{"</code>"}</span>}
        </span>
      ))}
    </>
  );
}
