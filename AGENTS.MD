Site owner: Otgondavaa Dashnyam (aka Oggi)

## Development Rules

### Mobile First

- All designs and implementations must follow a mobile-first approach
- Start with mobile layouts and progressively enhance for larger screens
- Use Tailwind responsive breakpoints (sm:, md:, lg:, xl:) to add desktop styles
- Components should stack vertically on mobile, with horizontal layouts only on larger screens
- Touch targets must be at least 44x44px for mobile usability
- Test all UI components on mobile viewport first (320px - 768px)
- Ensure all interactive elements are easily accessible on mobile devices

### shadcn Components

- **MUST install shadcn components using the CLI, DO NOT generate or create custom implementations**
- Use `npx shadcn@latest add [component-name]` to install components
- All UI components must come from shadcn/ui library
- Do not create custom component implementations that duplicate shadcn functionality
- If a component is needed, check shadcn documentation first and install it
- Customize shadcn components via Tailwind classes and component props only
- Reference: https://ui.shadcn.com/docs/components

### Tailwind v4

- This project uses Tailwind CSS v4. Use v4 class names only.
- Gradients: use `bg-linear-to-*` (e.g. `bg-linear-to-b`, `bg-linear-to-r`), not `bg-gradient-to-*`.

### Language: Mongolian Only

- All user-facing text, labels, buttons, messages, and content must be in Mongolian
- Exception: Widely recognized English words/names are allowed (e.g., "JavaScript", "React", "Next.js", "GitHub", "LinkedIn", "Facebook", "Instagram", "Email", "API", "CSS", "HTML", "JSON", "RSS", "XML", "URL", "SEO", "OG", "GA4", "CSV", "MDX")
- Technical terms that are commonly used in Mongolian tech community can remain in English
- Error messages, success notifications, form labels, navigation items, and all UI text must be in Mongolian
- Blog post content should be in Mongolian
- Calculator labels, inputs, and outputs should be in Mongolian
- When in doubt, prefer Mongolian translation over English
