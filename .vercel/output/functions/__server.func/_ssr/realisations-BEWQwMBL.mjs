import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as X, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/realisations-BEWQwMBL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Realisations() {
	const { t } = useTranslation();
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedPhoto, setSelectedPhoto] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("gallery").select("*").order("created_at", { ascending: false }).then(({ data }) => {
			setPhotos(data || []);
			setLoading(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("realisations.title"),
			subtitle: t("realisations.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4",
				children: [photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "break-inside-avoid cursor-pointer overflow-hidden rounded-sm group",
					onClick: () => setSelectedPhoto(p.image_url),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image_url,
						alt: p.title,
						className: "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
					})
				}, p.id)), photos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-full text-center py-20 text-zinc-500",
					children: t("realisations.empty")
				})]
			})
		}),
		selectedPhoto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4",
			onClick: () => setSelectedPhoto(null),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setSelectedPhoto(null),
				"aria-label": t("realisations.close"),
				className: "absolute top-6 end-6 text-white/70 hover:text-white transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-8 w-8" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: selectedPhoto,
				alt: t("realisations.title"),
				className: "max-w-full max-h-[90vh] object-contain",
				onClick: (e) => e.stopPropagation()
			})]
		})
	] });
}
//#endregion
export { Realisations as component };
