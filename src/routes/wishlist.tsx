import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/catalog";
import { useWishlist } from "@/lib/store";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Lavish Grand Traders" }] }),
  component: Wishlist,
});

function Wishlist() {
  const wish = useWishlist();
  const items = products.filter((p) => wish.has(p.id));
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto container-px py-10">
        <h1 className="font-display text-4xl font-bold text-brand-deep mb-6">Your Wishlist</h1>
        {items.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-16 text-center">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground" />
            <div className="font-display text-2xl font-bold text-brand-deep mt-4">No saved items yet</div>
            <Button asChild className="mt-6 bg-gradient-hero text-white"><Link to="/products">Browse Products</Link></Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>
    </SiteLayout>
  );
}