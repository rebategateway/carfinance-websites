import type { APIRoute } from 'astro';
import { BRAND } from '../brands';
// Live site only: preview hosts get a blocking robots.txt from worker/index.ts.
// Pages we don't want in search carry noindex instead of a Disallow.
export const GET: APIRoute = () =>
  new Response(`# ${BRAND.host}\nUser-agent: *\nAllow: /\n\nSitemap: ${BRAND.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
