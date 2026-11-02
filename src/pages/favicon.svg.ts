import type { APIRoute } from 'astro';
import { BRAND } from '../brands';
// Check Finance: the chevron mark on green. Case Matters: its initials until the logo arrives.
const svg = BRAND.id === 'checkfinance'
  ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#04C78D"/><g transform="translate(4 4)" fill="none" stroke="#07131E" stroke-width="4.6" stroke-linecap="square"><path d="M20 3L3 20l17 17"/><path d="M13 19l4.5 4.5L28 13"/><path d="M36 15L25 26l9 9"/></g></svg>`
  : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#04C78D"/><text x="24" y="31" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="#07131E">CM</text></svg>`;
export const GET: APIRoute = () => new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
