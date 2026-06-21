<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Samuel's — project guide

Editorial / magazine-style site for **Samuel's**, a barbershop in Valby, Copenhagen. Danish copy.
Built from Figma (file key `6mXRudIiM0AL2CcTyMd0Jg`; pull frames via the Figma MCP). Aesthetic:
minimal, **sharp-edged (no border-radius)**, token-driven.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind **v4** (CSS-first `@theme` in
`src/app/globals.css`) · shadcn/ui (`base-nova`, Base UI primitives) · framer-motion · Swiper.

## Golden rules
- **Every value maps to a token/utility — never hardcode raw Figma px.** Snap to the type scale,
  the color tokens, and the layout primitives below.
- **Page-specific copy lives inline** in the page/component. **Reusable business data** goes in
  `src/data/*.ts`.
- **Sharp edges everywhere** (`--radius: 0`). No rounded corners.
- **Light text/marks on dark surfaces are pure `white`.** Off-white `#fbfaec` is a *reserved* token
  (`bg-offwhite`/`text-offwhite`) but **not used** in the current design.
- The shell (`AnnouncementBar` + `Header` + `Footer`) is rendered once in `src/app/layout.tsx`.
  **Pages render only their own content** (sections), never the shell.
- Don't build undescribed features ahead of spec — implement what's designed, defer the rest.

## Colors (`@theme`)
`bg-white` (page bg) · `text-brown` `#2a1915` (default text, used instead of black) ·
`bg-green`/`text-green` `#15311e` (primary; footer, announcement, active nav) ·
`bg-beige` `#fbd090` (accent) · `text-white` (on dark) · `--color-offwhite #fbfaec` (reserved, unused).
shadcn semantic tokens are mapped to the brand; `--radius: 0`.

## Typography — compose **SIZE + VOICE** (utilities in `globals.css`)
One shared scale (perfect-fourth, 1.333). **No `clamp()`** — switch sizes at breakpoints with `md:`.

- **Sizes** (size + line-height only): `display` 67 · `h1` 51 · `h2` 38 · `h3` 28 · `lead` 21.
  Also `text-body` 16 (body default) · `text-caption` 12. (`text-display`/`text-h1`… exist too, same sizes.)
- **Voices** (font · case · weight · width · tracking):
  - `montaga` — Montaga serif, normal case, −0.02em (headlines & display values).
  - `condensed` — Special Gothic, UPPERCASE, weight 700, width 80 (nav items, bold labels).
  - `kicker` — standalone eyebrow label: Special Gothic 14px / 500 / width 90 / 0.04em / UPPERCASE
    (footer & nav section labels, announcement). Carries its own size.
- Usage: `className="h3 montaga md:h1"`, `"h2 condensed"`, `"kicker"`. Body text = default (`text-body`).
- Fonts (next/font in `layout.tsx`): **Montaga** (`--ff-montaga`, 400) and **Special Gothic**
  (`--ff-gothic`, variable `wght`+`wdth`, `adjustFontFallback:false`). Body uses Special Gothic.

## Layout primitives (`src/components/layout/`)
- **`Container`** — fluid gutter `px-[clamp(16px,2vw,32px)]`; prop `contained` centers inner content
  at `max-w-content` (1080px). Change the gutter **here only**; it propagates everywhere.
- **`Section`** — semantic `<section>` that wraps children in `Container`. Props: `contained`,
  `bleed` (skip the gutter, e.g. full-bleed banners). Vertical spacing is set per-use via `className`.
- Hero column gap = `clamp(32px,4vw,64px)` (= 2× the gutter).

## Components
**heroes/** `Hero({ title, text, image?, imageAlt?, priority? })` — title + free `text` (4fr) beside a
**16:10** `Media` image (6fr); mobile stacks. `pt-16 md:pt-0`, no other vertical padding. Reusable per page.
· `HeroFull({ title, children, image?, imageAlt? })` — full-screen variant: image fills its column
height and is **sticky** on desktop (follows long copy); title + body sit at the bottom of the text
column; mobile stacks (title → image → body) with `pt-16`. Grid `[4fr 6fr] / [1fr auto auto]`.

**ui/**
- `Media({ src?, alt?, className, sizes?, priority? })` — **the image primitive**: `next/image`
  fill + object-cover + neutral bg; box size/aspect from `className`. Defaults `src` to
  `/placeholder.png` — set `src` to swap in a real image. Use for all content images.
- `button.tsx` (shadcn, streamlined to the brand) — variants `default` (filled brown CTA),
  `hvid` (filled white, brown text — over dark imagery), `outline` (white outline on transparent —
  over the hero photo); one size `xl`. Sharp-edged. Import `Button` from `@/components/ui/button`. For a
  link-button, render a `Link` through it: `<Button nativeButton={false} render={<Link … />}>` (or apply
  `buttonVariants(...)` to the element directly).
- Brand marks (`logo.tsx`): `Logo` (header wordmark), `LogoFull` (footer lockup), `ClubSamuels`
  (CTA signature). Each is a `BrandMark` (`brand-mark.tsx`) = CSS-masked SVG from `public/logos/`
  that **recolors to the inherited text color** (`bg-current`). Drop new SVGs in `public/logos/`.
- `reveal.tsx` `Reveal` — framer-motion scroll-in (fade + rise, `whileInView`, once). Wrap sections/items.
- `arrow-up-right.tsx` `ArrowUpRight` — shared ↗ icon (inherits `currentColor`); used by nav + services.
- `bg-video.tsx` `BgVideo({ mobile, desktop, poster, className })` — decorative looping bg video; serves
  the mobile/desktop MP4 by viewport, poster fallback, muted+`playsInline` autoplay, respects reduced-motion.
- `barber-card.tsx` — portrait (`Media` 4:5) + name (`lead condensed`) + role.

**sections/** `BarbersSection({ title, intro, barbers })` (responsive grid) ·
`ServicesSection({ services })` (Ydelser price list — divided rows: name + description + ↗, with an
"in-store only" pill for non-bookable services) ·
`NewsletterBanner({ heading })` — full-bleed-ish **looping background video inset by the gutter**
(`BgVideo`, webp poster + per-breakpoint MP4), scrim, `ClubSamuels` mark, heading, single white button.

**layout/** `Header` (sticky, blurred, bottom border) renders `LaunchBadge` · centered `Logo` ·
`NavMenu`. `AnnouncementBar` (green strip). `Footer` (green: contact/hours/address columns + `LogoFull`).
- `LaunchBadge` — countdown to `site.launch.date` in **Danish time** (Europe/Copenhagen). Before:
  "N Days Left" / "Launch Party"; on/after: "We're open" / "01 JUL 2026". Client-computed via `useIsHydrated`.
- `NavMenu` — burger menu. Items from `site.nav`, `condensed` voice, left-aligned, active = green.
  Desktop: right-docked 460px panel (`border-l` brown) over a 10%-white + 8px-blur overlay, ↗ arrow on
  hover. Mobile: full-screen, no arrows. Slides in **from the right** both breakpoints; burger↔X morph;
  portals to `body`; measures header bottom for the top offset; locks scroll; Esc/overlay/link to close.

**lib/** `cn()` (`utils.ts`, extends tailwind-merge so the custom `text-*` sizes don't clash with text
colors) · `useIsHydrated()` (`use-is-hydrated.ts`) · `useMediaQuery(query)` (`use-media-query.ts`) — both
`useSyncExternalStore`, SSR-safe; use these instead of `setState`-in-effect, which ESLint forbids.

## Data (`src/data/`)
- `site.ts`: `name`, `nav[]` ({label, href}), `launch` ({date, label, openText}), `announcement`,
  `contact`, `openingHours[]`, `address`, `copyrightYear`. Exports `fullAddress` and **`mapsHref`**
  (Google Maps link — the address is a `target="_blank"` link in the nav & footer).
- `barbers.ts`: `Barber[]` ({name, role, image}). · `services.ts`: `Service[]` ({name, description, inStoreOnly?}).

## Images
One shared placeholder `public/placeholder.png` (gray). Swap real images by setting `src`. Real photos
are optimized to WebP into `public/images/` (e.g. `signup-bg.webp` via `cwebp -q 82 -resize <w> 0`).
`Media`/`next/image` handle responsive sizing — always pass a `sizes` hint.

## Routes & what's next
- Built: **`/om-os`** (`Hero` → `BarbersSection` → `NewsletterBanner`), **`/ydelser`**
  (`Hero` → `ServicesSection` → `NewsletterBanner`), **`/launch-party`** (`HeroFull`). Placeholder home `/`.
- **To build** (nav target, currently 404): **`/booking`**.

### New-page skeleton
```tsx
// src/app/ydelser/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/heroes/Hero";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = { title: "Ydelser — Samuel's", description: "…" };

const INTRO = "…"; // page copy stays inline

export default function YdelserPage() {
  return (
    <>
      <Hero title="Ydelser" text={INTRO} image="/placeholder.png" />
      <Section contained className="py-16 md:py-24">{/* sections … */}</Section>
    </>
  );
}
```

## Verify
`npm run dev` (→ :3000), `npm run lint`, `npm run build` — keep all clean. Sections animate on scroll
(`whileInView`), so scroll the page before screenshotting to trigger them.

## Parallel work
Pages live in separate `src/app/<route>/page.tsx` files — safe to build in parallel. **Coordinate on
shared files**: `src/data/site.ts`, `src/app/globals.css`, and `src/app/layout.tsx`. Add new nav entries
or tokens deliberately to avoid conflicts.
