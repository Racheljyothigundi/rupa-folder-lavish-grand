import { o as products, t as categories } from "./catalog-CuoH-XyD.js";
import { t as Route } from "./products-Dkuk8lCX.js";
import { l as cn, s as Input, t as SiteLayout } from "./SiteLayout-pGyUNl4u.js";
import { t as ProductCard } from "./ProductCard-BdO68mWK.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
//#region src/routes/products.tsx?tsr-split=component
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
	}, [
		category,
		search,
		sort
	]);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "bg-gradient-deep text-white py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
					children: "Our Catalogue"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl md:text-5xl font-bold mt-2",
					children: "All Products"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-white/70 mt-2 max-w-xl",
					children: "Fresh, traceable, hygienically packed — straight from our Hyderabad facility."
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px grid lg:grid-cols-[240px_1fr] gap-8",
			children: [/* @__PURE__ */ jsxs("aside", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "font-display font-bold text-brand-deep mb-3",
					children: "Categories"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/products",
						search: { category: "all" },
						className: cn("px-3 py-2 rounded-lg text-sm hover:bg-secondary whitespace-nowrap", category === "all" && "bg-brand text-brand-foreground hover:bg-brand"),
						children: "All Products"
					}), categories.map((c) => /* @__PURE__ */ jsx(Link, {
						to: "/products",
						search: { category: c.slug },
						className: cn("px-3 py-2 rounded-lg text-sm hover:bg-secondary whitespace-nowrap", category === c.slug && "bg-brand text-brand-foreground hover:bg-brand"),
						children: c.name
					}, c.slug))]
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "font-display font-bold text-brand-deep mb-3",
					children: "Sort by"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex lg:flex-col gap-2",
					children: [
						"featured",
						"low",
						"high"
					].map((s) => /* @__PURE__ */ jsx(Link, {
						to: "/products",
						search: {
							category,
							sort: s
						},
						className: cn("px-3 py-2 rounded-lg text-sm hover:bg-secondary capitalize", sort === s && "bg-brand text-brand-foreground hover:bg-brand"),
						children: s === "featured" ? "Featured" : s === "low" ? "Price: low → high" : "Price: high → low"
					}, s))
				})] })]
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: "relative mb-6 max-w-md",
				children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search products…",
					className: "pl-10 h-11"
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "text-center py-20 text-muted-foreground",
				children: "No products match your filters."
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
				children: filtered.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
			})] })]
		})
	})] });
}
//#endregion
export { ProductsPage as component };
