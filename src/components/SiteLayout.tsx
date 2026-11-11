import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Globe } from "lucide-react";
import { useQuote } from "@/lib/quote";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useRestoreLanguage } from "@/lib/use-locale";
import { useReveal } from "@/lib/use-reveal";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { count } = useQuote();
  const { t, i18n } = useTranslation();
  useRestoreLanguage();
  useReveal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouterState();
  const pathname = router.location.pathname;

  const whatsappNumber = "212691055597";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t("topbar.whatsappMessage"))}`;

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/catalogue", label: t("nav.catalogue") },
    { to: "/realisations", label: t("nav.realisations") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/a-propos", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const services = [
    { slug: "mobilier", label: t("service.mobilier") },
    { slug: "tentes", label: t("service.tentes") },
    { slug: "son-lumiere", label: t("service.sonLumiere") },
    { slug: "art-de-table", label: t("service.artTable") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleNewsletter = async (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const btn = form.querySelector("button") as HTMLButtonElement;

    if (!emailInput.value) return;
    btn.disabled = true;
    btn.textContent = t("newsletter.sending");

    const { error } = await (supabase as any).from("newsletter").insert({ email: emailInput.value });

    if (error) {
      alert(error.code === "23505" ? t("newsletter.already") : t("newsletter.error"));
      btn.disabled = false;
      btn.textContent = t("newsletter.button");
    } else {
      alert(t("newsletter.success"));
      emailInput.value = "";
      btn.textContent = t("newsletter.done");
    }
  };

  const socialCard =
    "bg-[#111C2E] hover:bg-[#1a263a] p-6 rounded flex flex-col items-center justify-center gap-3 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1";

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="tel:+212691055597" className="flex items-center gap-2 hover:text-white transition-colors" dir="ltr">
            <Phone className="h-3 w-3" /> +212 6 91 05 55 97
          </a>
          <span className="hidden sm:block">{t("topbar.delivery")}</span>
        </div>
      </div>

      <header className="bg-background border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-display text-3xl tracking-wide text-primary" dir="ltr">
            Éclat<span className="text-foreground">Events</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-sm uppercase tracking-widest hover:text-primary transition-colors ${pathname === link.to ? "text-primary font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 border rounded px-2 py-1 text-xs">
              <Globe className="h-3 w-3 text-zinc-500" />
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                aria-label="Language"
                className="bg-transparent focus:outline-none cursor-pointer uppercase"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 text-sm rounded hover:bg-[#20b858] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="font-medium">{t("nav.whatsapp")}</span>
            </a>

            <Link
              to="/devis"
              className="hidden sm:flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t("nav.devis")} {count > 0 && `(${count})`}
            </Link>

            <button
              className="md:hidden p-2 -m-2"
              aria-label={t("nav.menu")}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest py-1 ${pathname === link.to ? "text-primary font-semibold" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/mes-reservations" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-1">
                {t("nav.myBookings")}
              </Link>
              <div className="flex gap-2 pt-2 border-t">
                {["fr", "en", "ar"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`px-4 py-2 text-xs border rounded uppercase ${i18n.language === lng ? "bg-zinc-900 text-white" : ""}`}
                  >
                    {lng}
                  </button>
                ))}
              </div>
              <Link to="/devis" onClick={() => setMobileMenuOpen(false)} className="bg-zinc-900 text-white text-center py-3 text-sm uppercase tracking-widest mt-2">
                {t("nav.devis")} {count > 0 && `(${count})`}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <section className="bg-[#0B1729] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8" data-reveal>
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{t("cta.title")}</h2>
            <p className="text-zinc-400">{t("cta.subtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link to="/contact" className="bg-[#D4AF37] text-zinc-900 px-8 py-3 font-medium hover:bg-[#c29e2f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              {t("cta.contact")}
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="border border-zinc-600 px-8 py-3 font-medium flex items-center gap-2 hover:bg-white hover:text-zinc-900 transition-all duration-300 hover:-translate-y-0.5">
              <MessageCircle className="h-4 w-4" /> {t("cta.whatsapp")}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1729] text-white py-20 text-center border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6" data-reveal>
          <span className="inline-block border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6">
            {t("social.follow")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl mb-6">{t("social.title")}</h2>
          <div className="h-[2px] w-16 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-zinc-400 mb-12 text-lg">{t("social.subtitle")}</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a href="#" className={socialCard}>
              <svg className="h-8 w-8 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              <span className="text-xs font-semibold tracking-wide uppercase">Facebook</span>
            </a>
            <a href="#" className={socialCard}>
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="url(#ig-gradient)"><defs><linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FD5949" /><stop offset="50%" stopColor="#D6249F" /><stop offset="100%" stopColor="#285AEB" /></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              <span className="text-xs font-semibold tracking-wide uppercase">Instagram</span>
            </a>
            <a href="#" className={socialCard}>
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /></svg>
              <span className="text-xs font-semibold tracking-wide uppercase">TikTok</span>
            </a>
            <a href="#" className={socialCard}>
              <svg className="h-8 w-8 text-[#229ED9]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              <span className="text-xs font-semibold tracking-wide uppercase">Telegram</span>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={socialCard}>
              <svg className="h-8 w-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              <span className="text-xs font-semibold tracking-wide uppercase">WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#0B1729] text-zinc-400 py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl text-white mb-4" dir="ltr">ÉclatEvents</h3>
            <p className="text-sm leading-relaxed mb-6">{t("footer.about")}</p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="p-2 bg-[#111C2E] rounded hover:bg-[#1877F2] hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="p-2 bg-[#111C2E] rounded hover:bg-[#E4405F] hover:text-white transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 bg-[#111C2E] rounded hover:bg-[#25D366] hover:text-white transition-colors"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">{t("footer.navigation")}</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
              <li><Link to="/mes-reservations" className="hover:text-white transition-colors">{t("nav.myBookings")}</Link></li>
              <li><Link to="/avis" className="hover:text-white transition-colors">{t("nav.review")}</Link></li>
              <li><Link to="/devis" className="hover:text-white transition-colors">{t("nav.devis")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">{t("footer.services")}</h4>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/catalogue/$categorie" params={{ categorie: s.slug }} className="hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#D4AF37] shrink-0" /><a href="tel:+212691055597" dir="ltr" className="hover:text-white transition-colors">+212 6 91 05 55 97</a></li>
              <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" /><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t("nav.whatsapp")}</a></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#D4AF37] shrink-0" /><a href="mailto:contact@eclat-events.ma" className="hover:text-white transition-colors">contact@eclat-events.ma</a></li>
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" /><span>{t("footer.address")}</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-white font-display text-2xl mb-2">{t("newsletter.title")}</h4>
              <p className="text-sm">{t("newsletter.subtitle")}</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder={t("newsletter.placeholder")}
                aria-label={t("newsletter.placeholder")}
                required
                className="flex-1 min-w-0 bg-[#111C2E] border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
              <button type="submit" className="bg-[#D4AF37] text-zinc-900 px-6 py-3 text-sm font-medium hover:bg-[#c29e2f] transition-colors disabled:opacity-60">
                {t("newsletter.button")}
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Éclat Events. {t("footer.rights")}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">{t("footer.legal")}</Link>
            <Link to="/confidentialite" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
            <Link to="/cgv" className="hover:text-white transition-colors">{t("footer.cgv")}</Link>
            <Link to="/faq" className="hover:text-white transition-colors">{t("footer.faq")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-zinc-950 text-white py-20 md:py-28 text-center px-6">
      <h1 className="font-display text-4xl md:text-6xl mb-4">{title}</h1>
      {subtitle && <p className="text-zinc-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </div>
  );
}