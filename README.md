# Check Finance and Case Matters websites

One codebase for two car finance claims sites, both trading names of Claim Simple Ltd:

| Site | Build | Cloudflare Worker |
|---|---|---|
| checkfinance.co.uk | `BRAND=checkfinance npm run build` | `checkfinance-website` (`npx wrangler deploy`) |
| casematters.co.uk | `BRAND=casematters npm run build` | `casematters-website` (`npx wrangler deploy --env casematters`) |

The two sites are identical apart from `src/brands/index.ts` (name, domain, mailbox, Consultation Claims tracking ID) and `brand-assets/<brand>/` (logo, social image, touch icon). Change anything else once and both sites get it on the next deploy.

- `npm run dev`: local preview (Check Finance; `BRAND=casematters npm run dev` for Case Matters)
- `npm run verify`: builds both brands and runs `scripts/check-site.mjs` on each

Astro static site served by a Cloudflare Worker (`worker/index.ts`). Preview hosts (`*.workers.dev`) send noindex and block crawlers. Old WordPress addresses that changed redirect (301); WordPress paths return 410.

Every claim button goes to Consultation Claims' own form (`CLAIM_URL` in `src/data/site.ts`). We collect nothing.
