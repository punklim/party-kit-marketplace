import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/data/catalog";
import { useQuote } from "@/lib/quote";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useQuote();
  return (
    <div className="group bg-card border hover:shadow-elegant transition-shadow">
      <Link to="/catalogue/$slug" params={{ slug: p.slug }} className="block overflow-hidden aspect-square">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </Link>
      <div className="p-5">
        <Link to="/catalogue/$slug" params={{ slug: p.slug }} className="font-display text-2xl hover:text-primary">{p.name}</Link>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">À partir de <span className="text-foreground font-semibold">{formatPrice(p.price)}</span></p>
          <button onClick={() => { add(p.slug); toast.success(`${p.name} ajouté au devis`); }} aria-label="Ajouter au devis" className="h-9 w-9 flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
