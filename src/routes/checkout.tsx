import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { inr, useCart, useAuth } from "@/lib/store";
import { CreditCard, Truck, ShieldCheck, BadgeCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void; close: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Lavish Grand Traders" }] }),
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const auth = useAuth();
  const nav = useNavigate();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [order, setOrder] = useState<any>(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Hyderabad",
    pincode: "500051",
  });

  const ship = cart.subtotal > 999 ? 0 : 79;
  const total = cart.subtotal + ship;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const verifyPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    orderId: string
  ) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            order_id: orderId,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Verification failed");

      setOrder(result.order);
      cart.clear();
      setDone(true);
      toast.success("Payment successful! Order confirmed.");
    } catch (err: any) {
      console.error("Payment verification failed:", err);
      toast.error("Payment verification failed. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const openRazorpayCheckout = (
    razorpayOrderId: string,
    orderId: string,
    amount: number
  ) => {
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyIdHere",
      amount: Math.round(amount * 100),
      currency: "INR",
      name: "Lavish Grand Traders",
      description: "Premium Dry Fruits & Gifting",
      order_id: razorpayOrderId,
      handler: (response) => {
        verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature,
          orderId
        );
      },
      prefill: {
        name: form.fullName,
        email: auth.user?.email,
        contact: form.phone,
      },
      theme: { color: "#1e3a32" },
      modal: {
        ondismiss: () => {
          setLoading(false);
          toast.info("Payment cancelled. You can try again.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const createOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.requireAuth()) return;
    if (cart.lines.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            shipping_name: form.fullName,
            shipping_phone: form.phone,
            shipping_address_line1: form.address,
            shipping_city: form.city,
            shipping_state: "Telangana",
            shipping_pincode: form.pincode,
            payment_method: paymentMethod === "cod" ? "cod" : "razorpay",
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Order creation failed");

      if (paymentMethod === "cod") {
        setOrder(result.order);
        cart.clear();
        setDone(true);
        toast.success("Order placed successfully!");
      } else if (result.razorpay_order_id) {
        openRazorpayCheckout(
          result.razorpay_order_id,
          result.order.id,
          result.order.total_amount
        );
      } else {
        throw new Error("Failed to initialize payment");
      }
    } catch (err: any) {
      console.error("Order creation failed:", err);
      toast.error(err.message || "Failed to place order");
      setLoading(false);
    }
  };

  if (done) return (
    <SiteLayout>
      <section className="max-w-2xl mx-auto container-px py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-hero text-white mx-auto flex items-center justify-center">
          <BadgeCheck className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl font-bold text-brand-deep mt-5">Order Placed!</h1>
        <p className="text-muted-foreground mt-2">
          Order #{order?.order_number || `LG${Date.now().toString().slice(-6)}`} confirmed.
          {paymentMethod === "cod"
            ? " Pay cash on delivery."
            : " We've emailed your invoice."}
        </p>
        <Button onClick={() => nav({ to: "/" })} className="mt-6 bg-brand text-brand-foreground">
          Back to Home
        </Button>
      </section>
    </SiteLayout>
  );

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto container-px py-10">
        <h1 className="font-display text-4xl font-bold text-brand-deep mb-6">Checkout</h1>
        <form className="grid lg:grid-cols-[1fr_400px] gap-8" onSubmit={createOrder}>
          <div className="space-y-6">
            <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
              <h2 className="font-display text-xl font-bold text-brand-deep mb-4">Shipping Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full name *</Label>
                  <Input
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone *</Label>
                  <Input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Address line *</Label>
                  <Input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>City *</Label>
                  <Input
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Pincode *</Label>
                  <Input
                    required
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
              <h2 className="font-display text-xl font-bold text-brand-deep mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                {[
                  { v: "razorpay", l: "Card / UPI / NetBanking", i: CreditCard },
                  { v: "cod", l: "Cash on Delivery", i: Truck },
                ].map((p) => (
                  <label
                    key={p.v}
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                      paymentMethod === p.v
                        ? "border-brand bg-brand/5"
                        : "border-border hover:border-brand/50"
                    }`}
                  >
                    <RadioGroupItem value={p.v} />
                    <p.i className="w-5 h-5 text-brand" />
                    <span className="font-medium">{p.l}</span>
                  </label>
                ))}
              </RadioGroup>
              {paymentMethod === "razorpay" && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-brand" />
                  Secure payment powered by Razorpay
                </div>
              )}
            </div>
          </div>
          <aside className="bg-white rounded-2xl border border-border p-6 shadow-soft h-fit lg:sticky lg:top-32">
            <div className="font-display text-xl font-bold text-brand-deep">Order Summary</div>
            <div className="mt-4 space-y-2 max-h-64 overflow-auto">
              {cart.lines.map((l) => (
                <div key={l.id} className="flex justify-between text-sm">
                  <span className="text-foreground/80 truncate pr-2">{l.name} x {l.count}</span>
                  <span className="font-semibold">{inr(l.price * l.count)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{inr(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{ship === 0 ? "Free" : inr(ship)}</span>
              </div>
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between items-baseline">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-brand">{inr(total)}</span>
            </div>
            <Button
              type="submit"
              disabled={cart.lines.length === 0 || loading}
              className="w-full mt-5 bg-gradient-hero text-white h-12 shadow-elegant"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : paymentMethod === "cod" ? (
                "Place Order (COD)"
              ) : (
                `Pay ${inr(total)}`
              )}
            </Button>
          </aside>
        </form>
      </section>
    </SiteLayout>
  );
}
