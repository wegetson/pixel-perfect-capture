import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Cloud, BarChart3, Target, Wrench, Mail, Phone, Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingAnimation } from "@/components/marketing-animation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "hs-marketing.pl — Strony WWW bez hostingu i kampanie Google & Meta Ads" },
      {
        name: "description",
        content:
          "Szybkie strony WWW bez opłat za hosting, analityka GA4 + GTM oraz kampanie Google Ads i Meta Ads nastawione na klientów.",
      },
      { property: "og:title", content: "hs-marketing.pl — Strony WWW i marketing, który generuje klientów" },
      {
        property: "og:description",
        content: "0 zł za hosting, pełna analityka i kampanie Google & Meta Ads. Bez korpo-bełkotu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});


const NAV = [
  { href: "#dlaczego", label: "Dlaczego my" },
  { href: "#pakiety", label: "Pakiety" },
  { href: "#cennik", label: "Cennik" },
  { href: "#kontakt", label: "Kontakt" },
];

function Logo({ footer = false }: { footer?: boolean }) {
  return <a href="#top" className={footer ? "footer-wordmark" : "wordmark"} aria-label="hs-marketing — strona główna">hs-marketing<span>.pl</span></a>;
}

function CTA({ href = "#kontakt", children, outline = false }: { href?: string; children: React.ReactNode; outline?: boolean }) {
  return <Button asChild variant={outline ? "outline" : "default"} className="adfin-button"><a href={href}>{children}<ArrowRight size={16} /></a></Button>;
}

function Index() {
  return <div id="top" className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="page-frame"><Hero /><Packages /><Why /><PriceList /><Contact /></main>
    <Footer />
  </div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  return <header className="site-header">
    {notice && <div className="announcement"><a href="#pakiety">Strony WWW bez opłat za hosting. Poznaj pakiety <ArrowRight size={14} /></a><Button variant="ghost" size="icon" aria-label="Zamknij informację" onClick={() => setNotice(false)}><X size={15} /></Button></div>}
    <nav className="navigation">
      <Logo />
      <ul className="desktop-links">{NAV.map((n, i) => <li key={n.href}><a href={n.href}>{n.label}{i < 2 && <ChevronDown size={12} />}</a></li>)}</ul>
      <div className="navigation-cta"><CTA>Darmowa wycena</CTA></div>
      <Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </nav>
    {open && <div className="mobile-links">{NAV.map(n => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}<ArrowRight size={16} /></a>)}<CTA>Darmowa wycena</CTA></div>}
  </header>;
}

function Hero() {
  return <section className="hero section-inner">
    <div className="hero-pattern" aria-hidden="true"><span /><span /><span /></div>
    <div className="hero-copy">
      <span className="accent-line" aria-hidden="true" />
      <h1>Prosty marketing.<br />Więcej klientów.</h1>
      <p>Strony WWW i kampanie reklamowe, które naprawdę generują klientów.</p>
      <CTA>Dowiedz się więcej</CTA>
    </div>
    <div className="hero-art"><MarketingAnimation /></div>
  </section>;
}

function SectionHead({ title, sub, label }: { title: string; sub?: string; label: string }) {
  return <div className="section-heading"><span className="eyebrow"><span />{label}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

function Packages() {
  const plans = [
    {
      name: "START", sub: "Obecność w Sieci", tag: "Idealne na początek", price: "1 290 zł", oldPrice: "1 899 zł", note: "netto, jednorazowo",
      features: ["Nowoczesna strona WWW / Landing Page (GitHub + Cloudflare)", "0 zł opłat za hosting", "Konfiguracja GA4 + Google Tag Manager", "Konfiguracja Google Search Console", "Wizytówka Google Moja Firma"],
    },
    {
      name: "BIZNES", sub: "Strona + Klient", tag: "Najchętniej wybierany", price: "2 190 zł", oldPrice: "3 699 zł", note: "netto na start, z 1. miesiącem obsługi", after: "Od 2. miesiąca: 650 zł netto / mc", featured: true,
      features: ["Wszystko z Pakietu START", "Setup kampanii Google Ads LUB Meta Ads", "Konfiguracja śledzenia konwersji i zdarzeń", "1. miesiąc prowadzenia i optymalizacji kampanii w cenie"],
    },
    {
      name: "PRO GROWTH", sub: "Pełny Ekosystem", tag: "Dla wymagających", price: "3 290 zł", oldPrice: "4 999 zł", note: "netto na start", after: "Od 2. miesiąca: 1 150 zł netto / mc",
      features: ["Rozbudowana strona WWW (Cloudflare)", "Pełna analityka (GA4 + GTM + GSC + Pixel Meta)", "Setup + 1. miesiąc prowadzenia Google Ads ORAZ Meta Ads", "Konfiguracja domen, firmowej poczty e-mail i wsparcie techniczne"],
    },
  ];
  return <section id="pakiety" className="section-block section-inner">
    <SectionHead label="PAKIETY" title="Wybierz pakiet dopasowany do Twojego biznesu" sub="Przejrzyste warunki, zero ukrytych kosztów." />
    <div className="package-grid">{plans.map(p => <article key={p.name} className={`package ${p.featured ? "package-featured" : ""}`}>
      <div className="package-tag">{p.tag}</div>
      <h3>{p.name}</h3><p className="package-sub">{p.sub}</p>
      <div className="package-pricing"><span>{p.price}</span><del>{p.oldPrice}</del></div>
      <p className="package-note">{p.note}</p>
      <p className="package-after">{p.after || "Bez stałych opłat za hosting"}</p>
      <ul>{p.features.map(f => <li key={f}><Check size={16} />{f}</li>)}</ul>
      <CTA outline={!p.featured}>Wybieram {p.name}</CTA>
    </article>)}</div>
  </section>;
}

function Why() {
  const items = [
    { Icon: Cloud, t: "Strony bez stałych opłat", d: "Kod hostowany na Cloudflare. Płacisz raz za wykonanie strony i nie płacisz co rok setek złotych za hosting." },
    { Icon: BarChart3, t: "Pełna analityka (GA4 & GTM)", d: "Podpinam komplet narzędzi Google i mierzę każdą konwersję (formularze, maile, telefon)." },
    { Icon: Target, t: "Kampanie zorientowane na ROI", d: "Konfiguracja i obsługa Google Ads oraz Meta Ads skupiona na pozyskiwaniu realnych zapytań." },
    { Icon: Wrench, t: "Wsparcie techniczne w sieci", d: "Pomoc w konfiguracji domen, poczty firmowej i Wizytówki Google Moja Firma." },
  ];
  return <section id="dlaczego" className="section-block section-inner">
    <SectionHead label="DLACZEGO HS-MARKETING" title="Strona i marketing. Jeden spójny ekosystem." />
    <div className="benefit-grid"><div className="ecosystem"><div className="ecosystem-symbols"><Globe /><BarChart3 /><Target /></div><div><h3>Dlaczego hs-marketing?</h3><p>Strony WWW, analityka i reklamy nastawione na realne zapytania.</p></div></div>
    <div className="benefits">{items.map(({ Icon, t, d }) => <article key={t}><Icon size={22} strokeWidth={1.5} /><h3>{t}</h3><p>{d}</p></article>)}</div></div>
    <div className="section-bottom"><p>0 zł za hosting. Pełna analityka. Skuteczne kampanie.</p><a href="#kontakt">Porozmawiajmy o Twoim projekcie <ArrowRight size={16} /></a></div>
  </section>;
}

function PriceList() {
  const rows = [
    ["Strona WWW (Cloudflare)", "od 990 zł netto"],
    ["Pełny Setup Analityczny (GA4 + GTM + Search Console)", "490 zł netto"],
    ["Podpięcie Google Tag Manager (GTM)", "250 zł netto"],
    ["Setup Kampanii Google Ads lub Meta Ads", "490 zł netto / platforma"],
    ["Obsługa Kampanii Google Ads / Meta Ads", "od 590 zł netto / miesiąc"],
    ["Prowadzenie Google Ads + Meta Ads (Pakiet)", "od 990 zł netto / miesiąc"],
    ["Drobne prace i wsparcie techniczne", "120 zł netto / godzina"],
  ];
  return <section id="cennik" className="section-block section-inner pricing-section">
    <SectionHead label="POJEDYNCZE USŁUGI" title="Potrzebujesz konkretnej usługi?" sub="Cennik pojedynczych usług — bez pakietów." />
    <ul className="price-list">{rows.map(([s,p], i) => <li key={s}><span className="service-number">{String(i + 1).padStart(2,"0")}</span><span>{s}</span><strong>{p}</strong></li>)}</ul>
  </section>;
}

function Contact() {
  const options = ["Strona WWW", "Google Ads", "Meta Ads", "Analityka / GTM", "Inne"];
  const [picked, setPicked] = useState<string[]>([]);
  const [prepared, setPrepared] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Imię / firma: ${f.get("name")}\nKontakt: ${f.get("contact")}\nZainteresowanie: ${picked.join(", ") || "-"}\n\n${f.get("msg")}`;
    window.location.href = `mailto:hs-marketing@gmail.com?subject=${encodeURIComponent("Zapytanie ze strony")}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <section id="kontakt" className="section-block section-inner contact-section">
    <SectionHead label="KONTAKT" title="Zróbmy coś razem." sub="Wypełnij krótki formularz lub napisz bezpośrednio. Odpowiadam w ciągu 24h." />
    <div className="contact-grid"><form onSubmit={submit}>
      <div className="form-row"><label>Imię i Nazwisko / Nazwa firmy<input name="name" required autoComplete="name" /></label><label>Adres e-mail lub numer telefonu<input name="contact" required autoComplete="email" /></label></div>
      <fieldset><legend>Czym jesteś zainteresowany?</legend><div className="interest-options">{options.map(o => <label key={o}><input type="checkbox" checked={picked.includes(o)} onChange={() => setPicked(p => p.includes(o) ? p.filter(x => x !== o) : [...p,o])} /><span>{o}</span></label>)}</div></fieldset>
      <label>Krótki opis projektu<textarea name="msg" rows={4} /></label>
      <Button type="submit" className="adfin-button">Wyślij zapytanie<ArrowRight size={16} /></Button>
      {prepared && <p className="form-status" role="status">Zapytanie jest gotowe w Twoim programie pocztowym. Wyślij wiadomość, aby je dostarczyć.</p>}
    </form><aside><h3>Kontakt bezpośredni</h3>{[
      { Icon: Mail, l: "Email", v: "hs-marketing@gmail.com", h: "mailto:hs-marketing@gmail.com" },
      { Icon: Phone, l: "WhatsApp / Telefon", v: "535 009 931", h: "tel:+48535009931" },
      { Icon: Globe, l: "Domena", v: "hs-marketing.pl", h: "https://hs-marketing.pl" },
    ].map(({Icon,l,v,h}) => <div className="contact-detail" key={l}><Icon size={19} /><div><p>{l}</p><a href={h}>{v}</a></div></div>)}</aside></div>
  </section>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-frame"><div className="footer-top"><div><span className="eyebrow"><span />HS-MARKETING.PL</span><h2>Twój kolejny krok?<br />Więcej klientów.</h2></div><CTA outline>Porozmawiajmy</CTA></div><div className="footer-links"><div><h3>Oferta</h3><a href="#pakiety">Pakiety usług</a><a href="#cennik">Cennik</a><a href="#dlaczego">Dlaczego my</a></div><div><h3>Usługi</h3><a href="#pakiety">Strony WWW</a><a href="#cennik">Google Ads i Meta Ads</a><a href="#cennik">Analityka GA4 i GTM</a></div><div><h3>Kontakt</h3><a href="mailto:hs-marketing@gmail.com">hs-marketing@gmail.com</a><a href="tel:+48535009931">535 009 931</a><a href="#kontakt">Darmowa wycena</a></div></div><div className="footer-legal">© 2026 hs-marketing. Wszystkie prawa zastrzeżone.<a href="#top">Wróć na górę <ArrowRight size={14} /></a></div><Logo footer /></div></footer>;
}
