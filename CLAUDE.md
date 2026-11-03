# Check Finance / Case Matters / Justera websites

Handover and open items: `claude/checkfinance-rebuild-research.md` in the Claim Simple / CMC project.

## Three brands, one codebase (Justera added 3 Nov 2026)
Brand differences live only in `src/brands/index.ts` and `brand-assets/<brand>/` (logo, favicon, social image, and the home hero car, whose number plate carries each brand's own logo). Never hard-code "Check Finance", "Case Matters" or "Justera" in a page: use `SITE.name` / `BRAND`. `scripts/check-site.mjs` fails the build if one brand's name appears in another's pages. Brand switches (logo type, watermark, GA) are fields on the brand, not checks on its id.

## Compliance rule (Jack)
Commercial first, compliant to the letter. Exactly what the rules require (CMCOB, consumer law, PECR/UK GDPR), nothing beyond it. Hero cards stay light: heading, one line, button.

## Content source (Jack, 2 Nov 2026)
Copy follows the old checkfinance.co.uk word for word ("replicate the content - as its all compliant"). The capture is in `docs/old-site/`. Shared wording (`FREE_ROUTE`, `PAYMENT_LINE`, `NO_WIN_LINE`, `CHOICES_LINE`, `SWITCH_LINE`, `PROOF`) is in `src/data/site.ts`; FAQs in `src/data/faqs.ts`. Only change old wording where a fact has since become untrue (FCA dates, the scheme's status), and say so in a code comment.

## Lender pages (Jack, 1 Nov 2026)
Never add lender phone numbers, opening hours, login links or complaints addresses; never question a lender's standing; no "Independent / not part of [lender]" labels; no pages for closed lenders (administration, scheme of arrangement, stopped lending). Facts in `src/data/lenders.ts` with sources; bump `checked` when re-verified.

## Design
Brand colours from the original site (green #04C78D, ink #07131E, mint #C1F7E7). Mobile first; most visitors arrive on phones from letters. Styled on reclaim247 (Jack, 2 Nov 2026): little copy, lots of punch. Chunky uppercase headings (Archivo expanded black), Plus Jakarta Sans body, bordered cards, dark bands, the car on an arch in a centred hero. Shared blocks: CarHero, StatBand, OwedCards, HowCards, EndBand. Header copies CreditRights: drop-down menus on desktop, grouped full-screen menu on phones. Avoid AI-looking patterns (credentials strips above the header, eyebrow labels, offset-shadow buttons).

## FCA scheme facts
`SCHEME_STEPS`, `SCHEME_UPDATED` and `FIGURES` in `src/data/site.ts`; the scheme page is `src/pages/fca-redress-scheme.astro`. Update them when the case moves.
