import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";

export function ProductCard({ p }: { p: any }) {
  const { t } = useTranslation();
  const { add } = useQuote();
  const imageUrl = p.image_url || p.image || "https://placehold.co/600x600?text=Pas+d'image";
  const isOutOfStock = p.stock !== undefined && p.stock <= 0;

  return (
    <div className="group bg-card border hover:shadow-elegant transition-shadow relative">
      <Link to="/produit/$slug" params={{ slug: p.slug }} className="block overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={1024}
          className={`h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
        />
      </Link>

      {/* Badge Rupture de stock */}
      {isOutOfStock && (
        <div className="absolute top-3 end-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          {t("product.outOfStockBadge")}
        </div>
      )}

      <div className="p-5">
        {/* Même route que l'image : /produit/$slug */}
        <Link to="/produit/$slug" params={{ slug: p.slug }} className="font-display text-2xl hover:text-primary">{p.name}</Link>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{t("product.from")} <span className="text-foreground font-semibold">{formatPrice(p.price)}</span></p>
          <button
            onClick={() => {
              if (isOutOfStock) {
                toast.error(t("product.outOfStockToast"));
                return;
              }
              add(p.slug);
              toast.success(t("product.addedNamed", { name: p.name }));
            }}
            disabled={isOutOfStock}
            aria-label={t("product.addToQuote")}
            className={`h-9 w-9 flex items-center justify-center transition-colors ${
              isOutOfStock
                ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}