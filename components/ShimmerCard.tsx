export function ShimmerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(75deg,transparent,black,transparent)] [background:linear-gradient(75deg,rgba(37,99,235,.08),rgba(56,189,248,.06),rgba(37,99,235,.08))] animate-[shimmer_3.6s_linear_infinite]" />
      {children}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-60%); }
          100% { transform: translateX(60%); }
        }
      `}</style>
    </div>
  );
}
