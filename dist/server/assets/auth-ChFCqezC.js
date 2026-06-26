import { d as useAuth, f as useAuthModal } from "./catalog-BiCt1DYe.js";
import { f as Button, t as SiteLayout } from "./SiteLayout-Bu9JhwBf.js";
import { useEffect } from "react";
import { Navigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Loader2 } from "lucide-react";
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const { user, loading } = useAuth();
	const modal = useAuthModal();
	useEffect(() => {
		if (!loading && !user) modal.setOpen(true);
	}, [
		loading,
		user,
		modal
	]);
	if (user) return /* @__PURE__ */ jsx(Navigate, {
		to: "/account",
		search: { tab: "dashboard" }
	});
	if (loading) return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-md mx-auto py-24 text-center container-px",
		children: [/* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin mx-auto text-brand" }), /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-muted-foreground",
			children: "Checking your session…"
		})]
	}) });
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("section", {
		className: "max-w-md mx-auto py-24 text-center container-px",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-3xl font-bold text-brand-deep",
			children: "Sign in to continue"
		}), /* @__PURE__ */ jsx(Button, {
			onClick: () => modal.trigger(),
			className: "mt-6 bg-gradient-hero text-white",
			children: "Open Sign-In"
		})]
	}) });
}
//#endregion
export { AuthPage as component };
