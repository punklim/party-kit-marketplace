import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useQuote } from "./quote-7F6hop_-.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { A as Copy, L as Check, R as Calendar, h as MessageCircle, t as X, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-BjHyiP9x.mjs";
import { n as formatPrice } from "./catalog-BvPKNVVF.mjs";
import { b as eachDayOfInterval, k as differenceInCalendarDays, r as parseISO, u as format } from "../_libs/date-fns.mjs";
import { t as getLocalizedField } from "./use-locale-Da_z602D.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ProductCard } from "./ProductCard-DfZXwRq6.mjs";
import { t as Route } from "./produit._slug-BvzYENiF.mjs";
import { t as DayPicker } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produit._slug-BuodanV5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_DAYS = 60;
var WHATSAPP_NUMBER = "212691055597";
function ProductPage() {
	const { slug } = Route.useParams();
	const { t, i18n } = useTranslation();
	const dateLocale = useDateLocale();
	const dir = useTextDirection();
	const [product, setProduct] = (0, import_react.useState)(null);
	const [categoryName, setCategoryName] = (0, import_react.useState)("");
	const [related, setRelated] = (0, import_react.useState)([]);
	const [booked, setBooked] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [qty, setQty] = (0, import_react.useState)(1);
	const { add } = useQuote();
	const [showBookingForm, setShowBookingForm] = (0, import_react.useState)(false);
	const [dateRange, setDateRange] = (0, import_react.useState)();
	const [bookingForm, setBookingForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: ""
	});
	const [bookingLoading, setBookingLoading] = (0, import_react.useState)(false);
	const [confirmation, setConfirmation] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const confirmationRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const fetchProduct = async () => {
			setLoading(true);
			setConfirmation(null);
			const { data: productData } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
			if (cancelled) return;
			if (!productData) {
				setProduct(null);
				setLoading(false);
				return;
			}
			setProduct(productData);
			setQty(1);
			setDateRange(void 0);
			const [catRes, relatedRes, bookedRes] = await Promise.all([
				productData.category_id ? supabase.from("categories").select("name").eq("id", productData.category_id).maybeSingle() : Promise.resolve({ data: null }),
				productData.category_id ? supabase.from("products").select("*").eq("category_id", productData.category_id).neq("id", productData.id).limit(4) : Promise.resolve({ data: [] }),
				supabase.rpc("get_booked_ranges", { p_product: productData.id })
			]);
			if (cancelled) return;
			setCategoryName(catRes.data?.name ?? "");
			setRelated(relatedRes.data ?? []);
			setBooked(bookedRes.data ?? []);
			setLoading(false);
		};
		fetchProduct();
		return () => {
			cancelled = true;
		};
	}, [slug]);
	(0, import_react.useEffect)(() => {
		if (confirmation) confirmationRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}, [confirmation]);
	const disabledDays = (0, import_react.useMemo)(() => {
		const result = [];
		if (!product) return result;
		const usedPerDay = /* @__PURE__ */ new Map();
		for (const b of booked) {
			const start = parseISO(b.start_date);
			const end = parseISO(b.end_date);
			if (end < start || differenceInCalendarDays(end, start) > 366) continue;
			for (const day of eachDayOfInterval({
				start,
				end
			})) {
				const key = format(day, "yyyy-MM-dd");
				usedPerDay.set(key, (usedPerDay.get(key) ?? 0) + b.quantity);
			}
		}
		usedPerDay.forEach((used, key) => {
			if (product.stock - used < qty) result.push(parseISO(key));
		});
		return result;
	}, [
		booked,
		product,
		qty
	]);
	const nbDays = dateRange?.from && dateRange?.to ? differenceInCalendarDays(dateRange.to, dateRange.from) + 1 : 0;
	const formatLong = (d) => format(d, "dd MMMM yyyy", { locale: dateLocale });
	const handleBooking = async (e) => {
		e.preventDefault();
		const from = dateRange?.from;
		const to = dateRange?.to;
		if (!from || !to) {
			toast.error(t("booking.errPeriod"));
			return;
		}
		if (nbDays > MAX_DAYS) {
			toast.error(t("booking.errMaxDays", { max: MAX_DAYS }));
			return;
		}
		if (disabledDays.some((d) => differenceInCalendarDays(d, from) >= 0 && differenceInCalendarDays(to, d) >= 0)) {
			toast.error(t("booking.errBlocked"));
			return;
		}
		setBookingLoading(true);
		const startStr = format(from, "yyyy-MM-dd");
		const endStr = format(to, "yyyy-MM-dd");
		const { data: available } = await supabase.rpc("get_available_quantity", {
			p_product: product.id,
			p_start: startStr,
			p_end: endStr
		});
		if (typeof available === "number" && available < qty) {
			setBookingLoading(false);
			toast.error(available > 0 ? t("booking.errAvailable", { count: available }) : t("booking.errUnavailable"));
			return;
		}
		const { data: reference, error } = await supabase.rpc("create_booking", {
			p_product: product.id,
			p_start: startStr,
			p_end: endStr,
			p_quantity: qty,
			p_name: bookingForm.name.trim(),
			p_email: bookingForm.email.trim(),
			p_phone: bookingForm.phone.trim()
		});
		setBookingLoading(false);
		if (error) {
			console.error(error);
			toast.error(error.code === "P0001" ? error.message : t("booking.errGeneric"));
			return;
		}
		setConfirmation({
			reference: String(reference),
			productName: product.name,
			start: from,
			end: to,
			quantity: qty,
			days: nbDays,
			total: Number(product.price) * qty * nbDays
		});
		setCopied(false);
		setShowBookingForm(false);
		setDateRange(void 0);
		setBookingForm({
			name: "",
			email: "",
			phone: ""
		});
	};
	const copyReference = async () => {
		if (!confirmation) return;
		try {
			await navigator.clipboard.writeText(confirmation.reference);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			toast.error(t("confirmation.copyError"));
		}
	};
	const whatsappUrl = confirmation ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour, j'ai envoyé la demande de réservation ${confirmation.reference} : ${confirmation.quantity} × ${confirmation.productName} du ${format(confirmation.start, "dd/MM/yyyy")} au ${format(confirmation.end, "dd/MM/yyyy")}. Pouvez-vous me confirmer la disponibilité ?`)}` : "#";
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	}) });
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl mb-4",
			children: t("product.notFoundTitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogue",
			className: "text-primary underline",
			children: t("product.backToCatalogue")
		})]
	}) });
	const imageUrl = product.image_url || "https://placehold.co/600x600?text=Pas+d'image";
	const isOutOfStock = product.stock <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: product.name,
				width: 1024,
				height: 1024,
				className: `w-full aspect-square object-cover ${isOutOfStock ? "opacity-50 grayscale" : ""}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogue",
						className: "text-primary uppercase tracking-[0.3em] text-xs",
						children: categoryName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-5xl md:text-6xl mt-3",
						children: getLocalizedField(product, "name", i18n.language)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-muted-foreground leading-relaxed",
						children: getLocalizedField(product, "description", i18n.language)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-3xl font-display",
						children: [
							formatPrice(product.price),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base text-muted-foreground font-sans",
								children: t("product.perDay")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm mt-2 font-medium",
						children: product.stock > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-green-600",
							children: t("product.inStock", { count: product.stock })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-red-600",
							children: t("product.outOfStock")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								max: product.stock > 0 ? product.stock : 1,
								value: qty,
								onChange: (e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1))),
								disabled: isOutOfStock,
								className: "w-24 border bg-card px-3 text-center disabled:opacity-50",
								"aria-label": t("product.qtyLabel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: isOutOfStock,
								onClick: () => {
									if (qty > product.stock) {
										toast.error(t("product.stockLeft", { count: product.stock }));
										return;
									}
									add(product.slug, qty);
									toast.success(t("product.addedToast"));
								},
								className: "flex-1 bg-secondary text-secondary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
								children: isOutOfStock ? t("product.outOfStock") : t("product.addToQuote")
							})]
						}), !isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowBookingForm(!showBookingForm),
							className: "w-full border-2 border-primary text-primary py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), showBookingForm ? t("product.cancelReserve") : t("product.reserve")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: t("product.indicativePrice")
					})
				]
			})]
		}),
		confirmation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			ref: confirmationRef,
			className: "mx-auto max-w-7xl px-6 pb-16",
			"aria-live": "polite",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-2 border-primary bg-primary/5 rounded-sm p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: t("confirmation.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-zinc-600 max-w-2xl",
							children: t("confirmation.text")
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setConfirmation(null),
							"aria-label": t("confirmation.close"),
							className: "p-1 text-zinc-500 hover:text-zinc-900",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							dir: "ltr",
							className: "font-mono text-xl md:text-2xl tracking-wide bg-white border px-4 py-3 select-all",
							children: confirmation.reference
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: copyReference,
							className: "inline-flex items-center gap-2 border px-4 py-3 text-sm bg-white hover:border-primary transition-colors",
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), copied ? t("confirmation.copied") : t("confirmation.copy")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid gap-4 sm:grid-cols-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs uppercase tracking-wider text-zinc-500",
								children: t("confirmation.product")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1 font-medium",
								children: [
									confirmation.quantity,
									" × ",
									confirmation.productName
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs uppercase tracking-wider text-zinc-500",
								children: t("confirmation.period")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1 font-medium",
								children: [
									t("booking.fromTo", {
										start: formatLong(confirmation.start),
										end: formatLong(confirmation.end)
									}),
									" ",
									"(",
									t("common.days", { count: confirmation.days }),
									")"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs uppercase tracking-wider text-zinc-500",
								children: t("confirmation.total")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-medium",
								children: formatPrice(confirmation.total)
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/mes-reservations",
							className: "bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors",
							children: t("confirmation.track")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-2 border-2 border-[#25D366] text-[#128C4A] px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#25D366] hover:text-white transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), t("confirmation.whatsapp")]
						})]
					})
				]
			})
		}),
		showBookingForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-6 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-zinc-50 border rounded-sm p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl mb-6",
					children: t("booking.title", { name: product.name })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-zinc-600 mb-4",
						children: t("booking.calendarHelp", { qty })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white border p-4 inline-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
							mode: "range",
							selected: dateRange,
							onSelect: setDateRange,
							disabled: [{ before: /* @__PURE__ */ new Date() }, ...disabledDays],
							locale: dateLocale,
							dir,
							numberOfMonths: 1
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleBooking,
						className: "space-y-4",
						children: [
							dateRange?.from && dateRange?.to && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-primary/10 border border-primary p-4 rounded",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: t("booking.selectedPeriod")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-display",
										children: t("booking.fromTo", {
											start: formatLong(dateRange.from),
											end: formatLong(dateRange.to)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-zinc-600 mt-1",
										children: [
											t("common.days", { count: nbDays }),
											" × ",
											t("common.units", { count: qty }),
											" ·",
											" ",
											t("booking.estimatedTotal", { total: formatPrice(product.price * qty * nbDays) })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block",
								children: t("booking.name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 2,
								maxLength: 100,
								value: bookingForm.name,
								onChange: (e) => setBookingForm({
									...bookingForm,
									name: e.target.value
								}),
								className: "w-full border bg-card px-4 py-3 text-sm"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block",
								children: t("booking.email")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								maxLength: 150,
								dir: "ltr",
								value: bookingForm.email,
								onChange: (e) => setBookingForm({
									...bookingForm,
									email: e.target.value
								}),
								className: "w-full border bg-card px-4 py-3 text-sm"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block",
								children: t("booking.phone")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "tel",
								maxLength: 30,
								dir: "ltr",
								value: bookingForm.phone,
								onChange: (e) => setBookingForm({
									...bookingForm,
									phone: e.target.value
								}),
								className: "w-full border bg-card px-4 py-3 text-sm"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: bookingLoading || !dateRange?.from || !dateRange?.to,
								className: "w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors disabled:opacity-50",
								children: bookingLoading ? t("booking.sending") : t("booking.submit")
							})
						]
					})]
				})]
			})
		}),
		related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 pb-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-4xl mb-8",
				children: t("product.related")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p: r }, r.id))
			})]
		})
	] });
}
//#endregion
export { ProductPage as component };
