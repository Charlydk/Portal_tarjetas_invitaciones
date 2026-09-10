/**
 * Genera el mapa del sitio a partir del catálogo.
 *
 * Se arma en cada build y no a mano: un sitemap escrito a dedo miente el día
 * que se agrega un diseño y nadie se acuerda de actualizarlo, y un mapa que
 * miente es peor que no tenerlo.
 *
 * Sólo entran las páginas públicas. Las tarjetas entregadas quedan afuera por
 * privacidad: nadie llega a la invitación de un casamiento por Google, y los
 * novios no esperan que su fecha, su salón y su alias sean buscables.
 */
import { writeFileSync } from 'node:fs';
import { invitationSegments } from '../src/data/segments.js';

const SITIO = 'https://fxestudio.com.ar';
const hoy = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITIO}/`, priority: '1.0', changefreq: 'weekly' },
  ...invitationSegments
    .flatMap((s) => s.templates)
    .map((t) => ({
      loc: `${SITIO}/preview/${t.variantId}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync('dist/sitemap.xml', xml, 'utf8');
console.log(`sitemap.xml: ${urls.length} direcciones`);
