# Check Finance / Case Matters websites

Handover and open items: `claude/checkfinance-rebuild-research.md` in the Claim Simple / CMC project.

## Two brands, one codebase
Brand differences live only in `src/brands/index.ts` and `brand-assets/<brand>/` (logo, favicon, social image, and the Check Finance car shown in the home hero; the car carries a Check Finance plate, so it never goes on Case Matters). Never hard-code "Check Finance" or "Case Matters" in a page: use `SITE.name` / `BRAND`. `scripts/check-site.mjs` fails the build if one brand's name appears in the other's pages.

## Compliance rule (Jack)
Commercial first, compliant to the letter. Exactly what the rules require (CMCOB, consumer law, PECR/UK GDPR), nothing beyond it. Required wording: `FREE_ROUTE` and `PAYMENT_LINE` in `src/data/site.ts`, and the fee bands on `/fees/`. Hero cards stay light: heading, one line, button. No "you don't need a claims company" line beyond `FREE_ROUTE`.

## Lender pages (Jack, 1 Nov 2026)
Never add lender phone numbers, opening hours, login links or complaints addresses; never question a lender's standing; no "Independent / not part of [lender]" labels; no pages for closed lenders (administration, scheme of arrangement, stopped lending). Facts in `src/data/lenders.ts` with sources; bump `checked` when re-verified.

## Design
Brand colours from the original site (green #04C78D, ink #07131E, mint #C1F7E7). Mobile first; most visitors arrive on phones from letters. Generous spacing. Avoid AI-looking patterns (credentials strips above the header, eyebrow labels, offset-shadow buttons).

## FCA scheme facts
`SCHEME_STEPS`, `SCHEME_UPDATED` and `FIGURES` in `src/data/site.ts`; the scheme page is `src/pages/fca-redress-scheme.astro`. Update them when the case moves.
