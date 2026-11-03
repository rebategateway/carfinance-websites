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

// Required wording, taken word for word from the old checkfinance.co.uk, which
// Jack confirmed is compliant (2 Nov 2026). Keep as is.
export const FREE_ROUTE =
  'You do not need to use a claims management company to make your complaint. You can do this directly. If your complaint is not successful you can refer it to the Financial Ombudsman Service yourself for free.';
export const PAYMENT_LINE =
  'We may receive a fee for introducing you to a third party CMC or panel solicitor, this does not affect any compensation you may receive.';
export const NO_WIN_LINE =
  'Where No Win, No Fee is offered – You pay nothing unless your claim is successful. A fee between 18 – 36% including VAT applies on successful claims (fee dependent on level of redress secured), and a cancellation fee may apply outside the 14 day cooling-off period.';
export const CHOICES_LINE =
  'Please note that you have the right to pursue your motor finance mis selling claim with the lender directly, through the Financial Ombudsman Service or any public compensation scheme, including the FCA’s motor finance redress scheme. Whilst we will always strive to get you the maximum amount of compensation possible, there is no guarantee that we will recover any more than you may achieve if you pursued the claim on your own.';
export const SWITCH_LINE =
  'If you have already instructed a claims management company to act on your behalf you will need to terminate your instructions before entering into your contract with us (dependent on who you have instructed termination fees may apply, you will need to check with the instructed firm).';
// Old site: proof points shown under the hero.
export const PROOF = {
  speed: 'All of your historic agreements found in under 2 minutes',
  helped: `${BRAND.name} have helped thousands of customers`,
  // Jack, 2 Nov 2026: "We have helped over 75,000 people via our partners."
  helpedCount: '75,000+ people helped through our partners',
};

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
// Hearing dates and the suspension rules: FCA statement "Motor finance legal challenge to be heard in
// February 2027" (13 Oct 2026, updated 26 Oct 2026). Wording of the hearing and 2027 steps: Jack, 3 Nov 2026.
export const SCHEME_UPDATED = '3 November 2026';
export const SCHEME_STEPS = [
  { when: 'March 2026', title: 'Scheme confirmed', text: 'For agreements from 6 April 2007 to 1 November 2024', done: true },
  { when: 'July 2026', title: 'Payouts paused', text: 'While three lenders and a consumer group challenge the rules', done: true, now: true },
  { when: '16 Feb – 3 Mar 2027', title: 'Full hearing', text: 'Lenders must still tell you by 18 November or 18 January if you’re not owed anything. Offers wait for the ruling.' },
  { when: '2027', title: 'Payments expected', text: 'Only if the scheme is upheld and that decision isn’t appealed' },
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
export type NavId = (typeof NAV)[number]['id'] | 'about' | 'contact' | 'letter' | 'complaints' | 'lending' | 'none';

// Sister trading name of Claim Simple Ltd for irresponsible/unaffordable lending claims (Jack, 2 Nov 2026).
export const CREDITRIGHTS = {
  name: 'CreditRights',
  url: `https://creditrights.co.uk/?utm_source=${BRAND.host}&utm_medium=referral&utm_campaign=irresponsible-lending`,
  page: '/irresponsible-lending/',
} as const;

// The Help drop-down in the header.
export const NAV_HELP = [
  { id: 'faqs', label: 'FAQs', href: '/faqs/', desc: 'Answers to the questions we’re asked most' },
  { id: 'fees', label: 'Fees', href: '/fees/', desc: 'What you pay if your claim succeeds' },
  { id: 'letter', label: 'Received a letter?', href: '/received-a-letter/', desc: 'Why we wrote and what happens next' },
  { id: 'about', label: 'About us', href: '/about-us/', desc: 'Who we are and how we’re paid' },
  { id: 'contact', label: 'Contact', href: '/contact/', desc: 'How to get in touch' },
  { id: 'complaints', label: 'Complaints', href: '/complaints/', desc: 'How to make a complaint' },
  { id: 'lending', label: 'Irresponsible lending', href: '/irresponsible-lending/', desc: 'Credit you couldn’t afford? Claim through CreditRights' },
] as const;

export const LETTER = { label: 'Received a letter?', href: '/received-a-letter/' } as const;

export const FOOTER_LINKS = [
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Lenders', href: '/lenders/' },
  { label: 'The FCA scheme', href: '/fca-redress-scheme/' },
  { label: 'Fees', href: '/fees/' },
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Received a letter?', href: '/received-a-letter/' },
  { label: 'Irresponsible lending', href: '/irresponsible-lending/' },
  { label: 'About us', href: '/about-us/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Privacy', href: '/privacy-policy/' },
  { label: 'Cookies', href: '/cookies/' },
  { label: 'Complaints', href: '/complaints/' },
  { label: 'Cancellation', href: '/cancellation/' },
  { label: 'Website terms', href: '/terms-of-service/' },
] as const;

// Legal pages carry the old checkfinance.co.uk wording, which Jack confirmed is
// compliant (2 Nov 2026), so they are indexable.
export const LEGAL_REVIEWED = true;
export const LEGAL_PATHS = ['/privacy-policy/', '/cookies/', '/complaints/', '/cancellation/', '/terms-of-service/'];

// The service, as structured data (home and how it works). Matches the visible copy.
export const SERVICE_SCHEMA = {
  '@type': 'Service',
  name: 'Car finance commission claims',
  serviceType: 'Introduction to a claims management company for car finance commission claims',
  description: `${BRAND.name} finds car finance agreements from April 2007 to November 2024 and introduces claims to ${'Consultation Claims Limited'}, which complains to each lender on a no win, no fee basis.`,
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  audience: { '@type': 'Audience', audienceType: 'People who took out PCP or hire purchase car finance between 2007 and 2024' },
};
