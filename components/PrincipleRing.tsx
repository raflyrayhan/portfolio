// components/PrincipleRing.tsx
export function PrincipleRing({ label }: { label: string }) {
  return (
    <div className="relative group transition-all duration-500 hover:-translate-y-1">
      {/* glow ring */}
      <div className="absolute -inset-0.5 rounded-2xl bg-[conic-gradient(var(--tw-gradient-stops))] 
                     from-blue-600 via-cyan-400 to-blue-600 opacity-70 blur-sm 
                     transition duration-700 group-hover:opacity-100" />
      {/* card */}
      <div className="relative rounded-2xl bg-white/80 backdrop-blur 
                     supports-[backdrop-filter]:bg-white/60 ring-1 ring-slate-200 
                     px-6 py-8 sm:py-9 text-center shadow-sm">
        {/* REMOVE SHORT CODE, langsung teks aja */}
        <div className="text-base sm:text-lg font-semibold text-slate-900 select-none">
          {label}
        </div>
        <div className="mt-4 h-1 w-10 mx-auto rounded-full bg-gradient-to-r 
                        from-blue-600 to-cyan-400 group-hover:w-16 transition-all" />
      </div>
    </div>
  );
}
