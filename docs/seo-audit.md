# SEO and AI-search audit: Check Finance and Case Matters

2 November 2026. Run against the enterprise SEO/GEO brief Jack supplied, after the sites went live on Cloudflare.

## Architecture (baseline)
- Astro 7, fully static (SSG): every page's title, description, canonical, H1, body copy, links and JSON-LD are in the HTML the server sends. The only client JavaScript is the menu, FAQ toggles, fee calculator, make finder, sticky phone bar and cookie bar. Nothing a crawler needs depends on it.
- Served by Cloudflare Workers (`worker/index.ts`) from `dist/`. One codebase, two brands (`BRAND`).
- 37 indexable pages per brand, plus the 404 (noindex). All 37 are in `/sitemap-index.xml` → `/sitemap-0.xml` with `lastmod`; lender pages use their own `checked` date.

## Route inventory (Check Finance; Case Matters identical apart from the brand)
| Route | Purpose / intent | Schema | Inbound links |
|---|---|---|---|
| `/` | Brand + "received a letter", car finance claims | WebPage, Service, FAQPage | every page |
| `/how-it-works/` | How to claim, process | WebPage, Service | every page |
| `/received-a-letter/` | Letter recipients (main entry from mail) | WebPage | every page |
| `/fca-redress-scheme/` | FCA scheme status, deadlines (main reference page) | Article (dateModified, citations) | every page |
| `/lenders/` | Lender directory | CollectionPage, ItemList | every page |
| 21 × `/{lender}-finance/` | "[Lender] finance claim" | WebPage about the lender Organization (FRN, sameAs FCA register), FAQPage | 8–36 each |
| `/faqs/`, `/fees/`, `/about-us/`, `/contact/` | Support | WebPage (+FAQPage on FAQs) | every page |
| `/irresponsible-lending/` | Cross-sell to CreditRights | WebPage | every page |
| Legal ×5 | Privacy, cookies, terms, complaints, cancellation | WebPage, BreadcrumbList | every page |

No duplicate titles, one H1 per page, every indexable page in the sitemap, no orphans.

## Changes made
**Crawling and URLs**
- Upper-case page URLs now 301 to lower case (`/Black-Horse-Finance/` → `/blackhorse-finance/`); assets are excluded.
- Old WordPress/Yoast sitemap names (`/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`, `/sitemap.xml`) 301 to `/sitemap-index.xml`. The old Case Matters sitemap in Search Console pointed at `page-sitemap.xml`.
- Unchanged and verified: www → bare domain (301); missing trailing slash → slash (Cloudflare assets); old moved pages 301; `wp-*`, feeds and xmlrpc return 410; real 404 status for unknown URLs; preview hosts (`*.workers.dev`) send `X-Robots-Tag: noindex` and a blocking robots.txt.
- robots.txt allows all crawlers and records the AI-crawler policy (below).

**Structured data (one connected graph per page, stable @ids)**
- Lender pages: WebPage `about` now points at the lender's own Organization node, not ours.
- FAQPage nodes get `@id` and `isPartOf` the page. Service node (`/#service`, provider = the organisation) on home and how it works, matching the visible copy.
- FCA scheme page: Article with `dateModified` (from `SCHEME_UPDATED`), publisher and `citation` to the two FCA sources it links to. No author added, because there isn't a named one.
- Legal pages now have breadcrumbs.
- Fixed an answer that read "finances … used cars of any make cars".

**Internal links**: FAQ answers now link to the scheme page, lenders and fees where they mention them; each lender's "what happens next" box links to the full scheme timeline; About links to CreditRights and complaints.

**Content and design**: FAQs (grouped by question type), Fees, the FCA scheme, About, Contact and Lenders rebuilt in the new style with answer-first copy. The FCA scheme page keeps its sourced facts and adds a key-facts row. No new statistics, reviews or claims were invented.

**Performance**
- Heading font: Archivo cut to capitals, digits and punctuation at the one style used (expanded black), **90KB → 6.7KB** (`public/fonts/archivo-caps-v1.woff2`, cached a year).
- Case Matters wordmark: defined once per page and reused, instead of three inline copies: **82KB → 52KB** HTML.
- Hero car: explicit width/height, `srcset` (560/1024 WebP), `fetchpriority="high"`, so no layout shift.
- Analytics loads only after consent.

**Accessibility**: one H1 per page, logical H2/H3 order, landmarks (header, nav, main, footer), real links and buttons, labelled menu and dialog. Colour contrast checked on every text pair: 5.7:1 to 14.6:1.

**Mobile**: no horizontal overflow on any page at 360, 390, 768, 1024, 1280 or 1440px (Playwright check). Fixed the lenders grid, which overflowed at 360px.

## Evidence log
| Decision | Source |
|---|---|
| No llms.txt, special markup or "AI files". AI Overviews/AI Mode use normal Search eligibility; keep content crawlable, in text, internally linked, with structured data matching visible text. | Google, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) (updated 10 Dec 2025): "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." |
| Keep FAQPage markup but expect no FAQ rich results | Google stopped showing FAQ rich results on 7 May 2026 ([Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)); the markup is still valid and harmless |
| Allow OAI-SearchBot (ChatGPT search) and GPTBot (training) | [OpenAI crawlers](https://developers.openai.com/api/docs/bots): OAI-SearchBot is for search, GPTBot for training, ChatGPT-User for user actions (robots.txt may not apply). Training allowed per Jack's policy for Claim Simple sites ("Ai is our friend", 1 Nov 2026). |
| Search Console domain properties + sitemaps | Done 2 Nov: casematters.co.uk (existing) and checkfinance.co.uk (new, verified by TXT in Cloudflare) |

## Needs Jack
1. **Automatic deploys**: add `carfinance-websites` to the Cloudflare Workers and Pages GitHub app.
2. **IndexNow / Bing**: turn on Cloudflare Crawler Hints for both zones (sends IndexNow pings to Bing and others automatically), and add both domains in Bing Webmaster Tools (it can import from Search Console). Both are account settings, so not changed without your OK.
3. **Claims to evidence**: "thousands of customers helped", "75,000+ customers helped", "found in under 2 minutes". These are kept from the old site, so keep evidence on file, especially for Case Matters.
4. **Case Matters mailbox**, and confirmation of Consultation Claims' fee bands.
