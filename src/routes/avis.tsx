import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Star, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: "Laisser un avis — Éclat Events" },
      { name: "description", content: "Partagez votre expérience avec Éclat Events. Votre avis nous aide à nous améliorer." },
      { property: "og:title", content: "Laisser un avis — Éclat Events" },
      { property: "og:description", content: "Partagez votre expérience avec Éclat Events." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AvisPage,
});

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

function AvisPage() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Votre nom doit contenir au moins 2 caractères.");
      return;
    }
    if (form.content.trim().length < 20) {
      setError("Votre avis doit contenir au moins 20 caractères.");
      return;
    }

    setSaving(true);

    const { error: err } = await (supabase as any).from("testimonials").insert({
      name: form.name.trim(),
      role: form.role.trim() || null,
      content: form.content.trim(),
      rating: form.rating,
      approved: false, // en attente de modération
    });

    setSaving(false);

    if (err) {
      setError("Une erreur est survenue. Réessayez.");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-display mb-4">Merci pour votre avis !</h1>
          <p className="text-muted-foreground mb-8">
            Votre avis sera publié après validation par notre équipe.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 uppercase tracking-widest text-sm"
          >
            Retour à l'accueil
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        title="Laissez-nous un avis"
        subtitle="Votre retour d'expérience nous aide à nous améliorer."
      />
      <section className="mx-auto max-w-2xl px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 text-red-700 p-4 border border-red-300">{error}</div>}

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              Votre note
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${
                      n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              Votre nom *
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
              placeholder="Ex: Samira K."
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              Rôle / Événement (optionnel)
            </label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={field}
              placeholder="Ex: Mariée · Casablanca"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              Votre avis *
            </label>
            <textarea
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={6}
              className={field}
              placeholder="Racontez-nous votre expérience..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Envoi en cours..." : "Envoyer mon avis"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}