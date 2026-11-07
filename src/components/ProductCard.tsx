import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";

export function ProductCard({ p }: { p: any }) {
  const { add } = useQuote();
  const imageUrl = p.image_url || p.image || "https://placehold.co/600x600?text=Pas+d'image";
  const isOutOfStock = p.stock !== undefined && p.stock <= 0;

  return (
    <div className="group bg-card border hover:shadow-elegant transition-shadow relative">
      <Link to="/catalogue/$slug" params={{ slug: p.slug }} className="block overflow-hidden aspect-square">
        <img 
          src={imageUrl} 
          alt={p.name} 
          loading="lazy" 
          width={1024} 
          height={1024} 
          className={`h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isOutOfStock ? 'opacity-50 grayscale' : ''}`} 
        />
      </Link>
      
      {/* Badge Rupture de stock */}
      {isOutOfStock && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          Rupture
        </div>
      )}

      <div className="p-5">
        <Link to="/catalogue/$slug" params={{ slug: p.slug }} className="font-display text-2xl hover:text-primary">{p.name}</Link>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">À partir de <span className="text-foreground font-semibold">{formatPrice(p.price)}</span></p>
          <button 
            onClick={() => { 
              if (isOutOfStock) {
                toast.error("Ce produit est en rupture de stock.");
                return;
              }
              add(p.slug); 
              toast.success(`${p.name} ajouté au devis`); 
            }} 
            disabled={isOutOfStock}
            aria-label="Ajouter au devis" 
            className={`h-9 w-9 flex items-center justify-center transition-colors ${
              isOutOfStock 
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
                : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}