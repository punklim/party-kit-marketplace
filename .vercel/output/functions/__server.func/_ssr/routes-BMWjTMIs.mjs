import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { j as Clock, l as Sparkles, n as Wrench, r as Truck, s as Star } from "../_libs/lucide-react.mjs";
import { n as SiteLayout } from "./SiteLayout-BjHyiP9x.mjs";
import { i as products, r as hero_default, t as categories } from "./catalog-BvPKNVVF.mjs";
import { t as ProductCard } from "./ProductCard-DfZXwRq6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BMWjTMIs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const { t, i18n } = useTranslation();
	const [galleryPhotos, setGalleryPhotos] = (0, import_react.useState)([]);
	const [avis, setAvis] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("gallery").select("*").limit(3).then(({ data }) => {
			setGalleryPhotos(data || []);
		});
		supabase.from("testimonials").select("*").eq("approved", true).order("created_at", { ascending: false }).limit(3).then(({ data }) => {
			setAvis(data || []);
		});
	}, []);
	const perks = [
		{
			icon: Truck,
			title: t("home.perks.delivery"),
			desc: t("home.perks.deliveryDesc")
		},
		{
			icon: Wrench,
			title: t("home.perks.install"),
			desc: t("home.perks.installDesc")
		},
		{
			icon: Sparkles,
			title: t("home.perks.premium"),
			desc: t("home.perks.premiumDesc")
		},
		{
			icon: Clock,
			title: t("home.perks.quote24"),
			desc: t("home.perks.quote24Desc")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-[85vh] min-h-[560px] flex items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: t("home.hero.title"),
					width: 1920,
					height: 1088,
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-hero-overlay" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-7xl px-6 text-secondary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-primary uppercase tracking-[0.35em] text-xs animate-in fade-in slide-in-from-bottom-4 duration-700",
							children: t("home.hero.eyebrow")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 text-5xl md:text-8xl max-w-3xl leading-[0.95] animate-in fade-in slide-in-from-bottom-6 duration-1000",
							children: t("home.hero.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-lg opacity-80",
							children: t("home.hero.subtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalogue",
								className: "bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:opacity-90",
								children: t("home.hero.ctaCatalogue")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/devis",
								className: "border border-secondary-foreground/40 px-8 py-4 uppercase tracking-widest text-sm hover:bg-secondary-foreground hover:text-secondary",
								children: t("home.hero.ctaQuote")
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8",
				children: perks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
						className: "h-8 w-8 text-primary shrink-0",
						strokeWidth: 1.25
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: p.desc
					})] })]
				}, p.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-primary uppercase tracking-[0.3em] text-xs",
					children: t("home.categories.eyebrow")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-5xl mt-3",
					children: t("home.categories.title")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: categories.map((c) => {
					const catName = getLocalizedField(c, "name", i18n.language);
					const catDesc = getLocalizedField(c, "description", i18n.language);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/catalogue",
						search: { categorie: c.slug },
						className: "group relative aspect-[3/4] overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image,
								alt: catName,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-hero-overlay" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-0 p-6 text-secondary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-3xl",
									children: catName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm opacity-75 mt-1",
									children: catDesc
								})]
							})
						]
					}, c.slug);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-muted py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-primary uppercase tracking-[0.3em] text-xs",
						children: t("home.selection.eyebrow")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-5xl mt-3",
						children: t("home.selection.title")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalogue",
						className: "text-sm uppercase tracking-widest hover:text-primary",
						children: t("home.selection.seeAll")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: products.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.slug))
				})]
			})
		}),
		avis.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-24 px-6 bg-[#FAF8F5]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-primary uppercase tracking-[0.3em] text-xs",
						children: t("home.testimonials.eyebrow")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-5xl mt-3",
						children: t("home.testimonials.title")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6",
					children: avis.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border rounded-sm shadow-sm p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 mb-4",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${i < a.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}` }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm italic text-zinc-700 mb-6",
								children: [
									"\"",
									a.content,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 border-t",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-zinc-900",
									children: a.name
								}), a.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: a.role
								})]
							})
						]
					}, a.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "bg-secondary text-secondary-foreground py-24 text-center px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-5xl md:text-6xl",
					children: t("home.cta.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 opacity-70",
					children: t("home.cta.subtitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/devis",
					className: "inline-block mt-8 bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm",
					children: t("home.cta.button")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-zinc-50 py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl md:text-5xl mb-4",
							children: t("home.gallery.title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: t("home.gallery.subtitle")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
						children: [galleryPhotos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/realisations",
							className: "aspect-square overflow-hidden rounded-sm group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image_url,
								alt: p.title,
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							})
						}, p.id)), galleryPhotos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-3 text-center text-zinc-500 py-8",
							children: t("home.gallery.empty")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/realisations",
							className: "inline-block border border-zinc-300 px-8 py-3 text-sm uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-colors",
							children: t("home.gallery.seeAll")
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Index as component };
