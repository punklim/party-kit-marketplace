import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Éclat Events" },
      { name: "description", content: "Contactez Éclat Events pour toute demande de location de matériel événementiel." },
      { property: "og:title", content: "Contact — Éclat Events" },
      { property: "og:description", content: "Parlons de votre événement." },
    ],
  }),
  component: Contact,
});

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Le "as any" pour ignorer la vérification de type
    const { error: supabaseError } = await (supabase as any).from("contact_messages").insert({
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
    });

    setLoading(false);

    if (supabaseError) {
      console.error(supabaseError);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } else {
      setSent(true);
    }
  };

  return (
    <SiteLayout>
      <PageHeader title="Contact" subtitle="Parlons de votre prochain événement" />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          {[[MapPin, "Adresse", "Casablanca, Maroc"], [Phone, "Téléphone", "+212 6 00 00 00 00"], [Mail, "Email", "contact@eclat-events.ma"]].map(([Icon, t, v]: any) => (
            <div key={t} className="flex gap-4"><Icon className="h-6 w-6 text-primary" strokeWidth={1.25} /><div><p className="font-semibold">{t}</p><p className="text-muted-foreground">{v}</p></div></div>
          ))}
        </div>
        {sent ? (
          <div className="bg-muted p-10 text-center"><h2 className="text-4xl">Message envoyé</h2><p className="mt-3 text-muted-foreground">Nous revenons vers vous rapidement.</p></div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-muted p-8 space-y-4">
            {error && <div className="bg-red-100 text-red-700 p-3 text-sm border border-red-300">{error}</div>}
            <div className="grid sm:grid-cols-2 gap-4">
              <input required name="name" value={form.name} onChange={handleChange} placeholder="Nom" className={field} />
              <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Téléphone" className={field} />
            </div>
            <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className={field} />
            <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Votre message" className={field} />
            <button disabled={loading} className="bg-secondary text-secondary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50">
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}