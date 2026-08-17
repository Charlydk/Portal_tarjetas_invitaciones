-- ─────────────────────────────────────────────────────────────────────────────
-- Una tarjeta entregada deja de ser un repositorio y pasa a ser una fila.
--
-- Hoy cada cliente tiene su repo y su sitio en Netlify: diez tarjetas son diez
-- deploys, y cambiarle la hora a una obliga a redeployar a mano. Con esto hay un
-- solo deploy y la tarjeta se edita cambiando un campo.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.invitations (
  id              uuid primary key default gen_random_uuid(),

  -- Lo que va en la URL: /i/valentina-y-maxi
  slug            text not null unique,

  -- Qué diseño usa. variant_id es el id de la variante en src/data/models.js.
  model_id        text not null default 'allegories',
  variant_id      text not null,

  -- El formData completo, igual que el que produce el editor.
  data            jsonb not null default '{}'::jsonb,

  status          text not null default 'borrador'
                  check (status in ('borrador','revision','publicada','archivada')),

  -- Si el cliente carga sus datos o si lo hacemos nosotros. Muchos clientes no
  -- quieren tocar nada, y el flujo tiene que saberlo desde el principio.
  assistance      text not null default 'asistida'
                  check (assistance in ('autogestion','asistida')),

  assigned_to     text,
  client_name     text,
  client_whatsapp text,

  -- Credencial del cliente para ver y editar su borrador sin cuenta ni clave.
  edit_token      uuid not null default gen_random_uuid(),

  plan            text check (plan in ('clasica','premium')),

  published_at    timestamptz,
  -- Habilita el negocio de renovación: la tarjeta deja de verse al vencer.
  expires_at      timestamptz,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists invitations_status_idx     on public.invitations (status);
create index if not exists invitations_edit_token_idx on public.invitations (edit_token);

-- updated_at automático: si se toca a mano se olvida siempre.
create or replace function public.touch_updated_at()
returns trigger language plpgsql
-- Sin esto, un search_path manipulado podría hacer que el trigger llame a otra
-- función `now()`. Es la advertencia que tira el linter de Supabase.
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists invitations_touch_updated_at on public.invitations;
create trigger invitations_touch_updated_at
  before update on public.invitations
  for each row execute function public.touch_updated_at();

-- ─── Permisos ────────────────────────────────────────────────────────────────
-- Dos capas, porque una sola no alcanza:
--   RLS filtra QUÉ FILAS se ven (sólo publicadas y no vencidas).
--   Los grants por columna filtran QUÉ CAMPOS se ven.
-- Sin la segunda capa, un invitado podría leer el edit_token y el teléfono del
-- cliente de cualquier tarjeta publicada.

alter table public.invitations enable row level security;

drop policy if exists "publicadas visibles" on public.invitations;
-- Sólo `anon`: el portal no tiene login, así que nadie lee esta tabla con un
-- usuario. Incluir a `authenticated` habría dejado que cualquiera que se
-- registre lea la tabla, y Supabase le otorga permisos por default a ese rol
-- sobre toda tabla nueva de `public` — la revocatoria de abajo lo corrige.
create policy "publicadas visibles"
  on public.invitations
  for select
  to anon
  using (
    status = 'publicada'
    and (expires_at is null or expires_at > now())
  );

revoke all on public.invitations from anon, authenticated;
grant select (slug, model_id, variant_id, data, expires_at)
  on public.invitations to anon;

-- ─── Borrador por token ──────────────────────────────────────────────────────
-- El cliente necesita ver su tarjeta ANTES de publicarla, y no tiene cuenta.
-- El token hace de credencial. Va en una función porque una policy que compare
-- contra un valor que manda el navegador permitiría enumerar la tabla; acá la
-- función es la única puerta y devuelve sólo los campos necesarios.

create or replace function public.get_invitation_by_token(p_token uuid)
returns table (slug text, model_id text, variant_id text, data jsonb, status text)
language sql
security definer
set search_path = public
as $$
  select slug, model_id, variant_id, data, status
  from public.invitations
  where edit_token = p_token
    and status <> 'archivada'
$$;

-- `from public` no alcanza: Supabase le otorga EXECUTE a `anon` y `authenticated`
-- por default privileges sobre cada función nueva de `public`, y esos son grants
-- propios, no heredados de PUBLIC. Hay que nombrarlos.
revoke all on function public.get_invitation_by_token(uuid) from public, anon, authenticated;
grant execute on function public.get_invitation_by_token(uuid) to anon;
