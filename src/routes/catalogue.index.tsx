import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { getLocalizedField } from "@/lib/use-locale"; // NOUVEL IMPORT

export const Route = createFileRoute("/catalogue/")({
  validateSearch: (s: Record<string, unknown>): { categorie?: string | undefined } => ({
    categorie: typeof s["categorie"] === "string" ? (s["categorie"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Catalogue — Éclat Events" },
      { name: "description", content: "Parcourez notre catalogue de matériel événementiel en location : mobilier, tentes, son & lumière." },
    ],
  }),
  component: Catalogue,
});

function Catalogue() {
  const { t, i18n } = useTranslation();
  const { categorie } = Route.useSearch();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: catData } = await (supabase as any).from("categories").select("*");
      const { data: prodData } = await (supabase as any).from("products").select("*").order("created_at", { ascending: false });

      setCategories(catData || []);
      setProducts(prodData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  const list = categorie
    ? products.filter((p) => {
        const cat = categories.find((c) => c.slug === categorie);
        return cat ? p.category_id === cat.id : false;
      })
    : products;

  const pill = "px-5 py-2 text-xs uppercase tracking-widest border transition-colors";

  return (
    <SiteLayout>
      <PageHeader title={t("catalogue.title")} subtitle={t("catalogue.subtitle")} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link to="/catalogue" search={{}} className={`${pill} ${!categorie ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`}>{t("catalogue.all")}</Link>
          {categories.map((c) => {
            // NOUVEAU : On traduit le nom de la catégorie
            const catName = getLocalizedField(c, "name", i18n.language);
            return (
              <Link key={c.slug} to="/catalogue" search={{ categorie: c.slug }} className={`${pill} ${categorie === c.slug ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`}>{catName}</Link>
            );
          })}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {t("catalogue.empty")}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}