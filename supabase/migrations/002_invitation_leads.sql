-- ─────────────────────────────────────────────────────────────────────────────
-- Los leads del editor: quién armó una tarjeta y con qué la armó.
--
-- Esta tabla ya existía, pero vivía sólo en el dashboard del proyecto anterior:
-- creada a mano, sin quedar en el repo. Al mudar de cuenta se perdía entera y el
-- botón de finalizar del editor escribía contra una tabla inexistente. Queda
-- versionada acá para que la próxima mudanza sea correr un archivo.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.invitation_leads (
  id                uuid primary key default gen_random_uuid(),

  -- Por dónde se sigue la conversación: el flujo termina en WhatsApp.
  whatsapp_number   text,

  -- Qué diseño eligió, en los términos de src/data/models.js.
  model_id          text,
  variant_id        text,
  -- El nombre lindo del diseño, congelado. Si mañana se renombra una variante,
  -- el lead viejo tiene que seguir diciendo lo que el cliente vio.
  template_name     text,

  protagonist_names text,
  -- El editor manda un datetime-local ('2026-09-16T14:30'), no una fecha suelta.
  event_date        timestamptz,
  total_price       numeric,

  -- El formData completo. Lo demás son columnas para poder mirar la tabla sin
  -- abrir el JSON; esto es lo que permite reconstruir la tarjeta entera.
  form_data         jsonb not null default '{}'::jsonb,

  created_at        timestamptz not null default now()
);

create index if not exists invitation_leads_created_at_idx
  on public.invitation_leads (created_at desc);

-- ─── Permisos ────────────────────────────────────────────────────────────────
-- Un buzón: el navegador deja cartas y no puede abrir ninguna. No hay policy de
-- SELECT, así que los leads se leen sólo con la service role (Supabase Studio).
--
-- Los grants por columna son la segunda capa. Supabase le otorga permisos por
-- default a `anon` y `authenticated` sobre toda tabla nueva de `public`, así que
-- sin la revocatoria de abajo cualquiera podría escribir columnas que el editor
-- nunca manda.

alter table public.invitation_leads enable row level security;

drop policy if exists "cualquiera deja su lead" on public.invitation_leads;
create policy "cualquiera deja su lead"
  on public.invitation_leads
  for insert
  to anon
  with check (true);

revoke all on public.invitation_leads from anon, authenticated;
grant insert (
  whatsapp_number,
  model_id,
  variant_id,
  template_name,
  protagonist_names,
  event_date,
  total_price,
  form_data
) on public.invitation_leads to anon;
