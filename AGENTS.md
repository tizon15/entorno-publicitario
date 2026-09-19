# AGENTS.md

## Project
- Astro + TypeScript website for a local printing company in Madrid; SEO-optimized.
- Static site generated with Astro 7, deployed to Netlify Free.

## Commands
```bash
pnpm install      # Install dependencies
pnpm run dev      # Dev server at http://localhost:4321
pnpm run build    # Production build to dist/
pnpm run preview  # Preview production build locally
pnpm run check    # TypeScript + Astro type checking
pnpm run lint     # ESLint on .astro and .ts files
```

## Architecture
- **Framework**: Astro 7.3.3 (static output)
- **Styling**: Native CSS with custom properties (no Tailwind)
- **Content**: Astro Content Collections v2 (glob loader) for services & projects
- **Forms**: Netlify Forms (honeypot anti-spam, client-side validation)
- **SEO**: @astrojs/sitemap, LocalBusiness/Service/BreadcrumbList JSON-LD, OG/Twitter cards, canonical URLs
- **Typography**: System font stack (self-hosted font upgrade path documented)
- **Images**: AVIF/WebP via Astro assets (when added), lazy loading, explicit dimensions
- **Accessibility**: WCAG 2.2 AA target — skip links, focus-visible, semantic HTML, proper heading hierarchy, ARIA labels

## Key Files
- `src/data/business.json` — Editable business data source of truth (JSON). **Edit with real data before launch.**
- `src/config/site.ts` — Typed re-export of `business.json` for app imports (`@config/site`).
- `src/content.config.ts` — Content collections schema (services, projects)
- `src/content/services/` — Service pages as Markdown + frontmatter
- `src/pages/servicios/[slug].astro` — Dynamic service detail page (getStaticPaths + render)
- `src/components/SeoHead.astro` — SEO metadata + structured data + placeholder noindex logic
- `src/components/Breadcrumbs.astro` — Reusable breadcrumbs with BreadcrumbList microdata
- `src/components/ContactForm.astro` — Netlify Forms with consent + validation
- `netlify.toml` — Build config, headers, caching
- `public/robots.txt` — Allow all, sitemap reference (`https://entornopublicitario.es/sitemap-index.xml`)

## Content Model (services)
```yaml
---
title: "Tarjetas de visita en Madrid"
description: "Meta description for SERP"
slug: "tarjetas-visita"
serviceType: "Business Card Printing"
specifications: ["Formato 85x55mm", "Papel 350-400g"]
useCases: ["Tarjetas corporativas", "Networking"]
order: 1
---
Markdown content...
```

## Adding a New Service
1. Create `src/content/services/nuevo-servicio.md` with frontmatter + content
2. Run `pnpm run build` — page auto-generated at `/servicios/nuevo-servicio/`
3. Services lists in `src/pages/index.astro` and `src/pages/servicios/index.astro` are dynamic from the collection — no manual list update needed

## Deployment (Netlify)
1. Connect repo in Netlify dashboard
2. Build command: `pnpm run build` (auto-detected)
3. Publish directory: `dist` (auto-detected)
4. Forms auto-detected via `data-netlify="true"`
5. No environment variables required for core functionality

## Placeholders to Replace
- `siteConfig.name`, `url`, `telephone`, `email`, `address.*` in `src/data/business.json`
- Opening hours, metro station in contact/about pages
- `og-default.jpg` in `public/` for social sharing
- Legal pages (`/aviso-legal`, `/politica-cookies`) — create or remove links from footer ( `/politica-privacidad` exists as minimal stub)

Note: `isPlaceholderData:true` in `business.json` emits `noindex,nofollow` and excludes sitemap entries. Set to `false` only when real business data is complete — both behaviors flip together via `astro.config.mjs` filter.