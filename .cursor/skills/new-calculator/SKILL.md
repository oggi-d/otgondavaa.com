---
name: otgondavaa-calculators
description: >-
  Adds or changes financial calculators on otgondavaa.com. Use when the user
  asks for a new calculator, calculator page, registry entry, or
  calculator-related refactor in this repo.
---

# otgondavaa.com — calculators

1. **Read** `app/calculators/AGENTS.md` first (files, terminology, SEO, sliders, money helpers, persistence, layout).
2. **Align** with root `AGENTS.md` and `.cursor/rules/chat-language-english.mdc` for Mongolian UI and chat vs site language.
3. **Implement** from the existing registry, `CalculatorLayout`, and `components/calculator-*.tsx` — open real files; do not paste example code from chat as a template.
4. **Checklist**: registry entry → `app/calculators/[slug]/page.tsx` → `components/calculator-*.tsx` with `export function Calculator…`; optional pure logic under `lib/calculators/` if it helps reuse.
