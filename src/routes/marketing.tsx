import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Megaphone, MousePointerClick, PieChart, Target } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ContactSection, CTA, Footer, Navbar, PriceList, SectionHead } from "@/components/site";
import { track } from "@/lib/tracking";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing — hsmarketing.pl | Kampanie Google Ads i Meta Ads" },
      {
        name: "description",
        content:
          "Kampanie Google Ads i Meta Ads nastawione na realne zapytania. Pełna analityka GA4 + GTM, śledzenie konwersji i przejrzysty cennik.",
      },
      { property: "og:title", content: "Kampanie Google Ads i Meta Ads — hsmarketing.pl" },
      {
        property: "og:description",
        content: "Reklama nastawiona na klientów, nie kliknięcia. Pełna analityka i przejrzysty cennik.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/marketing" },
      { property: "og:site_name", content: "hsmarketing.pl" },
      { property: "og:locale", content: "pl_PL" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/marketing" }],
  }),
  component: Marketing,
});

function MarketingHero() {
  return <section className="hero section-inner">
    <div className="hero-pattern" aria-hidden="true"><span /><span /><span /></div>
    <div className="hero-copy">
      <span className="accent-line" aria-hidden="true" />
      <h1>Marketing, który<br />przynosi klientów.</h1>
      <p>Kampanie Google Ads i Meta Ads poparte pełną analityką. Reklama, która zwraca się w zapytania — nie w kliknięcia.</p>
      <CTA gtm="marketing-hero-dowiedz-sie">Dowiedz się więcej</CTA>
    </div>
  </section>;
}

function WhyMarketing() {
  const items = [
    { Icon: Target, t: "Kampanie zorientowane na ROI", d: "Każdą kampanię stawiam tak, żeby przynosiła realne zapytania od klientów — nie ruch, który nic nie kupuje." },
    { Icon: Megaphone, t: "Google Ads i Meta Ads w jednym miejscu", d: "Obie platformy prowadzone spójnie: ta sama strategia, te same cele i konwersje mierzone jednakowo." },
    { Icon: BarChart3, t: "Pełna analityka (GA4 & GTM)", d: "Podpinam komplet narzędzi Google i mierzę każdą konwersję (formularze, telefony, maile). Widzisz, skąd przychodzą klienci." },
    { Icon: PieChart, t: "Przejrzyste rozliczenia", d: "Wiesz, ile płacisz, na co idzie budżet i co realnie przynosi. Bez korpo-bełkotu i ukrytych kosztów." },
    { Icon: MousePointerClick, t: "Optymalizacja zamiast ustaw-i-zapomnij", d: "Kampanie regularnie optymalizuję: wyłączam to, co nie działa, i skaluję to, co przynosi klientów." },
    { Icon: Zap, t: "Szybki start", d: "Setup kampanii to 490 zł za platformę, a prowadzenie od 590 zł miesięcznie. Pierwsze wyniki widzisz zwykle w ciągu tygodni." },
  ];
  return <section id="dlaczego" className="section-block section-inner">
    <SectionHead label="DLACZEGO NASZ MARKETING" title="Dlaczego warto skorzystać z naszego marketingu" sub="Reklama ma zarabiać, nie kosztować. Oto jak dbam o to w praktyce." />
    <div className="benefit-grid"><div className="ecosystem"><div className="ecosystem-symbols"><Megaphone /><BarChart3 /><Target /></div><div><h3>Marketing bez ślepych wydatków</h3><p>Kampanie Google Ads i Meta Ads prowadzone na liczbach: konwersje, koszt zapytania i realny zwrot.</p></div></div>
      <div className="benefits">{items.map(({ Icon, t, d }) => <article key={t}><Icon size={22} strokeWidth={1.5} /><h3>{t}</h3><p>{d}</p></article>)}</div></div>
    <div className="section-bottom"><p>Pełna analityka. Skuteczne kampanie. Ceny bez gwiazdek.</p><a href="#kontakt" data-gtm="cta" data-gtm-label="marketing-porozmawiajmy" onClick={() => track("cta_click", { cta_id: "marketing-porozmawiajmy", cta_target: "#kontakt" })}>Porozmawiajmy o Twojej kampanii <ArrowRight size={16} /></a></div>
  </section>;
}

function Marketing() {
  return <div id="top" className="min-h-screen bg-background text-foreground">
    <Navbar basePath="/" gtmPrefix="marketing-" />
    <main className="page-frame"><MarketingHero /><WhyMarketing /><PriceList /><ContactSection label="KONTAKT" title="Zacznijmy kampanię, która zarabia." sub="Wypełnij krótki formularz lub napisz bezpośrednio. Odpowiadam w ciągu 24h." /></main>
    <Footer basePath="/" />
  </div>;
}
