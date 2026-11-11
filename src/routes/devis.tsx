import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { formatPrice } from "@/data/catalog";
import { useQuote } from "@/lib/quote";
import { supabase } from "@/integrations/supabase/client";

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

// Les valeurs restent en français : elles sont enregistrées telles quelles dans la base
// et lues par l'équipe dans l'admin. Seul le libellé affiché est traduit.
const EVENT_TYPES = [
  { value: "Mariage", labelKey: "quote.type.wedding" },
  { value: "Séminaire", labelKey: "quote.type.seminar" },
  { value: "Anniversaire", labelKey: "quote.type.birthday" },
  { value: "Autre", labelKey: "quote.type.other" },
];

function Devis() {
  const { t } = useTranslation();
  const { items, set, clear } = useQuote();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventDate: "",
    city: "",
    eventType: "",
    message: "",
  });

  // 1. Récupérer les produits depuis Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await (supabase as any).from("products").select("*");
      setDbProducts(data || []);
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Faire le lien entre le panier et les produits Supabase
  const lines = Object.entries(items)
    .map(([slug, qty]) => {
      const product = dbProducts.find((p) => p.slug === slug);
      return product ? { p: product, qty } : null;
    })
    .filter((l): l is { p: any; qty: number } => l !== null);

  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setLoading(true);
    setError("");

    const formattedItems = lines.map((l) => ({ slug: l.p.slug, name: l.p.name, qty: l.qty, price: l.p.price }));

    const { error: supabaseError } = await (supabase as any).from("quote_requests").insert({
      full_name: form.fullName,
      phone: form.phone,
      email: form.email,
      event_date: form.eventDate || null,
      city: form.city,
      event_type: form.eventType,
      message: form.message,
      items: formattedItems,
      estimated_total: total,
    });

    setLoading(false);

    if (supabaseError) {
      console.error(supabaseError);
      setError(t("quote.error"));
    } else {
      clear();
      setSent(true);
    }
  };

  if (sent) {
    return (
      <SiteLayout>
        <PageHeader title={t("quote.thanksTitle")} subtitle={t("quote.thanksSubtitle")} />
        <div className="text-center py-16">
          <Link to="/catalogue" className="uppercase tracking-widest text-sm text-primary">{t("quote.back")}</Link>
        </div>
      </SiteLayout>
    );
  }

  if (loadingProducts) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader title={t("quote.title")} subtitle={t("quote.subtitle")} />
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div>
          {lines.length === 0 ? (
            <div className="border p-12 text-center">
              <p className="text-muted-foreground mb-4">{t("quote.empty")}</p>
              <Link to="/catalogue" className="inline-block bg-secondary text-secondary-foreground px-6 py-3 uppercase tracking-widest text-sm">{t("quote.browse")}</Link>
            </div>
          ) : (
            <div className="divide-y border">
              {lines.map(({ p, qty }) => (
                <div key={p.slug} className="flex items-center gap-4 p-4">
                  <img src={p.image_url || "https://placehold.co/100?text=Pas+d'image"} alt={p.name} className="h-20 w-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-xl">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{t("quote.perUnit", { price: formatPrice(p.price) })}</p>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => set(p.slug, Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 border bg-card px-2 py-2 text-center"
                    aria-label={t("product.qtyLabel")}
                  />
                  <button onClick={() => set(p.slug, 0)} aria-label={t("quote.remove")} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <div className="p-4 flex justify-between font-semibold"><span>{t("quote.totalPerDay")}</span><span>{formatPrice(total)}</span></div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="bg-muted p-8 space-y-4 h-fit">
          <h2 className="text-3xl">{t("quote.formTitle")}</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 text-sm border border-red-300">{error}</div>}
          <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder={t("quote.fullName")} aria-label={t("quote.fullName")} className={field} />
          <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder={t("quote.phone")} aria-label={t("quote.phone")} className={field} />
          <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder={t("quote.email")} aria-label={t("quote.email")} className={field} />
          <div className="grid grid-cols-2 gap-3">
            <input required name="eventDate" value={form.eventDate} onChange={handleChange} type="date" className={field} aria-label={t("quote.eventDate")} />
            <input name="city" value={form.city} onChange={handleChange} placeholder={t("quote.city")} aria-label={t("quote.city")} className={field} />
          </div>
          <select name="eventType" value={form.eventType} onChange={handleChange} className={field} aria-label={t("quote.eventType")}>
            <option value="" disabled>{t("quote.eventType")}</option>
            {EVENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{t(type.labelKey)}</option>
            ))}
          </select>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder={t("quote.message")} aria-label={t("quote.message")} className={field} />
          <button disabled={lines.length === 0 || loading} className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm disabled:opacity-50">
            {loading ? t("quote.sending") : t("quote.submit")}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}