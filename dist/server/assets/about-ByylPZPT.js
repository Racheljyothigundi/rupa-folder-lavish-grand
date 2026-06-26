import { t as SiteLayout } from "./SiteLayout-Bu9JhwBf.js";
import { t as SectionHeader } from "./SectionHeader-DOsqMmTZ.js";
import { t as hero_dryfruits_default } from "./hero-dryfruits-CCLQR2Vn.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Award, Leaf, ShieldCheck, Users } from "lucide-react";
//#region src/routes/about.tsx?tsr-split=component
function About() {
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "bg-gradient-deep text-white py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto container-px text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
						children: "Our Story"
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-display text-5xl md:text-6xl font-bold mt-3",
						children: [
							"Curated with care,",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "text-gradient-gold",
								children: "delivered with pride"
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-white/70 mt-5 max-w-2xl mx-auto",
						children: "Lavish Grand Traders Pvt. Ltd. is a Hyderabad-based company sourcing and curating premium dry fruits, seeds, spices and grocery essentials for families and corporates across India."
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-6xl mx-auto container-px grid lg:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ jsx("img", {
					src: hero_dryfruits_default,
					alt: "",
					loading: "lazy",
					className: "rounded-3xl shadow-elegant"
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(SectionHeader, {
						eyebrow: "What we stand for",
						title: "Quality is non-negotiable",
						align: "left"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground leading-relaxed",
						children: "From single-origin Kashmiri walnuts to small-batch Ceylon cinnamon, every product on our shelf is hand-sorted, lab-tested and hygienically packed at our Cherlapally facility. We believe great ingredients shouldn't be a luxury — they should be your everyday."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-2 gap-4 mt-6",
						children: [
							{
								i: Leaf,
								t: "100% Natural",
								s: "Zero preservatives, zero additives."
							},
							{
								i: ShieldCheck,
								t: "Hygienic Packing",
								s: "Food-grade facility, sealed packs."
							},
							{
								i: Award,
								t: "Best Quality Guaranteed",
								s: "ISO standards, lab-tested batches."
							},
							{
								i: Users,
								t: "12,000+ Happy Families",
								s: "Trusted across 100+ cities."
							}
						].map((v) => /* @__PURE__ */ jsxs("div", {
							className: "bg-white border border-border rounded-xl p-4 flex gap-3 shadow-soft",
							children: [/* @__PURE__ */ jsx(v.i, { className: "w-6 h-6 text-brand shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-semibold text-brand-deep text-sm",
								children: v.t
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: v.s
							})] })]
						}, v.t))
					})
				] })]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-14 bg-gradient-cream",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto container-px text-center",
				children: [/* @__PURE__ */ jsx(SectionHeader, { title: "Company Details" }), /* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-8 shadow-soft grid sm:grid-cols-2 gap-6 text-left",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Company"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-brand-deep",
							children: "Lavish Grand Traders Pvt. Ltd."
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "CIN"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-brand-deep",
							children: "U46909TS2026PTC214908"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "GST"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-brand-deep",
							children: "36AAGCL8507N1ZZ"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Phone"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-brand-deep",
							children: "+91 98489 56829"
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground uppercase tracking-wider",
								children: "Registered Address"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-semibold text-brand-deep",
								children: "Plot No 7/A, Phase-V, IDA Cherlapally, EC Nagar, Navodaya Colony, Hyderabad — 500051"
							})]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { About as component };
