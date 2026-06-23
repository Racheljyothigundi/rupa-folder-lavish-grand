import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/site/SectionHeader.tsx
function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: align === "center" ? "text-center max-w-2xl mx-auto mb-10" : "max-w-2xl mb-10",
		children: [
			eyebrow && /* @__PURE__ */ jsxs("div", {
				className: "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-brand " + (align === "center" ? "justify-center" : ""),
				children: [
					/* @__PURE__ */ jsx("span", { className: "w-8 h-px bg-gradient-gold" }),
					" ",
					eyebrow,
					" ",
					/* @__PURE__ */ jsx("span", { className: "w-8 h-px bg-gradient-gold" })
				]
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-deep mt-3",
				children: title
			}),
			subtitle && /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-muted-foreground leading-relaxed",
				children: subtitle
			})
		]
	});
}
//#endregion
export { SectionHeader as t };
