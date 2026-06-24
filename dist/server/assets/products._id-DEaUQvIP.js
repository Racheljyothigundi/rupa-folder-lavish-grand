import { o as products } from "./catalog-D--lWBpy.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/products.$id.tsx
var $$splitComponentImporter = () => import("./products._id-Dr5b1Ti5.js");
var $$splitErrorComponentImporter = () => import("./products._id-B-x-1wB3.js");
var $$splitNotFoundComponentImporter = () => import("./products._id-DB3BKxH5.js");
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
