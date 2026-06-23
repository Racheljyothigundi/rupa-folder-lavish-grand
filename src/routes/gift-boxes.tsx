import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { giftBoxes } from "@/data/catalog";
import { inr, useAuth, useCart } from "@/lib/store";
import { BadgeCheck, Gift, MessageSquare, Building2 } from "lucide-react";
import giftCollection from "@/assets/giftboxes-collection.png.asset.json";
import giftHero from "@/assets/giftbox-hero.jpg";

export const Route = createFileRoute("/gift-boxes")({
  head: () => ({ meta: [
    { title: "Premium Gift Boxes — Lavish Grand Traders" },
    { name: "description", content: "Ten signature gift collections for every occasion — Diwali, weddings, corporate gifting. Custom messages and branding available." },
    { property: "og:title", content: "Premium Gift Boxes — Lavish Grand Traders" },
    { property: "og:description", content: "Luxury dry fruit gift hampers, custom branded for corporate and personal gifting." },
    { property: "og:image", content: giftHero },
  ] }),
  component: GiftBoxes,
});

function GiftBoxes() {
  const cart = useCart(); const { requireAuth } = useAuth();
  return (
    <SiteLayout>
      <section className="relative bg-gradient-deep text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.78_0.14_210_/_0.3),transparent_60%)]" />
        <div className="max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Premium Gifting</div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Gift <span className="text-gradient-gold">extraordinary</span></h1>
            <p className="mt-4 text-white/70 max-w-md">Ten signature collections — from intimate Happiness Box to the regal Royal Delight. Custom messages, branding, and bulk gifting available.</p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-brand-deep"><a href="#collections">Browse Collections</a></Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10"><Link to="/corporate">Corporate Quote</Link></Button>
            </div>
          </div>
          <img src={giftHero} alt="Lavish Grand premium gift box" loading="lazy" className="rounded-3xl shadow-elegant ring-1 ring-white/10" />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto container-px grid md:grid-cols-3 gap-5">
          {[
            { icon: MessageSquare, t: "Custom Messages", s: "Add a personal note in elegant calligraphy." },
            { icon: Building2,     t: "Corporate Branding", s: "Embossed logos, brand colours, bulk MOQ." },
            { icon: Gift,          t: "Bulk Gifting", s: "Discounted pricing on 50+ orders." },
          ].map((b) => (
            <div key={b.t} className="bg-white border border-border rounded-2xl p-6 shadow-soft flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center"><b.icon className="w-5 h-5" /></div>
              <div><div className="font-display text-lg font-bold text-brand-deep">{b.t}</div><div className="text-sm text-muted-foreground">{b.s}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="py-12 bg-gradient-cream">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="The Collection" title="Ten Signature Gift Boxes" subtitle="Each box is hand-assembled in our Hyderabad facility, with hygienically packed compartments." />
          <div className="rounded-3xl overflow-hidden shadow-elegant border border-border bg-white mb-12">
            <img src={giftCollection.url} alt="Lavish Grand gift box collection" loading="lazy" className="w-full h-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {giftBoxes.map((g) => (
              <div key={g.id} className="bg-white rounded-2xl border border-border p-5 hover:border-brand/30 hover:shadow-elegant transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-display font-bold text-sm">{g.number}</div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-secondary text-brand-deep font-semibold">Bestseller</div>
                </div>
                <div className="font-display text-xl font-bold text-brand-deep mt-3">{g.name}</div>
                <div className="text-sm text-muted-foreground">{g.tagline}</div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="font-display text-2xl font-bold text-brand">{inr(g.price)}</span>
                  <span className="text-xs text-muted-foreground line-through">{inr(g.mrp)}</span>
                </div>
                <ul className="mt-3 space-y-1">
                  {g.badges.map((b) => <li key={b} className="text-xs text-foreground/70 flex items-center gap-1.5"><BadgeCheck className="w-3 h-3 text-brand-cyan" /> {b}</li>)}
                </ul>
                <Button className="w-full mt-4 bg-brand hover:bg-brand-deep text-brand-foreground" onClick={() => { if (!requireAuth()) return; cart.add({ id: g.id, name: g.name + " Gift Box", image: giftHero, qty: "Gift Box", price: g.price }); }}>Add Gift Box</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}