import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { M as CircleX, N as CircleCheckBig, R as Calendar, j as Clock, u as Search, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-BjHyiP9x.mjs";
import { n as formatPrice } from "./catalog-BvPKNVVF.mjs";
import { k as differenceInCalendarDays, r as parseISO, u as format } from "../_libs/date-fns.mjs";
import { n as useDateLocale } from "./use-locale-Da_z602D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mes-reservations-BVeSsJNk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";
function MesReservations() {
	const { t } = useTranslation();
	const dateLocale = useDateLocale();
	const [email, setEmail] = (0, import_react.useState)("");
	const [reference, setReference] = (0, import_react.useState)("");
	const [reservations, setReservations] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSearch = async (e) => {
		e.preventDefault();
		if (!email.trim() || !reference.trim()) return;
		setLoading(true);
		setError("");
		setReservations(null);
		const { data, error: err } = await supabase.rpc("lookup_bookings", {
			p_email: email.trim(),
			p_reference: reference.trim()
		});
		setLoading(false);
		if (err) {
			console.error(err);
			setError(t("reservations.error"));
			return;
		}
		setReservations(data ?? []);
	};
	const getStatusBadge = (status) => {
		if (status === "confirme") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3" }),
				" ",
				t("reservations.statusConfirmed")
			]
		});
		if (status === "annule") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }),
				" ",
				t("reservations.statusCancelled")
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
				" ",
				t("reservations.statusPending")
			]
		});
	};
	const formatDate = (d) => format(parseISO(d), "dd MMMM yyyy", { locale: dateLocale });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-4xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-5xl md:text-6xl mb-4",
				children: t("reservations.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-10",
				children: t("reservations.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSearch,
				className: "grid gap-3 max-w-xl mb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "suivi-email",
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
						children: t("reservations.emailLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "suivi-email",
						type: "email",
						required: true,
						maxLength: 150,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: t("reservations.emailPlaceholder"),
						className: field,
						dir: "ltr"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "suivi-ref",
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
						children: t("reservations.refLabel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "suivi-ref",
						required: true,
						maxLength: 40,
						value: reference,
						onChange: (e) => setReference(e.target.value),
						placeholder: "RS-2026-0001-A3F9C",
						className: `${field} font-mono`,
						dir: "ltr"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading,
						className: "bg-[#D4AF37] text-black px-6 py-3 text-sm font-medium rounded hover:bg-[#c4a030] flex items-center justify-center gap-2 disabled:opacity-50",
						children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), t("reservations.submit")]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-red-100 text-red-700 p-4 border border-red-300 mb-6",
				children: error
			}),
			reservations && reservations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border p-12 text-center text-muted-foreground",
				children: [
					t("reservations.notFound"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogue",
						className: "text-primary underline mt-4 inline-block",
						children: t("quote.browse")
					})
				]
			}),
			reservations && reservations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("reservations.found", { count: reservations.length })
				}), reservations.map((r) => {
					const days = differenceInCalendarDays(parseISO(r.end_date), parseISO(r.start_date)) + 1;
					const qty = r.quantity ?? 1;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border rounded-sm overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row",
							children: [r.product_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: r.product_image,
								alt: r.product_name ?? t("reservations.productFallback"),
								className: "w-full md:w-48 h-48 md:h-auto object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start mb-4 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-display text-2xl",
											children: r.product_name || t("reservations.productFallback")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-mono",
											dir: "ltr",
											children: t("reservations.ref", { reference: r.reference })
										})] }), getStatusBadge(r.status)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-[#D4AF37]" }), t("booking.fromTo", {
												start: formatDate(r.start_date),
												end: formatDate(r.end_date)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-[#D4AF37]" }),
												t("common.days", { count: days }),
												" · ",
												t("reservations.quantity", { count: qty })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center mt-6 pt-4 border-t gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												r.status === "confirme" && t("reservations.msgConfirmed"),
												r.status === "en_attente" && t("reservations.msgPending"),
												r.status === "annule" && t("reservations.msgCancelled")
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-xl font-bold text-[#D4AF37] whitespace-nowrap",
											children: formatPrice(Number(r.product_price ?? 0) * qty * days)
										})]
									})
								]
							})]
						})
					}, r.id);
				})]
			})
		]
	}) });
}
//#endregion
export { MesReservations as component };
