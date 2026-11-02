// Edge entry point for both sites. Serves the static build from ./dist.
// Preview hosts (*.workers.dev, staging.*) send noindex and block crawlers,
// so a preview copy never competes with the live site.

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  CANONICAL_HOST: string;
}

const isPreview = (host: string) => host.startsWith('staging.') || host.endsWith('.workers.dev');

// Old WordPress addresses that changed. Everything else kept its address.
const MOVED: Record<string, string> = {
  '/how-to-claim/': '/how-it-works/',
  '/blue-motor-finance-2/': '/lenders/',
  '/blue-motor-finance/': '/lenders/',
  '/letter/': '/received-a-letter/',
  // Barclays Partner Finance (Clydesdale Financial Services) stopped motor lending in 2019: no page (Jack's rule).
  '/barclays-finance/': '/lenders/',
  '/clydesdale-finance/': '/lenders/',
  '/wp-login.php': '/',
  '/wp-admin/': '/',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const preview = isPreview(url.hostname);

    // One canonical host: www goes to the bare domain.
    if (url.hostname === `www.${env.CANONICAL_HOST}`) {
      url.hostname = env.CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    if (preview && url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    const path = url.pathname.endsWith('/') || url.pathname.includes('.') ? url.pathname : `${url.pathname}/`;
    const to = MOVED[path] ?? MOVED[url.pathname];
    if (to) return Response.redirect(new URL(to + (to.includes('?') ? '' : url.search), url).toString(), 301);

    // Old WordPress paths (uploads, feeds, xmlrpc) are gone for good.
    if (/^\/(wp-content|wp-includes|wp-json|feed|xmlrpc\.php|wp-sitemap)/.test(url.pathname)) {
      return new Response('Gone', { status: 410, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    if (preview) out.headers.set('X-Robots-Tag', 'noindex, nofollow');
    else out.headers.set('Strict-Transport-Security', 'max-age=31536000');
    return out;
  },
};
