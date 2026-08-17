# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server (Vite, port 5173)
npm run build     # production build
npm run lint      # ESLint (flat config, eslint.config.js)
npm run preview   # serve the production build locally
```

There is no test suite. `@playwright/test` is a devDependency but there is no Playwright config and no `tests/` directory — adding tests means adding both.

## Architecture Overview

React 19 + Vite SPA. No TypeScript, no state library, no backend of its own: the only server-side dependency is Supabase (lead capture) and the conversion path ends in a WhatsApp deep link.

### Routes (`src/App.jsx`)

- `/` → `HomePage` — marketing landing, wrapped in `MainLayout` (Navbar + Footer)
- `/demo/:templateId` → `DemoPage` — wizard editor + live preview, also inside `MainLayout`
- `/preview/:themeId` → `PreviewPage` — full-screen showcase of a variant with demo data, **outside** `MainLayout` (no navbar/footer)

`PreviewPage` is the public-facing sales path: welcome screen (offers music if the variant has audio) → full template with a floating "¡Quiero esta tarjeta!" bar → CTA modal that either sends the user to WhatsApp or to `/demo/:themeId`. It accepts `?embed=true` to hide the floating bar and skip the welcome screen (used by `DemoEmbed` on the landing).

Note that the landing's `TemplatesSection` navigates to `/preview/:variantId`, **not** to `/demo/:slug`. `src/data/templates.js` slugs are what `/demo/:templateId` resolves against.

### Data Layer — Four Files, Four Purposes

**`src/data/models.js`** — technical registry and the real source of truth. `invitationModels[]` is a tree of Models → Variants. Each model has a `skeletonComponent` **string key**; each variant has `assets` (images, audio, icons) and `styles` (colors, fonts). A variant id is globally unique and is what the app calls a `themeId`/`variantId`.

**`src/data/templates.js`** — marketing catalog. Maps URL slugs to `themeId`. Used by `DemoPage` to bootstrap the editor from a `/demo/:slug` URL.

**`src/data/segments.js`** — UI grouping for the landing and the wizard's design picker. Groups templates by event type (Bodas, 15 Años, …); each entry references a `modelId` + `variantId` pair from `models.js`.

**`src/data/pricing.js`** — single source of truth for pricing: `BASE_PRICE`, `MODULE_PRICES`, `INCLUDED_MODULES`, plus `MODULE_LABELS`/`MODULE_ORDER` that drive `StepModules`' UI.

⚠️ `src/lib/invitationService.js` hardcodes the module list *and* the `+$2.500` amounts in `getSelectedModulesList()` for the WhatsApp message. Changing prices or modules means editing `pricing.js` **and** that function.

### The Editor System (`src/features/preview/`)

`DemoPage.jsx` owns all state:
- `formData` — one flat object with every invitation field; auto-saved to localStorage under `portal_draft_invitation`.
- `currentStep` — elevated here so the preview can scroll-sync.

Because drafts are persisted forever, the `useState` initializer contains a **migration block**: every new `formData` field needs a `if (parsed.x === undefined) parsed.x = default` line there, or returning users get `undefined` where the templates expect a value.

`ControlPanel.jsx` drives the wizard:
- `STEP_REGISTRY` — ordered step definitions, each with a `condition(formData)` predicate. Steps appear only when their condition is true; the active list recomputes with `useMemo` on every `formData` change.
- `STEP_CONDITIONS` in `DemoPage.jsx` is an intentional **mirror** of `STEP_REGISTRY`, used only to derive `activeStepId` for scroll sync. Adding or reordering a step means editing both.
- The finish button calls `submitInvitationLead` and then shows the WhatsApp modal; a Supabase failure is non-blocking (the modal still offers the WhatsApp link).

`InvitationPreview.jsx` resolves and renders:
- Prefers `formData.modelId` + `formData.variantId`; falls back to the `themeId` prop; falls back again to a generic card if neither resolves.
- Looks the component up in `SKELETON_MAP` from `src/lib/skeletonMap.js` (string name → React component).
- `fullScreen` (used by `PreviewPage`) vs. framed (`preview-frame-container`, used by the editor).

`TemplateWrapper.jsx` wraps every rendered template: `<audio>` element, loading overlay, and the floating music toggle. With `isEditorMode={true}` (the editor preview) audio never plays and only a 🎵 badge shows. Audio uses a deliberate **two-phase play pattern** (`setIsLoading` → `setPendingPlay` → `play()` in the next effect) so the spinner paints before buffering starts; `preload="none"` keeps unopened cards from downloading audio. Don't collapse that back into a direct `play()` call.

### Scroll Sync — the section-id contract

`STEP_SECTION_MAP` in `InvitationPreview.jsx` maps step ids to DOM ids:

```
protagonists → section-hero      venue   → section-civil    extras → section-dresscode
gallery      → section-gallery   music   → section-music    gifts  → section-gifts
confirm      → section-rsvp
```

⚠️ Most legacy skeletons do **not** honor this. Only `Tarjeta4` implements the full set; `Skeleton15` implements most of it; `Skeleton7`–`Skeleton14` use `section-protagonists` / `section-venue` / `section-confirm` (step ids, not section ids), so scroll sync silently no-ops for those steps; `Skeleton2`–`Skeleton6` have no section ids at all. `AllegoryCard` honors the contract — its first rendered event section takes `section-civil`, since the "venue" step points there.

### Allegories — the data-driven renderer (`src/allegories/`, `src/features/invitation/`)

The current way to add a design. An **allegory** is a data file describing a costume — palette, type, wording, artwork, section order — rendered by one shared component. Adding a design costs a `.js` file and an asset folder; it never costs React or CSS.

- `src/allegories/index.js` — `resolveAllegory()` merges an allegory over `DEFAULT_TOKENS` / `DEFAULT_TITLES` / `DEFAULT_COPY`, so a half-written allegory still renders a complete card. `tokensToCssVars()` turns tokens into the `--inv-*` custom properties the stylesheet reads.
- `src/features/invitation/invitation.css` — the design system: type scale, spacing rhythm, section shell. **No rule hardcodes a color or a font.**
- `src/features/invitation/Sections.jsx` — the ten sections, written once. `EventSection` serves civil, religious and party alike (these used to be three near-identical copies in `CommonBoxes.jsx` differing only in a hardcoded `<h2>`).
- `src/features/invitation/AllegoryCard.jsx` — the renderer. Registered in `SKELETON_MAP` as `'AllegoryCard'`; every allegory shares that single entry.

Existing allegories: `cinderella`, `rapunzel`, `aurora`, `bodaClasica`, `mariposas` — all built from delivered client cards.

**Adding one:** write `src/allegories/<name>.js`, drop its assets in `public/allegories/<slug>/`, import it in `models.js` as a variant of the `allegories` model with `allegory: <name>`, then add entries to `segments.js` and `templates.js`. An allegory owns **all** its assets (`icons`, `backgroundImage`, `backgroundVideo`, `audio`), so moving a design means moving one file plus one folder.

**Per-client variation** — the actual business. Client requests map to fields, not code:

| Request | Field |
|---|---|
| "cambiale el color" | `tokens.accent`, `tokens.bg` |
| "con esta letra" | `tokens.fontTitle` |
| "estos textos" | `titles`, `copy` |
| "sacá el carrusel de fotos" | remove `'gallery'` from `sections` |

```js
export const sofiaQuince = {
  ...cinderella,
  id: 'sofia-quince',
  tokens: { ...cinderella.tokens, accent: '#E8B4C8' },
  sections: cinderella.sections.filter(s => s !== 'gallery'),
};
```

**Medallion artwork** is what separates a commissioned card from a template. `icons` takes image paths; emoji are only a fallback. The delivered art is square with its background baked in, so `.inv-medallion--art` crops to a circle with `object-fit: cover` — `contain` would show square edges over the card.

**Video headers** are a first-class token (`backgroundVideo` + `heroVeil`). `muted` + `playsInline` are mandatory or iOS refuses to autoplay; `poster` prevents a black rectangle while buffering; `prefers-reduced-motion` hides the video and leaves the poster.

**Asset budget.** Optimize before committing — medallions are displayed at ~156px, so 1024px sources waste ~40× the pixels:
```bash
ffmpeg -i in.webp -vf "scale=400:400:flags=lanczos" -quality 82 out.webp
ffmpeg -i in.mp4 -vf "crop=W:H:X:Y,scale=1280:-2:flags=lanczos" -c:v libx264 -crf 30 \
  -preset slow -pix_fmt yuv420p -an -movflags +faststart out.mp4   # run cropdetect first; -an always
ffmpeg -i in.mp3 -codec:a libmp3lame -b:a 96k out.mp3
```
Audio uses `preload="none"`, so it only downloads when a guest opts into music and does not count toward default page weight.

### Legacy templates (`src/templates/`)

Skeleton1–15 and Tarjeta4 predate the allegory system and are being replaced by it. Do not add new ones; add an allegory instead.


`Skeleton1`–`Skeleton15` plus `Tarjeta4`, each a self-contained folder with `X.jsx` + `X.css`, receiving:
- `data` — the full `formData` object
- `theme` — the resolved variant `{ assets, styles }`

Shared atomic pieces live in `src/components/invitation-pieces/` (`HeroHeader`, `CountdownBox`, `Decoratives`, and the `CommonBoxes` set: `CeremonyBox`, `CivilBox`, `PartyBox`, `DressCodeBox`, `GiftsBox`, `GalleryBox`, `RSVPBox`, `MusicBox`, `InvitationFooter`). Import from there instead of duplicating. Animation is `framer-motion` throughout; newer templates (9, 15) also pull `FallingPetals` / `ParticlesBackground` from `src/components/`.

Templates must render safely with empty `formData` fields — `PreviewPage` feeds them `DEMO_DATA`, and the editor feeds partially-filled drafts. Several templates fall back to local `SAMPLE_PHOTOS` when the gallery is empty.

### Adding a New Template

1. Add a model entry to `src/data/models.js` with `id`, `skeletonComponent`, and `variants`.
2. Create `src/templates/YourSkeleton/YourSkeleton.{jsx,css}`.
3. Register it in `SKELETON_MAP` in `src/lib/skeletonMap.js`.
4. Add the section ids from the scroll-sync contract above to the template's sections.
5. Add entries to `src/data/templates.js` (catalog slug) and `src/data/segments.js` (landing + wizard picker).

**Fastest way to add a new style:** add a variant object to an existing model in `models.js`, then add the matching entries to `segments.js` and `templates.js`. Zero new React code.

### Supabase Integration

**Project:** `mxzoofpyrqananmqzhbk.supabase.co`. The schema lives in `supabase/migrations/` — apply it with the SQL Editor or the MCP server; both files are idempotent. (An older project, `cifhzukobpkvlqsyqrka`, held the leads before the account move; it is no longer used.)

Two tables, two directions:

- `invitation_leads` (`002`) — write-only mailbox. `src/lib/invitationService.js` → `submitInvitationLead(formData, totalPrice)` inserts the lead (whole `formData` goes into a `form_data` column); `buildWhatsAppMessage(formData, totalPrice)` builds the prefilled message.
- `invitations` (`001`) — one delivered card per row, read by `src/lib/invitationsService.js` for `/i/:slug` and `/borrador/:token`. Note the plural: `invitationService` (singular) writes leads, `invitationsService` (plural) reads cards.

`src/lib/supabase.js` — client (reads `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

**RLS + column grants — two layers, and both are load-bearing.** RLS picks which *rows* anon sees; the column grants pick which *fields*. Without the second layer a guest could read any published card's `edit_token` and the client's phone number.

- `invitation_leads`: anon may INSERT and nothing else — no SELECT policy at all. That is why `submitInvitationLead` has no `.select()`: reading back the inserted row would need SELECT privilege. Leads are read with the service role (Supabase Studio).
- `invitations`: anon SELECTs only `status = 'publicada'` rows that have not expired, and only five columns. Drafts come out through `get_invitation_by_token()` (`security definer`) — a policy comparing against a browser-supplied token would let the table be enumerated.

⚠️ When granting to anon, **revoke from `authenticated` by name too**. Supabase's default privileges give `authenticated` full access to every new table *and function* in `public`, and those are its own grants — `revoke ... from public` does not touch them.

**`.env.local`:**
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BUSINESS_WHATSAPP=5491100000000   # business number; falls back to this placeholder
```

### Conventions

- UI copy, comments and commit messages in this repo are Spanish (rioplatense); code identifiers are English. Follow what's already in the file you're editing.
- `design-system/portal-invitaciones/MASTER.md` holds the landing's design tokens (palette, typography, spacing). Page-specific files under `pages/` override it.
- `openspec/changes/` holds spec-driven change artifacts for larger features.
- ESLint treats unused vars as errors except identifiers matching `^[A-Z_]`.
