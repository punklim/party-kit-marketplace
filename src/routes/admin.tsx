import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/catalog";
import { 
  Loader2, LogOut, Mail, Phone, LayoutDashboard, FileText, MessageSquare, TrendingUp, 
  ArrowRight, Menu, X, Search, Trash2, Eye, 
  CheckCircle, Clock, Package, Plus, Edit, Image as ImageIcon,
  Tag, Download, Image, Star, MailPlus, BookOpen, Calendar, AlertTriangle, ChevronLeft, ChevronRight, Bell, ExternalLink
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Éclat Events" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [newQuotes, setNewQuotes] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [devisSearch, setDevisSearch] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      (supabase as any).from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "nouveau").then(({ count }: any) => {
        setUnreadMessages(count || 0);
      });
      (supabase as any).from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "nouveau").then(({ count }: any) => {
        setNewQuotes(count || 0);
      });
    }
  }, [user, activeTab]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError("Identifiants incorrects.");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loadingAuth) return <div className="flex justify-center items-center min-h-screen bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="w-full max-w-md bg-white p-10 shadow-2xl rounded-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl text-foreground mb-2">ÉclatEvents</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Espace Administrateur</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && <div className="bg-red-50 text-red-700 p-3 text-sm border border-red-200 text-center">{authError}</div>}
            <div><label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Email</label><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className={field} /></div>
            <div><label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Mot de passe</label><input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={field} /></div>
            <button className="w-full bg-zinc-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors mt-6 font-medium">Se connecter</button>
          </form>
        </div>
      </div>
    );
  }

  const badges: Partial<Record<Tab, number>> = { devis: newQuotes, messages: unreadMessages };

  return (
    <div className="min-h-screen bg-[#f6f3ec] flex">
      {/* Barre latérale (bureau) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111111] text-zinc-300 h-screen fixed left-0 top-0 z-40">
        <div className="px-6 pt-6 pb-5 border-b border-zinc-800">
          <h1 className="font-display text-2xl text-white">Éclat<span className="text-[#D4AF37]">Events</span></h1>
          <p className="text-[11px] text-[#8b857a] mt-1 uppercase tracking-[0.2em]">Administration</p>
        </div>
        <AdminNav activeTab={activeTab} onSelect={setActiveTab} badges={badges} />
        <SidebarUser email={user.email} onLogout={handleLogout} />
      </aside>

      {/* Menu mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-72 max-w-[85vw] bg-[#111111] text-zinc-300 h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center">
              <h1 className="font-display text-2xl text-white">Éclat<span className="text-[#D4AF37]">Events</span></h1>
              <button onClick={() => setSidebarOpen(false)} aria-label="Fermer le menu" className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-zinc-800"><X className="h-5 w-5" /></button>
            </div>
            <AdminNav activeTab={activeTab} onSelect={(t) => { setActiveTab(t); setSidebarOpen(false); }} badges={badges} />
            <SidebarUser email={user.email} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111111] text-white flex items-center justify-between px-4 z-40">
        <h1 className="font-display text-xl">Éclat<span className="text-[#D4AF37]">Events</span></h1>
        <button onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu" className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-zinc-800"><Menu /></button>
      </div>

      <main className="flex-1 md:ml-64 w-full min-w-0 overflow-x-hidden">
        {/* Barre du haut (bureau) */}
        <header className="hidden md:flex sticky top-0 z-30 h-[76px] items-center justify-between gap-4 px-10 bg-[#f6f3ec]/95 backdrop-blur">
          <form
            role="search"
            onSubmit={(e) => { e.preventDefault(); setDevisSearch(searchTerm.trim()); setActiveTab("devis"); }}
            className="relative w-full max-w-md"
          >
            <label htmlFor="admin-search" className="sr-only">Rechercher un devis</label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
            <input
              id="admin-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un devis (nom, email, ville)…"
              className="w-full h-11 pl-10 pr-4 text-sm border border-[#e4ddcc] rounded-lg bg-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </form>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(unreadMessages > 0 ? "messages" : "devis")}
              aria-label={`Notifications${unreadMessages + newQuotes > 0 ? ` (${unreadMessages + newQuotes} à traiter)` : ""}`}
              className="relative h-11 w-11 flex items-center justify-center rounded-lg hover:bg-[#efe9da] transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadMessages + newQuotes > 0 && <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-[#f6f3ec]" />}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-4 text-sm font-medium bg-white border border-[#d9d1bd] rounded-lg transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              Voir le site <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </header>

        <div className="p-6 md:p-10 md:pt-6 pt-20">
          {activeTab === "dashboard" && <MaisonView setActiveTab={setActiveTab} />}
          {activeTab === "planning" && <PlanningView />}
          {activeTab === "catalogue" && <ProductList />}
          {activeTab === "categories" && <CategoryList />}
          {activeTab === "galerie" && <GalleryList />}
          {activeTab === "avis" && <TestimonialsList />}
          {activeTab === "blog" && <BlogList />}
          {activeTab === "reservations" && <BookingsList />}
          {activeTab === "devis" && <DevisList key={devisSearch} initialSearch={devisSearch} />}
          {activeTab === "messages" && <MessagesList />}
          {activeTab === "newsletter" && <NewsletterList />}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// NAVIGATION (groupée, une seule définition pour bureau et mobile)
// ============================================================
type Tab = "dashboard" | "planning" | "devis" | "messages" | "catalogue" | "categories" | "galerie" | "avis" | "newsletter" | "blog" | "reservations";

const NAV_GROUPS: { title: string; items: { tab: Tab; label: string; icon: any }[] }[] = [
  {
    title: "Activité",
    items: [
      { tab: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
      { tab: "devis", label: "Demandes de devis", icon: FileText },
      { tab: "planning", label: "Planning", icon: Calendar },
      { tab: "reservations", label: "Réservations", icon: CheckCircle },
      { tab: "messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    title: "Contenu",
    items: [
      { tab: "catalogue", label: "Catalogue", icon: Package },
      { tab: "categories", label: "Catégories", icon: Tag },
      { tab: "galerie", label: "Galerie", icon: Image },
      { tab: "avis", label: "Avis clients", icon: Star },
      { tab: "blog", label: "Blog", icon: BookOpen },
    ],
  },
  {
    title: "Marketing",
    items: [{ tab: "newsletter", label: "Newsletter", icon: MailPlus }],
  },
];

function AdminNav({ activeTab, onSelect, badges }: { activeTab: Tab; onSelect: (t: Tab) => void; badges: Partial<Record<Tab, number>> }) {
  return (
    <nav className="flex-1 py-3 px-3 overflow-y-auto" aria-label="Navigation de l'administration">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="mb-3">
          <p className="px-3 pt-3 pb-2 text-[11px] uppercase tracking-[0.16em] text-[#8b857a]">{group.title}</p>
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <SidebarItem
                key={item.tab}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.tab}
                onClick={() => onSelect(item.tab)}
                badge={badges[item.tab]}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick, badge }: { icon: any; label: string; active: boolean; onClick: () => void; badge?: number }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`w-full min-h-[44px] flex items-center justify-between px-3 text-sm rounded-lg transition-colors ${
        active ? "bg-[#1f1c14] text-white font-medium shadow-[inset_3px_0_0_#D4AF37]" : "text-[#a8a29a] hover:bg-[#1c1c1c] hover:text-white"
      }`}
    >
      <span className="flex items-center gap-3"><Icon className="h-[18px] w-[18px] shrink-0" />{label}</span>
      {badge !== undefined && badge > 0 && <span className="bg-[#D4AF37] text-black text-[11px] font-semibold px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

function SidebarUser({ email, onLogout }: { email?: string | null; onLogout: () => void }) {
  return (
    <div className="p-4 border-t border-zinc-800 flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-full bg-[#D4AF37] text-black font-semibold flex items-center justify-center uppercase">{(email || "A").charAt(0)}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#8b857a]">Administrateur</p>
        <p className="text-sm text-white truncate">{email}</p>
      </div>
      <button onClick={onLogout} aria-label="Déconnexion" className="h-11 w-11 shrink-0 flex items-center justify-center rounded-lg text-[#a8a29a] hover:text-white hover:bg-zinc-800 transition-colors">
        <LogOut className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

// ============================================================
// VUE D'ENSEMBLE (tous les chiffres sont calculés depuis quote_requests)
// ============================================================
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const MONTHS_LONG = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function MaisonView({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  const [devis, setDevis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (supabase as any)
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(
        ({ data }: any) => { setDevis(data || []); setLoading(false); },
        () => setLoading(false)
      );
  }, []);

  // Déclenche l'animation des barres une fois les données affichées
  useEffect(() => {
    if (loading) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [loading]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const amount = (d: any) => Number(d.estimated_total || 0);
  const inMonth = (iso: string, monthsAgo: number) => {
    const d = new Date(iso);
    const ref = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
  };

  const thisMonth = devis.filter((d) => inMonth(d.created_at, 0)).length;
  const lastMonth = devis.filter((d) => inMonth(d.created_at, 1)).length;
  const monthHint =
    lastMonth === 0
      ? "Aucune demande le mois précédent"
      : `${thisMonth >= lastMonth ? "+" : "−"}${Math.abs(Math.round(((thisMonth - lastMonth) / lastMonth) * 100))} % par rapport au mois dernier`;

  const accepted = devis.filter((d) => d.status === "accepte");
  const sent = devis.filter((d) => d.status === "devis_envoye");
  const pending = devis.filter((d) => d.status !== "accepte" && d.status !== "refuse");
  const late = pending.filter((d) => Date.now() - new Date(d.created_at).getTime() > 24 * 60 * 60 * 1000);
  const revenueConfirmed = accepted.reduce((s, d) => s + amount(d), 0);
  const revenuePending = sent.reduce((s, d) => s + amount(d), 0);
  const conversion = devis.length ? Math.round((accepted.length / devis.length) * 100) : 0;

  const funnel = [
    { label: "Demandes reçues", value: devis.length },
    { label: "Contactées", value: devis.filter((d) => ["en_cours", "devis_envoye", "accepte"].includes(d.status)).length },
    { label: "Devis envoyés", value: devis.filter((d) => ["devis_envoye", "accepte"].includes(d.status)).length },
    { label: "Acceptées", value: accepted.length },
  ];

  const monthly = Array.from({ length: 6 }, (_, i) => {
    const ref = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const count = devis.filter((d) => {
      const x = new Date(d.created_at);
      return x.getFullYear() === ref.getFullYear() && x.getMonth() === ref.getMonth();
    }).length;
    return { label: MONTHS[ref.getMonth()], count, current: i === 5 };
  });
  const maxCount = Math.max(1, ...monthly.map((m) => m.count));

  const upcoming = devis
    .filter((d) => d.event_date && d.status !== "refuse" && new Date(d.event_date + "T00:00:00") >= startOfToday)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, 5);

  const todayLabel = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const card = "bg-white border border-[#ebe5d6] rounded-[14px]";
  const enter = "animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both";

  return (
    <div className="space-y-6">
      <div className={`flex flex-wrap items-end justify-between gap-4 ${enter}`}>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">{todayLabel}</p>
          <h1 className="font-display text-4xl md:text-5xl text-zinc-900 mt-1.5 leading-[1.05]">Bonjour, voici votre journée</h1>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={() => setActiveTab("planning")} className="inline-flex items-center gap-2 min-h-[44px] px-4 text-sm font-medium bg-white border border-[#d9d1bd] rounded-lg transition-all duration-200 hover:-translate-y-px hover:shadow-md">
            Nouvelle réservation
          </button>
          <button onClick={() => setActiveTab("devis")} className="inline-flex items-center gap-2 min-h-[44px] px-4 text-sm font-semibold bg-[#D4AF37] text-zinc-900 rounded-lg transition-all duration-200 hover:-translate-y-px hover:shadow-md">
            <Plus className="h-4 w-4" /> Nouveau devis
          </button>
        </div>
      </div>

      {late.length > 0 && (
        <div className={`flex flex-wrap items-center justify-between gap-4 bg-[#fff7dc] border border-[#ecd9a0] rounded-xl px-5 py-4 ${enter}`}>
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#f3e2a8] flex items-center justify-center"><Clock className="h-5 w-5 text-[#6e5400]" /></div>
            <div>
              <p className="font-semibold text-[15px] text-zinc-900">
                {late.length} {late.length > 1 ? "demandes attendent" : "demande attend"} une réponse depuis plus de 24 h
              </p>
              <p className="text-[13px] text-zinc-600 mt-0.5">Le site promet un devis sous 24 h.</p>
            </div>
          </div>
          <button onClick={() => setActiveTab("devis")} className="inline-flex items-center min-h-[44px] px-5 text-[13px] font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">
            Traiter maintenant
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Demandes ce mois", value: String(thisMonth), unit: "", hint: monthHint },
          { label: "Chiffre d'affaires confirmé", value: formatPrice(revenueConfirmed), unit: "", hint: `${accepted.length} devis accepté${accepted.length > 1 ? "s" : ""}` },
          { label: "Chiffre d'affaires en attente", value: formatPrice(revenuePending), unit: "", hint: `${sent.length} devis envoyé${sent.length > 1 ? "s" : ""}, sans réponse` },
          { label: "Taux de conversion", value: `${conversion} %`, unit: "", hint: "Demandes acceptées / demandes reçues" },
        ].map((k, i) => (
          <div key={k.label} style={{ animationDelay: `${i * 70}ms` }} className={`${card} p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${enter}`}>
            <p className="text-[13px] text-zinc-600">{k.label}</p>
            <p className="font-display text-4xl font-semibold text-zinc-900 mt-2 leading-tight">{k.value}</p>
            <p className="text-xs text-zinc-600 mt-1">{k.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
        <section className={`${card} p-6 ${enter}`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold text-zinc-900">Demandes par mois</h2>
            <span className="text-xs text-zinc-600">6 derniers mois</span>
          </div>
          <div className="mt-5 h-56 flex items-end gap-4 border-b border-[#ebe5d6] px-2">
            {monthly.map((m) => (
              <div key={m.label} className="flex-1 h-full flex flex-col justify-end items-center">
                {m.count > 0 && <span className="text-xs font-semibold mb-1.5">{m.count}</span>}
                <div
                  className={`w-full rounded-t-lg transition-[height] duration-700 ease-out motion-reduce:transition-none ${m.count > 0 ? "bg-gradient-to-b from-[#D4AF37] to-[#a8842c]" : "bg-[#ece5d2] rounded-sm"}`}
                  style={{ height: ready && m.count > 0 ? `${(m.count / maxCount) * 80}%` : "3px" }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 px-2 pt-2 text-xs text-zinc-600">
            {monthly.map((m) => (
              <span key={m.label} className={`flex-1 text-center ${m.current ? "text-zinc-900 font-semibold" : ""}`}>{m.label}</span>
            ))}
          </div>
        </section>

        <section className={`${card} p-6 ${enter}`}>
          <h2 className="font-display text-2xl font-semibold text-zinc-900">Entonnoir des devis</h2>
          <p className="text-[13px] text-zinc-600 mt-1.5 mb-5">De la demande à l'acceptation</p>
          <div className="grid gap-[18px]">
            {funnel.map((step) => (
              <div key={step.label}>
                <div className="flex justify-between text-sm mb-1.5"><span>{step.label}</span><strong>{step.value}</strong></div>
                <div className="h-2.5 bg-[#f0ead9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: ready && devis.length ? `${(step.value / devis.length) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4">
        <section className={`${card} px-6 pt-6 pb-3 ${enter}`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold text-zinc-900">Dernières demandes</h2>
            <button onClick={() => setActiveTab("devis")} className="min-h-[44px] inline-flex items-center gap-1 text-[13px] font-semibold text-[#7a5f12] hover:underline">Voir tout <ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
          {devis.length === 0 && <p className="text-sm text-zinc-600 py-6">Aucune demande pour le moment.</p>}
          <div>
            {devis.slice(0, 5).map((d) => (
              <div key={d.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-1 px-2 py-3.5 border-t border-[#f0ead9] transition-colors hover:bg-[#faf6ea]">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-zinc-900 truncate">{d.full_name}</p>
                  <p className="text-xs text-zinc-600 truncate">{[d.event_type, d.city].filter(Boolean).join(" · ") || "—"}</p>
                </div>
                <span className="font-semibold text-sm text-zinc-900 sm:text-right">{formatPrice(d.estimated_total)}</span>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </section>

        <section className={`${card} px-6 pt-6 pb-3 ${enter}`}>
          <h2 className="font-display text-2xl font-semibold text-zinc-900">Prochains événements</h2>
          {upcoming.length === 0 && <p className="text-sm text-zinc-600 py-6">Aucun événement à venir.</p>}
          <div className="mt-3">
            {upcoming.map((d) => {
              const date = new Date(d.event_date + "T00:00:00");
              return (
                <div key={d.id} className="flex items-center gap-3.5 px-2 py-3 border-t border-[#f0ead9] transition-colors hover:bg-[#faf6ea]">
                  <div className="h-[52px] w-12 shrink-0 rounded-[10px] bg-[#faf3d9] flex flex-col items-center justify-center leading-none">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600">{MONTHS_LONG[date.getMonth()]}</span>
                    <span className="font-display text-[22px] font-bold text-[#7a5f12] mt-0.5">{date.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-zinc-900 truncate">{d.full_name}</p>
                    <p className="text-xs text-zinc-600 truncate">{[d.event_type, d.city].filter(Boolean).join(" · ") || "—"}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// PLANNING
// ============================================================
function PlanningView() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (supabase as any).from("bookings").select("*, products(name)").order("start_date", { ascending: true }).then(({ data }: any) => {
      setBookings(data || []);
      setLoading(false);
    });
    (supabase as any).from("products").select("id, name, stock").eq("active", true).order("name").then(({ data }: any) => {
      setProducts(data || []);
    });
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1 + weekOffset * 7);
  startOfWeek.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }).map((_, i) => { const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate() + i); return d; });
  const dayNames = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

  const getBookingsForDay = (day: Date) => bookings.filter(b => {
    const start = new Date(b.start_date + "T00:00:00");
    const end = new Date(b.end_date + "T00:00:00");
    const d = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return d >= start && d <= end;
  });
  
  const conflicts = new Set<string>();
  days.forEach(day => {
    const dayBookings = getBookingsForDay(day);
    const productCount: Record<string, number> = {};
    dayBookings.forEach(b => { const pid = b.product_id; productCount[pid] = (productCount[pid] || 0) + 1; if (productCount[pid] > 1) conflicts.add(pid); });
  });
  
  const today = new Date();
  const weekBookings = bookings.filter((b) => days.some((day) => getBookingsForDay(day).some((x) => x.id === b.id)));
  const weekProducts = new Set(weekBookings.map((b) => b.product_id)).size;

  // On ajoute la fonction pour gérer le clic sur le conflit
  const handleConflictClick = () => {
    alert("Pour résoudre ce conflit, allez dans 'Réservations' et modifiez les dates de l'une des deux réservations.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-600 mb-1">Planning</p>
          <h1 className="font-display text-3xl text-zinc-900">
            {startOfWeek.toLocaleDateString("fr-FR", { day: "numeric" })} — {days[6].toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setWeekOffset(w => w - 1)} className="p-2.5 border border-[#d9d1bd] rounded-lg hover:bg-[#efe9da]"><ChevronLeft className="h-4 w-4 text-zinc-700" /></button>
          <button onClick={() => setWeekOffset(w => w + 1)} className="p-2.5 border border-[#d9d1bd] rounded-lg hover:bg-[#efe9da]"><ChevronRight className="h-4 w-4 text-zinc-700" /></button>
          <button onClick={() => setWeekOffset(0)} className="px-4 py-2 bg-white border border-[#d9d1bd] rounded-lg text-sm font-medium hover:bg-[#efe9da]">Aujourd'hui</button>
          <button onClick={() => setShowNewBooking(true)} className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#c4a030]">
            <Plus className="h-4 w-4" /> Nouvelle réservation
          </button>
        </div>
      </div>

      {conflicts.size > 0 && (
        <div className="bg-[#fff7dc] border border-[#ecd9a0] p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-[#6e5400]" />
            <div>
              <p className="text-sm font-semibold text-zinc-900">{conflicts.size} conflit de stock cette semaine</p>
              <p className="text-xs text-zinc-600">Un même matériel est réservé plusieurs fois le même jour.</p>
            </div>
          </div>
          <button onClick={handleConflictClick} className="text-xs bg-zinc-900 text-white px-3 py-2 rounded-lg hover:bg-zinc-800">
            Proposer une alternative
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#ebe5d6] rounded-xl p-5"><p className="text-3xl font-display text-zinc-900">{weekBookings.length}</p><p className="text-sm text-zinc-600">réservation(s) cette semaine</p></div>
        <div className="bg-white border border-[#ebe5d6] rounded-xl p-5"><p className="text-3xl font-display text-[#7a5f12]">{weekProducts}</p><p className="text-sm text-zinc-600">produit(s) réservé(s) cette semaine</p></div>
        <div className="bg-white border border-[#ebe5d6] rounded-xl p-5"><p className="text-3xl font-display text-red-600">{conflicts.size}</p><p className="text-sm text-zinc-600">conflit(s) à résoudre</p></div>
      </div>

      <div className="bg-white border border-[#ebe5d6] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#ebe5d6] flex justify-between items-center">
          <h2 className="text-sm font-semibold text-zinc-900">Réservations de la semaine</h2>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1 text-zinc-600"><span className="h-2 w-2 bg-green-500 rounded-full"></span> Confirmé</span>
            <span className="flex items-center gap-1 text-zinc-600"><span className="h-2 w-2 bg-yellow-500 rounded-full"></span> Option</span>
            <span className="flex items-center gap-1 text-zinc-600"><span className="h-2 w-2 bg-red-500 rounded-full"></span> Conflit</span>
          </div>
        </div>
        <div className="grid grid-cols-8 border-b border-[#ebe5d6]">
          <div className="p-3 bg-[#faf8f2] border-r border-[#ebe5d6]"></div>
          {days.map((day, i) => (
            <div key={i} className={`p-3 text-center border-r border-[#ebe5d6] last:border-r-0 ${day.toDateString() === today.toDateString() ? "bg-[#f0ead9]" : "bg-[#faf8f2]"}`}>
              <p className="text-xs text-zinc-500">{dayNames[i]}</p>
              <p className={`text-lg font-display ${day.toDateString() === today.toDateString() ? "text-[#7a5f12] font-bold" : "text-zinc-900"}`}>{day.getDate()}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 min-h-[400px]">
          <div className="p-3 bg-[#faf8f2] border-r border-[#ebe5d6]"></div>
          {days.map((day, i) => {
            const dayBookings = getBookingsForDay(day);
            return (
              <div key={i} className="p-2 border-r border-[#ebe5d6] last:border-r-0 space-y-2">
                {dayBookings.map(b => (
                  <div key={b.id} className="bg-[#e8f5e9] border-l-2 border-green-600 p-2 rounded-sm text-xs">
                    <p className="font-semibold text-zinc-900">{b.products?.name}</p>
                    <p className="text-zinc-600">{b.client_name}</p>
                    <p className="text-[10px] text-zinc-500">Du {new Date(b.start_date).toLocaleDateString("fr-FR")} au {new Date(b.end_date).toLocaleDateString("fr-FR")}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-[#ebe5d6] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4"><h2 className="font-display text-xl text-zinc-900">Disponibilité du matériel</h2><p className="text-xs text-zinc-500">Quantité réservée / stock total, par jour</p></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#ebe5d6]"><th className="text-left p-2 text-zinc-500 font-medium">PRODUIT</th>{days.map((day, i) => <th key={i} className="text-center p-2 text-zinc-500 font-medium">{dayNames[i]} {day.getDate()}</th>)}</tr></thead>
            <tbody>
              {Array.from(new Set(bookings.map(b => b.product_id))).map(pid => {
                const product = bookings.find(b => b.product_id === pid);
                return (
                  <tr key={pid} className="border-b border-[#f0ead9]">
                    <td className="p-2 text-zinc-900">{product?.products?.name || "-"}</td>
                    {days.map((day, i) => {
                      const isBooked = bookings.some(b => b.product_id === pid && day >= new Date(b.start_date) && day <= new Date(b.end_date));
                      return <td key={i} className="p-2 text-center">{isBooked ? <span className="text-green-600">●</span> : <span className="text-zinc-300">-</span>}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showNewBooking && (
        <NewBookingModal
          products={products}
          onClose={() => setShowNewBooking(false)}
          onSaved={() => {
            setShowNewBooking(false);
            (supabase as any).from("bookings").select("*, products(name)").order("start_date", { ascending: true }).then(({ data }: any) => {
              setBookings(data || []);
            });
          }}
        />
      )}
    </div>
  );
}
// ============================================================
// MODAL NOUVELLE RÉSERVATION
// ============================================================
function NewBookingModal({ products, onClose, onSaved }: { products: any[]; onClose: () => void; onSaved: () => void; }) {
  const [form, setForm] = useState({
    productId: "",
    startDate: "",
    endDate: "",
    quantity: 1,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    status: "confirme",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedProduct = products.find(p => p.id === form.productId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.productId || !form.startDate || !form.endDate) {
      setError("Remplissez tous les champs obligatoires.");
      return;
    }
    if (form.endDate < form.startDate) {
      setError("La date de fin doit être après la date de début.");
      return;
    }
    setSaving(true);
    const { error: err } = await (supabase as any).from("bookings").insert({
      product_id: form.productId,
      start_date: form.startDate,
      end_date: form.endDate,
      quantity: form.quantity,
      client_name: form.clientName,
      client_email: form.clientEmail,
      client_phone: form.clientPhone,
      status: form.status,
    });
    setSaving(false);
    if (err) setError(err.message);
    else onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#141414] border border-zinc-800 rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="font-display text-xl text-white">Nouvelle réservation</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-950/50 text-red-300 p-3 text-sm border border-red-800">{error}</div>}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Produit *</label>
            <select required value={form.productId} onChange={e => setForm({ ...form, productId: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]">
              <option value="">-- Choisir un produit --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} (stock: {p.stock})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Début *</label>
              <input required type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Fin *</label>
              <input required type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Quantité</label>
            <input type="number" min={1} max={selectedProduct?.stock || 1} value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Nom du client *</label>
            <input required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Email *</label>
            <input required type="email" value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Téléphone *</label>
            <input required type="tel" value={form.clientPhone} onChange={e => setForm({ ...form, clientPhone: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">Statut</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]">
              <option value="confirme">Confirmé (apparaît dans le planning)</option>
              <option value="en_attente">En attente</option>
            </select>
          </div>
          <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Annuler</button>
            <button type="submit" disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 text-sm font-medium rounded hover:bg-[#c4a030] disabled:opacity-50">{saving ? "Enregistrement..." : "Créer la réservation"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// DEVIS
// ============================================================
function DevisList({ initialSearch = "" }: { initialSearch?: string }) {
  const [devis, setDevis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [selected, setSelected] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  useEffect(() => {
    (supabase as any).from("quote_requests").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setDevis(data || []);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setDevis(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    if (selected && selected.id === id) setSelected({ ...selected, status });
    await (supabase as any).from("quote_requests").update({ status }).eq("id", id);
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    setDevis(prev => prev.filter(d => d.id !== id));
    if (selected && selected.id === id) setSelected(null);
    await (supabase as any).from("quote_requests").delete().eq("id", id);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  const filtered = devis.filter(d => d.full_name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()) || (d.city && d.city.toLowerCase().includes(search.toLowerCase())));

  const columns = [
    { key: "nouveau", label: "Nouveau", color: "bg-blue-500" },
    { key: "en_cours", label: "En cours", color: "bg-yellow-500" },
    { key: "devis_envoye", label: "Devis envoyé", color: "bg-purple-500" },
    { key: "accepte", label: "Accepté", color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="font-display text-3xl">Demandes de devis</h1><p className="text-zinc-500 text-sm mt-1">{devis.length} demande(s)</p></div>
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-100 rounded-sm p-1">
            <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 text-sm rounded ${viewMode === "list" ? "bg-zinc-900 text-white" : "text-zinc-600"}`}>Liste</button>
            <button onClick={() => setViewMode("kanban")} className={`px-3 py-1.5 text-sm rounded ${viewMode === "kanban" ? "bg-zinc-900 text-white" : "text-zinc-600"}`}>Kanban</button>
          </div>
          <button onClick={() => {
            const headers = ["Nom", "Email", "Téléphone", "Ville", "Date événement", "Type", "Total (MAD)", "Statut", "Date création"];
            const rows = devis.map(d => [d.full_name, d.email, d.phone, d.city || "", d.event_date || "", d.event_type || "", d.estimated_total, d.status, new Date(d.created_at).toLocaleDateString("fr-FR")]);
            const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
            const link = document.createElement("a"); link.href = encodeURI(csv); link.download = "devis.csv"; link.click();
          }} className="text-xs bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded flex items-center gap-1"><Download className="h-3 w-3" /> Exporter</button>
        </div>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border rounded bg-white" />
      </div>

      {viewMode === "list" ? (
        <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs border-b">
              <tr><th className="px-6 py-4 text-left">Client</th><th className="px-6 py-4 text-left hidden md:table-cell">Date événement</th><th className="px-6 py-4 text-left">Total</th><th className="px-6 py-4 text-left">Statut</th><th className="px-6 py-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-zinc-50">
                  <td className="px-6 py-4"><p className="font-medium">{d.full_name}</p><p className="text-xs text-zinc-500">{d.email}</p></td>
                  <td className="px-6 py-4 text-zinc-600 hidden md:table-cell">{d.event_date || "-"}</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(d.estimated_total)}</td>
                  <td className="px-6 py-4">
                    <select value={d.status} onChange={e => updateStatus(d.id, e.target.value)} className="text-xs border rounded p-1.5">
                      <option value="nouveau">Nouveau</option><option value="en_cours">En cours</option><option value="devis_envoye">Devis envoyé</option><option value="accepte">Accepté</option><option value="refuse">Refusé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => setSelected(d)} className="p-2 text-zinc-400 hover:text-primary"><Eye className="h-4 w-4" /></button><button onClick={() => del(d.id)} className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => {
            const items = devis.filter(d => d.status === col.key);
            const total = items.reduce((sum, d) => sum + Number(d.estimated_total || 0), 0);
            return (
              <div key={col.key} className="bg-white border rounded-sm shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className={`h-3 w-3 rounded-full ${col.color}`} /><h3 className="font-semibold text-zinc-900">{col.label}</h3></div>
                  <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded-full text-zinc-600">{items.length}</span>
                </div>
                <div className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                  {items.map((d) => (
                    <div key={d.id} className="bg-zinc-50 border rounded-sm p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div><p className="font-medium text-sm text-zinc-900">{d.full_name}</p><p className="text-xs text-zinc-500">{d.city || "-"}</p></div>
                        <p className="text-sm font-semibold text-[#D4AF37]">{formatPrice(d.estimated_total)}</p>
                      </div>
                      <p className="text-xs text-zinc-500">{new Date(d.created_at).toLocaleDateString("fr-FR")}</p>
                      <select value={d.status} onChange={e => updateStatus(d.id, e.target.value)} className="w-full text-xs border rounded p-1.5 bg-white">
                        {columns.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                        <option value="refuse">Refusé</option>
                      </select>
                    </div>
                  ))}
                  {items.length === 0 && <p className="text-xs text-zinc-400 text-center py-4">Aucun devis.</p>}
                </div>
                <div className="p-3 border-t bg-zinc-50"><p className="text-xs text-zinc-500">Total : <span className="font-semibold text-zinc-900">{formatPrice(total)}</span></p></div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between"><h2 className="font-display text-2xl">Détails</h2><button onClick={() => setSelected(null)}><X className="h-5 w-5" /></button></div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded">
                <div><p className="text-xs text-zinc-500">Client</p><p className="font-medium">{selected.full_name}</p></div>
                <div><p className="text-xs text-zinc-500">Téléphone</p><p className="font-medium">{selected.phone}</p></div>
                <div><p className="text-xs text-zinc-500">Email</p><p className="font-medium">{selected.email}</p></div>
                <div><p className="text-xs text-zinc-500">Ville</p><p className="font-medium">{selected.city || "-"}</p></div>
                <div><p className="text-xs text-zinc-500">Date événement</p><p className="font-medium">{selected.event_date || "-"}</p></div>
                <div><p className="text-xs text-zinc-500">Type</p><p className="font-medium">{selected.event_type || "-"}</p></div>
              </div>
              {selected.message && <div><p className="text-xs text-zinc-500 mb-2">Message</p><div className="bg-zinc-50 p-4 border-l-2 border-[#D4AF37] italic text-sm">"{selected.message}"</div></div>}
              <div><p className="text-xs text-zinc-500 mb-3">Articles</p><div className="border rounded divide-y">{Array.isArray(selected.items) && selected.items.map((item: any, i: number) => <div key={i} className="flex justify-between p-3 text-sm"><span>{item.name} x{item.qty}</span><span className="font-medium">{formatPrice(item.price * item.qty)}</span></div>)}</div></div>
              <div className="flex justify-between items-center pt-4 border-t"><span className="font-semibold">Total estimé</span><span className="font-display text-3xl font-bold text-[#D4AF37]">{formatPrice(selected.estimated_total)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// COMPOSANTS EXISTANTS
// ============================================================
const STATUS_STYLES: Record<string, { label: string; bg: string; fg: string }> = {
  nouveau: { label: "Nouveau", bg: "#e3ecfb", fg: "#1c3f86" },
  en_cours: { label: "En cours", bg: "#fdeec2", fg: "#6e5400" },
  devis_envoye: { label: "Devis envoyé", bg: "#e8defa", fg: "#4a2a8a" },
  accepte: { label: "Accepté", bg: "#dcf1e2", fg: "#14532d" },
  refuse: { label: "Refusé", bg: "#fbe1de", fg: "#8a1f14" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? { label: (status || "—").replace(/_/g, " "), bg: "#eeeeee", fg: "#3f3f46" };
  return (
    <span
      style={{ background: s.bg, color: s.fg }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap"
    >
      <span style={{ background: s.fg }} className="h-1.5 w-1.5 rounded-full" />
      {s.label}
    </span>
  );
}

function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (error) { console.error(error); alert("Erreur : " + error.message); } else { setProducts(data || []); }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await (supabase as any).from("products").delete().eq("id", id);
    fetchProducts();
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="font-display text-3xl text-zinc-900">Catalogue</h1><p className="text-zinc-500 text-sm mt-1">{products.length} produit(s)</p></div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" /><input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border rounded bg-white" /></div>
          <button onClick={() => { setEditingProduct(null); setShowForm(true); }} className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2"><Plus className="h-4 w-4" /> Ajouter</button>
        </div>
      </div>
      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs border-b"><tr><th className="px-6 py-4">Produit</th><th className="px-6 py-4">Catégorie</th><th className="px-6 py-4">Prix</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Actions</th></tr></thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 flex items-center gap-3">{p.image_url ? <img src={p.image_url} alt={p.name} className="h-10 w-10 object-cover rounded" /> : <div className="h-10 w-10 bg-zinc-100 rounded flex items-center justify-center text-zinc-400"><ImageIcon className="h-4 w-4" /></div>}<span className="font-medium text-zinc-900">{p.name}</span></td>
                <td className="px-6 py-4 text-zinc-600 uppercase text-xs font-semibold">{p.category_slug || "-"}</td>
                <td className="px-6 py-4 font-semibold text-zinc-900">{formatPrice(p.price)}</td>
                <td className="px-6 py-4">{p.stock > 0 ? <span className="text-green-600">{p.stock} en stock</span> : <span className="text-red-600">Rupture</span>}</td>
                <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => { setEditingProduct(p); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button><button onClick={() => deleteProduct(p.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && <ProductForm product={editingProduct} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchProducts(); }} />}
    </div>
  );
}
function ProductForm({ product, onClose, onSave }: { product: any, onClose: () => void, onSave: () => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: product?.name || "",
    name_en: product?.name_en || "",
    name_ar: product?.name_ar || "",
    slug: product?.slug || "",
    price: product?.price || 0,
    stock: product?.stock || 10,
    category_id: product?.category_id || "",
    description: product?.description || "",
    description_en: product?.description_en || "",
    description_ar: product?.description_ar || "",
    image_url: product?.image_url || "",
    images_text: Array.isArray(product?.images) ? product.images.join("\n") : "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Chargement des catégories depuis Supabase
  useEffect(() => {
    (supabase as any).from("categories").select("*").order("sort_order").then(({ data }: any) => {
      setCategories(data || []);
    });
  }, []);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error) { alert("Erreur upload."); setUploading(false); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    setForm({ ...form, image_url: data.publicUrl });
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    setSaving(true);
    
    if (!form.category_id) {
      alert("Veuillez choisir une catégorie.");
      setSaving(false);
      return;
    }
    
    const imagesArray = form.images_text
      .split("\n")
      .map((url: string) => url.trim())
      .filter((url: string) => url !== "");

    const payload = {
      name: form.name,
      name_en: form.name_en || null,
      name_ar: form.name_ar || null,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      price: Number(form.price),
      stock: Number(form.stock),
      category_id: form.category_id,
      description: form.description,
      description_en: form.description_en || null,
      description_ar: form.description_ar || null,
      image_url: form.image_url,
      images: imagesArray,
    };

    const { error } = product 
      ? await (supabase as any).from("products").update(payload).eq("id", product.id) 
      : await (supabase as any).from("products").insert(payload);
      
    if (error) alert("Erreur : " + error.message); 
    else onSave();
    
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="font-display text-2xl text-zinc-900">{product ? "Modifier" : "Ajouter"} un produit</h2>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Nom (FR)</label>
              <input required name="name" value={form.name} onChange={handleChange} className={field} />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase">Prix (MAD)</label>
              <input required type="number" name="price" value={form.price} onChange={handleChange} className={field} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase">Nom (EN)</label>
              <input name="name_en" value={form.name_en} onChange={handleChange} className={field} />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase">Nom (AR)</label>
              <input name="name_ar" value={form.name_ar} onChange={handleChange} className={`${field} text-right`} dir="rtl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase">Catégorie</label>
              <select name="category_id" value={form.category_id} onChange={handleChange} className={field}>
                <option value="">-- Choisir --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase">Stock</label>
              <input required type="number" name="stock" value={form.stock} onChange={handleChange} className={field} />
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase">Description (FR)</label>
              <textarea required name="description" value={form.description} onChange={handleChange} rows={3} className={field} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase">Description (EN)</label>
                <textarea name="description_en" value={form.description_en} onChange={handleChange} rows={3} className={field} />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 uppercase">Description (AR)</label>
                <textarea name="description_ar" value={form.description_ar} onChange={handleChange} rows={3} className={`${field} text-right`} dir="rtl" />
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-2">Image principale (Couverture)</label>
              <div className="flex items-center gap-4">
                {form.image_url && <img src={form.image_url} className="h-20 w-20 object-cover rounded border" />}
                <div className="flex-1">
                  <input name="image_url" value={form.image_url} onChange={handleChange} className={`${field} mb-2`} placeholder="URL de l'image" />
                  <input type="file" onChange={handleImageUpload} className="text-sm" />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin inline ml-2" />}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase block mb-2">
                Galerie d'images supplémentaires (une URL par ligne)
              </label>
              <textarea 
                name="images_text" 
                value={form.images_text} 
                onChange={handleChange} 
                rows={4} 
                className={`${field} font-mono text-xs`} 
              />
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 rounded">Annuler</button>
            <button type="submit" disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 text-sm font-medium rounded disabled:opacity-50">
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("categories").select("*").order("sort_order");
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const deleteCategory = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await (supabase as any).from("categories").delete().eq("id", id);
    fetchCategories();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h1 className="font-display text-3xl text-zinc-900">Catégories</h1><p className="text-zinc-500 text-sm">{categories.length} catégorie(s)</p></div><button onClick={() => { setEditingCategory(null); setShowForm(true); }} className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2"><Plus className="h-4 w-4" /> Ajouter</button></div>
      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs border-b"><tr><th className="px-6 py-4">Nom</th><th className="px-6 py-4">Slug</th><th className="px-6 py-4">Description</th><th className="px-6 py-4">Actions</th></tr></thead>
          <tbody className="divide-y divide-zinc-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50"><td className="px-6 py-4 font-medium">{c.name}</td><td className="px-6 py-4 font-mono text-xs">{c.slug}</td><td className="px-6 py-4">{c.description || "-"}</td><td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => { setEditingCategory(c); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button><button onClick={() => deleteCategory(c.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && <CategoryForm category={editingCategory} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetchCategories(); }} />}
    </div>
  );
}
function CategoryForm({ category, onClose, onSave }: { category: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({ 
    name: category?.name || "", 
    name_en: category?.name_en || "",
    name_ar: category?.name_ar || "",
    slug: category?.slug || "", 
    description: category?.description || "", 
    description_en: category?.description_en || "",
    description_ar: category?.description_ar || "",
    sort_order: category?.sort_order || 0 
  });
  const [saving, setSaving] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { 
      name: form.name, 
      name_en: form.name_en || null,
      name_ar: form.name_ar || null,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
      description: form.description,
      description_en: form.description_en || null,
      description_ar: form.description_ar || null,
      sort_order: Number(form.sort_order) 
    };
    const { error } = category ? await (supabase as any).from("categories").update(payload).eq("id", category.id) : await (supabase as any).from("categories").insert(payload);
    if (error) alert(error.message); else onSave();
    setSaving(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between">
          <h2 className="font-display text-xl">{category ? "Modifier" : "Nouvelle"} catégorie</h2>
          <button onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Noms multilingues */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase">Nom (FR)</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={field} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase">Nom (EN)</label>
              <input value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} className={field} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase">Nom (AR)</label>
              <input value={form.name_ar} onChange={e => setForm({...form, name_ar: e.target.value})} className={`${field} text-right`} dir="rtl" />
            </div>
          </div>

          {/* Descriptions multilingues */}
          <div>
            <label className="text-xs text-zinc-500 uppercase">Description (FR)</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className={field} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase">Description (EN)</label>
              <textarea value={form.description_en} onChange={e => setForm({...form, description_en: e.target.value})} rows={2} className={field} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase">Description (AR)</label>
              <textarea value={form.description_ar} onChange={e => setForm({...form, description_ar: e.target.value})} rows={2} className={`${field} text-right`} dir="rtl" />
            </div>
          </div>

          {/* Ordre d'affichage */}
          <div>
            <label className="text-xs text-zinc-500 uppercase">Ordre d'affichage</label>
            <input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: Number(e.target.value)})} className={field} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm">Annuler</button>
            <button type="submit" disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 text-sm rounded">{saving ? "..." : "Enregistrer"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GalleryList() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("gallery").select("*").order("created_at", { ascending: false });
    setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleUpload = async (e: any) => {
    const files = e.target.files; if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of files) {
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from("gallery-images").upload(fileName, file);
      if (!error) { const { data } = supabase.storage.from("gallery-images").getPublicUrl(fileName); await (supabase as any).from("gallery").insert({ title: file.name, image_url: data.publicUrl }); }
    }
    setUploading(false); fetchPhotos();
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await (supabase as any).from("gallery").delete().eq("id", id);
    fetchPhotos();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h1 className="font-display text-3xl">Galerie</h1><p className="text-zinc-500 text-sm">{photos.length} photo(s)</p></div><label className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2 cursor-pointer">{uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Ajouter<input type="file" multiple onChange={handleUpload} className="hidden" /></label></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="group relative aspect-square bg-zinc-100 rounded overflow-hidden">
            <img src={p.image_url} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center"><button onClick={() => deletePhoto(p.id)} className="bg-red-600 text-white p-2 rounded-full"><Trash2 className="h-5 w-5" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const toggle = async (id: string, approved: boolean) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved } : t));
    await (supabase as any).from("testimonials").update({ approved }).eq("id", id);
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await (supabase as any).from("testimonials").delete().eq("id", id);
    fetch();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h1 className="font-display text-3xl">Avis clients</h1><p className="text-zinc-500 text-sm">{testimonials.length} avis</p></div><button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2"><Plus className="h-4 w-4" /> Ajouter</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border rounded-sm shadow-sm p-6">
            <div className="flex justify-between items-start mb-3"><div><p className="font-semibold">{t.name}</p>{t.role && <p className="text-xs text-zinc-500">{t.role}</p>}</div><div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />)}</div></div>
            <p className="text-sm italic mb-4">"{t.content}"</p>
            <div className="flex justify-between items-center pt-4 border-t"><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={t.approved} onChange={e => toggle(t.id, e.target.checked)} /><span className={t.approved ? "text-green-600" : "text-zinc-500"}>{t.approved ? "Publié" : "En attente"}</span></label><div className="flex gap-2"><button onClick={() => { setEditing(t); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button><button onClick={() => del(t.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></div>
          </div>
        ))}
      </div>
      {showForm && <TestimonialForm testimonial={editing} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetch(); }} />}
    </div>
  );
}

function TestimonialForm({ testimonial, onClose, onSave }: { testimonial: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({ name: testimonial?.name || "", role: testimonial?.role || "", content: testimonial?.content || "", rating: testimonial?.rating || 5, approved: testimonial?.approved || false });
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const { error } = testimonial ? await (supabase as any).from("testimonials").update(form).eq("id", testimonial.id) : await (supabase as any).from("testimonials").insert(form);
    if (error) alert(error.message); else onSave();
    setSaving(false);
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between"><h2 className="font-display text-xl">{testimonial ? "Modifier" : "Nouvel"} avis</h2><button onClick={onClose}><X className="h-5 w-5" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="text-xs text-zinc-500">Nom</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={field} /></div>
          <div><label className="text-xs text-zinc-500">Rôle</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className={field} /></div>
          <div><label className="text-xs text-zinc-500">Avis</label><textarea required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={3} className={field} /></div>
          <div><label className="text-xs text-zinc-500">Note (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className={field} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.approved} onChange={e => setForm({...form, approved: e.target.checked})} id="approved" /><label htmlFor="approved" className="text-sm">Publier</label></div>
          <div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2 text-sm">Annuler</button><button type="submit" disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 text-sm rounded">{saving ? "..." : "Enregistrer"}</button></div>
        </form>
      </div>
    </div>
  );
}

function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetch = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await (supabase as any).from("posts").delete().eq("id", id);
    fetch();
  };

  const toggle = async (id: string, published: boolean) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, published } : p));
    await (supabase as any).from("posts").update({ published }).eq("id", id);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h1 className="font-display text-3xl">Blog</h1><p className="text-zinc-500 text-sm">{posts.length} article(s)</p></div><button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2"><Plus className="h-4 w-4" /> Nouvel article</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <div key={p.id} className="bg-white border rounded-sm shadow-sm overflow-hidden flex flex-col">
            {p.cover_image && <img src={p.cover_image} className="w-full h-40 object-cover" />}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-500 flex-1 mb-4">{p.excerpt || p.content.slice(0, 100) + "..."}</p>
              <div className="flex justify-between items-center pt-4 border-t"><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={p.published} onChange={e => toggle(p.id, e.target.checked)} /><span className={p.published ? "text-green-600" : "text-zinc-500"}>{p.published ? "Publié" : "Brouillon"}</span></label><div className="flex gap-2"><button onClick={() => { setEditing(p); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600"><Edit className="h-4 w-4" /></button><button onClick={() => del(p.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></div>
            </div>
          </div>
        ))}
      </div>
      {showForm && <ArticleForm post={editing} onClose={() => setShowForm(false)} onSave={() => { setShowForm(false); fetch(); }} />}
    </div>
  );
}

function ArticleForm({ post, onClose, onSave }: { post: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({ title: post?.title || "", slug: post?.slug || "", excerpt: post?.excerpt || "", content: post?.content || "", cover_image: post?.cover_image || "", published: post?.published || false });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const handleImage = async (e: any) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) { alert("Erreur"); setUploading(false); return; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    setForm({ ...form, cover_image: data.publicUrl });
    setUploading(false);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const payload = { title: form.title, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), excerpt: form.excerpt, content: form.content, cover_image: form.cover_image, published: form.published };
    const { error } = post ? await (supabase as any).from("posts").update(payload).eq("id", post.id) : await (supabase as any).from("posts").insert(payload);
    if (error) alert(error.message); else onSave();
    setSaving(false);
  };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between"><h2 className="font-display text-xl">{post ? "Modifier" : "Nouvel"} article</h2><button onClick={onClose}><X className="h-5 w-5" /></button></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div><label className="text-xs text-zinc-500">Titre</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={field} /></div>
          <div><label className="text-xs text-zinc-500">Extrait</label><textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2} className={field} /></div>
          <div><label className="text-xs text-zinc-500">Contenu</label><textarea required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={8} className={field} /></div>
          <div><label className="text-xs text-zinc-500">Image</label><div className="flex items-center gap-4">{form.cover_image && <img src={form.cover_image} className="h-16 w-16 object-cover rounded border" />}<input type="file" onChange={handleImage} />{uploading && <Loader2 className="h-4 w-4 animate-spin" />}</div></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} id="pub" /><label htmlFor="pub">Publier</label></div>
          <div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2 text-sm">Annuler</button><button type="submit" disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 text-sm rounded">{saving ? "..." : "Enregistrer"}</button></div>
        </form>
      </div>
    </div>
  );
}

function BookingsList() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("bookings").select("*, products(name)").order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    await (supabase as any).from("bookings").update({ status }).eq("id", id);
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await (supabase as any).from("bookings").delete().eq("id", id);
    fetch();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl">Réservations</h1><p className="text-zinc-500 text-sm">{bookings.length} réservation(s)</p></div>
      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs border-b"><tr><th className="px-6 py-4 text-left">Produit</th><th className="px-6 py-4 text-left">Client</th><th className="px-6 py-4 text-left">Période</th><th className="px-6 py-4 text-left">Statut</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-zinc-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium">{b.products?.name || "-"}</td>
                <td className="px-6 py-4"><p className="font-medium">{b.client_name}</p><p className="text-xs text-zinc-500">{b.client_email}</p><p className="text-xs text-zinc-500">{b.client_phone}</p></td>
                <td className="px-6 py-4 text-zinc-600">Du {new Date(b.start_date).toLocaleDateString("fr-FR")}<br />Au {new Date(b.end_date).toLocaleDateString("fr-FR")}</td>
                <td className="px-6 py-4"><select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} className="text-xs border rounded p-1.5"><option value="en_attente">En attente</option><option value="confirme">Confirmé</option><option value="annule">Annulé</option></select></td>
                <td className="px-6 py-4 text-right"><button onClick={() => del(b.id)} className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesList() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any).from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setMessages(data || []);
      setLoading(false);
    });
  }, []);

  const markAsRead = async (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "lu" } : m));
    await (supabase as any).from("contact_messages").update({ status: "lu" }).eq("id", id);
  };

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    setMessages(prev => prev.filter(m => m.id !== id));
    await (supabase as any).from("contact_messages").delete().eq("id", id);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-3xl">Boîte de réception</h1><p className="text-zinc-500 text-sm">{messages.length} message(s)</p></div>
      <div className="grid grid-cols-1 gap-4">
        {messages.map((m) => (
          <div key={m.id} className={`bg-white border rounded-sm shadow-sm p-6 ${m.status === "nouveau" ? "border-l-4 border-l-[#D4AF37]" : ""}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div><h3 className="font-display text-xl flex items-center gap-2">{m.name} {m.status === "nouveau" && <span className="text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full uppercase font-sans font-bold">Nouveau</span>}</h3><div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-2"><span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {m.email}</span>{m.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {m.phone}</span>}<span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span></div></div>
              <div className="flex items-center gap-2">{m.status === "nouveau" ? <button onClick={() => markAsRead(m.id)} className="flex items-center gap-1 text-xs bg-zinc-900 text-white px-3 py-1.5 rounded"><CheckCircle className="h-3 w-3" /> Marquer lu</button> : <span className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded"><CheckCircle className="h-3 w-3" /> Lu</span>}<button onClick={() => del(m.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div>
            </div>
            <p className="text-sm mt-4 text-zinc-700 whitespace-pre-wrap bg-zinc-50 p-4 rounded border-l-2 border-zinc-200">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <div className="text-center py-12 text-zinc-500 bg-white border rounded-sm">Aucun message.</div>}
      </div>
    </div>
  );
}

function NewsletterList() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any).from("newsletter").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setSubs(data || []);
      setLoading(false);
    });
  }, []);

  const del = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await (supabase as any).from("newsletter").delete().eq("id", id);
    setSubs(prev => prev.filter(s => s.id !== id));
  };

  const exportCSV = () => {
    const headers = ["Email", "Date", "Actif"];
    const rows = subs.map(s => [s.email, new Date(s.created_at).toLocaleDateString("fr-FR"), s.active ? "Oui" : "Non"]);
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const link = document.createElement("a"); link.href = encodeURI(csv); link.download = "newsletter.csv"; link.click();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><div><h1 className="font-display text-3xl">Newsletter</h1><p className="text-zinc-500 text-sm">{subs.length} abonné(s)</p></div><button onClick={exportCSV} className="bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2"><Download className="h-4 w-4" /> Exporter</button></div>
      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs border-b"><tr><th className="px-6 py-4 text-left">Email</th><th className="px-6 py-4 text-left">Date</th><th className="px-6 py-4 text-left">Statut</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-zinc-100">
            {subs.map(s => (
              <tr key={s.id} className="hover:bg-zinc-50"><td className="px-6 py-4 font-medium">{s.email}</td><td className="px-6 py-4 text-zinc-600">{new Date(s.created_at).toLocaleDateString("fr-FR")}</td><td className="px-6 py-4">{s.active ? <span className="text-green-600">Actif</span> : <span className="text-zinc-400">Inactif</span>}</td><td className="px-6 py-4 text-right"><button onClick={() => del(s.id)} className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}