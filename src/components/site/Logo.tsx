import { Link } from "@tanstack/react-router";
import logoIcon from "@/assets/lg-brand-icon.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="Lavish Grand Traders home">
      <img
        src={logoIcon}
        alt=""
        className="h-14 w-20 shrink-0 object-contain"
        loading="eager"
      />
      {!compact && (
        <div className="leading-tight">
          <div className="font-display font-bold text-[17px] md:text-[18px] tracking-wide text-brand">
            LAVISH GRAND
          </div>
          <div className="text-[10px] md:text-[11px] tracking-[0.28em] text-muted-foreground font-semibold">
            TRADERS PVT. LTD.
          </div>
        </div>
      )}
    </Link>
  );
}
