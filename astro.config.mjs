import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Read business data to keep indexing and sitemap synchronized.
// SeoHead emits noindex when isPlaceholderData is true; sitemap filter must match.
let isPlaceholderData = true;
try {
  const raw = readFileSync(new URL('./src/data/business.json', import.meta.url), 'utf-8');
  isPlaceholderData = JSON.parse(raw).isPlaceholderData ?? true;
} catch {
  // Fallback to safe placeholder mode if file cannot be read during build.
  isPlaceholderData = true;
}

const SITE_URL = 'https://entornopublicitario.es';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    sitemap({
      // When placeholder data is active, exclude all URLs from sitemap to stay consistent with noindex.
      // Filter is evaluated at build time from src/data/business.json.
      filter: () => !isPlaceholderData,
    }),
  ],
  compressHTML: true,
  prefetch: false,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
