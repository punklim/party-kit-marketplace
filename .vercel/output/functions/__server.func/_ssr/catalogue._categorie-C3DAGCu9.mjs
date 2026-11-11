import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
import { i as products, t as categories } from "./catalog-BvPKNVVF.mjs";
import { t as Route } from "./catalogue._categorie-D92ayXzA.mjs";
import { t as getLocalizedField } from "./use-locale-Da_z602D.mjs";
import { t as ProductCard } from "./ProductCard-DfZXwRq6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue._categorie-C3DAGCu9.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriePage() {
	const { categorie } = Route.useParams();
	const { t, i18n } = useTranslation();
	const cat = categories.find((c) => c.slug === categorie);
	const filtered = products.filter((p) => p.category === categorie);
	if (!cat) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("category.notFound") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/catalogue",
			className: "text-primary underline",
			children: t("product.backToCatalogue")
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: getLocalizedField(cat, "name", i18n.language),
		subtitle: getLocalizedField(cat, "description", i18n.language)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: t("category.count", { count: filtered.length })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogue",
				className: "text-sm uppercase tracking-widest hover:text-primary",
				children: t("category.seeAll")
			})]
		}), filtered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
			children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.slug))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-12 border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-4",
				children: t("category.empty")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/catalogue",
				className: "bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm",
				children: t("category.seeCatalogue")
			})]
		})]
	})] });
}
//#endregion
export { CategoriePage as component };
