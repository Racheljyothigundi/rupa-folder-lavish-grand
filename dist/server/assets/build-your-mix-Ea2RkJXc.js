import { d as useAuth, i as mixIngredients, p as useCart, u as inr } from "./catalog-BiCt1DYe.js";
import { c as Button, l as cn, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
//#region src/components/ui/slider.tsx
var Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(SliderPrimitive.Root, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = SliderPrimitive.Root.displayName;
//#endregion
//#region src/routes/build-your-mix.tsx?tsr-split=component
function BuildMix() {
	const cart = useCart();
	const { requireAuth } = useAuth();
	const [grams, setGrams] = useState({});
	const totals = useMemo(() => {
		const totalGrams = Object.values(grams).reduce((s, g) => s + g, 0);
		const totalPrice = mixIngredients.reduce((s, ing) => s + (grams[ing.id] || 0) / 100 * ing.pricePer100g, 0);
		return {
			grams: totalGrams,
			price: Math.round(totalPrice)
		};
	}, [grams]);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "bg-gradient-deep text-white py-14",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }), " Custom Mix"]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-4xl md:text-5xl font-bold mt-3",
					children: "Build Your Own Mix"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-white/70 max-w-xl mt-3",
					children: "Pick your favourites, choose portions, and we'll pack a custom jar — fresh to order."
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px grid lg:grid-cols-[1fr_360px] gap-8",
			children: [/* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 gap-5",
				children: mixIngredients.map((ing) => {
					const g = grams[ing.id] || 0;
					return /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl border border-border p-5 shadow-soft",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: ing.image,
										alt: ing.name,
										className: "w-16 h-16 rounded-xl object-cover"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-display font-bold text-brand-deep",
											children: ing.name
										}), /* @__PURE__ */ jsxs("div", {
											className: "text-xs text-muted-foreground",
											children: [inr(ing.pricePer100g), " / 100g"]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx("button", {
												className: "w-8 h-8 rounded-full bg-secondary hover:bg-brand hover:text-brand-foreground",
												onClick: () => setGrams({
													...grams,
													[ing.id]: Math.max(0, g - 50)
												}),
												children: /* @__PURE__ */ jsx(Minus, { className: "w-3.5 h-3.5 mx-auto" })
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "font-display font-bold w-14 text-center",
												children: [g, "g"]
											}),
											/* @__PURE__ */ jsx("button", {
												className: "w-8 h-8 rounded-full bg-secondary hover:bg-brand hover:text-brand-foreground",
												onClick: () => setGrams({
													...grams,
													[ing.id]: g + 50
												}),
												children: /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 mx-auto" })
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsx(Slider, {
								value: [g],
								max: 1e3,
								step: 50,
								onValueChange: (v) => setGrams({
									...grams,
									[ing.id]: v[0]
								}),
								className: "mt-4"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-xs text-right mt-2 text-muted-foreground",
								children: ["Subtotal: ", /* @__PURE__ */ jsx("b", {
									className: "text-brand",
									children: inr(Math.round(g / 100 * ing.pricePer100g))
								})]
							})
						]
					}, ing.id);
				})
			}), /* @__PURE__ */ jsxs("aside", {
				className: "lg:sticky lg:top-32 h-fit bg-gradient-hero text-white rounded-2xl p-6 shadow-elegant",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
						children: "Your Custom Mix"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "font-display text-3xl font-bold mt-2",
						children: [totals.grams, "g"]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-white/70 text-sm",
						children: "Total weight"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 space-y-2 text-sm",
						children: [mixIngredients.filter((i) => (grams[i.id] || 0) > 0).map((i) => /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-white/80",
							children: [/* @__PURE__ */ jsx("span", { children: i.name }), /* @__PURE__ */ jsxs("span", { children: [grams[i.id], "g"] })]
						}, i.id)), totals.grams === 0 && /* @__PURE__ */ jsx("div", {
							className: "text-white/60 italic",
							children: "Pick ingredients to start →"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-t border-white/20 mt-6 pt-4 flex items-baseline justify-between",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-white/70",
							children: "Total"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-display text-3xl font-bold text-gold-soft",
							children: inr(totals.price)
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						disabled: totals.grams === 0,
						className: "w-full mt-5 bg-gradient-gold text-brand-deep hover:opacity-90 h-12 disabled:opacity-40 gap-2",
						onClick: () => {
							if (!requireAuth()) return;
							cart.add({
								id: "mix-" + Date.now(),
								name: `Custom Mix (${totals.grams}g)`,
								image: mixIngredients[0].image,
								qty: `${totals.grams}g`,
								price: totals.price
							});
						},
						children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "w-4 h-4" }), " Add Mix to Cart"]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { BuildMix as component };
