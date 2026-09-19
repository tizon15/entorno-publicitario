# Design System Master — Entorno Publicitario

> **LOGIC:** When building a specific page, first check `design-system/entorno-publicitario/pages/[page-name].md`.
> If that file exists, its rules **override** this Master.
> If not, strictly follow the rules below.

---

**Project:** Entorno Publicitario — Imprenta local Madrid (premium, cercana)
**Generated:** 2026-09-19 — updated for combined references
**Primary visual source:** `docs/design-reference.png` (warm off-white, muted green, charcoal, editorial, generous whitespace, large photography, clean grid)
**Secondary structural source:** `https://editin.es/imprenta-digital-madrid/` — used ONLY for IA patterns, not for copy/colors/layout/branding
**Category:** Local Service / Craft — Editorial Premium
**Stack:** Astro 7.3.3 static, TypeScript, native CSS + CSS custom properties, Content Collections, Netlify Forms, no React/Vue/Tailwind/UI framework, minimal JS

---

## 1. Updated Design Direction

**Positioning:** Taller propio en Madrid desde 2004. No SaaS, no startup genérica. Cercanía + oficio: asesoramiento real, control del proceso, materiales. Premium pero accesible, profesional y confiable.

**Visual identity (from `design-reference.png` as source of truth):**
- Fondo warm off-white (#fdfbf7 / #fcfaf7) — no blanco frío puro, sensación papel.
- Acento principal muted green sage/forest desaturado (#3d4a36 → hover #2f3c2b) — usado con moderación (CTAs, detalles, iconos), no como fondo dominante.
- Tipografía dark charcoal (#121412 / #1d211e) — contraste alto, sin grises medios para cuerpo.
- Acento cálido secundario muy puntual: ink terracotta (#9a6a2e) solo para detalles de registro/borde, nunca como CTA principal.
- Fotografía grande como protagonista (mesa de trabajo, papeles, pruebas) con placeholders honestos hasta tener fotos reales. Sin ilustraciones AI ni stock genérico.
- Composición editorial: asimetría controlada, jerarquía tipográfica fuerte, mucho aire, reglas finas (hairlines), sombras muy sutiles, motion mínimo y con propósito.

**Tone:** Sobrio, cuidado, humano. Cada elemento debe justificar su existencia (ponytail: borrar antes que añadir).

**What this is NOT:** No SaaS minimal genérico, no glassmorphism, no gradientes saturados, no cards 3-col repetitivas, no animación decorativa.

---

## 2. Homepage Information Architecture

Order reflects story + conversion + local SEO. Do not add sections for length.

1. **Header (masthead editorial, not SaaS nav)**
   - Top hairline 3px black, logo EP + "Entorno Publicitario / Imprenta · Madrid — Est. 2004" (serif + mono), nav: Inicio, Servicios, Nosotros, Contacto, CTA rectangular "Solicitar presupuesto" + spec stamp "Prueba digital · FSC · 350g" visible ≥1100px. PE: sin JS nav siempre visible; con JS colapsa a hamburger 44px, `aria-expanded`.

2. **Hero — editorial asymmetric (ruled proof sheet)**
   - Left: eyebrow mono `Imprenta en Madrid — desde 2004` + H1 `IMPRESIÓN QUE DEJA HUELLA.` (huge 2.8-4.9rem, -0.06em, huge leading 0.85, italic accent with paper highlight), lead serif + description muted, actions `Solicitar presupuesto` (ink-black) + `Explora nuestra calidad` (hairline secondary), trust stamps mono `✓ Entrega 24–48h / Asesoramiento gratis / Revisión gratis / Envío España`, note mono `muestras y pruebas en taller · papel 350g · tintas vegetal`.
   - Right: desk proof sheet (white + ruled lines 23px + CMYK 8px bar cyan/magenta/yellow/black + registration L-marks + tape), stacked papers: back kraft, front brochure "Entorno Publicitario / Offset · 350g · FSC · Madrid", small card "Tarjetas 85×55", caption `Plaza para fotografía real`. On ≥960px media overlaps left by -1.25rem.

3. **Servicios — bento editorial, not 3 equal pills**
   - Header left-ruled: eyebrow `Qué hacemos` + H2 + description.
   - Grid: 12-col bento. `:nth-child(1) span 7 / span 5` etc. Only-child centered `4/6`. Cards: paper stamp style, media top with grain + top hairline, not full-bleed gradients. Uses only real services from `src/content/services/*.md` (today 1: tarjetas-visita). CTA left-aligned `Ver todos los servicios`.

4. **Por qué elegirnos — 2-col proof list**
   - Header left-ruled with ink accent.
   - 2-col (not 4) editorial list. Items: `32px` square hairline stamps (not pill), title, muted description. Slight rotation per card (+/-0.08deg) broken on hover. Content honest: asesoramiento, rapidez real (producción propia Madrid), revisión gratis, envío.

5. **CTA final — ink block, not SaaS gradient**
   - Dark ink `#1a2218` block `20/22/18/20px` radius, slight rotation -0.1deg, radial highlight only. Eyebrow light, H2 serif, mono note, actions `Pedir presupuesto` (white on ink) + `tel` secondary transparent.

6. **Footer — dark ink editorial**
   - Background `#1c211e`, 4-col on desktop `1.7/0.9/0.9/1` (brand with EP square + description + address/tel/email with underline, nav, services (only real), horario + rectangular spec stamp). Bottom hairline `08 white` with copy + `Política de privacidad`.

No testimonios/cifras/logos inventados. No añadir mapa hasta tener coordenadas reales (placeholder honesto en /contacto).

---

## 3. Service-Page Information Architecture

### 3a. `/servicios` (CollectionPage)
1. Breadcrumbs `Inicio / Servicios`
2. Hero left-ruled: `Impresión offset · Digital · Gran formato` + H1 `Servicios de impresión` + description "Cubrimos cualquier necesidad... asesoramos en materiales, acabados y plazos"
3. List: `ServiceCard` bento grid as above. Empty state: text with link to tarjeta real + contacto if no services (no dead links).
4. Proceso (Cómo trabajamos) — 4 pasos editoriales (no cards genéricas): `Pides presupuesto / Revisamos artes / Aprobación y producción / Entrega` — each `36px` numbered circle, title, muted description, `background var(--color-background)` + hairline, left-aligned.
5. CTA paper block: `¿No encuentras lo que buscas? / Hacemos trabajos a medida... / Pedir presupuesto personalizado`

### 3b. `/servicios/[slug]` (Service Detail — e.g., tarjetas-visita)
1. Breadcrumbs `Inicio / Servicios / [title]`
2. Header centered narrow: mono `Servicio · Madrid` + H1 + lead description
3. Body: `Content` markdown rendered inside paper card `max 760px` `padding clamp 1.25-2rem` `border hairline`. H2 with top rule, H3, `li::marker` green, blockquote with left green + soft bg.
4. If frontmatter has `specifications[]` / `useCases[]` → render as two definition sections under body (do not invent if empty).
5. Footer CTA card inside body: `¿Necesitas este servicio? / Te asesoramos... / Pedir presupuesto + Llamar: tel`
6. No related services carousel if only one service — avoid filler.

All service pages use `Service` + `BreadcrumbList` JSON-LD. No prices, machinery, times, guarantees unless real data exists.

---

## 4. Design Rules (Tokens & Principles)

### Color Palette (warm paper + ink, muted sage only as needed)
| Role | Hex | CSS Var | Usage |
|------|-----|---------|-------|
| Background warm off-white | `#fdfbf7` | `--color-background` | Page bg, paper |
| Surface | `#ffffff` | `--color-surface` | Cards |
| Surface alt/muted | `#f5f2eb` / `#f2f0eb` | `--color-surface-alt/muted` | Subtle blocks |
| Text ink | `#121412` | `--color-text` | Headings, body |
| Text muted | `#5e625e` | `--color-text-muted` | Descriptions |
| Text light | `#8a8e8a` | `--color-text-light` | Meta, captions |
| Primary ink | `#1a2218` | `--color-primary` | CTAs, header, footer, focus |
| Primary hover | `#0f1410` | `--color-primary-hover` | Hover |
| Primary light/soft | `#eef1eb` / `#f4f6f3` | `--color-primary-light/soft` | Focus rings, subtle bg |
| Border hairline | `#e8e6df` / `#d6d3cc` | `--color-border/strong` | Hairlines only |
| Rule | `#e0ddd6` | `--color-rule` | Dividers with diamond |
| Ink warm | `#9a6a2e` | `--color-ink` | Registration dot, foil edge (punctual) |
| Focus | `#1a2218` | `--color-focus` | `outline 1.5px` |

No orange accent from Editin, no gold luxury, no sage backgrounds dominant.

### Typography
- **Display/Headings:** `Fraunces / Playfair Display / Georgia` — `700-850`, `-0.04 to -0.06em`, `0.85-0.94` leading, `common-ligatures discretionary-ligatures`, `hanging-punctuation`. H1 `clamp 2.8-4.9rem`. Italic accent with paper highlight `#e8e0c8`.
- **Body/UI:** `Inter / system-ui` — `400-650`, `-0.01 to -0.02em`, `1.6` leading. `p` `hanging-punctuation: first`.
- **Mono specs:** `JetBrains Mono` — `0.62-0.72rem`, `0.06-0.12em` tracking, uppercase for eyebrows, trust stamps, marginalia, specs.
- **Scale:** xs 12px, sm 14px, base 16px, lg 18px, h2 `1.7-2.4rem`.
- **Constraint:** System stack now; self-host upgrade path documented in AGENTS.md — no Google Fonts import until performance budget allows.

### Spacing & Layout
- Tokens: `xs 4px`, `sm 8px`, `md 16px`, `lg 24px`, `xl 32px`, `2xl 48px`, `3xl 64px`. Section `clamp 2.5-4rem`.
- Container `1180px`, `padding 1.25rem → 1.5rem @768`.
- Editorial asymmetry: hero `1.15/0.88` with `-1.25rem` overlap; services 12-col bento; why 2-col max (not 4).
- Whitespace generous, optical not mathematical (hero top 1.25rem bottom 2rem on mobile).

### Effects
- **Paper grain:** fixed `body::before` `feTurbulence 0.82 numOctaves 3` at `0.028` opacity — always, very subtle.
- **Borders:** `1px` hairlines `e8e6df`, never `2px` except header rule `3px black` or section left rule `2px`.
- **Shadows:** restrained: `shadow-paper 0 1px 0 + 0 6px 14px (0.06)`, `shadow-md 0 8px 18px`, `shadow-lg 0 18px 32px` — no blurry large glows.
- **Motion:** `150-200ms ease`, `transform scale(0.99)` press only, `prefers-reduced-motion` disables. No parallax, no scroll-triggered storytelling, no glass/aurora.

### Iconography
- SVG only (Heroicons/Lucide), `14-22px`, `1.5-2px` stroke, `currentColor`, `aria-hidden` when beside text. No emojis. Consistent square stamps `32px` `2px` radius for why, not pills.

---

## 5. Component Rules

**Header (masthead):**
- Top `3px` black rule, `68px` height, white with `1px` bottom hairline, no blur.
- Logo: `36px` square black `EP` (serif 750) + two-line type lockup (name `1.02rem -0.035em` serif + sub mono `0.62rem 0.08em` uppercase).
- Nav: `0.85rem 550` with `1.5px` bottom underline on hover (no pill bg). PE: `768px` breakpoint but implementation uses `900px` with `.js` class.
- Header actions: hidden `Prueba digital · FSC · 350g` mono stamp `≥1100px`, CTA rectangular `0.78rem 650 uppercase 0.02em` black/white inversion on hover.

**Buttons:**
- Radius `4px` (`--radius-btn`), not pill. Primary ink-black, secondary white hairline, tel same as secondary. `0.88rem 650`, `0.72-0.82rem` padding, `1px` border, press `scale 0.99`.

**Hero trust stamps:**
- `0.66rem` mono `600 0.06em` uppercase, white `1px` hairline `3px` radius, `✓` in ink color prefix.

**ServiceCard (paper stamp):**
- `13/15/14/13px` irregular radius, `1px` hairline, `shadow-paper`, grain `0.05` overlay, hover `translateY -1px rotate 0.12deg`. Media `16/10.2` with top grain + `Kraft?` sage `eef1eb` + ruled paper bg, `10-12px` icon pill, note `0.7rem 600 0.08em` uppercase muted. Body `14px` gap, title `1.05rem 700 -0.015em`, link underline on hover with `gap 0.5rem`.

**Breadcrumbs:**
- `0.82rem` mono-ish, `border-bottom 1px`, centered via container, separator `·`, link `500` underline on hover, `aria-current` `600`.

**ContactForm (Netlify):**
- Paper card `clamp 1.25-1.75rem` padding `shadow-sm`, `1px` hairline, `10px` radius, inputs `0.65rem 0.8rem` `1px` strong border `6px` radius, focus `border #121412 + 2px ring 08`. Honeypot `bot-field` left -9999, consent `16px` checkbox `accent-color ink`, errors `has-error` `c53030`.

**Why-item / Process-step:**
- `13/15/14/13px`, `1px` hairline, slight rotation `±0.08deg`, hover `rotate 0deg`. Icon square `32px` hairline, not pill. Top accent `2px` ink/green per nth-child.

**CTA block:**
- Ink `#1a2218` `20/22/18/20px` irregular, `rotate -0.1deg`, radial highlight only, primary button white on ink.

**Footer:**
- Dark `#1c211e` + `1px #2a2e2a` top, 4-col `1.7/0.9/0.9/1`, EP square `08 white`, mono sub, address `0.88rem`, links `a8aca7 → white`, legal `08 white` hairline top, rectangular spec stamps.

**General:** All cards use `inset 0 1px 0 rgba(255,255,255,0.9)` inner highlight for paper. No glass, no pill, no lift `translateY -2px` on cards (only ` -1px rotate`).

---

## 6. Responsive Rules (intentionally designed, not collapsed desktop)

- **Breakpoints:** `560` (mobile stack), `640` (2-col), `720` (why 2-col), `768` (section padding reduce), `900` (header toggle), `960` (hero overlap), `1024` (12-col bento), `1100` (header specs visible).
- **Mobile first:** Hero media `order: -1` on `<960px`, hero actions stack `width 100%`, `margin-inline -0.25rem` for media to bleed slightly, CTA actions stack, footer `1 → 2 → 4` cols.
- **Touch:** `44×44` min, hamburger `38px` hairline, nav links `0.85rem` with `1px` bottom rule (not pill) to avoid fat tap.
- **Typography:** H1 `2rem @560 → 4.9rem @1440`, hero title `-0.06em` stays readable at 375px via `br` breaks.
- **Gutters:** Container `1.25 → 1.5rem` at 768, hero overlap only on desktop, no horizontal scroll.
- **Images:** Aspect ratios locked (`4/3.15` hero, `16/10.2` card), `max-width 100%`, explicit dimensions when photos added, `loading lazy` + AVIF/WebP.
- **Motion:** `prefers-reduced-motion` disables all transform/shadow changes.

---

## 7. SEO / Content Structure

**Data rule:** Only render services that exist in `src/content/services/*.md` (no dead links). Today one real service. Never invent services, prices, machinery, certifications, clients, reviews, times, guarantees.

**Homepage structured data:** `LocalBusiness` (name, url, tel, email, PostalAddress, openingHoursSpecification, priceRange `€€`, description) at `/#business`.

**Servicios index:** `CollectionPage` > `ItemList` > `Service` (name, description, url, provider `/#business`).

**Service detail:** `Service` (name, description, url, provider, areaServed `Madrid`) + `BreadcrumbList` (Inicio / Servicios / title). Body renders `specifications[]` / `useCases[]` if present.

**Breadcrumbs:** `Breadcrumbs.astro` with `BreadcrumbList` microdata on every subpage.

**Meta:** `SeoHead.astro` per page: `title | Entorno Publicitario`, `description` (unique, from service frontmatter or business.json), `canonical` (siteConfig.url + pathname), OG/Twitter `og:image` `og-default.jpg` placeholder until real photo, `robots` `noindex,nofollow` when `isPlaceholderData:true` synced with sitemap `filter: () => !isPlaceholderData` (both flip together).

**Headers hierarchy:** `h1` per page unique (hero/home, service title), `h2` sections, `h3` cards — no skipping. `skip-link` top.

**Content patterns borrowed (structurally, not verbatim):**
- Editin pattern `Hero intro → Beneficios → Acabados → Soportes → Galería (when real) → Contact CTA → FAQ` → adapted to **Hero → Servicios (real only) → Por qué (4 pruebas honestas) → CTA** on homepage, and **Servicios: Hero → List → Cómo trabajamos (4 pasos) → CTA** on /servicios, and **Detail: Header → Body → Specs/Usos → CTA** on /[slug]. Client logos/FAQ deferred until real data (FAQ only when enough real Q&A exists, not filler).

**URLs:** Files English, URLs Spanish (`/servicios`, `/nosotros`, `/contacto`, `/politica-privacidad`). Sitemap `https://entornopublicitario.es/sitemap-index.xml`, `robots.txt` allow.

---

## 8. Anti-Patterns to Avoid

**Visual:**
- ❌ Pill-everything (999px) — use `4-8px` rectangular stamps
- ❌ SaaS minimal / Swiss cold corporate (centered 3-col equal, white/black only, sharp shadows 0)
- ❌ Liquid Glass / Aurora / glassmorphism / translucency / lensing
- ❌ Sakura foliage blobs, radial sage gradients as hero hero (AI Midjourney tell)
- ❌ Excessive gradients, glass, blur (`backdrop-filter` only removed from header, kept 0)
- ❌ Repetitive three-column sections at same rhythm

**Content:**
- ❌ Invented services, prices, machinery (HP INDIGO etc. not in repo), certifications FSC unless real, clients, reviews, times 24h guarantees, guarantees
- ❌ Copying Editin text/images/branding/colors/layout/claims verbatim — only IA pattern reused
- ❌ Generic AI SaaS copy ("soluciones gráficas de autor" is from project description — keep; do not add agency claims)
- ❌ FAQ filler when not enough real info — omit section entirely

**Technical:**
- ❌ React/Vue/Tailwind/UI framework, new deps, CMS, analytics, env vars (keep `output static`, `compressHTML`, `inlineStylesheets auto`)
- ❌ Emoji as icons, layout-shifting hovers, low contrast (<4.5:1), invisible focus, instant state changes without `150-200ms` transition
- ❌ Missing `cursor:pointer` on clickable, missing `aria-expanded/controls` on nav, missing honeypot on form
- ❌ inventing image assets as production — placeholders honest (emoji + dashed before, now paper stamp with note)

---

## Pre-Delivery Checklist (WCAG 2.2 AA + performance)

- [ ] No emojis as icons (SVG Heroicons/Lucide only)
- [ ] `cursor:pointer` + hover `150-200ms` on all clickable
- [ ] Text contrast `≥4.5:1` (ink `#121412` on `#fdfbf7` / white)
- [ ] Focus `1.5px solid #1a2218` visible
- [ ] `prefers-reduced-motion` respected (hero overlap rotation disabled)
- [ ] Responsive 375/768/1024/1440, no horizontal scroll, safe touch 44px
- [ ] Only real services rendered, sitemap/noindex synced, canonical correct
- [ ] Netlify Forms `data-netlify="true"` + `bot-field` + consent required
- [ ] Grain opacity `≤0.05` not harming contrast
- [ ] No glass/blur on cards

