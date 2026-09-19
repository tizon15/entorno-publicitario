# Handoff — Entorno Publicitario (Astro) — P1 + P2 Ponytail

**Date:** 2026-09-19  
**Branch:** `master` (placeholder data active)  
**Mode:** Ponytail `full` — ladder enforced, minimal diff, deletion over addition

## Objective
Production-ready static site for a Madrid print shop. Stack: Astro 7.3.3 (static), TypeScript, native CSS, Netlify Free, Content Collections v2. Goal: local SEO, Core Web Vitals, WCAG 2.2 AA, no invented business data.

> Full project rules: `AGENTS.md`. Do not duplicate here.

## Context
Repo was pre-scaffold (`master` at `82bd438`/`92b27c0`). Scaffold was created manually (no `create-astro`), then a grill-me session locked 14-section spec, then an 18-section implementation plan was split into P1/P2/P3. Instruction: implement **only P1 + P2**, verify with `npm run check` + `npm run build`, do **not** continue to P3.

## Key Decisions (reference, don't repeat)
- Canonical domain settled to **without hyphen** `https://entornopublicitario.es` (overrode earlier `https://entorno-publicitario.es`). See `astro.config.mjs:16` and `public/robots.txt:8`.
- **Data layer:** `src/data/business.json` is editable source of truth; `src/config/site.ts` is typed re-export (`import businessData from '../data/business.json'`) to keep `import @config/site` stable. Real data edited only in JSON.
- **Indexing sync (P1):** `isPlaceholderData:true` must flip **both** `SeoHead` (`noindex,nofollow`) and sitemap together. Implemented via `astro.config.mjs:7-25` (`readFileSync` + `JSON.parse` at build, `sitemap({ filter: () => !isPlaceholderData })`). Fallback is placeholder-safe.
- **Routes:** Files English, URLs Spanish — `/servicios`, `/servicios/[slug]`, `/nosotros`, `/contacto`, `/politica-privacidad`, `/404`. No `/proyectos` until real content; `.gitkeep` silences glob warning.
- **PE nav (P2):** Without JS nav always visible; with JS `.js` collapses to toggle (`aria-expanded`/`aria-controls` kept). Desktop `min-width:768px` always visible. No library.
- **Breadcrumbs (P2):** Canonical `src/components/Breadcrumbs.astro` (`items: {label,href?}[]`, `BreadcrumbList` microdata). Inline<nav class="breadcrumbs"> removed from all pages.
- Footers trimmed to one real service + single `/politica-privacidad` link; privacy page marked `[PENDIENTE DE REVISIÓN LEGAL]` — do not invent legal text.
- Placeholders are honest (emoji + dashed workshop), no stock; performance not claimed until Lighthouse measured.

> Consolidated grill decisions and plan phasing were in conversation only (not yet persisted as `docs/spec.md`/`docs/plan.md`). See this handoff + git diff for behavior. If a spec file is added later, reference it instead of duplicating.

## Work State

### Completed
- Scaffold: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/config/site.ts`→`src/data/business.json`, `src/styles/*`, `src/layouts/BaseLayout.astro`, `src/components/{Header,Footer,SeoHead,ContactForm,ServiceCard,Breadcrumbs}.astro`, `src/pages/{index,404,nosotros,contacto,politica-privacidad}.astro`, `src/pages/servicios/{index,[slug]}.astro`, `src/content.config.ts`, `src/content/services/tarjetas-visita.md`, `public/robots.txt`, `netlify.toml`, `README.md`.
- P1: created `src/data/business.json` (redacted below), rewrote `src/config/site.ts` to re-export, rewrote `astro.config.mjs` for sync filter, updated `AGENTS.md`/`README.md`/`public/robots.txt` domain, added `resolveJsonModule` family to `tsconfig.json`, created `src/content/projects/.gitkeep`.
- P2: edited `src/components/Header.astro` PE CSS (`.js .main-nav`, `.js .nav-toggle`, mobile `position:absolute` only under `.js`), migrated `nosotros.astro`, `contacto.astro`, `politica-privacidad.astro`, `servicios/index.astro`, `servicios/[slug].astro` to `Breadcrumbs` component and deleted duplicated breadcrumb CSS.
- Verification: `npm run check` → 0 errors, 27 hints (`z` deprecation); `npm run build` → 7 pages, placeholder mode: `dist/index.html` contains `noindex,nofollow`, sitemap excluded (`No pages found!` warning, intentional). Toggled `isPlaceholderData:false` once to prove sitemap generates 6 Spanish URLs with `index,follow` — then reverted to `true`.

### Active / Next (P3 deferred)
- Nothing active. Do **not** start P3 without explicit go-ahead.
- Any further change must re-run `npm run check` then `npm run build` and fix errors (e.g., `filter: () =>` unused-param hint was fixed).

### Blocked / Waiting
- Real business NAP, opening hours, metro, `og-default.jpg`, photography, legal review, Lighthouse measurement — all out of scope for placeholder phase.

## Next Move for Fresh Agent
1. Validate current state: `npm run check && npm run build`, inspect `dist/index.html` robots meta and `dist/sitemap-*.xml` absence (expected when placeholder).
2. If authorized to continue, pick up **P3** from the implementation plan discussed in conversation (no file yet — reconstruct from this handoff + `AGENTS.md` + git history; propose creating `docs/plan-p3.md` first rather than coding directly).
3. Do not recreate pages, do not add dependencies/CMS/analytics, do not invent content, keep identifiers English / URLs Spanish.

## References (do not duplicate)
- Source of truth: `AGENTS.md`, `README.md`
- Config: `src/data/business.json`, `src/config/site.ts`, `astro.config.mjs:7-25`, `tsconfig.json`
- Key components: `src/components/SeoHead.astro`, `src/components/Header.astro`, `src/components/Breadcrumbs.astro`
- Pages: `src/pages/nosotros.astro`, `src/pages/contacto.astro`, `src/pages/servicios/index.astro`, `src/pages/servicios/[slug].astro`, `src/pages/politica-privacidad.astro`
- Content: `src/content.config.ts`, `src/content/services/tarjetas-visita.md`
- Infra: `netlify.toml`, `public/robots.txt`
- Design ref image: `docs/design/design-reference.png`
- Git: `master@82bd438`, `master@92b27c0`; working tree is scaffold + P1/P2 uncommitted (run `git status` / `git diff HEAD` for exact diff; do not paste diff verbatim here).

## Sensitive Information
Redacted. Placeholder NAP in `src/data/business.json` is example data only (`telephone`, `email`, `address.street/postalCode/city`) — replace with real values before setting `isPlaceholderData:false`. No API keys, secrets, or real PII in repo.

## Suggested Skills
Call via `Skill` tool as needed:

- `lean-build` — if tasked to continue P3 (new behavior with reuse/strict scope/stop condition).
- `verify-and-stop` — for validation-only runs (`npm run check`/`build`) without expanding scope.
- `surgical-patch` — for narrow bug fixes (preserve surrounding behavior, regression proof).
- `safe-refactor` — for structural moves/extractions while preserving behavior (bracket with checks).
- `investigate-first` — if facing ambiguous failure or intermittent build/check issue (rank hypotheses).
- `ponytail-review` — before any PR, to hunt over-engineering (what to delete).
- `ponytail-audit` / `ponytail-debt` — whole-repo bloat scan or listing `ponytail:` deferrals.
- `caveman-optimize` — only if asked to evaluate a token/cost tradeoff.

> Do not call `find-skills` for generic JS/TS tasks; the skills above cover this repo's workflow.

## Constraints
- Ponytail `full` persists until `stop ponytail` / `normal mode`.
- Static site only; native CSS; minimal JS; no React/Next/CMS/new deps.
- Language: code English, content Spanish.
- Build must stay `output: 'static'`, `compressHTML:true`, `inlineStylesheets:'auto'`.
