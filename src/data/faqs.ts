// Answers are HTML (rendered with set:html). Facts: FCA PS26/3 and statements, checked 2 Nov 2026.
import { FIGURES } from './site';
export interface Faq { q: string; a: string }

export const FAQ = {
  paidOff: { q: 'I’ve paid the finance off. Can I still claim?', a: `<p>Yes. Agreements from ${FIGURES.from} to ${FIGURES.to} count whether you’ve paid them off or are still paying.</p>` },
  howMuch: { q: 'How much could I get?', a: `<p>The FCA estimates the average at ${FIGURES.average} for each agreement. Under its scheme, compensation is based on the commission the dealer was paid and an estimate of what it cost you, plus interest at the Bank of England base rate plus 1% (at least 3% a year).</p><p>Every agreement is different. Some people get more, some less, and some nothing.</p>` },
  when: { q: 'When will I be paid?', a: '<p>Payouts are on hold while three lenders and a consumer group challenge the FCA’s rules. The full hearing is from 16 February to 3 March 2027. If the scheme is upheld, the FCA expects payments to start in 2027.</p>' },
  letter: { q: 'My lender has written to me. What now?', a: '<p>Under the scheme, lenders have to tell people who have already complained whether they’re owed compensation:</p><ul><li>by 18 November 2026, for agreements from 1 April 2014 complained about by 30 June 2026</li><li>by 18 January 2027, for older agreements complained about by 31 August 2026</li></ul><p>If you’re told you’re not owed and you disagree, you can ask the lender to look again, then go to the Financial Ombudsman.</p>' },
  dca: { q: 'What is a discretionary commission arrangement?', a: '<p>It let the dealer or broker set your interest rate within a range the lender allowed, and the higher the rate, the more commission they earned. The FCA banned these arrangements from 28 January 2021.</p>' },
  which: { q: 'Which agreements are covered?', a: `<p>Car finance taken out between ${FIGURES.from} and ${FIGURES.to}, such as PCP and hire purchase, where the lender paid the dealer or broker commission. New or used cars both count, whether you bought from a dealer or online.</p>` },
  unfair: { q: 'What makes the commission unfair?', a: '<p>Under the FCA’s scheme, you could be owed compensation if you weren’t told about any of these:</p><ul><li>the dealer could set your interest rate and earned more commission the higher it went</li><li>the commission was high: at least 39% of the interest and charges, and 10% of the amount borrowed</li><li>the dealer was tied to the lender, for example the lender had first call on the dealer’s customers</li></ul>' },
  switch: { q: 'I’ve already signed up with another claims company. Can I switch?', a: '<p>You’d need to end that agreement before Consultation Claims can act for you. Check their terms first: some charge for work already done.</p>' },
  cost: { q: 'What does it cost?', a: '<p>Nothing unless you get compensation. If you do, Consultation Claims takes a percentage, capped in pounds for each band. See <a href="/fees/">fees</a> for the full table. You can cancel free within 14 days.</p>' },
  credit: { q: 'Will the agreement search affect my credit score?', a: '<p>No. It’s a soft search, which other lenders can’t see.</p>' },
  who: { q: 'Who will deal with my claim?', a: '<p>Consultation Claims Limited, a claims management company authorised and regulated by the Financial Conduct Authority (FRN 836626). We introduce you, and Consultation Claims finds your agreements and complains to each lender for you. Consultation Claims pays us when we introduce your claim.</p>' },
} satisfies Record<string, Faq>;

export const HOME_FAQS = [FAQ.paidOff, FAQ.when, FAQ.letter];
export const ALL_FAQS = [FAQ.paidOff, FAQ.which, FAQ.unfair, FAQ.dca, FAQ.howMuch, FAQ.when, FAQ.letter, FAQ.cost, FAQ.credit, FAQ.who, FAQ.switch];
