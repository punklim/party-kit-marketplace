import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/catalog";
import { useDateLocale } from "@/lib/use-locale";
import { Loader2, Search, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

export const Route = createFileRoute("/mes-reservations")({
  head: () => ({
    meta: [
      { title: "Mes réservations — Éclat Events" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MesReservations,
});

type Reservation = {
  id: string;
  reference: string;
  status: string;
  start_date: string;
  end_date: string;
  quantity: number | null;
  product_name: string | null;
  product_image: string | null;
  product_price: number | null;
};

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

function MesReservations() {
  const { t } = useTranslation();
  const dateLocale = useDateLocale();
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !reference.trim()) return;
    setLoading(true);
    setError("");
    setReservations(null);

    // Les réservations ne sont plus lisibles directement : l'email ET la référence sont exigés
    const { data, error: err } = await (supabase as any).rpc("lookup_bookings", {
      p_email: email.trim(),
      p_reference: reference.trim(),
    });

    setLoading(false);

    if (err) {
      console.error(err);
      setError(t("reservations.error"));
      return;
    }

    setReservations((data as Reservation[]) ?? []);
  };

  const getStatusBadge = (status: string) => {
    if (status === "confirme")
      return (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
          <CheckCircle className="h-3 w-3" /> {t("reservations.statusConfirmed")}
        </span>
      );
    if (status === "annule")
      return (
        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
          <XCircle className="h-3 w-3" /> {t("reservations.statusCancelled")}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
        <Clock className="h-3 w-3" /> {t("reservations.statusPending")}
      </span>
    );
  };

  const formatDate = (d: string) => format(parseISO(d), "dd MMMM yyyy", { locale: dateLocale });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl md:text-6xl mb-4">{t("reservations.title")}</h1>
        <p className="text-muted-foreground mb-10">{t("reservations.intro")}</p>

        <form onSubmit={handleSearch} className="grid gap-3 max-w-xl mb-12">
          <div>
            <label htmlFor="suivi-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              {t("reservations.emailLabel")}
            </label>
            <input
              id="suivi-email"
              type="email"
              required
              maxLength={150}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("reservations.emailPlaceholder")}
              className={field}
              dir="ltr"
            />
          </div>
          <div>
            <label htmlFor="suivi-ref" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
              {t("reservations.refLabel")}
            </label>
            <input
              id="suivi-ref"
              required
              maxLength={40}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="RS-2026-0001-A3F9C"
              className={`${field} font-mono`}
              dir="ltr"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#D4AF37] text-black px-6 py-3 text-sm font-medium rounded hover:bg-[#c4a030] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {t("reservations.submit")}
          </button>
        </form>

        {error && <div className="bg-red-100 text-red-700 p-4 border border-red-300 mb-6">{error}</div>}

        {reservations && reservations.length === 0 && (
          <div className="border p-12 text-center text-muted-foreground">
            {t("reservations.notFound")}
            <br />
            <Link to="/catalogue" className="text-primary underline mt-4 inline-block">{t("quote.browse")}</Link>
          </div>
        )}

        {reservations && reservations.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{t("reservations.found", { count: reservations.length })}</p>
            {reservations.map((r) => {
              const days = differenceInCalendarDays(parseISO(r.end_date), parseISO(r.start_date)) + 1;
              const qty = r.quantity ?? 1;
              return (
                <div key={r.id} className="border rounded-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {r.product_image && (
                      <img
                        src={r.product_image}
                        alt={r.product_name ?? t("reservations.productFallback")}
                        className="w-full md:w-48 h-48 md:h-auto object-cover"
                      />
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div>
                          <h2 className="font-display text-2xl">{r.product_name || t("reservations.productFallback")}</h2>
                          <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                            {t("reservations.ref", { reference: r.reference })}
                          </p>
                        </div>
                        {getStatusBadge(r.status)}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 text-[#D4AF37]" />
                          {t("booking.fromTo", { start: formatDate(r.start_date), end: formatDate(r.end_date) })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 text-[#D4AF37]" />
                          {t("common.days", { count: days })} · {t("reservations.quantity", { count: qty })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-6 pt-4 border-t gap-4">
                        <span className="text-xs text-muted-foreground">
                          {r.status === "confirme" && t("reservations.msgConfirmed")}
                          {r.status === "en_attente" && t("reservations.msgPending")}
                          {r.status === "annule" && t("reservations.msgCancelled")}
                        </span>
                        <span className="font-display text-xl font-bold text-[#D4AF37] whitespace-nowrap">
                          {formatPrice(Number(r.product_price ?? 0) * qty * days)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}