// Envía por mail la invitación de cada invitado pendiente, con Brevo.
//
//   POST /functions/v1/enviar-invitaciones
//   { token, guestIds?, senderName?, replyTo?, subject?, message? }
//
// Quien organiza entra con el token de su tarjeta, igual que a la lista de
// invitados: no hay cuenta. Eso hace que la función sea tan segura como ese
// token, y por eso hace lo mínimo: sólo escribe a invitados de ESA tarjeta, sólo
// si está publicada, y con tope por llamada.
//
// Secretos (Supabase → Edge Functions → Secrets). Nunca van al navegador:
//   BREVO_API_KEY   la clave de Brevo (SMTP & API → API Keys)
//   MAIL_FROM       remitente verificado en Brevo, ej. invitaciones@fxestudio.com.ar
//   MAIL_FROM_NAME  (opcional) nombre del remitente por defecto
//   SITE_URL        (opcional) origen de los enlaces; por defecto https://fxestudio.com.ar
//   REPLY_TO        (opcional) a dónde llegan las respuestas, si el pedido no trae otra
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY las pone Supabase solo.

import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// El plan gratis de Brevo manda 300 por día. Tope por llamada por debajo de
// eso: una lista grande se manda en dos días y no se corta a la mitad.
const MAX_POR_LLAMADA = 250;
const PARALELO = 5;
// Quien ya recibió el mail hace menos de esto no lo recibe de nuevo: apretar el
// botón dos veces no le llena la casilla a nadie.
const ENFRIAMIENTO_MS = 60 * 60 * 1000;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const responder = (cuerpo: unknown, status = 200) =>
  new Response(JSON.stringify(cuerpo), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

// Todo lo que escribe un invitado o quien organiza entra a un HTML: se escapa.
const esc = (t: unknown) =>
  String(t ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

// Sin saltos de línea ni caracteres de control: van a un encabezado.
const limpio = (t: unknown, max: number) =>
  String(t ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

function armarMail(opciones: {
  titulo: string; nombre: string; mensaje: string; enlace: string;
  fecha?: string; hora?: string; lugar?: string; remitente: string;
}) {
  const { titulo, nombre, mensaje, enlace, fecha, hora, lugar, remitente } = opciones;
  const datos = [
    fecha && `📅 ${fecha}${hora ? ` · ${hora}` : ''}`,
    lugar && `📍 ${lugar}`,
  ].filter(Boolean) as string[];

  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#1b2430">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:8px;padding:32px 28px">
<tr><td>
<p style="margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#6b7785">${esc(remitente)}</p>
<h1 style="margin:0 0 18px;font-size:22px;line-height:1.3">${esc(titulo)}</h1>
<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Hola ${esc(nombre)},</p>
<p style="margin:0 0 18px;font-size:15px;line-height:1.6">${esc(mensaje).replace(/\n/g, '<br>')}</p>
${datos.map((d) => `<p style="margin:0 0 6px;font-size:15px">${esc(d)}</p>`).join('')}
<p style="margin:24px 0 8px"><a href="${esc(enlace)}" style="display:inline-block;background:#1f4e79;color:#fff;text-decoration:none;padding:13px 24px;border-radius:6px;font-size:15px;font-weight:bold">Ver invitación y confirmar</a></p>
<p style="margin:18px 0 0;font-size:12px;color:#6b7785;line-height:1.5">Si el botón no funciona, copiá este enlace en tu navegador:<br>${esc(enlace)}</p>
</td></tr></table></td></tr></table></body></html>`;

  const texto = [
    `Hola ${nombre},`, '', mensaje, '', ...datos, '',
    `Ver la invitación y confirmar: ${enlace}`,
  ].join('\n');

  return { html, texto };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return responder({ error: 'Método no permitido' }, 405);

  const brevoKey = Deno.env.get('BREVO_API_KEY');
  const desde = Deno.env.get('MAIL_FROM');
  if (!brevoKey || !desde) {
    return responder({ error: 'El envío por mail todavía no está configurado.' }, 503);
  }

  let pedido: Record<string, unknown>;
  try {
    pedido = await req.json();
  } catch {
    return responder({ error: 'Pedido inválido' }, 400);
  }

  const token = String(pedido.token ?? '');
  if (!UUID.test(token)) return responder({ error: 'No encontramos esa invitación' }, 404);

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  });

  const { data: tarjeta } = await db
    .from('invitations')
    .select('id, slug, status, data, expires_at')
    .eq('edit_token', token)
    .maybeSingle();

  if (!tarjeta) return responder({ error: 'No encontramos esa invitación' }, 404);
  // Un enlace a una tarjeta sin publicar no abre nada: mandarlo por mail a cien
  // personas sería repartir cien enlaces muertos.
  if (tarjeta.status !== 'publicada') {
    return responder({ error: 'La tarjeta todavía no está publicada.' }, 409);
  }

  let consulta = db
    .from('guest_list')
    .select('id, name, email, token, status, sent_at, sent_via')
    .eq('invitation_id', tarjeta.id);

  const ids = Array.isArray(pedido.guestIds)
    ? (pedido.guestIds as unknown[]).filter((i) => typeof i === 'string' && UUID.test(i))
    : null;
  // Sin una lista explícita, a los que todavía no contestaron.
  consulta = ids ? consulta.in('id', ids as string[]) : consulta.eq('status', 'pendiente');

  const { data: invitados, error: errorLista } = await consulta;
  if (errorLista) return responder({ error: 'No pudimos leer la lista de invitados.' }, 500);

  const ahora = Date.now();
  let sinMail = 0;
  let recientes = 0;
  const destinatarios = (invitados ?? []).filter((g) => {
    if (!g.email || !EMAIL.test(g.email)) { sinMail++; return false; }
    if (g.sent_via === 'mail' && g.sent_at && ahora - new Date(g.sent_at).getTime() < ENFRIAMIENTO_MS) {
      recientes++;
      return false;
    }
    return true;
  });

  const lote = destinatarios.slice(0, MAX_POR_LLAMADA);
  const pendientesDeLote = destinatarios.length - lote.length;

  const datos = (tarjeta.data ?? {}) as Record<string, string>;
  const titulo = limpio([datos.name1, datos.name2].filter(Boolean).join(' & '), 150) || 'Invitación';
  const remitente = limpio(pedido.senderName, 80) || Deno.env.get('MAIL_FROM_NAME') || 'FX Estudio';
  const responderA = limpio(pedido.replyTo, 254) || Deno.env.get('REPLY_TO') || '';
  const asunto = limpio(pedido.subject, 150) || `Invitación: ${titulo}`;
  const mensaje =
    String(pedido.message ?? '').trim().slice(0, 1000) ||
    'Te invitamos a nuestro evento. En el enlace vas a encontrar todos los detalles y podés confirmar tu asistencia.';
  const sitio = (Deno.env.get('SITE_URL') || 'https://fxestudio.com.ar').replace(/\/$/, '');
  const lugar = [datos.eventVenue || datos.partyPlace, datos.partyAddress].filter(Boolean).join(', ');

  const enviados: string[] = [];
  const fallidos: { nombre: string; motivo: string }[] = [];

  async function enviar(g: (typeof lote)[number]) {
    const { html, texto } = armarMail({
      titulo,
      nombre: g.name,
      mensaje,
      enlace: `${sitio}/i/${tarjeta!.slug}?i=${g.token}`,
      fecha: datos.partyDateString,
      hora: datos.partyTime,
      lugar,
      remitente,
    });

    const cuerpo: Record<string, unknown> = {
      sender: { name: remitente, email: desde },
      to: [{ email: g.email, name: limpio(g.name, 120) }],
      subject: asunto,
      htmlContent: html,
      textContent: texto,
      tags: ['invitacion'],
    };
    if (EMAIL.test(responderA)) cuerpo.replyTo = { email: responderA };

    try {
      const r = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': brevoKey!, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(cuerpo),
      });
      if (r.ok) enviados.push(g.id);
      else fallidos.push({ nombre: g.name, motivo: `Brevo respondió ${r.status}` });
    } catch {
      fallidos.push({ nombre: g.name, motivo: 'No se pudo conectar con Brevo' });
    }
  }

  // De a PARALELO: rápido sin que Brevo nos corte por ráfaga.
  for (let i = 0; i < lote.length; i += PARALELO) {
    await Promise.all(lote.slice(i, i + PARALELO).map(enviar));
  }

  if (enviados.length) {
    await db
      .from('guest_list')
      .update({ sent_at: new Date().toISOString(), sent_via: 'mail' })
      .in('id', enviados);
  }

  return responder({
    enviados: enviados.length,
    fallidos,
    sinMail,
    recientes,
    // Quedaron para la próxima llamada (tope por llamada).
    restantes: pendientesDeLote,
  });
});
