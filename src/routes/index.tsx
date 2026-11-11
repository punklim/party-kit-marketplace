import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Truck, Sparkles, Wrench, Clock, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/catalog";
import { supabase } from "@/integrations/supabase/client";
import { getLocalizedField } from "@/lib/use-locale";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Éclat Events — Location de matériel événementiel au Maroc" },
      { name: "description", content: "Mobilier, tentes, sonorisation et art de la table en location pour vos mariages et événements au Maroc." },
      { property: "og:title", content: "Éclat Events — Location de matériel événementiel" },
      { property: "og:description", content: "Mobilier, tentes, son & lumière en location partout au Maroc." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, i18n } = useTranslation();
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [avis, setAvis] = useState<any[]>([]);

  useEffect(() => {
    (supabase as any).from("gallery").select("*").limit(3).then(({ data }: any) => {
      setGalleryPhotos(data || []);
      setGalleryLoading(false);
    }, () => setGalleryLoading(false));
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

  const perks = [
    { icon: Truck, title: t("home.perks.delivery"), desc: t("home.perks.deliveryDesc") },
    { icon: Wrench, title: t("home.perks.install"), desc: t("home.perks.installDesc") },
    { icon: Sparkles, title: t("home.perks.premium"), desc: t("home.perks.premiumDesc") },
    { icon: Clock, title: t("home.perks.quote24"), desc: t("home.perks.quote24Desc") },
  ];

  return (
    <SiteLayout>
      <section className="relative h-[85vh] min-h-[560px] flex items-center overflow-hidden">
        <img src={hero} alt={t("home.hero.title")} width={1920} height={1088} className="hero-img absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-6 text-secondary-foreground">
          <p className="text-primary uppercase tracking-[0.35em] text-xs animate-in fade-in slide-in-from-bottom-4 duration-700">{t("home.hero.eyebrow")}</p>
          <h1 className="mt-4 text-5xl md:text-8xl max-w-3xl leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000">{t("home.hero.title")}</h1>
          <p className="mt-6 max-w-lg opacity-80">{t("home.hero.subtitle")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/catalogue" className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95">{t("home.hero.ctaCatalogue")}</Link>
            <Link to="/devis" className="border border-secondary-foreground/40 px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-foreground hover:text-secondary">{t("home.hero.ctaQuote")}</Link>
          </div>
        </div>
      </section>

      <section className="border-b">
        <div data-reveal data-reveal-stagger className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {perks.map((p) => (
            <div key={p.title} className="group flex items-center gap-4">
              <p.icon className="h-8 w-8 text-primary shrink-0 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.25} />
              <div><p className="font-semibold">{p.title}</p><p className="text-sm text-muted-foreground">{p.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div data-reveal className="text-center mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs">{t("home.categories.eyebrow")}</p>
          <h2 className="text-5xl mt-3">{t("home.categories.title")}</h2>
        </div>
        <div data-reveal data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const catName = getLocalizedField(c, "name", i18n.language);
            const catDesc = getLocalizedField(c, "description", i18n.language);
            return (
              <Link key={c.slug} to="/catalogue" search={{ categorie: c.slug }} className="group relative aspect-[3/4] overflow-hidden">
                <img src={c.image} alt={catName} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-hero-overlay" />
                <div className="absolute bottom-0 p-6 text-secondary-foreground">
                  <h3 className="text-3xl">{catName}</h3>
                  <p className="text-sm opacity-75 mt-1">{catDesc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div data-reveal className="flex items-end justify-between mb-12">
            <div><p className="text-primary uppercase tracking-[0.3em] text-xs">{t("home.selection.eyebrow")}</p><h2 className="text-5xl mt-3">{t("home.selection.title")}</h2></div>
            <Link to="/catalogue" className="nav-link text-sm uppercase tracking-widest hover:text-primary transition-colors">{t("home.selection.seeAll")}</Link>
          </div>
          <div data-reveal data-reveal-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

            {/* Section Avis clients - Carrousel */}
      {avis.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }}
          className="py-24 px-6 bg-[#FAF8F5] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-primary uppercase tracking-[0.3em] text-xs">{t("home.testimonials.eyebrow")}</p>
              <h2 className="text-5xl mt-3">{t("home.testimonials.title")}</h2>
            </div>
            
            {/* Carrousel CSS infini (marquee) */}
            <div className="relative">
              <div className="flex gap-6 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] w-max">
                {/* On duplique les avis pour l'effet infini */}
                {[...avis, ...avis, ...avis].map((a, idx) => (
                  <div key={`${a.id}-${idx}`} className="w-[320px] shrink-0 bg-white border rounded-sm shadow-sm p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < a.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm italic text-zinc-700 mb-6 line-clamp-4">"{a.content}"</p>
                    <div className="pt-4 border-t">
                      <p className="font-semibold text-zinc-900">{a.name}</p>
                      {a.role && <p className="text-xs text-muted-foreground">{a.role}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      <section data-reveal className="bg-secondary text-secondary-foreground py-24 text-center px-6">
        <h2 className="text-5xl md:text-6xl">{t("home.cta.title")}</h2>
        <p className="mt-4 opacity-70">{t("home.cta.subtitle")}</p>
        <Link to="/devis" className="inline-block mt-8 bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">{t("home.cta.button")}</Link>
      </section>

      <section className="bg-zinc-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4">{t("home.gallery.title")}</h2>
            <p className="text-muted-foreground">{t("home.gallery.subtitle")}</p>
          </div>
          <div data-reveal data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryPhotos.map((p: any) => (
              <Link key={p.id} to="/realisations" className="aspect-square overflow-hidden rounded-sm group">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
            ))}
            {galleryLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-sm bg-muted animate-pulse" aria-hidden="true" />
              ))}
            {!galleryLoading && galleryPhotos.length === 0 && (
              <div className="col-span-3 text-center text-zinc-500 py-8">
                {t("home.gallery.empty")}
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/realisations" className="inline-block border border-zinc-300 px-8 py-3 text-sm uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors">
              {t("home.gallery.seeAll")}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}