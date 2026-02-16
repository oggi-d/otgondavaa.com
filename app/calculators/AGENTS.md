# Calculator Pages Rules

## Language

- All user-facing text MUST be in Mongolian
- Code comments can be in English

## File Structure

```
app/calculators/
├── AGENTS.md              # This file
├── calculators.ts         # Calculator registry (add new calculators here)
├── calculator-layout.tsx  # Shared layout for individual calculator pages
├── shared-metadata.ts     # SEO metadata helper
├── page.tsx               # Calculator listing page
├── loan/page.tsx          # Loan calculator page
└── savings/page.tsx       # Savings calculator page

components/
├── loan-calculator.tsx    # Loan calculator component
└── savings-calculator.tsx # Savings calculator component

lib/
└── utils.ts               # Shared utilities (formatMNT, formatShortMNT, cn)
```

## Adding a New Calculator

1. Add entry to `calculators.ts` with:
   - `title`: Mongolian title
   - `description`: Mongolian description
   - `href`: URL path (e.g., `/calculators/new-calc`)
   - `icon`: Lucide icon component
   - `slug`: URL-friendly identifier
   - `gradient`: Tailwind gradient classes (e.g., `from-blue-400 via-cyan-400 to-cyan-500`)
   - `iconBg`: Background color for icon
   - `accentColor`: Text color for links/highlights

2. Create page at `app/calculators/[slug]/page.tsx` using `CalculatorLayout`

3. Create component at `components/[slug]-calculator.tsx`

## Design Patterns

### Visual Style

- Calculator listing cards use colorful gradient headers
- Individual calculator pages have light gradient hero sections
- Result cards use gradient backgrounds; use the same `gradient` value from the calculator’s entry in `calculators.ts`.
- Dark cards for tips/insights with slate-900 background
- Stat cards with rounded-xl borders and shadows
- Use `pointer-events-none` on decorative overlays (e.g., grid patterns)

### Sliders

- Use native `<input type="range">` with custom styling
- Light mode: `bg-[color]-200`
- Dark mode: `dark:bg-[color]-500/40` (NOT `/30` - too faint)
- Accent color: `accent-[color]-500`
- Show current value in label and between min/max markers
- Loan calculator uses blue colors
- Savings calculator uses emerald colors

### localStorage Persistence

- Save calculator inputs to localStorage for user convenience
- Use debounced saves (300ms) to prevent performance issues with sliders
- Pattern:

  ```tsx
  const STORAGE_KEY = "[calculator]-calculator-inputs";

  // Load on mount
  React.useEffect(() => {
    const stored = loadFromStorage();
    // Set all state values
    setIsHydrated(true);
  }, []);

  // Debounced save
  React.useEffect(() => {
    if (!isHydrated) return;
    const timeoutId = setTimeout(() => {
      saveToStorage({ ...inputs });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [isHydrated, ...dependencies]);
  ```

### Money Formatting

Two utility functions in `lib/utils.ts`:

1. **`formatMNT(amount)`** - Full currency format
   - Output: `1,000,000₮`
   - Use for: Tooltips, primary result displays, exact values

2. **`formatShortMNT(value)`** - Abbreviated format for compact display
   - Millions: `10.5сая` (10,500,000)
   - Thousands: `500мян` (500,000)
   - Below 1000: Falls back to `formatMNT`
   - Use for: Tables, chart Y-axis labels, badges, compact stats

```tsx
import { formatMNT, formatShortMNT } from "@/lib/utils";

formatMNT(10500000); // "10,500,000₮"
formatShortMNT(10500000); // "10.5сая"
formatShortMNT(500000); // "500мян"
formatShortMNT(999); // "999₮"
```

### Charts (Recharts)

- Use `AreaChart` with gradient fills via `<linearGradient>`
- Format Y-axis with `formatShortMNT` for readability
- Use `formatMNT` in tooltips for exact values
- Include legend and tooltips
- Add educational explanations for how to read charts

### Tables

- Yearly summaries preferred over monthly for readability
- Use alternating row colors with hover states
- Include visual progress bars for percentage columns
- Color-code values: emerald for principal/positive, red for interest

### Result Display

- Show comparisons when extra payments are applied
- Use strikethrough for original values when showing savings
- Highlight savings in emerald color
- Show both absolute and relative savings (amount + time)

## Component Conventions

### Layout

- Two-column layout on desktop: inputs left, results right
- Stack on mobile
- Use `Card` component with `border-0 shadow-lg`
- Card headers can have gradient backgrounds

### Input Groups

- Each input should have an icon from Lucide
- Group related inputs (e.g., age inputs together)
- Add educational tooltips/hints where helpful

### Quick Action Buttons

- Use rounded-full pill style
- Toggle `variant="default"` when active
- Show calculated impact in button label when possible

## SEO

- Use `getCalculatorMetadata()` for consistent metadata
- Include JSON-LD structured data (WebApplication for tools, ItemList for listing)
- Set canonical URLs

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML (`<table>`, `<thead>`, `<tbody>`)
- Include `sr-only` text where needed
