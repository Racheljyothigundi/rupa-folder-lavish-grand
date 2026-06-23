import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products, type CategorySlug } from "@/data/catalog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Search = { category?: CategorySlug | "all"; q?: string; sort?: "featured" | "low" | "high" };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (s.category as Search["category"]) || "all",
    q: typeof s.q === "string" ? s.q : "",
    sort: (s.sort as Search["sort"]) || "featured",
  }),
  head: () => ({ meta: [{ title: "Shop All Products — Lavish Grand Traders" }, { name: "description", content: "Browse premium dry fruits, seeds, spices, dals, millets, flours and gift boxes." }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category = "all", q = "", sort = "featured" } = Route.useSearch();
  const [search, setSearch] = useState(q);
  const filtered = useMemo(() => {
    let list = products;
    if (category && category !== "all") list = list.filter((p) => p.category === category);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") list = [...list].sort((a, b) => a.mrp * (1 - a.discount / 100) - b.mrp * (1 - b.discount / 100));
    if (sort === "high") list = [...list].sort((a, b) => b.mrp * (1 - b.discount / 100) - a.mrp * (1 - a.discount / 100));
    return list;
  }, [category, search, sort]);

  return (
    <SiteLayout>
      <section className="bg-gradient-deep text-white py-12">
        <div className="max-w-7xl mx-auto container-px">
          <div className="text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan">Our Catalogue</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">All Products</h1>
          <p className="text-white/70 mt-2 max-w-xl">Fresh, traceable, hygienically packed — straight from our Hyderabad facility.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto container-px grid lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-brand-deep mb-3">Categories</h3>
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                <Link to="/products" search={{ category: "all" }} className={cn("px-3 py-2 rounded-lg text-sm hover:bg-secondary whitespace-nowrap", category === "all" && "bg-brand text-brand-foreground hover:bg-brand")}>All Products</Link>
                {categories.map((c) => (
                  <Link key={c.slug} to="/products" search={{ category: c.slug }} className={cn("px-3 py-2 rounded-lg text-sm hover:bg-secondary whitespace-nowrap", category === c.slug && "bg-brand text-brand-foreground hover:bg-brand")}>{c.name}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-brand-deep mb-3">Sort by</h3>
              <div className="flex lg:flex-col gap-2">
                {(["featured", "low", "high"] as const).map((s) => (
                  <Link key={s} to="/products" search={{ category, sort: s }} className={cn("px-3 py-2 rounded-lg text-sm hover:bg-secondary capitalize", sort === s && "bg-brand text-brand-foreground hover:bg-brand")}>
                    {s === "featured" ? "Featured" : s === "low" ? "Price: low → high" : "Price: high → low"}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
          <div>
            <div className="relative mb-6 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="pl-10 h-11" />
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}