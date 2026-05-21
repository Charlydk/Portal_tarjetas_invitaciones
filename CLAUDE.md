# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server (Vite, port 5173)
npm run build     # production build
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

Playwright is installed but no test files exist yet. When tests are added they go in `tests/` and run via `npx playwright test`.

## Architecture Overview

### Routes

Two routes defined in `src/App.jsx`:
- `/` → `HomePage` (marketing landing)
- `/demo/:templateId` → `DemoPage` (invitation editor + live preview)

### Data Layer — Three Files, Three Purposes

**`src/data/templates.js`** — marketing catalog. Maps URL slugs to `themeId`. Used by HomePage and to bootstrap the editor when navigating from the catalog.

**`src/data/models.js`** — technical registry. Defines `invitationModels[]`, a tree of Models → Variants. Each model has a `skeletonComponent` name (string key) and each variant has `assets` (images, audio, icons) and `styles` (colors, fonts).

**`src/data/segments.js`** — UI grouping for the wizard's design picker. Groups templates by event type (Bodas, 15 Años, etc.). Each entry references a `modelId` + `variantId` pair from `models.js`.

**`src/data/pricing.js`** — single source of truth for module pricing. Edit `BASE_PRICE` and `MODULE_PRICES` here to update the real-time quote everywhere.

### The Editor System (`src/features/preview/`)

`DemoPage.jsx` owns all state:
- `formData` — flat object with all invitation fields; auto-saved to localStorage under key `portal_draft_invitation`
- `currentStep` — current wizard step index, elevated here for scroll sync

`ControlPanel.jsx` drives the wizard:
- `STEP_REGISTRY` — ordered array of step definitions with a `condition(formData)` predicate. Steps only appear when their condition is true. The active steps list recalculates with `useMemo` on every `formData` change.
- `STEP_CONDITIONS` in `DemoPage.jsx` is an intentional mirror of `STEP_REGISTRY` used only to derive `activeStepId` for scroll sync (keep both in sync when adding steps).

`InvitationPreview.jsx` renders the live preview:
- Resolves `modelId` + `variantId` from `formData` → looks up variant in `invitationModels` → renders the skeleton component via `SKELETON_MAP` (string name → React component).
- Scroll sync: `STEP_SECTION_MAP` maps step IDs to DOM `id` attributes (`section-hero`, `section-civil`, etc.). Template sections must use these IDs for sync to work.

`TemplateWrapper.jsx` wraps every rendered template with the audio consent modal and music toggle button. In `isEditorMode={true}` (used in preview), the modal never shows and audio doesn't play.

### Templates (`src/templates/`)

Each template (Skeleton1–6, Tarjeta4) is a self-contained component receiving:
- `data` — the full `formData` object
- `theme` — the resolved variant object `{ assets, styles }`

Shared atomic pieces live in `src/components/invitation-pieces/` (HeroHeader, CountdownBox, CommonBoxes). Import from there instead of duplicating across templates.

### Adding a New Template

1. Add a model entry to `src/data/models.js` with `id`, `skeletonComponent`, and `variants`.
2. Create `src/templates/YourSkeleton/YourSkeleton.jsx` and its CSS.
3. Register it in `SKELETON_MAP` in `src/features/preview/InvitationPreview.jsx`.
4. Add section IDs (`id="section-hero"`, `id="section-civil"`, etc.) to template sections for scroll sync.
5. Add entries to `src/data/templates.js` (catalog) and `src/data/segments.js` (wizard picker).

**Fastest way to add a new style:** Add a variant object to an existing model in `models.js`, then add the corresponding entries to `segments.js` and `templates.js`. Zero new React code needed.

### Supabase Integration

**Project:** `ahorcado-db` (`cifhzukobpkvlqsyqrka.supabase.co`) — Table: `invitation_leads`

**Files:**
- `src/lib/supabase.js` — Supabase client (reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- `src/lib/invitationService.js` — `submitInvitationLead(formData, totalPrice)` and `buildWhatsAppMessage(formData, totalPrice)`

**Flow:** When the user clicks "¡Todo Listo!", `ControlPanel` calls `submitInvitationLead` (fire-and-forget), then displays the final modal with a pre-filled WhatsApp link to the business number. The lead is saved to Supabase for admin review via Studio.

**Config (`.env.local`):**
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BUSINESS_WHATSAPP=5491100000000  # update with real number
```

**RLS policy:** anon users can INSERT only. Read access requires service role (Supabase Studio).
