import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/catalog";
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

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary";

function MesReservations() {
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    setReservations(null);

    const { data, error: err } = await (supabase as any)
      .from("bookings")
      .select("*, products(name, image_url, price)")
      .eq("client_email", email.trim().toLowerCase())
      .order("start_date", { ascending: false });

    setLoading(false);

    if (err) {
      setError("Une erreur est survenue. Réessayez.");
      return;
    }

    setReservations(data || []);
  };

  const getStatusBadge = (status: string) => {
    if (status === "confirme") return <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"><CheckCircle className="h-3 w-3" /> Confirmée</span>;
    if (status === "annule") return <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"><XCircle className="h-3 w-3" /> Annulée</span>;
    return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold"><Clock className="h-3 w-3" /> En attente</span>;
  };

  const formatDate = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl md:text-6xl mb-4">Mes réservations</h1>
        <p className="text-muted-foreground mb-10">Entrez l'email utilisé lors de votre réservation pour retrouver vos demandes.</p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mb-12">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className={field}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#D4AF37] text-black px-6 py-3 text-sm font-medium rounded hover:bg-[#c4a030] flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Rechercher
          </button>
        </form>

        {error && <div className="bg-red-100 text-red-700 p-4 border border-red-300 mb-6">{error}</div>}

        {reservations && reservations.length === 0 && (
          <div className="border p-12 text-center text-muted-foreground">
            Aucune réservation trouvée pour cet email.
            <br />
            <Link to="/catalogue" className="text-primary underline mt-4 inline-block">Parcourir le catalogue</Link>
          </div>
        )}

        {reservations && reservations.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{reservations.length} réservation(s) trouvée(s)</p>
            {reservations.map((r) => (
              <div key={r.id} className="border rounded-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {r.products?.image_url && (
                    <img
                      src={r.products.image_url}
                      alt={r.products.name}
                      className="w-full md:w-48 h-48 md:h-auto object-cover"
                    />
                  )}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="font-display text-2xl">{r.products?.name || "Produit"}</h2>
                        <p className="text-xs text-muted-foreground font-mono">Réf. {r.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                      {getStatusBadge(r.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-[#D4AF37]" />
                        Du {formatDate(r.start_date)} au {formatDate(r.end_date)}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-[#D4AF37]" />
                        Quantité : {r.quantity || 1}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                      <span className="text-xs text-muted-foreground">
                        {r.status === "confirme" && "Nous vous contacterons sous 24h pour finaliser."}
                        {r.status === "en_attente" && "En attente de confirmation par notre équipe."}
                        {r.status === "annule" && "Cette réservation a été annulée."}
                      </span>
                      <span className="font-display text-xl font-bold text-[#D4AF37]">
                        {formatPrice(Number(r.products?.price || 0) * (r.quantity || 1))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}