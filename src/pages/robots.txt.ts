import type { APIRoute } from 'astro';
import { BRAND } from '../brands';
// Live site only: preview hosts get a blocking robots.txt from worker/index.ts.
// Pages we don't want in search carry noindex instead of a Disallow.
export const GET: APIRoute = () =>
  new Response(`# ${BRAND.host}\n# Every crawler is welcome, AI search and training crawlers included (OAI-SearchBot, GPTBot,\n# Google-Extended, ClaudeBot, PerplexityBot): Jack's policy across Claim Simple sites, 1 Nov 2026.\nUser-agent: *\nAllow: /\n\nSitemap: ${BRAND.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
