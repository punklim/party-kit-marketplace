import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — Éclat Events" },
      { name: "description", content: "Découvrez nos plus beaux événements réalisés au Maroc." },
    ],
  }),
  component: Realisations,
});

function Realisations() {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    (supabase as any).from("gallery").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setPhotos(data || []);
      setLoading(false);
    });
  }, []);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  // Navigation au clavier
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goPrev, goNext]);

  return (
    <SiteLayout>
      <PageHeader title={t("realisations.title")} subtitle={t("realisations.subtitle")} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-sm group"
                onClick={() => openLightbox(index)}
              >
                <img src={p.image_url} alt={p.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
            {photos.length === 0 && (
              <div className="col-span-full text-center py-20 text-zinc-500">
                {t("realisations.empty")}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              aria-label={t("realisations.close")}
              className="absolute top-6 end-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Flèche gauche */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute start-4 md:start-8 text-white/70 hover:text-white transition-colors z-10 bg-black/30 hover:bg-black/50 p-3 rounded-full"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={photos[selectedIndex].image_url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={photos[selectedIndex].image_url}
              alt={photos[selectedIndex].title}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Flèche droite */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute end-4 md:end-8 text-white/70 hover:text-white transition-colors z-10 bg-black/30 hover:bg-black/50 p-3 rounded-full"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            {/* Compteur */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-4 py-2 rounded-full">
              {selectedIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}