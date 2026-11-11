import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { _ as MapPin, f as Phone, v as Mail } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-1KDogmeg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";
function Contact() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		message: ""
	});
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		const { error: supabaseError } = await supabase.from("contact_messages").insert({
			name: form.name,
			phone: form.phone,
			email: form.email,
			message: form.message
		});
		setLoading(false);
		if (supabaseError) {
			console.error(supabaseError);
			setError("Une erreur est survenue. Veuillez réessayer.");
		} else setSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Contact",
		subtitle: "Parlons de votre prochain événement"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-[1fr_1.4fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-8",
			children: [
				[
					MapPin,
					"Adresse",
					"Casablanca, Maroc"
				],
				[
					Phone,
					"Téléphone",
					"+212 6 00 00 00 00"
				],
				[
					Mail,
					"Email",
					"contact@eclat-events.ma"
				]
			].map(([Icon, t, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-6 w-6 text-primary",
					strokeWidth: 1.25
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: v
				})] })]
			}, t))
		}), sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-muted p-10 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-4xl",
				children: "Message envoyé"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Nous revenons vers vous rapidement."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "bg-muted p-8 space-y-4",
			children: [
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-red-100 text-red-700 p-3 text-sm border border-red-300",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid sm:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						name: "name",
						value: form.name,
						onChange: handleChange,
						placeholder: "Nom",
						className: field
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						name: "phone",
						value: form.phone,
						onChange: handleChange,
						type: "tel",
						placeholder: "Téléphone",
						className: field
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "email",
					value: form.email,
					onChange: handleChange,
					type: "email",
					placeholder: "Email",
					className: field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					name: "message",
					value: form.message,
					onChange: handleChange,
					rows: 5,
					placeholder: "Votre message",
					className: field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: loading,
					className: "bg-secondary text-secondary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50",
					children: loading ? "Envoi..." : "Envoyer"
				})
			]
		})]
	})] });
}
//#endregion
export { Contact as component };
