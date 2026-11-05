import mobilier from "@/assets/mobilier.jpg";
import tentes from "@/assets/tentes.jpg";
import sono from "@/assets/sono.jpg";
import hero from "@/assets/hero.jpg";

export type Category = { slug: string; name: string; description: string; image: string };
export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number; // MAD / jour / unité
  image: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "mobilier", name: "Mobilier", description: "Chaises, tables, salons lounge", image: mobilier },
  { slug: "tentes", name: "Tentes & Chapiteaux", description: "Structures pour tous formats", image: tentes },
  { slug: "son-lumiere", name: "Son & Lumière", description: "Sonorisation, éclairage, écrans LED", image: sono },
  { slug: "art-de-table", name: "Art de la table", description: "Vaisselle, nappes, décoration", image: hero },
];

export const products: Product[] = [
  { slug: "chaise-chiavari-doree", name: "Chaise Chiavari dorée", category: "mobilier", price: 25, image: mobilier, description: "Chaise élégante avec coussin blanc, idéale pour mariages et galas." },
  { slug: "table-ronde-10", name: "Table ronde 10 personnes", category: "mobilier", price: 80, image: mobilier, description: "Table ronde Ø180 cm, nappe blanche en option." },
  { slug: "salon-lounge", name: "Salon lounge blanc", category: "mobilier", price: 450, image: hero, description: "Canapé + 2 fauteuils + table basse pour espaces VIP." },
  { slug: "chapiteau-10x20", name: "Chapiteau 10×20 m", category: "tentes", price: 6500, image: tentes, description: "Structure aluminium, jusqu'à 200 invités assis. Montage inclus." },
  { slug: "tente-pagode-5x5", name: "Tente pagode 5×5 m", category: "tentes", price: 1200, image: tentes, description: "Parfaite pour accueil, bar ou espace cocktail." },
  { slug: "pack-sono-pro", name: "Pack sonorisation pro", category: "son-lumiere", price: 2500, image: sono, description: "Line array, table de mixage, 2 micros HF. Technicien inclus." },
  { slug: "ecran-led-3x2", name: "Écran LED 3×2 m", category: "son-lumiere", price: 3800, image: sono, description: "Écran haute luminosité intérieur / extérieur." },
  { slug: "lyre-asservie", name: "Lyre asservie", category: "son-lumiere", price: 350, image: sono, description: "Projecteur motorisé pour ambiances scéniques." },
  { slug: "assiette-filet-or", name: "Assiette filet or", category: "art-de-table", price: 6, image: hero, description: "Porcelaine blanche bordée or." },
  { slug: "verre-cristal", name: "Verre à pied cristal", category: "art-de-table", price: 4, image: hero, description: "Verre à eau ou à vin, lot de 24." },
];

export const formatPrice = (n: number) => `${n.toLocaleString("fr-FR")} MAD`;
