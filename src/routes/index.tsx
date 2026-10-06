import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Cloud, BarChart3, Target, Wrench, Mail, Phone, Globe, Menu, X } from "lucide-react";

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

const btn =
  "brut brut-press inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-bold text-ink";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-1 font-display text-xl font-bold tracking-tight">
      hs-marketing
      <span className="rounded border-2 border-ink bg-peach px-1.5 text-xs">.pl</span>
    </a>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Why />
        <Packages />
        <PriceList />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <ul className="hidden gap-8 font-semibold md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="underline-offset-4 hover:underline">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#kontakt" className={`${btn} hidden bg-peach py-2 md:inline-flex`}>
          Darmowa Wycena
        </a>
        <button
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="brut bg-card p-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t-2 border-ink px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3 font-semibold">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#kontakt" onClick={() => setOpen(false)} className={`${btn} mt-4 w-full bg-peach`}>
            Darmowa Wycena
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const badges = [
    "🚀 0 zł opłat za hosting strony",
    "📈 Analityka GA4 + GTM w cenie",
    "🎯 Kampanie Google & Meta Ads",
    "⏱️ Szybkie terminy realizacji",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 md:pt-24">
      <span className="brut inline-block bg-sun px-3 py-1.5 text-sm font-semibold">
        ⚡ Nowoczesne strony bez opłat za hosting & Skuteczny Marketing
      </span>
      <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
        Prosty marketing i strony WWW, które{" "}
        <span className="rounded-md border-2 border-ink bg-peach px-2">naprawdę</span> generują klientów.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Tworzę szybkodziałające strony w architekturze bezabonamentowej (0 zł za hosting) oraz prowadzę precyzyjne
        kampanie Google Ads i Meta Ads. Bez zbędnego korpo-bełkotu.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a href="#pakiety" className={`${btn} bg-peach`}>
          Zobacz Pakiety Usług
        </a>
        <a href="#kontakt" className={`${btn} bg-card`}>
          Skonsultuj swój projekt
        </a>
      </div>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => (
          <li key={b} className="brut rounded-full bg-card px-4 py-2.5 text-center text-sm font-semibold">
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Why() {
  const items = [
    { bg: "bg-sun", Icon: Cloud, t: "Strony bez stałych opłat", d: "Kod hostowany na Cloudflare. Płacisz raz za wykonanie strony i nie płacisz co rok setek złotych za hosting." },
    { bg: "bg-sage", Icon: BarChart3, t: "Pełna analityka (GA4 & GTM)", d: "Podpinam komplet narzędzi Google i mierzę każdą konwersję (formularze, maile, telefon)." },
    { bg: "bg-lavender", Icon: Target, t: "Kampanie zorientowane na ROI", d: "Konfiguracja i obsługa Google Ads oraz Meta Ads skupiona na pozyskiwaniu realnych zapytań." },
    { bg: "bg-peach", Icon: Wrench, t: "Wsparcie techniczne w sieci", d: "Pomoc w konfiguracji domen, poczty firmowej i Wizytówki Google Moja Firma." },
  ];
  return (
    <section id="dlaczego" className="scroll-mt-20 border-y-2 border-ink bg-muted py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title="Dlaczego hs-marketing?" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ bg, Icon, t, d }) => (
            <article key={t} className={`brut brut-press ${bg} p-6`}>
              <div className="brut mb-4 inline-flex bg-card p-2.5">
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed">{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
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
  return (
    <section id="pakiety" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <SectionHead title="Wybierz pakiet dopasowany do Twojego biznesu" sub="Przejrzyste warunki, zero ukrytych kosztów." />
      <div className="grid items-start gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <article key={p.name} className={`brut relative flex h-full flex-col p-7 ${p.featured ? "bg-peach lg:-translate-y-3" : "bg-card"}`}>
            <span className={`brut self-start px-3 py-1 text-xs font-bold uppercase ${p.featured ? "bg-sun" : "bg-lavender"}`}>{p.tag}</span>
            <h3 className="mt-5 text-2xl font-bold">PAKIET {p.name}</h3>
            <p className="text-sm font-semibold">„{p.sub}”</p>
            <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-4xl font-bold">{p.price}</span>
              <span className="font-display text-lg font-semibold text-muted-foreground line-through">{p.oldPrice}</span>
            </p>
            <p className="text-sm">{p.note}</p>
            {p.after && <p className="mt-2 rounded border-2 border-dashed border-ink px-2 py-1 text-sm font-semibold">{p.after}</p>}
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-ink bg-sage">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#kontakt" className={`${btn} mt-8 w-full ${p.featured ? "bg-ink text-sun" : "bg-sun"}`}>
              Wybieram {p.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
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
  return (
    <section id="cennik" className="scroll-mt-20 border-y-2 border-ink bg-sun/40 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHead title="Potrzebujesz konkretnej usługi?" sub="Cennik pojedynczych usług — bez pakietów." />
        <ul className="brut overflow-hidden bg-card">
          {rows.map(([s, p], i) => (
            <li key={s} className={`flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-lavender sm:flex-row sm:items-center sm:justify-between ${i ? "border-t-2 border-ink" : ""}`}>
              <span className="font-semibold">{s}</span>
              <span className="shrink-0 font-display font-bold">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  const options = ["Strona WWW", "Google Ads", "Meta Ads", "Analityka / GTM", "Inne"];
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (o: string) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));
  const input = "brut w-full bg-card px-4 py-3 outline-none focus:bg-sun/30";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Imię / firma: ${f.get("name")}\nKontakt: ${f.get("contact")}\nZainteresowanie: ${picked.join(", ") || "-"}\n\n${f.get("msg")}`;
    window.location.href = `mailto:kontakt@hs-marketing.pl?subject=${encodeURIComponent("Zapytanie ze strony")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="kontakt" className="scroll-mt-20 border-t-2 border-ink bg-peach/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead title="Zróbmy coś razem!" sub="Wypełnij krótki formularz lub napisz bezpośrednio. Odpowiadam w ciągu 24h." />
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <form onSubmit={submit} className="brut space-y-5 bg-card p-6 md:p-8">
            <label className="block">
              <span className="mb-2 block font-semibold">Imię i Nazwisko / Nazwa firmy</span>
              <input name="name" required className={input} />
            </label>
            <label className="block">
              <span className="mb-2 block font-semibold">Adres e-mail lub numer telefonu</span>
              <input name="contact" required className={input} />
            </label>
            <fieldset>
              <legend className="mb-2 font-semibold">Czym jesteś zainteresowany?</legend>
              <div className="flex flex-wrap gap-3">
                {options.map((o) => (
                  <button
                    type="button"
                    key={o}
                    aria-pressed={picked.includes(o)}
                    onClick={() => toggle(o)}
                    className={`brut brut-press rounded-full px-4 py-1.5 text-sm font-semibold ${picked.includes(o) ? "bg-sage" : "bg-card"}`}
                  >
                    {picked.includes(o) && "✓ "}
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="mb-2 block font-semibold">Krótki opis projektu</span>
              <textarea name="msg" rows={4} className={input} />
            </label>
            <button type="submit" className={`${btn} w-full bg-sun`}>
              Wyślij zapytanie
            </button>
          </form>
          <aside className="brut h-fit space-y-5 bg-sun p-6 md:p-8">
            <h3 className="text-xl font-bold">Kontakt bezpośredni</h3>
            {[
              { Icon: Mail, l: "Email", v: "kontakt@hs-marketing.pl", h: "mailto:kontakt@hs-marketing.pl" },
              { Icon: Phone, l: "WhatsApp / Telefon", v: "[Twój numer]", h: undefined },
              { Icon: Globe, l: "Domena", v: "hs-marketing.pl", h: "https://hs-marketing.pl" },
            ].map(({ Icon, l, v, h }) => (
              <div key={l} className="flex items-center gap-3">
                <span className="brut inline-flex bg-card p-2"><Icon size={18} /></span>
                <div>
                  <p className="text-xs font-semibold uppercase">{l}</p>
                  {h ? <a href={h} className="font-bold underline-offset-4 hover:underline">{v}</a> : <p className="font-bold">{v}</p>}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <ul className="flex flex-wrap gap-5 text-sm font-semibold">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="hover:underline">{n.label}</a></li>
          ))}
          <li><a href="#top" className="hover:underline">Polityka prywatności</a></li>
        </ul>
        <p className="text-sm text-muted-foreground">© 2026 hs-marketing. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
