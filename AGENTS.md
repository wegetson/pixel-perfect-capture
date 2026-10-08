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
- Define reference-inspired visual roles in global CSS and use the existing Button component for actions; this keeps the redesign themeable and accessible.
- Keep contact submission as a mailto flow unless delivery infrastructure is explicitly requested; this avoids implying that the frontend sends or stores messages.
- Keep the banner animation in a browser-safe SVG component with CSS timelines, pause control, and a reduced-motion fallback; this keeps the sequence sharp at every screen size without video downloads.
