import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      "nav.home": "Accueil",
      "nav.catalogue": "Catalogue",
      "nav.about": "À propos",
      "nav.contact": "Contact",
      "nav.devis": "Devis",
      "nav.whatsapp": "WhatsApp",
      "footer.rights": "Tous droits réservés.",
      "cta.title": "Un projet événementiel ? Parlons-en.",
      "cta.subtitle": "Notre équipe vous répond rapidement et sans engagement.",
      "cta.contact": "Nous contacter",
      "cta.whatsapp": "WhatsApp",
      "social.title": "Rejoignez notre communauté",
      "social.subtitle": "Actualités et inspirations en temps réel",
      "social.follow": "Suivez-nous"
    }
  },
  en: {
    translation: {
      "nav.home": "Home",
      "nav.catalogue": "Catalogue",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.devis": "Quote",
      "nav.whatsapp": "WhatsApp",
      "footer.rights": "All rights reserved.",
      "cta.title": "An event project? Let's talk.",
      "cta.subtitle": "Our team responds quickly and without obligation.",
      "cta.contact": "Contact us",
      "cta.whatsapp": "WhatsApp",
      "social.title": "Join our community",
      "social.subtitle": "News and inspirations in real time",
      "social.follow": "Follow us"
    }
  },
  ar: {
    translation: {
      "nav.home": "الرئيسية",
      "nav.catalogue": "الكتالوج",
      "nav.about": "من نحن",
      "nav.contact": "اتصل بنا",
      "nav.devis": "طلب عرض سعر",
      "nav.whatsapp": "واتساب",
      "footer.rights": "جميع الحقوق محفوظة.",
      "cta.title": "مشروع حدث؟ لنتحدث.",
      "cta.subtitle": "فريقنا يرد عليك بسرعة وبدون التزام.",
      "cta.contact": "اتصل بنا",
      "cta.whatsapp": "واتساب",
      "social.title": "انضم إلى مجتمعنا",
      "social.subtitle": "أخبار وإلهام في الوقت الفعلي",
      "social.follow": "تابعنا"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr", // Langue par défaut
  fallbackLng: "fr",
  interpolation: { escapeValue: false }
});

export default i18n;