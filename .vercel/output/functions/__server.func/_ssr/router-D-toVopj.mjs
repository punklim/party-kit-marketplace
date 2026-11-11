import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as QuoteProvider } from "./quote-7F6hop_-.mjs";
import { C as useRouter, _ as Outlet, b as createRootRouteWithContext, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as instance } from "../_libs/i18next.mjs";
import { n as initReactI18next } from "../_libs/react-i18next.mjs";
import { i as products, t as categories } from "./catalog-BvPKNVVF.mjs";
import { t as Route$16 } from "./blog._slug-Bsv892Rn.mjs";
import { t as Route$17 } from "./catalogue._categorie-D92ayXzA.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$18 } from "./catalogue.index-D01Y6umk.mjs";
import { t as Route$19 } from "./produit._slug-BvzYENiF.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D-toVopj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CookieBanner() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem("cookies-accepted")) setVisible(true);
	}, []);
	const accept = () => {
		localStorage.setItem("cookies-accepted", "true");
		setVisible(false);
	};
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-6 z-50 shadow-2xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm flex-1",
				children: ["Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez leur utilisation.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/mentions-legales",
					className: "underline ml-1",
					children: "En savoir plus"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setVisible(false),
					className: "text-sm text-zinc-400 hover:text-white px-4 py-2",
					children: "Refuser"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: accept,
					className: "bg-primary text-primary-foreground px-6 py-2 text-sm font-medium rounded hover:bg-primary/90",
					children: "Accepter"
				})]
			})]
		})
	});
}
var styles_default = "/assets/styles-B77t9YO7.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function WhatsAppButton() {
	if (useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: `https://wa.me/212691055597?text=${encodeURIComponent("Bonjour Éclat Events, je souhaite avoir des informations pour mon événement.")}`,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center group",
		"aria-label": "Contacter sur WhatsApp",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			fill: "currentColor",
			className: "h-8 w-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute right-full mr-4 bg-white text-zinc-800 text-sm py-2 px-4 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium",
			children: "Besoin d'aide ?"
		})]
	});
}
instance.use(initReactI18next).init({
	resources: {
		fr: { translation: {
			"nav.home": "Accueil",
			"nav.catalogue": "Catalogue",
			"nav.realisations": "Réalisations",
			"nav.blog": "Blog",
			"nav.about": "À propos",
			"nav.contact": "Contact",
			"nav.devis": "Devis",
			"nav.whatsapp": "WhatsApp",
			"topbar.delivery": "Livraison & montage partout au Maroc",
			"footer.rights": "Tous droits réservés.",
			"footer.contact": "Contact",
			"footer.legal": "Mentions légales",
			"footer.privacy": "Confidentialité",
			"newsletter.title": "Restez inspiré",
			"newsletter.subtitle": "Recevez nos offres et inspirations par email.",
			"newsletter.placeholder": "Votre adresse email",
			"newsletter.button": "S'inscrire",
			"newsletter.sending": "Inscription...",
			"newsletter.done": "Inscrit ✓",
			"newsletter.success": "Merci ! Vous êtes bien inscrit à la newsletter.",
			"newsletter.already": "Cette adresse est déjà inscrite.",
			"newsletter.error": "Une erreur est survenue. Veuillez réessayer.",
			"cta.title": "Un projet événementiel ? Parlons-en.",
			"cta.subtitle": "Notre équipe vous répond rapidement et sans engagement.",
			"cta.contact": "Nous contacter",
			"cta.whatsapp": "WhatsApp",
			"social.title": "Rejoignez notre communauté",
			"social.subtitle": "Actualités et inspirations en temps réel",
			"social.follow": "Suivez-nous",
			"common.days_one": "{{count}} jour",
			"common.days_other": "{{count}} jours",
			"common.units_one": "{{count}} unité",
			"common.units_other": "{{count}} unités",
			"catalogue.title": "Catalogue",
			"catalogue.subtitle": "Tout le matériel pour réussir votre événement",
			"catalogue.all": "Tout",
			"catalogue.empty": "Aucun produit disponible dans cette catégorie pour le moment.",
			"category.notFound": "Catégorie introuvable",
			"category.count_one": "{{count}} produit disponible",
			"category.count_other": "{{count}} produits disponibles",
			"category.seeAll": "Voir tout le catalogue →",
			"category.empty": "Aucun produit dans cette catégorie pour le moment.",
			"category.seeCatalogue": "Voir le catalogue",
			"product.from": "À partir de",
			"product.outOfStockBadge": "Rupture",
			"product.outOfStockToast": "Ce produit est en rupture de stock.",
			"product.addedNamed": "{{name}} ajouté au devis",
			"product.addToQuote": "Ajouter au devis",
			"product.addedToast": "Ajouté au devis",
			"product.outOfStock": "Rupture de stock",
			"product.inStock": "Stock disponible : {{count}}",
			"product.stockLeft": "Stock restant : {{count}}.",
			"product.perDay": "/ jour",
			"product.qtyLabel": "Quantité",
			"product.indicativePrice": "Prix indicatif hors livraison et montage.",
			"product.reserve": "Réserver ce produit",
			"product.cancelReserve": "Annuler la réservation",
			"product.notFoundTitle": "Produit introuvable",
			"product.backToCatalogue": "Retour au catalogue",
			"product.related": "Vous aimerez aussi",
			"booking.title": "Réserver « {{name}} »",
			"booking.calendarHelp": "Sélectionnez la période souhaitée. Les dates grisées ne sont pas disponibles pour la quantité choisie ({{qty}}).",
			"booking.selectedPeriod": "Période sélectionnée :",
			"booking.fromTo": "Du {{start}} au {{end}}",
			"booking.estimatedTotal": "Total estimé : {{total}}",
			"booking.name": "Nom complet",
			"booking.email": "Email",
			"booking.phone": "Téléphone",
			"booking.submit": "Demander la réservation",
			"booking.sending": "Envoi...",
			"booking.errPeriod": "Veuillez sélectionner une période.",
			"booking.errMaxDays": "La durée maximale est de {{max}} jours. Contactez-nous pour une location plus longue.",
			"booking.errBlocked": "La période choisie contient des dates indisponibles.",
			"booking.errAvailable": "Disponible sur cette période : {{count}} seulement.",
			"booking.errUnavailable": "Ce produit n'est plus disponible sur cette période.",
			"booking.errGeneric": "Impossible d'envoyer la demande. Vérifiez vos informations et réessayez.",
			"confirmation.title": "Demande envoyée",
			"confirmation.text": "Nous vous confirmons la disponibilité sous 24h. Conservez votre référence : avec votre email, elle vous permet de suivre votre réservation à tout moment.",
			"confirmation.close": "Fermer la confirmation",
			"confirmation.copy": "Copier",
			"confirmation.copied": "Copiée",
			"confirmation.copyError": "Copie impossible : sélectionnez la référence manuellement.",
			"confirmation.product": "Produit",
			"confirmation.period": "Période",
			"confirmation.total": "Total estimé",
			"confirmation.track": "Suivre ma réservation",
			"confirmation.whatsapp": "Confirmer par WhatsApp",
			"quote.title": "Mon devis",
			"quote.subtitle": "Vérifiez votre sélection et indiquez les détails de votre événement",
			"quote.empty": "Votre devis est vide.",
			"quote.browse": "Parcourir le catalogue",
			"quote.perUnit": "{{price}} / unité",
			"quote.remove": "Retirer",
			"quote.totalPerDay": "Total estimé / jour",
			"quote.formTitle": "Vos informations",
			"quote.fullName": "Nom complet",
			"quote.phone": "Téléphone",
			"quote.email": "Email",
			"quote.eventDate": "Date de l'événement",
			"quote.city": "Ville",
			"quote.eventType": "Type d'événement",
			"quote.type.wedding": "Mariage",
			"quote.type.seminar": "Séminaire",
			"quote.type.birthday": "Anniversaire",
			"quote.type.other": "Autre",
			"quote.message": "Message",
			"quote.submit": "Envoyer ma demande",
			"quote.sending": "Envoi en cours...",
			"quote.error": "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
			"quote.thanksTitle": "Merci !",
			"quote.thanksSubtitle": "Votre demande a bien été envoyée. Nous vous répondons sous 24h.",
			"quote.back": "Retour au catalogue",
			"reservations.title": "Mes réservations",
			"reservations.intro": "Entrez l'email utilisé lors de votre réservation et la référence reçue à l'envoi de votre demande.",
			"reservations.emailLabel": "Adresse email",
			"reservations.emailPlaceholder": "vous@exemple.com",
			"reservations.refLabel": "Référence de réservation",
			"reservations.submit": "Retrouver mes réservations",
			"reservations.error": "Une erreur est survenue. Réessayez dans un instant.",
			"reservations.notFound": "Aucune réservation trouvée. Vérifiez l'email et la référence saisis.",
			"reservations.found_one": "{{count}} réservation trouvée",
			"reservations.found_other": "{{count}} réservations trouvées",
			"reservations.statusConfirmed": "Confirmée",
			"reservations.statusCancelled": "Annulée",
			"reservations.statusPending": "En attente",
			"reservations.msgConfirmed": "Réservation confirmée. Nous vous contacterons pour la livraison.",
			"reservations.msgPending": "En attente de confirmation par notre équipe.",
			"reservations.msgCancelled": "Cette réservation a été annulée.",
			"reservations.quantity": "Quantité : {{count}}",
			"reservations.ref": "Réf. {{reference}}",
			"reservations.productFallback": "Produit",
			"home.hero.eyebrow": "Location événementielle",
			"home.hero.title": "Donnez de l'éclat à vos événements",
			"home.hero.subtitle": "Mariages, séminaires, galas : tout le matériel dont vous avez besoin, livré et installé.",
			"home.hero.ctaCatalogue": "Voir le catalogue",
			"home.hero.ctaQuote": "Demander un devis",
			"home.perks.delivery": "Livraison",
			"home.perks.deliveryDesc": "Partout au Maroc",
			"home.perks.install": "Montage",
			"home.perks.installDesc": "Équipe technique dédiée",
			"home.perks.premium": "Haut de gamme",
			"home.perks.premiumDesc": "Matériel soigné et récent",
			"home.perks.quote24": "Devis 24h",
			"home.perks.quote24Desc": "Réponse rapide garantie",
			"home.categories.eyebrow": "Nos univers",
			"home.categories.title": "Catégories",
			"home.selection.eyebrow": "Sélection",
			"home.selection.title": "Les plus demandés",
			"home.selection.seeAll": "Tout voir →",
			"home.testimonials.eyebrow": "Excellence & Confiance",
			"home.testimonials.title": "Ils nous font confiance",
			"home.cta.title": "Un projet d'événement ?",
			"home.cta.subtitle": "Composez votre sélection et recevez un devis personnalisé sous 24h.",
			"home.cta.button": "Mon devis",
			"home.gallery.title": "Nos dernières réalisations",
			"home.gallery.subtitle": "Découvrez quelques-uns de nos événements récents",
			"home.gallery.empty": "Aucune photo pour le moment.",
			"home.gallery.seeAll": "Voir toutes nos réalisations",
			"contact.title": "Contact",
			"contact.subtitle": "Parlons de votre prochain événement",
			"contact.address": "Adresse",
			"contact.addressValue": "Casablanca, Maroc",
			"contact.phone": "Téléphone",
			"contact.email": "Email",
			"contact.form.name": "Nom",
			"contact.form.phone": "Téléphone",
			"contact.form.email": "Email",
			"contact.form.message": "Votre message",
			"contact.form.submit": "Envoyer",
			"contact.form.sending": "Envoi...",
			"contact.form.error": "Une erreur est survenue. Veuillez réessayer.",
			"contact.sent.title": "Message envoyé",
			"contact.sent.text": "Nous revenons vers vous rapidement.",
			"avis.title": "Laissez-nous un avis",
			"avis.subtitle": "Votre retour d'expérience nous aide à nous améliorer.",
			"avis.rating": "Votre note",
			"avis.name": "Votre nom *",
			"avis.namePlaceholder": "Ex: Samira K.",
			"avis.role": "Rôle / Événement (optionnel)",
			"avis.rolePlaceholder": "Ex: Mariée · Casablanca",
			"avis.content": "Votre avis *",
			"avis.contentPlaceholder": "Racontez-nous votre expérience...",
			"avis.submit": "Envoyer mon avis",
			"avis.sending": "Envoi en cours...",
			"avis.errorName": "Votre nom doit contenir au moins 2 caractères.",
			"avis.errorContent": "Votre avis doit contenir au moins 20 caractères.",
			"avis.errorGeneric": "Une erreur est survenue. Réessayez.",
			"avis.successTitle": "Merci pour votre avis !",
			"avis.successText": "Votre avis sera publié après validation par notre équipe.",
			"avis.backHome": "Retour à l'accueil",
			"realisations.title": "Nos Réalisations",
			"realisations.subtitle": "Découvrez nos plus beaux événements",
			"realisations.empty": "Aucune photo pour le moment. Revenez bientôt !",
			"realisations.close": "Fermer"
		} },
		en: { translation: {
			"nav.home": "Home",
			"nav.catalogue": "Catalogue",
			"nav.realisations": "Projects",
			"nav.blog": "Blog",
			"nav.about": "About",
			"nav.contact": "Contact",
			"nav.devis": "Quote",
			"nav.whatsapp": "WhatsApp",
			"topbar.delivery": "Delivery & installation across Morocco",
			"footer.rights": "All rights reserved.",
			"footer.contact": "Contact",
			"footer.legal": "Legal notice",
			"footer.privacy": "Privacy",
			"newsletter.title": "Stay inspired",
			"newsletter.subtitle": "Get our offers and inspiration by email.",
			"newsletter.placeholder": "Your email address",
			"newsletter.button": "Subscribe",
			"newsletter.sending": "Subscribing...",
			"newsletter.done": "Subscribed ✓",
			"newsletter.success": "Thank you! You are now subscribed to the newsletter.",
			"newsletter.already": "This address is already subscribed.",
			"newsletter.error": "Something went wrong. Please try again.",
			"cta.title": "An event project? Let's talk.",
			"cta.subtitle": "Our team responds quickly and without obligation.",
			"cta.contact": "Contact us",
			"cta.whatsapp": "WhatsApp",
			"social.title": "Join our community",
			"social.subtitle": "News and inspirations in real time",
			"social.follow": "Follow us",
			"common.days_one": "{{count}} day",
			"common.days_other": "{{count}} days",
			"common.units_one": "{{count}} unit",
			"common.units_other": "{{count}} units",
			"catalogue.title": "Catalogue",
			"catalogue.subtitle": "All the equipment you need for a successful event",
			"catalogue.all": "All",
			"catalogue.empty": "No products available in this category yet.",
			"category.notFound": "Category not found",
			"category.count_one": "{{count}} product available",
			"category.count_other": "{{count}} products available",
			"category.seeAll": "See the full catalogue →",
			"category.empty": "No products in this category yet.",
			"category.seeCatalogue": "View the catalogue",
			"product.from": "From",
			"product.outOfStockBadge": "Sold out",
			"product.outOfStockToast": "This product is out of stock.",
			"product.addedNamed": "{{name}} added to your quote",
			"product.addToQuote": "Add to quote",
			"product.addedToast": "Added to your quote",
			"product.outOfStock": "Out of stock",
			"product.inStock": "In stock: {{count}} available",
			"product.stockLeft": "Remaining stock: {{count}}.",
			"product.perDay": "/ day",
			"product.qtyLabel": "Quantity",
			"product.indicativePrice": "Indicative price, excluding delivery and installation.",
			"product.reserve": "Book this product",
			"product.cancelReserve": "Cancel booking",
			"product.notFoundTitle": "Product not found",
			"product.backToCatalogue": "Back to catalogue",
			"product.related": "You may also like",
			"booking.title": "Book \"{{name}}\"",
			"booking.calendarHelp": "Select the period you need. Greyed-out dates are not available for the chosen quantity ({{qty}}).",
			"booking.selectedPeriod": "Selected period:",
			"booking.fromTo": "From {{start}} to {{end}}",
			"booking.estimatedTotal": "Estimated total: {{total}}",
			"booking.name": "Full name",
			"booking.email": "Email",
			"booking.phone": "Phone",
			"booking.submit": "Request booking",
			"booking.sending": "Sending...",
			"booking.errPeriod": "Please select a period.",
			"booking.errMaxDays": "The maximum duration is {{max}} days. Contact us for a longer rental.",
			"booking.errBlocked": "The selected period includes unavailable dates.",
			"booking.errAvailable": "Only {{count}} available for this period.",
			"booking.errUnavailable": "This product is no longer available for this period.",
			"booking.errGeneric": "We could not send your request. Please check your details and try again.",
			"confirmation.title": "Request sent",
			"confirmation.text": "We will confirm availability within 24 hours. Keep your reference: together with your email, it lets you track your booking at any time.",
			"confirmation.close": "Close confirmation",
			"confirmation.copy": "Copy",
			"confirmation.copied": "Copied",
			"confirmation.copyError": "Could not copy: please select the reference manually.",
			"confirmation.product": "Product",
			"confirmation.period": "Period",
			"confirmation.total": "Estimated total",
			"confirmation.track": "Track my booking",
			"confirmation.whatsapp": "Confirm on WhatsApp",
			"quote.title": "My quote",
			"quote.subtitle": "Review your selection and tell us about your event",
			"quote.empty": "Your quote is empty.",
			"quote.browse": "Browse the catalogue",
			"quote.perUnit": "{{price}} / unit",
			"quote.remove": "Remove",
			"quote.totalPerDay": "Estimated total / day",
			"quote.formTitle": "Your details",
			"quote.fullName": "Full name",
			"quote.phone": "Phone",
			"quote.email": "Email",
			"quote.eventDate": "Event date",
			"quote.city": "City",
			"quote.eventType": "Event type",
			"quote.type.wedding": "Wedding",
			"quote.type.seminar": "Seminar",
			"quote.type.birthday": "Birthday",
			"quote.type.other": "Other",
			"quote.message": "Message",
			"quote.submit": "Send my request",
			"quote.sending": "Sending...",
			"quote.error": "Something went wrong while sending. Please try again.",
			"quote.thanksTitle": "Thank you!",
			"quote.thanksSubtitle": "Your request has been sent. We will get back to you within 24 hours.",
			"quote.back": "Back to catalogue",
			"reservations.title": "My bookings",
			"reservations.intro": "Enter the email you used when booking and the reference you received when you sent your request.",
			"reservations.emailLabel": "Email address",
			"reservations.emailPlaceholder": "you@example.com",
			"reservations.refLabel": "Booking reference",
			"reservations.submit": "Find my bookings",
			"reservations.error": "Something went wrong. Please try again in a moment.",
			"reservations.notFound": "No booking found. Please check the email and reference you entered.",
			"reservations.found_one": "{{count}} booking found",
			"reservations.found_other": "{{count}} bookings found",
			"reservations.statusConfirmed": "Confirmed",
			"reservations.statusCancelled": "Cancelled",
			"reservations.statusPending": "Pending",
			"reservations.msgConfirmed": "Booking confirmed. We will contact you about delivery.",
			"reservations.msgPending": "Waiting for confirmation from our team.",
			"reservations.msgCancelled": "This booking has been cancelled.",
			"reservations.quantity": "Quantity: {{count}}",
			"reservations.ref": "Ref. {{reference}}",
			"reservations.productFallback": "Product",
			"home.hero.eyebrow": "Event rentals",
			"home.hero.title": "Make your events shine",
			"home.hero.subtitle": "Weddings, seminars, galas: all the equipment you need, delivered and installed.",
			"home.hero.ctaCatalogue": "View the catalogue",
			"home.hero.ctaQuote": "Request a quote",
			"home.perks.delivery": "Delivery",
			"home.perks.deliveryDesc": "Across Morocco",
			"home.perks.install": "Installation",
			"home.perks.installDesc": "Dedicated technical team",
			"home.perks.premium": "Premium",
			"home.perks.premiumDesc": "Carefully maintained, recent equipment",
			"home.perks.quote24": "24h quote",
			"home.perks.quote24Desc": "Fast response guaranteed",
			"home.categories.eyebrow": "Our collections",
			"home.categories.title": "Categories",
			"home.selection.eyebrow": "Selection",
			"home.selection.title": "Most requested",
			"home.selection.seeAll": "See all →",
			"home.testimonials.eyebrow": "Excellence & Trust",
			"home.testimonials.title": "They trust us",
			"home.cta.title": "Planning an event?",
			"home.cta.subtitle": "Build your selection and receive a personalised quote within 24 hours.",
			"home.cta.button": "My quote",
			"home.gallery.title": "Our latest work",
			"home.gallery.subtitle": "Discover a few of our recent events",
			"home.gallery.empty": "No photos yet.",
			"home.gallery.seeAll": "See all our work",
			"contact.title": "Contact",
			"contact.subtitle": "Let's talk about your next event",
			"contact.address": "Address",
			"contact.addressValue": "Casablanca, Morocco",
			"contact.phone": "Phone",
			"contact.email": "Email",
			"contact.form.name": "Name",
			"contact.form.phone": "Phone",
			"contact.form.email": "Email",
			"contact.form.message": "Your message",
			"contact.form.submit": "Send",
			"contact.form.sending": "Sending...",
			"contact.form.error": "Something went wrong. Please try again.",
			"contact.sent.title": "Message sent",
			"contact.sent.text": "We will get back to you shortly.",
			"avis.title": "Leave us a review",
			"avis.subtitle": "Your feedback helps us improve.",
			"avis.rating": "Your rating",
			"avis.name": "Your name *",
			"avis.namePlaceholder": "E.g. Samira K.",
			"avis.role": "Role / Event (optional)",
			"avis.rolePlaceholder": "E.g. Bride · Casablanca",
			"avis.content": "Your review *",
			"avis.contentPlaceholder": "Tell us about your experience...",
			"avis.submit": "Send my review",
			"avis.sending": "Sending...",
			"avis.errorName": "Your name must contain at least 2 characters.",
			"avis.errorContent": "Your review must contain at least 20 characters.",
			"avis.errorGeneric": "Something went wrong. Please try again.",
			"avis.successTitle": "Thank you for your review!",
			"avis.successText": "Your review will be published after approval by our team.",
			"avis.backHome": "Back to home",
			"realisations.title": "Our Projects",
			"realisations.subtitle": "Discover our finest events",
			"realisations.empty": "No photos yet. Come back soon!",
			"realisations.close": "Close"
		} },
		ar: { translation: {
			"nav.home": "الرئيسية",
			"nav.catalogue": "الكتالوج",
			"nav.realisations": "أعمالنا",
			"nav.blog": "المدونة",
			"nav.about": "من نحن",
			"nav.contact": "اتصل بنا",
			"nav.devis": "طلب عرض سعر",
			"nav.whatsapp": "واتساب",
			"topbar.delivery": "التوصيل والتركيب في جميع أنحاء المغرب",
			"footer.rights": "جميع الحقوق محفوظة.",
			"footer.contact": "اتصل بنا",
			"footer.legal": "الإشعارات القانونية",
			"footer.privacy": "سياسة الخصوصية",
			"newsletter.title": "ابقَ على اطلاع",
			"newsletter.subtitle": "توصل بعروضنا وأفكارنا عبر البريد الإلكتروني.",
			"newsletter.placeholder": "بريدك الإلكتروني",
			"newsletter.button": "اشترك",
			"newsletter.sending": "جارٍ الاشتراك...",
			"newsletter.done": "تم الاشتراك ✓",
			"newsletter.success": "شكرًا لك! تم اشتراكك في النشرة الإخبارية.",
			"newsletter.already": "هذا البريد الإلكتروني مشترك بالفعل.",
			"newsletter.error": "حدث خطأ. يرجى المحاولة مرة أخرى.",
			"cta.title": "مشروع حدث؟ لنتحدث.",
			"cta.subtitle": "فريقنا يرد عليك بسرعة وبدون التزام.",
			"cta.contact": "اتصل بنا",
			"cta.whatsapp": "واتساب",
			"social.title": "انضم إلى مجتمعنا",
			"social.subtitle": "أخبار وإلهام في الوقت الفعلي",
			"social.follow": "تابعنا",
			"common.days_zero": "{{count}} يوم",
			"common.days_one": "يوم واحد",
			"common.days_two": "يومان",
			"common.days_few": "{{count}} أيام",
			"common.days_many": "{{count}} يومًا",
			"common.days_other": "{{count}} يوم",
			"common.units_zero": "{{count}} وحدة",
			"common.units_one": "وحدة واحدة",
			"common.units_two": "وحدتان",
			"common.units_few": "{{count}} وحدات",
			"common.units_many": "{{count}} وحدة",
			"common.units_other": "{{count}} وحدة",
			"catalogue.title": "الكتالوج",
			"catalogue.subtitle": "كل المعدات التي تحتاجها لإنجاح مناسبتك",
			"catalogue.all": "الكل",
			"catalogue.empty": "لا توجد منتجات متاحة في هذه الفئة حاليًا.",
			"category.notFound": "الفئة غير موجودة",
			"category.count_zero": "{{count}} منتج متاح",
			"category.count_one": "منتج واحد متاح",
			"category.count_two": "منتجان متاحان",
			"category.count_few": "{{count}} منتجات متاحة",
			"category.count_many": "{{count}} منتجًا متاحًا",
			"category.count_other": "{{count}} منتج متاح",
			"category.seeAll": "عرض كل الكتالوج ←",
			"category.empty": "لا توجد منتجات في هذه الفئة حاليًا.",
			"category.seeCatalogue": "تصفح الكتالوج",
			"product.from": "ابتداءً من",
			"product.outOfStockBadge": "نفد المخزون",
			"product.outOfStockToast": "هذا المنتج غير متوفر حاليًا.",
			"product.addedNamed": "تمت إضافة {{name}} إلى طلب العرض",
			"product.addToQuote": "أضف إلى طلب العرض",
			"product.addedToast": "تمت الإضافة إلى طلب العرض",
			"product.outOfStock": "نفد المخزون",
			"product.inStock": "متوفر في المخزون: {{count}}",
			"product.stockLeft": "المخزون المتبقي: {{count}}.",
			"product.perDay": "/ اليوم",
			"product.qtyLabel": "الكمية",
			"product.indicativePrice": "السعر تقريبي ولا يشمل التوصيل والتركيب.",
			"product.reserve": "احجز هذا المنتج",
			"product.cancelReserve": "إلغاء الحجز",
			"product.notFoundTitle": "المنتج غير موجود",
			"product.backToCatalogue": "العودة إلى الكتالوج",
			"product.related": "قد يعجبك أيضًا",
			"booking.title": "حجز «{{name}}»",
			"booking.calendarHelp": "اختر الفترة التي تناسبك. التواريخ الرمادية غير متاحة للكمية المختارة ({{qty}}).",
			"booking.selectedPeriod": "الفترة المختارة:",
			"booking.fromTo": "من {{start}} إلى {{end}}",
			"booking.estimatedTotal": "المجموع التقديري: {{total}}",
			"booking.name": "الاسم الكامل",
			"booking.email": "البريد الإلكتروني",
			"booking.phone": "رقم الهاتف",
			"booking.submit": "إرسال طلب الحجز",
			"booking.sending": "جارٍ الإرسال...",
			"booking.errPeriod": "يرجى اختيار الفترة.",
			"booking.errMaxDays": "المدة القصوى هي {{max}} يومًا. تواصل معنا لإيجار أطول.",
			"booking.errBlocked": "الفترة المختارة تتضمن تواريخ غير متاحة.",
			"booking.errAvailable": "المتوفر في هذه الفترة: {{count}} فقط.",
			"booking.errUnavailable": "هذا المنتج لم يعد متاحًا في هذه الفترة.",
			"booking.errGeneric": "تعذر إرسال الطلب. يرجى التحقق من بياناتك والمحاولة مرة أخرى.",
			"confirmation.title": "تم إرسال الطلب",
			"confirmation.text": "سنؤكد لك التوفر خلال 24 ساعة. احتفظ بالمرجع: بواسطته وببريدك الإلكتروني يمكنك تتبع حجزك في أي وقت.",
			"confirmation.close": "إغلاق التأكيد",
			"confirmation.copy": "نسخ",
			"confirmation.copied": "تم النسخ",
			"confirmation.copyError": "تعذر النسخ: يرجى تحديد المرجع يدويًا.",
			"confirmation.product": "المنتج",
			"confirmation.period": "الفترة",
			"confirmation.total": "المجموع التقديري",
			"confirmation.track": "تتبع حجزي",
			"confirmation.whatsapp": "التأكيد عبر واتساب",
			"quote.title": "طلب العرض الخاص بي",
			"quote.subtitle": "راجع اختيارك وأخبرنا بتفاصيل مناسبتك",
			"quote.empty": "طلب العرض فارغ.",
			"quote.browse": "تصفح الكتالوج",
			"quote.perUnit": "{{price}} / للوحدة",
			"quote.remove": "إزالة",
			"quote.totalPerDay": "المجموع التقديري / اليوم",
			"quote.formTitle": "بياناتك",
			"quote.fullName": "الاسم الكامل",
			"quote.phone": "رقم الهاتف",
			"quote.email": "البريد الإلكتروني",
			"quote.eventDate": "تاريخ المناسبة",
			"quote.city": "المدينة",
			"quote.eventType": "نوع المناسبة",
			"quote.type.wedding": "حفل زفاف",
			"quote.type.seminar": "ندوة",
			"quote.type.birthday": "عيد ميلاد",
			"quote.type.other": "أخرى",
			"quote.message": "رسالة",
			"quote.submit": "إرسال طلبي",
			"quote.sending": "جارٍ الإرسال...",
			"quote.error": "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
			"quote.thanksTitle": "شكرًا لك!",
			"quote.thanksSubtitle": "تم إرسال طلبك. سنرد عليك خلال 24 ساعة.",
			"quote.back": "العودة إلى الكتالوج",
			"reservations.title": "حجوزاتي",
			"reservations.intro": "أدخل البريد الإلكتروني الذي استعملته عند الحجز والمرجع الذي توصلت به عند إرسال طلبك.",
			"reservations.emailLabel": "البريد الإلكتروني",
			"reservations.emailPlaceholder": "you@example.com",
			"reservations.refLabel": "مرجع الحجز",
			"reservations.submit": "البحث عن حجوزاتي",
			"reservations.error": "حدث خطأ. يرجى المحاولة بعد قليل.",
			"reservations.notFound": "لم يتم العثور على أي حجز. تحقق من البريد الإلكتروني والمرجع المدخلين.",
			"reservations.found_zero": "{{count}} حجز",
			"reservations.found_one": "حجز واحد",
			"reservations.found_two": "حجزان",
			"reservations.found_few": "{{count}} حجوزات",
			"reservations.found_many": "{{count}} حجزًا",
			"reservations.found_other": "{{count}} حجز",
			"reservations.statusConfirmed": "مؤكد",
			"reservations.statusCancelled": "ملغى",
			"reservations.statusPending": "قيد الانتظار",
			"reservations.msgConfirmed": "تم تأكيد الحجز. سنتصل بك بخصوص التوصيل.",
			"reservations.msgPending": "في انتظار تأكيد فريقنا.",
			"reservations.msgCancelled": "تم إلغاء هذا الحجز.",
			"reservations.quantity": "الكمية: {{count}}",
			"reservations.ref": "المرجع: {{reference}}",
			"reservations.productFallback": "منتج",
			"home.hero.eyebrow": "تأجير معدات المناسبات",
			"home.hero.title": "أضف البهاء إلى مناسباتك",
			"home.hero.subtitle": "أعراس، ندوات، حفلات: كل المعدات التي تحتاجها، مع التوصيل والتركيب.",
			"home.hero.ctaCatalogue": "تصفح الكتالوج",
			"home.hero.ctaQuote": "اطلب عرض سعر",
			"home.perks.delivery": "التوصيل",
			"home.perks.deliveryDesc": "في جميع أنحاء المغرب",
			"home.perks.install": "التركيب",
			"home.perks.installDesc": "فريق تقني متخصص",
			"home.perks.premium": "مستوى راقٍ",
			"home.perks.premiumDesc": "معدات حديثة وعناية فائقة",
			"home.perks.quote24": "عرض سعر خلال 24 ساعة",
			"home.perks.quote24Desc": "رد سريع مضمون",
			"home.categories.eyebrow": "عوالمنا",
			"home.categories.title": "الفئات",
			"home.selection.eyebrow": "مختارات",
			"home.selection.title": "الأكثر طلبًا",
			"home.selection.seeAll": "عرض الكل ←",
			"home.testimonials.eyebrow": "التميز والثقة",
			"home.testimonials.title": "يثقون بنا",
			"home.cta.title": "لديك مشروع مناسبة؟",
			"home.cta.subtitle": "جهّز اختيارك واحصل على عرض سعر مخصص خلال 24 ساعة.",
			"home.cta.button": "طلب العرض",
			"home.gallery.title": "أحدث أعمالنا",
			"home.gallery.subtitle": "اكتشف بعضًا من مناسباتنا الأخيرة",
			"home.gallery.empty": "لا توجد صور حاليًا.",
			"home.gallery.seeAll": "عرض كل أعمالنا",
			"contact.title": "اتصل بنا",
			"contact.subtitle": "لنتحدث عن مناسبتك القادمة",
			"contact.address": "العنوان",
			"contact.addressValue": "الدار البيضاء، المغرب",
			"contact.phone": "الهاتف",
			"contact.email": "البريد الإلكتروني",
			"contact.form.name": "الاسم",
			"contact.form.phone": "الهاتف",
			"contact.form.email": "البريد الإلكتروني",
			"contact.form.message": "رسالتك",
			"contact.form.submit": "إرسال",
			"contact.form.sending": "جارٍ الإرسال...",
			"contact.form.error": "حدث خطأ. يرجى المحاولة مرة أخرى.",
			"contact.sent.title": "تم إرسال الرسالة",
			"contact.sent.text": "سنعود إليك قريبًا.",
			"avis.title": "اترك لنا تقييمًا",
			"avis.subtitle": "رأيك يساعدنا على التحسّن.",
			"avis.rating": "تقييمك",
			"avis.name": "اسمك *",
			"avis.namePlaceholder": "مثال: سميرة ك.",
			"avis.role": "الدور / المناسبة (اختياري)",
			"avis.rolePlaceholder": "مثال: عروس · الدار البيضاء",
			"avis.content": "تقييمك *",
			"avis.contentPlaceholder": "أخبرنا عن تجربتك...",
			"avis.submit": "إرسال تقييمي",
			"avis.sending": "جارٍ الإرسال...",
			"avis.errorName": "يجب أن يحتوي اسمك على حرفين على الأقل.",
			"avis.errorContent": "يجب أن يحتوي تقييمك على 20 حرفًا على الأقل.",
			"avis.errorGeneric": "حدث خطأ. يرجى المحاولة مرة أخرى.",
			"avis.successTitle": "شكرًا على تقييمك!",
			"avis.successText": "سيُنشر تقييمك بعد مصادقة فريقنا.",
			"avis.backHome": "العودة إلى الرئيسية",
			"realisations.title": "أعمالنا",
			"realisations.subtitle": "اكتشف أجمل مناسباتنا",
			"realisations.empty": "لا توجد صور حاليًا. عد قريبًا!",
			"realisations.close": "إغلاق"
		} }
	},
	lng: "fr",
	fallbackLng: "fr",
	initAsync: false,
	interpolation: { escapeValue: false },
	react: { useSuspense: false }
});
if (typeof document !== "undefined") {
	const applyDocumentLanguage = (lng) => {
		document.documentElement.lang = lng;
		document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
	};
	instance.on("languageChanged", (lng) => {
		applyDocumentLanguage(lng);
		try {
			localStorage.setItem("lng", lng);
		} catch {}
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "google-site-verification",
				content: "kA1VTRgE3qiS6OOBIUp7VGv4KPOY2qIsVDE9RRiPJkA"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Éclat Events — Location de matériel événementiel au Maroc" },
			{
				name: "description",
				content: "Mobilier, tentes, sonorisation et art de la table en location pour vos mariages et événements au Maroc."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "Éclat Events — Location de matériel événementiel"
			},
			{
				property: "og:description",
				content: "Mobilier, tentes, son & lumière en location partout au Maroc."
			},
			{
				property: "og:image",
				content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop"
			},
			{
				property: "og:site_name",
				content: "Éclat Events"
			},
			{
				property: "og:locale",
				content: "fr_FR"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Éclat Events — Location de matériel événementiel"
			},
			{
				name: "twitter:description",
				content: "Mobilier, tentes, son & lumière en location partout au Maroc."
			},
			{
				name: "twitter:image",
				content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Karla:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QuoteProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieBanner, {})
		] })
	});
}
var $$splitComponentImporter$12 = () => import("./routes-BMWjTMIs.mjs");
var Route$14 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Éclat Events — Location de matériel événementiel au Maroc" },
		{
			name: "description",
			content: "Mobilier, tentes, sonorisation et art de la table en location pour vos mariages et événements au Maroc."
		},
		{
			property: "og:title",
			content: "Éclat Events — Location de matériel événementiel"
		},
		{
			property: "og:description",
			content: "Mobilier, tentes, son & lumière en location partout au Maroc."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&h=630&fit=crop"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./a-propos-B3jsGWFY.mjs");
var Route$13 = createFileRoute("/a-propos")({
	head: () => ({ meta: [
		{ title: "À propos — Éclat Events" },
		{
			name: "description",
			content: "Découvrez Éclat Events, spécialiste de la location de matériel événementiel au Maroc."
		},
		{
			property: "og:title",
			content: "À propos — Éclat Events"
		},
		{
			property: "og:description",
			content: "Notre histoire et notre savoir-faire."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin-CruCtuFI.mjs");
var Route$12 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — Éclat Events" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./avis-CBETngyR.mjs");
var Route$11 = createFileRoute("/avis")({
	head: () => ({ meta: [
		{ title: "Laisser un avis — Éclat Events" },
		{
			name: "description",
			content: "Partagez votre expérience avec Éclat Events. Votre avis nous aide à nous améliorer."
		},
		{
			property: "og:title",
			content: "Laisser un avis — Éclat Events"
		},
		{
			property: "og:description",
			content: "Partagez votre expérience avec Éclat Events."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./blog-IXcm8bVZ.mjs");
var Route$10 = createFileRoute("/blog")({
	head: () => ({ meta: [{ title: "Blog — Éclat Events" }, {
		name: "description",
		content: "Conseils, inspirations et actualités pour vos événements."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./cgv-CdM1qAb0.mjs");
var Route$9 = createFileRoute("/cgv")({
	head: () => ({ meta: [
		{ title: "Conditions Générales de Vente — Éclat Events" },
		{
			name: "description",
			content: "Conditions générales de vente et de location de matériel événementiel d'Éclat Events."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./confidentialite-BcOtgRd5.mjs");
var Route$8 = createFileRoute("/confidentialite")({
	head: () => ({ meta: [
		{ title: "Politique de confidentialité — Éclat Events" },
		{
			name: "description",
			content: "Comment Éclat Events collecte et protège vos données personnelles, conformément à la loi 09-08."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./contact-1KDogmeg.mjs");
var Route$7 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — Éclat Events" },
		{
			name: "description",
			content: "Contactez Éclat Events pour toute demande de location de matériel événementiel."
		},
		{
			property: "og:title",
			content: "Contact — Éclat Events"
		},
		{
			property: "og:description",
			content: "Parlons de votre événement."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./devis-B1cRdnO5.mjs");
var Route$6 = createFileRoute("/devis")({
	head: () => ({ meta: [
		{ title: "Mon devis — Éclat Events" },
		{
			name: "description",
			content: "Finalisez votre sélection de matériel et envoyez votre demande de devis."
		},
		{
			property: "og:title",
			content: "Mon devis — Éclat Events"
		},
		{
			property: "og:description",
			content: "Envoyez votre demande de devis de location."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./faq-CIh9qrzy.mjs");
var Route$5 = createFileRoute("/faq")({
	head: () => ({ meta: [{ title: "FAQ — Éclat Events" }, {
		name: "description",
		content: "Réponses aux questions fréquentes sur la location de matériel événementiel au Maroc."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./mentions-legales-C-cb5QZR.mjs");
var Route$4 = createFileRoute("/mentions-legales")({
	head: () => ({ meta: [
		{ title: "Mentions légales — Éclat Events" },
		{
			name: "description",
			content: "Mentions légales du site Éclat Events, location de matériel événementiel au Maroc."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./mes-reservations-BVeSsJNk.mjs");
var Route$3 = createFileRoute("/mes-reservations")({
	head: () => ({ meta: [{ title: "Mes réservations — Éclat Events" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./realisations-BEWQwMBL.mjs");
var Route$2 = createFileRoute("/realisations")({
	head: () => ({ meta: [{ title: "Réalisations — Éclat Events" }, {
		name: "description",
		content: "Découvrez nos plus beaux événements réalisés au Maroc."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$1 = createFileRoute("/robots.txt")({ server: { handlers: { GET: () => {
	return new Response(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /devis
Disallow: /mes-reservations
Disallow: /avis
Disallow: /api/

Sitemap: https://party-kit-marketplace.vercel.app/sitemap.xml
`, { headers: { "Content-Type": "text/plain" } });
} } } });
var Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: () => {
	const baseUrl = "https://party-kit-marketplace.vercel.app";
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const staticPages = [
		{
			path: "/",
			priority: "1.0"
		},
		{
			path: "/catalogue",
			priority: "0.9"
		},
		{
			path: "/realisations",
			priority: "0.8"
		},
		{
			path: "/blog",
			priority: "0.7"
		},
		{
			path: "/a-propos",
			priority: "0.6"
		},
		{
			path: "/contact",
			priority: "0.6"
		}
	];
	const categoryPages = categories.map((c) => ({
		path: `/catalogue/${c.slug}`,
		priority: "0.8"
	}));
	const productPages = products.map((p) => ({
		path: `/produit/${p.slug}`,
		priority: "0.7"
	}));
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
		...staticPages,
		...categoryPages,
		...productPages
	].map((page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml" } });
} } } });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AProposRoute = Route$13.update({
	id: "/a-propos",
	path: "/a-propos",
	getParentRoute: () => Route$15
});
var AdminRoute = Route$12.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$15
});
var AvisRoute = Route$11.update({
	id: "/avis",
	path: "/avis",
	getParentRoute: () => Route$15
});
var BlogRoute = Route$10.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$15
});
var CgvRoute = Route$9.update({
	id: "/cgv",
	path: "/cgv",
	getParentRoute: () => Route$15
});
var ConfidentialiteRoute = Route$8.update({
	id: "/confidentialite",
	path: "/confidentialite",
	getParentRoute: () => Route$15
});
var ContactRoute = Route$7.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$15
});
var DevisRoute = Route$6.update({
	id: "/devis",
	path: "/devis",
	getParentRoute: () => Route$15
});
var FaqRoute = Route$5.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$15
});
var MentionsLegalesRoute = Route$4.update({
	id: "/mentions-legales",
	path: "/mentions-legales",
	getParentRoute: () => Route$15
});
var MesReservationsRoute = Route$3.update({
	id: "/mes-reservations",
	path: "/mes-reservations",
	getParentRoute: () => Route$15
});
var RealisationsRoute = Route$2.update({
	id: "/realisations",
	path: "/realisations",
	getParentRoute: () => Route$15
});
var RobotsDottxtRoute = Route$1.update({
	id: "/robots.txt",
	path: "/robots.txt",
	getParentRoute: () => Route$15
});
var SitemapDotxmlRoute = Route.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$15
});
var BlogSlugRoute = Route$16.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var CatalogueIndexRoute = Route$18.update({
	id: "/catalogue/",
	path: "/catalogue/",
	getParentRoute: () => Route$15
});
var CatalogueCategorieRoute = Route$17.update({
	id: "/catalogue/$categorie",
	path: "/catalogue/$categorie",
	getParentRoute: () => Route$15
});
var ProduitSlugRoute = Route$19.update({
	id: "/produit/$slug",
	path: "/produit/$slug",
	getParentRoute: () => Route$15
});
var BlogRouteChildren = { BlogSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AProposRoute,
	AdminRoute,
	AvisRoute,
	BlogRoute: BlogRoute._addFileChildren(BlogRouteChildren),
	CgvRoute,
	ConfidentialiteRoute,
	ContactRoute,
	DevisRoute,
	FaqRoute,
	MentionsLegalesRoute,
	MesReservationsRoute,
	RealisationsRoute,
	RobotsDottxtRoute,
	SitemapDotxmlRoute,
	CatalogueCategorieRoute,
	ProduitSlugRoute,
	CatalogueIndexRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
