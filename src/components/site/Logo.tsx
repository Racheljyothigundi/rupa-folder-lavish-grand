import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 rounded-xl bg-gradient-deep shadow-elegant flex items-center justify-center overflow-hidden ring-1 ring-brand-cyan/30">
        <span className="font-display text-2xl font-bold tracking-tight">
          <span className="text-white">L</span>
          <span className="text-brand-cyan">G</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-cyan via-white/40 to-brand-cyan/0" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-display font-bold text-[15px] tracking-wide text-brand">LAVISH GRAND</div>
          <div className="text-[10px] tracking-[0.18em] text-muted-foreground font-medium">TRADERS PVT. LTD.</div>
        </div>
      )}
    </Link>
  );
}