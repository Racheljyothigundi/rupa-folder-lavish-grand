import { t as supabase } from "./client-K-6dw9l-.js";
import { d as useAuth, f as useAuthModal, m as useWishlist, o as products, s as subscriptionPlans, u as inr } from "./catalog-BiCt1DYe.js";
import { t as Route } from "./account-DOzRB7Ai.js";
import { a as TabsList, c as Button, i as TabsContent, o as TabsTrigger, r as Tabs, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Gift, Heart, LayoutDashboard, Loader2, Package, Repeat, ShoppingBag, User } from "lucide-react";
//#region src/routes/account.tsx?tsr-split=component
var statusLabels = {
	pending: "Pending",
	confirmed: "Confirmed",
	processing: "Processing",
	shipped: "Shipped",
	delivered: "Delivered",
	cancelled: "Cancelled",
	refunded: "Refunded"
};
var statusTone = {
	pending: "bg-amber-100 text-amber-700",
	confirmed: "bg-sky-100 text-sky-700",
	processing: "bg-indigo-100 text-indigo-700",
	shipped: "bg-cyan-100 text-cyan-700",
	delivered: "bg-emerald-100 text-emerald-700",
	cancelled: "bg-red-100 text-red-700",
	refunded: "bg-slate-100 text-slate-700"
};
function Account() {
	const { tab } = Route.useSearch();
	const { user, logout, loading } = useAuth();
	const modal = useAuthModal();
	const wish = useWishlist();
	const [orders, setOrders] = useState([]);
	const [ordersLoading, setOrdersLoading] = useState(false);
	const [subscriptions, setSubscriptions] = useState([]);
	const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
	const [subscriptionActionId, setSubscriptionActionId] = useState(null);
	useEffect(() => {
		if (!user) return;
		let cancelled = false;
		async function loadOrders() {
			setOrdersLoading(true);
			const { data, error } = await supabase.from("orders").select("*, items:order_items(id, item_name, quantity, total_price)").order("created_at", { ascending: false });
			if (cancelled) return;
			if (error) console.error("[Account] Failed to load orders", error);
			else setOrders(data ?? []);
			setOrdersLoading(false);
		}
		loadOrders();
		const channel = supabase.channel(`customer-orders-${user.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "orders",
			filter: `user_id=eq.${user.id}`
		}, () => loadOrders()).subscribe();
		return () => {
			cancelled = true;
			supabase.removeChannel(channel);
		};
	}, [user?.id]);
	useEffect(() => {
		if (!user) return;
		let cancelled = false;
		async function loadSubscriptions() {
			setSubscriptionsLoading(true);
			const { data, error } = await supabase.from("user_subscriptions").select("id, plan_id, status, start_date, next_billing_date").order("created_at", { ascending: false });
			if (cancelled) return;
			if (error) console.error("[Account] Failed to load subscriptions", error);
			else setSubscriptions(data ?? []);
			setSubscriptionsLoading(false);
		}
		loadSubscriptions();
		const channel = supabase.channel(`customer-subscriptions-${user.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "user_subscriptions",
			filter: `user_id=eq.${user.id}`
		}, () => loadSubscriptions()).subscribe();
		return () => {
			cancelled = true;
			supabase.removeChannel(channel);
		};
	}, [user?.id]);
	async function updateSubscription(subscription, patch, message) {
		setSubscriptionActionId(subscription.id);
		const { error } = await supabase.from("user_subscriptions").update(patch).eq("id", subscription.id);
		if (error) {
			console.error("[Account] Failed to update subscription", error);
			toast.error("Could not update subscription");
		} else {
			setSubscriptions((current) => current.map((item) => item.id === subscription.id ? {
				...item,
				...patch
			} : item));
			toast.success(message);
		}
		setSubscriptionActionId(null);
	}
	async function skipNextDelivery(subscription) {
		const nextDate = new Date(subscription.next_billing_date);
		nextDate.setMonth(nextDate.getMonth() + 1);
		await updateSubscription(subscription, { next_billing_date: nextDate.toISOString().slice(0, 10) }, "Next delivery skipped");
	}
	async function pauseSubscription(subscription) {
		await updateSubscription(subscription, { status: "paused" }, "Subscription paused");
	}
	async function removeSubscription(subscription) {
		if (typeof window !== "undefined" && !window.confirm("Remove this subscription?")) return;
		setSubscriptionActionId(subscription.id);
		const { error } = await supabase.from("user_subscriptions").delete().eq("id", subscription.id);
		if (error) {
			console.error("[Account] Failed to remove subscription", error);
			toast.error("Could not remove subscription");
		} else {
			setSubscriptions((current) => current.filter((item) => item.id !== subscription.id));
			toast.success("Subscription removed");
		}
		setSubscriptionActionId(null);
	}
	const wishItems = products.filter((p) => wish.has(p.id));
	const orderItemCount = useMemo(() => orders.reduce((sum, order) => sum + (order.items?.reduce((itemSum, item) => itemSum + item.quantity, 0) ?? 0), 0), [orders]);
	if (loading) return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-md mx-auto container-px py-24 text-center",
		children: [/* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin mx-auto text-brand" }), /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-muted-foreground",
			children: "Loading your account…"
		})]
	}) });
	if (!user) return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-md mx-auto container-px py-24 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "w-14 h-14 rounded-full bg-gradient-hero text-white mx-auto flex items-center justify-center",
				children: /* @__PURE__ */ jsx(User, { className: "w-7 h-7" })
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-3xl font-bold text-brand-deep mt-4",
				children: "Sign in to continue"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-2",
				children: "Manage your orders, subscriptions, gift boxes and profile."
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: () => modal.trigger(),
				className: "mt-6 bg-gradient-hero text-white",
				children: "Sign In / Create Account"
			})
		]
	}) });
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "bg-gradient-deep text-white py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px flex items-center gap-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-14 h-14 rounded-full bg-gradient-gold text-brand-deep flex items-center justify-center font-display text-xl font-bold",
					children: user.name[0]?.toUpperCase()
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "text-xs text-brand-cyan uppercase tracking-[0.2em]",
					children: "Welcome back"
				}), /* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl font-bold",
					children: user.name
				})] }),
				/* @__PURE__ */ jsx(Button, {
					onClick: logout,
					variant: "outline",
					className: "ml-auto border-white/20 text-white hover:bg-white/10",
					children: "Sign Out"
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "max-w-7xl mx-auto container-px py-10",
		children: /* @__PURE__ */ jsxs(Tabs, {
			value: tab,
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "bg-secondary mb-6 flex-wrap",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "dashboard",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account",
								search: { tab: "dashboard" },
								className: "gap-2",
								children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "w-4 h-4" }), "Dashboard"]
							})
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "orders",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account",
								search: { tab: "orders" },
								className: "gap-2",
								children: [/* @__PURE__ */ jsx(Package, { className: "w-4 h-4" }), "Orders"]
							})
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "subscriptions",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account",
								search: { tab: "subscriptions" },
								className: "gap-2",
								children: [/* @__PURE__ */ jsx(Repeat, { className: "w-4 h-4" }), "Subscriptions"]
							})
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "wishlist",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account",
								search: { tab: "wishlist" },
								className: "gap-2",
								children: [/* @__PURE__ */ jsx(Heart, { className: "w-4 h-4" }), "Wishlist"]
							})
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "profile",
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/account",
								search: { tab: "profile" },
								className: "gap-2",
								children: [/* @__PURE__ */ jsx(User, { className: "w-4 h-4" }), "Profile"]
							})
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "dashboard",
					className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						{
							i: ShoppingBag,
							l: "Orders",
							v: orders.length
						},
						{
							i: Repeat,
							l: "Active Subscriptions",
							v: subscriptions.filter((item) => item.status === "active").length
						},
						{
							i: Heart,
							l: "Saved Items",
							v: wish.ids.length
						},
						{
							i: Gift,
							l: "Ordered Items",
							v: orderItemCount
						}
					].map((s) => /* @__PURE__ */ jsxs("div", {
						className: "bg-white border border-border rounded-2xl p-5 shadow-soft",
						children: [
							/* @__PURE__ */ jsx(s.i, { className: "w-6 h-6 text-brand" }),
							/* @__PURE__ */ jsx("div", {
								className: "font-display text-3xl font-bold text-brand-deep mt-2",
								children: s.v
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground",
								children: s.l
							})
						]
					}, s.l))
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "orders",
					children: /* @__PURE__ */ jsx("div", {
						className: "bg-white border border-border rounded-2xl overflow-hidden",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-secondary text-brand-deep",
								children: /* @__PURE__ */ jsx("tr", { children: [
									"Order ID",
									"Date",
									"Items",
									"Total",
									"Status",
									""
								].map((h) => /* @__PURE__ */ jsx("th", {
									className: "text-left p-4 font-semibold",
									children: h
								}, h)) })
							}), /* @__PURE__ */ jsxs("tbody", {
								className: "[&_tr]:border-t [&_tr]:border-border",
								children: [
									ordersLoading && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", {
										colSpan: 6,
										className: "p-8 text-center text-muted-foreground",
										children: [/* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin mx-auto mb-2" }), "Loading orders"]
									}) }),
									!ordersLoading && orders.map((o) => /* @__PURE__ */ jsxs("tr", { children: [
										/* @__PURE__ */ jsx("td", {
											className: "p-4 font-mono text-brand",
											children: o.order_number
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4",
											children: new Date(o.created_at).toLocaleDateString("en-IN")
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4",
											children: o.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "p-4 font-semibold",
											children: [inr(Number(o.total_amount)), /* @__PURE__ */ jsxs("div", {
												className: "text-xs text-muted-foreground",
												children: ["Delivery ", o.shipping_cost ? inr(Number(o.shipping_cost)) : "Free"]
											})]
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "p-4",
											children: [/* @__PURE__ */ jsx("span", {
												className: `text-xs px-2 py-1 rounded-full font-semibold ${statusTone[o.status]}`,
												children: statusLabels[o.status]
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground mt-1",
												children: o.payment_status
											})]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4 text-right",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/account",
												search: { tab: "orders" },
												className: "text-brand hover:underline text-sm",
												children: "Track"
											})
										})
									] }, o.id)),
									!ordersLoading && orders.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
										colSpan: 6,
										className: "p-8 text-center text-muted-foreground",
										children: "No orders yet."
									}) })
								]
							})]
						})
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "subscriptions",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-5",
						children: [
							subscriptionsLoading && /* @__PURE__ */ jsxs("div", {
								className: "bg-white border border-border rounded-2xl p-10 text-center text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin mx-auto mb-2" }), "Loading subscriptions"]
							}),
							!subscriptionsLoading && subscriptions.map((subscription) => {
								const plan = subscriptionPlans.find((item) => item.id === subscription.plan_id);
								const busy = subscriptionActionId === subscription.id;
								return /* @__PURE__ */ jsxs("div", {
									className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: `text-xs px-2 py-0.5 rounded-full inline-block font-semibold ${subscription.status === "active" ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`,
											children: subscription.status.toUpperCase()
										}),
										/* @__PURE__ */ jsx("div", {
											className: "font-display text-2xl font-bold text-brand-deep mt-2",
											children: plan?.name ?? "Subscription Plan"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "text-sm text-muted-foreground",
											children: ["Next delivery: ", new Date(subscription.next_billing_date).toLocaleDateString("en-IN", {
												day: "numeric",
												month: "short",
												year: "numeric"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "font-display text-2xl font-bold text-brand mt-3",
											children: [
												inr(plan?.monthly ?? 0),
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "text-sm text-muted-foreground",
													children: "/month"
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap gap-2 mt-4",
											children: [
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "sm",
													disabled: busy || subscription.status !== "active",
													onClick: () => skipNextDelivery(subscription),
													children: "Skip next"
												}),
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "sm",
													disabled: busy || subscription.status !== "active",
													className: "text-amber-700 border-amber-300",
													onClick: () => pauseSubscription(subscription),
													children: "Pause"
												}),
												/* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "sm",
													disabled: busy,
													className: "text-destructive border-destructive/30",
													onClick: () => removeSubscription(subscription),
													children: "Remove"
												})
											]
										})
									]
								}, subscription.id);
							}),
							!subscriptionsLoading && subscriptions.length === 0 && /* @__PURE__ */ jsxs("div", {
								className: "bg-white border border-border rounded-2xl p-10 text-center",
								children: [
									/* @__PURE__ */ jsx(Repeat, { className: "w-8 h-8 text-brand mx-auto" }),
									/* @__PURE__ */ jsx("div", {
										className: "font-display text-2xl font-bold text-brand-deep mt-3",
										children: "No active subscriptions"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-muted-foreground mt-1",
										children: "Add a plan whenever you need regular monthly delivery."
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gradient-cream border-2 border-dashed border-brand/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center",
								children: [
									/* @__PURE__ */ jsx(Repeat, { className: "w-8 h-8 text-brand" }),
									/* @__PURE__ */ jsx("div", {
										className: "font-display font-bold text-brand-deep mt-2",
										children: "Add another plan"
									}),
									/* @__PURE__ */ jsx(Button, {
										asChild: true,
										className: "mt-3 bg-brand text-brand-foreground",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/subscriptions",
											children: "Browse Plans"
										})
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "wishlist",
					children: wishItems.length === 0 ? /* @__PURE__ */ jsx("div", {
						className: "text-center py-10 text-muted-foreground",
						children: "No saved items yet."
					}) : /* @__PURE__ */ jsx("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
						children: wishItems.map((p) => /* @__PURE__ */ jsxs("div", {
							className: "bg-white border border-border rounded-2xl overflow-hidden",
							children: [/* @__PURE__ */ jsx("img", {
								src: p.image,
								alt: p.name,
								className: "w-full aspect-square object-cover"
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-semibold text-brand-deep text-sm line-clamp-1",
									children: p.name
								}), /* @__PURE__ */ jsx("div", {
									className: "text-brand font-bold mt-1",
									children: inr(Math.round(p.mrp * (1 - p.discount / 100)))
								})]
							})]
						}, p.id))
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "profile",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-white border border-border rounded-2xl p-6 shadow-soft max-w-xl space-y-3",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground uppercase tracking-wider",
								children: "Name"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-semibold",
								children: user.name
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground uppercase tracking-wider",
								children: "Email"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-semibold",
								children: user.email
							})] }),
							user.phone && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground uppercase tracking-wider",
								children: "Phone"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-semibold",
								children: user.phone
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground uppercase tracking-wider",
								children: "Role"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-semibold capitalize",
								children: user.role
							})] })
						]
					})
				})
			]
		})
	})] });
}
//#endregion
export { Account as component };
