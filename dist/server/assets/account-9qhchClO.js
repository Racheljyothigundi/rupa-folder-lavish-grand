import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/account.tsx
var $$splitComponentImporter = () => import("./account-C8DbM4C_.js");
var Route = createFileRoute("/account")({
	validateSearch: (s) => ({ tab: s.tab || "dashboard" }),
	head: () => ({ meta: [{ title: "My Account — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
