// Company, partner, figures and navigation for both brands. Brand-specific
// values (name, domain, mailbox, tracking) live in src/brands/index.ts.
import { BRAND } from '../brands';

export const SITE = {
  name: BRAND.name,
  url: BRAND.url,
  email: BRAND.email,
  company: {
    legalName: 'Claim Simple Ltd',
    number: '11459714',
    frn: '830182',
    icoRef: 'ZA449298',
    jurisdiction: 'England and Wales',
    address: {
      street: 'The Old Fuel Depot, Twemlow Lane, Holmes Chapel',
      locality: 'Crewe',
      postcode: 'CW4 8GJ',
      country: 'GB',
    },
  },
} as const;

export const ADDRESS_LINE = `${SITE.company.address.street}, ${SITE.company.address.locality} ${SITE.company.address.postcode}`;

// The claims management company people are handed to. Every claim button goes
// straight to its own form: we collect nothing ourselves (Jack, 20 Oct 2026).
export const PARTNER = {
  name: 'Consultation Claims',
  legalName: 'Consultation Claims Limited',
  frn: '836626',
} as const;

export const CLAIM_URL =
  `https://claim-form.consultationclaims.co.uk/claims/step/1?partnerId=1&serviceId=1&trackingId=${encodeURIComponent(BRAND.trackingId)}`;

// Required wording (CMCOB 3.2 and 2.2.8R). Keep exactly as is: nothing more is needed.
export const FREE_ROUTE =
  'You can complain to your lender, then the Financial Ombudsman, yourself for free, and the FCA’s redress scheme is free to use.';
export const PAYMENT_LINE = 'Our claims partner pays us when we introduce your claim.';

// FCA figures (PS26/3 and the FCA statement of 30 March 2026).
export const FIGURES = {
  average: '£829',
  agreements: '12.1m',
  deadline: '31 August 2027',
  deadlineShort: '31 Aug 2027',
  from: '6 April 2007',
  to: '1 November 2024',
  source: 'FCA, March 2026',
};

// The scheme tracker. `done` marks steps that have happened; `now` is where
// the car sits. Update SCHEME_UPDATED whenever this changes.
export const SCHEME_UPDATED = '2 November 2026';
export const SCHEME_STEPS = [
  { when: 'March 2026', title: 'Scheme confirmed', text: 'For agreements from 6 April 2007 to 1 November 2024', done: true },
  { when: 'July 2026', title: 'Payouts paused', text: 'While three lenders and a consumer group challenge the rules', done: true, now: true },
  { when: '16 Feb – 3 Mar 2027', title: 'Full hearing', text: 'Lenders still have to send decision letters before then' },
  { when: '2027', title: 'Payments expected', text: 'The FCA expects payments to start if the scheme is upheld' },
  { when: '31 August 2027', title: 'Last day to complain', text: 'If your lender hasn’t contacted you' },
] as const;

// CMCOB 5.2 fee caps, including VAT. TODO (Jack): confirm Consultation Claims' own bands match.
export const FEE_BANDS = [
  { band: '£1 to £1,499', short: 'Up to £1,499', max: 1499, rate: 0.36, cap: 504 },
  { band: '£1,500 to £9,999', short: '£1,500 to £9,999', max: 9999, rate: 0.336, cap: 3000 },
  { band: '£10,000 to £24,999', short: '£10,000 to £24,999', max: 24999, rate: 0.3, cap: 6000 },
  { band: '£25,000 to £49,999', short: '£25,000 to £49,999', max: 49999, rate: 0.24, cap: 9000 },
  { band: '£50,000 or more', short: '£50,000 or more', max: Infinity, rate: 0.18, cap: 12000 },
] as const;

export const pct = (r: number) => `${+(r * 100).toFixed(1)}%`;
export const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

export const NAV = [
  { id: 'lenders', label: 'Lenders', href: '/lenders/' },
  { id: 'how', label: 'How it works', href: '/how-it-works/' },
  { id: 'scheme', label: 'The FCA scheme', href: '/fca-redress-scheme/' },
  { id: 'fees', label: 'Fees', href: '/fees/' },
  { id: 'faqs', label: 'FAQs', href: '/faqs/' },
] as const;
export type NavId = (typeof NAV)[number]['id'] | 'about' | 'contact' | 'letter' | 'none';

export const LETTER = { label: 'Received a letter?', href: '/received-a-letter/' } as const;

export const FOOTER_LINKS = [
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Lenders', href: '/lenders/' },
  { label: 'The FCA scheme', href: '/fca-redress-scheme/' },
  { label: 'Fees', href: '/fees/' },
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Received a letter?', href: '/received-a-letter/' },
  { label: 'About us', href: '/about-us/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Privacy', href: '/privacy-policy/' },
  { label: 'Cookies', href: '/cookies/' },
  { label: 'Complaints', href: '/complaints/' },
  { label: 'Cancellation', href: '/cancellation/' },
  { label: 'Website terms', href: '/terms-of-service/' },
] as const;

// Legal pages were adapted from CreditRights' lawyer-reviewed versions for the
// car finance route. Noindex until confirmed; then set true.
export const LEGAL_REVIEWED = false;
export const LEGAL_PATHS = ['/privacy-policy/', '/cookies/', '/complaints/', '/cancellation/', '/terms-of-service/'];
