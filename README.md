# Story Blocks Journal — site

Marketing + purchase site for the Story Blocks Journal (Blocks Publishing Ltd).
Vite multi-page app, React, a prebuilt design-system bundle, and Stripe Checkout.

## Commands

```bash
npm install     # once
npm run dev      # local dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally
```

Node is required for these. The live deploy (Vercel) runs `npm run build` itself —
see **DEPLOY.md** for the full go-live walkthrough (GitHub → Vercel → Stripe).

## Layout

```
index.html          Home / buy page   → src/buypage.jsx
schools.html        Schools giving    → src/schools.jsx
resources.html      Free resources    → src/resources.jsx
thanks.html         Post-checkout     → src/thanks.jsx
src/
  sections.jsx      Shared page sections + SiteHeader/SiteFooter (exported)
  basket.jsx        Basket drawer + /api/checkout handshake
  lib/
    core.js         Asset helper, pricing model (EDITIONS, SKUS, priceFor, gbp)
    react-global.js Exposes React on window for the design-system bundle
    image-slot.js   <image-slot> custom element (fillable image placeholder)
public/
  assets/           Images, characters, placeholders/
  _ds/…             Design-system CSS + component bundle (window global)
api/
  checkout.js       Vercel serverless fn: creates a Stripe Checkout session
```

## Notes

- The design system is a prebuilt global bundle
  (`window.StoryBlocksJournalDesignSystem_239fa7`) loaded via a `<script>` in each
  HTML file; `src/lib/react-global.js` gives it the same React instance the app uses.
- `<image-slot>` placeholders show the "coming soon" art in
  `public/assets/placeholders/` until real photos are supplied — see DEPLOY.md.
- Stripe price IDs are configured in `api/checkout.js` (placeholders until you add
  your own — DEPLOY.md step 3). Without them, Checkout falls back to a demo message.
