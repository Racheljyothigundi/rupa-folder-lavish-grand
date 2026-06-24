import { t as supabase } from "./client-K-6dw9l-.js";
import { c as Button, n as Label, s as Input, t as SiteLayout } from "./SiteLayout-Dgi8_szj.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
//#region src/routes/reset-password.tsx?tsr-split=component
function ResetPassword() {
	const nav = useNavigate();
	const [ready, setReady] = useState(false);
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [busy, setBusy] = useState(false);
	useEffect(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") setReady(true);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setReady(true);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const submit = async (e) => {
		e.preventDefault();
		if (password !== confirm) {
			toast.error("Passwords don't match");
			return;
		}
		setBusy(true);
		const { error } = await supabase.auth.updateUser({ password });
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Password updated");
		nav({
			to: "/account",
			search: { tab: "dashboard" }
		});
	};
	return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsx("section", {
		className: "max-w-md mx-auto container-px py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-white border border-border rounded-2xl p-8 shadow-soft",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-12 h-12 rounded-full bg-gradient-hero text-white flex items-center justify-center mb-4",
					children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6" })
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl font-bold text-brand-deep",
					children: "Set a new password"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Choose a strong password you haven't used before."
				}),
				ready ? /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "New password" }), /* @__PURE__ */ jsx(Input, {
								type: "password",
								required: true,
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Confirm password" }), /* @__PURE__ */ jsx(Input, {
								type: "password",
								required: true,
								minLength: 6,
								value: confirm,
								onChange: (e) => setConfirm(e.target.value)
							})]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: busy,
							className: "w-full h-11 bg-gradient-hero text-white shadow-elegant",
							children: [busy && /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }), " Update Password"]
						})
					]
				}) : /* @__PURE__ */ jsx("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: "Waiting for recovery link… Open the link from your email on this device."
				})
			]
		})
	}) });
}
//#endregion
export { ResetPassword as component };
