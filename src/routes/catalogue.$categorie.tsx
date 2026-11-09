import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";

export const Route = createFileRoute("/catalogue/$categorie")({
  head: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.categorie);
    const name = cat?.name || "Catalogue";
    return {
      meta: [
        { title: `${name} en location — Éclat Events` },
        { name: "description", content: `Découvrez notre sélection de ${name.toLowerCase()} en location pour vos événements au Maroc. Livraison et montage inclus.` },
        { property: "og:title", content: `${name} en location — Éclat Events` },
        { property: "og:description", content: `Location de ${name.toLowerCase()} haut de gamme au Maroc.` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop" },
      ],
    };
  },
  component: CategoriePage,
});

function CategoriePage() {
  const { categorie } = Route.useParams();
  const cat = categories.find((c) => c.slug === categorie);
  const filtered = products.filter((p) => p.category === categorie);

  if (!cat) {
    return (
      <SiteLayout>
        <PageHeader title="Catégorie introuvable" />
        <div className="text-center py-16">
          <Link to="/catalogue" className="text-primary underline">Retour au catalogue</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader title={cat.name} subtitle={cat.description} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">{filtered.length} produit(s) disponible(s)</p>
          <Link to="/catalogue" className="text-sm uppercase tracking-widest hover:text-primary">Voir tout le catalogue →</Link>
        </div>
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        ) : (
          <div className="text-center py-12 border">
            <p className="text-muted-foreground mb-4">Aucun produit dans cette catégorie pour le moment.</p>
            <Link to="/catalogue" className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm">Voir le catalogue</Link>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}