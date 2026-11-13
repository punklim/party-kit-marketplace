import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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

    const { error: supabaseError } = await (supabase as any).from("contact_messages").insert({
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
    });

    setLoading(false);

    if (supabaseError) {
      console.error(supabaseError);
      setError(t("contact.form.error"));
    } else {
      setSent(true);
    }
  };

  const infoItems = [
    { Icon: MapPin, label: t("contact.address"), value: t("contact.addressValue") },
    { Icon: Phone, label: t("contact.phone"), value: "+212 6 91 05 55 97" },
    { Icon: Mail, label: t("contact.email"), value: "contact@eclat-events.ma" },
  ];

  return (
    <SiteLayout>
      <PageHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-[1fr_1.4fr]">
        
        {/* Formulaire (à gauche dans le code, mais à droite visuellement en arabe) */}
        <div className="order-2 md:order-1">
          {sent ? (
            <div className="bg-muted p-10 text-center">
              <h2 className="text-4xl">{t("contact.sent.title")}</h2>
              <p className="mt-3 text-muted-foreground">{t("contact.sent.text")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-muted p-8 space-y-4">
              {error && <div className="bg-red-100 text-red-700 p-3 text-sm border border-red-300">{error}</div>}
              
              <div className="grid sm:grid-cols-2 gap-4">
                <input required name="name" value={form.name} onChange={handleChange} placeholder={t("contact.form.name")} aria-label={t("contact.form.name")} className={field} />
                <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder={t("contact.form.phone")} aria-label={t("contact.form.phone")} className={field} />
              </div>
              
              <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder={t("contact.form.email")} aria-label={t("contact.form.email")} className={field} />
              
              <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder={t("contact.form.message")} aria-label={t("contact.form.message")} className={field} />
              
              <button disabled={loading} className="bg-secondary text-secondary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50">
                {loading ? t("contact.form.sending") : t("contact.form.submit")}
              </button>
            </form>
          )}
        </div>

        {/* Coordonnées (à droite dans le code, à gauche visuellement en arabe) */}
        <div className="order-1 md:order-2 space-y-8">
          {infoItems.map(({ Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.25} />
              <div>
                <p className="font-semibold">{label}</p>
                <p className="text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </SiteLayout>
  );
}