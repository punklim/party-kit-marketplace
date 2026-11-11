import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { N as CircleCheckBig, s as Star, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/avis-CBETngyR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";
function AvisPage() {
	const { t } = useTranslation();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		role: "",
		content: "",
		rating: 5
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (form.name.trim().length < 2) {
			setError(t("avis.errorName"));
			return;
		}
		if (form.content.trim().length < 20) {
			setError(t("avis.errorContent"));
			return;
		}
		setSaving(true);
		const { error: err } = await supabase.from("testimonials").insert({
			name: form.name.trim(),
			role: form.role.trim() || null,
			content: form.content.trim(),
			rating: form.rating,
			approved: false
		});
		setSaving(false);
		if (err) setError(t("avis.errorGeneric"));
		else setSuccess(true);
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-6 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-10 w-10 text-green-600" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-display mb-4",
				children: t("avis.successTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-8",
				children: t("avis.successText")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-block bg-primary text-primary-foreground px-8 py-3 uppercase tracking-widest text-sm",
				children: t("avis.backHome")
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("avis.title"),
		subtitle: t("avis.subtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-2xl px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-6",
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-red-100 text-red-700 p-4 border border-red-300",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
					children: t("avis.rating")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setForm({
							...form,
							rating: n
						}),
						className: "p-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-8 w-8 ${n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}` })
					}, n))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
					children: t("avis.name")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: form.name,
					onChange: (e) => setForm({
						...form,
						name: e.target.value
					}),
					className: field,
					placeholder: t("avis.namePlaceholder")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
					children: t("avis.role")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.role,
					onChange: (e) => setForm({
						...form,
						role: e.target.value
					}),
					className: field,
					placeholder: t("avis.rolePlaceholder")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
					children: t("avis.content")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					value: form.content,
					onChange: (e) => setForm({
						...form,
						content: e.target.value
					}),
					rows: 6,
					className: field,
					placeholder: t("avis.contentPlaceholder")
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: saving,
					className: "w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null, saving ? t("avis.sending") : t("avis.submit")]
				})
			]
		})
	})] });
}
//#endregion
export { AvisPage as component };
