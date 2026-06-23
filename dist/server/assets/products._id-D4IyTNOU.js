import { o as products } from "./catalog-CuoH-XyD.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/products.$id.tsx
var $$splitComponentImporter = () => import("./products._id-CxA6NFMb.js");
var $$splitErrorComponentImporter = () => import("./products._id-vZ7bFV49.js");
var $$splitNotFoundComponentImporter = () => import("./products._id-BPkEqjX_.js");
var Route = createFileRoute("/products/$id")({
	loader: ({ params }) => {
		const product = products.find((p) => p.id === params.id);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		const p = loaderData?.product;
		return { meta: p ? [
			{ title: `${p.name} — Lavish Grand Traders` },
			{
				name: "description",
				content: p.description.slice(0, 155)
			},
			{
				property: "og:title",
				content: `${p.name} — Lavish Grand Traders`
			},
			{
				property: "og:description",
				content: p.description.slice(0, 155)
			},
			{
				property: "og:image",
				content: p.image
			}
		] : [] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
