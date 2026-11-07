import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, X } from "lucide-react";

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
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    (supabase as any).from("gallery").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setPhotos(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <SiteLayout>
      <PageHeader title="Nos Réalisations" subtitle="Découvrez nos plus beaux événements" />
      
      <section className="mx-auto max-w-7xl px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((p) => (
              <div 
                key={p.id} 
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-sm group"
                onClick={() => setSelectedPhoto(p.image_url)}
              >
                <img 
                  src={p.image_url} 
                  alt={p.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
            {photos.length === 0 && (
              <div className="col-span-full text-center py-20 text-zinc-500">
                Aucune photo pour le moment. Revenez bientôt !
              </div>
            )}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            onClick={() => setSelectedPhoto(null)} 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Photo" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </SiteLayout>
  );
}
