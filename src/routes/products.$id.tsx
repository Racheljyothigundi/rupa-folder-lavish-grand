import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { offerPrice, products } from "@/data/catalog";
import { inr, useAuth, useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return { meta: p ? [
      { title: `${p.name} — Lavish Grand Traders` },
      { name: "description", content: p.description.slice(0, 155) },
      { property: "og:title", content: `${p.name} — Lavish Grand Traders` },
      { property: "og:description", content: p.description.slice(0, 155) },
      { property: "og:image", content: p.image },
    ] : [] };
  },
  notFoundComponent: () => <SiteLayout><div className="py-32 text-center"><h1 className="font-display text-3xl">Product not found</h1><Link to="/products" className="text-brand mt-3 inline-block">Back to all products →</Link></div></SiteLayout>,
  errorComponent: ({ error }) => <SiteLayout><div className="py-32 text-center text-destructive">{error.message}</div></SiteLayout>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cart = useCart(); const wish = useWishlist(); const { requireAuth } = useAuth();
  const [count, setCount] = useState(1);
  const price = offerPrice(product.mrp, product.discount);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto container-px py-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-brand">Home</Link> / <Link to="/products" className="hover:text-brand">Products</Link> / <span className="text-foreground">{product.name}</span>
      </div>
      <section className="max-w-7xl mx-auto container-px grid lg:grid-cols-2 gap-10">
        <div className="relative bg-gradient-cream rounded-3xl overflow-hidden border border-border shadow-soft">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover aspect-square" />
          {product.discount > 0 && <div className="absolute top-4 left-4 bg-gradient-gold text-brand-deep text-xs font-bold px-3 py-1.5 rounded-full shadow-gold">{product.discount}% OFF</div>}
        </div>
        <div>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-brand">{product.category.replace("-", " ")}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-deep mt-2">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3 text-sm">
            <div className="flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
            <span className="text-muted-foreground">4.9 · 234 reviews</span>
          </div>
          <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-brand">{inr(price)}</span>
            {product.discount > 0 && <span className="text-lg text-muted-foreground line-through">{inr(product.mrp)}</span>}
            <span className="text-xs text-emerald-600 font-semibold">You save {inr(product.mrp - price)}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Pack size: <b className="text-foreground">{product.qty}</b> · <span className={cn(product.stock > 20 ? "text-emerald-600" : "text-amber-600", "font-semibold")}>{product.stock > 20 ? "In stock" : `Only ${product.stock} left`}</span></div>

          <ul className="mt-5 grid grid-cols-2 gap-2">
            {product.highlights.map((h: string) => <li key={h} className="flex items-center gap-2 text-sm"><BadgeCheck className="w-4 h-4 text-brand-cyan" /> {h}</li>)}
          </ul>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center border border-border rounded-xl">
              <button onClick={() => setCount(Math.max(1, count - 1))} className="p-3 hover:bg-secondary rounded-l-xl"><Minus className="w-4 h-4" /></button>
              <span className="w-12 text-center font-bold">{count}</span>
              <button onClick={() => setCount(count + 1)} className="p-3 hover:bg-secondary rounded-r-xl"><Plus className="w-4 h-4" /></button>
            </div>
            <Button size="lg" className="flex-1 bg-brand hover:bg-brand-deep text-brand-foreground h-12 gap-2" onClick={() => { if (!requireAuth()) return; cart.add({ id: product.id, name: product.name, image: product.image, qty: product.qty, price }, count); }}>
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="h-12 w-12 p-0 border-brand/30" onClick={() => { if (requireAuth()) wish.toggle(product.id); }}>
              <Heart className={cn("w-5 h-5 text-brand", wish.has(product.id) && "fill-destructive text-destructive")} />
            </Button>
          </div>
          <Button size="lg" className="w-full mt-3 bg-gradient-hero text-white shadow-elegant h-12" onClick={() => { if (!requireAuth()) return; cart.add({ id: product.id, name: product.name, image: product.image, qty: product.qty, price }, count); }}>Buy Now</Button>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60"><Truck className="w-4 h-4 text-brand" /> Free over ₹999</div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60"><ShieldCheck className="w-4 h-4 text-brand" /> Secure payments</div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60"><BadgeCheck className="w-4 h-4 text-brand" /> 100% natural</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto container-px py-12">
        <Tabs defaultValue="desc">
          <TabsList>
            <TabsTrigger value="desc">Description</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="desc" className="prose max-w-none text-foreground/80 pt-4 leading-relaxed">{product.description}</TabsContent>
          <TabsContent value="nutrition" className="pt-4 text-foreground/80">Approx. per 100g: protein 21g · fibre 12g · healthy fats 50g · zero added sugar.</TabsContent>
          <TabsContent value="shipping" className="pt-4 text-foreground/80">Ships in 24h from Hyderabad. Free delivery on orders above ₹999. 7-day replacement for damaged items.</TabsContent>
        </Tabs>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto container-px py-10">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-brand-deep">You may also like</h2>
            <Link to="/products" search={{ category: product.category }} className="text-sm text-brand hover:underline inline-flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </SiteLayout>
  );
}