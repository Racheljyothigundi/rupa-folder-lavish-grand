import { l as StoreProviders } from "./catalog-BiCt1DYe.js";
import { t as Route$13 } from "./products-BcKYmYyt.js";
import { t as giftbox_hero_default } from "./giftbox-hero-jHYZAQhP.js";
import { t as Route$14 } from "./admin-C7H14CQz.js";
import { t as Route$15 } from "./account-9qhchClO.js";
import { t as Route$16 } from "./products._id-5_WEJk2e.js";
import { t as Route$17 } from "./auth.callback-Cood3mBZ.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-Cqk_NPkK.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lavish Grand Traders — Premium Dry Fruits, Spices & Corporate Gifting" },
			{
				name: "description",
				content: "Premium dry fruits, seeds, spices and luxury gift boxes by Lavish Grand Traders Pvt. Ltd. Fresh, natural, hygienically packed."
			},
			{
				name: "author",
				content: "Lavish Grand Traders Pvt. Ltd."
			},
			{
				property: "og:title",
				content: "Lavish Grand Traders — Premium Dry Fruits & Gifting"
			},
			{
				property: "og:description",
				content: "Finest quality almonds, cashews, pistachios, spices and luxury gift hampers."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(StoreProviders, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, { position: "bottom-right" })] })
	});
}
//#endregion
//#region src/routes/wishlist.tsx
var $$splitComponentImporter$11 = () => import("./wishlist-CYyRGdR1.js");
var Route$11 = createFileRoute("/wishlist")({
	head: () => ({ meta: [{ title: "Wishlist — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
//#endregion
//#region src/routes/subscriptions.tsx
var $$splitComponentImporter$10 = () => import("./subscriptions-CapIIFCh.js");
var Route$10 = createFileRoute("/subscriptions")({
	head: () => ({ meta: [{ title: "Monthly Dry Fruit Subscriptions — Lavish Grand Traders" }, {
		name: "description",
		content: "Subscribe and save on monthly dry fruit packs — Family, Fitness, Kids and Executive plans."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
//#endregion
//#region src/routes/reset-password.tsx
var $$splitComponentImporter$9 = () => import("./reset-password-NR1XBr6L.js");
var Route$9 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset Password — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/gift-boxes.tsx
var $$splitComponentImporter$8 = () => import("./gift-boxes-s8_5cbwr.js");
var Route$8 = createFileRoute("/gift-boxes")({
	head: () => ({ meta: [
		{ title: "Premium Gift Boxes — Lavish Grand Traders" },
		{
			name: "description",
			content: "Ten signature gift collections for every occasion — Diwali, weddings, corporate gifting. Custom messages and branding available."
		},
		{
			property: "og:title",
			content: "Premium Gift Boxes — Lavish Grand Traders"
		},
		{
			property: "og:description",
			content: "Luxury dry fruit gift hampers, custom branded for corporate and personal gifting."
		},
		{
			property: "og:image",
			content: giftbox_hero_default
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/corporate.tsx
var $$splitComponentImporter$7 = () => import("./corporate-Dhn4iX7y.js");
var Route$7 = createFileRoute("/corporate")({
	head: () => ({ meta: [{ title: "Corporate Gifting & Bulk Orders — Lavish Grand Traders" }, {
		name: "description",
		content: "Custom-branded dry fruit gift boxes for clients and employees. Bulk pricing, MOQ from 50, pan-India delivery."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$6 = () => import("./contact-CoXkLnyl.js");
var Route$6 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — Lavish Grand Traders" }, {
		name: "description",
		content: "Get in touch with our team for orders, support or corporate enquiries."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/checkout.tsx
var $$splitComponentImporter$5 = () => import("./checkout-BuZI2uEr.js");
var Route$5 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/cart.tsx
var $$splitComponentImporter$4 = () => import("./cart-ITilQRCF.js");
var Route$4 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Your Cart — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/build-your-mix.tsx
var $$splitComponentImporter$3 = () => import("./build-your-mix-BJrwakFg.js");
var Route$3 = createFileRoute("/build-your-mix")({
	head: () => ({ meta: [{ title: "Build Your Own Mix — Lavish Grand Traders" }, {
		name: "description",
		content: "Create your perfect dry-fruit blend with live pricing. Choose ingredients and portions for a custom healthy mix."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/auth.tsx
var $$splitComponentImporter$2 = () => import("./auth-ChFCqezC.js");
var Route$2 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$1 = () => import("./about-ByylPZPT.js");
var Route$1 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — Lavish Grand Traders Pvt. Ltd." }, {
		name: "description",
		content: "Lavish Grand Traders is a Hyderabad-based premium dry fruits, spices and corporate gifting company."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-CReqhE2f.js");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Lavish Grand Traders — Premium Dry Fruits, Spices & Corporate Gifting" },
		{
			name: "description",
			content: "Shop hand-sorted almonds, cashews, pistachios, walnuts and luxury gift hampers. Fresh, natural, hygienically packed across India."
		},
		{
			property: "og:title",
			content: "Lavish Grand Traders — Premium Dry Fruits & Gifting"
		},
		{
			property: "og:description",
			content: "Premium dry fruits, spices and corporate gifting. Hygienically packed. Free delivery over ₹999."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var WishlistRoute = Route$11.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$12
});
var SubscriptionsRoute = Route$10.update({
	id: "/subscriptions",
	path: "/subscriptions",
	getParentRoute: () => Route$12
});
var ResetPasswordRoute = Route$9.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$12
});
var ProductsRoute = Route$13.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => Route$12
});
var GiftBoxesRoute = Route$8.update({
	id: "/gift-boxes",
	path: "/gift-boxes",
	getParentRoute: () => Route$12
});
var CorporateRoute = Route$7.update({
	id: "/corporate",
	path: "/corporate",
	getParentRoute: () => Route$12
});
var ContactRoute = Route$6.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$12
});
var CheckoutRoute = Route$5.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$12
});
var CartRoute = Route$4.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$12
});
var BuildYourMixRoute = Route$3.update({
	id: "/build-your-mix",
	path: "/build-your-mix",
	getParentRoute: () => Route$12
});
var AuthRoute = Route$2.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$12
});
var AdminRoute = Route$14.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$12
});
var AccountRoute = Route$15.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$1.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var ProductsIdRoute = Route$16.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ProductsRoute
});
var AuthRouteChildren = { AuthCallbackRoute: Route$17.update({
	id: "/callback",
	path: "/callback",
	getParentRoute: () => AuthRoute
}) };
var AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
var ProductsRouteChildren = { ProductsIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AccountRoute,
	AdminRoute,
	AuthRoute: AuthRouteWithChildren,
	BuildYourMixRoute,
	CartRoute,
	CheckoutRoute,
	ContactRoute,
	CorporateRoute,
	GiftBoxesRoute,
	ProductsRoute: ProductsRoute._addFileChildren(ProductsRouteChildren),
	ResetPasswordRoute,
	SubscriptionsRoute,
	WishlistRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
