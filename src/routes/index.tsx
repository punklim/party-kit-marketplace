import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Truck, Sparkles, Wrench, Clock, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Éclat Events — Location de matériel événementiel au Maroc" },
      { name: "description", content: "Mobilier, tentes, sonorisation et art de la table en location pour vos mariages et événements au Maroc." },
      { property: "og:title", content: "Éclat Events — Location de matériel événementiel" },
      { property: "og:description", content: "Mobilier, tentes, son & lumière en location partout au Maroc." },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: Truck, t: "Livraison", d: "Partout au Maroc" },
  { icon: Wrench, t: "Montage", d: "Équipe technique dédiée" },
  { icon: Sparkles, t: "Haut de gamme", d: "Matériel soigné et récent" },
  { icon: Clock, t: "Devis 24h", d: "Réponse rapide garantie" },
];

function Index() {
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [avis, setAvis] = useState<any[]>([]);

  useEffect(() => {
    (supabase as any).from("gallery").select("*").limit(3).then(({ data }: any) => {
      setGalleryPhotos(data || []);
    });
    (supabase as any)
      .from("testimonials")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }: any) => {
        setAvis(data || []);
      });
  }, []);

  return (
    <SiteLayout>
      <section className="relative h-[85vh] min-h-[560px] flex items-center">
        <img src={hero} alt="Réception de mariage élégante" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-6 text-secondary-foreground">
          <p className="text-primary uppercase tracking-[0.35em] text-xs animate-in fade-in slide-in-from-bottom-4 duration-700">Location événementielle</p>
          <h1 className="mt-4 text-5xl md:text-8xl max-w-3xl leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000">Donnez de l'éclat à vos événements</h1>
          <p className="mt-6 max-w-lg opacity-80">Mariages, séminaires, galas : tout le matériel dont vous avez besoin, livré et installé.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/catalogue" className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90">Voir le catalogue</Link>
            <Link to="/contact" className="border border-secondary-foreground/40 px-8 py-4 uppercase tracking-widest text-sm hover:bg-secondary-foreground hover:text-secondary">Demander un devis</Link>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {perks.map((p) => (
            <div key={p.t} className="flex items-center gap-4">
              <p.icon className="h-8 w-8 text-primary shrink-0" strokeWidth={1.25} />
              <div><p className="font-semibold">{p.t}</p><p className="text-sm text-muted-foreground">{p.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs">Nos univers</p>
          <h2 className="text-5xl mt-3">Catégories</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/catalogue" search={{ categorie: c.slug }} className="group relative aspect-[3/4] overflow-hidden">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-hero-overlay" />
              <div className="absolute bottom-0 p-6 text-secondary-foreground">
                <h3 className="text-3xl">{c.name}</h3>
                <p className="text-sm opacity-75 mt-1">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div><p className="text-primary uppercase tracking-[0.3em] text-xs">Sélection</p><h2 className="text-5xl mt-3">Les plus demandés</h2></div>
            <Link to="/catalogue" className="text-sm uppercase tracking-widest hover:text-primary">Tout voir →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* Section Avis clients */}
      {avis.length > 0 && (
        <section className="py-24 px-6 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-primary uppercase tracking-[0.3em] text-xs">Excellence & Confiance</p>
              <h2 className="text-5xl mt-3">Ils nous font confiance</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {avis.map((a) => (
                <div key={a.id} className="bg-white border rounded-sm shadow-sm p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < a.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm italic text-zinc-700 mb-6">"{a.content}"</p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-zinc-900">{a.name}</p>
                    {a.role && <p className="text-xs text-muted-foreground">{a.role}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-secondary text-secondary-foreground py-24 text-center px-6">
        <h2 className="text-5xl md:text-6xl">Un projet d'événement ?</h2>
        <p className="mt-4 opacity-70">Composez votre sélection et recevez un devis personnalisé sous 24h.</p>
        <Link to="/devis" className="inline-block mt-8 bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm">Mon devis</Link>
      </section>

      {/* Section Galerie */}
      <section className="bg-zinc-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Nos dernières réalisations</h2>
            <p className="text-muted-foreground">Découvrez quelques-uns de nos événements récents</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryPhotos.map((p: any) => (
              <Link key={p.id} to="/realisations" className="aspect-square overflow-hidden rounded-sm group">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
            ))}
            {galleryPhotos.length === 0 && (
              <div className="col-span-3 text-center text-zinc-500 py-8">
                Aucune photo pour le moment.
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/realisations" className="inline-block border border-zinc-300 px-8 py-3 text-sm uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors">
              Voir toutes nos réalisations
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}