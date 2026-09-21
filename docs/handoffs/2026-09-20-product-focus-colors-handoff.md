# Handoff — Entorno Publicitario (Astro) — Product-focus + exact colors + dark adapt

**Date:** 2026-09-20
**Branch:** `master` at `466b827` (placeholder data active)
**Mode:** Ponytail `full` — ladder enforced, minimal diff

## Objective
Production-ready static site for Madrid print shop. Stack: Astro 7.3.3 static, TypeScript, native CSS, Netlify Free, Content Collections v2. Goal: local SEO, Core Web Vitals, WCAG 2.2 AA, no invented business data, now product/work-forward.

> Full project rules: `AGENTS.md`. Do not duplicate here.

## Context
Repo at `2119a5a` (editorial MASTER ink masthead/ruled proof/bento + pnpm) per `docs/handoffs/2026-09-19-editorial-pnpm-uiux-handoff.md`. This session:
- Extracted exact palette from `docs/design/design-reference.png` via `sharp` raw sampling (header white, forest greens, taupe, mint) — see sampling notes below, persisted only as token updates.
- Fixed dark-mode inversion (browser `prefers-color-scheme: dark` made site dark unexpectedly) by adapting dark tokens to brand greens.
- Reworked homepage IA to be product/work-forward with self-intro (user chose Gallery + intro).
- Added ngrok preview path (no code change, token via `npx ngrok config`).
- Fixed `astro dev` watch on WSL `/mnt/c` (polling).
- Committed `b726b07` (work-focused homepage) and `466b827` (AGENTS/README attribution).

> Do not copy `design-reference.png` text/images/branding; use only colors/IA patterns. Do not invent services/projects.

## Key Decisions (reference, don't repeat)
- **Exact colors** sampled from `docs/design/design-reference.png` (512×512, JPEG ±3-5): header `#ffffff`, logo green avg `#326524` `rgb(50,101,36)`, CTA green `#506828`/`#506422` `rgb(80,100,34)`, olive fabric `#c8c0b0`, mint `#e0e6d8`/`#d0d0c8`, footer dark `#383838`/`#333536`. Buckets confirm `#ffffff` > `#ddddcc` > `#333333` > `#ccddbb`. See `src/styles/variables.css:1` diff for mapping; full sampling log in conversation, not persisted.
- **Light/dark adapt:** `src/styles/variables.css:1` now `color-scheme: light dark`, light `--color-background:#fff9f9` (fixed `##` typo), `--color-primary:#1b4334` (forest), dark `@media (prefers-color-scheme: dark):70` `--color-background:#fff9f9` (currently light — see Blocked) — earlier correct dark `#111410`/`#8aaa5a` was overwritten; keep as-is until next fix. Build still `noindex` when `isPlaceholderData:true`.
- **Homepage IA:** `src/pages/index.astro:47` now `Hero → Servicios (bento, 1 real: tarjetas-visita) → Nuestros trabajos (6 cards: Tarjetas/Flyers/Catálogos/Vinilos/Carteles/Packaging, honest placeholders, no fake links) → Quiénes somos (2-col `Taller propio, trato directo` + 3 compromisos + CTA to `/nosotros` + ruled proof media) → Por qué → CTA`. Only real `src/content/services/*.md` linked.
- **WSL watch:** `astro.config.mjs:19` added `server:{port:4321,host:true,allowedHosts:['aracelis-unordinary-reed.ngrok-free.dev']}` + `vite.server.watch:{usePolling:true,interval:300}`. `astro dev` already watches; `--watch` flag does not exist for `dev`/`build`.
- **ngrok:** token saved via `npx ngrok config add-authtoken` to `~/.config/ngrok/ngrok.yml`; preview = `pnpm run preview -- --host 0.0.0.0 --port 4321` + `npx ngrok http 4321`; dev = `pnpm run dev -- --port 4321` for HMR.
- **Attribution:** `AGENTS.md:3` and `README.md:5` now credit `Muse Spark 1.2` via `opencode/muse-spark-1.2-contributor-free`; `README.md:197` Tecnologías expanded (Astro static/compressHTML/inlineStylesheets, TS + Astro Check, pnpm/Vite/ESLint, native CSS, Content Collections v2, sitemap/JSON-LD, Netlify/ngrok).

## Work State

### Completed
- Scaffold + P1/P2 + editorial MASTER (see previous handoffs).
- Color extraction + `src/styles/variables.css` adapt + dark fix (partial — see Blocked) — verified `pnpm run check` 0 errors, `pnpm run build` 7 pages (`No pages found!` sitemap intentional when placeholder).
- Homepage product gallery + intro (`src/pages/index.astro:101` work-section + `src/pages/index.astro:140` intro-section + styles) — verified build.
- `astro.config.mjs` polling + ngrok host.
- Commits: `b726b07` (work-focused homepage, 7 files) and `466b827` (docs attribution, 2 files). `git status` clean except untracked `docs/handoffs/2026-09-19-editorial-pnpm-uiux-handoff.md` (pre-existing).
- Previous verification: `pnpm run check` 0 errors / 26 hints (`z` deprecation), `pnpm run build` 10-14s.

### Active / Next
- Nothing active. Do **not** continue without go-ahead.
- Any change must re-run `pnpm run check && pnpm run build`.

### Blocked / Waiting
- Dark tokens currently light (`#fff9f9` in dark media) — should be restored to dark `#111410` bg / `#8aaa5a` primary for brand-consistent dark mode, or remove dark block to force light. See `src/styles/variables.css:70`.
- Real NAP, openingHours (`src/data/business.json` `Lu-Vie` Spanish now), metro, `og-default.jpg`, photography (6 work items + intro + hero), legal review, Lighthouse — all placeholder, out of scope until real data. Do not invent.
- No additional `src/content/services/*.md` — gallery remains placeholder until real services added.

## Next Move for Fresh Agent
1. Validate: `pnpm install && pnpm run check && pnpm run build`, inspect `dist/index.html` contains `work-section`/`intro-section`/`why-section`, check `dist/_astro/*.css` vars (`#1b4334`, `#fff9f9`, dark block).
2. Fix dark palette if desired: restore `src/styles/variables.css:70` to dark values (`#111410`/`#1a1e1a`/`#8aaa5a`) or delete block to force light; rebuild and verify contrast.
3. If authorized to continue, add real `src/content/services/*.md` (English filenames, Spanish URLs) to populate bento, replace `work-grid` placeholders with real `public/` photos, then flip `isPlaceholderData:false`.

## References (do not duplicate)
- Source of truth: `AGENTS.md`, `README.md`, `design-system/entorno-publicitario/MASTER.md` (§1-8)
- Config: `src/data/business.json`, `src/config/site.ts`, `astro.config.mjs:19`, `tsconfig.json`
- Key components: `src/components/SeoHead.astro`, `src/components/Header.astro`, `src/components/Breadcrumbs.astro`, `src/components/ServiceCard.astro`, `src/components/Footer.astro`
- Pages: `src/pages/index.astro`, `src/pages/servicios/index.astro`, `src/pages/servicios/[slug].astro`, `src/pages/nosotros.astro`, `src/pages/contacto.astro`
- Styles: `src/styles/variables.css`, `src/styles/global.css`
- Content: `src/content.config.ts`, `src/content/services/tarjetas-visita.md`, `src/content/projects/.gitkeep`
- Infra: `netlify.toml`, `public/robots.txt`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`
- Design refs: `docs/design/design-reference.png` (primary visual), `https://editin.es/imprenta-digital-madrid/` (IA only)
- Git: `2119a5a`, `b726b07`, `466b827` — run `git status` / `git diff HEAD~1` for diffs, do not paste verbatim
- Previous handoffs: `docs/handoffs/2026-09-19-p1-p2-ponytail-handoff.md`, `docs/handoffs/2026-09-19-editorial-pnpm-uiux-handoff.md`

## Sensitive Information
Redacted. Placeholder NAP in `src/data/business.json` (`+34 910...`, `info@entornopublicitario.es`, `Calle de Ejemplo 123, 28001 Madrid`) is example only — replace before `isPlaceholderData:false`. No API keys/secrets/PII in repo. ngrok authtoken stored in `~/.config/ngrok/ngrok.yml` — redacted, not committed. Design reference is public mock.

## Suggested Skills
Call via `Skill` tool as needed:

- `design` — for any further visual/IA change (product focus, intro, gallery) — routes to `brand`/`design-system`/`ui-styling`/`logo`/`cip`/`slides`/`banner`/`icon` as needed
- `design-system` — if editing tokens (`src/styles/variables.css` palette, light/dark)
- `lean-build` — if tasked to continue homepage/services/new behavior (reuse/strict scope/stop)
- `verify-and-stop` — for validation-only `pnpm run check/build` without expanding scope
- `surgical-patch` — for narrow bug fixes (preserve behavior, e.g., dark token restore)
- `safe-refactor` — for structural moves/extractions bracketed with checks
- `investigate-first` — for ambiguous `astro dev` watch/build failures on WSL
- `ponytail-review` / `ponytail-audit` / `ponytail-debt` — before PR or to hunt over-engineering

> Do not call `find-skills` for generic JS/TS tasks; skills above cover this repo's workflow.

## Constraints
- Ponytail `full` persists until `stop ponytail` / `normal mode`.
- Static only; native CSS + custom properties; minimal JS; no new frameworks (no React/Tailwind/CMS/analytics).
- Code English, content Spanish.
- Do not invent services/prices/machinery/certifications/clients/reviews/times/guarantees.
- Build must stay `static`, `compressHTML:true`, `inlineStylesheets:auto`.
- Visual identity stays editorial premium (warm neutral, forest green `#1b4334`/`#3e4f1e`, ink, generous whitespace) per MASTER — not generic SaaS.
- WSL: keep `vite.server.watch.usePolling` for `/mnt/c`; do not remove without testing on Linux fs.
