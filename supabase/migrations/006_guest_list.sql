-- ─────────────────────────────────────────────────────────────────────────────
-- La lista de invitados: la función premium+.
--
-- La confirmación base (005) responde "quién contestó". Esta responde la
-- pregunta que de verdad desvela a un cliente dos semanas antes del evento:
-- "¿a quién todavía tengo que perseguir?". Para eso hace falta saber a quién
-- invitó, y esa lista hoy no existe en ningún lado: vive en la cabeza de los
-- novios o en un Excel.
--
-- Cada invitado recibe SU link. La tarjeta ya sabe quién es, así que confirmar
-- es un toque y no un formulario. Y el cupo lo fija el cliente: se termina el
-- invitado que confirma por seis.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.guest_list (
  id            uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,

  name          text not null check (length(btrim(name)) between 1 and 120),
  -- Cuántos puede traer. Es el cupo que decide el cliente, no el invitado.
  max_companions integer not null default 0 check (max_companions between 0 and 20),

  -- Su credencial. Corto a propósito: viaja en un WhatsApp y se lee de reojo.
  token         text not null unique default encode(gen_random_bytes(6), 'hex'),

  status        text not null default 'pendiente'
                check (status in ('pendiente','confirmado','rechazado')),
  -- Cuántos vienen de verdad, que puede ser menos que el cupo.
  companions    integer not null default 0 check (companions between 0 and 20),
  notes         text check (notes is null or length(notes) <= 500),
  responded_at  timestamptz,

  created_at    timestamptz not null default now()
);

create index if not exists guest_list_invitation_idx on public.guest_list (invitation_id, name);
create index if not exists guest_list_token_idx      on public.guest_list (token);

alter table public.guest_list enable row level security;

-- El equipo administra desde el panel. Nadie más toca la tabla directo: el
-- cliente y el invitado entran por las funciones de más abajo.
drop policy if exists "el equipo administra invitados" on public.guest_list;
create policy "el equipo administra invitados"
  on public.guest_list for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

revoke all on public.guest_list from anon, authenticated;
grant select, insert, update, delete on public.guest_list to authenticated;

-- ─── Lo que hace el cliente ──────────────────────────────────────────────────
-- Su token de tarjeta es la credencial, igual que para el borrador. Puede
-- cargar su lista y verla al instante; ese "al instante" es justamente lo que
-- se vende contra el "mandámela y te la cargo mañana".

create or replace function public.guests_by_token(p_token uuid)
returns table (id uuid, name text, max_companions integer, token text,
               status text, companions integer, notes text, responded_at timestamptz)
language sql
security definer
set search_path = public
as $fn$
  select g.id, g.name, g.max_companions, g.token,
         g.status, g.companions, g.notes, g.responded_at
  from public.guest_list g
  join public.invitations i on i.id = g.invitation_id
  where i.edit_token = p_token
  order by g.name
$fn$;

-- Carga varios de una. Se manda un arreglo y no de a uno porque una lista de
-- casamiento son cien nombres: cien pedidos serían un minuto de reloj mirando
-- una pantalla que no responde.
create or replace function public.add_guests(p_token uuid, p_guests jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_invitation uuid;
  v_insertados integer;
begin
  select id into v_invitation from public.invitations where edit_token = p_token;
  if v_invitation is null then
    raise exception 'No encontramos esa invitación' using errcode = '42501';
  end if;

  insert into public.guest_list (invitation_id, name, max_companions)
  select
    v_invitation,
    btrim(g->>'name'),
    least(greatest(coalesce((g->>'max_companions')::int, 0), 0), 20)
  from jsonb_array_elements(p_guests) g
  where length(btrim(coalesce(g->>'name',''))) > 0;

  get diagnostics v_insertados = row_count;
  return v_insertados;
end
$fn$;

create or replace function public.remove_guest(p_token uuid, p_guest_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
begin
  delete from public.guest_list g
  using public.invitations i
  where g.id = p_guest_id
    and i.id = g.invitation_id
    and i.edit_token = p_token;
end
$fn$;

-- ─── Lo que hace el invitado ─────────────────────────────────────────────────
-- Entra con su propio token. Ve su nombre y su cupo, y contesta. No puede ver
-- la lista ni saber a quién más invitaron.

create or replace function public.guest_by_token(p_guest_token text)
returns table (name text, max_companions integer, status text, companions integer, slug text)
language sql
security definer
set search_path = public
as $fn$
  select g.name, g.max_companions, g.status, g.companions, i.slug
  from public.guest_list g
  join public.invitations i on i.id = g.invitation_id
  where g.token = p_guest_token
    and i.status = 'publicada'
    and (i.expires_at is null or i.expires_at > now())
$fn$;

-- La respuesta del invitado. Se puede volver a contestar: la gente se
-- arrepiente, y obligarlo a escribirle a los novios para corregir un toque
-- equivocado anula la comodidad que se le vendió al cliente.
create or replace function public.guest_respond(
  p_guest_token text,
  p_attending   boolean,
  p_companions  integer default 0,
  p_notes       text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_id  uuid;
  v_max integer;
begin
  select g.id, g.max_companions into v_id, v_max
  from public.guest_list g
  join public.invitations i on i.id = g.invitation_id
  where g.token = p_guest_token
    and i.status = 'publicada'
    and (i.expires_at is null or i.expires_at > now());

  if v_id is null then
    raise exception 'Ese enlace no está disponible' using errcode = '42501';
  end if;

  update public.guest_list set
    status       = case when p_attending then 'confirmado' else 'rechazado' end,
    -- Nunca más que el cupo, aunque el navegador mande otra cosa.
    companions   = case when p_attending
                        then least(greatest(coalesce(p_companions, 0), 0), v_max)
                        else 0 end,
    notes        = nullif(btrim(coalesce(p_notes, '')), ''),
    responded_at = now()
  where id = v_id;
end
$fn$;

-- A `authenticated` también en todas: el equipo abre estos links desde el mismo
-- navegador donde tiene la sesión del panel abierta. Ya nos mordió una vez.
revoke all on function public.guests_by_token(uuid)                       from public, anon, authenticated;
revoke all on function public.add_guests(uuid, jsonb)                     from public, anon, authenticated;
revoke all on function public.remove_guest(uuid, uuid)                    from public, anon, authenticated;
revoke all on function public.guest_by_token(text)                        from public, anon, authenticated;
revoke all on function public.guest_respond(text, boolean, integer, text) from public, anon, authenticated;

grant execute on function public.guests_by_token(uuid)                       to anon, authenticated;
grant execute on function public.add_guests(uuid, jsonb)                     to anon, authenticated;
grant execute on function public.remove_guest(uuid, uuid)                    to anon, authenticated;
grant execute on function public.guest_by_token(text)                        to anon, authenticated;
grant execute on function public.guest_respond(text, boolean, integer, text) to anon, authenticated;
