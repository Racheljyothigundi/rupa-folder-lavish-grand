import { t as supabase } from "./client-K-6dw9l-.js";
import { d as useAuth, p as useCart, u as inr } from "./catalog-BiCt1DYe.js";
import { c as Button, l as cn, n as Label, s as Input, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import { t as getDeliveryCharge } from "./shipping-YP6RYrv7.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { BadgeCheck, Circle, CreditCard, Loader2, ShieldCheck, Truck } from "lucide-react";
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
	const auth = useAuth();
	const nav = useNavigate();
	const [done, setDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("razorpay");
	const [order, setOrder] = useState(null);
	const [form, setForm] = useState({
		fullName: "",
		phone: "",
		address: "",
		city: "Hyderabad",
		pincode: "500051"
	});
	const ship = getDeliveryCharge(cart.subtotal);
	const total = cart.subtotal + ship;
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);
	const verifyPayment = async (razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId) => {
		try {
			const { data: { session } } = await supabase.auth.getSession();
			if (!session) throw new Error("Not authenticated");
			const { data: result, error } = await supabase.functions.invoke("verify-payment", { body: {
				razorpay_order_id,
				razorpay_payment_id,
				razorpay_signature,
				order_id: orderId
			} });
			if (error) throw new Error(error.message || "Verification failed");
			if (!result?.order) throw new Error("Payment verified, but the order was not returned");
			setOrder(result.order);
			cart.clear();
			setDone(true);
			toast.success("Payment successful! Order confirmed.");
		} catch (err) {
			console.error("Payment verification failed:", err);
			toast.error("Payment verification failed. Please contact support.");
		} finally {
			setLoading(false);
		}
	};
	const openRazorpayCheckout = (razorpayOrderId, orderId, amount, keyId) => {
		const options = {
			key: keyId || "rzp_test_YourKeyIdHere",
			amount: Math.round(amount * 100),
			currency: "INR",
			name: "Lavish Grand Traders",
			description: "Premium Dry Fruits & Gifting",
			order_id: razorpayOrderId,
			handler: (response) => {
				verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature, orderId);
			},
			prefill: {
				name: form.fullName,
				email: auth.user?.email,
				contact: form.phone
			},
			theme: { color: "#1e3a32" },
			modal: { ondismiss: () => {
				setLoading(false);
				toast.info("Payment cancelled. You can try again.");
			} }
		};
		new window.Razorpay(options).open();
	};
	const createOrder = async (e) => {
		e.preventDefault();
		if (!auth.requireAuth()) return;
		if (cart.lines.length === 0) {
			toast.error("Your cart is empty");
			return;
		}
		setLoading(true);
		try {
			const { data: { session } } = await supabase.auth.getSession();
			if (!session) throw new Error("Not authenticated");
			const { data: result, error } = await supabase.functions.invoke("create-order", { body: {
				cart_items: cart.lines.map((line) => ({
					id: line.id,
					name: line.name,
					qty: line.qty,
					image: line.image,
					price: line.price,
					count: line.count
				})),
				shipping_name: form.fullName,
				shipping_phone: form.phone,
				shipping_address_line1: form.address,
				shipping_city: form.city,
				shipping_state: "Telangana",
				shipping_pincode: form.pincode,
				payment_method: paymentMethod === "cod" ? "cod" : "razorpay"
			} });
			if (error) throw new Error(error.message || "Order creation failed");
			if (!result?.order) throw new Error("Order creation failed");
			if (paymentMethod === "cod") {
				setOrder(result.order);
				cart.clear();
				setDone(true);
				toast.success("Order placed successfully!");
			} else if (result.razorpay_order_id) openRazorpayCheckout(result.razorpay_order_id, result.order.id, result.order.total_amount, result.razorpay_key_id);
			else throw new Error("Failed to initialize payment");
		} catch (err) {
			console.error("Order creation failed:", err);
			toast.error(err.message || "Failed to place order");
			setLoading(false);
		}
	};
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
					"Order #",
					order?.order_number || `LG${Date.now().toString().slice(-6)}`,
					" confirmed.",
					paymentMethod === "cod" ? " Pay cash on delivery." : " We've emailed your invoice."
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
			onSubmit: createOrder,
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
								children: [/* @__PURE__ */ jsx(Label, { children: "Full name *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.fullName,
									onChange: (e) => setForm({
										...form,
										fullName: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Phone *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									type: "tel",
									value: form.phone,
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "Address line *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.address,
									onChange: (e) => setForm({
										...form,
										address: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "City *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.city,
									onChange: (e) => setForm({
										...form,
										city: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Pincode *" }), /* @__PURE__ */ jsx(Input, {
									required: true,
									value: form.pincode,
									onChange: (e) => setForm({
										...form,
										pincode: e.target.value
									})
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-xl font-bold text-brand-deep mb-4",
							children: "Payment Method"
						}),
						/* @__PURE__ */ jsx(RadioGroup, {
							value: paymentMethod,
							onValueChange: setPaymentMethod,
							className: "space-y-2",
							children: [{
								v: "razorpay",
								l: "Card / UPI / NetBanking",
								i: CreditCard
							}, {
								v: "cod",
								l: "Cash on Delivery",
								i: Truck
							}].map((p) => /* @__PURE__ */ jsxs("label", {
								className: `flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === p.v ? "border-brand bg-brand/5" : "border-border hover:border-brand/50"}`,
								children: [
									/* @__PURE__ */ jsx(RadioGroupItem, { value: p.v }),
									/* @__PURE__ */ jsx(p.i, { className: "w-5 h-5 text-brand" }),
									/* @__PURE__ */ jsx("span", {
										className: "font-medium",
										children: p.l
									})
								]
							}, p.v))
						}),
						paymentMethod === "razorpay" && /* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-brand" }), "Secure payment powered by Razorpay"]
						})
					]
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
									" x ",
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
						disabled: cart.lines.length === 0 || loading,
						className: "w-full mt-5 bg-gradient-hero text-white h-12 shadow-elegant",
						children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Processing..."] }) : paymentMethod === "cod" ? "Place Order (COD)" : `Pay ${inr(total)}`
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { Checkout as component };
