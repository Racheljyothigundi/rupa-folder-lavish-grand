import { p as useCart, u as inr } from "./catalog-CuoH-XyD.js";
import { c as Button, l as cn, n as Label, s as Input, t as SiteLayout } from "./SiteLayout-pGyUNl4u.js";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { BadgeCheck, Circle, CreditCard, ShieldCheck, Truck } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/components/ui/radio-group.tsx
var RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/routes/checkout.tsx?tsr-split=component
function Checkout() {
	const cart = useCart();
	const nav = useNavigate();
	const [done, setDone] = useState(false);
	const ship = cart.subtotal > 999 ? 0 : 79;
	const total = cart.subtotal + ship;
	if (done) return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-2xl mx-auto container-px py-20 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "w-16 h-16 rounded-full bg-gradient-hero text-white mx-auto flex items-center justify-center",
				children: /* @__PURE__ */ jsx(BadgeCheck, { className: "w-8 h-8" })
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-4xl font-bold text-brand-deep mt-5",
				children: "Order Placed!"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-muted-foreground mt-2",
				children: [
					"Order #LG",
					Date.now().toString().slice(-6),
					" confirmed. We've emailed your invoice."
				]
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: () => nav({ to: "/" }),
				className: "mt-6 bg-brand text-brand-foreground",
				children: "Back to Home"
			})
		]
	}) });
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-7xl mx-auto container-px py-10",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-4xl font-bold text-brand-deep mb-6",
			children: "Checkout"
		}), /* @__PURE__ */ jsxs("form", {
			className: "grid lg:grid-cols-[1fr_400px] gap-8",
			onSubmit: (e) => {
				e.preventDefault();
				cart.clear();
				setDone(true);
				toast.success("Order placed");
			},
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-bold text-brand-deep mb-4",
						children: "Shipping Address"
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Full name *" }), /* @__PURE__ */ jsx(Input, { required: true })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Phone *" }), /* @__PURE__ */ jsx(Input, { required: true })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Address line *" }), /* @__PURE__ */ jsx(Input, { required: true })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "City *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									defaultValue: "Hyderabad"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Pincode *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									defaultValue: "500051"
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-xl font-bold text-brand-deep mb-4",
						children: "Payment Method"
					}), /* @__PURE__ */ jsx(RadioGroup, {
						defaultValue: "card",
						className: "space-y-2",
						children: [
							{
								v: "card",
								l: "Credit / Debit Card",
								i: CreditCard
							},
							{
								v: "upi",
								l: "UPI",
								i: ShieldCheck
							},
							{
								v: "cod",
								l: "Cash on Delivery",
								i: Truck
							}
						].map((p) => /* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-3 p-3 border border-border rounded-xl hover:border-brand cursor-pointer",
							children: [
								/* @__PURE__ */ jsx(RadioGroupItem, { value: p.v }),
								/* @__PURE__ */ jsx(p.i, { className: "w-5 h-5 text-brand" }),
								/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: p.l
								})
							]
						}, p.v))
					})]
				})]
			}), /* @__PURE__ */ jsxs("aside", {
				className: "bg-white rounded-2xl border border-border p-6 shadow-soft h-fit lg:sticky lg:top-32",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-display text-xl font-bold text-brand-deep",
						children: "Order Summary"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 space-y-2 max-h-64 overflow-auto",
						children: cart.lines.map((l) => /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "text-foreground/80 truncate pr-2",
								children: [
									l.name,
									" × ",
									l.count
								]
							}), /* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: inr(l.price * l.count)
							})]
						}, l.id))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-t border-border mt-4 pt-4 space-y-2 text-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Subtotal"
							}), /* @__PURE__ */ jsx("span", { children: inr(cart.subtotal) })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Shipping"
							}), /* @__PURE__ */ jsx("span", { children: ship === 0 ? "Free" : inr(ship) })]
						})]
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
						type: "submit",
						disabled: cart.lines.length === 0,
						className: "w-full mt-5 bg-gradient-hero text-white h-12 shadow-elegant",
						children: "Place Order"
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { Checkout as component };
