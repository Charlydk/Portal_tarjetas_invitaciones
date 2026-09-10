-- ─────────────────────────────────────────────────────────────────────────────
-- Las confirmaciones de los invitados.
--
-- Hasta ahora cada invitado le mandaba un WhatsApp suelto a los novios. Ciento
-- veinte invitados son ciento veinte mensajes mezclados con el resto del chat, y
-- el cliente termina contando a mano en una libreta. Ese es el dolor real de un
-- casamiento, y es lo que se cobra aparte.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.rsvp_responses (
  id            uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,

  guest_name    text not null check (length(btrim(guest_name)) between 1 and 120),
  attending     boolean not null,
  -- Cuántos vienen ADEMÁS de quien confirma. El tope no es capricho: sin él,
  -- cualquiera con el link puede inflar el total y arruinar el número que el
  -- cliente le pasa al salón.
  companions    integer not null default 0 check (companions between 0 and 20),

  -- Acá vive la consulta dietaria de verdad: alergias, celiaquía, vegetarianos.
  -- Antes era un módulo que se cobraba y no preguntaba nada.
  notes         text check (notes is null or length(notes) <= 500),

  created_at    timestamptz not null default now()
);

create index if not exists rsvp_responses_invitation_idx
  on public.rsvp_responses (invitation_id, created_at desc);

-- ─── Permisos ────────────────────────────────────────────────────────────────
-- Un buzón otra vez: el invitado deja su confirmación y no puede leer ninguna.
-- Los nombres y las restricciones alimentarias de los demás no son asunto suyo.

alter table public.rsvp_responses enable row level security;

/**
 * ¿Esa invitación está abierta para confirmar?
 *
 * Va en una función `security definer` y no dentro de la política porque `anon`
 * no tiene permiso de lectura sobre las columnas `id` ni `status` de
 * `invitations` — sólo sobre cinco columnas públicas. Una política que las
 * consultara directamente fallaría por permisos, no por la regla.
 */
create or replace function public.invitation_is_open(p_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.invitations
    where id = p_id
      and status = 'publicada'
      and (expires_at is null or expires_at > now())
  )
$$;

revoke all on function public.invitation_is_open(uuid) from public, anon, authenticated;
grant execute on function public.invitation_is_open(uuid) to anon, authenticated;

drop policy if exists "el invitado confirma"      on public.rsvp_responses;
drop policy if exists "el equipo ve las respuestas" on public.rsvp_responses;
drop policy if exists "el equipo borra respuestas"  on public.rsvp_responses;

-- Sólo contra una tarjeta publicada y vigente. Sin esto, alguien podría cargar
-- confirmaciones contra un borrador que todavía no se mostró a nadie.
create policy "el invitado confirma"
  on public.rsvp_responses for insert to anon, authenticated
  with check (public.invitation_is_open(invitation_id));

create policy "el equipo ve las respuestas"
  on public.rsvp_responses for select to authenticated
  using (public.is_admin());

-- Para sacar una repetida o una broma. No hay UPDATE a propósito: una
-- confirmación es lo que dijo el invitado, y eso no se edita después.
create policy "el equipo borra respuestas"
  on public.rsvp_responses for delete to authenticated
  using (public.is_admin());

revoke all on public.rsvp_responses from anon, authenticated;
grant select, delete on public.rsvp_responses to authenticated;

-- ─── La puerta del invitado ──────────────────────────────────────────────────
-- El navegador del invitado NO puede insertar directo: para eso necesitaria el
-- `id` de la tarjeta, y `anon` sólo puede leer cinco columnas públicas, entre
-- las que no está. Ampliar ese permiso para que alcance seria abrir una puerta
-- de más; en cambio, la función resuelve el slug adentro.
--
-- Es `security definer`, así que valida ella misma que la tarjeta esté
-- publicada y vigente: la política de arriba queda como segunda capa por si
-- algún día alguien otorga el INSERT directo.

create or replace function public.submit_rsvp(
  p_slug       text,
  p_name       text,
  p_attending  boolean,
  p_companions integer default 0,
  p_notes      text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id
  from public.invitations
  where slug = p_slug
    and status = 'publicada'
    and (expires_at is null or expires_at > now());

  if v_id is null then
    raise exception 'Esa invitación no está disponible' using errcode = '42501';
  end if;

  insert into public.rsvp_responses (invitation_id, guest_name, attending, companions, notes)
  values (
    v_id,
    btrim(p_name),
    p_attending,
    -- Se recorta acá y no sólo en el navegador: el navegador es del invitado.
    least(greatest(coalesce(p_companions, 0), 0), 20),
    nullif(btrim(coalesce(p_notes, '')), '')
  );
end
$$;

revoke all on function public.submit_rsvp(text, text, boolean, integer, text) from public, anon, authenticated;
grant execute on function public.submit_rsvp(text, text, boolean, integer, text) to anon, authenticated;

-- ─── La lista para el cliente ────────────────────────────────────────────────
-- El cliente no tiene cuenta, igual que para ver su borrador. Su token de
-- edición hace de credencial también acá, así que ve las suyas y nada más.

create or replace function public.get_rsvps_by_token(p_token uuid)
returns table (guest_name text, attending boolean, companions integer, notes text, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select r.guest_name, r.attending, r.companions, r.notes, r.created_at
  from public.rsvp_responses r
  join public.invitations i on i.id = r.invitation_id
  where i.edit_token = p_token
  order by r.created_at desc
$$;

revoke all on function public.get_rsvps_by_token(uuid) from public, anon, authenticated;
-- A `authenticated` también: el equipo abre ese link desde el mismo navegador
-- donde tiene la sesión del panel. Ya nos mordió una vez.
grant execute on function public.get_rsvps_by_token(uuid) to anon, authenticated;
