import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useQuote } from "./quote-7F6hop_-.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { n as formatPrice } from "./catalog-BvPKNVVF.mjs";
import { t as getLocalizedField } from "./use-locale-Da_z602D.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-DfZXwRq6.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const { t, i18n } = useTranslation();
	const { add } = useQuote();
	const imageUrl = p.image_url || p.image || "https://placehold.co/600x600?text=Pas+d'image";
	const isOutOfStock = p.stock !== void 0 && p.stock <= 0;
	const translatedName = getLocalizedField(p, "name", i18n.language);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group bg-card border hover:shadow-elegant transition-shadow relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/produit/$slug",
				params: { slug: p.slug },
				className: "block overflow-hidden aspect-square",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageUrl,
					alt: translatedName,
					loading: "lazy",
					width: 1024,
					height: 1024,
					className: `h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isOutOfStock ? "opacity-50 grayscale" : ""}`
				})
			}),
			isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-3 end-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded",
				children: t("product.outOfStockBadge")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/produit/$slug",
					params: { slug: p.slug },
					className: "font-display text-2xl hover:text-primary",
					children: translatedName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							t("product.from"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-semibold",
								children: formatPrice(p.price)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (isOutOfStock) {
								toast.error(t("product.outOfStockToast"));
								return;
							}
							add(p.slug);
							toast.success(t("product.addedNamed", { name: translatedName }));
						},
						disabled: isOutOfStock,
						"aria-label": t("product.addToQuote"),
						className: `h-9 w-9 flex items-center justify-center transition-colors ${isOutOfStock ? "bg-zinc-200 text-zinc-400 cursor-not-allowed" : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProductCard as t };
