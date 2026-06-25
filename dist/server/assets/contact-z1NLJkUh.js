import { c as Button, n as Label, s as Input, t as SiteLayout } from "./SiteLayout-BlQ2l9hW.js";
import { t as Textarea } from "./textarea-D1o4ByBs.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
//#region src/routes/contact.tsx?tsr-split=component
function Contact() {
	const [sent, setSent] = useState(false);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "bg-gradient-deep text-white py-14",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto container-px text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-xs font-bold tracking-[0.25em] uppercase text-brand-cyan",
					children: "We're here"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-5xl md:text-6xl font-bold mt-3",
					children: "Get in touch"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-white/70 mt-3 max-w-xl mx-auto",
					children: "Questions about orders, products or corporate gifting? Our team responds within 24 hours."
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "py-14",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto container-px grid lg:grid-cols-2 gap-10",
			children: [/* @__PURE__ */ jsx("div", {
				className: "space-y-5",
				children: [
					{
						i: Phone,
						t: "Call us",
						s: "+91 98489 56829",
						href: "tel:+919848956829"
					},
					{
						i: Mail,
						t: "Email us",
						s: "lavishgrandtraderspvtltd@gmail.com",
						href: "mailto:lavishgrandtraderspvtltd@gmail.com"
					},
					{
						i: MapPin,
						t: "Visit us",
						s: "Plot No 7/A, Phase-V, IDA Cherlapally, EC Nagar, Navodaya Colony, Hyderabad — 500051"
					},
					{
						i: MessageSquare,
						t: "WhatsApp",
						s: "Chat with us 9 AM – 9 PM IST"
					}
				].map((c) => /* @__PURE__ */ jsx("a", {
					href: c.href,
					className: "block bg-white border border-border rounded-2xl p-5 hover:border-brand/30 hover:shadow-soft transition-all",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-11 h-11 rounded-xl bg-gradient-hero text-white flex items-center justify-center",
							children: /* @__PURE__ */ jsx(c.i, { className: "w-5 h-5" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-display font-bold text-brand-deep",
							children: c.t
						}), /* @__PURE__ */ jsx("div", {
							className: "text-sm text-muted-foreground",
							children: c.s
						})] })]
					})
				}, c.t))
			}), sent ? /* @__PURE__ */ jsxs("div", {
				className: "bg-white border border-border rounded-2xl p-10 text-center self-start",
				children: [/* @__PURE__ */ jsx("div", {
					className: "font-display text-2xl font-bold text-brand-deep",
					children: "Thanks for reaching out"
				}), /* @__PURE__ */ jsx("div", {
					className: "text-muted-foreground mt-2",
					children: "We'll get back to you within 24 hours."
				})]
			}) : /* @__PURE__ */ jsxs("form", {
				onSubmit: (e) => {
					e.preventDefault();
					setSent(true);
					toast.success("Message sent");
				},
				className: "bg-white border border-border rounded-2xl p-8 shadow-soft space-y-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Name *" }), /* @__PURE__ */ jsx(Input, { required: true })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx(Label, { children: "Email *" }), /* @__PURE__ */ jsx(Input, {
								type: "email",
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx(Label, { children: "Phone" }), /* @__PURE__ */ jsx(Input, {})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ jsx(Label, { children: "Message *" }), /* @__PURE__ */ jsx(Textarea, {
							rows: 5,
							required: true
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						className: "w-full bg-gradient-hero text-white h-12 shadow-elegant",
						children: "Send Message"
					})
				]
			})]
		})
	})] });
}
//#endregion
export { Contact as component };
