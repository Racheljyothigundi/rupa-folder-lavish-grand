import { a as offerPrice, d as useAuth, m as useWishlist, o as products, p as useCart, u as inr } from "./catalog-BiCt1DYe.js";
import { t as Route } from "./products._id-BoF9xSUT.js";
import { a as TabsList, c as Button, i as TabsContent, l as cn, o as TabsTrigger, r as Tabs, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import { t as ProductCard } from "./ProductCard-bwmrk2TE.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, BadgeCheck, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
//#region src/routes/products.$id.tsx?tsr-split=component
function ProductPage() {
	const { product } = Route.useLoaderData();
	const cart = useCart();
	const wish = useWishlist();
	const { requireAuth } = useAuth();
	const [count, setCount] = useState(1);
	const price = offerPrice(product.mrp, product.discount);
	const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px py-8 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "hover:text-brand",
					children: "Home"
				}),
				" / ",
				/* @__PURE__ */ jsx(Link, {
					to: "/products",
					className: "hover:text-brand",
					children: "Products"
				}),
				" / ",
				/* @__PURE__ */ jsx("span", {
					className: "text-foreground",
					children: product.name
				})
			]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "max-w-7xl mx-auto container-px grid lg:grid-cols-2 gap-10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative bg-gradient-cream rounded-3xl overflow-hidden border border-border shadow-soft",
				children: [/* @__PURE__ */ jsx("img", {
					src: product.image,
					alt: product.name,
					className: "w-full h-full object-cover aspect-square"
				}), product.discount > 0 && /* @__PURE__ */ jsxs("div", {
					className: "absolute top-4 left-4 bg-gradient-gold text-brand-deep text-xs font-bold px-3 py-1.5 rounded-full shadow-gold",
					children: [product.discount, "% OFF"]
				})]
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-xs font-bold tracking-[0.2em] uppercase text-brand",
					children: product.category.replace("-", " ")
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl md:text-5xl font-bold text-brand-deep mt-2",
					children: product.name
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 mt-3 text-sm",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex gap-0.5 text-gold",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-current" }, i))
					}), /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "4.9 · 234 reviews"
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 text-muted-foreground leading-relaxed",
					children: product.description
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex items-baseline gap-3",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-display text-4xl font-bold text-brand",
							children: inr(price)
						}),
						product.discount > 0 && /* @__PURE__ */ jsx("span", {
							className: "text-lg text-muted-foreground line-through",
							children: inr(product.mrp)
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-xs text-emerald-600 font-semibold",
							children: ["You save ", inr(product.mrp - price)]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"Pack size: ",
						/* @__PURE__ */ jsx("b", {
							className: "text-foreground",
							children: product.qty
						}),
						" · ",
						/* @__PURE__ */ jsx("span", {
							className: cn(product.stock > 20 ? "text-emerald-600" : "text-amber-600", "font-semibold"),
							children: product.stock > 20 ? "In stock" : `Only ${product.stock} left`
						})
					]
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "mt-5 grid grid-cols-2 gap-2",
					children: product.highlights.map((h) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ jsx(BadgeCheck, { className: "w-4 h-4 text-brand-cyan" }),
							" ",
							h
						]
					}, h))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-7 flex items-center gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center border border-border rounded-xl",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => setCount(Math.max(1, count - 1)),
									className: "p-3 hover:bg-secondary rounded-l-xl",
									children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" })
								}),
								/* @__PURE__ */ jsx("span", {
									className: "w-12 text-center font-bold",
									children: count
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setCount(count + 1),
									className: "p-3 hover:bg-secondary rounded-r-xl",
									children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
								})
							]
						}),
						/* @__PURE__ */ jsxs(Button, {
							size: "lg",
							className: "flex-1 bg-brand hover:bg-brand-deep text-brand-foreground h-12 gap-2",
							onClick: () => {
								if (!requireAuth()) return;
								cart.add({
									id: product.id,
									name: product.name,
									image: product.image,
									qty: product.qty,
									price
								}, count);
							},
							children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }), " Add to Cart"]
						}),
						/* @__PURE__ */ jsx(Button, {
							size: "lg",
							variant: "outline",
							className: "h-12 w-12 p-0 border-brand/30",
							onClick: () => {
								if (requireAuth()) wish.toggle(product.id);
							},
							children: /* @__PURE__ */ jsx(Heart, { className: cn("w-5 h-5 text-brand", wish.has(product.id) && "fill-destructive text-destructive") })
						})
					]
				}),
				/* @__PURE__ */ jsx(Button, {
					size: "lg",
					className: "w-full mt-3 bg-gradient-hero text-white shadow-elegant h-12",
					onClick: () => {
						if (!requireAuth()) return;
						cart.add({
							id: product.id,
							name: product.name,
							image: product.image,
							qty: product.qty,
							price
						}, count);
					},
					children: "Buy Now"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 grid grid-cols-3 gap-3 text-xs",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 p-3 rounded-xl bg-secondary/60",
							children: [/* @__PURE__ */ jsx(Truck, { className: "w-4 h-4 text-brand" }), " Free over ₹999"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 p-3 rounded-xl bg-secondary/60",
							children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-brand" }), " Secure payments"]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 p-3 rounded-xl bg-secondary/60",
							children: [/* @__PURE__ */ jsx(BadgeCheck, { className: "w-4 h-4 text-brand" }), " 100% natural"]
						})
					]
				})
			] })]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "max-w-7xl mx-auto container-px py-12",
			children: /* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "desc",
				children: [
					/* @__PURE__ */ jsxs(TabsList, { children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "desc",
							children: "Description"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "nutrition",
							children: "Nutrition"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "shipping",
							children: "Shipping"
						})
					] }),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "desc",
						className: "prose max-w-none text-foreground/80 pt-4 leading-relaxed",
						children: product.description
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "nutrition",
						className: "pt-4 text-foreground/80",
						children: "Approx. per 100g: protein 21g · fibre 12g · healthy fats 50g · zero added sugar."
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "shipping",
						className: "pt-4 text-foreground/80",
						children: "Ships in 24h from Hyderabad. Free delivery on orders above ₹999. 7-day replacement for damaged items."
					})
				]
			})
		}),
		related.length > 0 && /* @__PURE__ */ jsxs("section", {
			className: "max-w-7xl mx-auto container-px py-10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-end justify-between mb-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-2xl font-bold text-brand-deep",
					children: "You may also like"
				}), /* @__PURE__ */ jsxs(Link, {
					to: "/products",
					search: { category: product.category },
					className: "text-sm text-brand hover:underline inline-flex items-center gap-1",
					children: ["View all ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
				children: related.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
			})]
		})
	] });
}
//#endregion
export { ProductPage as component };
