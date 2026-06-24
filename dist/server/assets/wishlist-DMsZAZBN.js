import { m as useWishlist, o as products } from "./catalog-D--lWBpy.js";
import { c as Button, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { t as ProductCard } from "./ProductCard-whJ-A1ju.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Heart } from "lucide-react";
//#region src/routes/wishlist.tsx?tsr-split=component
function Wishlist() {
	const wish = useWishlist();
	const items = products.filter((p) => wish.has(p.id));
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-7xl mx-auto container-px py-10",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-4xl font-bold text-brand-deep mb-6",
			children: "Your Wishlist"
		}), items.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "bg-white border border-border rounded-2xl p-16 text-center",
			children: [
				/* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 mx-auto text-muted-foreground" }),
				/* @__PURE__ */ jsx("div", {
					className: "font-display text-2xl font-bold text-brand-deep mt-4",
					children: "No saved items yet"
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "mt-6 bg-gradient-hero text-white",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products",
						children: "Browse Products"
					})
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
			children: items.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
		})]
	}) });
}
//#endregion
export { Wishlist as component };
