import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/catalog";
import { 
  Loader2, LogOut, Mail, Phone, LayoutDashboard, FileText, MessageSquare, TrendingUp, 
  ArrowRight, Menu, X, Search, Trash2, Eye, 
  CheckCircle, Clock, Package, Plus, Edit, Image as ImageIcon,
  Tag, Download, Image, Star, MailPlus, BookOpen, Calendar
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
  const [activeTab, setActiveTab] = useState<"dashboard" | "devis" | "messages" | "catalogue" | "categories" | "galerie" | "avis" | "newsletter" | "blog" | "reservations">("dashboard");
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
    if (error) setAuthError("Identifiants incorrects. Vérifiez votre email et mot de passe.");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className={field} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Mot de passe</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={field} />
            </div>
            <button className="w-full bg-zinc-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors mt-6 font-medium">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900 text-zinc-300 min-h-screen fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="font-display text-2xl text-white">ÉclatEvents</h1>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Admin</p>
        </div>
        
        <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Vue d'ensemble" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarItem icon={Package} label="Catalogue" active={activeTab === "catalogue"} onClick={() => setActiveTab("catalogue")} />
          <SidebarItem icon={Tag} label="Catégories" active={activeTab === "categories"} onClick={() => setActiveTab("categories")} />
          <SidebarItem icon={Image} label="Galerie" active={activeTab === "galerie"} onClick={() => setActiveTab("galerie")} />
          <SidebarItem icon={Star} label="Avis clients" active={activeTab === "avis"} onClick={() => setActiveTab("avis")} />
          <SidebarItem icon={BookOpen} label="Blog" active={activeTab === "blog"} onClick={() => setActiveTab("blog")} />
          <SidebarItem icon={Calendar} label="Réservations" active={activeTab === "reservations"} onClick={() => setActiveTab("reservations")} />
          <SidebarItem icon={FileText} label="Demandes de devis" active={activeTab === "devis"} onClick={() => setActiveTab("devis")} />
          <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === "messages"} onClick={() => setActiveTab("messages")} badge={unreadMessages > 0 ? unreadMessages : undefined} />
          <SidebarItem icon={MailPlus} label="Newsletter" active={activeTab === "newsletter"} onClick={() => setActiveTab("newsletter")} />
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-zinc-500">Connecté en tant que</p>
            <p className="text-sm text-white truncate">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-zinc-900 text-zinc-300 h-full flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h1 className="font-display text-2xl text-white">ÉclatEvents</h1>
              <button onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
              <SidebarItem icon={LayoutDashboard} label="Vue d'ensemble" active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }} />
              <SidebarItem icon={Package} label="Catalogue" active={activeTab === "catalogue"} onClick={() => { setActiveTab("catalogue"); setSidebarOpen(false); }} />
              <SidebarItem icon={Tag} label="Catégories" active={activeTab === "categories"} onClick={() => { setActiveTab("categories"); setSidebarOpen(false); }} />
              <SidebarItem icon={Image} label="Galerie" active={activeTab === "galerie"} onClick={() => { setActiveTab("galerie"); setSidebarOpen(false); }} />
              <SidebarItem icon={Star} label="Avis clients" active={activeTab === "avis"} onClick={() => { setActiveTab("avis"); setSidebarOpen(false); }} />
              <SidebarItem icon={BookOpen} label="Blog" active={activeTab === "blog"} onClick={() => { setActiveTab("blog"); setSidebarOpen(false); }} />
              <SidebarItem icon={Calendar} label="Réservations" active={activeTab === "reservations"} onClick={() => { setActiveTab("reservations"); setSidebarOpen(false); }} />
              <SidebarItem icon={FileText} label="Demandes de devis" active={activeTab === "devis"} onClick={() => { setActiveTab("devis"); setSidebarOpen(false); }} />
              <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === "messages"} onClick={() => { setActiveTab("messages"); setSidebarOpen(false); }} badge={unreadMessages > 0 ? unreadMessages : undefined} />
              <SidebarItem icon={MailPlus} label="Newsletter" active={activeTab === "newsletter"} onClick={() => { setActiveTab("newsletter"); setSidebarOpen(false); }} />
            </nav>
            <div className="p-4 border-t border-zinc-800">
              <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white"><LogOut className="h-4 w-4" /> Déconnexion</button>
            </div>
          </aside>
        </div>
      )}

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 text-white flex items-center justify-between px-4 z-40">
        <h1 className="font-display text-xl">ÉclatEvents</h1>
        <button onClick={() => setSidebarOpen(true)}><Menu /></button>
      </div>

      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 w-full overflow-x-hidden">
        {activeTab === "dashboard" && <DashboardView setActiveTab={setActiveTab} />}
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
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-3 text-sm rounded transition-colors ${active ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}>
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      {badge !== undefined && (
        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </button>
  );
}

function DashboardView({ setActiveTab }: { setActiveTab: (tab: any) => void }) {
  const [stats, setStats] = useState({ devis: 0, messages: 0, total: 0, nouveaux: 0, acceptes: 0 });
  const [recentDevis, setRecentDevis] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: devisData } = await (supabase as any).from("quote_requests").select("*").order("created_at", { ascending: false });
      const { data: msgData } = await (supabase as any).from("contact_messages").select("*");
      
      const devis = devisData || [];
      const messages = msgData || [];

      setStats({
        devis: devis.length,
        messages: messages.length,
        total: devis.reduce((sum: number, d: any) => sum + Number(d.estimated_total || 0), 0),
        nouveaux: devis.filter((d: any) => d.status === "nouveau").length,
        acceptes: devis.filter((d: any) => d.status === "accepte").length,
      });
      setRecentDevis(devis.slice(0, 5));

      const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
      const last6Months: any[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        last6Months.push({ month: months[d.getMonth()], year: d.getFullYear(), count: 0 });
      }
      
      devis.forEach((d: any) => {
        const date = new Date(d.created_at);
        const monthLabel = months[date.getMonth()];
        const monthData = last6Months.find(m => m.month === monthLabel);
        if (monthData) monthData.count++;
      });

      setChartData(last6Months);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-zinc-900 mb-2">Vue d'ensemble</h1>
        <p className="text-zinc-500">Bienvenue sur votre tableau de bord.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Demandes de devis" value={stats.devis} icon={FileText} subtitle={`${stats.nouveaux} nouvelles`} color="blue" />
        <StatCard title="Messages reçus" value={stats.messages} icon={MessageSquare} subtitle="Boîte de réception" color="purple" />
        <StatCard title="Chiffre d'affaires" value={formatPrice(stats.total)} icon={TrendingUp} subtitle="Total estimé" color="green" />
        <StatCard title="Devis acceptés" value={stats.acceptes} icon={CheckCircle} subtitle="Clients validés" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-sm shadow-sm p-6">
          <h2 className="font-display text-xl text-zinc-900 mb-6">Demandes par mois</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#D4AF37" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#D4AF37' : '#e4e4e7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border rounded-sm shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl text-zinc-900">Dernières demandes</h2>
            <button onClick={() => setActiveTab("devis")} className="text-sm text-primary hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-4">
            {recentDevis.map((d) => (
              <div key={d.id} className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 font-bold text-sm">
                    {d.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-zinc-900">{d.full_name}</p>
                    <p className="text-xs text-zinc-500">{new Date(d.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-zinc-900">{formatPrice(d.estimated_total)}</p>
                  <StatusBadge status={d.status} />
                </div>
              </div>
            ))}
            {recentDevis.length === 0 && <p className="text-center text-zinc-500 py-4 text-sm">Aucune demande.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, subtitle, color }: { title: string, value: string | number, icon: any, subtitle: string, color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white p-6 border rounded-sm shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm text-zinc-500 mb-1">{title}</p>
        <p className="text-2xl font-display font-semibold text-zinc-900">{value}</p>
        <p className="text-xs text-zinc-400 mt-1">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-full ${colors[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    nouveau: "bg-blue-100 text-blue-800",
    en_cours: "bg-yellow-100 text-yellow-800",
    devis_envoye: "bg-purple-100 text-purple-800",
    accepte: "bg-green-100 text-green-800",
    refuse: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${styles[status] || "bg-gray-100"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

// --- GESTION DU CATALOGUE ---
function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Erreur de lecture :", error);
      alert("Erreur de lecture : " + error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    await (supabase as any).from("products").delete().eq("id", id);
    fetchProducts();
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Catalogue</h1>
          <p className="text-zinc-500 text-sm mt-1">{products.length} produit(s) au total</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border rounded focus:outline-none focus:border-primary bg-white" />
          </div>
          <button onClick={() => { setEditingProduct(null); setShowForm(true); }} className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap">
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Produit</th>
              <th className="px-6 py-4 font-medium">Catégorie</th>
              <th className="px-6 py-4 font-medium">Prix</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="h-10 w-10 object-cover rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-zinc-100 rounded flex items-center justify-center text-zinc-400"><ImageIcon className="h-4 w-4" /></div>
                  )}
                  <span className="font-medium text-zinc-900">{p.name}</span>
                </td>
                <td className="px-6 py-4 text-zinc-600 uppercase text-xs font-semibold">{p.category_slug || "-"}</td>
                <td className="px-6 py-4 font-semibold text-zinc-900">{formatPrice(p.price)}</td>
                <td className="px-6 py-4">
                  {p.stock > 0 ? (
                    <span className="text-green-600 font-medium">{p.stock} en stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Rupture</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingProduct(p); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Aucun produit trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm 
          product={editingProduct} 
          onClose={() => setShowForm(false)} 
          onSave={() => { setShowForm(false); fetchProducts(); }} 
        />
      )}
    </div>
  );
}

function ProductForm({ product, onClose, onSave }: { product: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    price: product?.price || 0,
    stock: product?.stock || 10,
    category_slug: product?.category_slug || "mobilier",
    description: product?.description || "",
    image_url: product?.image_url || "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error) { alert("Erreur lors de l'upload de l'image."); setUploading(false); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    setForm({ ...form, image_url: data.publicUrl });
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: catData, error: catError } = await (supabase as any)
        .from("categories")
        .select("id")
        .eq("slug", form.category_slug)
        .maybeSingle();

      if (catError || !catData) {
        alert("Erreur : Catégorie introuvable.");
        setSaving(false);
        return;
      }

      let baseSlug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      let finalSlug = baseSlug;
      
      const { data: existing } = await (supabase as any).from("products").select("id").eq("slug", finalSlug).maybeSingle();
      if (existing && (!product || product.id !== existing.id)) {
        finalSlug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;
      }

      const payload = {
        name: form.name,
        slug: finalSlug,
        price: Number(form.price),
        stock: Number(form.stock),
        category_id: catData.id,
        description: form.description,
        image_url: form.image_url,
      };

      let error;
      if (product) {
        const { error: updateError } = await (supabase as any).from("products").update(payload).eq("id", product.id);
        error = updateError;
      } else {
        const { error: insertError } = await (supabase as any).from("products").insert(payload);
        error = insertError;
      }

      if (error) {
        console.error(error);
        alert("Erreur lors de l'enregistrement : " + error.message);
      } else {
        onSave();
      }
    } catch (err: any) {
      console.error(err);
      alert("Une erreur inattendue est survenue : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="font-display text-2xl text-zinc-900">{product ? "Modifier le produit" : "Ajouter un produit"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900"><X className="h-5 w-5" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Nom du produit</label>
              <input required name="name" value={form.name} onChange={handleChange} className={field} placeholder="Ex: Chaise Chiavari" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Prix (MAD)</label>
              <input required type="number" name="price" value={form.price} onChange={handleChange} className={field} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Catégorie</label>
              <select name="category_slug" value={form.category_slug} onChange={handleChange} className={field}>
                <option value="mobilier">Mobilier</option>
                <option value="tentes">Tentes & Chapiteaux</option>
                <option value="son-lumiere">Son & Lumière</option>
                <option value="art-de-table">Art de la table</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Stock disponible</label>
              <input required type="number" name="stock" value={form.stock} onChange={handleChange} className={field} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Description</label>
            <textarea required name="description" value={form.description} onChange={handleChange} rows={3} className={field} placeholder="Description du produit..." />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Image</label>
            <div className="flex items-center gap-4">
              {form.image_url && <img src={form.image_url} alt="Aperçu" className="h-16 w-16 object-cover rounded border" />}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
              {uploading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded">Annuler</button>
            <button type="submit" disabled={saving} className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- GESTION DES CATÉGORIES ---
function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("categories").select("*").order("sort_order", { ascending: true });
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette catégorie ? Attention, les produits liés pourraient être affectés.")) return;
    await (supabase as any).from("categories").delete().eq("id", id);
    fetchCategories();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Catégories</h1>
          <p className="text-zinc-500 text-sm mt-1">{categories.length} catégorie(s)</p>
        </div>
        <button onClick={() => { setEditingCategory(null); setShowForm(true); }} className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap">
          <Plus className="h-4 w-4" /> Ajouter une catégorie
        </button>
      </div>

      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Nom</th>
              <th className="px-6 py-4 font-medium">Slug (URL)</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">{c.name}</td>
                <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{c.slug}</td>
                <td className="px-6 py-4 text-zinc-600 text-sm">{c.description || "-"}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingCategory(c); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => deleteCategory(c.id)} className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500">Aucune catégorie trouvée.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CategoryForm 
          category={editingCategory} 
          onClose={() => setShowForm(false)} 
          onSave={() => { setShowForm(false); fetchCategories(); }} 
        />
      )}
    </div>
  );
}

function CategoryForm({ category, onClose, onSave }: { category: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    sort_order: category?.sort_order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: form.description,
      sort_order: Number(form.sort_order),
    };

    let error;
    if (category) {
      const { error: updateError } = await (supabase as any).from("categories").update(payload).eq("id", category.id);
      error = updateError;
    } else {
      const { error: insertError } = await (supabase as any).from("categories").insert(payload);
      error = insertError;
    }

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      onSave();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-display text-xl text-zinc-900">{category ? "Modifier la catégorie" : "Nouvelle catégorie"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Nom de la catégorie</label>
            <input required name="name" value={form.name} onChange={handleChange} className={field} placeholder="Ex: Décoration" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Description (optionnel)</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className={field} />
          </div>
          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded">Annuler</button>
            <button type="submit" disabled={saving} className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- GESTION DE LA GALERIE ---
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

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from("gallery-images").upload(fileName, file);
      
      if (!uploadError) {
        const { data } = supabase.storage.from("gallery-images").getPublicUrl(fileName);
        await (supabase as any).from("gallery").insert({
          title: file.name,
          image_url: data.publicUrl,
        });
      }
    }

    setUploading(false);
    fetchPhotos();
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette photo ?")) return;
    await (supabase as any).from("gallery").delete().eq("id", id);
    fetchPhotos();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Galerie</h1>
          <p className="text-zinc-500 text-sm mt-1">{photos.length} photo(s)</p>
        </div>
        <label className={`bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded flex items-center gap-2 cursor-pointer hover:bg-primary/90 transition-colors ${uploading ? 'opacity-50' : ''}`}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {uploading ? "Upload en cours..." : "Ajouter des photos"}
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.map((p) => (
          <div key={p.id} className="group relative aspect-square bg-zinc-100 rounded overflow-hidden">
            <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => deletePhoto(p.id)} 
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500 bg-white border rounded-sm">
            Aucune photo pour le moment. Cliquez sur "Ajouter des photos" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}

// --- GESTION DES TÉMOIGNAGES ---
function TestimonialsList() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const toggleApproved = async (id: string, approved: boolean) => {
    setTestimonials((prev) => prev.map(t => t.id === id ? { ...t, approved } : t));
    await (supabase as any).from("testimonials").update({ approved }).eq("id", id);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet avis ?")) return;
    await (supabase as any).from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Avis clients</h1>
          <p className="text-zinc-500 text-sm mt-1">{testimonials.length} avis au total</p>
        </div>
        <button onClick={() => { setEditingTestimonial(null); setShowForm(true); }} className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap">
          <Plus className="h-4 w-4" /> Ajouter un avis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white border rounded-sm shadow-sm p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-zinc-900">{t.name}</p>
                {t.role && <p className="text-xs text-zinc-500">{t.role}</p>}
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-zinc-600 italic mb-4">"{t.content}"</p>
            <div className="flex justify-between items-center pt-4 border-t">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={t.approved} onChange={(e) => toggleApproved(t.id, e.target.checked)} className="rounded" />
                <span className={t.approved ? "text-green-600 font-medium" : "text-zinc-500"}>
                  {t.approved ? "Publié" : "En attente"}
                </span>
              </label>
              <div className="flex gap-2">
                <button onClick={() => { setEditingTestimonial(t); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"><Edit className="h-4 w-4" /></button>
                <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500 bg-white border rounded-sm">Aucun avis pour le moment.</div>
        )}
      </div>

      {showForm && (
        <TestimonialForm 
          testimonial={editingTestimonial} 
          onClose={() => setShowForm(false)} 
          onSave={() => { setShowForm(false); fetchTestimonials(); }} 
        />
      )}
    </div>
  );
}

function TestimonialForm({ testimonial, onClose, onSave }: { testimonial: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
    approved: testimonial?.approved || false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let error;
    if (testimonial) {
      const { error: updateError } = await (supabase as any).from("testimonials").update(form).eq("id", testimonial.id);
      error = updateError;
    } else {
      const { error: insertError } = await (supabase as any).from("testimonials").insert(form);
      error = insertError;
    }

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      onSave();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-display text-xl text-zinc-900">{testimonial ? "Modifier l'avis" : "Nouvel avis"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Nom du client</label>
            <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className={field} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Rôle / Événement (optionnel)</label>
            <input value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className={field} placeholder="Ex: Mariage à Casablanca" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Avis</label>
            <textarea required value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} rows={3} className={field} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Note (1 à 5)</label>
            <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({...form, rating: Number(e.target.value)})} className={field} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.approved} onChange={(e) => setForm({...form, approved: e.target.checked})} id="approved" />
            <label htmlFor="approved" className="text-sm">Publier sur le site immédiatement</label>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded">Annuler</button>
            <button type="submit" disabled={saving} className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50">
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- GESTION DU BLOG ---
function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await (supabase as any).from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
    await (supabase as any).from("posts").delete().eq("id", id);
    fetchPosts();
  };

  const togglePublished = async (id: string, published: boolean) => {
    setPosts((prev) => prev.map(p => p.id === id ? { ...p, published } : p));
    await (supabase as any).from("posts").update({ published }).eq("id", id);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Blog</h1>
          <p className="text-zinc-500 text-sm mt-1">{posts.length} article(s)</p>
        </div>
        <button onClick={() => { setEditingPost(null); setShowForm(true); }} className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap">
          <Plus className="h-4 w-4" /> Nouvel article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <div key={p.id} className="bg-white border rounded-sm shadow-sm overflow-hidden flex flex-col">
            {p.cover_image && <img src={p.cover_image} alt={p.title} className="w-full h-40 object-cover" />}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl text-zinc-900 mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-500 flex-1 mb-4">{p.excerpt || p.content.slice(0, 100) + "..."}</p>
              <div className="flex justify-between items-center pt-4 border-t">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input type="checkbox" checked={p.published} onChange={(e) => togglePublished(p.id, e.target.checked)} className="rounded" />
                  <span className={p.published ? "text-green-600 font-medium" : "text-zinc-500"}>
                    {p.published ? "Publié" : "Brouillon"}
                  </span>
                </label>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingPost(p); setShowForm(true); }} className="p-1.5 text-zinc-400 hover:text-blue-600 transition-colors"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => deletePost(p.id)} className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500 bg-white border rounded-sm">Aucun article pour le moment.</div>
        )}
      </div>

      {showForm && (
        <ArticleForm 
          post={editingPost} 
          onClose={() => setShowForm(false)} 
          onSave={() => { setShowForm(false); fetchPosts(); }} 
        />
      )}
    </div>
  );
}

function ArticleForm({ post, onClose, onSave }: { post: any, onClose: () => void, onSave: () => void }) {
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    cover_image: post?.cover_image || "",
    published: post?.published || false,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
    if (error) { alert("Erreur lors de l'upload de l'image."); setUploading(false); return; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
    setForm({ ...form, cover_image: data.publicUrl });
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image,
      published: form.published,
    };

    let error;
    if (post) {
      const { error: updateError } = await (supabase as any).from("posts").update(payload).eq("id", post.id);
      error = updateError;
    } else {
      const { error: insertError } = await (supabase as any).from("posts").insert(payload);
      error = insertError;
    }

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      onSave();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="font-display text-xl text-zinc-900">{post ? "Modifier l'article" : "Nouvel article"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Titre</label>
            <input required name="title" value={form.title} onChange={handleChange} className={field} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Extrait (résumé)</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className={field} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Contenu</label>
            <textarea required name="content" value={form.content} onChange={handleChange} rows={8} className={field} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1 block">Image de couverture</label>
            <div className="flex items-center gap-4">
              {form.cover_image && <img src={form.cover_image} alt="Aperçu" className="h-16 w-16 object-cover rounded border" />}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
              {uploading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} id="published" />
            <label htmlFor="published" className="text-sm">Publier immédiatement</label>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded">Annuler</button>
            <button type="submit" disabled={saving} className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50">
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- GESTION DE LA NEWSLETTER ---
function NewsletterList() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any).from("newsletter").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setSubscribers(data || []);
      setLoading(false);
    });
  }, []);

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Supprimer cet abonné ?")) return;
    await (supabase as any).from("newsletter").delete().eq("id", id);
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const exportCSV = () => {
    const headers = ["Email", "Date d'inscription", "Actif"];
    const rows = subscribers.map(s => [s.email, new Date(s.created_at).toLocaleDateString("fr-FR"), s.active ? "Oui" : "Non"]);
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "newsletter.csv";
    link.click();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Newsletter</h1>
          <p className="text-zinc-500 text-sm mt-1">{subscribers.length} abonné(s)</p>
        </div>
        <button onClick={exportCSV} className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded flex items-center gap-2 hover:bg-primary/90">
          <Download className="h-4 w-4" /> Exporter CSV
        </button>
      </div>

      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Date d'inscription</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium text-zinc-900">{s.email}</td>
                <td className="px-6 py-4 text-zinc-600">{new Date(s.created_at).toLocaleDateString("fr-FR")}</td>
                <td className="px-6 py-4">
                  <span className={s.active ? "text-green-600" : "text-zinc-400"}>
                    {s.active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => deleteSubscriber(s.id)} className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-zinc-500">Aucun abonné pour le moment.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- GESTION DES RÉSERVATIONS ---
function BookingsList() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("bookings")
      .select("*, products(name)")
      .order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setBookings((prev) => prev.map(b => b.id === id ? { ...b, status } : b));
    await (supabase as any).from("bookings").update({ status }).eq("id", id);
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    await (supabase as any).from("bookings").delete().eq("id", id);
    fetchBookings();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-zinc-900">Réservations</h1>
        <p className="text-zinc-500 text-sm mt-1">{bookings.length} réservation(s)</p>
      </div>

      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Produit</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Période</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium text-zinc-900">{b.products?.name || "-"}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-zinc-900">{b.client_name}</p>
                  <p className="text-zinc-500 text-xs">{b.client_email}</p>
                  <p className="text-zinc-500 text-xs">{b.client_phone}</p>
                </td>
                <td className="px-6 py-4 text-zinc-600">
                  Du {new Date(b.start_date).toLocaleDateString("fr-FR")}<br />
                  Au {new Date(b.end_date).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={b.status} 
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className={`text-xs font-semibold uppercase tracking-wider border p-1.5 rounded cursor-pointer ${
                      b.status === 'en_attente' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                      b.status === 'confirme' ? 'bg-green-50 text-green-800 border-green-200' : 
                      'bg-red-50 text-red-800 border-red-200'
                    }`}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="confirme">Confirmé</option>
                    <option value="annule">Annulé</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => deleteBooking(b.id)} className="p-2 text-zinc-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Aucune réservation pour le moment.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- LISTE DES DEVIS ---
function DevisList() {
  const [devis, setDevis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDevis, setSelectedDevis] = useState<any>(null);

  useEffect(() => {
    (supabase as any).from("quote_requests").select("*").order("created_at", { ascending: false }).then(({ data }: any) => {
      setDevis(data || []);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setDevis((prev) => prev.map(d => d.id === id ? { ...d, status } : d));
    if (selectedDevis && selectedDevis.id === id) setSelectedDevis({ ...selectedDevis, status });
    await (supabase as any).from("quote_requests").update({ status }).eq("id", id);
  };

  const deleteDevis = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette demande de devis ? Cette action est irréversible.")) return;
    setDevis((prev) => prev.filter(d => d.id !== id));
    if (selectedDevis && selectedDevis.id === id) setSelectedDevis(null);
    await (supabase as any).from("quote_requests").delete().eq("id", id);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const filtered = devis.filter(d => 
    d.full_name.toLowerCase().includes(search.toLowerCase()) || 
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    (d.city && d.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl text-zinc-900">Demandes de devis</h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-zinc-500 text-sm">{devis.length} demande(s) au total</p>
            <button 
              onClick={() => {
                const headers = ["Nom", "Email", "Téléphone", "Ville", "Date événement", "Type", "Total (MAD)", "Statut", "Date création"];
                const rows = devis.map(d => [
                  d.full_name, d.email, d.phone, d.city || "", d.event_date || "", d.event_type || "", 
                  d.estimated_total, d.status, new Date(d.created_at).toLocaleDateString("fr-FR")
                ]);
                const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "devis_eclat_events.csv");
                document.body.appendChild(link);
                link.click();
              }} 
              className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded flex items-center gap-1 transition-colors"
            >
              <Download className="h-3 w-3" /> Exporter CSV
            </button>
          </div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input type="text" placeholder="Rechercher un client, email, ville..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border rounded focus:outline-none focus:border-primary bg-white" />
        </div>
      </div>

      <div className="bg-white border rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Date événement</th>
              <th className="px-6 py-4 font-medium">Total estimé</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-zinc-900">{d.full_name}</p>
                  <p className="text-zinc-500 text-xs">{d.email}</p>
                </td>
                <td className="px-6 py-4 text-zinc-600 hidden md:table-cell">{d.event_date || "-"}</td>
                <td className="px-6 py-4 font-semibold text-zinc-900">{formatPrice(d.estimated_total)}</td>
                <td className="px-6 py-4">
                  <select 
                    value={d.status} 
                    onChange={(e) => updateStatus(d.id, e.target.value)}
                    className={`text-xs font-semibold uppercase tracking-wider border p-1.5 rounded cursor-pointer ${
                      d.status === 'nouveau' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                      d.status === 'en_cours' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                      d.status === 'devis_envoye' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                      d.status === 'accepte' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
                    }`}
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="devis_envoye">Devis envoyé</option>
                    <option value="accepte">Accepté</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedDevis(d)} className="p-2 text-zinc-400 hover:text-primary transition-colors" title="Voir détails"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => deleteDevis(d.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors" title="Supprimer"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-zinc-500">Aucun devis trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedDevis && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDevis(null)}>
          <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="font-display text-2xl text-zinc-900">Détails du devis</h2>
              <button onClick={() => setSelectedDevis(null)} className="text-zinc-400 hover:text-zinc-900"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded border">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Client</p>
                  <p className="font-medium text-zinc-900">{selectedDevis.full_name}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Téléphone</p>
                  <p className="font-medium text-zinc-900">{selectedDevis.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-medium text-zinc-900">{selectedDevis.email}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Ville</p>
                  <p className="font-medium text-zinc-900">{selectedDevis.city || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Date de l'événement</p>
                  <p className="font-medium text-zinc-900">{selectedDevis.event_date || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Type d'événement</p>
                  <p className="font-medium text-zinc-900">{selectedDevis.event_type || "-"}</p>
                </div>
              </div>

              {selectedDevis.message && (
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Message du client</p>
                  <div className="bg-zinc-50 p-4 border-l-2 border-primary italic text-zinc-600 text-sm">"{selectedDevis.message}"</div>
                </div>
              )}

              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Articles demandés</p>
                <div className="border rounded divide-y">
                  {Array.isArray(selectedDevis.items) && selectedDevis.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-3 text-sm">
                      <span className="text-zinc-700">{item.name} <span className="text-zinc-400 ml-1">x{item.qty}</span></span>
                      <span className="font-medium text-zinc-900">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold text-zinc-900 uppercase tracking-wider">Total estimé</span>
                <span className="font-display text-3xl font-bold text-primary">{formatPrice(selectedDevis.estimated_total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- LISTE DES MESSAGES ---
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
    setMessages((prev) => prev.map(m => m.id === id ? { ...m, status: "lu" } : m));
    await (supabase as any).from("contact_messages").update({ status: "lu" }).eq("id", id);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Voulez-vous supprimer ce message ?")) return;
    setMessages((prev) => prev.filter(m => m.id !== id));
    await (supabase as any).from("contact_messages").delete().eq("id", id);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-zinc-900">Boîte de réception</h1>
        <p className="text-zinc-500 text-sm mt-1">{messages.length} message(s)</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {messages.map((m) => (
          <div key={m.id} className={`bg-white border rounded-sm shadow-sm p-6 transition-all ${m.status === "nouveau" ? "border-l-4 border-l-primary" : ""}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <h3 className="font-display text-xl text-zinc-900 flex items-center gap-2">
                  {m.name} 
                  {m.status === "nouveau" && <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-sans font-bold">Nouveau</span>}
                </h3>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mt-2">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {m.email}</span>
                  {m.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {m.phone}</span>}
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {m.status === "nouveau" ? (
                  <button onClick={() => markAsRead(m.id)} className="flex items-center gap-1 text-xs bg-zinc-900 text-white px-3 py-1.5 rounded hover:bg-zinc-800 transition whitespace-nowrap">
                    <CheckCircle className="h-3 w-3" /> Marquer lu
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded whitespace-nowrap">
                    <CheckCircle className="h-3 w-3" /> Lu
                  </span>
                )}
                <button onClick={() => deleteMessage(m.id)} className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors rounded hover:bg-red-50" title="Supprimer">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm mt-4 text-zinc-700 whitespace-pre-wrap bg-zinc-50 p-4 rounded border-l-2 border-zinc-200">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <div className="text-center py-12 text-zinc-500 bg-white border rounded-sm">Aucun message pour le moment.</div>}
      </div>
    </div>
  );
}