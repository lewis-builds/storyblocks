# Story Blocks Journal — Design System

A design system for **Story Blocks Journal**, a printed-and-digital creative-writing journal for children (bought by parents, used by kids). Every day gives a child a small **story starter** — three words to weave into a story — plus writing tips, challenges, a reward chart and collectible **stickers**. It's cheerful, hand-drawn, encouraging, and unmistakably British.

> **Tagline:** *Daily story starters to spark creative writing for children.*
> Publisher: **Blocks Publishing Ltd** · web: blockspublishingltd.com · **Made in Britain**.

## Products represented
1. **The Journal** — a physical hardback book (standard yellow + a premium **Gold Edition**). Includes free stickers and a reward chart.
2. **The companion app** — shows the daily prompt, writing tips & challenges, tracks streaks, and unlocks sticker rewards to share. (See the UI kit in `ui_kits/app/`.)

## The mascots — "the Blocks"
The heart of the brand is a cast of **block characters**: rounded-square "friends" with thick black outlines, simple dot eyes, big grins, and thin stick arms/legs, each in one of the brand colours. They read, write, celebrate, explore and cheer the child on. There are **77 poses** (`assets/characters/SB01…SB80.png`) plus a sticker sheet and a hero "meditating" pose. They are the primary illustration system — use them generously.

## Sources provided
All source material was delivered as image uploads (no codebase or Figma link):
- `logo.png` — the walking-book mascot logo (primary logo).
- `Layer_1.png` — hero "meditating" block character (saved as `assets/character-meditate.png`).
- `SB01.png … SB80.png` — 77 block-character poses (saved to `assets/characters/`).
- `sticker-sheet.jpg` — the printed reward sticker sheet.
- `storyblocks-book.png` / `storyblocks-GOLD-book.png` — the journal covers (standard + gold).
- `Made-in-britain-logo.png` — the Made in Britain certification mark.
- `phone-UI.png`, `phone-UI-2.png` — two app screen mockups (saved as `assets/ref-phone-ui-*.png`, used only as visual reference).

No production code or Figma file was provided, so components and the UI kit are faithful **recreations** built from these images and the observable brand language.

---

## CONTENT FUNDAMENTALS — how Story Blocks writes

**Voice:** warm, playful, encouraging — a friendly grown-up who believes every kid is a storyteller. Never babyish, never corporate.

**Who it talks to:** it speaks **to the child** using "you" and "your character" ("Who is whispering, and why?", "What does the secret involve?"). Parent-facing copy (packaging, settings) is plain and reassuring.

**Tone & devices:**
- **Questions do the heavy lifting.** Prompts are open questions that spark ideas, not instructions: *"How do the three words fit together?"*, *"Is it a good secret, a mystery, or something a little spooky?"*
- **Short, active, upbeat.** *"Share the good news!"*, *"Keep going"*, *"Save Image"*, *"Reading Rockstar!"*
- **Celebratory milestones.** Streaks and rewards are a big deal: *"10 days"*, *"New sticker!"*, *"You did it!"*, *"Story Master"*, *"Cool"*.
- **British English throughout** (colour, favourite, realise). Made in Britain.

**Casing:**
- Big display headlines: mixed/sentence case in the chunky display font (*"Whisper, Door, Secret"*).
- Marker **labels/kickers** (Gochi Hand) are set in **sentence case** (*"Include these words in a story…"*, *"Write a short story…"*) — this felt-tip face is never all-caps.
- Body copy and sub-heads: sentence case.

**Punctuation:** ellipses to invite continuation (*"Include these words in a story…"*), exclamation marks for wins (used with restraint — one per moment, not littered).

**Emoji:** essentially none in product copy — **the block characters and stickers carry the emotion instead.** In throwaway prototypes an occasional ⭐/🎉 is acceptable inside a Toast, but prefer a character. Never use emoji as a substitute for a character illustration.

**Do / Don't**
- ✅ *"Include these words in a story… Whisper, Door, Secret."*
- ✅ *"What kind of secret is hidden behind the door?"*
- ❌ *"Utilise these lexical items in a narrative composition."* (too formal)
- ❌ *"OMG you're literally a writing GENIUS!!!"* (over-hyped, not the voice)

---

## VISUAL FOUNDATIONS

**Overall vibe:** a hand-drawn sticker book. Thick black ink outlines, flat bright fills, chunky rounded type, and things that look *stuck on by hand* — slight tilts, offset shadows, die-cut white borders.

**Colour**
- **Marigold yellow `#FDCD2A`** is the hero — the logo body, primary buttons, big joyful backgrounds. A softer **lemon `#F4E24E`** is used for large page fills and the book cover.
- Six **character colours** double as the accent palette: pistachio green `#BDDC94`, sky blue `#AADFF1`, bubblegum pink `#F59DB2`, peach `#F9A67D`, periwinkle purple `#AFB6DC`, and royal blue `#4368B0` (the deepest — also links).
- **Ink `#231F20`** is used for *every* outline and virtually all text. There is no light-grey type on brand colours — ink reads on all of them.
- Backgrounds are often a **soft tint** of a character colour (e.g. the app's mint-wash prompt screen `#E5EECC`).
- Imagery is **warm, saturated, flat** — no gradients on the illustrations, no photography, no grain. The only gradient in the whole system is the metallic bevel on the **Gold Edition** cover.

**Type**
- **Display:** `Fredoka` (SemiBold/Bold) — chunky, rounded, friendly. Stands in for the custom hand-lettered wordmark.
- **Marker:** `Gochi Hand` — felt-tip labels, kickers, sticker captions ("STORY MASTER", "COOL", "KEEP GOING").
- **Body/UI:** `Nunito` — rounded humanist sans, very readable for kids.
- Type is big and confident. Minimum body ~16px; headlines are large and tight (`line-height` ~1.05).

**Backgrounds:** flat colour or soft tint; occasional playful **sunburst rays** behind a celebration (see the "10 days" screen). No repeating photo textures; the book cover has a subtle cloth texture only.

**Borders & shape:** the defining move is a **thick ink outline (3px default, 4px for emphasis)** on almost every surface — buttons, cards, inputs, chips, toggles. Corners are generously rounded (buttons 16px, cards 22px, sheets 30px, pills fully round). Stickers use a **6px white die-cut border** instead of ink.

**Shadows:** hard **offset "sticker" shadows with no blur** (`4px 4px 0 ink`) are the signature — they make everything feel like a cut-out sitting on the page. Soft blurred shadows are reserved for stickers floating over a colour field.

**Motion:** friendly and **bouncy** (`cubic-bezier(0.34,1.56,0.64,1)`). Elements pop in and settle; toggles spring.
- **Hover:** subtle — buttons stay put; interactive tiles may lift slightly.
- **Press:** the signature interaction — a button **nudges 3px into its own shadow** (translate + shrink the offset shadow to `1px 1px`), like physically pressing a stamp. Never a colour-only press.

**Transparency & blur:** used sparingly. The block-character PNGs are transparent cut-outs placed over colour. No frosted-glass/backdrop-blur panels — that's off-brand.

**Layout:** roomy, centered, playful. Content sits on tinted or white cards with ink outlines and pop shadows. Elements are allowed a small rotation (−3° badges, tilted cards, hand-placed stickers) to keep it lively. Reading width is kept comfortable (~640px) even though the tone is casual.

**Cards:** white or soft-tint fill, 3px ink border, 22px radius, `4px 4px 0` ink pop-shadow. Optional tilt for personality.

---

## ICONOGRAPHY

Story Blocks does **not** use a conventional line-icon set as its primary visual language — **the block characters ARE the iconography.** Emotion, actions and states are shown with a character in the right pose (reading, celebrating, exploring with a lantern, thinking) rather than a glyph.

- **Primary:** the 77 character PNGs in `assets/characters/` + the sticker sheet. Reach for a character before an icon.
- **Small UI affordances** (chevrons, close ✕, share, plus, menu ☰, back →) are simple, chunky shapes drawn in **ink** to match the hand-drawn weight. In this system they're rendered as heavy unicode glyphs inside `IconButton`; for production, a **rounded, bold, filled** icon set is the right match.
- **Substitution flag:** where a UI needs a proper icon set, use **[Phosphor](https://phosphoricons.com/) (Bold/Fill)** or **[Lucide](https://lucide.dev/)** at a heavy stroke as the closest CDN match to the chunky hand-drawn weight — and note the substitution. Do **not** hand-roll bespoke SVG icons or approximate the characters as SVG; always use the real PNGs.
- **Emoji:** avoid in product UI (characters carry emotion). A single ⭐/🎉 is tolerable inside a reward Toast in throwaway work.
- **Certification mark:** the **Made in Britain** logo (`assets/made-in-britain.png`) appears on packaging/footers — use the supplied file, never redraw it.

---

## Components

Reusable React primitives, exported on `window.StoryBlocksJournalDesignSystem_239fa7`. See each component's `.prompt.md` for usage.

**Core** (`components/core/`)
- **Button** — the signature chunky sticker button (8 fills, 3 sizes, press-into-shadow).
- **IconButton** — round/squircle icon-only button.
- **Badge** — tilted sticker-label ("New sticker!").
- **Chip** — rounded word-token for story-starter words.
- **Card** — outlined pop-shadow panel, tintable.

**Brand** (`components/brand/`)
- **Logo** — walking-book mascot (or type wordmark fallback).
- **Character** — renders any of the 77 block friends by id/seed.
- **Sticker** — die-cut reward-sticker frame with marker caption.
- **WordPrompt** — the daily story-starter hero (kicker + three words).

**Forms** (`components/forms/`)
- **Input** — chunky outlined text field.
- **Textarea** — the story-writing box (with word count).
- **Checkbox** — chunky ticked box.
- **Radio** — single-choice pill group.
- **Switch** — bouncy on/off toggle.
- **Select** — outlined dropdown with ink chevron.

**Feedback** (`components/feedback/`)
- **ProgressBar** — outlined progress track.
- **StreakTracker** — day-dots for reading/writing streaks.
- **Toast** — sticker-style notification.

**Navigation** (`components/navigation/`)
- **Tabs** — segmented sticker tabs ("Writing Tips / Challenges").

---

## Index / manifest

- `styles.css` — global entry point (imports all tokens + fonts). **Consumers link this.**
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (spacing, radii, borders, shadows, motion), `fonts.css`.
- `components/` — `core/`, `brand/`, `forms/`, `feedback/`, `navigation/` — each with `.jsx` + `.d.ts` + `.prompt.md` and one `@dsCard` HTML.
- `ui_kits/app/` — interactive recreation of the companion app (see its `README.md`).
- `guidelines/` — foundation specimen cards for the Design System tab (colours, type, spacing, brand).
- `assets/` — `logo.png`, `character-meditate.png`, `characters/` (77 poses), `sticker-sheet.jpg`, book covers, `made-in-britain.png`, reference screens.
- `SKILL.md` — Agent-Skills-compatible entry point.

## Caveats / substitutions
- **Fonts are substitutes.** The real Story Blocks wordmark is **custom hand-lettering**; `Fredoka` + `Gochi Hand` + `Nunito` (Google Fonts, loaded via CDN in `tokens/fonts.css`) are the nearest available matches. Please share the real font files (or the wordmark as vector art) to make this exact.
- **Recreated from images only** — no source code or Figma was provided, so exact paddings/radii are best-fit to the mockups, not extracted values.
- **Icons** use heavy unicode glyphs as stand-ins; see ICONOGRAPHY for the recommended real icon set.
