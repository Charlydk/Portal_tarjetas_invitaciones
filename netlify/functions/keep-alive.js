/**
 * Mantiene despierto el proyecto de Supabase.
 *
 * El plan gratuito pausa los proyectos con poca actividad durante 7 días, y
 * cuando eso pasa el dominio deja de resolver: la tarjeta de un cliente se
 * apaga entera. Con eventos a diecisiete meses de distancia, hay semanas
 * enteras sin que nadie abra su invitación — y esa es justo la ventana en la
 * que el proyecto se duerme.
 *
 * La documentación de Supabase dice que alcanzan "unas pocas solicitudes a la
 * base de datos por día durante la semana previa". Por día, no por semana: de
 * ahí que esto corra dos veces al día y no una vez por semana.
 *
 * Es una consulta de verdad contra una tabla, no un ping al sitio: lo que
 * cuenta como actividad es que la base trabaje, no que el HTML responda.
 */

const TABLA = 'invitations';

export default async () => {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Sin credenciales no hay nada que despertar. Se avisa fuerte: un
    // keep-alive que falla en silencio es peor que no tenerlo, porque deja la
    // sensación de que el problema está cubierto.
    console.error('keep-alive: faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
    return new Response('sin credenciales', { status: 500 });
  }

  try {
    const res = await fetch(`${url}/rest/v1/${TABLA}?select=slug&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });

    if (!res.ok) {
      console.error(`keep-alive: la base respondió ${res.status}`, await res.text());
      return new Response(`la base respondió ${res.status}`, { status: 500 });
    }

    console.log('keep-alive: la base respondió bien');
    return new Response('ok');
  } catch (err) {
    console.error('keep-alive: no pudimos alcanzar la base', err);
    return new Response('sin alcance', { status: 500 });
  }
};

// Dos veces por día, a las 3 y a las 15 UTC. Sesenta invocaciones al mes:
// nada contra el plan gratuito de Netlify, y suficiente actividad para que el
// proyecto no entre en la ventana de pausa.
export const config = {
  schedule: '0 3,15 * * *',
};
