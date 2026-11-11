import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue.index-D01Y6umk.js
var $$splitComponentImporter = () => import("./catalogue.index-BZtkauLJ.mjs");
var Route = createFileRoute("/catalogue/")({
	validateSearch: (s) => ({ categorie: typeof s["categorie"] === "string" ? s["categorie"] : void 0 }),
	head: () => ({ meta: [{ title: "Catalogue — Éclat Events" }, {
		name: "description",
		content: "Parcourez notre catalogue de matériel événementiel en location : mobilier, tentes, son & lumière."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
