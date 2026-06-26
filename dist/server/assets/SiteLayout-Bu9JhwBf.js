import { d as useAuth, f as useAuthModal, m as useWishlist, p as useCart, t as categories } from "./catalog-BiCt1DYe.js";
import * as React from "react";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronRight, Circle, Eye, EyeOff, Facebook, Heart, Instagram, LayoutDashboard, Linkedin, Loader2, Lock, LogOut, Mail, MapPin, Menu, Package, Phone, Search, ShoppingBag, Truck, User, X } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as LabelPrimitive from "@radix-ui/react-label";
//#region src/components/site/Logo.tsx
function Logo({ compact = false }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: "/",
		className: "flex items-center gap-3 group",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative w-12 h-12 rounded-xl bg-gradient-deep shadow-elegant flex items-center justify-center overflow-hidden ring-1 ring-brand-cyan/30",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "font-display text-2xl font-bold tracking-tight",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-white",
					children: "L"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-brand-cyan",
					children: "G"
				})]
			}), /* @__PURE__ */ jsx("span", { className: "absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-cyan via-white/40 to-brand-cyan/0" })]
		}), !compact && /* @__PURE__ */ jsxs("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ jsx("div", {
				className: "font-display font-bold text-[15px] tracking-wide text-brand",
				children: "LAVISH GRAND"
			}), /* @__PURE__ */ jsx("div", {
				className: "text-[10px] tracking-[0.18em] text-muted-foreground font-medium",
				children: "TRADERS PVT. LTD."
			})]
		})]
	});
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/components/site/Header.tsx
var navItems = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "Products",
		to: "/products",
		mega: true
	},
	{
		label: "Gift Boxes",
		to: "/gift-boxes"
	},
	{
		label: "Build Your Mix",
		to: "/build-your-mix"
	},
	{
		label: "Subscriptions",
		to: "/subscriptions"
	},
	{
		label: "Corporate",
		to: "/corporate"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
function Header() {
	const { user, logout } = useAuth();
	const modal = useAuthModal();
	const cart = useCart();
	const wish = useWishlist();
	const [mobileOpen, setMobileOpen] = useState(false);
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/60",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "bg-gradient-deep text-white text-[12px]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto container-px py-2 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-5 overflow-hidden",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5 whitespace-nowrap",
								children: [/* @__PURE__ */ jsx(Phone, { className: "w-3 h-3 text-brand-cyan" }), " +91 98489 56829"]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "hidden sm:flex items-center gap-1.5 whitespace-nowrap",
								children: [/* @__PURE__ */ jsx(Mail, { className: "w-3 h-3 text-brand-cyan" }), " lavishgrandtraderspvtltd@gmail.com"]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "hidden md:flex items-center gap-1.5 whitespace-nowrap text-white/70",
								children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-brand-cyan" }), " GST: 36AAGCL8507N1ZZ"]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5 whitespace-nowrap text-gold-soft",
						children: [/* @__PURE__ */ jsx(Truck, { className: "w-3.5 h-3.5" }), " Free delivery on orders above ₹999"]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px py-4 flex items-center gap-6",
				children: [
					/* @__PURE__ */ jsx(Logo, {}),
					/* @__PURE__ */ jsx("div", {
						className: "hidden md:flex flex-1 max-w-xl mx-auto",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative w-full",
							children: [
								/* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
								/* @__PURE__ */ jsx(Input, {
									placeholder: "Search dry fruits, spices, gift boxes…",
									className: "pl-11 h-11 bg-secondary/60 border-secondary focus-visible:ring-brand-cyan"
								}),
								/* @__PURE__ */ jsx(Button, {
									size: "sm",
									className: "absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 bg-gradient-hero text-white",
									children: "Search"
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1 md:gap-3 ml-auto",
						children: [
							/* @__PURE__ */ jsxs(Link, {
								to: "/wishlist",
								className: "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary relative group",
								children: [/* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 text-brand group-hover:fill-brand/10" }), wish.ids.length > 0 && /* @__PURE__ */ jsx("span", {
									className: "absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold",
									children: wish.ids.length
								})]
							}),
							/* @__PURE__ */ jsxs(Link, {
								to: "/cart",
								className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary relative",
								children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-brand" }), cart.itemCount > 0 && /* @__PURE__ */ jsx("span", {
									className: "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] rounded-full bg-brand-cyan text-brand-deep flex items-center justify-center font-bold",
									children: cart.itemCount
								})]
							}),
							user ? /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs(Button, {
									variant: "ghost",
									className: "gap-2 h-10",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-7 h-7 rounded-full bg-gradient-hero text-white flex items-center justify-center font-bold text-xs",
										children: user.name[0]?.toUpperCase()
									}), /* @__PURE__ */ jsx("span", {
										className: "hidden md:inline text-sm",
										children: user.name
									})]
								})
							}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
								align: "end",
								className: "w-56",
								children: [
									/* @__PURE__ */ jsx(DropdownMenuLabel, {
										className: "text-xs text-muted-foreground",
										children: user.email
									}),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/account",
											search: { tab: "dashboard" },
											children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "w-4 h-4 mr-2" }), "My Dashboard"]
										})
									}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/account",
											search: { tab: "orders" },
											children: [/* @__PURE__ */ jsx(Package, { className: "w-4 h-4 mr-2" }), "My Orders"]
										})
									}),
									/* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/wishlist",
											children: [/* @__PURE__ */ jsx(Heart, { className: "w-4 h-4 mr-2" }), "Wishlist"]
										})
									}),
									user.role === "admin" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DropdownMenuSeparator, {}), /* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/admin",
											search: { tab: "overview" },
											children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "w-4 h-4 mr-2" }), "Admin Console"]
										})
									})] }),
									user.role === "corporate" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DropdownMenuSeparator, {}), /* @__PURE__ */ jsx(DropdownMenuItem, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/corporate",
											children: [/* @__PURE__ */ jsx(Package, { className: "w-4 h-4 mr-2" }), "Corporate Portal"]
										})
									})] }),
									/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
									/* @__PURE__ */ jsxs(DropdownMenuItem, {
										onClick: logout,
										className: "text-destructive",
										children: [/* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }), "Sign Out"]
									})
								]
							})] }) : /* @__PURE__ */ jsxs(Button, {
								variant: "ghost",
								onClick: () => modal.trigger(),
								className: "gap-2",
								children: [/* @__PURE__ */ jsx(User, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", {
									className: "hidden md:inline",
									children: "Login"
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => setMobileOpen(true),
								className: "md:hidden p-2",
								children: /* @__PURE__ */ jsx(Menu, {})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "hidden md:block border-t border-border/60",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto container-px flex items-center gap-1 h-12",
					children: navItems.map((n) => {
						const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
						if (n.mega) return /* @__PURE__ */ jsxs("div", {
							className: "relative group",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: n.to,
								className: cn("flex items-center gap-1 px-4 h-12 text-sm font-medium hover:text-brand transition-colors", active && "text-brand"),
								children: [
									n.label,
									" ",
									/* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" })
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "absolute left-0 top-full hidden group-hover:block pt-1 w-[680px]",
								children: /* @__PURE__ */ jsx("div", {
									className: "bg-card border border-border rounded-xl shadow-elegant p-5 grid grid-cols-3 gap-3",
									children: categories.map((c) => /* @__PURE__ */ jsxs(Link, {
										to: "/products",
										search: { category: c.slug },
										className: "flex items-center gap-3 p-2 rounded-lg hover:bg-secondary",
										children: [/* @__PURE__ */ jsx("img", {
											src: c.image,
											alt: "",
											className: "w-11 h-11 rounded-lg object-cover"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-sm font-semibold text-foreground",
											children: c.name
										}), /* @__PURE__ */ jsx("div", {
											className: "text-[11px] text-muted-foreground",
											children: c.blurb
										})] })]
									}, c.slug))
								})
							})]
						}, n.to);
						return /* @__PURE__ */ jsxs(Link, {
							to: n.to,
							className: cn("px-4 h-12 flex items-center text-sm font-medium hover:text-brand transition-colors relative", active && "text-brand"),
							children: [n.label, active && /* @__PURE__ */ jsx("span", { className: "absolute inset-x-3 -bottom-px h-0.5 bg-gradient-gold rounded-full" })]
						}, n.to);
					})
				})
			}),
			mobileOpen && /* @__PURE__ */ jsx("div", {
				className: "md:hidden fixed inset-0 z-50 bg-black/40",
				onClick: () => setMobileOpen(false),
				children: /* @__PURE__ */ jsxs("div", {
					className: "absolute right-0 top-0 bottom-0 w-72 bg-background p-5",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ jsx(Logo, { compact: true }), /* @__PURE__ */ jsx("button", {
							onClick: () => setMobileOpen(false),
							children: /* @__PURE__ */ jsx(X, {})
						})]
					}), /* @__PURE__ */ jsx("nav", {
						className: "flex flex-col gap-1",
						children: navItems.map((n) => /* @__PURE__ */ jsx(Link, {
							to: n.to,
							onClick: () => setMobileOpen(false),
							className: "px-3 py-2.5 rounded-lg hover:bg-secondary text-sm font-medium",
							children: n.label
						}, n.to))
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/site/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-gradient-deep text-white/80 mt-20",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px py-14 grid lg:grid-cols-12 gap-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-4 space-y-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "[&_*]:!text-white",
							children: /* @__PURE__ */ jsx(Logo, {})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-white/70 max-w-sm",
							children: "Lavish Grand Traders Pvt. Ltd. — premium dry fruits, seeds, spices and corporate gifting. Sourced with care, packed with pride."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "text-xs text-white/60 space-y-1",
							children: [
								/* @__PURE__ */ jsx("div", { children: "CIN: U46909TS2026PTC214908" }),
								/* @__PURE__ */ jsx("div", { children: "GST: 36AAGCL8507N1ZZ" }),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-1.5",
									children: [/* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 mt-0.5 shrink-0" }), " Plot No 7/A, Phase-V, IDA Cherlapally, EC Nagar, Navodaya Colony, Hyderabad — 500051"]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "font-display text-white text-base mb-3",
						children: "Shop"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/products",
								className: "hover:text-brand-cyan",
								children: "All Products"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/gift-boxes",
								className: "hover:text-brand-cyan",
								children: "Gift Boxes"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/build-your-mix",
								className: "hover:text-brand-cyan",
								children: "Build Your Mix"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/subscriptions",
								className: "hover:text-brand-cyan",
								children: "Subscriptions"
							}) })
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "font-display text-white text-base mb-3",
						children: "Company"
					}), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-2 text-sm",
						children: [
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/about",
								className: "hover:text-brand-cyan",
								children: "About Us"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/corporate",
								className: "hover:text-brand-cyan",
								children: "Corporate Orders"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "hover:text-brand-cyan",
								children: "Contact"
							}) })
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-4",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "font-display text-white text-base mb-3",
							children: "Get in touch"
						}),
						/* @__PURE__ */ jsxs("ul", {
							className: "space-y-2 text-sm",
							children: [/* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-brand-cyan" }), " +91 98489 56829"]
							}), /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-brand-cyan" }), " lavishgrandtraderspvtltd@gmail.com"]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex gap-3 mt-4",
							children: [
								Instagram,
								Facebook,
								Linkedin
							].map((Icon, i) => /* @__PURE__ */ jsx("a", {
								href: "#",
								className: "w-9 h-9 rounded-full bg-white/10 hover:bg-brand-cyan hover:text-brand-deep flex items-center justify-center transition-colors",
								children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
							}, i))
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto container-px py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Lavish Grand Traders Pvt. Ltd. All rights reserved."
				] }), /* @__PURE__ */ jsx("span", { children: "Made with care in Hyderabad, India" })]
			})
		})]
	});
}
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/tabs.tsx
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/site/AuthDialog.tsx
function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
	if (password.length < 6) return {
		valid: false,
		message: "Password must be at least 6 characters"
	};
	if (!/[A-Z]/.test(password)) return {
		valid: false,
		message: "Password must contain an uppercase letter"
	};
	if (!/[0-9]/.test(password)) return {
		valid: false,
		message: "Password must contain a number"
	};
	return { valid: true };
}
function validatePhone(phone) {
	if (!phone) return true;
	return /^[+]?[\d\s-]{10,}$/.test(phone.replace(/\s/g, ""));
}
function friendlyAuthError(error) {
	const message = error.toLowerCase();
	if (message.includes("email rate limit") || message.includes("rate limit")) return "Too many email requests. Please wait a few minutes before trying again.";
	if (message.includes("already registered") || message.includes("already exists")) return "An account with this email already exists. Please sign in instead.";
	if (message.includes("invalid login credentials")) return "Incorrect email or password. Please try again.";
	if (message.includes("email not confirmed")) return "Please check your email and confirm your account first.";
	return "Something went wrong. Please try again.";
}
function AuthDialog() {
	const { open, setOpen } = useAuthModal();
	const { login, signup, signInWithGoogle, resetPassword } = useAuth();
	const [mode, setMode] = useState("login");
	const [pendingAction, setPendingAction] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: ""
	});
	const busy = pendingAction !== null;
	const googleBusy = pendingAction === "google";
	const formBusy = pendingAction === "form";
	const close = () => {
		setOpen(false);
		setMode("login");
		setPendingAction(null);
		setForm({
			name: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: ""
		});
	};
	const handleGoogle = async () => {
		setPendingAction("google");
		const { error } = await signInWithGoogle();
		if (error) {
			toast.error(error);
			setPendingAction(null);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setPendingAction("form");
		if (!validateEmail(form.email)) {
			toast.error("Please enter a valid email address");
			setPendingAction(null);
			return;
		}
		if (mode === "login") {
			if (!form.password) {
				toast.error("Please enter your password");
				setPendingAction(null);
				return;
			}
			const { error } = await login(form.email.trim().toLowerCase(), form.password);
			if (error) {
				toast.error(friendlyAuthError(error));
				setPendingAction(null);
			} else close();
		} else if (mode === "signup") {
			if (!form.name.trim()) {
				toast.error("Please enter your full name");
				setPendingAction(null);
				return;
			}
			if (form.phone && !validatePhone(form.phone)) {
				toast.error("Please enter a valid phone number");
				setPendingAction(null);
				return;
			}
			const pwdCheck = validatePassword(form.password);
			if (!pwdCheck.valid) {
				toast.error(pwdCheck.message);
				setPendingAction(null);
				return;
			}
			if (form.password !== form.confirmPassword) {
				toast.error("Passwords do not match");
				setPendingAction(null);
				return;
			}
			const { error } = await signup({
				name: form.name.trim(),
				email: form.email.trim().toLowerCase(),
				phone: form.phone.trim() || void 0,
				password: form.password
			});
			if (error) {
				toast.error(friendlyAuthError(error));
				setPendingAction(null);
			} else close();
		} else {
			const { error } = await resetPassword(form.email.trim().toLowerCase());
			if (error) {
				if (error.includes("not found")) toast.error("No account found with this email address.");
				else toast.error(friendlyAuthError(error));
				setPendingAction(null);
			} else {
				toast.success("Password reset link sent! Check your email inbox.");
				setMode("login");
				setPendingAction(null);
			}
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: (o) => {
			if (!o) close();
			else setOpen(true);
		},
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-md p-0 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "bg-gradient-deep px-6 py-5 text-white",
				children: /* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
					className: "font-display text-2xl",
					children: mode === "forgot" ? "Reset Password" : "Welcome to Lavish Grand"
				}), /* @__PURE__ */ jsx(DialogDescription, {
					className: "text-white/70",
					children: mode === "forgot" ? "Enter your email to receive a password reset link." : "Sign in to save your cart, track orders & manage subscriptions."
				})] })
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-6",
				children: [
					mode !== "forgot" && /* @__PURE__ */ jsxs(Tabs, {
						value: mode,
						onValueChange: (v) => setMode(v),
						children: [
							/* @__PURE__ */ jsxs(TabsList, {
								className: "grid grid-cols-2 w-full",
								children: [/* @__PURE__ */ jsx(TabsTrigger, {
									value: "login",
									children: "Sign In"
								}), /* @__PURE__ */ jsx(TabsTrigger, {
									value: "signup",
									children: "Create Account"
								})]
							}),
							/* @__PURE__ */ jsx(TabsContent, { value: "login" }),
							/* @__PURE__ */ jsx(TabsContent, { value: "signup" })
						]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						disabled: busy,
						onClick: handleGoogle,
						className: "w-full mt-4 h-11 gap-2 font-medium",
						children: [
							googleBusy && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
							/* @__PURE__ */ jsx(GoogleIcon, {}),
							" Continue with Google"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-4 flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wider",
						children: [
							/* @__PURE__ */ jsx("div", { className: "h-px bg-border flex-1" }),
							"or ",
							mode === "forgot" ? "reset password" : "use email",
							/* @__PURE__ */ jsx("div", { className: "h-px bg-border flex-1" })
						]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-3",
						children: [
							mode === "signup" && /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Full name *" }), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										required: true,
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										placeholder: "Your full name",
										className: "pl-10"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Email *" }), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										required: true,
										type: "email",
										value: form.email,
										onChange: (e) => setForm({
											...form,
											email: e.target.value
										}),
										placeholder: "you@example.com",
										className: "pl-10"
									})]
								})]
							}),
							mode === "signup" && /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Phone (optional)" }), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										type: "tel",
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										}),
										placeholder: "+91 98765 43210",
										className: "pl-10"
									})]
								})]
							}),
							mode !== "forgot" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsx(Label, { children: "Password *" }), mode === "login" && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setMode("forgot"),
											className: "text-xs text-brand hover:underline font-medium",
											children: "Forgot password?"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
											/* @__PURE__ */ jsx(Input, {
												required: true,
												type: showPassword ? "text" : "password",
												minLength: 6,
												value: form.password,
												onChange: (e) => setForm({
													...form,
													password: e.target.value
												}),
												placeholder: mode === "signup" ? "Min 6 chars, 1 uppercase, 1 number" : "••••••••",
												className: "pl-10 pr-10"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setShowPassword(!showPassword),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
												children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
											})
										]
									}),
									mode === "signup" && /* @__PURE__ */ jsx("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Must be at least 6 characters with 1 uppercase letter and 1 number"
									})
								]
							}), mode === "signup" && /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx(Label, { children: "Confirm Password *" }), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										required: true,
										type: showPassword ? "text" : "password",
										minLength: 6,
										value: form.confirmPassword,
										onChange: (e) => setForm({
											...form,
											confirmPassword: e.target.value
										}),
										placeholder: "Confirm your password",
										className: "pl-10"
									})]
								})]
							})] }),
							/* @__PURE__ */ jsxs(Button, {
								type: "submit",
								disabled: busy,
								className: "w-full h-11 bg-gradient-hero text-white shadow-elegant",
								children: [formBusy && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"]
							}),
							mode === "forgot" && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setMode("login"),
								className: "w-full text-xs text-muted-foreground hover:text-brand",
								children: "Back to sign in"
							})
						]
					})
				]
			})]
		})
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 48 48",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ jsx("path", {
				fill: "#FFC107",
				d: "M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
			}),
			/* @__PURE__ */ jsx("path", {
				fill: "#FF3D00",
				d: "M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"
			}),
			/* @__PURE__ */ jsx("path", {
				fill: "#4CAF50",
				d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
			}),
			/* @__PURE__ */ jsx("path", {
				fill: "#1976D2",
				d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C41.4 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"
			})
		]
	});
}
//#endregion
//#region src/components/site/SiteLayout.tsx
function SiteLayout({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex flex-col bg-background",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(AuthDialog, {})
		]
	});
}
//#endregion
export { TabsList as a, DialogContent as c, Input as d, Button as f, TabsContent as i, DialogHeader as l, Label as n, TabsTrigger as o, cn as p, Tabs as r, Dialog as s, SiteLayout as t, DialogTitle as u };
