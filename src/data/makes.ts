// Car make → the lender that provided most of the manufacturer's own finance
// between 2007 and 2024. Shown as "usually financed by": dealers could also
// use other lenders. `slug` links to that make's lender page.
// Sources: lender research of 2 Nov 2026 (see lenders.ts).

export interface Make { make: string; lender: string; group: string; challenging: boolean; slug?: string }

const VW = { lender: 'Volkswagen Financial Services', group: 'Volkswagen Group', challenging: true };
const SFS = { lender: 'Stellantis Financial Services (PSA Finance)', group: 'Stellantis', challenging: false, slug: 'psa-finance' };
const RCI = { lender: 'RCI Financial Services', group: 'Renault Group', challenging: false, slug: 'rci-finance' };
const CA = { lender: 'CA Auto Finance', group: 'Crédit Agricole', challenging: true, slug: 'ca-auto-finance' };
const BH = { lender: 'Black Horse', group: 'Lloyds Banking Group', challenging: false, slug: 'blackhorse-finance' };
const BMW = { lender: 'BMW Financial Services', group: 'BMW Group', challenging: false, slug: 'bmw-finance' };
const HC = { lender: 'Hyundai Capital UK', group: 'Santander Consumer (UK) and Hyundai Capital', challenging: false };
const SC = { lender: 'Santander Consumer (UK)', group: 'Banco Santander', challenging: false, slug: 'santander-finance' };

export const MAKES: Make[] = [
  { make: 'Alfa Romeo', ...CA },
  { make: 'Audi', ...VW, slug: 'audi-finance' },
  { make: 'BMW', ...BMW },
  { make: 'Citroën', ...SFS },
  { make: 'CUPRA', ...VW, slug: 'volkswagen-finance' },
  { make: 'Dacia', ...RCI },
  { make: 'Fiat', ...CA },
  { make: 'Ford', lender: 'Ford Credit', group: 'Ford Motor Company', challenging: false, slug: 'ford-finance' },
  { make: 'Honda', lender: 'Honda Finance Europe', group: 'Honda', challenging: false, slug: 'honda-finance' },
  { make: 'Hyundai', ...HC, slug: 'hyundai-finance' },
  { make: 'Jaguar', ...BH },
  { make: 'Jeep', ...CA },
  { make: 'Kia', ...HC, slug: 'kia-finance' },
  { make: 'Land Rover', ...BH },
  { make: 'Lexus', lender: 'Toyota Financial Services', group: 'Toyota', challenging: false, slug: 'toyota-finance' },
  { make: 'Mazda', ...SC },
  { make: 'Mercedes-Benz', lender: 'Mercedes-Benz Financial Services', group: 'Mercedes-Benz Group', challenging: true, slug: 'mercedes-finance' },
  { make: 'MINI', ...BMW },
  { make: 'Nissan', ...RCI },
  { make: 'Peugeot', ...SFS },
  { make: 'Porsche', ...VW, slug: 'volkswagen-finance' },
  { make: 'Renault', ...RCI },
  { make: 'SEAT', ...VW, slug: 'volkswagen-finance' },
  { make: 'Škoda', ...VW, slug: 'volkswagen-finance' },
  { make: 'Toyota', lender: 'Toyota Financial Services', group: 'Toyota', challenging: false, slug: 'toyota-finance' },
  { make: 'Vauxhall', lender: 'Vauxhall Finance (now Stellantis)', group: 'Stellantis', challenging: false, slug: 'vauxhall-finance' },
  { make: 'Volkswagen', ...VW, slug: 'volkswagen-finance' },
  { make: 'Volvo', ...SC },
];

export const DEFAULT_MAKE = 'Ford';
