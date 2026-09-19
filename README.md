# Entorno Publicitario

Sitio web de una imprenta local en Madrid. Construido con Astro + TypeScript, optimizado para SEO local, Core Web Vitals y alojamiento en Netlify Free.

## Características

- **Astro 7** - Generador de sitios estáticos moderno
- **TypeScript** - Tipado estricto en todo el proyecto
- **CSS nativo** - Sin Tailwind, sin dependencias CSS innecesarias
- **Content Collections** - Servicios y proyectos gestionados como contenido tipado
- **Netlify Forms** - Formulario de contacto sin backend
- **@astrojs/sitemap** - Sitemap XML automático
- **SEO local** - Structured data LocalBusiness, URLs limpias, metadatos completos
- **Accesibilidad** - WCAG 2.2 AA, navegación por teclado, focus visible, semántica HTML
- **Rendimiento** - HTML estático, JS mínimo, imágenes optimizadas, fuentes del sistema

## Estructura del proyecto

```
src/
├── components/       # Componentes Astro reutilizables
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ContactForm.astro
│   ├── ServiceCard.astro
│   ├── Breadcrumbs.astro
│   └── SeoHead.astro
├── content/          # Content Collections
│   ├── services/     # Servicios (Markdown con frontmatter)
│   └── projects/     # Proyectos/casos de estudio (vacío inicialmente)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── nosotros.astro
│   ├── contacto.astro
│   ├── servicios/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── politica-privacidad.astro
├── styles/
│   ├── global.css
│   └── variables.css
├── data/
│   └── business.json # Fuente editable (JSON) — datos del negocio
└── config/
    └── site.ts       # Capa tipada que re-exporta business.json
```

## Configuración del negocio

Toda la información de la empresa está en `src/data/business.json` (fuente editable, sin necesidad de tocar código). `src/config/site.ts` solo re-exporta ese JSON con tipado. **Edita `business.json` con los datos reales** antes de desplegar:

```json
{
  "name": "Entorno Publicitario",
  "url": "https://entornopublicitario.es",
  "isPlaceholderData": true,
  "telephone": "+34 910 000 000",
  "email": "info@entornopublicitario.es",
  "address": {
    "street": "Calle de Ejemplo 123",
    "postalCode": "28001",
    "city": "Madrid",
    "country": "ES"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "description": "Imprenta en Madrid especializada en..."
}
```

Cuando `isPlaceholderData` es `true`, el sitio emite `noindex,nofollow` y excluye URLs del sitemap de forma automática y sincronizada. Ponlo a `false` solo cuando los datos reales estén completos.

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (http://localhost:4321)
pnpm run dev

# Build de producción
pnpm run build

# Preview del build
pnpm run preview

# Type-check
pnpm run check

# Lint
pnpm run lint
```

## Despliegue en Netlify

### Opción 1: Conectar repositorio (recomendado)

1. Push a GitHub/GitLab/Bitbucket
2. En Netlify: "Add new site" → "Import an existing project"
3. Conecta tu repositorio
4. Build command: `pnpm run build` (auto-detectado desde netlify.toml)
5. Publish directory: `dist` (auto-detectado)
6. Deploy

### Opción 2: Netlify CLI

```bash
pnpm add -g netlify-cli
netlify login
netlify init
netlify deploy --prod --dir=dist
```

### Variables de entorno (si se necesitan)

En Netlify Dashboard → Site settings → Environment variables:
- No se requieren variables obligatorias para el funcionamiento básico
- El formulario de contacto funciona con Netlify Forms automáticamente

## Formulario de contacto

El formulario usa **Netlify Forms** (sin backend propio):

- `data-netlify="true"` en el `<form>`
- Campo honeypot `bot-field` anti-spam
- Validación client-side + server-side (Netlify)
- Envíos visibles en Netlify Dashboard → Forms

## Content Collections: Servicios

Los servicios se gestionan en `src/content/services/` como archivos Markdown con frontmatter:

```markdown
---
title: "Tarjetas de visita en Madrid"
description: "Tarjetas profesionales..."
slug: "tarjetas-visita"
serviceType: "Business Card Printing"
specifications: ["Formato 85x55mm", "Papel 350-400g", "Laminado mate/brillo"]
useCases: ["Tarjetas corporativas", "Networking"]
order: 1
---

Contenido completo del servicio en Markdown...
```

La página de listado (`/servicios`) y el detalle (`/servicios/[slug]`) se generan automáticamente.

## Content Collections: Proyectos

Estructura preparada en `src/content/projects/` para casos de estudio reales. **No inventes proyectos**. Añade archivos `.md` cuando tengas casos reales con permiso del cliente.

## SEO y metadatos

Cada página incluye:
- `<title>` y `meta description` únicos
- `link rel="canonical"`
- Open Graph (Facebook, LinkedIn, WhatsApp)
- Twitter Card
- JSON-LD structured data (LocalBusiness, Service, BreadcrumbList, etc.)
- Sitemap XML automático (`/sitemap-index.xml`)
- robots.txt en `/public/robots.txt`

## Accesibilidad

- Semántica HTML5 correcta (`header`, `main`, `footer`, `nav`, `article`, `section`)
- Jerarquía de headings (h1 → h2 → h3)
- Skip link ("Saltar al contenido principal")
- Focus visible en todos los elementos interactivos
- Labels en formularios, `aria-describedby` para errores
- `alt` descriptivos en imágenes
- Contraste AA en paleta por defecto
- `prefers-reduced-motion` respetado

## Rendimiento

- Output: `static` (HTML puro, sin JS por defecto)
- CSS inlineado en `<head>` (Astro `inlineStylesheets: 'auto'`)
- HTML minificado (`compressHTML: true`)
- Imágenes: usar AVIF/WebP, `loading="lazy"`, `width`/`height`
- Fuentes: system font stack (cero requests de fuentes)
- Sin frameworks JS, sin hidratación innecesaria

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Servidor de desarrollo con HMR |
| `pnpm run build` | Build de producción en `dist/` |
| `pnpm run preview` | Preview local del build |
| `pnpm run check` | Type-check con `astro check` |
| `pnpm run lint` | ESLint en `.astro` y `.ts` |

## Tecnologías

- [Astro](https://astro.build/) 7.3+
- [TypeScript](https://www.typescriptlang.org/) 5.5+
- [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) 3.7+

## Licencia

MIT - Ver [LICENSE](LICENSE)