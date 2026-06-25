import { c as testimonials, n as festivalCollections, o as products, s as subscriptionPlans, t as categories, u as inr } from "./catalog-BiCt1DYe.js";
import { t as giftbox_hero_default } from "./giftbox-hero-jHYZAQhP.js";
import { c as Button, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import { t as SectionHeader } from "./SectionHeader-DOsqMmTZ.js";
import { t as hero_dryfruits_default } from "./hero-dryfruits-CCLQR2Vn.js";
import { t as giftboxes_collection_png_asset_default } from "./giftboxes-collection.png.asset-DuYtzqkt.js";
import { t as ProductCard } from "./ProductCard-bwmrk2TE.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, BadgeCheck, Headphones, Leaf, Lock, Package, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
var trust = [
	{
		icon: ShieldCheck,
		label: "100%",
		sub: "Premium Quality"
	},
	{
		icon: Leaf,
		label: "100%",
		sub: "Natural & Fresh"
	},
	{
		icon: Truck,
		label: "Fast & Safe",
		sub: "Delivery"
	},
	{
		icon: Lock,
		label: "Secure",
		sub: "Payments"
	},
	{
		icon: Headphones,
		label: "24/7",
		sub: "Customer Support"
	}
];
function Index() {
	const featured = products.filter((p) => p.bestseller).slice(0, 8);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden bg-gradient-cream",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.14_210_/_0.18),transparent_60%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-8 items-center py-14 lg:py-20",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-soft border border-gold/30",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-gold" }), /* @__PURE__ */ jsx("span", {
							className: "text-[11px] font-bold tracking-[0.2em] uppercase text-brand",
							children: "Premium Quality Guaranteed"
						})]
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-display font-bold mt-5 text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-brand-deep",
						children: [
							"Premium ",
							/* @__PURE__ */ jsx("span", {
								className: "text-gradient-gold",
								children: "Dry Fruits"
							}),
							/* @__PURE__ */ jsx("br", {}),
							"& Healthy Living"
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-lg text-muted-foreground max-w-lg",
						children: "Fresh • Natural • Hygienically Packed • Premium Quality — sourced and curated by Lavish Grand Traders."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm",
						children: [
							"Finest Quality",
							"100% Natural",
							"Hygienically Packed"
						].map((b) => /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5 text-brand-deep font-medium",
							children: [
								/* @__PURE__ */ jsx(BadgeCheck, { className: "w-4 h-4 text-brand-cyan" }),
								" ",
								b
							]
						}, b))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							className: "bg-gradient-hero text-white shadow-elegant hover:shadow-gold h-12 px-7 text-base group",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/products",
								children: ["Shop Now ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" })]
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "border-brand/30 text-brand hover:bg-brand hover:text-brand-foreground h-12 px-7 text-base",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/gift-boxes",
								children: "Explore Gift Boxes"
							})
						})]
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 w-72 h-72 bg-gradient-gold opacity-20 rounded-full blur-3xl" }),
						/* @__PURE__ */ jsx("div", {
							className: "relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-brand/10",
							children: /* @__PURE__ */ jsx("img", {
								src: hero_dryfruits_default,
								alt: "Premium dry fruits in wooden bowls with luxury gift box",
								width: 1792,
								height: 1216,
								className: "w-full h-auto"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-elegant px-4 py-3 flex items-center gap-3 border border-border",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-brand-deep" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: "Trusted by"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-display font-bold text-brand-deep",
								children: "12,000+ families"
							})] })]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "relative -mt-6 z-10",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto container-px",
				children: /* @__PURE__ */ jsx("div", {
					className: "bg-white rounded-2xl shadow-elegant border border-border/60 px-6 py-5 grid grid-cols-2 md:grid-cols-5 gap-4",
					children: trust.map((t) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(t.icon, { className: "w-7 h-7 text-brand" }), /* @__PURE__ */ jsxs("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-display font-bold text-brand-deep",
								children: t.label
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: t.sub
							})]
						})]
					}, t.sub))
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Explore",
					title: "Shop by Category",
					subtitle: "From hand-sorted dry fruits to small-batch spices — explore our complete range."
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4",
					children: categories.map((c) => /* @__PURE__ */ jsxs(Link, {
						to: "/products",
						search: { category: c.slug },
						className: "group text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-square rounded-2xl overflow-hidden mb-3 shadow-soft group-hover:shadow-elegant transition-all border border-border/60 group-hover:border-brand/30",
							style: { background: c.tint },
							children: /* @__PURE__ */ jsx("img", {
								src: c.image,
								alt: c.name,
								loading: "lazy",
								className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-brand-deep group-hover:text-brand text-sm",
							children: c.name
						})]
					}, c.slug))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px grid lg:grid-cols-3 gap-5",
				children: [
					/* @__PURE__ */ jsxs(Link, {
						to: "/build-your-mix",
						className: "relative rounded-2xl overflow-hidden p-6 bg-gradient-deep text-white shadow-elegant group",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
								children: "Build Your"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-3xl font-bold mt-1",
								children: "Own Mix"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-white/70 mt-2 max-w-[60%]",
								children: "Create your perfect healthy mix — live pricing, your portions."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 inline-flex items-center gap-2 text-brand-cyan font-semibold",
								children: ["Customize Now ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
							}),
							/* @__PURE__ */ jsx(Package, { className: "absolute -right-4 -bottom-4 w-32 h-32 text-white/10" })
						]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/gift-boxes",
						className: "relative rounded-2xl overflow-hidden p-6 bg-gradient-hero text-white shadow-elegant group",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-xs font-bold tracking-[0.25em] uppercase text-gold-soft",
								children: "Premium"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-3xl font-bold mt-1",
								children: "Gift Boxes"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-white/80 mt-2 max-w-[60%]",
								children: "Perfect for every occasion — Diwali, weddings, corporate gifting."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 inline-flex items-center gap-2 text-gold-soft font-semibold",
								children: ["Explore Now ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
							}),
							/* @__PURE__ */ jsx("img", {
								src: giftbox_hero_default,
								alt: "",
								className: "absolute -right-10 -bottom-6 w-56 opacity-50 group-hover:opacity-70 transition-opacity rounded-xl"
							})
						]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/subscriptions",
						className: "relative rounded-2xl overflow-hidden p-6 text-white shadow-elegant group",
						style: { background: "linear-gradient(135deg, oklch(0.42 0.12 215), oklch(0.32 0.21 268))" },
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
								children: "Smart"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-3xl font-bold mt-1",
								children: "Subscriptions"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-white/80 mt-2 max-w-[70%]",
								children: "Health delivered to your door, every month."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 inline-flex items-center gap-2 text-brand-cyan font-semibold",
								children: ["Subscribe Now ", /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })]
							}),
							/* @__PURE__ */ jsx(Sparkles, { className: "absolute right-6 bottom-6 w-20 h-20 text-white/10" })
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [
					/* @__PURE__ */ jsx(SectionHeader, {
						eyebrow: "Bestsellers",
						title: "Featured Products",
						subtitle: "Our most-loved jars and packs — restocked weekly from our Hyderabad facility."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5",
						children: featured.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-center mt-10",
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							className: "border-brand text-brand hover:bg-brand hover:text-brand-foreground",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/products",
								children: ["View All Products ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4" })]
							})
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-12 bg-gradient-cream",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [
					/* @__PURE__ */ jsx(SectionHeader, {
						eyebrow: "Premium Gifting",
						title: "The Lavish Grand Gift Collection",
						subtitle: "Ten signature collections, beautifully wrapped — from intimate Happiness Box to the regal Royal Delight."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "rounded-3xl overflow-hidden shadow-elegant border border-border/60 bg-white",
						children: /* @__PURE__ */ jsx("img", {
							src: giftboxes_collection_png_asset_default.url,
							alt: "Lavish Grand premium gift box collections",
							loading: "lazy",
							className: "w-full h-auto"
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-center mt-8",
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							className: "bg-gradient-hero text-white shadow-elegant",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/gift-boxes",
								children: ["Browse All 10 Collections ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4" })]
							})
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Subscribe & Save",
					title: "Monthly Dry Fruit Packs",
					subtitle: "Curated boxes that arrive every month — never run out of your daily handful."
				}), /* @__PURE__ */ jsx("div", {
					className: "grid md:grid-cols-2 lg:grid-cols-4 gap-5",
					children: subscriptionPlans.map((s) => /* @__PURE__ */ jsxs("div", {
						className: "relative bg-white border border-border rounded-2xl p-6 hover:border-brand/40 hover:shadow-elegant transition-all",
						children: [
							s.badge && /* @__PURE__ */ jsx("div", {
								className: "absolute top-4 right-4 bg-gradient-gold text-brand-deep text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
								children: s.badge
							}),
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-xl font-bold text-brand-deep",
								children: s.name
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground mt-1",
								children: s.blurb
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-5 flex items-baseline gap-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-display text-4xl font-bold text-brand",
									children: inr(s.monthly)
								}), /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground text-sm",
									children: "/month"
								})]
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "space-y-2 text-sm text-foreground/80",
								children: s.includes.map((i) => /* @__PURE__ */ jsxs("li", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ jsx(BadgeCheck, { className: "w-4 h-4 text-brand shrink-0 mt-0.5" }),
										" ",
										i
									]
								}, i))
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								className: "w-full mt-6 bg-brand hover:bg-brand-deep text-brand-foreground",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/subscriptions",
									children: "Subscribe"
								})
							})
						]
					}, s.id))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "py-20 bg-gradient-deep text-white relative overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.78_0.14_210_/_0.25),transparent_50%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
						children: [/* @__PURE__ */ jsx("span", { className: "w-8 h-px bg-brand-cyan" }), " Corporate Gifting"]
					}),
					/* @__PURE__ */ jsxs("h2", {
						className: "font-display text-4xl md:text-5xl font-bold mt-3",
						children: [
							"Premium gifts",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "text-gradient-gold",
								children: "your brand deserves"
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-white/70 max-w-lg",
						children: "Custom-branded gift boxes for clients, employees, and milestones. Bulk pricing, dedicated account manager, pan-India delivery."
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-5 grid grid-cols-2 gap-3 text-sm",
						children: [
							"Custom branding",
							"Bulk pricing",
							"MOQ from 50",
							"Pan-India delivery",
							"Custom messages",
							"Dedicated manager"
						].map((b) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-center gap-2 text-white/90",
							children: [
								/* @__PURE__ */ jsx(BadgeCheck, { className: "w-4 h-4 text-brand-cyan" }),
								" ",
								b
							]
						}, b))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-7 flex gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							className: "bg-gradient-gold text-brand-deep hover:opacity-90",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/corporate",
								children: "Request a Quote"
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "border-white/20 text-white hover:bg-white/10",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/gift-boxes",
								children: "View Boxes"
							})
						})]
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "relative",
					children: /* @__PURE__ */ jsx("img", {
						src: giftbox_hero_default,
						alt: "Premium corporate gift boxes",
						loading: "lazy",
						className: "rounded-2xl shadow-elegant ring-1 ring-white/10"
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Limited Edition",
					title: "Festival Gift Collections",
					subtitle: "Themed hampers for every celebration."
				}), /* @__PURE__ */ jsx("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5",
					children: festivalCollections.map((f) => /* @__PURE__ */ jsxs("div", {
						className: "relative rounded-2xl overflow-hidden p-6 h-44 text-white shadow-elegant hover:shadow-gold transition-all cursor-pointer",
						style: { background: f.accent },
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-2xl font-bold",
								children: f.name
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-white/80 mt-1",
								children: f.tagline
							}),
							/* @__PURE__ */ jsx(ArrowRight, { className: "absolute bottom-5 right-5 w-5 h-5" })
						]
					}, f.id))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20 bg-gradient-cream",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Loved by thousands",
					title: "What our customers say"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid md:grid-cols-2 lg:grid-cols-4 gap-5",
					children: testimonials.map((t) => /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-2xl p-6 border border-border shadow-soft",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex gap-0.5 text-gold mb-3",
								children: Array.from({ length: t.rating }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-current" }, i))
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-foreground/80 leading-relaxed",
								children: [
									"\"",
									t.text,
									"\""
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 pt-4 border-t border-border",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-semibold text-brand-deep",
									children: t.name
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: t.city
								})]
							})
						]
					}, t.id))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-5xl mx-auto container-px text-center",
				children: [
					/* @__PURE__ */ jsx(SectionHeader, {
						eyebrow: "About Us",
						title: "Lavish Grand Traders Pvt. Ltd.",
						subtitle: "Headquartered in Hyderabad, we curate the finest dry fruits, seeds, spices and grocery essentials — sourced from trusted farms and delivered with care across India."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-3 gap-5 mt-10",
						children: [
							{
								n: "10+",
								l: "Years of sourcing"
							},
							{
								n: "20+",
								l: "Product categories"
							},
							{
								n: "12,000+",
								l: "Happy customers"
							}
						].map((s) => /* @__PURE__ */ jsxs("div", {
							className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-display text-4xl font-bold text-gradient-gold",
								children: s.n
							}), /* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground mt-1",
								children: s.l
							})]
						}, s.l))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8",
						children: /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							className: "border-brand text-brand hover:bg-brand hover:text-brand-foreground",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/about",
								children: ["Read Our Story ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4" })]
							})
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Index as component };
