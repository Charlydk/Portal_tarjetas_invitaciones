import { invitationSegments } from '../../src/data/segments.js';

// Per-card link previews.
//
// The meta tags in index.html are static, so every route used to share the same
// preview: sending someone /preview/aurora-boda showed Cenicienta's picture.
// WhatsApp fetches the HTML and reads it without running any JavaScript, so the
// SPA cannot fix this from the client — the tags have to be right in the
// response body. This rewrites them at the edge.
//
// Two routes, two sources:
//
//   /preview/:variantId  a catalogue showcase — the design's own name and shot,
//                        read from src/data/segments.js so there is no second
//                        copy of the design list to keep in sync.
//   /i/:slug             a delivered card — the couple's names, read from the
//                        invitations table.
//
// The second one is the one that carries the business. A client forwards their
// card to a hundred guests, and the preview card is what all hundred see first:
// it has to say "Valentina & Maximiliano", not the name of the studio.

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

const findTemplate = (variantId) =>
  invitationSegments
    .flatMap((segment) => segment.templates)
    .find((t) => t.variantId === variantId);

/**
 * Una imagen lista para viajar en un meta tag.
 *
 * Las fotos del cliente viven en Storage y ya son direcciones completas; las
 * del catálogo son rutas del sitio y hay que anteponerle el dominio. WhatsApp
 * descarta una imagen relativa sin decir nada, así que la diferencia importa.
 */
const absoluta = (src) => {
  if (!src) return null;
  return /^https?:\/\//.test(src) ? src : SITE + src;
};

/** Reads config at the edge. Netlify exposes its own global; Deno's is the fallback. */
const env = (name) =>
  globalThis.Netlify?.env?.get(name) || globalThis.Deno?.env?.get(name) || '';

/** A catalogue showcase. Returns null for a design that is not in the catalogue. */
function showcaseMeta(variantId) {
  const template = findTemplate(variantId);
  if (!template) return null;

  return {
    title: `${template.name} — FX Estudio`,
    description: template.description || 'Invitación digital hecha a medida.',
    image: SITE + (template.previewImage || FALLBACK_IMAGE),
    url: `${SITE}/preview/${variantId}`,
  };
}

/**
 * A delivered card. Returns null whenever the preview cannot be personalised —
 * a missing slug, an unpublished or expired card, a request that failed — and
 * the site-wide preview stands in. A generic preview is a small disappointment;
 * a broken page while WhatsApp waits for the HTML is a lost invitation.
 *
 * The anon key only ever sees published, unexpired rows: the same policy that
 * protects /i/:slug protects this. A draft link previews as the portal, which
 * is what we want — names should not leak before the client publishes.
 */
async function invitationMeta(slug) {
  const base = env('VITE_SUPABASE_URL');
  const key = env('VITE_SUPABASE_ANON_KEY');
  if (!base || !key) return null;

  let row;
  try {
    const res = await fetch(
      `${base}/rest/v1/invitations?slug=eq.${encodeURIComponent(slug)}&select=variant_id,data`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) return null;
    [row] = await res.json();
  } catch {
    return null;
  }
  if (!row) return null;

  return metaDeTarjeta(row, `${SITE}/i/${slug}`);
}

/**
 * Los meta tags de una tarjeta, venga de donde venga.
 *
 * La misma pieza sirve para la publicada y para el borrador: cambia de dónde
 * salió la fila y a qué dirección apunta, no lo que se muestra.
 */
function metaDeTarjeta(row, url, prefijo = '') {
  const data = row.data || {};
  const names = [data.name1, data.name2].filter(Boolean).join(' & ');
  if (!names) return null;

  const description =
    prefijo +
    ([data.welcomePhrase, data.partyDateString].filter(Boolean).join(' · ') ||
      data.invitePhrase ||
      'Te esperamos para celebrar con nosotros.');

  const template = findTemplate(row.variant_id);

  return {
    title: names,
    description,
    // La portada del cliente primero. La foto del catálogo muestra el diseño,
    // que es lo correcto en la vidriera; acá el que mira el cuadrito es un
    // invitado de ESTA pareja, y lo que espera ver son ellos. Una foto de otro
    // casamiento en la preview de tu invitación se lee como un error.
    image: absoluta(row.data?.heroImage)
        || absoluta(row.data?.galleryPhotos?.[0])
        || SITE + (template?.previewImage || FALLBACK_IMAGE),
    url,
  };
}

/**
 * El borrador que revisa el cliente.
 *
 * Muestra lo mismo que la tarjeta publicada, y no filtra nada: el token que va
 * en la dirección ya abre la tarjeta entera para cualquiera que tenga el link.
 * Esconder los nombres en la preview de un enlace que muestra todo no protege
 * a nadie; sólo hace que el cliente reciba un cuadrito ajeno cuando le mandan
 * SU invitación para aprobar.
 */
async function draftMeta(token) {
  const base = env('VITE_SUPABASE_URL');
  const key = env('VITE_SUPABASE_ANON_KEY');
  if (!base || !token) return null;

  let row;
  try {
    const res = await fetch(`${base}/rest/v1/rpc/get_invitation_by_token`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_token: token }),
    });
    if (!res.ok) return null;
    [row] = await res.json();
  } catch {
    return null;
  }
  if (!row) return null;

  return metaDeTarjeta(row, `${SITE}/borrador/${token}`, 'Vista previa · ');
}

export default async (request, context) => {
  const response = await context.next();

  // Assets pass straight through; only the HTML shell needs rewriting.
  if (!(response.headers.get('content-type') || '').includes('text/html')) {
    return response;
  }

  const [section, param] = new URL(request.url).pathname.split('/').filter(Boolean);
  const meta =
    section === 'i'        ? await invitationMeta(param) :
    section === 'borrador' ? await draftMeta(param) :
                             showcaseMeta(param);

  // Nothing to personalise: the site-wide preview from index.html stands.
  if (!meta) return response;

  const { title, description, image, url } = meta;

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

export const config = { path: ['/preview/*', '/i/*', '/borrador/*'] };
