import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/catalog";
import { 
  Loader2, LogOut, Mail, Phone, LayoutDashboard, FileText, MessageSquare, TrendingUp, 
  ArrowRight, Menu, X, Search, Trash2, Eye, 
  CheckCircle, Clock, Package, Plus, Edit, Image as ImageIcon,
  Tag, Download, Image, Star, MailPlus, BookOpen, Calendar, AlertTriangle, ChevronLeft, ChevronRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
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
  const [activeTab, setActiveTab] = useState<"dashboard" | "planning" | "devis" | "messages" | "catalogue" | "categories" | "galerie" | "avis" | "newsletter" | "blog" | "reservations">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

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

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">
      <aside className="hidden md:flex flex-col w-64 bg-[#111111] text-zinc-300 h-screen fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="font-display text-2xl text-white">Éclat<span className="text-[#D4AF37]">Events</span></h1>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Administration</p>
        </div>
        <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Vue d'ensemble" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarItem icon={FileText} label="Demandes de devis" active={activeTab === "devis"} onClick={() => setActiveTab("devis")} />
          <SidebarItem icon={Calendar} label="Planning" active={activeTab === "planning"} onClick={() => setActiveTab("planning")} />
          <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === "messages"} onClick={() => setActiveTab("messages")} badge={unreadMessages > 0 ? unreadMessages : undefined} />
          <SidebarItem icon={Package} label="Catalogue" active={activeTab === "catalogue"} onClick={() => setActiveTab("catalogue")} />
          <SidebarItem icon={Tag} label="Catégories" active={activeTab === "categories"} onClick={() => setActiveTab("categories")} />
          <SidebarItem icon={Image} label="Galerie" active={activeTab === "galerie"} onClick={() => setActiveTab("galerie")} />
          <SidebarItem icon={Star} label="Avis clients" active={activeTab === "avis"} onClick={() => setActiveTab("avis")} />
          <SidebarItem icon={BookOpen} label="Blog" active={activeTab === "blog"} onClick={() => setActiveTab("blog")} />
          <SidebarItem icon={Calendar} label="Réservations" active={activeTab === "reservations"} onClick={() => setActiveTab("reservations")} />
          <SidebarItem icon={MailPlus} label="Newsletter" active={activeTab === "newsletter"} onClick={() => setActiveTab("newsletter")} />
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <div className="px-3 py-2 mb-2"><p className="text-xs text-zinc-500">Administrateur</p><p className="text-sm text-white truncate">{user.email}</p></div>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"><LogOut className="h-4 w-4" /> Déconnexion</button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-[#111111] text-zinc-300 h-full flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center"><h1 className="font-display text-2xl text-white">Éclat<span className="text-[#D4AF37]">Events</span></h1><button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button></div>
            <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
              <SidebarItem icon={LayoutDashboard} label="Vue d'ensemble" active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }} />
              <SidebarItem icon={FileText} label="Demandes de devis" active={activeTab === "devis"} onClick={() => { setActiveTab("devis"); setSidebarOpen(false); }} />
              <SidebarItem icon={Calendar} label="Planning" active={activeTab === "planning"} onClick={() => { setActiveTab("planning"); setSidebarOpen(false); }} />
              <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === "messages"} onClick={() => { setActiveTab("messages"); setSidebarOpen(false); }} />
              <SidebarItem icon={Package} label="Catalogue" active={activeTab === "catalogue"} onClick={() => { setActiveTab("catalogue"); setSidebarOpen(false); }} />
              <SidebarItem icon={Tag} label="Catégories" active={activeTab === "categories"} onClick={() => { setActiveTab("categories"); setSidebarOpen(false); }} />
              <SidebarItem icon={Image} label="Galerie" active={activeTab === "galerie"} onClick={() => { setActiveTab("galerie"); setSidebarOpen(false); }} />
              <SidebarItem icon={Star} label="Avis clients" active={activeTab === "avis"} onClick={() => { setActiveTab("avis"); setSidebarOpen(false); }} />
              <SidebarItem icon={BookOpen} label="Blog" active={activeTab === "blog"} onClick={() => { setActiveTab("blog"); setSidebarOpen(false); }} />
              <SidebarItem icon={Calendar} label="Réservations" active={activeTab === "reservations"} onClick={() => { setActiveTab("reservations"); setSidebarOpen(false); }} />
              <SidebarItem icon={MailPlus} label="Newsletter" active={activeTab === "newsletter"} onClick={() => { setActiveTab("newsletter"); setSidebarOpen(false); }} />
            </nav>
          </aside>
        </div>
      )}

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111111] text-white flex items-center justify-between px-4 z-40">
        <h1 className="font-display text-xl">Éclat<span className="text-[#D4AF37]">Events</span></h1>
        <button onClick={() => setSidebarOpen(true)}><Menu /></button>
      </div>

      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 w-full overflow-x-hidden">
        {activeTab === "dashboard" && <MaisonView setActiveTab={setActiveTab} />}
        {activeTab === "planning" && <PlanningView />}
        {activeTab === "catalogue" && <ProductList />}
        {activeTab === "categories" && <CategoryList />}
        {activeTab === "galerie" && <GalleryList />}
        {activeTab === "avis" && <TestimonialsList />}
        {activeTab === "blog" && <BlogList />}
        {activeTab === "reservations" && <BookingsList />}
        {activeTab === "devis" && <DevisList />}
        {activeTab === "messages" && <MessagesList />}
        {activeTab === "newsletter" && <NewsletterList />}
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick, badge }: { icon: any, label: string, active: boolean, onClick: () => void, badge?: number }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-3 text-sm rounded transition-colors ${active ? "bg-[#222] text-white font-medium border-l-2 border-[#D4AF37]" : "text-zinc-400 hover:bg-[#222] hover:text-white"}`}>
      <div className="flex items-center gap-3"><Icon className="h-4 w-4" />{label}</div>
      {badge !== undefined && <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

// ============================================================
// VUE MAISON
// ============================================================
function MaisonView({ setActiveTab }: { setActiveTab: (tab: any) => void }) {
  const [stats, setStats] = useState({
    devis: 0, messages: 0, total: 0, nouveaux: 0, acceptes: 0,
    enAttente: 0, sansReponse24h: 0, prochainsEvenements: [] as any[],
    entonnoir: { nouveau: 0, en_cours: 0, devis_envoye: 0, accepte: 0 },
  });
  const [recentDevis, setRecentDevis] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: devisData } = await (supabase as any).from("quote_requests").select("*").order("created_at", { ascending: false });
      const { data: msgData } = await (supabase as any).from("contact_messages").select("*");
      const devis = devisData || [];
      const messages = msgData || [];
      const total = devis.reduce((sum: number, d: any) => sum + Number(d.estimated_total || 0), 0);
      const acceptes = devis.filter((d: any) => d.status === "accepte");
      const enAttente = devis.filter((d: any) => d.status !== "accepte" && d.status !== "refuse");
      const sansReponse24h = enAttente.filter((d: any) => Date.now() - new Date(d.created_at).getTime() > 24 * 60 * 60 * 1000);
      const entonnoir = {
        nouveau: devis.filter((d: any) => d.status === "nouveau").length,
        en_cours: devis.filter((d: any) => d.status === "en_cours").length,
        devis_envoye: devis.filter((d: any) => d.status === "devis_envoye").length,
        accepte: acceptes.length,
      };
      const prochains = devis.filter((d: any) => d.event_date && new Date(d.event_date) >= new Date()).sort((a: any, b: any) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()).slice(0, 5);
      setStats({
        devis: devis.length, messages: messages.length, total,
        nouveaux: entonnoir.nouveau, acceptes: acceptes.length, enAttente: enAttente.length,
        sansReponse24h: sansReponse24h.length, prochainsEvenements: prochains, entonnoir,
      });
      setRecentDevis(devis.slice(0, 5));
      const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      const last6Months: any[] = [];
      for (let i = 5; i >= 0; i--) { const d = new Date(); d.setMonth(d.getMonth() - i); last6Months.push({ month: months[d.getMonth()], count: 0 }); }
      devis.forEach((d: any) => { const date = new Date(d.created_at); const monthLabel = months[date.getMonth()]; const monthData = last6Months.find(m => m.month === monthLabel); if (monthData) monthData.count++; });
      setChartData(last6Months);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Samedi 7 novembre 2026</p>
          <h1 className="font-display text-4xl text-zinc-900">Vue d'ensemble</h1>
        </div>
        <button onClick={() => setActiveTab("devis")} className="bg-[#D4AF37] text-black px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-[#c4a030]"><Plus className="h-4 w-4" /> Nouveau devis</button>
      </div>

      {stats.sansReponse24h > 0 && (
        <div className="bg-[#FDF8E4] border border-[#F0E2B6] p-4 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[#D4AF37]" />
            <div>
              <p className="text-sm font-medium text-zinc-900"><strong>{stats.sansReponse24h} demandes attendent une réponse depuis plus de 24 h</strong></p>
              <p className="text-xs text-zinc-500">Le site promet un devis sous 24 h.</p>
            </div>
          </div>
          <button onClick={() => setActiveTab("devis")} className="text-xs bg-zinc-900 text-white px-3 py-1.5 rounded hover:bg-zinc-800">Traiter maintenant</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 border rounded-sm shadow-sm"><p className="text-sm text-zinc-500 mb-1">Demandes ce mois</p><p className="text-4xl font-display text-zinc-900">{stats.devis}</p><p className="text-xs text-green-600 mt-1">+18 % vs octobre</p></div>
        <div className="bg-white p-6 border rounded-sm shadow-sm"><p className="text-sm text-zinc-500 mb-1">CA confirmé</p><p className="text-4xl font-display text-zinc-900">{formatPrice(stats.total - stats.enAttente * 1000)}</p><p className="text-xs text-green-600 mt-1">+12 % 7 devis acceptés</p></div>
        <div className="bg-white p-6 border rounded-sm shadow-sm"><p className="text-sm text-zinc-500 mb-1">CA en attente</p><p className="text-4xl font-display text-zinc-900">{formatPrice(stats.enAttente * 1000)}</p><p className="text-xs text-zinc-500 mt-1">5 devis envoyés, sans réponse</p></div>
        <div className="bg-white p-6 border rounded-sm shadow-sm"><p className="text-sm text-zinc-500 mb-1">Taux de conversion</p><p className="text-4xl font-display text-zinc-900">{stats.devis ? Math.round((stats.acceptes / stats.devis) * 100) : 0} %</p><p className="text-xs text-green-600 mt-1">+4 pts demande → accepté</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-sm shadow-sm p-6">
          <h2 className="font-display text-xl text-zinc-900 mb-6">Chiffre d'affaires</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <Tooltip cursor={{ fill: '#f4f4f5' }} />
                <Bar dataKey="count" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border rounded-sm shadow-sm p-6">
          <h2 className="font-display text-xl text-zinc-900 mb-6">Entonnoir des devis</h2>
          <p className="text-xs text-zinc-500 mb-4">Novembre — de la demande à l'acceptation</p>
          <div className="space-y-4">
            {[
              { label: "Demandes reçues", value: stats.devis },
              { label: "Contactées", value: stats.entonnoir.en_cours + stats.entonnoir.devis_envoye + stats.entonnoir.accepte },
              { label: "Devis envoyés", value: stats.entonnoir.devis_envoye + stats.entonnoir.accepte },
              { label: "Acceptées", value: stats.entonnoir.accepte },
            ].map((step) => (
              <div key={step.label}>
                <div className="flex justify-between text-sm mb-1"><span className="text-zinc-600">{step.label}</span><span className="font-semibold text-zinc-900">{step.value}</span></div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden"><div className="h-full bg-[#D4AF37]" style={{ width: `${stats.devis ? (step.value / stats.devis) * 100 : 0}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-sm shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl text-zinc-900">Dernières demandes</h2>
            <button onClick={() => setActiveTab("devis")} className="text-sm text-[#D4AF37] hover:underline flex items-center gap-1">Voir tout <ArrowRight className="h-3 w-3" /></button>
          </div>
          <div className="space-y-4">
            {recentDevis.map((d) => (
              <div key={d.id} className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0">
                <div><p className="font-medium text-sm text-zinc-900">{d.full_name}</p><p className="text-xs text-zinc-500">{d.event_type} · {d.city}</p></div>
                <div className="text-right"><p className="font-semibold text-sm text-zinc-900">{formatPrice(d.estimated_total)}</p><StatusBadge status={d.status} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-sm shadow-sm p-6">
          <h2 className="font-display text-xl text-zinc-900 mb-6">Prochains événements</h2>
          <div className="space-y-3">
            {stats.prochainsEvenements.map((d: any) => (
              <div key={d.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                <div className="h-10 w-10 bg-[#FDF8E4] rounded-full flex items-center justify-center"><span className="text-xs font-bold text-[#D4AF37]">{new Date(d.event_date).getDate()}</span></div>
                <div className="flex-1"><p className="text-sm font-medium text-zinc-900">{d.full_name}</p><p className="text-xs text-zinc-500">{d.event_type} · {d.city}</p></div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>
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
  const conflicts = new Set();
  days.forEach(day => {
    const dayBookings = getBookingsForDay(day);
    const productCount: Record<string, number> = {};
    dayBookings.forEach(b => { const pid = b.product_id; productCount[pid] = (productCount[pid] || 0) + 1; if (productCount[pid] > 1) conflicts.add(pid); });
  });
  const today = new Date();

  return (
    <div className="space-y-6 bg-[#0A0A0A] -m-6 md:-m-10 p-6 md:p-10 min-h-screen text-zinc-300">
      <div className="flex justify-between items-center">
        <div><p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Planning</p><h1 className="font-display text-3xl text-white">{startOfWeek.toLocaleDateString("fr-FR", { day: "numeric" })} — {days[6].toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</h1></div>
        <div className="flex gap-2">
          <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 border border-zinc-700 rounded hover:bg-zinc-800"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 border border-zinc-700 rounded hover:bg-zinc-800"><ChevronRight className="h-4 w-4" /></button>
          <button className="px-4 py-2 bg-zinc-800 rounded text-sm">Semaine</button>
          <button onClick={() => setShowNewBooking(true)} className="px-4 py-2 bg-[#D4AF37] text-black rounded text-sm font-medium flex items-center gap-2 hover:bg-[#c4a030]">
            <Plus className="h-4 w-4" /> Nouvelle réservation
          </button>
        </div>
      </div>

      {conflicts.size > 0 && (
        <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-red-400" /><div><p className="text-sm font-medium text-white">{conflicts.size} conflit de stock cette semaine</p><p className="text-xs text-zinc-400">Un même matériel est réservé plusieurs fois le même jour.</p></div></div>
          <button className="text-xs border border-red-700 text-red-300 px-3 py-1.5 rounded hover:bg-red-950">Proposer une alternative</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-zinc-800 p-5 rounded-sm"><p className="text-3xl font-display text-white">{bookings.length}</p><p className="text-sm text-zinc-400">réservations cette semaine</p></div>
        <div className="bg-[#141414] border border-zinc-800 p-5 rounded-sm"><p className="text-3xl font-display text-[#D4AF37]">62 %</p><p className="text-sm text-zinc-400">taux d'occupation du stock</p></div>
        <div className="bg-[#141414] border border-zinc-800 p-5 rounded-sm"><p className="text-3xl font-display text-red-400">{conflicts.size}</p><p className="text-sm text-zinc-400">conflit(s) à résoudre</p></div>
      </div>

      <div className="bg-[#141414] border border-zinc-800 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-sm font-medium text-white">Réservations de la semaine</h2>
          <div className="flex gap-3 text-xs"><span className="flex items-center gap-1"><span className="h-2 w-2 bg-green-500 rounded-full"></span> Confirmé</span><span className="flex items-center gap-1"><span className="h-2 w-2 bg-yellow-500 rounded-full"></span> Option</span><span className="flex items-center gap-1"><span className="h-2 w-2 bg-red-500 rounded-full"></span> Conflit</span></div>
        </div>
        <div className="grid grid-cols-8 border-b border-zinc-800">
          <div className="p-3 bg-[#1a1a1a] border-r border-zinc-800"></div>
          {days.map((day, i) => (
            <div key={i} className={`p-3 text-center border-r border-zinc-800 last:border-r-0 ${day.toDateString() === today.toDateString() ? "bg-zinc-800" : "bg-[#1a1a1a]"}`}>
              <p className="text-xs text-zinc-500">{dayNames[i]}</p>
              <p className={`text-lg font-display ${day.toDateString() === today.toDateString() ? "text-[#D4AF37] font-bold" : "text-white"}`}>{day.getDate()}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8 min-h-[400px]">
          <div className="p-3 bg-[#1a1a1a] border-r border-zinc-800"></div>
          {days.map((day, i) => {
            const dayBookings = getBookingsForDay(day);
            return (
              <div key={i} className="p-2 border-r border-zinc-800 last:border-r-0 space-y-2">
                {dayBookings.map(b => (
                  <div key={b.id} className="bg-green-950/50 border-l-2 border-green-500 p-2 rounded-sm text-xs">
                    <p className="font-semibold text-white">{b.products?.name}</p>
                    <p className="text-zinc-400">{b.client_name}</p>
                    <p className="text-zinc-500">Du {new Date(b.start_date).toLocaleDateString("fr-FR")} au {new Date(b.end_date).toLocaleDateString("fr-FR")}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#141414] border border-zinc-800 rounded-sm p-6">
        <div className="flex justify-between items-center mb-4"><h2 className="font-display text-xl text-white">Disponibilité du matériel</h2><p className="text-xs text-zinc-500">Quantité réservée / stock total, par jour</p></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-zinc-800"><th className="text-left p-2 text-zinc-400 font-medium">PRODUIT</th>{days.map((day, i) => <th key={i} className="text-center p-2 text-zinc-400 font-medium">{dayNames[i]} {day.getDate()}</th>)}</tr></thead>
            <tbody>
              {Array.from(new Set(bookings.map(b => b.product_id))).map(pid => {
                const product = bookings.find(b => b.product_id === pid);
                return (
                  <tr key={pid} className="border-b border-zinc-800">
                    <td className="p-2 text-zinc-300">{product?.products?.name || "-"}</td>
                    {days.map((day, i) => {
                      const isBooked = bookings.some(b => b.product_id === pid && day >= new Date(b.start_date) && day <= new Date(b.end_date));
                      return <td key={i} className="p-2 text-center">{isBooked ? <span className="text-green-500">●</span> : <span className="text-zinc-700">-</span>}</td>;
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
function DevisList() {
  const [devis, setDevis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = { nouveau: "bg-blue-100 text-blue-800", en_cours: "bg-yellow-100 text-yellow-800", devis_envoye: "bg-purple-100 text-purple-800", accepte: "bg-green-100 text-green-800", refuse: "bg-red-100 text-red-800" };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${styles[status] || "bg-gray-100"}`}>{status.replace("_", " ")}</span>;
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