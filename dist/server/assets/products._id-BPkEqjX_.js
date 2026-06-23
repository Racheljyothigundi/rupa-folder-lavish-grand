import { t as SiteLayout } from "./SiteLayout-pGyUNl4u.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/products.$id.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", {
	className: "py-32 text-center",
	children: [/* @__PURE__ */ jsx("h1", {
		className: "font-display text-3xl",
		children: "Product not found"
	}), /* @__PURE__ */ jsx(Link, {
		to: "/products",
		className: "text-brand mt-3 inline-block",
		children: "Back to all products →"
	})]
}) });
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
