import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";
import { getLocalizedField } from "@/lib/use-locale";

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
  const { t, i18n } = useTranslation();
  const cat = categories.find((c) => c.slug === categorie);
  const filtered = products.filter((p) => p.category === categorie);

  if (!cat) {
    return (
      <SiteLayout>
        <PageHeader title={t("category.notFound")} />
        <div className="text-center py-16">
          <Link to="/catalogue" className="text-primary underline">{t("product.backToCatalogue")}</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        title={getLocalizedField(cat, "name", i18n.language)}
        subtitle={getLocalizedField(cat, "description", i18n.language)}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">{t("category.count", { count: filtered.length })}</p>
          <Link to="/catalogue" className="text-sm uppercase tracking-widest hover:text-primary">{t("category.seeAll")}</Link>
        </div>
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        ) : (
          <div className="text-center py-12 border">
            <p className="text-muted-foreground mb-4">{t("category.empty")}</p>
            <Link to="/catalogue" className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm">{t("category.seeCatalogue")}</Link>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}