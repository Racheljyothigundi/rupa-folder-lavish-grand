import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/auth.callback.tsx
var $$splitComponentImporter = () => import("./auth.callback-CXvB-vrQ.js");
var Route = createFileRoute("/auth/callback")({
	validateSearch: (search) => ({ next: typeof search.next === "string" ? search.next : void 0 }),
	head: () => ({ meta: [{ title: "Signing you in — Lavish Grand Traders" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
