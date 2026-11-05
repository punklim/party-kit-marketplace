import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";

export const Route = createFileRoute("/catalogue/")({
  validateSearch: (s: Record<string, unknown>): { categorie?: string | undefined } => ({
    categorie: typeof s["categorie"] === "string" ? (s["categorie"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catalogue — Éclat Events" },
      { name: "description", content: "Parcourez notre catalogue de matériel événementiel en location : mobilier, tentes, son & lumière." },
      { property: "og:title", content: "Catalogue — Éclat Events" },
      { property: "og:description", content: "Tout notre matériel événementiel en location." },
    ],
  }),
  component: Catalogue,
});

function Catalogue() {
  const { categorie } = Route.useSearch();
  const list = categorie ? products.filter((p) => p.category === categorie) : products;
  const pill = "px-5 py-2 text-xs uppercase tracking-widest border transition-colors";
  return (
    <SiteLayout>
      <PageHeader title="Catalogue" subtitle="Tout le matériel pour réussir votre événement" />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link to="/catalogue" search={{}} className={`${pill} ${!categorie ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`}>Tout</Link>
          {categories.map((c) => (
            <Link key={c.slug} to="/catalogue" search={{ categorie: c.slug }} className={`${pill} ${categorie === c.slug ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`}>{c.name}</Link>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
