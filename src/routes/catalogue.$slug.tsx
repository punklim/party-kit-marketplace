import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, formatPrice, products } from "@/data/catalog";
import { useQuote } from "@/lib/quote";

export const Route = createFileRoute("/catalogue/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Éclat Events` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Produit introuvable — Éclat Events" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useQuote();
  const [qty, setQty] = useState(1);
  const cat = categories.find((c) => c.slug === p.category);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-2">
        <img src={p.image} alt={p.name} width={1024} height={1024} className="w-full aspect-square object-cover" />
        <div className="flex flex-col justify-center">
          <Link to="/catalogue" search={{ categorie: p.category }} className="text-primary uppercase tracking-[0.3em] text-xs">{cat?.name}</Link>
          <h1 className="text-5xl md:text-6xl mt-3">{p.name}</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">{p.description}</p>
          <p className="mt-8 text-3xl font-display">{formatPrice(p.price)} <span className="text-base text-muted-foreground font-sans">/ jour</span></p>
          <div className="mt-8 flex gap-3">
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value))} className="w-24 border bg-card px-3 text-center" aria-label="Quantité" />
            <button onClick={() => { add(p.slug, qty); toast.success("Ajouté au devis"); }} className="flex-1 bg-secondary text-secondary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors">Ajouter au devis</button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Prix indicatif hors livraison et montage.</p>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-4xl mb-8">Vous aimerez aussi</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </SiteLayout>
  );
}
