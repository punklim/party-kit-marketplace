import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", role: "", content: "", rating: 5 });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError(t("avis.errorName"));
      return;
    }
    if (form.content.trim().length < 20) {
      setError(t("avis.errorContent"));
      return;
    }

    setSaving(true);

    const { error: err } = await (supabase as any).from("testimonials").insert({
      name: form.name.trim(),
      role: form.role.trim() || null,
      content: form.content.trim(),
      rating: form.rating,
      approved: false,
    });

    setSaving(false);

    if (err) {
      setError(t("avis.errorGeneric"));
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
          <h1 className="text-4xl font-display mb-4">{t("avis.successTitle")}</h1>
          <p className="text-muted-foreground mb-8">{t("avis.successText")}</p>
          <Link to="/" className="inline-block bg-primary text-primary-foreground px-8 py-3 uppercase tracking-widest text-sm">
            {t("avis.backHome")}
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader title={t("avis.title")} subtitle={t("avis.subtitle")} />
      <section className="mx-auto max-w-2xl px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 text-red-700 p-4 border border-red-300">{error}</div>}

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              {t("avis.rating")}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="p-1">
                  <Star className={`h-8 w-8 ${n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              {t("avis.name")}
            </label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder={t("avis.namePlaceholder")} />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              {t("avis.role")}
            </label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={field} placeholder={t("avis.rolePlaceholder")} />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              {t("avis.content")}
            </label>
            <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className={field} placeholder={t("avis.contentPlaceholder")} />
          </div>

          <button type="submit" disabled={saving} className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? t("avis.sending") : t("avis.submit")}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}