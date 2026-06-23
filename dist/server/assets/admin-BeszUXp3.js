import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/admin.tsx
var $$splitComponentImporter = () => import("./admin-Dw5WvWWC.js");
var Route = createFileRoute("/admin")({
	validateSearch: (s) => ({ tab: s.tab || "overview" }),
	head: () => ({ meta: [{ title: "Admin Console — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
