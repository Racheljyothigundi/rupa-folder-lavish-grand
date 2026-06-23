import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Award, Leaf, ShieldCheck, Users } from "lucide-react";
import hero from "@/assets/hero-dryfruits.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Lavish Grand Traders Pvt. Ltd." }, { name: "description", content: "Lavish Grand Traders is a Hyderabad-based premium dry fruits, spices and corporate gifting company." }] }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-16">
        <div className="max-w-4xl mx-auto container-px text-center">
          <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Our Story</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Curated with care,<br /><span className="text-gradient-gold">delivered with pride</span></h1>
          <p className="text-white/70 mt-5 max-w-2xl mx-auto">Lavish Grand Traders Pvt. Ltd. is a Hyderabad-based company sourcing and curating premium dry fruits, seeds, spices and grocery essentials for families and corporates across India.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto container-px grid lg:grid-cols-2 gap-10 items-center">
          <img src={hero} alt="" loading="lazy" className="rounded-3xl shadow-elegant" />
          <div>
            <SectionHeader eyebrow="What we stand for" title="Quality is non-negotiable" align="left" />
            <p className="text-muted-foreground leading-relaxed">From single-origin Kashmiri walnuts to small-batch Ceylon cinnamon, every product on our shelf is hand-sorted, lab-tested and hygienically packed at our Cherlapally facility. We believe great ingredients shouldn't be a luxury — they should be your everyday.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { i: Leaf, t: "100% Natural", s: "Zero preservatives, zero additives." },
                { i: ShieldCheck, t: "Hygienic Packing", s: "Food-grade facility, sealed packs." },
                { i: Award, t: "Best Quality Guaranteed", s: "ISO standards, lab-tested batches." },
                { i: Users, t: "12,000+ Happy Families", s: "Trusted across 100+ cities." },
              ].map((v) => (
                <div key={v.t} className="bg-white border border-border rounded-xl p-4 flex gap-3 shadow-soft">
                  <v.i className="w-6 h-6 text-brand shrink-0" />
                  <div><div className="font-semibold text-brand-deep text-sm">{v.t}</div><div className="text-xs text-muted-foreground">{v.s}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-cream">
        <div className="max-w-4xl mx-auto container-px text-center">
          <SectionHeader title="Company Details" />
          <div className="bg-white border border-border rounded-2xl p-8 shadow-soft grid sm:grid-cols-2 gap-6 text-left">
            <div><div className="text-xs text-muted-foreground uppercase tracking-wider">Company</div><div className="font-semibold text-brand-deep">Lavish Grand Traders Pvt. Ltd.</div></div>
            <div><div className="text-xs text-muted-foreground uppercase tracking-wider">CIN</div><div className="font-semibold text-brand-deep">U46909TS2026PTC214908</div></div>
            <div><div className="text-xs text-muted-foreground uppercase tracking-wider">GST</div><div className="font-semibold text-brand-deep">36AAGCL8507N1ZZ</div></div>
            <div><div className="text-xs text-muted-foreground uppercase tracking-wider">Phone</div><div className="font-semibold text-brand-deep">+91 98489 56829</div></div>
            <div className="sm:col-span-2"><div className="text-xs text-muted-foreground uppercase tracking-wider">Registered Address</div><div className="font-semibold text-brand-deep">Plot No 7/A, Phase-V, IDA Cherlapally, EC Nagar, Navodaya Colony, Hyderabad — 500051</div></div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}