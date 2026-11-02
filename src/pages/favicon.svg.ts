import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { BRAND } from '../brands';
// Each brand's icon lives in brand-assets/<id>/favicon.svg.
const svg = readFileSync(`brand-assets/${BRAND.id}/favicon.svg`, 'utf8');
export const GET: APIRoute = () => new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
