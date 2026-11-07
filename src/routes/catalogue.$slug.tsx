import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { addDays, format } from "date-fns";
import "react-day-picker/dist/style.css";

export const Route = createFileRoute("/catalogue/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  const [related, setRelated] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { add } = useQuote();

  // États pour la réservation
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      const { data: productData, error } = await (supabase as any)
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !productData) {
        setLoading(false);
        throw notFound();
      }

      setProduct(productData);

      if (productData.category_id) {
        const { data: catData } = await (supabase as any)
          .from("categories")
          .select("name, slug")
          .eq("id", productData.category_id)
          .single();
        if (catData) setCategoryName(catData.name);

        const { data: relatedData } = await (supabase as any)
          .from("products")
          .select("*")
          .eq("category_id", productData.category_id)
          .neq("id", productData.id)
          .limit(4);
        setRelated(relatedData || []);
      }

      // Récupérer les réservations existantes
      const { data: bookingsData } = await (supabase as any)
        .from("bookings")
        .select("start_date, end_date")
        .eq("product_id", productData.id)
        .eq("status", "confirme");
      
      setBookings(bookingsData || []);

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Veuillez sélectionner une période.");
      return;
    }

    setBookingLoading(true);

    const { error } = await (supabase as any).from("bookings").insert({
      product_id: product.id,
      start_date: format(dateRange.from, "yyyy-MM-dd"),
      end_date: format(dateRange.to, "yyyy-MM-dd"),
      client_name: bookingForm.name,
      client_email: bookingForm.email,
      client_phone: bookingForm.phone,
    });

    setBookingLoading(false);

    if (error) {
      toast.error("Erreur : " + error.message);
    } else {
      toast.success("Réservation envoyée ! Nous vous confirmons sous 24h.");
      setShowBookingForm(false);
      setDateRange(undefined);
      setBookingForm({ name: "", email: "", phone: "" });
    }
  };

  // Convertir les réservations en dates bloquées
  const disabledDays = bookings.flatMap((b) => {
    const days = [];
    let current = new Date(b.start_date);
    const end = new Date(b.end_date);
    while (current <= end) {
      days.push(new Date(current));
      current = addDays(current, 1);
    }
    return days;
  });

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <div className="text-center py-20">
          <h1 className="text-4xl mb-4">Produit introuvable</h1>
          <Link to="/catalogue" className="text-primary underline">Retour au catalogue</Link>
        </div>
      </SiteLayout>
    );
  }

  const imageUrl = product.image_url || "https://placehold.co/600x600?text=Pas+d'image";
  const isOutOfStock = product.stock <= 0;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-2">
        <img 
          src={imageUrl} 
          alt={product.name} 
          width={1024} 
          height={1024} 
          className={`w-full aspect-square object-cover ${isOutOfStock ? 'opacity-50 grayscale' : ''}`} 
        />
        <div className="flex flex-col justify-center">
          <Link to="/catalogue" className="text-primary uppercase tracking-[0.3em] text-xs">{categoryName}</Link>
          <h1 className="text-5xl md:text-6xl mt-3">{product.name}</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>
          
          <p className="mt-8 text-3xl font-display">{formatPrice(product.price)} <span className="text-base text-muted-foreground font-sans">/ jour</span></p>
          
          <p className="text-sm mt-2 font-medium">
            {product.stock > 0 ? (
              <span className="text-green-600">En stock ({product.stock} disponible{product.stock > 1 ? 's' : ''})</span>
            ) : (
              <span className="text-red-600">Rupture de stock</span>
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex gap-3">
              <input 
                type="number" 
                min={1} 
                max={product.stock > 0 ? product.stock : 1}
                value={qty} 
                onChange={(e) => setQty(Math.max(1, Math.min(product.stock, +e.target.value)))} 
                disabled={isOutOfStock}
                className="w-24 border bg-card px-3 text-center disabled:opacity-50" 
                aria-label="Quantité" 
              />
              <button 
                disabled={isOutOfStock}
                onClick={() => { 
                  if (qty > product.stock) {
                    toast.error(`Il ne reste que ${product.stock} unités.`);
                    return;
                  }
                  add(product.slug, qty); 
                  toast.success("Ajouté au devis"); 
                }} 
                className="flex-1 bg-secondary text-secondary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? "Rupture de stock" : "Ajouter au devis"}
              </button>
            </div>

            {!isOutOfStock && (
              <button 
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="w-full border-2 border-primary text-primary py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {showBookingForm ? "Annuler la réservation" : "Réserver ce produit"}
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">Prix indicatif hors livraison et montage.</p>
        </div>
      </section>

      {/* Section Réservation */}
      {showBookingForm && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="bg-zinc-50 border rounded-sm p-8">
            <h2 className="font-display text-3xl mb-6">Réserver "{product.name}"</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendrier */}
              <div>
                <p className="text-sm text-zinc-600 mb-4">
                  Sélectionnez la période souhaitée. Les dates en rouge sont déjà réservées.
                </p>
                <div className="bg-white border p-4 inline-block">
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    disabled={[{ before: new Date() }, ...disabledDays]}
                    locale={fr}
                    numberOfMonths={1}
                  />
                </div>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleBooking} className="space-y-4">
                {dateRange?.from && dateRange?.to && (
                  <div className="bg-primary/10 border border-primary p-4 rounded">
                    <p className="text-sm font-medium">Période sélectionnée :</p>
                    <p className="text-lg font-display">
                      Du {format(dateRange.from, "dd MMMM yyyy", { locale: fr })}
                      {" "}au {format(dateRange.to, "dd MMMM yyyy", { locale: fr })}
                    </p>
                    <p className="text-sm text-zinc-600 mt-1">
                      Total estimé : {formatPrice(product.price * (Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1))}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Nom complet</label>
                  <input 
                    required 
                    value={bookingForm.name} 
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full border bg-card px-4 py-3 text-sm" 
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Email</label>
                  <input 
                    required 
                    type="email"
                    value={bookingForm.email} 
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full border bg-card px-4 py-3 text-sm" 
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Téléphone</label>
                  <input 
                    required 
                    type="tel"
                    value={bookingForm.phone} 
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full border bg-card px-4 py-3 text-sm" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={bookingLoading || !dateRange?.from || !dateRange?.to}
                  className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {bookingLoading ? "Envoi..." : "Demander la réservation"}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-4xl mb-8">Vous aimerez aussi</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </SiteLayout>
  );
}