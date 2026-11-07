import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
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

function Devis() {
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
  const lines = Object.entries(items).map(([slug, qty]) => {
    const product = dbProducts.find((p) => p.slug === slug);
    return product ? { p: product, qty } : null;
  }).filter((l): l is { p: any; qty: number } => l !== null);

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
      setError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } else {
      clear();
      setSent(true);
    }
  };

  if (sent) {
    return (
      <SiteLayout>
        <PageHeader title="Merci !" subtitle="Votre demande a bien été envoyée. Nous vous répondons sous 24h." />
        <div className="text-center py-16"><Link to="/catalogue" className="uppercase tracking-widest text-sm text-primary">Retour au catalogue</Link></div>
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
      <PageHeader title="Mon devis" subtitle="Vérifiez votre sélection et indiquez les détails de votre événement" />
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div>
          {lines.length === 0 ? (
            <div className="border p-12 text-center">
              <p className="text-muted-foreground mb-4">Votre devis est vide.</p>
              <Link to="/catalogue" className="inline-block bg-secondary text-secondary-foreground px-6 py-3 uppercase tracking-widest text-sm">Parcourir le catalogue</Link>
            </div>
          ) : (
            <div className="divide-y border">
              {lines.map(({ p, qty }) => (
                <div key={p.slug} className="flex items-center gap-4 p-4">
                  <img src={p.image_url || "https://placehold.co/100?text=Pas+d'image"} alt={p.name} className="h-20 w-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-xl">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(p.price)} / unité</p>
                  </div>
                  <input type="number" min={1} value={qty} onChange={(e) => set(p.slug, +e.target.value)} className="w-20 border bg-card px-2 py-2 text-center" aria-label="Quantité" />
                  <button onClick={() => set(p.slug, 0)} aria-label="Retirer" className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <div className="p-4 flex justify-between font-semibold"><span>Total estimé / jour</span><span>{formatPrice(total)}</span></div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="bg-muted p-8 space-y-4 h-fit">
          <h2 className="text-3xl">Vos informations</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 text-sm border border-red-300">{error}</div>}
          <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nom complet" className={field} />
          <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Téléphone" className={field} />
          <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className={field} />
          <div className="grid grid-cols-2 gap-3">
            <input required name="eventDate" value={form.eventDate} onChange={handleChange} type="date" className={field} aria-label="Date de l'événement" />
            <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className={field} />
          </div>
          <select name="eventType" value={form.eventType} onChange={handleChange} className={field}>
            <option value="" disabled>Type d'événement</option>
            <option value="Mariage">Mariage</option>
            <option value="Séminaire">Séminaire</option>
            <option value="Anniversaire">Anniversaire</option>
            <option value="Autre">Autre</option>
          </select>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Message" className={field} />
          <button disabled={lines.length === 0 || loading} className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm disabled:opacity-50">
            {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}