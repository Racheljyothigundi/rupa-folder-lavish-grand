import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { offerPrice, type Product } from "@/data/catalog";
import { inr, useAuth, useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const price = offerPrice(product.mrp, product.discount);
  const cart = useCart(); const wish = useWishlist(); const { requireAuth } = useAuth();
  const wished = wish.has(product.id);
  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-brand/30 hover:shadow-elegant transition-all duration-300">
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square bg-gradient-cream overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" width={640} height={640} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-gold text-brand-deep text-[11px] font-bold px-2.5 py-1 rounded-full shadow-gold">{product.discount}% OFF</div>
          )}
          {product.bestseller && (
            <div className="absolute top-3 right-3 bg-brand text-brand-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">Bestseller</div>
          )}
        </div>
      </Link>
      <button
        onClick={() => { if (requireAuth()) wish.toggle(product.id); }}
        className={cn("absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition-all", product.bestseller && "top-12")}
        aria-label="Toggle wishlist"
      >
        <Heart className={cn("w-4 h-4 text-brand transition-all", wished && "fill-destructive text-destructive")} />
      </button>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1 text-[11px] text-gold">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          <span className="text-muted-foreground ml-1">(4.9)</span>
        </div>
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug hover:text-brand transition-colors">{product.name}</h3>
        </Link>
        <div className="text-xs text-muted-foreground">{product.qty} • {product.stock > 20 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}</div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-display font-bold text-brand">{inr(price)}</span>
          {product.discount > 0 && <span className="text-xs text-muted-foreground line-through">{inr(product.mrp)}</span>}
        </div>
        <Button
          className="w-full bg-brand hover:bg-brand-deep text-brand-foreground gap-2 h-10"
          onClick={() => { if (!requireAuth()) return; cart.add({ id: product.id, name: product.name, image: product.image, qty: product.qty, price }); }}
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}