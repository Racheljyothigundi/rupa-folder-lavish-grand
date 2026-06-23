import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth, useAuthModal, inr } from "@/lib/store";
import { products } from "@/data/catalog";
import { TrendingUp, ShoppingBag, Users, Package, AlertTriangle, BarChart3, ShieldAlert, ArrowUpRight } from "lucide-react";

type Tab = "overview" | "orders" | "inventory" | "customers" | "reports";

export const Route = createFileRoute("/admin")({
  validateSearch: (s): { tab: Tab } => ({ tab: (s.tab as Tab) || "overview" }),
  head: () => ({ meta: [{ title: "Admin Console — Lavish Grand Traders" }] }),
  component: Admin,
});

const recentOrders = [
  { id: "LG874621", customer: "Anitha R.", total: 2147, status: "Processing" },
  { id: "LG874620", customer: "Rohit M.",  total: 3289, status: "Shipped" },
  { id: "LG874619", customer: "Priya S.",  total: 1499, status: "Delivered" },
  { id: "LG874618", customer: "Karthik V.",total: 8990, status: "Processing" },
  { id: "LG874617", customer: "Anonymous", total: 642,  status: "Delivered" },
];

function Admin() {
  const { tab } = Route.useSearch();
  const { user } = useAuth();
  const modal = useAuthModal();

  if (!user) return (
    <SiteLayout>
      <section className="max-w-md mx-auto py-24 text-center container-px">
        <ShieldAlert className="w-12 h-12 mx-auto text-brand" />
        <h1 className="font-display text-3xl font-bold text-brand-deep mt-4">Admin sign-in required</h1>
        <Button onClick={() => modal.trigger()} className="mt-6 bg-gradient-hero text-white">Sign In</Button>
        <p className="text-xs text-muted-foreground mt-4">Demo: any email starting with <b>admin@</b></p>
      </section>
    </SiteLayout>
  );

  if (user.role !== "admin") return (
    <SiteLayout>
      <section className="max-w-md mx-auto py-24 text-center container-px">
        <ShieldAlert className="w-12 h-12 mx-auto text-destructive" />
        <h1 className="font-display text-3xl font-bold text-brand-deep mt-4">Not authorized</h1>
        <p className="text-muted-foreground mt-2">Only admins can access this console.</p>
        <Button asChild className="mt-6 bg-brand text-brand-foreground"><Link to="/">Back to Home</Link></Button>
      </section>
    </SiteLayout>
  );

  const lowStock = products.filter((p) => p.stock < 70);

  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-8">
        <div className="max-w-7xl mx-auto container-px flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-gold text-brand-deep flex items-center justify-center font-bold">A</div>
          <div>
            <div className="text-xs text-brand-cyan uppercase tracking-[0.2em]">Admin Console</div>
            <h1 className="font-display text-2xl font-bold">Lavish Grand Operations</h1>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto container-px py-8">
        <Tabs value={tab}>
          <TabsList className="bg-secondary mb-6 flex-wrap">
            <TabsTrigger value="overview" asChild><Link to="/admin" search={{ tab: "overview" }}>Overview</Link></TabsTrigger>
            <TabsTrigger value="orders" asChild><Link to="/admin" search={{ tab: "orders" }}>Orders</Link></TabsTrigger>
            <TabsTrigger value="inventory" asChild><Link to="/admin" search={{ tab: "inventory" }}>Inventory</Link></TabsTrigger>
            <TabsTrigger value="customers" asChild><Link to="/admin" search={{ tab: "customers" }}>Customers</Link></TabsTrigger>
            <TabsTrigger value="reports" asChild><Link to="/admin" search={{ tab: "reports" }}>Reports</Link></TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { l: "Revenue (MTD)", v: inr(384920), d: "+12.4%", i: TrendingUp },
                { l: "Orders Today",  v: 47,            d: "+8 vs avg", i: ShoppingBag },
                { l: "Active Customers", v: 1287,       d: "+24 this week", i: Users },
                { l: "Inventory SKUs",  v: products.length, d: `${lowStock.length} low`, i: Package },
              ].map((s) => (
                <div key={s.l} className="bg-white border border-border rounded-2xl p-5 shadow-soft">
                  <div className="flex items-start justify-between"><s.i className="w-5 h-5 text-brand" /><span className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{s.d}</span></div>
                  <div className="font-display text-3xl font-bold text-brand-deep mt-3">{s.v}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="font-display font-bold text-brand-deep mb-3">Recent Orders</h3>
                <div className="space-y-2 text-sm">
                  {recentOrders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-border">
                      <div><div className="font-mono text-brand">{o.id}</div><div className="text-xs text-muted-foreground">{o.customer}</div></div>
                      <div className="text-right"><div className="font-bold">{inr(o.total)}</div><div className="text-xs text-muted-foreground">{o.status}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="font-display font-bold text-brand-deep mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Low Stock Alerts</h3>
                <div className="space-y-2 text-sm">
                  {lowStock.slice(0, 6).map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-border">
                      <div><div className="font-semibold">{p.name}</div><div className="text-xs text-muted-foreground">{p.qty}</div></div>
                      <div className="font-bold text-amber-600">{p.stock} left</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-brand-deep"><tr>{["Order ID","Customer","Total","Status","Action"].map((h) => <th key={h} className="text-left p-4 font-semibold">{h}</th>)}</tr></thead>
                <tbody className="[&_tr]:border-t [&_tr]:border-border">
                  {recentOrders.map((o) => (
                    <tr key={o.id}><td className="p-4 font-mono text-brand">{o.id}</td><td className="p-4">{o.customer}</td><td className="p-4 font-semibold">{inr(o.total)}</td><td className="p-4"><span className="text-xs px-2 py-1 rounded-full bg-secondary text-brand-deep font-semibold">{o.status}</span></td><td className="p-4"><button className="text-brand hover:underline">Manage</button></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-brand-deep"><tr>{["Product","Category","Pack","Price","Stock","Status"].map((h) => <th key={h} className="text-left p-4 font-semibold">{h}</th>)}</tr></thead>
                <tbody className="[&_tr]:border-t [&_tr]:border-border">
                  {products.map((p) => {
                    const price = Math.round(p.mrp * (1 - p.discount / 100));
                    const status = p.stock > 70 ? "Healthy" : p.stock > 20 ? "Low" : "Critical";
                    return (<tr key={p.id}><td className="p-4 font-semibold">{p.name}</td><td className="p-4 capitalize text-muted-foreground">{p.category}</td><td className="p-4">{p.qty}</td><td className="p-4 font-bold text-brand">{inr(price)}</td><td className="p-4">{p.stock}</td><td className="p-4"><span className={"text-xs px-2 py-1 rounded-full font-semibold " + (status === "Healthy" ? "bg-emerald-100 text-emerald-700" : status === "Low" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700")}>{status}</span></td></tr>);
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <div className="bg-white border border-border rounded-2xl p-10 text-center">
              <Users className="w-10 h-10 text-brand mx-auto" />
              <div className="font-display text-2xl font-bold text-brand-deep mt-3">1,287 Customers</div>
              <div className="text-muted-foreground mt-1">Full CRM with segmentation coming soon.</div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { l: "Daily Sales", v: inr(12480), d: "Today" },
                { l: "Monthly Sales", v: inr(384920), d: "June 2026" },
                { l: "YoY Growth", v: "+42%", d: "vs Jun '25" },
              ].map((s) => (
                <div key={s.l} className="bg-white border border-border rounded-2xl p-6 shadow-soft">
                  <BarChart3 className="w-6 h-6 text-brand" />
                  <div className="font-display text-3xl font-bold text-brand-deep mt-3">{s.v}</div>
                  <div className="text-sm text-muted-foreground">{s.l} <span className="text-xs">· {s.d}</span></div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}