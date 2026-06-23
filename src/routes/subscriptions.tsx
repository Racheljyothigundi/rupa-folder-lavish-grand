import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/data/catalog";
import { inr, useAuth, useCart } from "@/lib/store";
import { BadgeCheck, Repeat, Truck, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/subscriptions")({
  head: () => ({ meta: [{ title: "Monthly Dry Fruit Subscriptions — Lavish Grand Traders" }, { name: "description", content: "Subscribe and save on monthly dry fruit packs — Family, Fitness, Kids and Executive plans." }] }),
  component: Subscriptions,
});

function Subscriptions() {
  const cart = useCart(); const { requireAuth } = useAuth();
  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-16">
        <div className="max-w-7xl mx-auto container-px text-center">
          <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Subscribe & Save</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">Health delivered, monthly</h1>
          <p className="text-white/70 max-w-xl mx-auto mt-3">Pick a plan, set your delivery date, and we'll keep your kitchen stocked with the freshest dry fruits — automatically.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto container-px grid sm:grid-cols-3 gap-5 text-center mb-14">
          {[{ i: Repeat, t: "Flexible", s: "Skip, pause or cancel anytime" }, { i: Truck, t: "Free delivery", s: "On every subscription order" }, { i: ShieldCheck, t: "5% off", s: "Subscriber discount on every box" }].map((b) => (
            <div key={b.t} className="bg-white rounded-2xl p-6 border border-border shadow-soft">
              <b.i className="w-7 h-7 mx-auto text-brand" />
              <div className="font-display text-lg font-bold text-brand-deep mt-2">{b.t}</div>
              <div className="text-sm text-muted-foreground">{b.s}</div>
            </div>
          ))}
        </div>

        <SectionHeader title="Choose Your Plan" />
        <div className="max-w-7xl mx-auto container-px grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {subscriptionPlans.map((s) => (
            <div key={s.id} className="relative bg-white border border-border rounded-2xl p-6 hover:border-brand/40 hover:shadow-elegant transition-all">
              {s.badge && <div className="absolute top-4 right-4 bg-gradient-gold text-brand-deep text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{s.badge}</div>}
              <div className="font-display text-2xl font-bold text-brand-deep">{s.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.blurb}</div>
              <div className="my-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-brand">{inr(s.monthly)}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                {s.includes.map((i) => <li key={i} className="flex gap-2"><BadgeCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" /> {i}</li>)}
              </ul>
              <Button className="w-full mt-6 bg-gradient-hero text-white shadow-elegant" onClick={() => { if (!requireAuth()) return; cart.add({ id: s.id, name: s.name + " (Monthly)", image: "", qty: "Monthly Pack", price: s.monthly }); }}>Subscribe</Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-muted-foreground text-sm">Custom plan needs? <Link to="/contact" className="text-brand font-semibold hover:underline">Talk to our nutrition team →</Link></div>
      </section>
    </SiteLayout>
  );
}