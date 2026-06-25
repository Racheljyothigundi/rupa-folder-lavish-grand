import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { inr, useAuth, useCart } from "@/lib/store";
import { getDeliveryCharge, getFreeDeliveryShortfall } from "@/lib/shipping";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Lavish Grand Traders" }] }),
  component: Cart,
});

function Cart() {
  const cart = useCart(); const { requireAuth } = useAuth();
  const ship = getDeliveryCharge(cart.subtotal);
  const freeDeliveryShortfall = getFreeDeliveryShortfall(cart.subtotal);
  const total = cart.subtotal + ship;
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto container-px py-10">
        <h1 className="font-display text-4xl font-bold text-brand-deep mb-6">Your Cart {cart.itemCount > 0 && <span className="text-base text-muted-foreground">({cart.itemCount} items)</span>}</h1>
        {cart.lines.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-16 text-center">
            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground" />
            <div className="font-display text-2xl font-bold text-brand-deep mt-4">Your cart is empty</div>
            <Button asChild className="mt-6 bg-gradient-hero text-white"><Link to="/products">Continue Shopping</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-4">
              {cart.lines.map((l) => (
                <div key={l.id} className="bg-white rounded-2xl border border-border p-4 flex gap-4 shadow-soft">
                  {l.image && <img src={l.image} alt="" className="w-24 h-24 rounded-xl object-cover" />}
                  <div className="flex-1">
                    <div className="font-display font-bold text-brand-deep">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.qty}</div>
                    <div className="text-brand font-bold mt-2">{inr(l.price)}</div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => cart.remove(l.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    <div className="flex items-center gap-1.5 border border-border rounded-lg">
                      <button onClick={() => cart.setCount(l.id, l.count - 1)} className="p-2 hover:bg-secondary"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center font-bold text-sm">{l.count}</span>
                      <button onClick={() => cart.setCount(l.id, l.count + 1)} className="p-2 hover:bg-secondary"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="bg-white rounded-2xl border border-border p-6 shadow-soft h-fit lg:sticky lg:top-32">
              <div className="font-display text-xl font-bold text-brand-deep">Order Summary</div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{inr(cart.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{ship === 0 ? "Free" : inr(ship)}</span></div>
                {freeDeliveryShortfall > 0 && <div className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2">Add {inr(freeDeliveryShortfall)} more for free shipping</div>}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between items-baseline">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-brand">{inr(total)}</span>
              </div>
              <Button asChild className="w-full mt-5 bg-gradient-hero text-white h-12 shadow-elegant" onClick={(e) => { if (!requireAuth()) e.preventDefault(); }}>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
