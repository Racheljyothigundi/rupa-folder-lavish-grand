import { d as useAuth, f as useAuthModal } from "./catalog-CuoH-XyD.js";
import { c as Button, t as SiteLayout } from "./SiteLayout-pGyUNl4u.js";
import { useEffect } from "react";
import { Navigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const { user } = useAuth();
	const modal = useAuthModal();
	useEffect(() => {
		if (!user) modal.setOpen(true);
	}, [user, modal]);
	if (user) return /* @__PURE__ */ jsx(Navigate, {
		to: "/account",
		search: { tab: "dashboard" }
	});
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
