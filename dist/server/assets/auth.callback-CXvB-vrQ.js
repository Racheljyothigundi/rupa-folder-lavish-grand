import { t as supabase } from "./client-K-6dw9l-.js";
import { t as Route } from "./auth.callback--pp0PKBp.js";
import { c as Button, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { AlertCircle, Loader2 } from "lucide-react";
//#region src/routes/auth.callback.tsx?tsr-split=component
var DEFAULT_NEXT = "/account?tab=dashboard";
function getSafeNext(next) {
	if (!next || !next.startsWith("/") || next.startsWith("//")) return DEFAULT_NEXT;
	return next;
}
function readAuthError(url) {
	const hashParams = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : url.hash);
	const message = url.searchParams.get("error_description") || hashParams.get("error_description") || url.searchParams.get("error") || hashParams.get("error");
	return message ? decodeURIComponent(message.replace(/\+/g, " ")) : null;
}
function AuthCallbackPage() {
	const { next } = Route.useSearch();
	const safeNext = useMemo(() => getSafeNext(next), [next]);
	const [error, setError] = useState(null);
	useEffect(() => {
		let active = true;
		const waitForSession = async () => {
			const { data: existing } = await supabase.auth.getSession();
			if (existing.session) return;
			await new Promise((resolve, reject) => {
				let settled = false;
				const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
					if (!session || settled) return;
					if (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
						settled = true;
						window.clearTimeout(timeoutId);
						subscription.subscription.unsubscribe();
						resolve();
					}
				});
				const timeoutId = window.setTimeout(() => {
					if (settled) return;
					settled = true;
					subscription.subscription.unsubscribe();
					reject(/* @__PURE__ */ new Error("We couldn't confirm your sign-in. Please try again."));
				}, 5e3);
			});
		};
		const finishSignIn = async () => {
			const url = new URL(window.location.href);
			const authError = readAuthError(url);
			if (authError) throw new Error(authError);
			if (url.searchParams.get("code")) {
				const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(window.location.href);
				if (exchangeError) throw exchangeError;
			} else await waitForSession();
			if (!active) return;
			toast.success("Signed in successfully.");
			window.location.replace(safeNext);
		};
		finishSignIn().catch((caughtError) => {
			if (!active) return;
			console.error("[Auth] OAuth callback failed", caughtError);
			setError(caughtError instanceof Error ? caughtError.message : "Unable to complete sign-in.");
		});
		return () => {
			active = false;
		};
	}, [safeNext]);
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsx("section", {
		className: "max-w-md mx-auto container-px py-24",
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white border border-border rounded-2xl p-8 shadow-soft text-center",
			children: error ? /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto",
					children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-6 h-6" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl font-bold text-brand-deep mt-4",
					children: "Google sign-in failed"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: error
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-col sm:flex-row gap-3 justify-center",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						className: "bg-gradient-hero text-white",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/auth",
							children: "Try again"
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/",
							children: "Back to home"
						})
					})]
				})
			] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin mx-auto text-brand" }),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl font-bold text-brand-deep mt-4",
					children: "Finishing sign-in"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "We're securely connecting your Google account and preparing your dashboard."
				})
			] })
		})
	}) });
}
//#endregion
export { AuthCallbackPage as component };
