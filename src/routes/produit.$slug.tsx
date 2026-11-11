import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef, type FormEvent } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Calendar as CalendarIcon, Check, Copy, MessageCircle, X } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import { differenceInCalendarDays, eachDayOfInterval, format, parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import { getLocalizedField } from "@/lib/use-locale";
export const Route = createFileRoute("/produit/$slug")({
  head: () => ({
    meta: [
      { title: "Produit — Éclat Events" },
      { property: "og:title", content: "Produit en location — Éclat Events" },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop" },
    ],
  }),
  component: ProductPage,
});

type BookedRange = { start_date: string; end_date: string; quantity: number };

type Confirmation = {
  reference: string;
  productName: string;
  start: Date;
  end: Date;
  quantity: number;
  days: number;
  total: number;
};

// Doit rester aligné avec la fonction SQL create_booking (60 jours max)
const MAX_DAYS = 60;

// Numéro WhatsApp de l'entreprise (format international, sans +)
const WHATSAPP_NUMBER = "212691055597";

function ProductPage() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const dateLocale = useDateLocale();
  const dir = useTextDirection();
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

  // Confirmation affichée après l'envoi (reste visible jusqu'à fermeture)
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [copied, setCopied] = useState(false);
  const confirmationRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);
      setConfirmation(null);

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

  // Amène le client sur la confirmation dès qu'elle apparaît
  useEffect(() => {
    if (confirmation) {
      confirmationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [confirmation]);

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

  const formatLong = (d: Date) => format(d, "dd MMMM yyyy", { locale: dateLocale });

  const handleBooking = async (e: FormEvent) => {
    e.preventDefault();
    const from = dateRange?.from;
    const to = dateRange?.to;
    if (!from || !to) {
      toast.error(t("booking.errPeriod"));
      return;
    }

    if (nbDays > MAX_DAYS) {
      toast.error(t("booking.errMaxDays", { max: MAX_DAYS }));
      return;
    }

    const hasBlockedDay = disabledDays.some(
      (d) => differenceInCalendarDays(d, from) >= 0 && differenceInCalendarDays(to, d) >= 0,
    );
    if (hasBlockedDay) {
      toast.error(t("booking.errBlocked"));
      return;
    }

    setBookingLoading(true);

    const startStr = format(from, "yyyy-MM-dd");
    const endStr = format(to, "yyyy-MM-dd");

    // Contrôle côté serveur (le calendrier affiché peut être en retard)
    const { data: available } = await (supabase as any).rpc("get_available_quantity", {
      p_product: product.id,
      p_start: startStr,
      p_end: endStr,
    });
    if (typeof available === "number" && available < qty) {
      setBookingLoading(false);
      toast.error(
        available > 0 ? t("booking.errAvailable", { count: available }) : t("booking.errUnavailable"),
      );
      return;
    }

    // Création via la fonction SQL : validations + référence de suivi
    const { data: reference, error } = await (supabase as any).rpc("create_booking", {
      p_product: product.id,
      p_start: startStr,
      p_end: endStr,
      p_quantity: qty,
      p_name: bookingForm.name.trim(),
      p_email: bookingForm.email.trim(),
      p_phone: bookingForm.phone.trim(),
    });

    setBookingLoading(false);

    if (error) {
      console.error(error);
      // Les messages d'erreur « métier » viennent du serveur (en français)
      toast.error(error.code === "P0001" ? error.message : t("booking.errGeneric"));
      return;
    }

    setConfirmation({
      reference: String(reference),
      productName: product.name,
      start: from,
      end: to,
      quantity: qty,
      days: nbDays,
      total: Number(product.price) * qty * nbDays,
    });
    setCopied(false);
    setShowBookingForm(false);
    setDateRange(undefined);
    setBookingForm({ name: "", email: "", phone: "" });
  };

  const copyReference = async () => {
    if (!confirmation) return;
    try {
      await navigator.clipboard.writeText(confirmation.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("confirmation.copyError"));
    }
  };

  // Message WhatsApp toujours en français : il est lu par l'équipe
  const whatsappUrl = confirmation
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Bonjour, j'ai envoyé la demande de réservation ${confirmation.reference} : ${confirmation.quantity} × ${confirmation.productName} ` +
          `du ${format(confirmation.start, "dd/MM/yyyy")} au ${format(confirmation.end, "dd/MM/yyyy")}. ` +
          `Pouvez-vous me confirmer la disponibilité ?`,
      )}`
    : "#";

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
          <h1 className="text-4xl mb-4">{t("product.notFoundTitle")}</h1>
          <Link to="/catalogue" className="text-primary underline">{t("product.backToCatalogue")}</Link>
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
                    {/* NOUVEAU : Noms et descriptions traduits */}
          <h1 className="text-5xl md:text-6xl mt-3">{getLocalizedField(product, "name", i18n.language)}</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">{getLocalizedField(product, "description", i18n.language)}</p>

          <p className="mt-8 text-3xl font-display">
            {formatPrice(product.price)} <span className="text-base text-muted-foreground font-sans">{t("product.perDay")}</span>
          </p>

          <p className="text-sm mt-2 font-medium">
            {product.stock > 0 ? (
              <span className="text-green-600">{t("product.inStock", { count: product.stock })}</span>
            ) : (
              <span className="text-red-600">{t("product.outOfStock")}</span>
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
                aria-label={t("product.qtyLabel")}
              />
              <button
                disabled={isOutOfStock}
                onClick={() => {
                  if (qty > product.stock) {
                    toast.error(t("product.stockLeft", { count: product.stock }));
                    return;
                  }
                  add(product.slug, qty);
                  toast.success(t("product.addedToast"));
                }}
                className="flex-1 bg-secondary text-secondary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? t("product.outOfStock") : t("product.addToQuote")}
              </button>
            </div>

            {!isOutOfStock && (
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="w-full border-2 border-primary text-primary py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {showBookingForm ? t("product.cancelReserve") : t("product.reserve")}
              </button>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">{t("product.indicativePrice")}</p>
        </div>
      </section>

      {/* Confirmation de réservation (reste affichée jusqu'à fermeture) */}
      {confirmation && (
        <section ref={confirmationRef} className="mx-auto max-w-7xl px-6 pb-16" aria-live="polite">
          <div className="border-2 border-primary bg-primary/5 rounded-sm p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl">{t("confirmation.title")}</h2>
                <p className="mt-2 text-sm text-zinc-600 max-w-2xl">{t("confirmation.text")}</p>
              </div>
              <button
                onClick={() => setConfirmation(null)}
                aria-label={t("confirmation.close")}
                className="p-1 text-zinc-500 hover:text-zinc-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span dir="ltr" className="font-mono text-xl md:text-2xl tracking-wide bg-white border px-4 py-3 select-all">
                {confirmation.reference}
              </span>
              <button
                onClick={copyReference}
                className="inline-flex items-center gap-2 border px-4 py-3 text-sm bg-white hover:border-primary transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? t("confirmation.copied") : t("confirmation.copy")}
              </button>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-zinc-500">{t("confirmation.product")}</dt>
                <dd className="mt-1 font-medium">{confirmation.quantity} × {confirmation.productName}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-zinc-500">{t("confirmation.period")}</dt>
                <dd className="mt-1 font-medium">
                  {t("booking.fromTo", { start: formatLong(confirmation.start), end: formatLong(confirmation.end) })}
                  {" "}({t("common.days", { count: confirmation.days })})
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-zinc-500">{t("confirmation.total")}</dt>
                <dd className="mt-1 font-medium">{formatPrice(confirmation.total)}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/mes-reservations"
                className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
              >
                {t("confirmation.track")}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[#25D366] text-[#128C4A] px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {t("confirmation.whatsapp")}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Section Réservation */}
      {showBookingForm && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="bg-zinc-50 border rounded-sm p-8">
            <h2 className="font-display text-3xl mb-6">{t("booking.title", { name: product.name })}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendrier */}
              <div>
                <p className="text-sm text-zinc-600 mb-4">{t("booking.calendarHelp", { qty })}</p>
                <div className="bg-white border p-4 inline-block">
                  <DayPicker
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    disabled={[{ before: new Date() }, ...disabledDays]}
                    locale={dateLocale}
                    dir={dir}
                    numberOfMonths={1}
                  />
                </div>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleBooking} className="space-y-4">
                {dateRange?.from && dateRange?.to && (
                  <div className="bg-primary/10 border border-primary p-4 rounded">
                    <p className="text-sm font-medium">{t("booking.selectedPeriod")}</p>
                    <p className="text-lg font-display">
                      {t("booking.fromTo", { start: formatLong(dateRange.from), end: formatLong(dateRange.to) })}
                    </p>
                    <p className="text-sm text-zinc-600 mt-1">
                      {t("common.days", { count: nbDays })} × {t("common.units", { count: qty })} ·{" "}
                      {t("booking.estimatedTotal", { total: formatPrice(product.price * qty * nbDays) })}
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">{t("booking.name")}</label>
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
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">{t("booking.email")}</label>
                  <input
                    required
                    type="email"
                    maxLength={150}
                    dir="ltr"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full border bg-card px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">{t("booking.phone")}</label>
                  <input
                    required
                    type="tel"
                    maxLength={30}
                    dir="ltr"
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
                  {bookingLoading ? t("booking.sending") : t("booking.submit")}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-4xl mb-8">{t("product.related")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </SiteLayout>
  );
}