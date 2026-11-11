import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { B as ArrowRight, E as FileText, F as ChevronLeft, N as CircleCheckBig, O as Eye, P as ChevronRight, R as Calendar, S as LayoutDashboard, a as Trash2, b as LogOut, c as SquarePen, d as Plus, f as Phone, g as Menu, i as TriangleAlert, j as Clock, k as Download, m as MessageSquare, o as Tag, p as Package, s as Star, t as X, u as Search, v as Mail, w as Image, x as LoaderCircle, y as MailPlus, z as BookOpen } from "../_libs/lucide-react.mjs";
import { n as formatPrice } from "./catalog-BvPKNVVF.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CruCtuFI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full border bg-card px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors";
function AdminPage() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loadingAuth, setLoadingAuth] = (0, import_react.useState)(true);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [authError, setAuthError] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("dashboard");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [unreadMessages, setUnreadMessages] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoadingAuth(false);
		});
		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});
		return () => authListener.subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		if (user) supabase.from("contact_messages").select("id", {
			count: "exact",
			head: true
		}).eq("status", "nouveau").then(({ count }) => {
			setUnreadMessages(count || 0);
		});
	}, [user, activeTab]);
	const handleLogin = async (e) => {
		e.preventDefault();
		setAuthError("");
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) setAuthError("Identifiants incorrects.");
	};
	const handleLogout = async () => {
		await supabase.auth.signOut();
	};
	if (loadingAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center items-center min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-zinc-950 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-white p-10 shadow-2xl rounded-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl text-foreground mb-2",
					children: "ÉclatEvents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground uppercase tracking-widest",
					children: "Espace Administrateur"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleLogin,
				className: "space-y-4",
				children: [
					authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-red-50 text-red-700 p-3 text-sm border border-red-200 text-center",
						children: authError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "votre@email.com",
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block",
						children: "Mot de passe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "••••••••",
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "w-full bg-zinc-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors mt-6 font-medium",
						children: "Se connecter"
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden md:flex flex-col w-64 bg-[#111111] text-zinc-300 h-screen fixed left-0 top-0 z-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-zinc-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-2xl text-white",
							children: ["Éclat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#D4AF37]",
								children: "Events"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-zinc-500 mt-1 uppercase tracking-widest",
							children: "Administration"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 py-6 space-y-1 px-3 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: LayoutDashboard,
								label: "Vue d'ensemble",
								active: activeTab === "dashboard",
								onClick: () => setActiveTab("dashboard")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: FileText,
								label: "Demandes de devis",
								active: activeTab === "devis",
								onClick: () => setActiveTab("devis")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Calendar,
								label: "Planning",
								active: activeTab === "planning",
								onClick: () => setActiveTab("planning")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: MessageSquare,
								label: "Messages",
								active: activeTab === "messages",
								onClick: () => setActiveTab("messages"),
								badge: unreadMessages > 0 ? unreadMessages : void 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Package,
								label: "Catalogue",
								active: activeTab === "catalogue",
								onClick: () => setActiveTab("catalogue")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Tag,
								label: "Catégories",
								active: activeTab === "categories",
								onClick: () => setActiveTab("categories")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Image,
								label: "Galerie",
								active: activeTab === "galerie",
								onClick: () => setActiveTab("galerie")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Star,
								label: "Avis clients",
								active: activeTab === "avis",
								onClick: () => setActiveTab("avis")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: BookOpen,
								label: "Blog",
								active: activeTab === "blog",
								onClick: () => setActiveTab("blog")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Calendar,
								label: "Réservations",
								active: activeTab === "reservations",
								onClick: () => setActiveTab("reservations")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: MailPlus,
								label: "Newsletter",
								active: activeTab === "newsletter",
								onClick: () => setActiveTab("newsletter")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-t border-zinc-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-3 py-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-500",
								children: "Administrateur"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white truncate",
								children: user.email
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "flex items-center gap-3 w-full px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Déconnexion"]
						})]
					})
				]
			}),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden fixed inset-0 z-50 bg-black/50",
				onClick: () => setSidebarOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "w-64 bg-[#111111] text-zinc-300 h-full flex flex-col",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-zinc-800 flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-2xl text-white",
							children: ["Éclat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#D4AF37]",
								children: "Events"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex-1 py-6 space-y-1 px-3 overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: LayoutDashboard,
								label: "Vue d'ensemble",
								active: activeTab === "dashboard",
								onClick: () => {
									setActiveTab("dashboard");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: FileText,
								label: "Demandes de devis",
								active: activeTab === "devis",
								onClick: () => {
									setActiveTab("devis");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Calendar,
								label: "Planning",
								active: activeTab === "planning",
								onClick: () => {
									setActiveTab("planning");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: MessageSquare,
								label: "Messages",
								active: activeTab === "messages",
								onClick: () => {
									setActiveTab("messages");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Package,
								label: "Catalogue",
								active: activeTab === "catalogue",
								onClick: () => {
									setActiveTab("catalogue");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Tag,
								label: "Catégories",
								active: activeTab === "categories",
								onClick: () => {
									setActiveTab("categories");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Image,
								label: "Galerie",
								active: activeTab === "galerie",
								onClick: () => {
									setActiveTab("galerie");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Star,
								label: "Avis clients",
								active: activeTab === "avis",
								onClick: () => {
									setActiveTab("avis");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: BookOpen,
								label: "Blog",
								active: activeTab === "blog",
								onClick: () => {
									setActiveTab("blog");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: Calendar,
								label: "Réservations",
								active: activeTab === "reservations",
								onClick: () => {
									setActiveTab("reservations");
									setSidebarOpen(false);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
								icon: MailPlus,
								label: "Newsletter",
								active: activeTab === "newsletter",
								onClick: () => {
									setActiveTab("newsletter");
									setSidebarOpen(false);
								}
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:hidden fixed top-0 left-0 right-0 h-16 bg-[#111111] text-white flex items-center justify-between px-4 z-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-xl",
					children: ["Éclat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[#D4AF37]",
						children: "Events"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSidebarOpen(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 w-full overflow-x-hidden",
				children: [
					activeTab === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaisonView, { setActiveTab }),
					activeTab === "planning" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanningView, {}),
					activeTab === "catalogue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductList, {}),
					activeTab === "categories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryList, {}),
					activeTab === "galerie" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryList, {}),
					activeTab === "avis" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsList, {}),
					activeTab === "blog" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogList, {}),
					activeTab === "reservations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingsList, {}),
					activeTab === "devis" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevisList, {}),
					activeTab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesList, {}),
					activeTab === "newsletter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterList, {})
				]
			})
		]
	});
}
function SidebarItem({ icon: Icon, label, active, onClick, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `w-full flex items-center justify-between px-3 py-3 text-sm rounded transition-colors ${active ? "bg-[#222] text-white font-medium border-l-2 border-[#D4AF37]" : "text-zinc-400 hover:bg-[#222] hover:text-white"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
		}), badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full",
			children: badge
		})]
	});
}
function MaisonView({ setActiveTab }) {
	const [stats, setStats] = (0, import_react.useState)({
		devis: 0,
		messages: 0,
		total: 0,
		nouveaux: 0,
		acceptes: 0,
		enAttente: 0,
		sansReponse24h: 0,
		prochainsEvenements: [],
		entonnoir: {
			nouveau: 0,
			en_cours: 0,
			devis_envoye: 0,
			accepte: 0
		}
	});
	const [recentDevis, setRecentDevis] = (0, import_react.useState)([]);
	const [chartData, setChartData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchStats = async () => {
			const { data: devisData } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
			const { data: msgData } = await supabase.from("contact_messages").select("*");
			const devis = devisData || [];
			const messages = msgData || [];
			const total = devis.reduce((sum, d) => sum + Number(d.estimated_total || 0), 0);
			const acceptes = devis.filter((d) => d.status === "accepte");
			const enAttente = devis.filter((d) => d.status !== "accepte" && d.status !== "refuse");
			const sansReponse24h = enAttente.filter((d) => Date.now() - new Date(d.created_at).getTime() > 864e5);
			const entonnoir = {
				nouveau: devis.filter((d) => d.status === "nouveau").length,
				en_cours: devis.filter((d) => d.status === "en_cours").length,
				devis_envoye: devis.filter((d) => d.status === "devis_envoye").length,
				accepte: acceptes.length
			};
			const prochains = devis.filter((d) => d.event_date && new Date(d.event_date) >= /* @__PURE__ */ new Date()).sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()).slice(0, 5);
			setStats({
				devis: devis.length,
				messages: messages.length,
				total,
				nouveaux: entonnoir.nouveau,
				acceptes: acceptes.length,
				enAttente: enAttente.length,
				sansReponse24h: sansReponse24h.length,
				prochainsEvenements: prochains,
				entonnoir
			});
			setRecentDevis(devis.slice(0, 5));
			const months = [
				"Jan",
				"Fév",
				"Mar",
				"Avr",
				"Mai",
				"Juin",
				"Juil",
				"Août",
				"Sep",
				"Oct",
				"Nov",
				"Déc"
			];
			const last6Months = [];
			for (let i = 5; i >= 0; i--) {
				const d = /* @__PURE__ */ new Date();
				d.setMonth(d.getMonth() - i);
				last6Months.push({
					month: months[d.getMonth()],
					count: 0
				});
			}
			devis.forEach((d) => {
				const date = new Date(d.created_at);
				const monthLabel = months[date.getMonth()];
				const monthData = last6Months.find((m) => m.month === monthLabel);
				if (monthData) monthData.count++;
			});
			setChartData(last6Months);
			setLoading(false);
		};
		fetchStats();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-zinc-500 mb-2",
					children: "Samedi 7 novembre 2026"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl text-zinc-900",
					children: "Vue d'ensemble"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("devis"),
					className: "bg-[#D4AF37] text-black px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-[#c4a030]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nouveau devis"]
				})]
			}),
			stats.sansReponse24h > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#FDF8E4] border border-[#F0E2B6] p-4 rounded-sm flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-[#D4AF37]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-zinc-900",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [stats.sansReponse24h, " demandes attendent une réponse depuis plus de 24 h"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-zinc-500",
						children: "Le site promet un devis sous 24 h."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab("devis"),
					className: "text-xs bg-zinc-900 text-white px-3 py-1.5 rounded hover:bg-zinc-800",
					children: "Traiter maintenant"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 border rounded-sm shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-zinc-500 mb-1",
								children: "Demandes ce mois"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-4xl font-display text-zinc-900",
								children: stats.devis
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-green-600 mt-1",
								children: "+18 % vs octobre"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 border rounded-sm shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-zinc-500 mb-1",
								children: "CA confirmé"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-4xl font-display text-zinc-900",
								children: formatPrice(stats.total - stats.enAttente * 1e3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-green-600 mt-1",
								children: "+12 % 7 devis acceptés"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 border rounded-sm shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-zinc-500 mb-1",
								children: "CA en attente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-4xl font-display text-zinc-900",
								children: formatPrice(stats.enAttente * 1e3)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-500 mt-1",
								children: "5 devis envoyés, sans réponse"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-6 border rounded-sm shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-zinc-500 mb-1",
								children: "Taux de conversion"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-4xl font-display text-zinc-900",
								children: [stats.devis ? Math.round(stats.acceptes / stats.devis * 100) : 0, " %"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-green-600 mt-1",
								children: "+4 pts demande → accepté"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border rounded-sm shadow-sm p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-zinc-900 mb-6",
						children: "Chiffre d'affaires"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: chartData,
								margin: {
									top: 10,
									right: 10,
									left: -20,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										axisLine: false,
										tickLine: false,
										tick: {
											fontSize: 12,
											fill: "#71717a"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										axisLine: false,
										tickLine: false,
										tick: {
											fontSize: 12,
											fill: "#71717a"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { cursor: { fill: "#f4f4f5" } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "count",
										fill: "#D4AF37",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border rounded-sm shadow-sm p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-zinc-900 mb-6",
							children: "Entonnoir des devis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-zinc-500 mb-4",
							children: "Novembre — de la demande à l'acceptation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									label: "Demandes reçues",
									value: stats.devis
								},
								{
									label: "Contactées",
									value: stats.entonnoir.en_cours + stats.entonnoir.devis_envoye + stats.entonnoir.accepte
								},
								{
									label: "Devis envoyés",
									value: stats.entonnoir.devis_envoye + stats.entonnoir.accepte
								},
								{
									label: "Acceptées",
									value: stats.entonnoir.accepte
								}
							].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-zinc-600",
									children: step.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-zinc-900",
									children: step.value
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 bg-zinc-100 rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-[#D4AF37]",
									style: { width: `${stats.devis ? step.value / stats.devis * 100 : 0}%` }
								})
							})] }, step.label))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border rounded-sm shadow-sm p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl text-zinc-900",
							children: "Dernières demandes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("devis"),
							className: "text-sm text-[#D4AF37] hover:underline flex items-center gap-1",
							children: ["Voir tout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: recentDevis.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pb-4 border-b last:border-0 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-sm text-zinc-900",
								children: d.full_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-zinc-500",
								children: [
									d.event_type,
									" · ",
									d.city
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-sm text-zinc-900",
									children: formatPrice(d.estimated_total)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: d.status })]
							})]
						}, d.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border rounded-sm shadow-sm p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-zinc-900 mb-6",
						children: "Prochains événements"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: stats.prochainsEvenements.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 pb-3 border-b last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 bg-[#FDF8E4] rounded-full flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-[#D4AF37]",
										children: new Date(d.event_date).getDate()
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-zinc-900",
										children: d.full_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-zinc-500",
										children: [
											d.event_type,
											" · ",
											d.city
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: d.status })
							]
						}, d.id))
					})]
				})]
			})
		]
	});
}
function PlanningView() {
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [weekOffset, setWeekOffset] = (0, import_react.useState)(0);
	const [showNewBooking, setShowNewBooking] = (0, import_react.useState)(false);
	const [products, setProducts] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("bookings").select("*, products(name)").order("start_date", { ascending: true }).then(({ data }) => {
			setBookings(data || []);
			setLoading(false);
		});
		supabase.from("products").select("id, name, stock").eq("active", true).order("name").then(({ data }) => {
			setProducts(data || []);
		});
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	const startOfWeek = /* @__PURE__ */ new Date();
	startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1 + weekOffset * 7);
	startOfWeek.setHours(0, 0, 0, 0);
	const days = Array.from({ length: 7 }).map((_, i) => {
		const d = new Date(startOfWeek);
		d.setDate(startOfWeek.getDate() + i);
		return d;
	});
	const dayNames = [
		"LUN",
		"MAR",
		"MER",
		"JEU",
		"VEN",
		"SAM",
		"DIM"
	];
	const getBookingsForDay = (day) => bookings.filter((b) => {
		const start = /* @__PURE__ */ new Date(b.start_date + "T00:00:00");
		const end = /* @__PURE__ */ new Date(b.end_date + "T00:00:00");
		const d = new Date(day.getFullYear(), day.getMonth(), day.getDate());
		return d >= start && d <= end;
	});
	const conflicts = /* @__PURE__ */ new Set();
	days.forEach((day) => {
		const dayBookings = getBookingsForDay(day);
		const productCount = {};
		dayBookings.forEach((b) => {
			const pid = b.product_id;
			productCount[pid] = (productCount[pid] || 0) + 1;
			if (productCount[pid] > 1) conflicts.add(pid);
		});
	});
	const today = /* @__PURE__ */ new Date();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 bg-[#0A0A0A] -m-6 md:-m-10 p-6 md:p-10 min-h-screen text-zinc-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-zinc-500 mb-1",
					children: "Planning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl text-white",
					children: [
						startOfWeek.toLocaleDateString("fr-FR", { day: "numeric" }),
						" — ",
						days[6].toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
							year: "numeric"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setWeekOffset((w) => w - 1),
							className: "p-2 border border-zinc-700 rounded hover:bg-zinc-800",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setWeekOffset((w) => w + 1),
							className: "p-2 border border-zinc-700 rounded hover:bg-zinc-800",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-4 py-2 bg-zinc-800 rounded text-sm",
							children: "Semaine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowNewBooking(true),
							className: "px-4 py-2 bg-[#D4AF37] text-black rounded text-sm font-medium flex items-center gap-2 hover:bg-[#c4a030]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nouvelle réservation"]
						})
					]
				})]
			}),
			conflicts.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-red-950/30 border border-red-900/50 p-4 rounded-sm flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-red-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium text-white",
						children: [conflicts.size, " conflit de stock cette semaine"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-zinc-400",
						children: "Un même matériel est réservé plusieurs fois le même jour."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-xs border border-red-700 text-red-300 px-3 py-1.5 rounded hover:bg-red-950",
					children: "Proposer une alternative"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#141414] border border-zinc-800 p-5 rounded-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-display text-white",
							children: bookings.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-zinc-400",
							children: "réservations cette semaine"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#141414] border border-zinc-800 p-5 rounded-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-display text-[#D4AF37]",
							children: "62 %"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-zinc-400",
							children: "taux d'occupation du stock"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#141414] border border-zinc-800 p-5 rounded-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-display text-red-400",
							children: conflicts.size
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-zinc-400",
							children: "conflit(s) à résoudre"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#141414] border border-zinc-800 rounded-sm overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-zinc-800 flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-white",
							children: "Réservations de la semaine"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 bg-green-500 rounded-full" }), " Confirmé"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 bg-yellow-500 rounded-full" }), " Option"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 bg-red-500 rounded-full" }), " Conflit"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-8 border-b border-zinc-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-3 bg-[#1a1a1a] border-r border-zinc-800" }), days.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-3 text-center border-r border-zinc-800 last:border-r-0 ${day.toDateString() === today.toDateString() ? "bg-zinc-800" : "bg-[#1a1a1a]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-500",
								children: dayNames[i]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-lg font-display ${day.toDateString() === today.toDateString() ? "text-[#D4AF37] font-bold" : "text-white"}`,
								children: day.getDate()
							})]
						}, i))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-8 min-h-[400px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "p-3 bg-[#1a1a1a] border-r border-zinc-800" }), days.map((day, i) => {
							const dayBookings = getBookingsForDay(day);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 border-r border-zinc-800 last:border-r-0 space-y-2",
								children: dayBookings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-green-950/50 border-l-2 border-green-500 p-2 rounded-sm text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-white",
											children: b.products?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-zinc-400",
											children: b.client_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-zinc-500",
											children: [
												"Du ",
												new Date(b.start_date).toLocaleDateString("fr-FR"),
												" au ",
												new Date(b.end_date).toLocaleDateString("fr-FR")
											]
										})
									]
								}, b.id))
							}, i);
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#141414] border border-zinc-800 rounded-sm p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-white",
						children: "Disponibilité du matériel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-zinc-500",
						children: "Quantité réservée / stock total, par jour"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-zinc-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left p-2 text-zinc-400 font-medium",
								children: "PRODUIT"
							}), days.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "text-center p-2 text-zinc-400 font-medium",
								children: [
									dayNames[i],
									" ",
									day.getDate()
								]
							}, i))]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Array.from(new Set(bookings.map((b) => b.product_id))).map((pid) => {
							const product = bookings.find((b) => b.product_id === pid);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-zinc-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2 text-zinc-300",
									children: product?.products?.name || "-"
								}), days.map((day, i) => {
									const isBooked = bookings.some((b) => b.product_id === pid && day >= new Date(b.start_date) && day <= new Date(b.end_date));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2 text-center",
										children: isBooked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-green-500",
											children: "●"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-zinc-700",
											children: "-"
										})
									}, i);
								})]
							}, pid);
						}) })]
					})
				})]
			}),
			showNewBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewBookingModal, {
				products,
				onClose: () => setShowNewBooking(false),
				onSaved: () => {
					setShowNewBooking(false);
					supabase.from("bookings").select("*, products(name)").order("start_date", { ascending: true }).then(({ data }) => {
						setBookings(data || []);
					});
				}
			})
		]
	});
}
function NewBookingModal({ products, onClose, onSaved }) {
	const [form, setForm] = (0, import_react.useState)({
		productId: "",
		startDate: "",
		endDate: "",
		quantity: 1,
		clientName: "",
		clientEmail: "",
		clientPhone: "",
		status: "confirme"
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const selectedProduct = products.find((p) => p.id === form.productId);
	const handleSubmit = async (e) => {
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
		const { error: err } = await supabase.from("bookings").insert({
			product_id: form.productId,
			start_date: form.startDate,
			end_date: form.endDate,
			quantity: form.quantity,
			client_name: form.clientName,
			client_email: form.clientEmail,
			client_phone: form.clientPhone,
			status: form.status
		});
		setSaving(false);
		if (err) setError(err.message);
		else onSaved();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-[#141414] border border-zinc-800 rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b border-zinc-800 flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-white",
					children: "Nouvelle réservation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "text-zinc-400 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-6 space-y-4",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-red-950/50 text-red-300 p-3 text-sm border border-red-800",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
						children: "Produit *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						required: true,
						value: form.productId,
						onChange: (e) => setForm({
							...form,
							productId: e.target.value
						}),
						className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "-- Choisir un produit --"
						}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [
								p.name,
								" (stock: ",
								p.stock,
								")"
							]
						}, p.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
							children: "Début *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "date",
							value: form.startDate,
							onChange: (e) => setForm({
								...form,
								startDate: e.target.value
							}),
							className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
							children: "Fin *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "date",
							value: form.endDate,
							onChange: (e) => setForm({
								...form,
								endDate: e.target.value
							}),
							className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
						children: "Quantité"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: selectedProduct?.stock || 1,
						value: form.quantity,
						onChange: (e) => setForm({
							...form,
							quantity: Number(e.target.value)
						}),
						className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
						children: "Nom du client *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: form.clientName,
						onChange: (e) => setForm({
							...form,
							clientName: e.target.value
						}),
						className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
						children: "Email *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "email",
						value: form.clientEmail,
						onChange: (e) => setForm({
							...form,
							clientEmail: e.target.value
						}),
						className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
						children: "Téléphone *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "tel",
						value: form.clientPhone,
						onChange: (e) => setForm({
							...form,
							clientPhone: e.target.value
						}),
						className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block",
						children: "Statut"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.status,
						onChange: (e) => setForm({
							...form,
							status: e.target.value
						}),
						className: "w-full bg-[#0A0A0A] border border-zinc-700 text-zinc-200 px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "confirme",
							children: "Confirmé (apparaît dans le planning)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "en_attente",
							children: "En attente"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 border-t border-zinc-800 flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "px-4 py-2 text-sm text-zinc-400 hover:text-white",
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: saving,
							className: "bg-[#D4AF37] text-black px-6 py-2 text-sm font-medium rounded hover:bg-[#c4a030] disabled:opacity-50",
							children: saving ? "Enregistrement..." : "Créer la réservation"
						})]
					})
				]
			})]
		})
	});
}
function DevisList() {
	const [devis, setDevis] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [viewMode, setViewMode] = (0, import_react.useState)("list");
	(0, import_react.useEffect)(() => {
		supabase.from("quote_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => {
			setDevis(data || []);
			setLoading(false);
		});
	}, []);
	const updateStatus = async (id, status) => {
		setDevis((prev) => prev.map((d) => d.id === id ? {
			...d,
			status
		} : d));
		if (selected && selected.id === id) setSelected({
			...selected,
			status
		});
		await supabase.from("quote_requests").update({ status }).eq("id", id);
	};
	const del = async (id) => {
		if (!confirm("Supprimer ?")) return;
		setDevis((prev) => prev.filter((d) => d.id !== id));
		if (selected && selected.id === id) setSelected(null);
		await supabase.from("quote_requests").delete().eq("id", id);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	const filtered = devis.filter((d) => d.full_name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase()) || d.city && d.city.toLowerCase().includes(search.toLowerCase()));
	const columns = [
		{
			key: "nouveau",
			label: "Nouveau",
			color: "bg-blue-500"
		},
		{
			key: "en_cours",
			label: "En cours",
			color: "bg-yellow-500"
		},
		{
			key: "devis_envoye",
			label: "Devis envoyé",
			color: "bg-purple-500"
		},
		{
			key: "accepte",
			label: "Accepté",
			color: "bg-green-500"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "Demandes de devis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-zinc-500 text-sm mt-1",
					children: [devis.length, " demande(s)"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex bg-zinc-100 rounded-sm p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setViewMode("list"),
							className: `px-3 py-1.5 text-sm rounded ${viewMode === "list" ? "bg-zinc-900 text-white" : "text-zinc-600"}`,
							children: "Liste"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setViewMode("kanban"),
							className: `px-3 py-1.5 text-sm rounded ${viewMode === "kanban" ? "bg-zinc-900 text-white" : "text-zinc-600"}`,
							children: "Kanban"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							const headers = [
								"Nom",
								"Email",
								"Téléphone",
								"Ville",
								"Date événement",
								"Type",
								"Total (MAD)",
								"Statut",
								"Date création"
							];
							const rows = devis.map((d) => [
								d.full_name,
								d.email,
								d.phone,
								d.city || "",
								d.event_date || "",
								d.event_type || "",
								d.estimated_total,
								d.status,
								new Date(d.created_at).toLocaleDateString("fr-FR")
							]);
							const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
							const link = document.createElement("a");
							link.href = encodeURI(csv);
							link.download = "devis.csv";
							link.click();
						},
						className: "text-xs bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " Exporter"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full sm:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Rechercher...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "w-full pl-9 pr-4 py-2 text-sm border rounded bg-white"
				})]
			}),
			viewMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white border rounded-sm shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-zinc-50 text-zinc-500 uppercase text-xs border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left",
								children: "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left hidden md:table-cell",
								children: "Date événement"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-left",
								children: "Statut"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4 text-right",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-zinc-100",
						children: filtered.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-zinc-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: d.full_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: d.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-zinc-600 hidden md:table-cell",
									children: d.event_date || "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-semibold",
									children: formatPrice(d.estimated_total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: d.status,
										onChange: (e) => updateStatus(d.id, e.target.value),
										className: "text-xs border rounded p-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "nouveau",
												children: "Nouveau"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "en_cours",
												children: "En cours"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "devis_envoye",
												children: "Devis envoyé"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "accepte",
												children: "Accepté"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "refuse",
												children: "Refusé"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelected(d),
											className: "p-2 text-zinc-400 hover:text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => del(d.id),
											className: "p-2 text-zinc-400 hover:text-red-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, d.id))
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-4 gap-4",
				children: columns.map((col) => {
					const items = devis.filter((d) => d.status === col.key);
					const total = items.reduce((sum, d) => sum + Number(d.estimated_total || 0), 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border rounded-sm shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 border-b flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-3 w-3 rounded-full ${col.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-zinc-900",
										children: col.label
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs bg-zinc-100 px-2 py-0.5 rounded-full text-zinc-600",
									children: items.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 space-y-3 max-h-[600px] overflow-y-auto",
								children: [items.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-zinc-50 border rounded-sm p-3 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-sm text-zinc-900",
												children: d.full_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-zinc-500",
												children: d.city || "-"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-[#D4AF37]",
												children: formatPrice(d.estimated_total)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-500",
											children: new Date(d.created_at).toLocaleDateString("fr-FR")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: d.status,
											onChange: (e) => updateStatus(d.id, e.target.value),
											className: "w-full text-xs border rounded p-1.5 bg-white",
											children: [columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: c.key,
												children: c.label
											}, c.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "refuse",
												children: "Refusé"
											})]
										})
									]
								}, d.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-zinc-400 text-center py-4",
									children: "Aucun devis."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 border-t bg-zinc-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-zinc-500",
									children: ["Total : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-zinc-900",
										children: formatPrice(total)
									})]
								})
							})
						]
					}, col.key);
				})
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
				onClick: () => setSelected(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Détails"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelected(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: "Client"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: selected.full_name
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: "Téléphone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: selected.phone
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: selected.email
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: "Ville"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: selected.city || "-"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: "Date événement"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: selected.event_date || "-"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: "Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: selected.event_type || "-"
									})] })
								]
							}),
							selected.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-500 mb-2",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-zinc-50 p-4 border-l-2 border-[#D4AF37] italic text-sm",
								children: [
									"\"",
									selected.message,
									"\""
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-500 mb-3",
								children: "Articles"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border rounded divide-y",
								children: Array.isArray(selected.items) && selected.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										item.name,
										" x",
										item.qty
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: formatPrice(item.price * item.qty)
									})]
								}, i))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-4 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Total estimé"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl font-bold text-[#D4AF37]",
									children: formatPrice(selected.estimated_total)
								})]
							})
						]
					})]
				})
			})
		]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${{
			nouveau: "bg-blue-100 text-blue-800",
			en_cours: "bg-yellow-100 text-yellow-800",
			devis_envoye: "bg-purple-100 text-purple-800",
			accepte: "bg-green-100 text-green-800",
			refuse: "bg-red-100 text-red-800"
		}[status] || "bg-gray-100"}`,
		children: status.replace("_", " ")
	});
}
function ProductList() {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const fetchProducts = async () => {
		setLoading(true);
		const { data, error } = await supabase.from("products").select("*");
		if (error) {
			console.error(error);
			alert("Erreur : " + error.message);
		} else setProducts(data || []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetchProducts();
	}, []);
	const deleteProduct = async (id) => {
		if (!confirm("Supprimer ce produit ?")) return;
		await supabase.from("products").delete().eq("id", id);
		fetchProducts();
	};
	const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-zinc-900",
					children: "Catalogue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-zinc-500 text-sm mt-1",
					children: [products.length, " produit(s)"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 sm:w-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Rechercher...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-9 pr-4 py-2 text-sm border rounded bg-white"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setEditingProduct(null);
							setShowForm(true);
						},
						className: "bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Ajouter"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white border rounded-sm shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-zinc-50 text-zinc-500 uppercase text-xs border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Produit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Catégorie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Prix"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-zinc-100",
						children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-zinc-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-4 flex items-center gap-3",
									children: [p.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image_url,
										alt: p.name,
										className: "h-10 w-10 object-cover rounded"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 bg-zinc-100 rounded flex items-center justify-center text-zinc-400",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-zinc-900",
										children: p.name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 text-zinc-600 uppercase text-xs font-semibold",
									children: p.category_slug || "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-semibold text-zinc-900",
									children: formatPrice(p.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: p.stock > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-green-600",
										children: [p.stock, " en stock"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-600",
										children: "Rupture"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setEditingProduct(p);
												setShowForm(true);
											},
											className: "p-1.5 text-zinc-400 hover:text-blue-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => deleteProduct(p.id),
											className: "p-1.5 text-zinc-400 hover:text-red-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, p.id))
					})]
				})
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, {
				product: editingProduct,
				onClose: () => setShowForm(false),
				onSave: () => {
					setShowForm(false);
					fetchProducts();
				}
			})
		]
	});
}
function ProductForm({ product, onClose, onSave }) {
	const [form, setForm] = (0, import_react.useState)({
		name: product?.name || "",
		slug: product?.slug || "",
		price: product?.price || 0,
		stock: product?.stock || 10,
		category_slug: product?.category_slug || "mobilier",
		description: product?.description || "",
		image_url: product?.image_url || ""
	});
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleChange = (e) => setForm({
		...form,
		[e.target.name]: e.target.value
	});
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setUploading(true);
		const fileName = `${Math.random()}.${file.name.split(".").pop()}`;
		const { error } = await supabase.storage.from("product-images").upload(fileName, file);
		if (error) {
			alert("Erreur upload.");
			setUploading(false);
			return;
		}
		const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
		setForm({
			...form,
			image_url: data.publicUrl
		});
		setUploading(false);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		const { data: catData } = await supabase.from("categories").select("id").eq("slug", form.category_slug).maybeSingle();
		if (!catData) {
			alert("Catégorie introuvable");
			setSaving(false);
			return;
		}
		const payload = {
			name: form.name,
			slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
			price: Number(form.price),
			stock: Number(form.stock),
			category_id: catData.id,
			description: form.description,
			image_url: form.image_url
		};
		const { error } = product ? await supabase.from("products").update(payload).eq("id", product.id) : await supabase.from("products").insert(payload);
		if (error) alert("Erreur : " + error.message);
		else onSave();
		setSaving(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-2xl text-zinc-900",
					children: [product ? "Modifier" : "Ajouter", " un produit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs text-zinc-500",
								children: "Nom"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								name: "name",
								value: form.name,
								onChange: handleChange,
								className: field
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-zinc-500",
							children: "Prix (MAD)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "number",
							name: "price",
							value: form.price,
							onChange: handleChange,
							className: field
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-zinc-500",
							children: "Catégorie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "category_slug",
							value: form.category_slug,
							onChange: handleChange,
							className: field,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "mobilier",
									children: "Mobilier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "tentes",
									children: "Tentes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "son-lumiere",
									children: "Son"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "art-de-table",
									children: "Art de la table"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-zinc-500",
							children: "Stock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "number",
							name: "stock",
							value: form.stock,
							onChange: handleChange,
							className: field
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						name: "description",
						value: form.description,
						onChange: handleChange,
						rows: 3,
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Image"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							form.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: form.image_url,
								className: "h-16 w-16 object-cover rounded border"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								onChange: handleImageUpload,
								className: "text-sm"
							}),
							uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 border-t flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 rounded",
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: saving,
							className: "bg-[#D4AF37] text-black px-6 py-2 text-sm font-medium rounded",
							children: saving ? "Enregistrement..." : "Enregistrer"
						})]
					})
				]
			})]
		})
	});
}
function CategoryList() {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const fetchCategories = async () => {
		setLoading(true);
		const { data } = await supabase.from("categories").select("*").order("sort_order");
		setCategories(data || []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetchCategories();
	}, []);
	const deleteCategory = async (id) => {
		if (!confirm("Supprimer cette catégorie ?")) return;
		await supabase.from("categories").delete().eq("id", id);
		fetchCategories();
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl text-zinc-900",
					children: "Catégories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-zinc-500 text-sm",
					children: [categories.length, " catégorie(s)"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditingCategory(null);
						setShowForm(true);
					},
					className: "bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Ajouter"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white border rounded-sm shadow-sm overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-zinc-50 text-zinc-500 uppercase text-xs border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Nom"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Slug"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-zinc-100",
						children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-zinc-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-medium",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4 font-mono text-xs",
									children: c.slug
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: c.description || "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setEditingCategory(c);
												setShowForm(true);
											},
											className: "p-1.5 text-zinc-400 hover:text-blue-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => deleteCategory(c.id),
											className: "p-1.5 text-zinc-400 hover:text-red-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									})
								})
							]
						}, c.id))
					})]
				})
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryForm, {
				category: editingCategory,
				onClose: () => setShowForm(false),
				onSave: () => {
					setShowForm(false);
					fetchCategories();
				}
			})
		]
	});
}
function CategoryForm({ category, onClose, onSave }) {
	const [form, setForm] = (0, import_react.useState)({
		name: category?.name || "",
		slug: category?.slug || "",
		description: category?.description || "",
		sort_order: category?.sort_order || 0
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		const payload = {
			name: form.name,
			slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			description: form.description,
			sort_order: Number(form.sort_order)
		};
		const { error } = category ? await supabase.from("categories").update(payload).eq("id", category.id) : await supabase.from("categories").insert(payload);
		if (error) alert(error.message);
		else onSave();
		setSaving(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-sm shadow-xl w-full max-w-md",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl",
					children: [category ? "Modifier" : "Nouvelle", " catégorie"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						}),
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						rows: 2,
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "px-4 py-2 text-sm",
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: saving,
							className: "bg-[#D4AF37] text-black px-6 py-2 text-sm rounded",
							children: saving ? "..." : "Enregistrer"
						})]
					})
				]
			})]
		})
	});
}
function GalleryList() {
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const fetchPhotos = async () => {
		setLoading(true);
		const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
		setPhotos(data || []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetchPhotos();
	}, []);
	const handleUpload = async (e) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		setUploading(true);
		for (const file of files) {
			const fileName = `${Math.random()}.${file.name.split(".").pop()}`;
			const { error } = await supabase.storage.from("gallery-images").upload(fileName, file);
			if (!error) {
				const { data } = supabase.storage.from("gallery-images").getPublicUrl(fileName);
				await supabase.from("gallery").insert({
					title: file.name,
					image_url: data.publicUrl
				});
			}
		}
		setUploading(false);
		fetchPhotos();
	};
	const deletePhoto = async (id) => {
		if (!confirm("Supprimer ?")) return;
		await supabase.from("gallery").delete().eq("id", id);
		fetchPhotos();
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Galerie"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-zinc-500 text-sm",
				children: [photos.length, " photo(s)"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2 cursor-pointer",
				children: [
					uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
					" Ajouter",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						multiple: true,
						onChange: handleUpload,
						className: "hidden"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
			children: photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative aspect-square bg-zinc-100 rounded overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.image_url,
					className: "w-full h-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => deletePhoto(p.id),
						className: "bg-red-600 text-white p-2 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-5 w-5" })
					})
				})]
			}, p.id))
		})]
	});
}
function TestimonialsList() {
	const [testimonials, setTestimonials] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const fetch = async () => {
		setLoading(true);
		const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
		setTestimonials(data || []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetch();
	}, []);
	const toggle = async (id, approved) => {
		setTestimonials((prev) => prev.map((t) => t.id === id ? {
			...t,
			approved
		} : t));
		await supabase.from("testimonials").update({ approved }).eq("id", id);
	};
	const del = async (id) => {
		if (!confirm("Supprimer ?")) return;
		await supabase.from("testimonials").delete().eq("id", id);
		fetch();
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "Avis clients"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-zinc-500 text-sm",
					children: [testimonials.length, " avis"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditing(null);
						setShowForm(true);
					},
					className: "bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Ajouter"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border rounded-sm shadow-sm p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: t.name
							}), t.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-zinc-500",
								children: t.role
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}` }, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm italic mb-4",
							children: [
								"\"",
								t.content,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pt-4 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: t.approved,
									onChange: (e) => toggle(t.id, e.target.checked)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: t.approved ? "text-green-600" : "text-zinc-500",
									children: t.approved ? "Publié" : "En attente"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setEditing(t);
										setShowForm(true);
									},
									className: "p-1.5 text-zinc-400 hover:text-blue-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => del(t.id),
									className: "p-1.5 text-zinc-400 hover:text-red-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						})
					]
				}, t.id))
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialForm, {
				testimonial: editing,
				onClose: () => setShowForm(false),
				onSave: () => {
					setShowForm(false);
					fetch();
				}
			})
		]
	});
}
function TestimonialForm({ testimonial, onClose, onSave }) {
	const [form, setForm] = (0, import_react.useState)({
		name: testimonial?.name || "",
		role: testimonial?.role || "",
		content: testimonial?.content || "",
		rating: testimonial?.rating || 5,
		approved: testimonial?.approved || false
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		const { error } = testimonial ? await supabase.from("testimonials").update(form).eq("id", testimonial.id) : await supabase.from("testimonials").insert(form);
		if (error) alert(error.message);
		else onSave();
		setSaving(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-sm shadow-xl w-full max-w-md",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl",
					children: [testimonial ? "Modifier" : "Nouvel", " avis"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: form.name,
						onChange: (e) => setForm({
							...form,
							name: e.target.value
						}),
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Rôle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.role,
						onChange: (e) => setForm({
							...form,
							role: e.target.value
						}),
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Avis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						value: form.content,
						onChange: (e) => setForm({
							...form,
							content: e.target.value
						}),
						rows: 3,
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Note (1-5)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: 5,
						value: form.rating,
						onChange: (e) => setForm({
							...form,
							rating: Number(e.target.value)
						}),
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.approved,
							onChange: (e) => setForm({
								...form,
								approved: e.target.checked
							}),
							id: "approved"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "approved",
							className: "text-sm",
							children: "Publier"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "px-4 py-2 text-sm",
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: saving,
							className: "bg-[#D4AF37] text-black px-6 py-2 text-sm rounded",
							children: saving ? "..." : "Enregistrer"
						})]
					})
				]
			})]
		})
	});
}
function BlogList() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const fetch = async () => {
		setLoading(true);
		const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
		setPosts(data || []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetch();
	}, []);
	const del = async (id) => {
		if (!confirm("Supprimer ?")) return;
		await supabase.from("posts").delete().eq("id", id);
		fetch();
	};
	const toggle = async (id, published) => {
		setPosts((prev) => prev.map((p) => p.id === id ? {
			...p,
			published
		} : p));
		await supabase.from("posts").update({ published }).eq("id", id);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "Blog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-zinc-500 text-sm",
					children: [posts.length, " article(s)"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setEditing(null);
						setShowForm(true);
					},
					className: "bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nouvel article"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border rounded-sm shadow-sm overflow-hidden flex flex-col",
					children: [p.cover_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.cover_image,
						className: "w-full h-40 object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 flex-1 flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl mb-2",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-zinc-500 flex-1 mb-4",
								children: p.excerpt || p.content.slice(0, 100) + "..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center pt-4 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: p.published,
										onChange: (e) => toggle(p.id, e.target.checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: p.published ? "text-green-600" : "text-zinc-500",
										children: p.published ? "Publié" : "Brouillon"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setEditing(p);
											setShowForm(true);
										},
										className: "p-1.5 text-zinc-400 hover:text-blue-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => del(p.id),
										className: "p-1.5 text-zinc-400 hover:text-red-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})]
							})
						]
					})]
				}, p.id))
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleForm, {
				post: editing,
				onClose: () => setShowForm(false),
				onSave: () => {
					setShowForm(false);
					fetch();
				}
			})
		]
	});
}
function ArticleForm({ post, onClose, onSave }) {
	const [form, setForm] = (0, import_react.useState)({
		title: post?.title || "",
		slug: post?.slug || "",
		excerpt: post?.excerpt || "",
		content: post?.content || "",
		cover_image: post?.cover_image || "",
		published: post?.published || false
	});
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const handleImage = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setUploading(true);
		const fileName = `${Math.random()}.${file.name.split(".").pop()}`;
		const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
		if (error) {
			alert("Erreur");
			setUploading(false);
			return;
		}
		const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
		setForm({
			...form,
			cover_image: data.publicUrl
		});
		setUploading(false);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		const payload = {
			title: form.title,
			slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			excerpt: form.excerpt,
			content: form.content,
			cover_image: form.cover_image,
			published: form.published
		};
		const { error } = post ? await supabase.from("posts").update(payload).eq("id", post.id) : await supabase.from("posts").insert(payload);
		if (error) alert(error.message);
		else onSave();
		setSaving(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white rounded-sm shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl",
					children: [post ? "Modifier" : "Nouvel", " article"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Titre"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Extrait"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.excerpt,
						onChange: (e) => setForm({
							...form,
							excerpt: e.target.value
						}),
						rows: 2,
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Contenu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						value: form.content,
						onChange: (e) => setForm({
							...form,
							content: e.target.value
						}),
						rows: 8,
						className: field
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-zinc-500",
						children: "Image"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							form.cover_image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: form.cover_image,
								className: "h-16 w-16 object-cover rounded border"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								onChange: handleImage
							}),
							uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.published,
							onChange: (e) => setForm({
								...form,
								published: e.target.checked
							}),
							id: "pub"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "pub",
							children: "Publier"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "px-4 py-2 text-sm",
							children: "Annuler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: saving,
							className: "bg-[#D4AF37] text-black px-6 py-2 text-sm rounded",
							children: saving ? "..." : "Enregistrer"
						})]
					})
				]
			})]
		})
	});
}
function BookingsList() {
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const fetch = async () => {
		setLoading(true);
		const { data } = await supabase.from("bookings").select("*, products(name)").order("created_at", { ascending: false });
		setBookings(data || []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		fetch();
	}, []);
	const updateStatus = async (id, status) => {
		setBookings((prev) => prev.map((b) => b.id === id ? {
			...b,
			status
		} : b));
		await supabase.from("bookings").update({ status }).eq("id", id);
	};
	const del = async (id) => {
		if (!confirm("Supprimer ?")) return;
		await supabase.from("bookings").delete().eq("id", id);
		fetch();
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Réservations"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-zinc-500 text-sm",
			children: [bookings.length, " réservation(s)"]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white border rounded-sm shadow-sm overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-zinc-50 text-zinc-500 uppercase text-xs border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Produit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Client"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Période"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Statut"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-right",
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-zinc-100",
					children: bookings.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-zinc-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-medium",
								children: b.products?.name || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-6 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: b.client_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: b.client_email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-zinc-500",
										children: b.client_phone
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-6 py-4 text-zinc-600",
								children: [
									"Du ",
									new Date(b.start_date).toLocaleDateString("fr-FR"),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Au ",
									new Date(b.end_date).toLocaleDateString("fr-FR")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: b.status,
									onChange: (e) => updateStatus(b.id, e.target.value),
									className: "text-xs border rounded p-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "en_attente",
											children: "En attente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "confirme",
											children: "Confirmé"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "annule",
											children: "Annulé"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => del(b.id),
									className: "p-2 text-zinc-400 hover:text-red-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							})
						]
					}, b.id))
				})]
			})
		})]
	});
}
function MessagesList() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => {
			setMessages(data || []);
			setLoading(false);
		});
	}, []);
	const markAsRead = async (id) => {
		setMessages((prev) => prev.map((m) => m.id === id ? {
			...m,
			status: "lu"
		} : m));
		await supabase.from("contact_messages").update({ status: "lu" }).eq("id", id);
	};
	const del = async (id) => {
		if (!confirm("Supprimer ?")) return;
		setMessages((prev) => prev.filter((m) => m.id !== id));
		await supabase.from("contact_messages").delete().eq("id", id);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Boîte de réception"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-zinc-500 text-sm",
			children: [messages.length, " message(s)"]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4",
			children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `bg-white border rounded-sm shadow-sm p-6 ${m.status === "nouveau" ? "border-l-4 border-l-[#D4AF37]" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row justify-between items-start gap-4 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-xl flex items-center gap-2",
						children: [
							m.name,
							" ",
							m.status === "nouveau" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 rounded-full uppercase font-sans font-bold",
								children: "Nouveau"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-4 text-xs text-zinc-500 mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }),
									" ",
									m.email
								]
							}),
							m.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }),
									" ",
									m.phone
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									" ",
									new Date(m.created_at).toLocaleDateString("fr-FR", {
										day: "2-digit",
										month: "long",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit"
									})
								]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [m.status === "nouveau" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => markAsRead(m.id),
							className: "flex items-center gap-1 text-xs bg-zinc-900 text-white px-3 py-1.5 rounded",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3" }), " Marquer lu"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3" }), " Lu"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => del(m.id),
							className: "p-1.5 text-zinc-400 hover:text-red-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-4 text-zinc-700 whitespace-pre-wrap bg-zinc-50 p-4 rounded border-l-2 border-zinc-200",
					children: m.message
				})]
			}, m.id)), messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-12 text-zinc-500 bg-white border rounded-sm",
				children: "Aucun message."
			})]
		})]
	});
}
function NewsletterList() {
	const [subs, setSubs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.from("newsletter").select("*").order("created_at", { ascending: false }).then(({ data }) => {
			setSubs(data || []);
			setLoading(false);
		});
	}, []);
	const del = async (id) => {
		if (!confirm("Supprimer ?")) return;
		await supabase.from("newsletter").delete().eq("id", id);
		setSubs((prev) => prev.filter((s) => s.id !== id));
	};
	const exportCSV = () => {
		const headers = [
			"Email",
			"Date",
			"Actif"
		];
		const rows = subs.map((s) => [
			s.email,
			new Date(s.created_at).toLocaleDateString("fr-FR"),
			s.active ? "Oui" : "Non"
		]);
		const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
		const link = document.createElement("a");
		link.href = encodeURI(csv);
		link.download = "newsletter.csv";
		link.click();
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Newsletter"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-zinc-500 text-sm",
				children: [subs.length, " abonné(s)"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: exportCSV,
				className: "bg-[#D4AF37] text-black px-4 py-2 text-sm font-medium rounded flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Exporter"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white border rounded-sm shadow-sm overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-zinc-50 text-zinc-500 uppercase text-xs border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-left",
							children: "Statut"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-6 py-4 text-right",
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-zinc-100",
					children: subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-zinc-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-medium",
								children: s.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-zinc-600",
								children: new Date(s.created_at).toLocaleDateString("fr-FR")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4",
								children: s.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-green-600",
									children: "Actif"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-zinc-400",
									children: "Inactif"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => del(s.id),
									className: "p-2 text-zinc-400 hover:text-red-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							})
						]
					}, s.id))
				})]
			})
		})]
	});
}
//#endregion
export { AdminPage as component };
