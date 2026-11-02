// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { BRAND } from './src/brands/index.ts';
import { cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Bump when page copy changes; lender pages use their own `checked` date.
const SITE_UPDATED = '2026-11-02';
import { LENDERS } from './src/data/lenders.ts';
const lastmodFor = (path) => LENDERS.find((l) => path === `/${l.slug}/`)?.checked ?? SITE_UPDATED;

// Pages that carry noindex never go in the sitemap.
// Legal pages stay noindex until reviewed (LEGAL_REVIEWED in src/data/site.ts).
import { LEGAL_REVIEWED, LEGAL_PATHS } from './src/data/site.ts';
export const NOINDEX = ['/404', ...(LEGAL_REVIEWED ? [] : LEGAL_PATHS)];

// Copies this brand's logo, social image and touch icon into dist/.
const brandAssets = {
  name: 'brand-assets',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const out = fileURLToPath(dir);
      cpSync(`brand-assets/${BRAND.id}/apple-touch-icon.png`, `${out}/apple-touch-icon.png`);
      cpSync(`brand-assets/${BRAND.id}/logo.png`, `${out}/brand/logo.png`);
      cpSync(`brand-assets/${BRAND.id}/og-image.png`, `${out}/brand/og-image.png`);
    },
  },
};

export default defineConfig({
  site: BRAND.url,
  outDir: './dist',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: false,
  integrations: [
    brandAssets,
    sitemap({
      filter: (page) => !NOINDEX.some((p) => new URL(page).pathname.startsWith(p)),
      serialize: (item) => ({ ...item, lastmod: lastmodFor(new URL(item.url).pathname) }),
    }),
  ],
  vite: {
    define: { __BRAND__: JSON.stringify(BRAND.id) },
    // Never inline fonts as data: URIs; the CSP only allows fonts from our own origin.
    build: { sourcemap: false, assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined) },
  },
});
