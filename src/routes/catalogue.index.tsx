import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, X } from "lucide-react";
import { getLocalizedField } from "@/lib/use-locale";

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

type SortKey = "recent" | "priceAsc" | "priceDesc" | "name";

// Minuscules + sans accents (latin) ni voyelles brèves (arabe) pour une recherche tolérante
const normalize = (value: unknown) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[̀-ًͯ-ٟ]/g, "")
    .toLowerCase()
    .trim();

function Catalogue() {
  const { t, i18n } = useTranslation();
  const { categorie } = Route.useSearch();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const [availableOnly, setAvailableOnly] = useState(false);

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

  const filtersActive = query.trim() !== "" || availableOnly;

  const list = useMemo(() => {
    let result = products;

    if (categorie) {
      const cat = categories.find((c) => c.slug === categorie);
      result = cat ? result.filter((p) => p.category_id === cat.id) : [];
    }

    const q = normalize(query);
    if (q) {
      result = result.filter((p) =>
        normalize([p.name, p.name_en, p.name_ar, p.description, p.description_en, p.description_ar].join(" ")).includes(q)
      );
    }

    if (availableOnly) {
      result = result.filter((p) => !(p.stock !== undefined && p.stock !== null && p.stock <= 0));
    }

    const sorted = [...result];
    if (sort === "priceAsc") sorted.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "priceDesc") sorted.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sort === "name")
      sorted.sort((a, b) =>
        String(getLocalizedField(a, "name", i18n.language)).localeCompare(String(getLocalizedField(b, "name", i18n.language)), i18n.language)
      );
    // "recent" : l'ordre venant de Supabase (created_at décroissant) est conservé
    return sorted;
  }, [products, categories, categorie, query, availableOnly, sort, i18n.language]);

  const resetFilters = () => {
    setQuery("");
    setAvailableOnly(false);
    setSort("recent");
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  const pill = "px-5 py-2 text-xs uppercase tracking-widest border transition-colors";

  return (
    <SiteLayout>
      <PageHeader title={t("catalogue.title")} subtitle={t("catalogue.subtitle")} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <Link to="/catalogue" search={{}} className={`${pill} ${!categorie ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`}>{t("catalogue.all")}</Link>
          {categories.map((c) => {
            const catName = getLocalizedField(c, "name", i18n.language);
            return (
              <Link key={c.slug} to="/catalogue" search={{ categorie: c.slug }} className={`${pill} ${categorie === c.slug ? "bg-secondary text-secondary-foreground" : "hover:border-primary"}`}>{catName}</Link>
            );
          })}
        </div>

        {/* Recherche, tri et disponibilité */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <label htmlFor="catalogue-search" className="sr-only">{t("catalogue.searchLabel")}</label>
            <Search className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("catalogue.searchPlaceholder")}
              className="h-11 w-full border bg-card ps-10 pe-10 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("catalogue.clearSearch")}
                className="absolute end-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              {t("catalogue.availableOnly")}
            </label>

            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="catalogue-sort" className="text-muted-foreground">{t("catalogue.sortLabel")}</label>
              <select
                id="catalogue-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 border bg-card px-3 text-sm focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="recent">{t("catalogue.sort.recent")}</option>
                <option value="priceAsc">{t("catalogue.sort.priceAsc")}</option>
                <option value="priceDesc">{t("catalogue.sort.priceDesc")}</option>
                <option value="name">{t("catalogue.sort.name")}</option>
              </select>
            </div>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
          {t("catalogue.results", { count: list.length })}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        {list.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p>{filtersActive ? t("catalogue.noResults") : t("catalogue.empty")}</p>
            {filtersActive && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 min-h-[44px] border px-6 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-primary"
              >
                {t("catalogue.resetFilters")}
              </button>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}