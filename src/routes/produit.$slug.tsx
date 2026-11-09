import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, type FormEvent } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { differenceInCalendarDays, eachDayOfInterval, format, parseISO } from "date-fns";
import "react-day-picker/dist/style.css";

export const Route = createFileRoute("/produit/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Produit — Éclat Events` },
      { property: "og:title", content: "Produit en location — Éclat Events" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop" },
    ],
  }),
  component: ProductPage,
});
type BookedRange = { start_date: string; end_date: string; quantity: number };

// Doit rester aligné avec la politique RLS de la table bookings (60 jours max)
const MAX_DAYS = 60;

function ProductPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  const [related, setRelated] = useState<any[]>([]);
  const [booked, setBooked] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { add } = useQuote();

  // États pour la réservation
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);

      const { data: productData } = await (supabase as any)
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (cancelled) return;

      if (!productData) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct(productData);
      setQty(1);
      setDateRange(undefined);

      const [catRes, relatedRes, bookedRes] = await Promise.all([
        productData.category_id
          ? (supabase as any).from("categories").select("name").eq("id", productData.category_id).maybeSingle()
          : Promise.resolve({ data: null }),
        productData.category_id
          ? (supabase as any)
              .from("products")
              .select("*")
              .eq("category_id", productData.category_id)
              .neq("id", productData.id)
              .limit(4)
          : Promise.resolve({ data: [] }),
        // Les réservations ne sont plus lisibles directement : on passe par la fonction publique
        (supabase as any).rpc("get_booked_ranges", { p_product: productData.id }),
      ]);

      if (cancelled) return;

      setCategoryName(catRes.data?.name ?? "");
      setRelated(relatedRes.data ?? []);
      setBooked(bookedRes.data ?? []);
      setLoading(false);
    };

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Jours où il ne reste pas assez de stock pour la quantité demandée
  const disabledDays = useMemo(() => {
    const result: Date[] = [];
    if (!product) return result;

    const usedPerDay = new Map<string, number>();
    for (const b of booked) {
      const start = parseISO(b.start_date);
      const end = parseISO(b.end_date);
      if (end < start || differenceInCalendarDays(end, start) > 366) continue;
      for (const day of eachDayOfInterval({ start, end })) {
        const key = format(day, "yyyy-MM-dd");
        usedPerDay.set(key, (usedPerDay.get(key) ?? 0) + b.quantity);
      }
    }

    usedPerDay.forEach((used, key) => {
      if (product.stock - used < qty) result.push(parseISO(key));
    });
    return result;
  }, [booked, product, qty]);

  const nbDays =
    dateRange?.from && dateRange?.to ? differenceInCalendarDays(dateRange.to, dateRange.from) + 1 : 0;

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault();
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to) {
      toast.error("Veuillez sélectionner une période.");
      return;
    }

    if (nbDays > MAX_DAYS) {
      toast.error(`La durée maximale est de ${MAX_DAYS} jours. Contactez-nous pour une location plus longue.`);
      return;
    }

    const hasBlockedDay = disabledDays.some(
      (d) => differenceInCalendarDays(d, from) >= 0 && differenceInCalendarDays(to, d) >= 0,
    );
    if (hasBlockedDay) {
      toast.error("La période choisie contient des dates indisponibles.");
      return;
    }

    setBookingLoading(true);

    const startStr = format(from, "yyyy-MM-dd");
    const endStr = format(to, "yyyy-MM-dd");

    // Contrôle final côté serveur (le calendrier affiché peut être en retard)
    const { data: available } = await (supabase as any).rpc("get_available_quantity", {
      p_product: product.id,
      p_start: startStr,
      p_end: endStr,
    });
    if (typeof available === "number" && available < qty) {
      setBookingLoading(false);
      toast.error(
        available > 0
          ? `Il ne reste que ${available} unité(s) sur cette période.`
          : "Ce produit n'est plus disponible sur cette période.",
      );
      return;
    }

    const { error } = await (supabase as any).from("bookings").insert({
      product_id: product.id,
      start_date: startStr,
      end_date: endStr,
      quantity: qty,
      client_name: bookingForm.name.trim(),
      client_email: bookingForm.email.trim(),
      client_phone: bookingForm.phone.trim(),
    });

    setBookingLoading(false);

    if (error) {
      console.error(error);
      toast.error(
        error.message?.includes("Trop de demandes")
          ? error.message
          : "Impossible d'envoyer la demande. Vérifiez vos informations et réessayez.",
      );
       } else {
      toast.success("Réservation envoyée ! Nous vous confirmons sous 24h.");

      await (supabase as any).functions.invoke("send-booking-email", {
        body: {
          type: "new_booking",
          booking: {
            client_name: bookingForm.name.trim(),
            client_email: bookingForm.email.trim(),
            client_phone: bookingForm.phone.trim(),
            product_name: product.name,
            start_date: startStr,
            end_date: endStr,
            quantity: qty,
          },
        },
      });

      setShowBookingForm(false);
      setDateRange(undefined);
      setBookingForm({ name: "", email: "", phone: "" });
    }
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
          className={`w-full aspect-square object-cover ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
        />
        <div className="flex flex-col justify-center">
          <Link to="/catalogue" className="text-primary uppercase tracking-[0.3em] text-xs">{categoryName}</Link>
          <h1 className="text-5xl md:text-6xl mt-3">{product.name}</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <p className="mt-8 text-3xl font-display">{formatPrice(product.price)} <span className="text-base text-muted-foreground font-sans">/ jour</span></p>

          <p className="text-sm mt-2 font-medium">
            {product.stock > 0 ? (
              <span className="text-green-600">En stock ({product.stock} disponible{product.stock > 1 ? "s" : ""})</span>
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
                onChange={(e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))}
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
                  Sélectionnez la période souhaitée. Les dates grisées ne sont pas disponibles pour la quantité choisie ({qty}).
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
                      {nbDays} jour{nbDays > 1 ? "s" : ""} × {qty} unité{qty > 1 ? "s" : ""} · Total estimé : {formatPrice(product.price * qty * nbDays)}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Nom complet</label>
                  <input
                    required
                    minLength={2}
                    maxLength={100}
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
                    maxLength={150}
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
                    maxLength={30}
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