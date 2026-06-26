import { t as supabase } from "./client-K-6dw9l-.js";
import { d as useAuth, f as useAuthModal, o as products, u as inr } from "./catalog-BiCt1DYe.js";
import { t as Route } from "./admin-C7H14CQz.js";
import { a as TabsList, c as DialogContent, f as Button, i as TabsContent, l as DialogHeader, o as TabsTrigger, p as cn, r as Tabs, s as Dialog, t as SiteLayout, u as DialogTitle } from "./SiteLayout-Bu9JhwBf.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { AlertTriangle, ArrowUpRight, BarChart3, Check, ChevronDown, ChevronUp, Loader2, Package, ShieldAlert, ShoppingBag, TrendingUp, Users } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/routes/admin.tsx?tsr-split=component
var orderStatuses = [
	"pending",
	"confirmed",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
	"refunded"
];
var statusLabels = {
	pending: "Pending",
	confirmed: "Confirmed",
	processing: "Processing",
	shipped: "Shipped",
	delivered: "Delivered",
	cancelled: "Cancelled",
	refunded: "Refunded"
};
function Admin() {
	const { tab } = Route.useSearch();
	const { user } = useAuth();
	const modal = useAuthModal();
	const [orders, setOrders] = useState([]);
	const [loadingOrders, setLoadingOrders] = useState(false);
	const [updatingId, setUpdatingId] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);
	useEffect(() => {
		if (user?.role !== "admin") return;
		let cancelled = false;
		async function loadOrders() {
			setLoadingOrders(true);
			const { data, error } = await supabase.from("orders").select("*, items:order_items(id, item_name, quantity, unit_price, total_price)").order("created_at", { ascending: false });
			if (cancelled) return;
			if (error) {
				console.error("[Admin] Failed to load orders", error);
				toast.error("Could not load orders");
			} else setOrders(data ?? []);
			setLoadingOrders(false);
		}
		loadOrders();
		const channel = supabase.channel("admin-orders").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "orders"
		}, () => loadOrders()).subscribe();
		const refresh = window.setInterval(loadOrders, 7e3);
		return () => {
			cancelled = true;
			window.clearInterval(refresh);
			supabase.removeChannel(channel);
		};
	}, [user?.role]);
	if (!user) return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-md mx-auto py-24 text-center container-px",
		children: [
			/* @__PURE__ */ jsx(ShieldAlert, { className: "w-12 h-12 mx-auto text-brand" }),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-3xl font-bold text-brand-deep mt-4",
				children: "Admin sign-in required"
			}),
			/* @__PURE__ */ jsx(Button, {
				onClick: () => modal.trigger(),
				className: "mt-6 bg-gradient-hero text-white",
				children: "Sign In"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground mt-4",
				children: ["Temporary admin: ", /* @__PURE__ */ jsx("b", { children: "lavanya.boga@lavishgrand.com" })]
			})
		]
	}) });
	if (user.role !== "admin") return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-md mx-auto py-24 text-center container-px",
		children: [
			/* @__PURE__ */ jsx(ShieldAlert, { className: "w-12 h-12 mx-auto text-destructive" }),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-3xl font-bold text-brand-deep mt-4",
				children: "Not authorized"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-2",
				children: "Only admins can access this console."
			}),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "mt-6 bg-brand text-brand-foreground",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					children: "Back to Home"
				})
			})
		]
	}) });
	const lowStock = products.filter((p) => p.stock < 70);
	const today = (/* @__PURE__ */ new Date()).toDateString();
	const ordersToday = orders.filter((order) => new Date(order.created_at).toDateString() === today).length;
	const revenue = orders.filter((order) => !["cancelled", "refunded"].includes(order.status)).reduce((sum, order) => sum + Number(order.total_amount), 0);
	const activeCustomers = useMemo(() => new Set(orders.map((order) => `${order.shipping_phone}-${order.shipping_name}`)).size, [orders]);
	async function updateOrderStatus(order, status) {
		setUpdatingId(order.id);
		const stamp = status === "confirmed" ? { confirmed_at: (/* @__PURE__ */ new Date()).toISOString() } : status === "shipped" ? { shipped_at: (/* @__PURE__ */ new Date()).toISOString() } : status === "delivered" ? { delivered_at: (/* @__PURE__ */ new Date()).toISOString() } : {};
		const { error } = await supabase.from("orders").update({
			status,
			...stamp
		}).eq("id", order.id);
		if (error) {
			console.error("[Admin] Failed to update order", error);
			toast.error("Could not update order status");
		} else {
			setOrders((current) => current.map((item) => item.id === order.id ? {
				...item,
				status
			} : item));
			toast.success(`Order ${order.order_number} marked ${statusLabels[status]}`);
		}
		setUpdatingId(null);
	}
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "bg-gradient-deep text-white py-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "w-10 h-10 rounded-xl bg-gradient-gold text-brand-deep flex items-center justify-center font-bold",
					children: "A"
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "text-xs text-brand-cyan uppercase tracking-[0.2em]",
					children: "Admin Console"
				}), /* @__PURE__ */ jsx("h1", {
					className: "font-display text-2xl font-bold",
					children: "Lavish Grand Operations"
				})] })]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "max-w-7xl mx-auto container-px py-8",
			children: /* @__PURE__ */ jsxs(Tabs, {
				value: tab,
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "bg-secondary mb-6 flex-wrap",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "overview",
								asChild: true,
								children: /* @__PURE__ */ jsx(Link, {
									to: "/admin",
									search: { tab: "overview" },
									children: "Overview"
								})
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "orders",
								asChild: true,
								children: /* @__PURE__ */ jsx(Link, {
									to: "/admin",
									search: { tab: "orders" },
									children: "Orders"
								})
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "inventory",
								asChild: true,
								children: /* @__PURE__ */ jsx(Link, {
									to: "/admin",
									search: { tab: "inventory" },
									children: "Inventory"
								})
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "customers",
								asChild: true,
								children: /* @__PURE__ */ jsx(Link, {
									to: "/admin",
									search: { tab: "customers" },
									children: "Customers"
								})
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "reports",
								asChild: true,
								children: /* @__PURE__ */ jsx(Link, {
									to: "/admin",
									search: { tab: "reports" },
									children: "Reports"
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "overview",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
							children: [
								{
									l: "Revenue",
									v: inr(revenue),
									d: `${orders.length} orders`,
									i: TrendingUp
								},
								{
									l: "Orders Today",
									v: ordersToday,
									d: "Live",
									i: ShoppingBag
								},
								{
									l: "Active Customers",
									v: activeCustomers,
									d: "From orders",
									i: Users
								},
								{
									l: "Inventory SKUs",
									v: products.length,
									d: `${lowStock.length} low`,
									i: Package
								}
							].map((s) => /* @__PURE__ */ jsxs("div", {
								className: "bg-white border border-border rounded-2xl p-5 shadow-soft",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsx(s.i, { className: "w-5 h-5 text-brand" }), /* @__PURE__ */ jsxs("span", {
											className: "text-xs text-emerald-700 font-semibold flex items-center gap-0.5",
											children: [/* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3" }), s.d]
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "font-display text-3xl font-bold text-brand-deep mt-3",
										children: s.v
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-sm text-muted-foreground",
										children: s.l
									})
								]
							}, s.l))
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid lg:grid-cols-2 gap-5",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-display font-bold text-brand-deep mb-3",
									children: "Recent Orders"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-2 text-sm",
									children: [
										loadingOrders && /* @__PURE__ */ jsxs("div", {
											className: "py-6 text-muted-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }), " Loading orders"]
										}),
										!loadingOrders && orders.slice(0, 6).map((o) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between py-2 border-b last:border-b-0 border-border",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
												className: "font-mono text-brand",
												children: o.order_number
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground",
												children: o.shipping_name
											})] }), /* @__PURE__ */ jsxs("div", {
												className: "text-right",
												children: [/* @__PURE__ */ jsx("div", {
													className: "font-bold",
													children: inr(Number(o.total_amount))
												}), /* @__PURE__ */ jsx("div", {
													className: "text-xs text-muted-foreground",
													children: statusLabels[o.status]
												})]
											})]
										}, o.id)),
										!loadingOrders && orders.length === 0 && /* @__PURE__ */ jsx("div", {
											className: "py-6 text-muted-foreground",
											children: "No orders yet."
										})
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "font-display font-bold text-brand-deep mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-amber-500" }), " Low Stock Alerts"]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-2 text-sm",
									children: lowStock.slice(0, 6).map((p) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between py-2 border-b last:border-b-0 border-border",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "font-semibold",
											children: p.name
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: p.qty
										})] }), /* @__PURE__ */ jsxs("div", {
											className: "font-bold text-amber-600",
											children: [p.stock, " left"]
										})]
									}, p.id))
								})]
							})]
						})]
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
										"Customer",
										"Items",
										"Total",
										"Payment",
										"Status",
										""
									].map((h) => /* @__PURE__ */ jsx("th", {
										className: "text-left p-4 font-semibold",
										children: h
									}, h)) })
								}), /* @__PURE__ */ jsxs("tbody", {
									className: "[&_tr]:border-t [&_tr]:border-border",
									children: [
										loadingOrders && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", {
											colSpan: 7,
											className: "p-8 text-center text-muted-foreground",
											children: [/* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin mx-auto mb-2" }), "Loading orders"]
										}) }),
										!loadingOrders && orders.map((o) => /* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsxs("td", {
												className: "p-4 font-mono text-brand",
												children: [o.order_number, /* @__PURE__ */ jsx("div", {
													className: "text-xs text-muted-foreground font-sans",
													children: new Date(o.created_at).toLocaleDateString("en-IN")
												})]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "p-4",
												children: [
													/* @__PURE__ */ jsx("div", {
														className: "font-semibold",
														children: o.shipping_name
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "text-xs text-muted-foreground",
														children: [
															o.shipping_phone,
															" · ",
															o.shipping_city,
															" ",
															o.shipping_pincode
														]
													}),
													/* @__PURE__ */ jsx("div", {
														className: "text-xs text-muted-foreground line-clamp-1",
														children: o.shipping_address_line1
													})
												]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "p-4 min-w-64",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "font-semibold",
													children: [o.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0, " items"]
												}), /* @__PURE__ */ jsxs("div", {
													className: "mt-1 space-y-1",
													children: [(o.items ?? []).map((item) => /* @__PURE__ */ jsxs("div", {
														className: "text-xs text-muted-foreground flex justify-between gap-3",
														children: [/* @__PURE__ */ jsxs("span", {
															className: "line-clamp-1",
															children: [
																item.item_name,
																" x ",
																item.quantity
															]
														}), /* @__PURE__ */ jsx("span", {
															className: "font-medium text-foreground",
															children: inr(Number(item.total_price))
														})]
													}, item.id)), !o.items?.length && /* @__PURE__ */ jsx("div", {
														className: "text-xs text-muted-foreground",
														children: "No item details saved yet."
													})]
												})]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "p-4 font-semibold",
												children: [
													inr(Number(o.total_amount)),
													/* @__PURE__ */ jsxs("div", {
														className: "text-xs text-muted-foreground",
														children: ["Subtotal ", inr(Number(o.subtotal))]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "text-xs text-muted-foreground",
														children: ["Delivery ", o.shipping_cost ? inr(Number(o.shipping_cost)) : "Free"]
													})
												]
											}),
											/* @__PURE__ */ jsxs("td", {
												className: "p-4 capitalize",
												children: [
													o.payment_method,
													/* @__PURE__ */ jsx("div", {
														className: "text-xs text-muted-foreground",
														children: o.payment_status
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "text-xs text-muted-foreground",
														children: ["Refund: ", o.status === "refunded" ? "Refunded" : o.status === "cancelled" ? "Review needed" : "No refund"]
													})
												]
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 min-w-44",
												children: /* @__PURE__ */ jsxs(Select, {
													value: o.status,
													onValueChange: (value) => updateOrderStatus(o, value),
													disabled: updatingId === o.id,
													children: [/* @__PURE__ */ jsx(SelectTrigger, {
														className: "h-9",
														children: /* @__PURE__ */ jsx(SelectValue, {})
													}), /* @__PURE__ */ jsx(SelectContent, { children: orderStatuses.map((status) => /* @__PURE__ */ jsx(SelectItem, {
														value: status,
														children: statusLabels[status]
													}, status)) })]
												})
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 text-right",
												children: /* @__PURE__ */ jsx(Button, {
													variant: "outline",
													size: "sm",
													onClick: () => setSelectedOrder(o),
													children: "Details"
												})
											})
										] }, o.id)),
										!loadingOrders && orders.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
											colSpan: 7,
											className: "p-8 text-center text-muted-foreground",
											children: "No orders yet."
										}) })
									]
								})]
							})
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "inventory",
						children: /* @__PURE__ */ jsx("div", {
							className: "bg-white border border-border rounded-2xl overflow-hidden",
							children: /* @__PURE__ */ jsxs("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ jsx("thead", {
									className: "bg-secondary text-brand-deep",
									children: /* @__PURE__ */ jsx("tr", { children: [
										"Product",
										"Category",
										"Pack",
										"Price",
										"Stock",
										"Status"
									].map((h) => /* @__PURE__ */ jsx("th", {
										className: "text-left p-4 font-semibold",
										children: h
									}, h)) })
								}), /* @__PURE__ */ jsx("tbody", {
									className: "[&_tr]:border-t [&_tr]:border-border",
									children: products.map((p) => {
										const price = Math.round(p.mrp * (1 - p.discount / 100));
										const status = p.stock > 70 ? "Healthy" : p.stock > 20 ? "Low" : "Critical";
										return /* @__PURE__ */ jsxs("tr", { children: [
											/* @__PURE__ */ jsx("td", {
												className: "p-4 font-semibold",
												children: p.name
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 capitalize text-muted-foreground",
												children: p.category
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4",
												children: p.qty
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4 font-bold text-brand",
												children: inr(price)
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4",
												children: p.stock
											}),
											/* @__PURE__ */ jsx("td", {
												className: "p-4",
												children: /* @__PURE__ */ jsx("span", {
													className: "text-xs px-2 py-1 rounded-full font-semibold " + (status === "Healthy" ? "bg-emerald-100 text-emerald-700" : status === "Low" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"),
													children: status
												})
											})
										] }, p.id);
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "customers",
						children: /* @__PURE__ */ jsxs("div", {
							className: "bg-white border border-border rounded-2xl p-10 text-center",
							children: [
								/* @__PURE__ */ jsx(Users, { className: "w-10 h-10 text-brand mx-auto" }),
								/* @__PURE__ */ jsx("div", {
									className: "font-display text-2xl font-bold text-brand-deep mt-3",
									children: "1,287 Customers"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-muted-foreground mt-1",
									children: "Full CRM with segmentation coming soon."
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "reports",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid md:grid-cols-3 gap-5",
							children: [
								{
									l: "Daily Sales",
									v: inr(orders.filter((order) => new Date(order.created_at).toDateString() === today).reduce((sum, order) => sum + Number(order.total_amount), 0)),
									d: "Today"
								},
								{
									l: "Total Sales",
									v: inr(revenue),
									d: "All orders"
								},
								{
									l: "Pending Orders",
									v: orders.filter((order) => [
										"pending",
										"confirmed",
										"processing"
									].includes(order.status)).length,
									d: "Need action"
								}
							].map((s) => /* @__PURE__ */ jsxs("div", {
								className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
								children: [
									/* @__PURE__ */ jsx(BarChart3, { className: "w-6 h-6 text-brand" }),
									/* @__PURE__ */ jsx("div", {
										className: "font-display text-3xl font-bold text-brand-deep mt-3",
										children: s.v
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "text-sm text-muted-foreground",
										children: [
											s.l,
											" ",
											/* @__PURE__ */ jsxs("span", {
												className: "text-xs",
												children: ["· ", s.d]
											})
										]
									})
								]
							}, s.l))
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open: Boolean(selectedOrder),
			onOpenChange: (open) => !open && setSelectedOrder(null),
			children: /* @__PURE__ */ jsx(DialogContent, {
				className: "max-w-3xl",
				children: selectedOrder && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, {
					className: "font-display text-2xl text-brand-deep",
					children: ["Order ", selectedOrder.order_number]
				}) }), /* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-[1fr_260px] gap-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-border p-4",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground mb-2",
									children: "Customer"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "font-semibold",
									children: selectedOrder.shipping_name
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground",
									children: selectedOrder.shipping_phone
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-sm text-muted-foreground",
									children: [
										selectedOrder.shipping_address_line1,
										", ",
										selectedOrder.shipping_city,
										" ",
										selectedOrder.shipping_pincode
									]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "rounded-xl border border-border overflow-hidden",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bg-secondary px-4 py-3 font-semibold text-brand-deep",
								children: "Ordered items"
							}), /* @__PURE__ */ jsxs("div", {
								className: "divide-y divide-border",
								children: [(selectedOrder.items ?? []).map((item) => /* @__PURE__ */ jsxs("div", {
									className: "p-4 grid grid-cols-[1fr_auto] gap-4 text-sm",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-medium",
										children: item.item_name
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-xs text-muted-foreground",
										children: [
											"Customer quantity: ",
											item.quantity,
											" x ",
											inr(Number(item.unit_price ?? 0))
										]
									})] }), /* @__PURE__ */ jsx("div", {
										className: "font-semibold",
										children: inr(Number(item.total_price))
									})]
								}, item.id)), !selectedOrder.items?.length && /* @__PURE__ */ jsx("div", {
									className: "p-4 text-sm text-muted-foreground",
									children: "No item details saved yet."
								})]
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl border border-border p-4 text-sm space-y-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-muted-foreground",
											children: "Subtotal"
										}), /* @__PURE__ */ jsx("span", { children: inr(Number(selectedOrder.subtotal)) })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-muted-foreground",
											children: "Delivery"
										}), /* @__PURE__ */ jsx("span", { children: selectedOrder.shipping_cost ? inr(Number(selectedOrder.shipping_cost)) : "Free" })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between border-t border-border pt-2 font-bold text-base",
										children: [/* @__PURE__ */ jsx("span", { children: "Total" }), /* @__PURE__ */ jsx("span", { children: inr(Number(selectedOrder.total_amount)) })]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl border border-border p-4 text-sm",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-muted-foreground",
									children: "Payment"
								}), /* @__PURE__ */ jsxs("div", {
									className: "font-semibold capitalize",
									children: [
										selectedOrder.payment_method,
										" - ",
										selectedOrder.payment_status
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-xl border border-border p-4 text-sm",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-muted-foreground",
										children: "Refund"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "font-semibold",
										children: selectedOrder.status === "refunded" ? "Refunded" : selectedOrder.status === "cancelled" ? "Review needed" : "No refund"
									}),
									selectedOrder.notes && /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground mt-2",
										children: selectedOrder.notes
									})
								]
							}),
							/* @__PURE__ */ jsxs(Select, {
								value: selectedOrder.status,
								onValueChange: (value) => updateOrderStatus(selectedOrder, value),
								disabled: updatingId === selectedOrder.id,
								children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsx(SelectContent, { children: orderStatuses.map((status) => /* @__PURE__ */ jsx(SelectItem, {
									value: status,
									children: statusLabels[status]
								}, status)) })]
							})
						]
					})]
				})] })
			})
		})
	] });
}
//#endregion
export { Admin as component };
