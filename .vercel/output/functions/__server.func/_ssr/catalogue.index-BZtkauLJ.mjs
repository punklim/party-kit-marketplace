import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
import { t as getLocalizedField } from "./use-locale-Da_z602D.mjs";
import { t as ProductCard } from "./ProductCard-DfZXwRq6.mjs";
import { t as Route } from "./catalogue.index-D01Y6umk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue.index-BZtkauLJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Catalogue() {
	const { t, i18n } = useTranslation();
	const { categorie } = Route.useSearch();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchData = async () => {
			const { data: catData } = await supabase.from("categories").select("*");
			const { data: prodData } = await supabase.from("products").select("*").order("created_at", { ascending: false });
			setCategories(catData || []);
			setProducts(prodData || []);
			setLoading(false);
		};
		fetchData();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	}) });
	const list = categorie ? products.filter((p) => {
		const cat = categories.find((c) => c.slug === categorie);
		return cat ? p.category_id === cat.id : false;
	}) : products;
	const pill = "px-5 py-2 text-xs uppercase tracking-widest border transition-colors";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("catalogue.title"),
		subtitle: t("catalogue.subtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3 justify-center mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalogue",
					search: {},
					className: `${pill} ${!categorie ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`,
					children: t("catalogue.all")
				}), categories.map((c) => {
					const catName = getLocalizedField(c, "name", i18n.language);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogue",
						search: { categorie: c.slug },
						className: `${pill} ${categorie === c.slug ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`,
						children: catName
					}, c.slug);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			}),
			list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-12 text-muted-foreground",
				children: t("catalogue.empty")
			})
		]
	})] });
}
//#endregion
export { Catalogue as component };
