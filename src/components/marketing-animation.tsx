import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarketingAnimation() {
  const [paused, setPaused] = useState(false);
  return <div className={`marketing-animation ${paused ? "is-paused" : ""}`}>
    <svg className="marketing-stage" viewBox="0 0 960 430" role="img" aria-label="Animacja: powstaje strona internetowa, konfigurowane są narzędzia, reklamy rozchodzą się w sieci, a pieniądze trafiają na konto bankowe.">
      <defs>
        <pattern id="marketing-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" className="diagram-dot" /></pattern>
      </defs>
      <rect width="960" height="430" fill="url(#marketing-dots)" />
      <g className="sequence-scene scene-build">
        <g className="build-browser">
          <rect x="235" y="62" width="490" height="295" rx="8" className="diagram-paper diagram-outline" />
          <path d="M235 99H725" className="diagram-line" />
          <circle cx="256" cy="81" r="4" className="diagram-green" /><circle cx="272" cy="81" r="4" className="diagram-lilac" /><circle cx="288" cy="81" r="4" className="diagram-yellow" />
          <rect x="362" y="74" width="236" height="14" rx="3" className="diagram-soft" />
          <g className="build-piece piece-one"><rect x="261" y="119" width="438" height="22" className="diagram-soft" /><rect x="274" y="125" width="63" height="10" className="diagram-green" /><path d="M574 130h28m14 0h28m14 0h28" className="diagram-line" /></g>
          <g className="build-piece piece-two"><rect x="261" y="155" width="438" height="112" className="diagram-green" /><path d="M283 180h155m-155 17h114" className="diagram-title-line" /><rect x="283" y="221" width="72" height="23" className="diagram-yellow" /><path d="M585 175l46 26-46 26-46-26z" className="diagram-lilac" /><path d="M563 201v30l22 13 22-13v-30" className="diagram-light-line" /></g>
          <g className="build-piece piece-three"><rect x="261" y="283" width="135" height="49" className="diagram-lilac" /><rect x="413" y="283" width="135" height="49" className="diagram-soft" /><rect x="565" y="283" width="134" height="49" className="diagram-yellow" /></g>
        </g>
        <g className="code-fly code-left"><rect x="112" y="136" width="80" height="59" rx="4" className="diagram-lilac" /><text x="152" y="174" textAnchor="middle" className="diagram-code">&lt;/&gt;</text></g>
        <g className="code-fly code-right"><rect x="770" y="247" width="72" height="57" rx="4" className="diagram-yellow" /><path d="M790 275l10 10 22-24" className="diagram-heavy-line" /></g>
        <g className="build-cursor"><path d="M663 245l1 37 11-10 12 19 9-6-12-17 15-3z" className="diagram-cursor" /></g>
      </g>
      <g className="sequence-scene scene-config">
        <path d="M293 145H390V210H452M667 145H570V210H508M293 300H390V230H452M667 300H570V230H508" className="diagram-wire config-wire" />
        <g className="config-core"><rect x="430" y="170" width="100" height="100" rx="8" className="diagram-green" /><g className="config-gear"><path d="M480 188v13m0 38v13m-32-32h13m38 0h13m-55-23 9 9m28 28 9 9m0-46-9 9m-28 28-9 9" className="diagram-gear-line" /><circle cx="480" cy="220" r="19" className="diagram-light-line" /><circle cx="480" cy="220" r="6" className="diagram-yellow" /></g></g>
        <g className="config-node node-one"><rect x="135" y="103" width="190" height="84" rx="5" className="diagram-paper diagram-outline" /><text x="153" y="129" className="diagram-small">GA4 + GTM</text><path d="M155 167v-17m14 17v-25m14 25v-34" className="diagram-heavy-line" /><rect x="258" y="147" width="46" height="22" rx="11" className="diagram-green" /><circle cx="292" cy="158" r="7" className="diagram-yellow config-switch" /></g>
        <g className="config-node node-two"><rect x="635" y="103" width="190" height="84" rx="5" className="diagram-paper diagram-outline" /><text x="653" y="129" className="diagram-small">DOMENA + SSL</text><path d="M658 167v-16h22v16zm4-16v-5a7 7 0 0 1 14 0v5" className="diagram-line" /><path d="M782 154l8 8 15-17" className="diagram-heavy-line config-check" /></g>
        <g className="config-node node-three"><rect x="135" y="258" width="190" height="84" rx="5" className="diagram-paper diagram-outline" /><text x="153" y="284" className="diagram-small">PIXEL META</text><path d="M154 316l13-13 13 13 13-13" className="diagram-heavy-line" /><path d="M282 308l8 8 15-17" className="diagram-heavy-line config-check" /></g>
        <g className="config-node node-four"><rect x="635" y="258" width="190" height="84" rx="5" className="diagram-paper diagram-outline" /><text x="653" y="284" className="diagram-small">KONWERSJE</text><path d="M654 321l19-15 17 4 22-17" className="diagram-heavy-line" /><rect x="758" y="301" width="46" height="22" rx="11" className="diagram-green" /><circle cx="792" cy="312" r="7" className="diagram-yellow config-switch" /></g>
      </g>
      <g className="sequence-scene scene-ads">
        <g className="network-globe"><circle cx="480" cy="215" r="126" className="diagram-soft diagram-outline" /><ellipse cx="480" cy="215" rx="65" ry="126" className="diagram-line" /><path d="M354 215h252M373 153h214M373 277h214M480 89v252" className="diagram-line" /></g>
        <path d="M150 120L480 215 795 115M150 320L480 215 795 325" className="diagram-wire" />
        <g className="network-center"><circle cx="480" cy="215" r="42" className="diagram-green" /><path d="M462 208l30-12v35l-30-12zm0 0h-9v11h9m4 3 6 17h10l-6-13M504 204l11-6m-11 16h14m-14 9 11 6" className="diagram-light-line" /></g>
        {[0, 1, 2, 3, 4, 5].map(i => <g key={i} className={`flying-ad flying-ad-${i}`}><rect x="-43" y="-30" width="86" height="60" rx="4" className={i % 2 ? "diagram-yellow diagram-outline" : "diagram-lilac diagram-outline"} /><rect x="-33" y="-19" width="23" height="24" className="diagram-green" /><path d="M0-13h28M0-3h20M-33 17h60" className="diagram-line" /><path d="M27 9l8 8-8 8" className="diagram-line" /></g>)}
        <g className="network-node"><circle cx="150" cy="120" r="22" className="diagram-green" /><circle cx="795" cy="115" r="22" className="diagram-green" /><circle cx="150" cy="320" r="22" className="diagram-green" /><circle cx="795" cy="325" r="22" className="diagram-green" /><path d="M142 120h16m-8-8v16M787 115h16m-8-8v16M142 320h16m-8-8v16M787 325h16m-8-8v16" className="diagram-light-line" /></g>
      </g>
      <g className="sequence-scene scene-bank">
        <path d="M180 145Q320 70 480 175M790 145Q640 70 480 175M185 320Q325 350 440 270" className="diagram-wire" />
        <g className="bank-account"><rect x="355" y="104" width="250" height="242" rx="8" className="diagram-green" /><path d="M452 152l28-16 28 16zm5 8v25m15-25v25m16-25v25m15-25v25m-52 4h58" className="diagram-light-line" /><text x="480" y="220" textAnchor="middle" className="diagram-bank-label">KONTO FIRMOWE</text><text x="480" y="264" textAnchor="middle" className="diagram-bank-value">+ PLN</text><path d="M391 313l28-17 22 7 34-24 22 6 35-26 35-15" className="diagram-growth" /><path d="M553 244h14v14" className="diagram-growth" /></g>
        {[0, 1, 2, 3, 4, 5].map(i => <g key={i} className={`money-transfer transfer-${i}`}><circle r="22" className="diagram-yellow diagram-outline" /><text y="6" textAnchor="middle" className="diagram-money">zł</text></g>)}
        <g className="bank-receipt"><rect x="655" y="224" width="145" height="71" rx="4" className="diagram-paper diagram-outline" /><circle cx="682" cy="249" r="10" className="diagram-green" /><path d="M677 249l4 4 7-8" className="diagram-light-line" /><text x="703" y="253" className="diagram-small">+ PLN</text><path d="M671 277h111" className="diagram-line" /></g>
        <g className="bank-spark"><path d="M297 168v-20m-10 10h20M675 106v-20m-10 10h20M298 307v-20m-10 10h20" className="diagram-heavy-line" /></g>
      </g>
    </svg>
    <div className="animation-footer">
      <ol className="animation-steps" aria-label="Etapy animacji"><li className="step-build"><span>01</span> STRONA</li><li className="step-config"><span>02</span> KONFIGURACJA</li><li className="step-ads"><span>03</span> REKLAMY</li><li className="step-bank"><span>04</span> WPŁYWY</li></ol>
      <Button variant="ghost" size="icon" className="animation-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? "Wznów animację" : "Wstrzymaj animację"} title={paused ? "Wznów animację" : "Wstrzymaj animację"}>{paused ? <Play size={16} /> : <Pause size={16} />}</Button>
    </div>
  </div>;
}