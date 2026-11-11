import { t as tentes_default } from "./tentes-BFQcgTxt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-BvPKNVVF.js
var mobilier_default = "/assets/mobilier-D7XDrny1.jpg";
var sono_default = "/assets/sono-DUMjoLrk.jpg";
var hero_default = "/assets/hero-CeWnRVRQ.jpg";
var categories = [
	{
		slug: "mobilier",
		name: "Mobilier",
		description: "Chaises, tables, salons lounge",
		image: mobilier_default
	},
	{
		slug: "tentes",
		name: "Tentes & Chapiteaux",
		description: "Structures pour tous formats",
		image: tentes_default
	},
	{
		slug: "son-lumiere",
		name: "Son & Lumière",
		description: "Sonorisation, éclairage, écrans LED",
		image: sono_default
	},
	{
		slug: "art-de-table",
		name: "Art de la table",
		description: "Vaisselle, nappes, décoration",
		image: hero_default
	}
];
var products = [
	{
		slug: "chaise-chiavari-doree",
		name: "Chaise Chiavari dorée",
		category: "mobilier",
		price: 25,
		image: mobilier_default,
		description: "Chaise élégante avec coussin blanc, idéale pour mariages et galas."
	},
	{
		slug: "table-ronde-10",
		name: "Table ronde 10 personnes",
		category: "mobilier",
		price: 80,
		image: mobilier_default,
		description: "Table ronde Ø180 cm, nappe blanche en option."
	},
	{
		slug: "salon-lounge",
		name: "Salon lounge blanc",
		category: "mobilier",
		price: 450,
		image: hero_default,
		description: "Canapé + 2 fauteuils + table basse pour espaces VIP."
	},
	{
		slug: "chapiteau-10x20",
		name: "Chapiteau 10×20 m",
		category: "tentes",
		price: 6500,
		image: tentes_default,
		description: "Structure aluminium, jusqu'à 200 invités assis. Montage inclus."
	},
	{
		slug: "tente-pagode-5x5",
		name: "Tente pagode 5×5 m",
		category: "tentes",
		price: 1200,
		image: tentes_default,
		description: "Parfaite pour accueil, bar ou espace cocktail."
	},
	{
		slug: "pack-sono-pro",
		name: "Pack sonorisation pro",
		category: "son-lumiere",
		price: 2500,
		image: sono_default,
		description: "Line array, table de mixage, 2 micros HF. Technicien inclus."
	},
	{
		slug: "ecran-led-3x2",
		name: "Écran LED 3×2 m",
		category: "son-lumiere",
		price: 3800,
		image: sono_default,
		description: "Écran haute luminosité intérieur / extérieur."
	},
	{
		slug: "lyre-asservie",
		name: "Lyre asservie",
		category: "son-lumiere",
		price: 350,
		image: sono_default,
		description: "Projecteur motorisé pour ambiances scéniques."
	},
	{
		slug: "assiette-filet-or",
		name: "Assiette filet or",
		category: "art-de-table",
		price: 6,
		image: hero_default,
		description: "Porcelaine blanche bordée or."
	},
	{
		slug: "verre-cristal",
		name: "Verre à pied cristal",
		category: "art-de-table",
		price: 4,
		image: hero_default,
		description: "Verre à eau ou à vin, lot de 24."
	}
];
var formatPrice = (n) => `${n.toLocaleString("fr-FR")} MAD`;
//#endregion
export { products as i, formatPrice as n, hero_default as r, categories as t };
