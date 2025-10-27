"use client";
import Image from "next/image";
import Link from "next/link";
import { Tilt3D } from "@/components/Tilt3D";
import { ShimmerCard } from "@/components/ShimmerCard";

const GENERAL_PROJECTS = [
  { title: "Engineering Platforms", desc: "EDMS, Piping Calc, CFD Calcs, & more.", href: "/projects#portal-imx", img: "/imxportal.png" },
  { title: "Instrumentation Tooling", desc: "Automation, calculation, & docs for I&C engineers.", href: "/projects#instrument-studio", img: "/studioinst.png" },
  { title: "Web & Cloud Systems", desc: "UI/UX, frontend, backend, & infra.", href: "/projects#websites", img: "/website.png" },
];

export function ProjectCards() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
      {GENERAL_PROJECTS.map((p) => (
        <Tilt3D key={p.title} max={8}>
          <Link href={p.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 rounded-2xl">
            <ShimmerCard className="bg-white">
              <div className="relative w-full aspect-[16/10]">
                <Image src={p.img} alt={p.title} fill className="object-contain p-3" sizes="(min-width:1024px) 30vw, 100vw" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-base sm:text-lg text-blue-700">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{p.desc}</p>
              </div>
            </ShimmerCard>
          </Link>
        </Tilt3D>
      ))}
    </div>
  );
}
