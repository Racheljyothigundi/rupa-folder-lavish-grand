import { t as supabase } from "./client-K-6dw9l-.js";
import { d as useAuth, s as subscriptionPlans, u as inr } from "./catalog-BiCt1DYe.js";
import { c as Button, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import { t as SectionHeader } from "./SectionHeader-DOsqMmTZ.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { BadgeCheck, Loader2, Repeat, ShieldCheck, Truck } from "lucide-react";
//#region src/routes/subscriptions.tsx?tsr-split=component
function Subscriptions() {
	const { user, requireAuth } = useAuth();
	const nav = useNavigate();
	const [savingPlanId, setSavingPlanId] = useState(null);
	async function subscribe(planId) {
		if (!requireAuth() || !user) return;
		setSavingPlanId(planId);
		const nextBillingDate = /* @__PURE__ */ new Date();
		nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
		const { error } = await supabase.from("user_subscriptions").insert({
			user_id: user.id,
			plan_id: planId,
			status: "active",
			next_billing_date: nextBillingDate.toISOString().slice(0, 10)
		});
		if (error) {
			console.error("[Subscriptions] Failed to subscribe", error);
			toast.error("Could not add subscription");
		} else {
			toast.success("Subscription added");
			nav({
				to: "/account",
				search: { tab: "subscriptions" }
			});
		}
		setSavingPlanId(null);
	}
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "bg-gradient-deep text-white py-16",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
					children: "Subscribe & Save"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-5xl md:text-6xl font-bold mt-3",
					children: "Health delivered, monthly"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-white/70 max-w-xl mx-auto mt-3",
					children: "Pick a plan, set your delivery date, and we'll keep your kitchen stocked with the freshest dry fruits — automatically."
				})
			]
		})
	}), /* @__PURE__ */ jsxs("section", {
		className: "py-14",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto container-px grid sm:grid-cols-3 gap-5 text-center mb-14",
				children: [
					{
						i: Repeat,
						t: "Flexible",
						s: "Skip, pause or cancel anytime"
					},
					{
						i: Truck,
						t: "Free delivery",
						s: "On every subscription order"
					},
					{
						i: ShieldCheck,
						t: "5% off",
						s: "Subscriber discount on every box"
					}
				].map((b) => /* @__PURE__ */ jsxs("div", {
					className: "bg-white rounded-2xl p-6 border border-border shadow-soft",
					children: [
						/* @__PURE__ */ jsx(b.i, { className: "w-7 h-7 mx-auto text-brand" }),
						/* @__PURE__ */ jsx("div", {
							className: "font-display text-lg font-bold text-brand-deep mt-2",
							children: b.t
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground",
							children: b.s
						})
					]
				}, b.t))
			}),
			/* @__PURE__ */ jsx(SectionHeader, { title: "Choose Your Plan" }),
			/* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto container-px grid md:grid-cols-2 lg:grid-cols-4 gap-5",
				children: subscriptionPlans.map((s) => /* @__PURE__ */ jsxs("div", {
					className: "relative bg-white border border-border rounded-2xl p-6 hover:border-brand/40 hover:shadow-elegant transition-all",
					children: [
						s.badge && /* @__PURE__ */ jsx("div", {
							className: "absolute top-4 right-4 bg-gradient-gold text-brand-deep text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
							children: s.badge
						}),
						/* @__PURE__ */ jsx("div", {
							className: "font-display text-2xl font-bold text-brand-deep",
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
							className: "w-full mt-6 bg-gradient-hero text-white shadow-elegant",
							disabled: savingPlanId === s.id,
							onClick: () => subscribe(s.id),
							children: savingPlanId === s.id ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Adding..."] }) : "Subscribe"
						})
					]
				}, s.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "text-center mt-12 text-muted-foreground text-sm",
				children: ["Custom plan needs? ", /* @__PURE__ */ jsx(Link, {
					to: "/contact",
					className: "text-brand font-semibold hover:underline",
					children: "Talk to our nutrition team →"
				})]
			})
		]
	})] });
}
//#endregion
export { Subscriptions as component };
