import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useQuote } from "./quote-7F6hop_-.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { a as Trash2 } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
import { n as formatPrice } from "./catalog-BvPKNVVF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/devis-B1cRdnO5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";
var EVENT_TYPES = [
	{
		value: "Mariage",
		labelKey: "quote.type.wedding"
	},
	{
		value: "Séminaire",
		labelKey: "quote.type.seminar"
	},
	{
		value: "Anniversaire",
		labelKey: "quote.type.birthday"
	},
	{
		value: "Autre",
		labelKey: "quote.type.other"
	}
];
function Devis() {
	const { t } = useTranslation();
	const { items, set, clear } = useQuote();
	const [sent, setSent] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [dbProducts, setDbProducts] = (0, import_react.useState)([]);
	const [loadingProducts, setLoadingProducts] = (0, import_react.useState)(true);
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		phone: "",
		email: "",
		eventDate: "",
		city: "",
		eventType: "",
		message: ""
	});
	(0, import_react.useEffect)(() => {
		const fetchProducts = async () => {
			const { data } = await supabase.from("products").select("*");
			setDbProducts(data || []);
			setLoadingProducts(false);
		};
		fetchProducts();
	}, []);
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};
	const lines = Object.entries(items).map(([slug, qty]) => {
		const product = dbProducts.find((p) => p.slug === slug);
		return product ? {
			p: product,
			qty
		} : null;
	}).filter((l) => l !== null);
	const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (lines.length === 0) return;
		setLoading(true);
		setError("");
		const formattedItems = lines.map((l) => ({
			slug: l.p.slug,
			name: l.p.name,
			qty: l.qty,
			price: l.p.price
		}));
		const { error: supabaseError } = await supabase.from("quote_requests").insert({
			full_name: form.fullName,
			phone: form.phone,
			email: form.email,
			event_date: form.eventDate || null,
			city: form.city,
			event_type: form.eventType,
			message: form.message,
			items: formattedItems,
			estimated_total: total
		});
		setLoading(false);
		if (supabaseError) {
			console.error(supabaseError);
			setError(t("quote.error"));
		} else {
			clear();
			setSent(true);
		}
	};
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("quote.thanksTitle"),
		subtitle: t("quote.thanksSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogue",
			className: "uppercase tracking-widest text-sm text-primary",
			children: t("quote.back")
		})
	})] });
	if (loadingProducts) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("quote.title"),
		subtitle: t("quote.subtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_420px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border p-12 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-4",
				children: t("quote.empty")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogue",
				className: "inline-block bg-secondary text-secondary-foreground px-6 py-3 uppercase tracking-widest text-sm",
				children: t("quote.browse")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "divide-y border",
			children: [lines.map(({ p, qty }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image_url || "https://placehold.co/100?text=Pas+d'image",
						alt: p.name,
						className: "h-20 w-20 object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("quote.perUnit", { price: formatPrice(p.price) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						value: qty,
						onChange: (e) => set(p.slug, Math.max(1, Number(e.target.value) || 1)),
						className: "w-20 border bg-card px-2 py-2 text-center",
						"aria-label": t("product.qtyLabel")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => set(p.slug, 0),
						"aria-label": t("quote.remove"),
						className: "text-muted-foreground hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			}, p.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 flex justify-between font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("quote.totalPerDay") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(total) })]
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "bg-muted p-8 space-y-4 h-fit",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: t("quote.formTitle")
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-red-100 text-red-700 p-3 text-sm border border-red-300",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "fullName",
					value: form.fullName,
					onChange: handleChange,
					placeholder: t("quote.fullName"),
					"aria-label": t("quote.fullName"),
					className: field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "phone",
					value: form.phone,
					onChange: handleChange,
					type: "tel",
					placeholder: t("quote.phone"),
					"aria-label": t("quote.phone"),
					className: field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					name: "email",
					value: form.email,
					onChange: handleChange,
					type: "email",
					placeholder: t("quote.email"),
					"aria-label": t("quote.email"),
					className: field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						name: "eventDate",
						value: form.eventDate,
						onChange: handleChange,
						type: "date",
						className: field,
						"aria-label": t("quote.eventDate")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "city",
						value: form.city,
						onChange: handleChange,
						placeholder: t("quote.city"),
						"aria-label": t("quote.city"),
						className: field
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					name: "eventType",
					value: form.eventType,
					onChange: handleChange,
					className: field,
					"aria-label": t("quote.eventType"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						disabled: true,
						children: t("quote.eventType")
					}), EVENT_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: type.value,
						children: t(type.labelKey)
					}, type.value))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					name: "message",
					value: form.message,
					onChange: handleChange,
					rows: 4,
					placeholder: t("quote.message"),
					"aria-label": t("quote.message"),
					className: field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: lines.length === 0 || loading,
					className: "w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm disabled:opacity-50",
					children: loading ? t("quote.sending") : t("quote.submit")
				})
			]
		})]
	})] });
}
//#endregion
export { Devis as component };
