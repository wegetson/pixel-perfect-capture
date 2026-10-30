<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the Polish single-page offer in the index route and use shared CTA/section-heading helpers; this preserves consistent controls and section hierarchy.
- Shared page chrome (Navbar, Footer, Logo, CTA, SectionHead, PriceList, ContactSection) lives in src/components/site.tsx; subpages pass basePath="/" so anchors point back to the homepage sections — never duplicate those components per route.
- Define reference-inspired visual roles in global CSS and use the existing Button component for actions; this keeps the redesign themeable and accessible.
- Contact form leads are appended to the Google Sheet via a server function (Sheets connector); never call the gateway from the browser.
- Keep the banner animation in a browser-safe SVG component with CSS timelines, pause control, and a reduced-motion fallback; this keeps the sequence sharp at every screen size without video downloads.
