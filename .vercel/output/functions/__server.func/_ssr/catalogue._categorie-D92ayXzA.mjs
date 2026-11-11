import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as categories } from "./catalog-BvPKNVVF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue._categorie-D92ayXzA.js
var $$splitComponentImporter = () => import("./catalogue._categorie-C3DAGCu9.mjs");
var Route = createFileRoute("/catalogue/$categorie")({
	head: ({ params }) => {
		const name = categories.find((c) => c.slug === params.categorie)?.name || "Catalogue";
		return { meta: [
			{ title: `${name} en location — Éclat Events` },
			{
				name: "description",
				content: `Découvrez notre sélection de ${name.toLowerCase()} en location pour vos événements au Maroc. Livraison et montage inclus.`
			},
			{
				property: "og:title",
				content: `${name} en location — Éclat Events`
			},
			{
				property: "og:description",
				content: `Location de ${name.toLowerCase()} haut de gamme au Maroc.`
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
