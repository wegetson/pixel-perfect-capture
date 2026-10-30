import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Check, ChevronDown, Globe, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { track } from "@/lib/tracking";

export const NAV = [
  { href: "#dlaczego", label: "Dlaczego my" },
  { href: "#pakiety", label: "Pakiety" },
  { href: "#cennik", label: "Cennik" },
  { href: "/marketing", label: "Marketing" },
  { href: "#kontakt", label: "Kontakt" },
];

export const WORDMARK_PIECES = [
  { t: "hs", x: "-0.9em", y: "-1.7em", r: "-24deg" },
  { t: "ma", x: "-0.6em", y: "2.1em", r: "18deg" },
  { t: "rke", x: "0.8em", y: "-1.9em", r: "-16deg" },
  { t: "ting", x: "1.2em", y: "1.9em", r: "22deg" },
  { t: ".pl", x: "-0.8em", y: "2.5em", r: "-28deg", small: true },
];

export function Logo({ footer = false, homeHref = "#top" }: { footer?: boolean; homeHref?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAssembled(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!footer) {
    return <a href={homeHref} className="wordmark" aria-label="hsmarketing — strona główna">hsmarketing<span>.pl</span></a>;
  }

  return (
    <a ref={ref} href={homeHref} className={`footer-wordmark${assembled ? " assembled" : ""}`} aria-label="hsmarketing — strona główna">
      {WORDMARK_PIECES.map((p, i) => (
        <span
          key={p.t}
          className={`piece${p.small ? " small" : ""}`}
          style={{ "--tx": p.x, "--ty": p.y, "--tr": p.r, transitionDelay: `${i * 70}ms` } as CSSProperties}
        >
          {p.t}
        </span>
      ))}
    </a>
  );
}

export function CTA({ href = "#kontakt", children, outline = false, gtm }: { href?: string; children: ReactNode; outline?: boolean; gtm: string }) {
  return <Button asChild variant={outline ? "outline" : "default"} className="adfin-button"><a href={href} id={`cta-${gtm}`} data-gtm="cta" data-gtm-label={gtm} onClick={() => track("cta_click", { cta_id: gtm, cta_target: href })}>{children}<ArrowRight size={16} /></a></Button>;
}

export function SectionHead({ title, sub, label }: { title: string; sub?: string; label: string }) {
  return <div className="section-heading"><span className="eyebrow"><span />{label}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

export function Navbar({ basePath = "", gtmPrefix = "" }: { basePath?: string; gtmPrefix?: string }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  const anchor = (href: string) => (href.startsWith("#") ? `${basePath}${href}` : href);
  return <header className="site-header">
    {notice && <div className="announcement"><a href={anchor("#pakiety")} data-gtm="announcement">Strony WWW bez opłat za hosting. Poznaj pakiety <ArrowRight size={14} /></a><Button variant="ghost" size="icon" aria-label="Zamknij informację" onClick={() => setNotice(false)}><X size={15} /></Button></div>}
    <nav className="navigation">
      <Logo homeHref={basePath ? `${basePath}` : "#top"} />
      <ul className="desktop-links">{NAV.map((n, i) => <li key={n.href}><a href={anchor(n.href)} data-gtm="nav" data-gtm-label={n.label} onClick={() => track("nav_click", { nav_target: anchor(n.href), location: "header" })}>{n.label}{i < 2 && <ChevronDown size={12} />}</a></li>)}</ul>
      <div className="navigation-cta"><CTA gtm={`${gtmPrefix}header-wycena`} href={anchor("#kontakt")}>Darmowa wycena</CTA></div>
      <Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </nav>
    {open && <div className="mobile-links">{NAV.map(n => <a key={n.href} href={anchor(n.href)} data-gtm="nav" data-gtm-label={n.label} onClick={() => { setOpen(false); track("nav_click", { nav_target: anchor(n.href), location: "mobile" }); }}>{n.label}<ArrowRight size={16} /></a>)}<CTA gtm={`${gtmPrefix}mobile-wycena`} href={anchor("#kontakt")}>Darmowa wycena</CTA></div>}
  </header>;
}

export function Footer({ basePath = "" }: { basePath?: string }) {
  const anchor = (href: string) => (href.startsWith("#") ? `${basePath}${href}` : href);
  return <footer className="site-footer"><div className="footer-frame"><div className="footer-top"><div><span className="eyebrow"><span />HSMARKETING.PL</span><h2>Twój kolejny krok?<br />Więcej klientów.</h2></div><CTA outline gtm="footer-porozmawiajmy" href={anchor("#kontakt")}>Porozmawiajmy</CTA></div><div className="footer-links"><div><h3>Oferta</h3><a href={anchor("#pakiety")}>Pakiety usług</a><a href={anchor("#cennik")}>Cennik</a><a href={anchor("#dlaczego")}>Dlaczego my</a></div><div><h3>Usługi</h3><a href={anchor("#pakiety")}>Strony WWW</a><a href="/marketing">Marketing — Google i Meta Ads</a><a href={anchor("#cennik")}>Analityka GA4 i GTM</a></div><div><h3>Kontakt</h3><a href="mailto:hsmarketing.pl@gmail.com" data-gtm="email" onClick={() => track("email_click", { location: "footer" })}>hsmarketing.pl@gmail.com</a><a href={anchor("#kontakt")}>Darmowa wycena</a></div></div><div className="footer-legal">© 2026 hsmarketing. Wszystkie prawa zastrzeżone.<a href={anchor("#top")}>Wróć na górę <ArrowRight size={14} /></a></div><Logo footer homeHref={basePath ? `${basePath}` : "#top"} /></div></footer>;
}

export function PriceList() {
  const rows = [
    ["Strona WWW (Cloudflare)", "od 990 zł"],
    ["Pełny Setup Analityczny (GA4 + GTM + Search Console)", "490 zł"],
    ["Podpięcie Google Tag Manager (GTM)", "250 zł"],
    ["Setup Kampanii Google Ads lub Meta Ads", "490 zł / platforma"],
    ["Obsługa Kampanii Google Ads / Meta Ads", "od 590 zł / miesiąc"],
    ["Prowadzenie Google Ads + Meta Ads (Pakiet)", "od 990 zł / miesiąc"],
    ["Drobne prace i wsparcie techniczne", "120 zł / godzina"],
  ];
  return <section id="cennik" className="section-block section-inner pricing-section">
    <SectionHead label="POJEDYNCZE USŁUGI" title="Potrzebujesz konkretnej usługi?" sub="Cennik pojedynczych usług — bez pakietów." />
    <ul className="price-list">{rows.map(([s, p], i) => <li key={s}><span className="service-number">{String(i + 1).padStart(2, "0")}</span><span>{s}</span><strong>{p}</strong></li>)}</ul>
  </section>;
}

export function ContactSection({ label, title, sub }: { label: string; title: string; sub: string }) {
  const options = ["Strona WWW", "Google Ads", "Meta Ads", "Analityka / GTM", "Inne"];
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const send = useServerFn(submitLead);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus("sending");
    track("form_submit_attempt", { form_id: "contact" });
    try {
      const res = await send({ data: { name: String(f.get("name") || ""), contact: String(f.get("contact") || ""), interests: picked, message: String(f.get("msg") || "") } });
      if (!res.ok) throw new Error("failed");
      track("generate_lead", { form_id: "contact", interests: picked.join(", ") || "-" });
      form.reset(); setPicked([]); setStatus("sent");
    } catch {
      track("form_submit_error", { form_id: "contact" });
      setStatus("error");
    }
  }
  return <section id="kontakt" className="section-block section-inner contact-section">
    <SectionHead label={label} title={title} sub={sub} />
    <div className="contact-grid"><form id="contact-form" data-gtm="contact-form" onSubmit={submit}>
      <div className="form-row"><label>Imię i Nazwisko / Nazwa firmy<input name="name" required autoComplete="name" /></label><label>Adres e-mail lub numer telefonu<input name="contact" required autoComplete="email" /></label></div>
      <fieldset><legend>Czym jesteś zainteresowany?</legend><div className="interest-options">{options.map(o => <label key={o}><input type="checkbox" checked={picked.includes(o)} onChange={() => setPicked(p => p.includes(o) ? p.filter(x => x !== o) : [...p, o])} /><span>{o}</span></label>)}</div></fieldset>
      <label>Krótki opis projektu<textarea name="msg" rows={4} /></label>
      <Button type="submit" id="contact-submit" data-gtm="form-submit" className="adfin-button" disabled={status === "sending"}>{status === "sending" ? "Wysyłanie…" : "Wyślij zapytanie"}<ArrowRight size={16} /></Button>
      {status === "sent" && <p className="form-status" role="status">Dziękuję! Zapytanie zostało wysłane — odezwę się w ciągu 24h.</p>}{status === "error" && <p className="form-status" role="alert">Nie udało się wysłać. Spróbuj ponownie lub napisz na hsmarketing.pl@gmail.com.</p>}
    </form><aside><h3>Kontakt bezpośredni</h3>{[
      { kind: "email", Icon: Mail, l: "Email", v: "hsmarketing.pl@gmail.com", h: "mailto:hsmarketing.pl@gmail.com" },
      { kind: "website", Icon: Globe, l: "Domena", v: "hsmarketing.pl", h: "https://hsmarketing.pl" },
    ].map(({ kind, Icon, l, v, h }) => <div className="contact-detail" key={l}><Icon size={19} /><div><p>{l}</p><a href={h} data-gtm={kind} onClick={() => track(`${kind}_click`, { location: "contact" })}>{v}</a></div></div>)}</aside></div>
  </section>;
}

export { Check };
