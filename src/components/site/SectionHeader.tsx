export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: { eyebrow?: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto mb-10" : "max-w-2xl mb-10"}>
      {eyebrow && (
        <div className={"inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-brand " + (align === "center" ? "justify-center" : "")}>
          <span className="w-8 h-px bg-gradient-gold" /> {eyebrow} <span className="w-8 h-px bg-gradient-gold" />
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-deep mt-3">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}