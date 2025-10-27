"use client";
import { useMemo } from "react";

export function NoiseOverlay() {
  const data = useMemo(
    () =>
      `url("data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
           <filter id='n'>
             <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/>
             <feColorMatrix type='saturate' values='0'/>
             <feComponentTransfer><feFuncA type='table' tableValues='0 0 0 .035 .07 .035 0 0 0'/></feComponentTransfer>
           </filter>
           <rect width='100%' height='100%' filter='url(%23n)'/>
         </svg>`
      )}")`,
    []
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.12] mix-blend-multiply"
      style={{ backgroundImage: data, backgroundSize: "120px 120px" }}
    />
  );
}
