import { t as tentes_default } from "./tentes-BFQcgTxt.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as SiteLayout, t as PageHeader } from "./SiteLayout-BjHyiP9x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/a-propos-B3jsGWFY.js
var import_jsx_runtime = require_jsx_runtime();
var stats = [
	["10+", "ans d'expérience"],
	["1500+", "événements"],
	["5000+", "articles en stock"],
	["12", "villes desservies"]
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "À propos",
		subtitle: "La passion du détail au service de vos plus beaux moments"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-24 grid gap-12 md:grid-cols-2 items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: tentes_default,
			alt: "Chapiteau illuminé",
			loading: "lazy",
			className: "w-full aspect-[4/5] object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-5xl",
				children: "Notre savoir-faire"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-muted-foreground leading-relaxed",
				children: "Depuis plus de dix ans, Éclat Events accompagne particuliers, agences et entreprises dans l'organisation de leurs événements. Notre parc de matériel est entretenu avec soin et nos équipes assurent livraison, montage et démontage."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-8",
				children: stats.map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-5xl text-primary",
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: l
				})] }, l))
			})
		] })]
	})] });
}
//#endregion
export { About as component };
