# Samuel's

Editorial, sharp-edged website for **Samuel's** — a barbershop in Valby, Copenhagen.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui · framer-motion · Swiper.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where things live

- `src/app/` — routes (`/om-os` built; `/launch-party`, `/booking`, `/ydelser` to come). The shell
  (announcement bar, header, footer) is in `layout.tsx`; pages render only their sections.
- `src/app/globals.css` — Tailwind v4 `@theme`: brand colors, the SIZE+VOICE type system
  (`display/h1/h2/h3/lead` × `montaga`/`condensed`, plus `kicker`), tokens.
- `src/components/` — `layout/` (Container, Section, Header, Footer, NavMenu…), `heroes/`,
  `sections/`, `ui/` (Media image primitive, brand marks, button…).
- `src/data/` — reusable business data (`site.ts`, `barbers.ts`). Page copy stays inline in pages.
- `public/` — `placeholder.png` (swap real images via the `Media` `src`), `logos/`, `images/`.

## Conventions

See **[AGENTS.md](./AGENTS.md)** for the full design system, component inventory, and a new-page
skeleton. In short: map every Figma value to a token, sharp edges (radius 0), white page background,
white text on dark surfaces, and compose headings as `"<size> <voice>"` (e.g. `h3 montaga md:h1`).
