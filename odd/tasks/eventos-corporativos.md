# Eventos corporativos — demo para la clienta (reunión lunes 2026-10-19)
Objetivo: administrar invitaciones de eventos de empresa (logo, fecha, lugar), con confirmación que pregunta restricciones alimentarias, lista de invitados y envío masivo.
Rama: feat/eventos-corporativos · Entrega: ask-on-risk · Runner de tests: ninguno (el repo no tiene suite; `npm run lint` y `npm run build`).

## Specs
- S1. "el módulo de confirmación que es lo que más me interesa porque ahí necesito poner si tiene alguna restricción alimentaria, por ejemplo". La confirmación del invitado pregunta restricciones como campo propio (no en `notes`) y la lista las muestra y las cuenta.
- S2. "poder ver y mandar masivamente las invitaciones si tenéis que estar mandando uno por uno". Envío masivo por mail (Brevo) a los pendientes; WhatsApp como cola de un toque por persona (la API oficial de Meta queda fuera, etapa 2).
- S3. "Y que se me haga el listado cuando vayan confirmando, obviamente." Listado en vivo de quién confirmó, con filtros y exportación a CSV.
- S4. "la invitación que solo necesitamos es básica, digamos, que lleve el logo de la empresa, fecha, día, horario, dirección". Tarjeta corporativa sobria con logo (allegoría derivada de `bodaSobria`, sólo tokens). Datos del showcase inventados.
- S5. (Supuesto, no pedido) Los invitados tienen email, teléfono y empresa; se registra cuándo y por dónde se les envió el enlace, para "enviar sólo a los que faltan".
- S6. (Supuesto) Vocabulario cerrado de restricciones: celiaco, vegetariano, vegano, sin_lactosa, frutos_secos, otra (+ texto libre).

## Tasks
- [x] T1 (S1,S5,S6) Migración 007 en `supabase/migrations/` — inline — aplicada 2026-10-15 con apply_migration; verificado: 6 funciones con permisos anon+authenticated como en la 006, y `guest_respond` con 4 parámetros nombrados no es ambigua (devuelve el error de negocio esperado con token inexistente)
- [x] T2 (S1) Confirmación del invitado con restricciones (`Sections.jsx`, `guestService.js`) — inline — commit 050227d; el formulario abierto también usa las fichas (se guardan juntas en `notes`). Falta aplicar 008 (precarga lo ya contestado)
- [x] T3 (S3,S5) Lista de invitados: carga con contacto, filtros, CSV, resumen de restricciones (`GuestListPage`, `listaInvitados.js`) — inline — commit 050227d; `node scripts/probar-lista-invitados.mjs` pasa (escrito después del código, sin RED observado)
- [x] T4 (S4) Allegoría corporativa + registro en `models.js`/`segments.js`/`templates.js` — inline — verificada en navegador local (`/preview/evento-corporativo`); tokens nuevos `heroNameSize`/`heroNameWeight` y `data.logoUrl` en la portada
- [x] T5 (S2) Cola de WhatsApp: teléfono directo, mensaje editable, marca de enviado — inline — commit 050227d; la marca llama a `mark_guests_sent` (007), no probada contra la base real
- [~] T6 (S2) Edge Function de mail con Brevo — inline — código escrito (`supabase/functions/enviar-invitaciones/index.ts`) y panel "Enviar por mail" en la lista; sintaxis verificada con node, NO ejecutada (sin Deno). Falta: dominio verificado en Brevo, remitente, secretos `BREVO_API_KEY` y `MAIL_FROM` cargados por el usuario, despliegue y una prueba real a un mail propio

## Log
- L1 (2026-10-15) Usuario: "ayer me llamo un cliente interesado por las tarjetas, me planteo qeu necesita una pagina para administrar las invitaciones, ella se encarga de la parte de comunicaciones de una empresa que hace workshops y otros tipos de eventos [...] el lunes que viene voy a tener una meet para mostrarle nuestro trabajo. creo qeu seria oportuno que le prepare algo ya listo para mostrarle."
- L2 (2026-10-15) Usuario: "me gusta la ruta, pero si podemos tener todo para el lunes mejor."
- L3 (2026-10-15) Decisiones: Brevo como proveedor de mail (plan gratis: 300/día, API+SMTP incluidos; el pie "Sent with Brevo" se quita en Starter US$9/mes). Usuario crea la cuenta; el dominio de FX Estudio verifica el remitente.
- L4 (2026-10-15) T1: SQL escrito. `guests_by_token` se borra y recrea (cambia el retorno); `guest_respond` se borra y recrea con 2 parámetros con default para no romper el frontend actual. Pendiente de aplicar en Supabase con OK del usuario.
- L5 (2026-10-15) Usuario: "dale aplica". Antes se verificó en la base real (guest_list: 4 filas; 2 tarjetas publicadas; 006 aplicada). Migración aplicada en `mxzoofpyrqananmqzhbk`.
- L6 (2026-10-15) DNS de fxestudio.com.ar en Netlify; remitente previsto invitaciones@fxestudio.com.ar con Reply-To fxestudio1@gmail.com. Falta: cuenta Brevo del usuario y registros DNS.
