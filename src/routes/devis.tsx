import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect, useMemo, type ChangeEvent, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";
import { supabase } from "@/integrations/supabase/client";
import { DayPicker, type DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { differenceInCalendarDays, format } from "date-fns";
import "react-day-picker/dist/style.css";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Mon devis — Éclat Events" },
      { name: "description", content: "Finalisez votre sélection de matériel et envoyez votre demande de devis." },
      { property: "og:title", content: "Mon devis — Éclat Events" },
      { property: "og:description", content: "Envoyez votre demande de devis de location." },
    ],
  }),
  component: Devis,
});

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

function Devis() {
  const { items, set, clear, dates, setDates } = useQuote();
  const [sent, setSent] = useState(false);
  const [confirmation, setConfirmation] = useState<{ reference: string; total: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    eventType: "",
    message: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await (supabase as any).from("products").select("*");
      setDbProducts(data || []);
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  // Synchronise le calendrier avec les dates stockées dans le contexte
  useEffect(() => {
    if (dates.start && dates.end) {
      setDateRange({ from: new Date(dates.start), to: new Date(dates.end) });
    }
  }, []);

  const nbDays = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      return differenceInCalendarDays(dateRange.to, dateRange.from) + 1;
    }
    return 0;
  }, [dateRange]);

  const lines = useMemo(() => {
    return Object.entries(items)
      .map(([slug, qty]) => {
        const product = dbProducts.find((p) => p.slug === slug);
        return product ? { p: product, qty } : null;
      })
      .filter((l): l is { p: any; qty: number } => l !== null);
  }, [items, dbProducts]);

  const total = useMemo(() => {
    if (nbDays === 0) return 0;
    return lines.reduce((s, l) => s + l.p.price * l.qty * nbDays, 0);
  }, [lines, nbDays]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setDates({
        start: format(range.from, "yyyy-MM-dd"),
        end: format(range.to, "yyyy-MM-dd"),
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    if (nbDays === 0) {
      setError("Veuillez sélectionner une période de location.");
      return;
    }
    setLoading(true);
    setError("");

    // Vérifie la disponibilité de chaque produit sur la période
    for (const l of lines) {
      const { data: available } = await (supabase as any).rpc("get_available_quantity", {
        p_product: l.p.id,
        p_start: format(dateRange!.from!, "yyyy-MM-dd"),
        p_end: format(dateRange!.to!, "yyyy-MM-dd"),
      });
      if (typeof available === "number" && available < l.qty) {
        setLoading(false);
        setError(
          available > 0
            ? `Le produit "${l.p.name}" n'a que ${available} unité(s) disponible(s) sur cette période.`
            : `Le produit "${l.p.name}" n'est plus disponible sur cette période.`,
        );
        return;
      }
    }

    // Génère une référence unique : DV-ANNEE-NUMERO
    const year = new Date().getFullYear();
    const reference = `DV-${year}-${String(Date.now()).slice(-6)}`;

    const formattedItems = lines.map((l) => ({
      slug: l.p.slug,
      name: l.p.name,
      qty: l.qty,
      price: l.p.price,
    }));

    const { error: supabaseError } = await (supabase as any).from("quote_requests").insert({
      full_name: form.fullName,
      phone: form.phone,
      email: form.email,
      city: form.city,
      event_type: form.eventType,
      message: form.message,
      items: formattedItems,
      estimated_total: total,
      start_date: format(dateRange!.from!, "yyyy-MM-dd"),
      end_date: format(dateRange!.to!, "yyyy-MM-dd"),
      days: nbDays,
      reference: reference,
    });

    setLoading(false);

    if (supabaseError) {
      console.error(supabaseError);
      setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } else {
      // Envoie l'email à l'admin
      await (supabase as any).functions.invoke("send-quote-email", {
        body: {
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          message: form.message,
          estimated_total: total,
        },
      });

      clear();
      setConfirmation({ reference, total });
    }
  };

  if (confirmation) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-4xl text-green-900 mb-4">Demande de devis envoyée !</h1>
            <p className="text-green-800 mb-6">
              Merci ! Notre équipe vous répond sous 24h avec un devis personnalisé.
            </p>
            <div className="bg-white border border-green-300 rounded p-6 mb-6 inline-block text-left">
              <p className="text-xs text-green-700 uppercase tracking-wider mb-1">Votre référence</p>
              <p className="font-mono text-3xl font-bold text-green-900">{confirmation.reference}</p>
              <p className="text-sm text-green-700 mt-2">Total estimé : {formatPrice(confirmation.total)}</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/catalogue"
                className="border border-green-700 text-green-700 px-6 py-3 rounded text-sm font-medium hover:bg-green-50"
              >
                Retour au catalogue
              </Link>
              <a
                href={`https://wa.me/212691055597?text=${encodeURIComponent(`Bonjour, je viens d'envoyer une demande de devis (réf. ${confirmation.reference})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-6 py-3 rounded text-sm font-medium hover:bg-[#20b858]"
              >
                💬 Nous contacter sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (loadingProducts) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader title="Mon devis" subtitle="Vérifiez votre sélection, choisissez vos dates et indiquez les détails de votre événement." />
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-8">
          {/* Sélection des dates */}
          <div className="border p-6 rounded-sm">
            <h2 className="font-display text-2xl mb-4">Période de location</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sélectionnez la période souhaitée pour tous les articles de votre devis.
            </p>
            <div className="bg-white border p-4 inline-block">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                disabled={{ before: new Date() }}
                locale={fr}
                numberOfMonths={1}
              />
            </div>
            {nbDays > 0 && (
              <p className="mt-4 text-sm font-medium text-primary">
                {nbDays} jour{nbDays > 1 ? "s" : ""} de location
              </p>
            )}
          </div>

          {/* Liste des articles */}
          <div>
            <h2 className="font-display text-2xl mb-4">Votre sélection</h2>
            {lines.length === 0 ? (
              <div className="border p-12 text-center">
                <p className="text-muted-foreground mb-4">Votre devis est vide.</p>
                <Link to="/catalogue" className="inline-block bg-secondary text-secondary-foreground px-6 py-3 uppercase tracking-widest text-sm">
                  Parcourir le catalogue
                </Link>
              </div>
            ) : (
              <div className="divide-y border">
                {lines.map(({ p, qty }) => (
                  <div key={p.slug} className="flex items-center gap-4 p-4">
                    <img src={p.image_url || "https://placehold.co/100?text=Pas+d'image"} alt={p.name} className="h-20 w-20 object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-xl">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(p.price)} / jour</p>
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => set(p.slug, +e.target.value)}
                      className="w-20 border bg-card px-2 py-2 text-center"
                      aria-label="Quantité"
                    />
                    <button onClick={() => set(p.slug, 0)} aria-label="Retirer" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <div className="p-4 flex justify-between font-semibold">
                  <span>Total estimé ({nbDays} jour{nbDays > 1 ? "s" : ""})</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-muted p-8 space-y-4 h-fit">
          <h2 className="text-3xl">Vos informations</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 text-sm border border-red-300">{error}</div>}
          <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nom complet" className={field} />
          <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Téléphone" className={field} />
          <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className={field} />
          <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className={field} />
          <select name="eventType" value={form.eventType} onChange={handleChange} className={field}>
            <option value="" disabled>Type d'événement</option>
            <option value="Mariage">Mariage</option>
            <option value="Séminaire">Séminaire</option>
            <option value="Anniversaire">Anniversaire</option>
            <option value="Autre">Autre</option>
          </select>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Message (optionnel)" className={field} />
          <button
            disabled={lines.length === 0 || nbDays === 0 || loading}
            className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}