import { d as useAuth, p as useCart, r as giftBoxes, u as inr } from "./catalog-BiCt1DYe.js";
import { t as giftbox_hero_default } from "./giftbox-hero-jHYZAQhP.js";
import { f as Button, t as SiteLayout } from "./SiteLayout-Bu9JhwBf.js";
import { t as SectionHeader } from "./SectionHeader-DOsqMmTZ.js";
import { t as giftboxes_collection_png_asset_default } from "./giftboxes-collection.png.asset-DuYtzqkt.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BadgeCheck, Building2, Gift, MessageSquare } from "lucide-react";
//#region src/routes/gift-boxes.tsx?tsr-split=component
function GiftBoxes() {
	const cart = useCart();
	const { requireAuth } = useAuth();
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative bg-gradient-deep text-white py-16 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.78_0.14_210_/_0.3),transparent_60%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
						children: "Premium Gifting"
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-display text-5xl md:text-6xl font-bold mt-3",
						children: ["Gift ", /* @__PURE__ */ jsx("span", {
							className: "text-gradient-gold",
							children: "extraordinary"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-white/70 max-w-md",
						children: "Ten signature collections — from intimate Happiness Box to the regal Royal Delight. Custom messages, branding, and bulk gifting available."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							className: "bg-gradient-gold text-brand-deep",
							children: /* @__PURE__ */ jsx("a", {
								href: "#collections",
								children: "Browse Collections"
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "border-white/20 text-white hover:bg-white/10",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/corporate",
								children: "Corporate Quote"
							})
						})]
					})
				] }), /* @__PURE__ */ jsx("img", {
					src: giftbox_hero_default,
					alt: "Lavish Grand premium gift box",
					loading: "lazy",
					className: "rounded-3xl shadow-elegant ring-1 ring-white/10"
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-12",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto container-px grid md:grid-cols-3 gap-5",
				children: [
					{
						icon: MessageSquare,
						t: "Custom Messages",
						s: "Add a personal note in elegant calligraphy."
					},
					{
						icon: Building2,
						t: "Corporate Branding",
						s: "Embossed logos, brand colours, bulk MOQ."
					},
					{
						icon: Gift,
						t: "Bulk Gifting",
						s: "Discounted pricing on 50+ orders."
					}
				].map((b) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-6 shadow-soft flex items-start gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-12 h-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center",
						children: /* @__PURE__ */ jsx(b.icon, { className: "w-5 h-5" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "font-display text-lg font-bold text-brand-deep",
						children: b.t
					}), /* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground",
						children: b.s
					})] })]
				}, b.t))
			})
		}),
		/* @__PURE__ */ jsx("section", {
			id: "collections",
			className: "py-12 bg-gradient-cream",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [
					/* @__PURE__ */ jsx(SectionHeader, {
						eyebrow: "The Collection",
						title: "Ten Signature Gift Boxes",
						subtitle: "Each box is hand-assembled in our Hyderabad facility, with hygienically packed compartments."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "rounded-3xl overflow-hidden shadow-elegant border border-border bg-white mb-12",
						children: /* @__PURE__ */ jsx("img", {
							src: giftboxes_collection_png_asset_default.url,
							alt: "Lavish Grand gift box collection",
							loading: "lazy",
							className: "w-full h-auto"
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
						children: giftBoxes.map((g) => /* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-2xl border border-border p-5 hover:border-brand/30 hover:shadow-elegant transition-all",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-display font-bold text-sm",
										children: g.number
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs px-2 py-0.5 rounded-full bg-secondary text-brand-deep font-semibold",
										children: "Bestseller"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "font-display text-xl font-bold text-brand-deep mt-3",
									children: g.name
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground",
									children: g.tagline
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-baseline gap-2 mt-4",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-display text-2xl font-bold text-brand",
										children: inr(g.price)
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground line-through",
										children: inr(g.mrp)
									})]
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-3 space-y-1",
									children: g.badges.map((b) => /* @__PURE__ */ jsxs("li", {
										className: "text-xs text-foreground/70 flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ jsx(BadgeCheck, { className: "w-3 h-3 text-brand-cyan" }),
											" ",
											b
										]
									}, b))
								}),
								/* @__PURE__ */ jsx(Button, {
									className: "w-full mt-4 bg-brand hover:bg-brand-deep text-brand-foreground",
									onClick: () => {
										if (!requireAuth()) return;
										cart.add({
											id: g.id,
											name: g.name + " Gift Box",
											image: giftbox_hero_default,
											qty: "Gift Box",
											price: g.price
										});
									},
									children: "Add Gift Box"
								})
							]
						}, g.id))
					})
				]
			})
		})
	] });
}
//#endregion
export { GiftBoxes as component };
