import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { mixIngredients } from "@/data/catalog";
import { inr, useAuth, useCart } from "@/lib/store";
import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";

export const Route = createFileRoute("/build-your-mix")({
  head: () => ({ meta: [
    { title: "Build Your Own Mix — Lavish Grand Traders" },
    { name: "description", content: "Create your perfect dry-fruit blend with live pricing. Choose ingredients and portions for a custom healthy mix." },
  ] }),
  component: BuildMix,
});

function BuildMix() {
  const cart = useCart(); const { requireAuth } = useAuth();
  const [grams, setGrams] = useState<Record<string, number>>({});
  const totals = useMemo(() => {
    const totalGrams = Object.values(grams).reduce((s, g) => s + g, 0);
    const totalPrice = mixIngredients.reduce((s, ing) => s + ((grams[ing.id] || 0) / 100) * ing.pricePer100g, 0);
    return { grams: totalGrams, price: Math.round(totalPrice) };
  }, [grams]);

  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-14">
        <div className="max-w-7xl mx-auto container-px">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan"><Sparkles className="w-3.5 h-3.5" /> Custom Mix</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">Build Your Own Mix</h1>
          <p className="text-white/70 max-w-xl mt-3">Pick your favourites, choose portions, and we'll pack a custom jar — fresh to order.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto container-px grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {mixIngredients.map((ing) => {
              const g = grams[ing.id] || 0;
              return (
                <div key={ing.id} className="bg-white rounded-2xl border border-border p-5 shadow-soft">
                  <div className="flex items-center gap-4">
                    <img src={ing.image} alt={ing.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="font-display font-bold text-brand-deep">{ing.name}</div>
                      <div className="text-xs text-muted-foreground">{inr(ing.pricePer100g)} / 100g</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-full bg-secondary hover:bg-brand hover:text-brand-foreground" onClick={() => setGrams({ ...grams, [ing.id]: Math.max(0, g - 50) })}><Minus className="w-3.5 h-3.5 mx-auto" /></button>
                      <span className="font-display font-bold w-14 text-center">{g}g</span>
                      <button className="w-8 h-8 rounded-full bg-secondary hover:bg-brand hover:text-brand-foreground" onClick={() => setGrams({ ...grams, [ing.id]: g + 50 })}><Plus className="w-3.5 h-3.5 mx-auto" /></button>
                    </div>
                  </div>
                  <Slider value={[g]} max={1000} step={50} onValueChange={(v) => setGrams({ ...grams, [ing.id]: v[0] })} className="mt-4" />
                  <div className="text-xs text-right mt-2 text-muted-foreground">Subtotal: <b className="text-brand">{inr(Math.round((g / 100) * ing.pricePer100g))}</b></div>
                </div>
              );
            })}
          </div>
          <aside className="lg:sticky lg:top-32 h-fit bg-gradient-hero text-white rounded-2xl p-6 shadow-elegant">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Your Custom Mix</div>
            <div className="font-display text-3xl font-bold mt-2">{totals.grams}g</div>
            <div className="text-white/70 text-sm">Total weight</div>
            <div className="mt-6 space-y-2 text-sm">
              {mixIngredients.filter((i) => (grams[i.id] || 0) > 0).map((i) => (
                <div key={i.id} className="flex justify-between text-white/80"><span>{i.name}</span><span>{grams[i.id]}g</span></div>
              ))}
              {totals.grams === 0 && <div className="text-white/60 italic">Pick ingredients to start →</div>}
            </div>
            <div className="border-t border-white/20 mt-6 pt-4 flex items-baseline justify-between">
              <span className="text-white/70">Total</span>
              <span className="font-display text-3xl font-bold text-gold-soft">{inr(totals.price)}</span>
            </div>
            <Button disabled={totals.grams === 0} className="w-full mt-5 bg-gradient-gold text-brand-deep hover:opacity-90 h-12 disabled:opacity-40 gap-2" onClick={() => { if (!requireAuth()) return; cart.add({ id: "mix-" + Date.now(), name: `Custom Mix (${totals.grams}g)`, image: mixIngredients[0].image, qty: `${totals.grams}g`, price: totals.price }); }}>
              <ShoppingBag className="w-4 h-4" /> Add Mix to Cart
            </Button>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}