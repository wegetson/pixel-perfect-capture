import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Cloud, Globe, Target, Wrench } from "lucide-react";
import { CTA, ContactSection, Footer, Navbar, PriceList, SectionHead } from "@/components/site";
import { MarketingAnimation } from "@/components/marketing-animation";
import { track } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "hsmarketing.pl — Strony WWW bez hostingu i kampanie Google & Meta Ads" },
      {
        name: "description",
        content:
          "Szybkie strony WWW bez opłat za hosting, analityka GA4 + GTM oraz kampanie Google Ads i Meta Ads nastawione na klientów.",
      },
      { property: "og:title", content: "hsmarketing.pl — Strony WWW i marketing, który generuje klientów" },
      {
        property: "og:description",
        content: "0 zł za hosting, pełna analityka i kampanie Google & Meta Ads. Bez korpo-bełkotu.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "hsmarketing.pl" },
      { property: "og:locale", content: "pl_PL" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "hsmarketing.pl",
          description:
            "Szybkie strony WWW bez opłat za hosting, analityka GA4 + GTM oraz kampanie Google Ads i Meta Ads.",
          email: "hsmarketing.pl@gmail.com",
          areaServed: "PL",
          priceRange: "1290-3290 PLN",
        }),
      },
    ],
  }),
  component: Index,
});

function Hero() {
  return <section className="hero section-inner">
    <div className="hero-pattern" aria-hidden="true"><span /><span /><span /></div>
    <div className="hero-copy">
      <span className="accent-line" aria-hidden="true" />
      <h1>Skuteczny marketing.<br />Więcej klientów.</h1>
      <p>Strony WWW i kampanie reklamowe, które naprawdę generują klientów.</p>
      <CTA gtm="hero-dowiedz-sie">Dowiedz się więcej</CTA>
    </div>
    <div className="hero-art"><MarketingAnimation /></div>
  </section>;
}

function Packages() {
  const plans = [
    {
      name: "START", sub: "Obecność w Sieci", tag: "Idealne na początek", price: "1 290 zł", oldPrice: "1 899 zł", note: "jednorazowo",
      features: ["Nowoczesna strona WWW / Landing Page (GitHub + Cloudflare)", "0 zł opłat za hosting", "Konfiguracja GA4 + Google Tag Manager", "Konfiguracja Google Search Console", "Wizytówka Google Moja Firma"],
    },
    {
      name: "BIZNES", sub: "Strona + Klient", tag: "Najchętniej wybierany", price: "2 190 zł", oldPrice: "3 699 zł", note: "na start, z 1. miesiącem obsługi", after: "Od 2. miesiąca: 650 zł / mc", featured: true,
      features: ["Wszystko z Pakietu START", "Setup kampanii Google Ads LUB Meta Ads", "Konfiguracja śledzenia konwersji i zdarzeń", "1. miesiąc prowadzenia i optymalizacji kampanii w cenie"],
    },
    {
      name: "PRO GROWTH", sub: "Pełny Ekosystem", tag: "Dla wymagających", price: "3 290 zł", oldPrice: "4 999 zł", note: "na start", after: "Od 2. miesiąca: 1 150 zł / mc",
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
      <CTA outline={!p.featured} gtm={`pakiet-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>Wybieram {p.name}</CTA>
    </article>)}</div>
  </section>;
}

function Why() {
  const items = [
    { Icon: Cloud, t: "Strony bez stałych opłat", d: "Kod hostowany na Cloudflare. Płacisz raz za wykonanie strony i nie płacisz co rok setek złotych za hosting." },
    { Icon: BarChart3, t: "Pełna analityka (GA4 & GTM)", d: "Podpinam komplet narzędzi Google i mierzę każdą konwersję (formularze, maile)." },
    { Icon: Target, t: "Kampanie zorientowane na ROI", d: "Konfiguracja i obsługa Google Ads oraz Meta Ads skupiona na pozyskiwaniu realnych zapytań." },
    { Icon: Wrench, t: "Wsparcie techniczne w sieci", d: "Pomoc w konfiguracji domen, poczty firmowej i Wizytówki Google Moja Firma." },
  ];
  return <section id="dlaczego" className="section-block section-inner">
    <SectionHead label="DLACZEGO HS-MARKETING" title="Strona i marketing. Jeden spójny ekosystem." />
    <div className="benefit-grid"><div className="ecosystem"><div className="ecosystem-symbols"><Globe /><BarChart3 /><Target /></div><div><h3>Dlaczego hsmarketing?</h3><p>Strony WWW, analityka i reklamy nastawione na realne zapytania.</p></div></div>
    <div className="benefits">{items.map(({ Icon, t, d }) => <article key={t}><Icon size={22} strokeWidth={1.5} /><h3>{t}</h3><p>{d}</p></article>)}</div></div>
    <div className="section-bottom"><p>0 zł za hosting. Pełna analityka. Skuteczne kampanie.</p><a href="#kontakt" data-gtm="cta" data-gtm-label="why-porozmawiajmy" onClick={() => track("cta_click", { cta_id: "why-porozmawiajmy", cta_target: "#kontakt" })}>Porozmawiajmy o Twoim projekcie <ArrowRight size={16} /></a></div>
  </section>;
}

function Index() {
  return <div id="top" className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="page-frame"><Hero /><Packages /><Why /><PriceList /><ContactSection label="KONTAKT" title="Droga do pozyskiwania klientów zaczyna się tutaj." sub="Wypełnij krótki formularz lub napisz bezpośrednio. Odpowiadam w ciągu 24h." /></main>
    <Footer />
  </div>;
}
