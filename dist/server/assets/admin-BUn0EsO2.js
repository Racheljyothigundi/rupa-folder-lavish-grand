import { d as useAuth, f as useAuthModal, o as products, u as inr } from "./catalog-D--lWBpy.js";
import { t as Route } from "./admin-DVpbAFf8.js";
import { a as TabsList, c as Button, i as TabsContent, o as TabsTrigger, r as Tabs, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowUpRight, BarChart3, Package, ShieldAlert, ShoppingBag, TrendingUp, Users } from "lucide-react";
//#region src/routes/admin.tsx?tsr-split=component
var recentOrders = [
	{
		id: "LG874621",
		customer: "Anitha R.",
		total: 2147,
		status: "Processing"
	},
	{
		id: "LG874620",
		customer: "Rohit M.",
		total: 3289,
		status: "Shipped"
	},
	{
		id: "LG874619",
		customer: "Priya S.",
		total: 1499,
		status: "Delivered"
	},
	{
		id: "LG874618",
		customer: "Karthik V.",
		total: 8990,
		status: "Processing"
	},
	{
		id: "LG874617",
		customer: "Anonymous",
		total: 642,
		status: "Delivered"
	}
];
function Admin() {
	const { tab } = Route.useSearch();
	const { user } = useAuth();
	const modal = useAuthModal();
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
				children: ["Demo: any email starting with ", /* @__PURE__ */ jsx("b", { children: "admin@" })]
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
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
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
	}), /* @__PURE__ */ jsx("section", {
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
								l: "Revenue (MTD)",
								v: inr(384920),
								d: "+12.4%",
								i: TrendingUp
							},
							{
								l: "Orders Today",
								v: 47,
								d: "+8 vs avg",
								i: ShoppingBag
							},
							{
								l: "Active Customers",
								v: 1287,
								d: "+24 this week",
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
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-2 text-sm",
								children: recentOrders.map((o) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between py-2 border-b last:border-b-0 border-border",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "font-mono text-brand",
										children: o.id
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: o.customer
									})] }), /* @__PURE__ */ jsxs("div", {
										className: "text-right",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-bold",
											children: inr(o.total)
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: o.status
										})]
									})]
								}, o.id))
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
									"Total",
									"Status",
									"Action"
								].map((h) => /* @__PURE__ */ jsx("th", {
									className: "text-left p-4 font-semibold",
									children: h
								}, h)) })
							}), /* @__PURE__ */ jsx("tbody", {
								className: "[&_tr]:border-t [&_tr]:border-border",
								children: recentOrders.map((o) => /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4 font-mono text-brand",
										children: o.id
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: o.customer
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 font-semibold",
										children: inr(o.total)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "text-xs px-2 py-1 rounded-full bg-secondary text-brand-deep font-semibold",
											children: o.status
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsx("button", {
											className: "text-brand hover:underline",
											children: "Manage"
										})
									})
								] }, o.id))
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
								v: inr(12480),
								d: "Today"
							},
							{
								l: "Monthly Sales",
								v: inr(384920),
								d: "June 2026"
							},
							{
								l: "YoY Growth",
								v: "+42%",
								d: "vs Jun '25"
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
	})] });
}
//#endregion
export { Admin as component };
