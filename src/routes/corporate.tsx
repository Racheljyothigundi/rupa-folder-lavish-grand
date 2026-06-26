import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BadgeCheck, Building2, MessageSquare, Package, Truck, Users } from "lucide-react";
import { toast } from "sonner";
import giftHero from "@/assets/giftbox-hero.jpg";

export const Route = createFileRoute("/corporate")({
  head: () => ({ meta: [{ title: "Corporate Gifting & Bulk Orders — Lavish Grand Traders" }, { name: "description", content: "Custom-branded dry fruit gift boxes for clients and employees. Bulk pricing, MOQ from 50, pan-India delivery." }] }),
  component: Corporate,
});

function Corporate() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="relative bg-gradient-deep text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.78_0.14_210_/_0.25),transparent_60%)]" />
        <div className="max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Corporate Gifting</div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Gifts <span className="text-gradient-gold">your brand deserves</span></h1>
            <p className="text-white/70 max-w-md mt-4">From Diwali hampers to onboarding gifts — we curate, brand and deliver premium dry-fruit boxes at scale.</p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-brand-deep shadow-elegant hover:brightness-105"><a href="#quote">Request a Quote</a></Button>
              <Button asChild size="lg" className="bg-gradient-gold text-brand-deep shadow-elegant hover:brightness-105"><a href="tel:+919848956829">Call +91 98489 56829</a></Button>
            </div>
          </div>
          <img src={giftHero} alt="Corporate gift boxes" loading="lazy" className="rounded-3xl shadow-elegant ring-1 ring-white/10" />
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto container-px grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Building2,     t: "Brand-first packaging", s: "Embossed logos, branded sleeves, custom inserts." },
            { i: Package,       t: "MOQ from 50",           s: "Discounted slabs at 100 / 250 / 500+." },
            { i: Truck,         t: "Pan-India delivery",    s: "Scheduled drops to multiple offices." },
            { i: MessageSquare, t: "Dedicated manager",     s: "One contact, end-to-end execution." },
          ].map((b) => (
            <div key={b.t} className="bg-white border border-border rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center"><b.i className="w-5 h-5" /></div>
              <div className="font-display text-lg font-bold text-brand-deep mt-3">{b.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{b.s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 bg-gradient-cream">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Volume pricing" title="Bulk pricing slabs" subtitle="Indicative pricing — final quote includes branding, samples and freight." />
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-brand-deep">
                <tr>{["Quantity (boxes)", "Indicative discount", "Free shipping", "Branding options"].map((h) => <th key={h} className="text-left p-4 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody className="[&_tr]:border-t [&_tr]:border-border">
                <tr><td className="p-4">50 – 99</td><td className="p-4 text-brand font-bold">10%</td><td className="p-4">✓</td><td className="p-4">Sticker branding</td></tr>
                <tr><td className="p-4">100 – 249</td><td className="p-4 text-brand font-bold">15%</td><td className="p-4">✓</td><td className="p-4">Sleeve + sticker</td></tr>
                <tr><td className="p-4">250 – 499</td><td className="p-4 text-brand font-bold">20%</td><td className="p-4">✓</td><td className="p-4">Custom sleeve + insert</td></tr>
                <tr><td className="p-4">500+</td><td className="p-4 text-brand font-bold">25%+</td><td className="p-4">✓</td><td className="p-4">Fully custom box</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="quote" className="py-14">
        <div className="max-w-3xl mx-auto container-px">
          <SectionHeader eyebrow="Get in touch" title="Request a Quote" />
          {sent ? (
            <div className="bg-white border border-border rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-hero text-white mx-auto flex items-center justify-center"><BadgeCheck className="w-7 h-7" /></div>
              <div className="font-display text-2xl font-bold text-brand-deep mt-4">Thank you!</div>
              <div className="text-muted-foreground mt-2">Our corporate team will reach out within 24 hours.</div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Quote request received"); }} className="bg-white border border-border rounded-2xl p-8 grid md:grid-cols-2 gap-4 shadow-soft">
              <div className="space-y-1.5"><Label>Company name *</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Contact person *</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Email *</Label><Input type="email" required /></div>
              <div className="space-y-1.5"><Label>Phone *</Label><Input required /></div>
              <div className="space-y-1.5"><Label>Estimated quantity *</Label><Input required placeholder="e.g. 250 boxes" /></div>
              <div className="space-y-1.5"><Label>Occasion</Label><Input placeholder="Diwali / Onboarding / Annual gifting" /></div>
              <div className="space-y-1.5 md:col-span-2"><Label>Notes</Label><Textarea rows={4} placeholder="Tell us about your branding needs, timeline, or budget…" /></div>
              <Button type="submit" className="md:col-span-2 bg-gradient-hero text-white h-12 shadow-elegant">Submit Request</Button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
