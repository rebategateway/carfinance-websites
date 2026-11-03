// Quality gates for the built site. Run after `astro build` (npm run verify).
// Fails the build if any page breaks the rules below.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const JS_BUDGET = 30 * 1024; // per page, uncompressed
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));

// Redirect sources count as valid link targets.
const redirects = existsSync('public/_redirects')
  ? readFileSync('public/_redirects', 'utf8').split('\n').filter((l) => l && !l.startsWith('#')).map((l) => l.split(/\s+/)[0])
  : [];

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (redirects.includes(clean)) return true;
  if (clean.startsWith('/api/')) return true;
  const target = join(DIST, clean);
  return (existsSync(target) && statSync(target).isFile()) || existsSync(join(target, 'index.html'));
};

const brand = process.env.BRAND ?? 'checkfinance';
const NAMES = { checkfinance: 'Check Finance|checkfinance', casematters: 'Case Matters|casematters', justera: 'Justera|justera' };
const other = new RegExp(Object.entries(NAMES).filter(([id]) => id !== brand).map(([, n]) => n).join('|'), 'i');
// Lender pages must not carry lender contact details (Jack, 1 Nov 2026).
const banned = /\b0(3|8)\d{2} ?\d{3} ?\d{4}\b|opening hours|login|log in to/i;
const titles = new Map();
for (const file of html) {
  const page = '/' + relative(DIST, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  const src = readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(src);

  if (other.test(src)) fail(page, `mentions the other brand (${other})`);
  if (page !== '/complaints/' && page !== '/privacy-policy/' && banned.test(src.replace(/0800 023 4567|0303 123 1113/g, ''))) fail(page, 'phone number, opening hours or login wording found');
  const h1s = src.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(page, `expected 1 <h1>, found ${h1s.length}`);

  const title = src.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) fail(page, 'missing <title>');
  else {
    if (title.length > 70) fail(page, `title is ${title.length} chars (max 70)`);
    if (!noindex) {
      if (titles.has(title)) fail(page, `duplicate title with ${titles.get(title)}`);
      titles.set(title, page);
    }
  }
  const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(page, 'missing meta description');
  else if (!noindex && (desc.length < 70 || desc.length > 160)) fail(page, `description is ${desc.length} chars (70–160)`);
  if (!noindex && !/<link rel="canonical"/.test(src)) fail(page, 'missing canonical');
  if (!/rel="icon"/.test(src)) fail(page, 'missing favicon link');

  for (const img of src.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt="[^"]*"/.test(img)) fail(page, `image without alt: ${img.slice(0, 90)}`);
  }
  for (const m of src.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) {
      if (href.startsWith('tel:')) fail(page, 'telephone link found (online-only service)');
      continue;
    }
    if (href.startsWith('/') && !exists(href)) fail(page, `broken link ${href}`);
    if (href.startsWith('/') && !/[.?#]|\/$/.test(href)) fail(page, `link without trailing slash ${href}`);
  }
  for (const m of src.matchAll(/\ssrc="(\/[^"]+)"/g)) {
    if (!exists(m[1])) fail(page, `missing asset ${m[1]}`);
  }

  // Structured data must parse, and every {"@id": …} reference must resolve
  // to a node in the same graph (author pages are referenced across pages).
  const ld = src.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!ld) fail(page, 'missing JSON-LD');
  else {
    try {
      const graph = JSON.parse(ld)['@graph'] ?? [];
      const ids = new Set(graph.map((n) => n['@id']).filter(Boolean));
      JSON.stringify(graph, (k, v) => {
        if (v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 1 && v['@id'] && !ids.has(v['@id']) && !v['@id'].includes('/authors/')) fail(page, `unresolved @id ${v['@id']}`);
        return v;
      });
    } catch { fail(page, 'invalid JSON-LD'); }
  }

  let js = 0;
  for (const m of src.matchAll(/<script[^>]*src="(\/[^"]+\.js)"/g)) {
    const f = join(DIST, m[1]);
    if (existsSync(f)) js += statSync(f).size;
  }
  if (js > JS_BUDGET) fail(page, `JavaScript is ${(js / 1024).toFixed(1)}KB (budget ${JS_BUDGET / 1024}KB)`);
}

for (const f of files) {
  if (f.endsWith('.map')) fail(f, 'source map in build output');
  if (f.endsWith('.js') && /\bconsole\.(log|debug|info|warn|error)\b/.test(readFileSync(f, 'utf8'))) fail(f, 'console call in client JavaScript');
}

if (!existsSync(join(DIST, '404.html'))) fail('/404', 'custom 404 page missing');
if (!existsSync(join(DIST, 'favicon.svg'))) fail('/favicon.svg', 'missing');
if (!existsSync(join(DIST, 'brand/logo.png'))) fail('/brand/logo.png', 'missing');
if (!existsSync(join(DIST, 'brand/og-image.png'))) fail('/brand/og-image.png', 'missing');
const sitemap = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
if (!sitemap) fail('sitemap', 'sitemap-0.xml missing');
for (const loc of sitemap.match(/<loc>[^<]+<\/loc>/g) ?? []) {
  const path = new URL(loc.slice(5, -6)).pathname;
  if (!exists(path)) fail('sitemap', `lists missing page ${path}`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ [${brand}] ${html.length} pages passed: links, H1s, titles, descriptions, alt text, JS budget, no source maps, no console calls, valid structured data.`);
