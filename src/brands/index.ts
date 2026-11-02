// The two sites built from this codebase. They are identical apart from what's
// in here. The build picks one with the BRAND environment variable:
//   BRAND=checkfinance npm run build   → checkfinance.co.uk
//   BRAND=casematters  npm run build   → casematters.co.uk

export interface Brand {
  id: 'checkfinance' | 'casematters';
  /** Trading name, as shown on the site and in the legal text. */
  name: string;
  /** The wordmark split in two: first part bold, second part light. */
  wordmark: [string, string];
  url: string;
  host: string;
  /** Contact and complaints mailbox. null until one is set up: pages then give the postal address only. */
  email: string | null;
  /** trackingId sent to Consultation Claims, so introductions are credited to the right brand. */
  trackingId: string;
  /** Prefix printed on letter references, e.g. CF-12345678. */
  letterPrefix: string;
  /** Other spellings people search for, for the site name in search results. */
  alternateNames: string[];
  /** 'mark': chevron mark plus typed wordmark. 'svg': brand-assets/<id>/wordmark.svg. */
  logo: 'mark' | 'svg';
  /** Picture beside the home page hero card, from brand-assets/<id>/ (served at /brand/). null for none. */
  heroImage: { file: string; widths: number[]; width: number; height: number; alt: string } | null;
}

export const BRANDS: Record<Brand['id'], Brand> = {
  checkfinance: {
    id: 'checkfinance',
    name: 'Check Finance',
    wordmark: ['Check', 'Finance'],
    url: 'https://checkfinance.co.uk',
    host: 'checkfinance.co.uk',
    // The mailbox already published on the old checkfinance.co.uk complaints page.
    email: 'compliance@checkfinance.co.uk',
    // Both brands use case_matters for now (Jack, 2 Nov 2026).
    trackingId: 'organic|case_matters',
    letterPrefix: 'CF',
    alternateNames: ['CheckFinance', 'checkfinance.co.uk'],
    logo: 'mark',
    // The Check Finance car from the original site (Jack, 2 Nov 2026).
    heroImage: { file: 'hero-car', widths: [560, 1024], width: 1024, height: 655, alt: 'Grey hatchback with a Check Finance number plate' },
  },
  casematters: {
    id: 'casematters',
    name: 'Case Matters',
    wordmark: ['Case', 'Matters'],
    url: 'https://casematters.co.uk',
    host: 'casematters.co.uk',
    // TODO (Jack): the Case Matters mailbox. Until set, contact and complaints give the postal address only.
    email: null,
    trackingId: 'organic|case_matters',
    letterPrefix: 'CM',
    alternateNames: ['CaseMatters', 'casematters.co.uk'],
    // Wordmark traced from the logo Jack sent on 2 Nov 2026.
    logo: 'svg',
    heroImage: null,
  },
};

// __BRAND__ is set by astro.config.mjs (Vite define) so pages get the same brand as the config.
declare const __BRAND__: string | undefined;
const id = ((typeof __BRAND__ !== 'undefined' ? __BRAND__ : undefined) ?? process.env.BRAND ?? 'checkfinance') as Brand['id'];
if (!BRANDS[id]) throw new Error(`Unknown BRAND "${id}". Use checkfinance or casematters.`);
export const BRAND: Brand = BRANDS[id];
