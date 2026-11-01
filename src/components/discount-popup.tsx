import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/tracking";

const STORAGE_KEY = "hsm-15-offer-dismissed";

export function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      track("popup_show", { popup_id: "15-offer" });
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  function close() {
    dismiss();
    track("popup_close", { popup_id: "15-offer" });
  }

  function takeOffer() {
    dismiss();
    track("cta_click", { cta_id: "popup-15-oferta", cta_target: "#kontakt" });
  }

  if (!open) return null;

  return (
    <div className="popup-overlay" data-gtm="popup" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={cardRef} className="popup-card" role="dialog" aria-modal="true" aria-label="Oferta 15% zniżki">
        <Button variant="ghost" size="icon" className="popup-close" aria-label="Zamknij ofertę" data-gtm="popup-close" onClick={close}><X size={18} /></Button>
        <span className="eyebrow"><span />OFERTA</span>
        <h2>Zapisz się teraz, a otrzymasz <strong>15% zniżki</strong>.</h2>
        <p>Zostaw zapytanie w formularzu — napiszę „15%” w opisie projektu, a rabat odliczę od wyceny.</p>
        <CTA onClick={takeOffer} />
      </div>
    </div>
  );
}

function CTA({ onClick }: { onClick: () => void }) {
  return <Button asChild variant="default" className="adfin-button popup-cta"><a href="#kontakt" id="cta-popup-15-oferta" data-gtm="cta" data-gtm-label="popup-15-oferta" onClick={onClick}>Chcę skorzystać z oferty</a></Button>;
}
