import { invitationSegments } from '../../src/data/segments.js';

// Per-card link previews.
//
// The meta tags in index.html are static, so every route used to share the same
// preview: sending someone /preview/aurora-boda showed Cenicienta's picture.
// WhatsApp fetches the HTML and reads it without running any JavaScript, so the
// SPA cannot fix this from the client — the tags have to be right in the
// response body. This rewrites them at the edge.
//
// The catalogue is imported straight from src/data/segments.js, so there is no
// second copy of the design list to keep in sync.

const SITE = 'https://fxestudio.com.ar';
const FALLBACK_IMAGE = '/allegories/cenicienta/fondo.jpeg';

const escapeAttr = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Replaces a meta tag's content, or leaves the HTML untouched if it is absent. */
const setMeta = (html, attr, name, value) => {
  const pattern = new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

export default async (request, context) => {
  const response = await context.next();

  // Assets pass straight through; only the HTML shell needs rewriting.
  if (!(response.headers.get('content-type') || '').includes('text/html')) {
    return response;
  }

  const variantId = new URL(request.url).pathname.split('/').filter(Boolean)[1];
  const template = invitationSegments
    .flatMap((segment) => segment.templates)
    .find((t) => t.variantId === variantId);

  // A design that is not in the catalogue keeps the site-wide preview.
  if (!template) return response;

  const title = `${template.name} — FX Estudio`;
  const description = template.description || 'Invitación digital hecha a medida.';
  const image = SITE + (template.previewImage || FALLBACK_IMAGE);
  const url = `${SITE}/preview/${variantId}`;

  let html = await response.text();
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:url', url);

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};

export const config = { path: '/preview/*' };
