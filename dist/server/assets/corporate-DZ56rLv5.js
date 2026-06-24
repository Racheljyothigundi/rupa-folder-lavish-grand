import { t as giftbox_hero_default } from "./giftbox-hero-jHYZAQhP.js";
import { c as Button, n as Label, s as Input, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { t as SectionHeader } from "./SectionHeader-DOsqMmTZ.js";
import { t as Textarea } from "./textarea-D6aPTr6M.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { BadgeCheck, Building2, MessageSquare, Package, Truck } from "lucide-react";
//#region src/routes/corporate.tsx?tsr-split=component
function Corporate() {
	const [sent, setSent] = useState(false);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative bg-gradient-deep text-white py-16 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.78_0.14_210_/_0.25),transparent_60%)]" }), /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px relative grid lg:grid-cols-2 gap-10 items-center",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
						children: "Corporate Gifting"
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-display text-5xl md:text-6xl font-bold mt-3",
						children: ["Gifts ", /* @__PURE__ */ jsx("span", {
							className: "text-gradient-gold",
							children: "your brand deserves"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-white/70 max-w-md mt-4",
						children: "From Diwali hampers to onboarding gifts — we curate, brand and deliver premium dry-fruit boxes at scale."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							className: "bg-gradient-gold text-brand-deep",
							children: /* @__PURE__ */ jsx("a", {
								href: "#quote",
								children: "Request a Quote"
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "border-white/20 text-white hover:bg-white/10",
							children: /* @__PURE__ */ jsx("a", {
								href: "tel:+919848956829",
								children: "Call +91 98489 56829"
							})
						})]
					})
				] }), /* @__PURE__ */ jsx("img", {
					src: giftbox_hero_default,
					alt: "Corporate gift boxes",
					loading: "lazy",
					className: "rounded-3xl shadow-elegant ring-1 ring-white/10"
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-14",
			children: /* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto container-px grid md:grid-cols-2 lg:grid-cols-4 gap-5",
				children: [
					{
						i: Building2,
						t: "Brand-first packaging",
						s: "Embossed logos, branded sleeves, custom inserts."
					},
					{
						i: Package,
						t: "MOQ from 50",
						s: "Discounted slabs at 100 / 250 / 500+."
					},
					{
						i: Truck,
						t: "Pan-India delivery",
						s: "Scheduled drops to multiple offices."
					},
					{
						i: MessageSquare,
						t: "Dedicated manager",
						s: "One contact, end-to-end execution."
					}
				].map((b) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 rounded-xl bg-gradient-hero text-white flex items-center justify-center",
							children: /* @__PURE__ */ jsx(b.i, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "font-display text-lg font-bold text-brand-deep mt-3",
							children: b.t
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground mt-1",
							children: b.s
						})
					]
				}, b.t))
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-10 bg-gradient-cream",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px",
				children: [/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Volume pricing",
					title: "Bulk pricing slabs",
					subtitle: "Indicative pricing — final quote includes branding, samples and freight."
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-2xl border border-border bg-white",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-secondary text-brand-deep",
							children: /* @__PURE__ */ jsx("tr", { children: [
								"Quantity (boxes)",
								"Indicative discount",
								"Free shipping",
								"Branding options"
							].map((h) => /* @__PURE__ */ jsx("th", {
								className: "text-left p-4 font-semibold",
								children: h
							}, h)) })
						}), /* @__PURE__ */ jsxs("tbody", {
							className: "[&_tr]:border-t [&_tr]:border-border",
							children: [
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "50 – 99"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-brand font-bold",
										children: "10%"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "✓"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "Sticker branding"
									})
								] }),
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "100 – 249"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-brand font-bold",
										children: "15%"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "✓"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "Sleeve + sticker"
									})
								] }),
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "250 – 499"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-brand font-bold",
										children: "20%"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "✓"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "Custom sleeve + insert"
									})
								] }),
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "500+"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-brand font-bold",
										children: "25%+"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "✓"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: "Fully custom box"
									})
								] })
							]
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			id: "quote",
			className: "py-14",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-3xl mx-auto container-px",
				children: [/* @__PURE__ */ jsx(SectionHeader, {
					eyebrow: "Get in touch",
					title: "Request a Quote"
				}), sent ? /* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-10 text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-14 h-14 rounded-full bg-gradient-hero text-white mx-auto flex items-center justify-center",
							children: /* @__PURE__ */ jsx(BadgeCheck, { className: "w-7 h-7" })
						}),
						/* @__PURE__ */ jsx("div", {
							className: "font-display text-2xl font-bold text-brand-deep mt-4",
							children: "Thank you!"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-muted-foreground mt-2",
							children: "Our corporate team will reach out within 24 hours."
						})
					]
				}) : /* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						setSent(true);
						toast.success("Quote request received");
					},
					className: "bg-white border border-border rounded-2xl p-8 grid md:grid-cols-2 gap-4 shadow-soft",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Company name *" }), /* @__PURE__ */ jsx(Input, { required: true })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Contact person *" }), /* @__PURE__ */ jsx(Input, { required: true })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Email *" }), /* @__PURE__ */ jsx(Input, {
								type: "email",
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Phone *" }), /* @__PURE__ */ jsx(Input, { required: true })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Estimated quantity *" }), /* @__PURE__ */ jsx(Input, {
								required: true,
								placeholder: "e.g. 250 boxes"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Occasion" }), /* @__PURE__ */ jsx(Input, { placeholder: "Diwali / Onboarding / Annual gifting" })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5 md:col-span-2",
							children: [/* @__PURE__ */ jsx(Label, { children: "Notes" }), /* @__PURE__ */ jsx(Textarea, {
								rows: 4,
								placeholder: "Tell us about your branding needs, timeline, or budget…"
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							className: "md:col-span-2 bg-gradient-hero text-white h-12 shadow-elegant",
							children: "Submit Request"
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { Corporate as component };
