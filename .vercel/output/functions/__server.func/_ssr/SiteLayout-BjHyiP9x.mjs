import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useQuote } from "./quote-7F6hop_-.mjs";
import { t as supabase } from "./client-Cd5rFvc9.mjs";
import { m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { C as Instagram, D as Facebook, T as Globe, _ as MapPin, f as Phone, g as Menu, h as MessageCircle, t as X, v as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-BjHyiP9x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteLayout({ children }) {
	const { count } = useQuote();
	const { t, i18n } = useTranslation();
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState().location.pathname;
	const whatsappLink = `https://wa.me/212691055597?text=${encodeURIComponent("Bonjour Éclat Events, je souhaite avoir des informations.")}`;
	const navLinks = [
		{
			to: "/",
			label: t("nav.home")
		},
		{
			to: "/catalogue",
			label: t("nav.catalogue")
		},
		{
			to: "/realisations",
			label: "Réalisations"
		},
		{
			to: "/blog",
			label: "Blog"
		},
		{
			to: "/a-propos",
			label: t("nav.about")
		},
		{
			to: "/contact",
			label: t("nav.contact")
		}
	];
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	const handleNewsletter = async (e) => {
		e.preventDefault();
		const form = e.target;
		const emailInput = form.elements.namedItem("email");
		const btn = form.querySelector("button");
		if (!emailInput.value) return;
		btn.disabled = true;
		btn.textContent = "Inscription...";
		const { error } = await supabase.from("newsletter").insert({ email: emailInput.value });
		if (error) {
			alert("Cette adresse est déjà inscrite ou une erreur est survenue.");
			btn.disabled = false;
			btn.textContent = "S'inscrire";
		} else {
			alert("Merci ! Vous êtes bien inscrit à la newsletter.");
			emailInput.value = "";
			btn.textContent = "Inscrit ✓";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background font-sans text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-zinc-950 text-zinc-300 text-xs py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-6 flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "tel:+212691055597",
						className: "flex items-center gap-2 hover:text-white transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), " +212 6 91 05 55 97"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:block",
						children: "Livraison & montage partout au Maroc"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "bg-background border-b sticky top-0 z-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "font-display text-3xl tracking-wide text-primary",
							children: ["Éclat", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "Events"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden md:flex items-center gap-8",
							children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: `text-sm uppercase tracking-widest hover:text-primary transition-colors ${pathname === link.to ? "text-primary font-semibold" : ""}`,
								children: link.label
							}, link.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden sm:flex items-center gap-1 border rounded px-2 py-1 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3 text-zinc-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: i18n.language,
										onChange: (e) => changeLanguage(e.target.value),
										className: "bg-transparent focus:outline-none cursor-pointer uppercase",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "fr",
												children: "FR"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "en",
												children: "EN"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ar",
												children: "AR"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hidden lg:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 text-sm rounded hover:bg-[#20b858] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										xmlns: "http://www.w3.org/2000/svg",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										className: "h-4 w-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "WhatsApp"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/devis",
									className: "hidden sm:flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors",
									children: [
										t("nav.devis"),
										" ",
										count > 0 && `(${count})`
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "md:hidden",
									onClick: () => setMobileMenuOpen(!mobileMenuOpen),
									children: mobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							]
						})
					]
				}), mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:hidden border-t bg-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-col p-4 space-y-4",
						children: [
							navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								onClick: () => setMobileMenuOpen(false),
								className: `text-sm uppercase tracking-widest ${pathname === link.to ? "text-primary font-semibold" : ""}`,
								children: link.label
							}, link.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/mes-reservations",
								onClick: () => setMobileMenuOpen(false),
								className: "text-sm uppercase tracking-widest",
								children: "Mes réservations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-2 border-t",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => changeLanguage("fr"),
										className: `px-3 py-1 text-xs border rounded ${i18n.language === "fr" ? "bg-zinc-900 text-white" : ""}`,
										children: "FR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => changeLanguage("en"),
										className: `px-3 py-1 text-xs border rounded ${i18n.language === "en" ? "bg-zinc-900 text-white" : ""}`,
										children: "EN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => changeLanguage("ar"),
										className: `px-3 py-1 text-xs border rounded ${i18n.language === "ar" ? "bg-zinc-900 text-white" : ""}`,
										children: "AR"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/devis",
								onClick: () => setMobileMenuOpen(false),
								className: "bg-zinc-900 text-white text-center py-3 text-sm uppercase tracking-widest mt-2",
								children: [
									t("nav.devis"),
									" ",
									count > 0 && `(${count})`
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#0B1729] text-white py-16 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl md:text-4xl mb-2",
						children: t("cta.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-zinc-400",
						children: t("cta.subtitle")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "bg-[#D4AF37] text-zinc-900 px-8 py-3 font-medium hover:bg-[#c29e2f] transition-colors",
							children: t("cta.contact")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappLink,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "border border-zinc-600 px-8 py-3 font-medium flex items-center gap-2 hover:bg-white hover:text-zinc-900 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
								" ",
								t("cta.whatsapp")
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#0B1729] text-white py-20 text-center border-t border-zinc-800/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6",
							children: t("social.follow")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl md:text-5xl mb-6",
							children: t("social.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[2px] w-16 bg-[#D4AF37] mx-auto mb-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-zinc-400 mb-12 text-lg",
							children: t("social.subtitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 md:grid-cols-5 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "bg-[#111C2E] hover:bg-[#1a263a] p-6 rounded flex flex-col items-center justify-center gap-3 border border-zinc-800 hover:border-zinc-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-8 w-8 text-[#1877F2]",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold tracking-wide uppercase",
										children: "Facebook"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "bg-[#111C2E] hover:bg-[#1a263a] p-6 rounded flex flex-col items-center justify-center gap-3 border border-zinc-800 hover:border-zinc-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "h-8 w-8",
										viewBox: "0 0 24 24",
										fill: "url(#ig-gradient)",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "ig-gradient",
											x1: "0%",
											y1: "100%",
											x2: "100%",
											y2: "0%",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "#FD5949"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "50%",
													stopColor: "#D6249F"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "#285AEB"
												})
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold tracking-wide uppercase",
										children: "Instagram"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "bg-[#111C2E] hover:bg-[#1a263a] p-6 rounded flex flex-col items-center justify-center gap-3 border border-zinc-800 hover:border-zinc-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-8 w-8",
										viewBox: "0 0 24 24",
										fill: "currentColor",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold tracking-wide uppercase",
										children: "TikTok"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "bg-[#111C2E] hover:bg-[#1a263a] p-6 rounded flex flex-col items-center justify-center gap-3 border border-zinc-800 hover:border-zinc-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-8 w-8 text-[#229ED9]",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold tracking-wide uppercase",
										children: "Telegram"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink,
									className: "bg-[#111C2E] hover:bg-[#1a263a] p-6 rounded flex flex-col items-center justify-center gap-3 border border-zinc-800 hover:border-zinc-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "h-8 w-8 text-[#25D366]",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold tracking-wide uppercase",
										children: "WhatsApp"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "bg-[#0B1729] text-zinc-400 py-16 border-t border-zinc-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl text-white mb-4",
										children: "ÉclatEvents"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed mb-6",
										children: "Location de matériel événementiel haut de gamme au Maroc. Dirigée par une équipe passionnée."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#",
												className: "p-2 bg-[#111C2E] rounded hover:bg-[#1877F2] hover:text-white transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#",
												className: "p-2 bg-[#111C2E] rounded hover:bg-[#E4405F] hover:text-white transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: whatsappLink,
												className: "p-2 bg-[#111C2E] rounded hover:bg-[#25D366] hover:text-white transition-colors",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-white font-semibold uppercase tracking-wider text-sm mb-4",
								children: "Navigation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-3 text-sm",
								children: [
									navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: link.to,
										className: "hover:text-white transition-colors",
										children: link.label
									}) }, link.to)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/mes-reservations",
										className: "hover:text-white transition-colors",
										children: "Mes réservations"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/avis",
										className: "hover:text-white transition-colors",
										children: "Laisser un avis"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/devis",
										className: "hover:text-white transition-colors",
										children: t("nav.devis")
									}) })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-white font-semibold uppercase tracking-wider text-sm mb-4",
								children: "Services"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/catalogue/$categorie",
										params: { categorie: "mobilier" },
										className: "hover:text-white transition-colors",
										children: "Mobilier"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/catalogue/$categorie",
										params: { categorie: "tentes" },
										className: "hover:text-white transition-colors",
										children: "Tentes & Chapiteaux"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/catalogue/$categorie",
										params: { categorie: "son-lumiere" },
										className: "hover:text-white transition-colors",
										children: "Son & Lumière"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/catalogue/$categorie",
											params: { categorie: "art-de-table" },
											className: "hover:text-white transition-colors",
											children: "Art de la table"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/mentions-legales",
											className: "hover:text-white transition-colors",
											children: "Mentions légales"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/confidentialite",
											className: "hover:text-white transition-colors",
											children: "Confidentialité"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/cgv",
											className: "hover:text-white transition-colors",
											children: "CGV"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/faq",
											className: "hover:text-white transition-colors",
											children: "FAQ"
										})
									] })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-white font-semibold uppercase tracking-wider text-sm mb-4",
								children: "Contact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-[#D4AF37] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "tel:+212691055597",
											className: "hover:text-white transition-colors",
											children: "+212 6 91 05 55 97"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4 text-[#25D366] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: whatsappLink,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "hover:text-white transition-colors",
											children: "WhatsApp"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-[#D4AF37] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "mailto:contact@eclat-events.ma",
											className: "hover:text-white transition-colors",
											children: "contact@eclat-events.ma"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Sidi Maarouf, Al Mostakbal",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Casablanca, Maroc"
										] })]
									})
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-white font-display text-2xl mb-2",
								children: "Restez inspiré"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "Recevez nos offres et inspirations par email."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleNewsletter,
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									name: "email",
									placeholder: "Votre adresse email",
									required: true,
									className: "flex-1 bg-[#111C2E] border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "bg-[#D4AF37] text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-[#c29e2f] transition-colors",
									children: "S'inscrire"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Éclat Events. ",
							t("footer.rights")
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/mentions-legales",
									className: "hover:text-white transition-colors",
									children: "Mentions légales"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/confidentialite",
									className: "hover:text-white transition-colors",
									children: "Confidentialité"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/cgv",
									className: "hover:text-white transition-colors",
									children: "CGV"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/faq",
									className: "hover:text-white transition-colors",
									children: "FAQ"
								})
							]
						})]
					})
				]
			})
		]
	});
}
function PageHeader({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-zinc-950 text-white py-20 md:py-28 text-center px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl md:text-6xl mb-4",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-zinc-400 max-w-2xl mx-auto text-lg",
			children: subtitle
		})]
	});
}
//#endregion
export { SiteLayout as n, PageHeader as t };
