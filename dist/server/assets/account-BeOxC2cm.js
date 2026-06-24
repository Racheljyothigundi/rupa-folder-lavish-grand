import { d as useAuth, f as useAuthModal, m as useWishlist, o as products, s as subscriptionPlans, u as inr } from "./catalog-D--lWBpy.js";
import { t as Route } from "./account-BYejJUpV.js";
import { a as TabsList, c as Button, i as TabsContent, o as TabsTrigger, r as Tabs, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Gift, Heart, LayoutDashboard, Loader2, Package, Repeat, ShoppingBag, User } from "lucide-react";
//#region src/routes/account.tsx?tsr-split=component
var mockOrders = [
	{
		id: "LG874512",
		date: "12 Jun 2026",
		items: 3,
		total: 2147,
		status: "Delivered"
	},
	{
		id: "LG874488",
		date: "28 May 2026",
		items: 1,
		total: 642,
		status: "Delivered"
	},
	{
		id: "LG874322",
		date: "10 May 2026",
		items: 5,
		total: 3289,
		status: "Delivered"
	}
];
function Account() {
	const { tab } = Route.useSearch();
	const { user, logout, loading } = useAuth();
	const modal = useAuthModal();
	const wish = useWishlist();
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
	const wishItems = products.filter((p) => wish.has(p.id));
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
							v: mockOrders.length
						},
						{
							i: Repeat,
							l: "Active Subscriptions",
							v: 1
						},
						{
							i: Heart,
							l: "Saved Items",
							v: wish.ids.length
						},
						{
							i: Gift,
							l: "Saved Gift Boxes",
							v: 2
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
							}), /* @__PURE__ */ jsx("tbody", {
								className: "[&_tr]:border-t [&_tr]:border-border",
								children: mockOrders.map((o) => /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4 font-mono text-brand",
										children: o.id
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: o.date
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: o.items
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 font-semibold",
										children: inr(o.total)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold",
											children: o.status
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-right",
										children: /* @__PURE__ */ jsx("button", {
											className: "text-brand hover:underline text-sm",
											children: "View"
										})
									})
								] }, o.id))
							})]
						})
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "subscriptions",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-white border border-border rounded-2xl p-6 shadow-soft",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block font-semibold",
									children: "ACTIVE"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "font-display text-2xl font-bold text-brand-deep mt-2",
									children: subscriptionPlans[0].name
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground",
									children: "Next delivery: 5 Jul 2026"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "font-display text-2xl font-bold text-brand mt-3",
									children: [
										inr(subscriptionPlans[0].monthly),
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-sm text-muted-foreground",
											children: "/month"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex gap-2 mt-4",
									children: [/* @__PURE__ */ jsx(Button, {
										variant: "outline",
										size: "sm",
										children: "Skip next"
									}), /* @__PURE__ */ jsx(Button, {
										variant: "outline",
										size: "sm",
										className: "text-destructive border-destructive/30",
										children: "Pause"
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
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
						})]
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
