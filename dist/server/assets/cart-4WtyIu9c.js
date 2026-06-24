import { d as useAuth, p as useCart, u as inr } from "./catalog-D--lWBpy.js";
import { c as Button, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
//#region src/routes/cart.tsx?tsr-split=component
function Cart() {
	const cart = useCart();
	const { requireAuth } = useAuth();
	const ship = cart.subtotal > 999 ? 0 : cart.subtotal > 0 ? 79 : 0;
	const total = cart.subtotal + ship;
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-7xl mx-auto container-px py-10",
		children: [/* @__PURE__ */ jsxs("h1", {
			className: "font-display text-4xl font-bold text-brand-deep mb-6",
			children: ["Your Cart ", cart.itemCount > 0 && /* @__PURE__ */ jsxs("span", {
				className: "text-base text-muted-foreground",
				children: [
					"(",
					cart.itemCount,
					" items)"
				]
			})]
		}), cart.lines.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "bg-white border border-border rounded-2xl p-16 text-center",
			children: [
				/* @__PURE__ */ jsx(ShoppingBag, { className: "w-12 h-12 mx-auto text-muted-foreground" }),
				/* @__PURE__ */ jsx("div", {
					className: "font-display text-2xl font-bold text-brand-deep mt-4",
					children: "Your cart is empty"
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "mt-6 bg-gradient-hero text-white",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products",
						children: "Continue Shopping"
					})
				})
			]
		}) : /* @__PURE__ */ jsxs("div", {
			className: "grid lg:grid-cols-[1fr_360px] gap-8",
			children: [/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: cart.lines.map((l) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl border border-border p-4 flex gap-4 shadow-soft",
					children: [
						l.image && /* @__PURE__ */ jsx("img", {
							src: l.image,
							alt: "",
							className: "w-24 h-24 rounded-xl object-cover"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "font-display font-bold text-brand-deep",
									children: l.name
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: l.qty
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-brand font-bold mt-2",
									children: inr(l.price)
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-end justify-between",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: () => cart.remove(l.id),
								className: "text-muted-foreground hover:text-destructive",
								children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1.5 border border-border rounded-lg",
								children: [
									/* @__PURE__ */ jsx("button", {
										onClick: () => cart.setCount(l.id, l.count - 1),
										className: "p-2 hover:bg-secondary",
										children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" })
									}),
									/* @__PURE__ */ jsx("span", {
										className: "w-6 text-center font-bold text-sm",
										children: l.count
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => cart.setCount(l.id, l.count + 1),
										className: "p-2 hover:bg-secondary",
										children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })
									})
								]
							})]
						})
					]
				}, l.id))
			}), /* @__PURE__ */ jsxs("aside", {
				className: "bg-white rounded-2xl border border-border p-6 shadow-soft h-fit lg:sticky lg:top-32",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-display text-xl font-bold text-brand-deep",
						children: "Order Summary"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ jsx("span", { children: inr(cart.subtotal) })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Shipping"
								}), /* @__PURE__ */ jsx("span", { children: ship === 0 ? "Free" : inr(ship) })]
							}),
							cart.subtotal < 999 && cart.subtotal > 0 && /* @__PURE__ */ jsxs("div", {
								className: "text-xs text-amber-700 bg-amber-50 rounded-lg p-2",
								children: [
									"Add ",
									inr(999 - cart.subtotal),
									" more for free shipping"
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-t border-border mt-4 pt-4 flex justify-between items-baseline",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Total"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-display text-2xl font-bold text-brand",
							children: inr(total)
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						className: "w-full mt-5 bg-gradient-hero text-white h-12 shadow-elegant",
						onClick: (e) => {
							if (!requireAuth()) e.preventDefault();
						},
						children: /* @__PURE__ */ jsx(Link, {
							to: "/checkout",
							children: "Proceed to Checkout"
						})
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { Cart as component };
