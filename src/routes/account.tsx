import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth, useAuthModal, useWishlist, inr } from "@/lib/store";
import { products, subscriptionPlans } from "@/data/catalog";
import {
  LayoutDashboard,
  Package,
  Heart,
  Repeat,
  User,
  ShoppingBag,
  Gift,
  Loader2,
} from "lucide-react";

type Tab = "dashboard" | "orders" | "subscriptions" | "wishlist" | "profile";

export const Route = createFileRoute("/account")({
  validateSearch: (s): { tab: Tab } => ({ tab: (s.tab as Tab) || "dashboard" }),
  head: () => ({ meta: [{ title: "My Account — Lavish Grand Traders" }] }),
  component: Account,
});

const mockOrders = [
  { id: "LG874512", date: "12 Jun 2026", items: 3, total: 2147, status: "Delivered" },
  { id: "LG874488", date: "28 May 2026", items: 1, total: 642, status: "Delivered" },
  { id: "LG874322", date: "10 May 2026", items: 5, total: 3289, status: "Delivered" },
];

function Account() {
  const { tab } = Route.useSearch();
  const { user, logout, loading } = useAuth();
  const modal = useAuthModal();
  const wish = useWishlist();

  if (loading)
    return (
      <SiteLayout>
        <section className="max-w-md mx-auto container-px py-24 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand" />
          <p className="mt-4 text-muted-foreground">Loading your account…</p>
        </section>
      </SiteLayout>
    );

  if (!user)
    return (
      <SiteLayout>
        <section className="max-w-md mx-auto container-px py-24 text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-hero text-white mx-auto flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-deep mt-4">
            Sign in to continue
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your orders, subscriptions, gift boxes and profile.
          </p>
          <Button onClick={() => modal.trigger()} className="mt-6 bg-gradient-hero text-white">
            Sign In / Create Account
          </Button>
        </section>
      </SiteLayout>
    );

  const wishItems = products.filter((p) => wish.has(p.id));

  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-10">
        <div className="max-w-7xl mx-auto container-px flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-gold text-brand-deep flex items-center justify-center font-display text-xl font-bold">
            {user.name[0]?.toUpperCase()}
          </div>
          <div>
            <div className="text-xs text-brand-cyan uppercase tracking-[0.2em]">Welcome back</div>
            <h1 className="font-display text-3xl font-bold">{user.name}</h1>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="ml-auto border-white/20 text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto container-px py-10">
        <Tabs value={tab}>
          <TabsList className="bg-secondary mb-6 flex-wrap">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/account" search={{ tab: "dashboard" }} className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </TabsTrigger>
            <TabsTrigger value="orders" asChild>
              <Link to="/account" search={{ tab: "orders" }} className="gap-2">
                <Package className="w-4 h-4" />
                Orders
              </Link>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" asChild>
              <Link to="/account" search={{ tab: "subscriptions" }} className="gap-2">
                <Repeat className="w-4 h-4" />
                Subscriptions
              </Link>
            </TabsTrigger>
            <TabsTrigger value="wishlist" asChild>
              <Link to="/account" search={{ tab: "wishlist" }} className="gap-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </Link>
            </TabsTrigger>
            <TabsTrigger value="profile" asChild>
              <Link to="/account" search={{ tab: "profile" }} className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { i: ShoppingBag, l: "Orders", v: mockOrders.length },
              { i: Repeat, l: "Active Subscriptions", v: 1 },
              { i: Heart, l: "Saved Items", v: wish.ids.length },
              { i: Gift, l: "Saved Gift Boxes", v: 2 },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-border rounded-2xl p-5 shadow-soft">
                <s.i className="w-6 h-6 text-brand" />
                <div className="font-display text-3xl font-bold text-brand-deep mt-2">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-brand-deep">
                  <tr>
                    {["Order ID", "Date", "Items", "Total", "Status", ""].map((h) => (
                      <th key={h} className="text-left p-4 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="[&_tr]:border-t [&_tr]:border-border">
                  {mockOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="p-4 font-mono text-brand">{o.id}</td>
                      <td className="p-4">{o.date}</td>
                      <td className="p-4">{o.items}</td>
                      <td className="p-4 font-semibold">{inr(o.total)}</td>
                      <td className="p-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-brand hover:underline text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
                <div className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block font-semibold">
                  ACTIVE
                </div>
                <div className="font-display text-2xl font-bold text-brand-deep mt-2">
                  {subscriptionPlans[0].name}
                </div>
                <div className="text-sm text-muted-foreground">Next delivery: 5 Jul 2026</div>
                <div className="font-display text-2xl font-bold text-brand mt-3">
                  {inr(subscriptionPlans[0].monthly)}{" "}
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Skip next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/30"
                  >
                    Pause
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-cream border-2 border-dashed border-brand/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <Repeat className="w-8 h-8 text-brand" />
                <div className="font-display font-bold text-brand-deep mt-2">Add another plan</div>
                <Button asChild className="mt-3 bg-brand text-brand-foreground">
                  <Link to="/subscriptions">Browse Plans</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            {wishItems.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">No saved items yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {wishItems.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-border rounded-2xl overflow-hidden"
                  >
                    <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" />
                    <div className="p-3">
                      <div className="font-semibold text-brand-deep text-sm line-clamp-1">
                        {p.name}
                      </div>
                      <div className="text-brand font-bold mt-1">
                        {inr(Math.round(p.mrp * (1 - p.discount / 100)))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <div className="bg-white border border-border rounded-2xl p-6 shadow-soft max-w-xl space-y-3">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Name</div>
                <div className="font-semibold">{user.name}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Email</div>
                <div className="font-semibold">{user.email}</div>
              </div>
              {user.phone && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Phone
                  </div>
                  <div className="font-semibold">{user.phone}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Role</div>
                <div className="font-semibold capitalize">{user.role}</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}
