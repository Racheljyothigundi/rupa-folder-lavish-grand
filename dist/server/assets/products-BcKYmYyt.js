import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/products.tsx
var $$splitComponentImporter = () => import("./products-BYrMQlW_.js");
var Route = createFileRoute("/products")({
	validateSearch: (s) => ({
		category: s.category || "all",
		q: typeof s.q === "string" ? s.q : "",
		sort: s.sort || "featured"
	}),
	head: () => ({ meta: [{ title: "Shop All Products — Lavish Grand Traders" }, {
		name: "description",
		content: "Browse premium dry fruits, seeds, spices, dals, millets, flours and gift boxes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
