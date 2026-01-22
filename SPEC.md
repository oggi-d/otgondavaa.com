SPEC: otgondavaa.com — Next.js (app router) + Tailwind + shadcn — MVP
Summary / Goals

Audience: Recruiters (Home/Intro), general readers/devs/friends (Blog), and public users (Calculators).

Primary CTAs: Blog subscribe; follow socials; contact via contact form.

Tech: Next.js (app router), Tailwind CSS, shadcn components, MDX for blog posts.

Hosting: Vercel (static site generation).

Locale: English + Mongolian (MN) — page-specific translations only for Home (intro) and Contact.

Calculators: Client-side only, localStorage for saved scenarios, MNT currency, charts (Recharts), printable not required for MVP.

No DB / no auth. Content edited in repo (MDX).

GA4 enabled via env placeholder. Brevo used for subscription/contact API.

UI: Minimal, modern color palette, light/dark, mobile-first, no heavy animation. All UI controls use shadcn components.

High-level routes & pages (app router)

Use app/ folder. All pages SSG where possible.

/ — Home (intro). Show hero, short bio, latest 3 blog posts (title, date, summary, tag badges), social links, subscribe UI (Brevo). English + MN page pair: / (EN), /mn (MN translation).

/blog — Blog index (list of all posts; show tag for each, no pagination).

/blog/[slug] — Blog post (MDX rendering). Frontmatter controls metadata.

/calculators — Calculators index (links to calculators).

/calculators/mortgage — Mortgage calculator (client-only).

/calculators/savings — Retirement/savings goal calculator (client-only).

/contact — Contact page with contact form (Brevo). /mn/contact for Mongolian contact page if translated.

/rss.xml and /sitemap.xml — generated at build time.

/api/og — dynamic OG image generator for pages (SSG-friendly).

app/layout.tsx and app/(marketing)/layout.tsx — global header/footer using shadcn components.

File structure (starter)
/app
  /[lang]                 // optional language route group if you prefer
  /calculators
    mortgage/page.tsx
    savings/page.tsx
  /blog
    page.tsx
    [slug]/page.tsx
  /contact/page.tsx
  page.tsx                // Home (EN)
  mn/page.tsx             // Home MN
  layout.tsx
  globals.css
/public
  /images
    favicon.png
    placeholder-cover.jpg
/content
  /posts
    2025-01-20-my-first-post.mdx
  intro.en.mdx
  intro.mn.mdx
/components
  Header.tsx
  Footer.tsx
  MDXComponents.tsx       // maps custom mdx components to shadcn UI
  CalculatorCard.tsx
  MortgageCalculator.tsx
  SavingsCalculator.tsx
/lib
  mdx.ts
  brevo.ts                // small wrapper for Brevo calls
  ga.ts                   // GA helper that respects consent
/styles
  tailwind.config.js
  themes.ts                // color tokens
.env.example
next.config.js
tsconfig.json

MDX / frontmatter schema (blog posts)

Required frontmatter:

---
title: "My Post Title"
date: "2025-01-20"
summary: "One-line summary."
tags: ["personal","kotlin"]
coverImage: "/images/placeholder-cover.jpg"  # optional
draft: false
---


Render MDX with an MDX provider that maps headings, code blocks, inline alerts to shadcn components (via MDXComponents.tsx).

Global header & footer (design)

Header: small logo / name left; nav links (Home, Blog, Calculators, Contact) center/right; theme toggle & optionally small subscribe CTA.

Footer: social icons (LinkedIn, Instagram, Facebook), small copyright + otgondavaa.com.

Use shadcn components: navbar (custom with Button, Dropdown, ThemeToggle), Avatar for photo placeholder in Home, Badge for tags, Card for blog preview, and Input + Button for forms.

Design tokens & theme

Color palette: modern abstract palette (example tokens - adjust if you like):

primary: #6C5CE7 (indigo-violet)

primary-600: #5B4DE1

accent: #00BFA6 (teal/cyan)

muted: #6B7280 (cool gray)

background light: #FFFFFF; dark: #0F172A

Typography: Inter or System UI (Tailwind font-stack).

Light & Dark modes toggled via next-themes. Use Tailwind dark: classes.

Blog listing & tags

Blog index: static at build time; reads /content/posts/*.mdx and generates list sorted by date. Show tag badges (clickable — filter not necessary for MVP, but clickable to view tag-specific pages later).

Home shows latest 3 posts with link to /blog.

MDX components

Map headings, pre/code -> CodeBlock (syntax highlighting with rehype-shiki or prism), a -> ExternalLink component, blockquote -> Callout (shadcn Alert), images -> Next/Image wrapper.

Subscription & Contact (Brevo)

Env vars (in .env / Vercel dashboard):

BREVO_API_KEY

BREVO_FROM_EMAIL (used as sender for contact replies)

NEXT_PUBLIC_GA4_ID

NEXT_PUBLIC_SITE_URL (e.g., https://otgondavaa.com)

Subscribe flow (single-step):

User enters email + optional name on site.

Client calls /api/subscribe (Next.js serverless API route). The API route calls Brevo Contacts API (using BREVO_API_KEY) to create or update a contact (single-step).

Response used to show success message.

Contact form:

Fields: name (optional), email, message. On submit call /api/contact which uses Brevo SMTP / transactional email endpoint to forward an email to BREVO_FROM_EMAIL or simply adds the contact and triggers a notification email (Brevo supports transactional emails via SMTP and SMTP requires additional setup; for MVP use Brevo Contacts creation + send an email via Brevo's transactional sending API if available). For the spec, API wrapper lib/brevo.ts provides addContact(email, props) and sendTransactionalEmail({to, subject, html}).

Implementation note: since you said no backend DB, the serverless API routes only act as secure proxies for Brevo; no storage in site.

Brevo example (pseudo-Fetch)

// /pages/api/subscribe.ts
const res = await fetch("https://api.brevo.com/v3/contacts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.BREVO_API_KEY
  },
  body: JSON.stringify({ email: userEmail, attributes: { NAME: name } })
});


(Use the official Brevo docs to shape exact endpoints — but pattern is: serverless API route uses BREVO_API_KEY in header and POSTs contact.)

Google Analytics & Opt-out

Env: NEXT_PUBLIC_GA4_ID (placeholder). Implement GA initialization only if user consent is present.

Consent flow: On first visit, show a small banner with Analytics Accept / Opt-out and store choice in localStorage under analytics_consent. When Accept, load GA4 via script tag (or gtag) and send events. When Opt-out, do NOT load GA snippet. This means GA will not collect data if user opted out. (You must implement the conditional snippet logic; GA won't automatically know; you control whether the GA script is injected.)

Footer has a small toggle to change consent later.

Calculators — behavior & UI
Common behavior

All calculators are client-side React components using TypeScript. Save scenarios persist in localStorage with keys like mortar_scenarios_v1, savings_scenarios_v1. Provide CRUD actions in UI (save/load/delete). No server persistence.

Charts: use Recharts for line/area charts. (Chosen for small footprint and react-friendly API.)

Export: CSV export button for tables (basic CSV generation on client).

Currency: display amounts in MNT (Mongolian Tögrög). Use Intl.NumberFormat('en-US', { style: 'currency', currency: 'MNT' }) or custom formatting that shows ₮ symbol; fallback to MNT label as desired.

Mortgage calculator (MVP)

Inputs:

Loan Amount (principal) — required

Annual Interest Rate (%) — required

Term (years) — required

Payments per year — default 12 (monthly)

Start date — optional (for schedule dates)

Extra payment percentage — special: "Add an extra 10% of monthly payment to principal each month" (user can set extra as a percentage or fixed amount). Show years saved for selected extra %. (Default extra = 0; show example 10% toggle)

Optional PITI fields omitted for MVP.

Outputs:

Monthly payment (standard amortization formula).

Total interest paid over loan life and total paid.

Years to payoff with/without extra payment and "Years Saved" delta.

Amortization chart: stacked area or two lines showing "cumulative principal paid" vs "cumulative interest paid".

Short explanation box: emphasize that "early payments are mostly interest" — show breakdown for the first 12 months: a table showing month, payment, interest portion, principal portion. This highlights that initial payments have larger interest shares.

Amortization table: show first 12 months rows (for MVP), with CSV export for the displayed rows.

Formulas (clear, to implement in code):

monthlyRate = annualRate / paymentsPerYear / 100

n = termYears * paymentsPerYear

monthlyPayment = P * r / (1 - (1 + r)^-n) where r = monthlyRate

For extra monthly payment e (as fraction of monthlyPayment or fixed amount): run amortization loop:

for month = 1.. until balance <= 0:

interest = balance * r

principal = (monthlyPayment + extra) - interest

balance -= principal

track month rows and cumulative totals

Compute yearsWithExtra = monthsWithExtra / paymentsPerYear; yearsSaved = termYears - yearsWithExtra.

Show first-year detailed table and a visualization where the first months have much higher interest vs principal to educate users.

UI elements:

Input group (shadcn Inputs + Selects).

Toggle: "Add 10% extra" quick button to set extra = monthlyPayment * 0.10.

Chart: line chart with two series (remaining balance, cumulative principal) or stacked area for interest vs principal.

Savings / retirement calculator (MVP)

Inputs:

Current age

Retirement age (years)

Current savings (amount)

Monthly income (gross) — used only to calculate suggested monthly savings

Monthly expenses (avg) — optional; suggested savings formula uses (income - expenses)

Expected annual return (%) — default 5% (user editable)

Target amount OR choose to calculate "how much monthly to save based on years and target" — for MVP, we will support: target amount OR derive from desired retirement income (stretch — skip). Default: user sets target amount.

Outputs:

Suggestion: "Suggested monthly savings" based on user income and expenses: suggestion = max( (income - expenses) * 0.2, minimumToReachTarget ) — implement formula:

First compute required monthly contribution to reach target using standard future value formula with monthly compounding:

r = annualReturn/12

n = months = (retirementAge - currentAge) * 12

monthlyContributionRequired = (target - currentSavings*(1+r)^n) * r / ((1+r)^n - 1)

Also compute a heuristic suggestion: suggestedFromIncome = max( Math.round((income - expenses) * 0.15), 0 ) (15% of surplus). Present both numbers and highlight the one needed to achieve goal.

Projection: year-by-year projection of balance until retirement (MVP: list of years and balances). Chart: line of balance vs year.

Show summary: final projected balance and whether target achieved with suggested monthly savings.

Export: CSV of yearly projection. Save scenario in localStorage.

LocalStorage schema (simple)
// Mortgage
localStorage.setItem('mortgage_scenarios_v1', JSON.stringify([
  { id, name, createdAt, inputs: {loanAmount, annualRate, years, paymentsPerYear, extraPct}, results: {...} }
]));

// Savings
localStorage.setItem('savings_scenarios_v1', JSON.stringify([...]))

Accessibility & Responsiveness

Mobile-first: components stack vertically, large CTA buttons, inputs full-width on small screens.

Keyboard focus management for forms.

Use semantic HTML and ARIA where appropriate.

Contrast: tokens chosen to meet accessible contrast where possible.

SEO & OG

Generate metadata per page: title, description (from frontmatter for blog posts), og:image from /api/og route (dynamic SVG-to-image that renders title & site name).

Include sitemap.xml and rss.xml at build time.

Structured data (JSON-LD) for blog posts (author, datePublished, description).

Developer notes & implementation hints

Next.js: use getStaticProps equivalent in app router (use getStaticParams + generateStaticParams + fetch content at build) or read MDX files at build with gray-matter + xdm or @next/mdx-remote.

MDX: Use next-mdx-remote or @next/mdx to render MDX with custom components. Include syntax highlighting (rehype-prism or shiki plugin).

Use shadcn/ui components exclusively for core UI; write small wrappers for maps to next/image etc.

Charts: recharts components implemented in client-only components ('use client' in React component).

Env variables (add to Vercel)

BREVO_API_KEY

BREVO_FROM_EMAIL (your email: oogii.joy@gmail.com)

NEXT_PUBLIC_GA4_ID (e.g., G-XXXXXXXXX)

NEXT_PUBLIC_SITE_URL (https://otgondavaa.com
)

NEXTAUTH_SECRET (not needed unless you add auth later)

Add .env.example with these placeholders.

Sample API route spec (serverless)

POST /api/subscribe:

body: { email, name }

server: call Brevo create contact endpoint with API key. return { ok: true } or error msg.

POST /api/contact:

body: { name?, email, message }

server: call Brevo transactional send (or add contact + send email to your BREVO_FROM_EMAIL). return { ok: true }.

Security: ensure BREVO_API_KEY is only used on server side (not exposed to client).

Example MDX post (example)

/content/posts/2025-01-20-understanding-mortgages.mdx:

---
title: "Why early mortgage payments are mostly interest"
date: "2025-01-20"
summary: "A clear explanation with charts and examples so borrowers know what's happening."
tags: ["money", "mortgage"]
coverImage: "/images/mortgage-hero.jpg"
---

import Callout from '@/components/Callout'

# Why early mortgage payments are mostly interest

<Callout>In the early months of your mortgage, a much larger share of your payment goes to interest than principal — here's why.</Callout>

...content...

Analytics & privacy notes for you (quick)

The opt-out toggle prevents the GA snippet from being injected. If user opts out, no GA requests are made. You must not initialize gtag or call gtag('config', ...) when opt-out. This is how you implement opt-out; GA itself does not auto-ignore traffic unless you stop sending hits.

Build & deploy checklist (MVP)

Initialize Next.js app (TypeScript) + Tailwind + shadcn.

Add MDX setup and content loader for /content/posts.

Implement header/footer, theme toggle, and layouts.

Implement Blog index + MDX renderer. Generate sitemap & rss.

Implement calculators (client components) and localStorage scenario storage. Add Recharts.

Add /api/subscribe & /api/contact routes hooking to Brevo via BREVO_API_KEY.

Add GA consent banner and conditional GA loader (using NEXT_PUBLIC_GA4_ID).

Add OG generator route.

Test on localhost; push to GitHub and deploy to Vercel. Add env vars in Vercel UI.

Verify Brevo calls succeed (use Postman / curl first with API key).

Smoke-test calculators and save/load scenarios. Confirm CSV export.



supply the initial data purely by you. make sure when I see it, it looks like it has data and fully functioning website.
