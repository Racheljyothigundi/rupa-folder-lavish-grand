import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { categories, products, giftBoxes, subscriptionPlans, festivalCollections, testimonials } from "@/data/catalog";
import { inr } from "@/lib/store";
import { ArrowRight, ShieldCheck, Leaf, Truck, Lock, Headphones, Star, Sparkles, Package, BadgeCheck } from "lucide-react";
import hero from "@/assets/hero-dryfruits.jpg";
import giftboxHero from "@/assets/giftbox-hero.jpg";
import giftBoxesCollection from "@/assets/giftboxes-collection.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lavish Grand Traders — Premium Dry Fruits, Spices & Corporate Gifting" },
      { name: "description", content: "Shop hand-sorted almonds, cashews, pistachios, walnuts and luxury gift hampers. Fresh, natural, hygienically packed across India." },
      { property: "og:title", content: "Lavish Grand Traders — Premium Dry Fruits & Gifting" },
      { property: "og:description", content: "Premium dry fruits, spices and corporate gifting. Hygienically packed. Free delivery over ₹999." },
    ],
  }),
  component: Index,
});

const trust = [
  { icon: ShieldCheck, label: "100%", sub: "Premium Quality" },
  { icon: Leaf,        label: "100%", sub: "Natural & Fresh" },
  { icon: Truck,       label: "Fast & Safe", sub: "Delivery" },
  { icon: Lock,        label: "Secure", sub: "Payments" },
  { icon: Headphones,  label: "24/7", sub: "Customer Support" },
];

function Index() {
  const featured = products.filter((p) => p.bestseller).slice(0, 8);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-cream">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.14_210_/_0.18),transparent_60%)]" />
        <div className="max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-8 items-center py-14 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-soft border border-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand">Premium Quality Guaranteed</span>
            </div>
            <h1 className="font-display font-bold mt-5 text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-brand-deep">
              Premium <span className="text-gradient-gold">Dry Fruits</span><br />
              & Healthy Living
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">Fresh • Natural • Hygienically Packed • Premium Quality — sourced and curated by Lavish Grand Traders.</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {["Finest Quality", "100% Natural", "Hygienically Packed"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-brand-deep font-medium"><BadgeCheck className="w-4 h-4 text-brand-cyan" /> {b}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-hero text-white shadow-elegant hover:shadow-gold h-12 px-7 text-base group">
                <Link to="/products">Shop Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground h-12 px-7 text-base">
                <Link to="/gift-boxes">Explore Gift Boxes</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-gold opacity-20 rounded-full blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-brand/10">
              <img src={hero} alt="Premium dry fruits in wooden bowls with luxury gift box" width={1792} height={1216} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-elegant px-4 py-3 flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center"><Sparkles className="w-5 h-5 text-brand-deep" /></div>
              <div><div className="text-xs text-muted-foreground">Trusted by</div><div className="font-display font-bold text-brand-deep">12,000+ families</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative -mt-6 z-10">
        <div className="max-w-7xl mx-auto container-px">
          <div className="bg-white rounded-2xl shadow-elegant border border-border/60 px-6 py-5 grid grid-cols-2 md:grid-cols-5 gap-4">
            {trust.map((t) => (
              <div key={t.sub} className="flex items-center gap-3">
                <t.icon className="w-7 h-7 text-brand" />
                <div className="leading-tight">
                  <div className="font-display font-bold text-brand-deep">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Explore" title="Shop by Category" subtitle="From hand-sorted dry fruits to small-batch spices — explore our complete range." />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((c) => (
              <Link key={c.slug} to="/products" search={{ category: c.slug }} className="group text-center">
                <div className="aspect-square rounded-2xl overflow-hidden mb-3 shadow-soft group-hover:shadow-elegant transition-all border border-border/60 group-hover:border-brand/30" style={{ background: c.tint }}>
                  <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                </div>
                <div className="font-semibold text-brand-deep group-hover:text-brand text-sm">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE STRIPS */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto container-px grid lg:grid-cols-3 gap-5">
          <Link to="/build-your-mix" className="relative rounded-2xl overflow-hidden p-6 bg-gradient-deep text-white shadow-elegant group">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Build Your</div>
            <div className="font-display text-3xl font-bold mt-1">Own Mix</div>
            <div className="text-sm text-white/70 mt-2 max-w-[60%]">Create your perfect healthy mix — live pricing, your portions.</div>
            <div className="mt-4 inline-flex items-center gap-2 text-brand-cyan font-semibold">Customize Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            <Package className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
          </Link>
          <Link to="/gift-boxes" className="relative rounded-2xl overflow-hidden p-6 bg-gradient-hero text-white shadow-elegant group">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-gold-soft">Premium</div>
            <div className="font-display text-3xl font-bold mt-1">Gift Boxes</div>
            <div className="text-sm text-white/80 mt-2 max-w-[60%]">Perfect for every occasion — Diwali, weddings, corporate gifting.</div>
            <div className="mt-4 inline-flex items-center gap-2 text-gold-soft font-semibold">Explore Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            <img src={giftboxHero} alt="" className="absolute -right-10 -bottom-6 w-56 opacity-50 group-hover:opacity-70 transition-opacity rounded-xl" />
          </Link>
          <Link to="/subscriptions" className="relative rounded-2xl overflow-hidden p-6 text-white shadow-elegant group" style={{ background: "linear-gradient(135deg, oklch(0.42 0.12 215), oklch(0.32 0.21 268))" }}>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Smart</div>
            <div className="font-display text-3xl font-bold mt-1">Subscriptions</div>
            <div className="text-sm text-white/80 mt-2 max-w-[70%]">Health delivered to your door, every month.</div>
            <div className="mt-4 inline-flex items-center gap-2 text-brand-cyan font-semibold">Subscribe Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            <Sparkles className="absolute right-6 bottom-6 w-20 h-20 text-white/10" />
          </Link>
        </div>
      </section>

      {/* FEATURED / BESTSELLERS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Bestsellers" title="Featured Products" subtitle="Our most-loved jars and packs — restocked weekly from our Hyderabad facility." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-brand text-brand hover:bg-brand hover:text-brand-foreground">
              <Link to="/products">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GIFT BOX COLLECTION VISUAL */}
      <section className="py-12 bg-gradient-cream">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Premium Gifting" title="The Lavish Grand Gift Collection" subtitle="Ten signature collections, beautifully wrapped — from intimate Happiness Box to the regal Royal Delight." />
          <div className="rounded-3xl overflow-hidden shadow-elegant border border-border/60 bg-white">
            <img src={giftBoxesCollection.url} alt="Lavish Grand premium gift box collections" loading="lazy" className="w-full h-auto" />
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-gradient-hero text-white shadow-elegant">
              <Link to="/gift-boxes">Browse All 10 Collections <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTIONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Subscribe & Save" title="Monthly Dry Fruit Packs" subtitle="Curated boxes that arrive every month — never run out of your daily handful." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {subscriptionPlans.map((s) => (
              <div key={s.id} className="relative bg-white border border-border rounded-2xl p-6 hover:border-brand/40 hover:shadow-elegant transition-all">
                {s.badge && <div className="absolute top-4 right-4 bg-gradient-gold text-brand-deep text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">{s.badge}</div>}
                <div className="font-display text-xl font-bold text-brand-deep">{s.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.blurb}</div>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-brand">{inr(s.monthly)}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {s.includes.map((i) => <li key={i} className="flex gap-2"><BadgeCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" /> {i}</li>)}
                </ul>
                <Button asChild className="w-full mt-6 bg-brand hover:bg-brand-deep text-brand-foreground"><Link to="/subscriptions">Subscribe</Link></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE GIFTING */}
      <section className="py-20 bg-gradient-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.14_210_/_0.25),transparent_50%)]" />
        <div className="max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan"><span className="w-8 h-px bg-brand-cyan" /> Corporate Gifting</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Premium gifts<br /><span className="text-gradient-gold">your brand deserves</span></h2>
            <p className="mt-4 text-white/70 max-w-lg">Custom-branded gift boxes for clients, employees, and milestones. Bulk pricing, dedicated account manager, pan-India delivery.</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
              {["Custom branding", "Bulk pricing", "MOQ from 50", "Pan-India delivery", "Custom messages", "Dedicated manager"].map((b) => (
                <li key={b} className="flex items-center gap-2 text-white/90"><BadgeCheck className="w-4 h-4 text-brand-cyan" /> {b}</li>
              ))}
            </ul>
            <div className="mt-7 flex gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-brand-deep hover:opacity-90"><Link to="/corporate">Request a Quote</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10"><Link to="/gift-boxes">View Boxes</Link></Button>
            </div>
          </div>
          <div className="relative">
            <img src={giftboxHero} alt="Premium corporate gift boxes" loading="lazy" className="rounded-2xl shadow-elegant ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* FESTIVAL COLLECTIONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Limited Edition" title="Festival Gift Collections" subtitle="Themed hampers for every celebration." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {festivalCollections.map((f) => (
              <div key={f.id} className="relative rounded-2xl overflow-hidden p-6 h-44 text-white shadow-elegant hover:shadow-gold transition-all cursor-pointer" style={{ background: f.accent }}>
                <div className="font-display text-2xl font-bold">{f.name}</div>
                <div className="text-sm text-white/80 mt-1">{f.tagline}</div>
                <ArrowRight className="absolute bottom-5 right-5 w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-cream">
        <div className="max-w-7xl mx-auto container-px">
          <SectionHeader eyebrow="Loved by thousands" title="What our customers say" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-border shadow-soft">
                <div className="flex gap-0.5 text-gold mb-3">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-sm text-foreground/80 leading-relaxed">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold text-brand-deep">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT MINI */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto container-px text-center">
          <SectionHeader eyebrow="About Us" title="Lavish Grand Traders Pvt. Ltd." subtitle="Headquartered in Hyderabad, we curate the finest dry fruits, seeds, spices and grocery essentials — sourced from trusted farms and delivered with care across India." />
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {[{ n: "10+", l: "Years of sourcing" }, { n: "20+", l: "Product categories" }, { n: "12,000+", l: "Happy customers" }].map((s) => (
              <div key={s.l} className="bg-white border border-border rounded-2xl p-6 shadow-soft">
                <div className="font-display text-4xl font-bold text-gradient-gold">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8"><Button asChild variant="outline" className="border-brand text-brand hover:bg-brand hover:text-brand-foreground"><Link to="/about">Read Our Story <ArrowRight className="ml-2 w-4 h-4" /></Link></Button></div>
        </div>
      </section>
    </SiteLayout>
  );
}
