# Calculator Pages Rules

## Language

- All user-facing text MUST be in Mongolian
- Code comments can be in English

## UI terminology (reference)

Use Mongolian in the UI. When an English finance term appears in specs or code comments, common mappings include:

| English (reference) | Mongolian (user-facing) |
|---------------------|-------------------------|
| compound (interest) | **Нийлмэл хүү**, **Хүүгээс хүү бодох** |
| saving / savings | **Хуримтлал**, **хадгаламж** (context) |
| interest (rate) | **хүү** |
| inflation | **инфляц** |
| tax | **татвар** |
| principal | **үндсэн**, **анхны дүн** (context) |
| balance | **үлдэгдэл** |

Add rows here when you introduce new domain wording.

## File structure

- Registry: `app/calculators/calculators.ts`
- Shared page chrome: `app/calculators/calculator-layout.tsx`
- SEO helper: `app/calculators/shared-metadata.ts`
- Listing: `app/calculators/page.tsx`
- One route per calculator: `app/calculators/<slug>/page.tsx`
- UI: `components/calculator-<slug>.tsx` — export name **`Calculator` + PascalCase** (suffix describes the tool, not `*Calculator`).
- Optional pure logic: `lib/calculators/` (keep separate from `"use client"` UI when useful)
- Money helpers: `lib/utils.ts` (`formatMNT`, `formatShortMNT`, `cn`)

## Adding a new calculator

1. Add an entry in `calculators.ts` (`title`, `description`, `href`, `icon`, `slug`, `gradient`, `iconBg`, `accentColor`).
2. Add `app/calculators/<slug>/page.tsx` using `CalculatorLayout` — copy structure from an existing `app/calculators/*/page.tsx`.
3. Add `components/calculator-<slug>.tsx` with the matching `Calculator…` export.

## Design patterns

### Visual style

- Listing cards: gradient header; page hero matches the same gradient family as the registry entry.
- Result highlights: reuse the same `gradient` string from `calculators.ts` where the design uses a hero/result strip.
- Tips / secondary callouts: dark slate-style cards are fine when consistent with existing pages.
- Decorative layers: `pointer-events-none` on non-interactive overlays.

### Color per calculator

Pick **one accent palette per calculator** (sliders, highlights, chart accents) so it does not clash with others. Define it in the registry (`gradient`, `iconBg`, `accentColor`) and use the same Tailwind color family in that calculator’s component. **Do not copy another calculator’s colors** — compare entries in `calculators.ts` and the `components/calculator-*.tsx` range `className`s.

### Sliders

- Native `<input type="range">`, value shown in the label and min/mid/max hints.
- Light: `bg-<family>-200`, dark: `dark:bg-<family>-500/40` (avoid `/30` — too faint), `accent-<family>-500`.
- **Reference**: range styling in any `components/calculator-*.tsx`.

### localStorage persistence

- Debounce writes (~300ms); guard saves until after client hydration.
- **Reference**: `loadFromStorage` / `saveToStorage` / `isHydrated` pattern in any `components/calculator-*.tsx`.

### Money formatting

- **Reference**: `formatMNT` and `formatShortMNT` in `lib/utils.ts` (behavior and suffixes live there; do not duplicate rules in prose).

### Charts (Recharts)

- When a chart exists: `AreaChart` + gradients, Y-axis compact money, tooltips exact money, short legend/tooltip copy in Mongolian.
- **Reference**: chart blocks in `components/calculator-*.tsx` that already use Recharts.

### Tables

- Prefer yearly (or coarser) rows over monthly when the table would be huge.
- Alternating rows + hover; align number columns right.

### Result display

- Prefer one clear primary number, then supporting stats.
- When comparing scenarios (e.g. with/without an option), use clear typography (strikethrough / contrast) **only if** the calculator actually has two scenarios — follow patterns in existing components.

### Layout & inputs

- Mobile: stack; desktop (`lg:`): two columns (inputs | results) is the default pattern in current calculators.
- `Card` with `border-0 shadow-lg` where the rest of the site does.
- Inputs: label + optional Lucide icon; group related fields.

### Quick actions

- Pill buttons (`rounded-full`), active state via `variant`; label may include a computed hint when it stays readable.

## SEO

- Use `getCalculatorMetadata()` from `shared-metadata.ts`.
- JSON-LD: `WebApplication` on tool pages; listing uses `ItemList` (see `app/calculators/page.tsx`).
- Set canonical via metadata helper.

## Accessibility

- Keyboard-accessible controls; semantic tables (`<table>`, `<thead>`, `<tbody>`); `sr-only` where labels need extra context.
