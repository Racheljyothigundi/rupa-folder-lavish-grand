import { a as offerPrice, d as useAuth, m as useWishlist, p as useCart, u as inr } from "./catalog-CuoH-XyD.js";
import { c as Button, l as cn } from "./SiteLayout-pGyUNl4u.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Heart, ShoppingBag, Star } from "lucide-react";
//#region src/components/site/ProductCard.tsx
function ProductCard({ product }) {
	const price = offerPrice(product.mrp, product.discount);
	const cart = useCart();
	const wish = useWishlist();
	const { requireAuth } = useAuth();
	const wished = wish.has(product.id);
	return /* @__PURE__ */ jsxs("div", {
		className: "group relative bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-brand/30 hover:shadow-elegant transition-all duration-300",
		children: [
			/* @__PURE__ */ jsx(Link, {
				to: "/products/$id",
				params: { id: product.id },
				className: "block",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative aspect-square bg-gradient-cream overflow-hidden",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: product.image,
							alt: product.name,
							loading: "lazy",
							width: 640,
							height: 640,
							className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						}),
						product.discount > 0 && /* @__PURE__ */ jsxs("div", {
							className: "absolute top-3 left-3 bg-gradient-gold text-brand-deep text-[11px] font-bold px-2.5 py-1 rounded-full shadow-gold",
							children: [product.discount, "% OFF"]
						}),
						product.bestseller && /* @__PURE__ */ jsx("div", {
							className: "absolute top-3 right-3 bg-brand text-brand-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
							children: "Bestseller"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					if (requireAuth()) wish.toggle(product.id);
				},
				className: cn("absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition-all", product.bestseller && "top-12"),
				"aria-label": "Toggle wishlist",
				children: /* @__PURE__ */ jsx(Heart, { className: cn("w-4 h-4 text-brand transition-all", wished && "fill-destructive text-destructive") })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "p-4 space-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1 text-[11px] text-gold",
						children: [Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-current" }, i)), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground ml-1",
							children: "(4.9)"
						})]
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/products/$id",
						params: { id: product.id },
						children: /* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-foreground line-clamp-2 leading-snug hover:text-brand transition-colors",
							children: product.name
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-xs text-muted-foreground",
						children: [
							product.qty,
							" • ",
							product.stock > 20 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-lg font-display font-bold text-brand",
							children: inr(price)
						}), product.discount > 0 && /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground line-through",
							children: inr(product.mrp)
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						className: "w-full bg-brand hover:bg-brand-deep text-brand-foreground gap-2 h-10",
						onClick: () => {
							if (!requireAuth()) return;
							cart.add({
								id: product.id,
								name: product.name,
								image: product.image,
								qty: product.qty,
								price
							});
						},
						children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }), " Add to Cart"]
					})
				]
			})
		]
	});
}
//#endregion
export { ProductCard as t };
