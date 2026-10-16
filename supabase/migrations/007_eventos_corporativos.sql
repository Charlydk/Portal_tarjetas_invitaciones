-- ─────────────────────────────────────────────────────────────────────────────
-- Eventos corporativos: contacto del invitado, restricciones alimentarias y
-- registro de envíos.
--
-- Quien organiza un evento de empresa no carga "Juan Pérez, 1" y listo: necesita
-- poder escribirle a cada invitado (mail, teléfono), saber qué come (el catering
-- se cierra con esos números) y no mandarle dos veces lo mismo.
--
--   · email, phone, company  → a quién le escribimos y de qué empresa viene.
--   · dietary, dietary_notes → restricciones, como campo propio. Antes se
--                              escondían en `notes`, donde no se pueden contar.
--   · sent_at, sent_via      → cuándo y por dónde salió su enlace. Es lo que
--                              permite "enviar sólo a los que faltan".
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.guest_list
  add column if not exists email          text,
  add column if not exists phone          text,
  add column if not exists company        text,
  add column if not exists dietary        text[] not null default '{}',
  add column if not exists dietary_notes  text,
  add column if not exists sent_at        timestamptz,
  add column if not exists sent_via       text;

-- Los límites van en la base y no sólo en el formulario: el navegador manda lo
-- que quiera.
alter table public.guest_list drop constraint if exists guest_list_contacto_chk;
alter table public.guest_list add constraint guest_list_contacto_chk check (
  (email   is null or (length(email) <= 254 and email like '%_@_%'))
  and (phone   is null or length(phone) <= 30)
  and (company is null or length(company) <= 120)
  and (dietary_notes is null or length(dietary_notes) <= 300)
  and (sent_via is null or sent_via in ('mail','whatsapp'))
);

-- Un vocabulario cerrado a propósito: así "celíaco" se puede contar y no hay
-- que adivinar si escribieron "celiaco", "Celíaca" o "sin tacc". Lo que no entre
-- acá va en `dietary_notes`.
alter table public.guest_list drop constraint if exists guest_list_dietary_chk;
alter table public.guest_list add constraint guest_list_dietary_chk check (
  dietary <@ array['celiaco','vegetariano','vegano','sin_lactosa','frutos_secos','otra']::text[]
);

-- ─── Cargar invitados, ahora con contacto ────────────────────────────────────
-- Misma firma que antes: `create or replace` alcanza.
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

  insert into public.guest_list (invitation_id, name, max_companions, email, phone, company)
  select
    v_invitation,
    btrim(g->>'name'),
    least(greatest(coalesce((g->>'max_companions')::int, 0), 0), 20),
    nullif(btrim(coalesce(g->>'email','')), ''),
    nullif(btrim(coalesce(g->>'phone','')), ''),
    nullif(btrim(coalesce(g->>'company','')), '')
  from jsonb_array_elements(p_guests) g
  where length(btrim(coalesce(g->>'name',''))) > 0;

  get diagnostics v_insertados = row_count;
  return v_insertados;
end
$fn$;

-- ─── Lo que ve quien organiza ────────────────────────────────────────────────
-- Devuelve columnas nuevas: Postgres no deja cambiar el tipo de retorno con
-- `create or replace`, así que se borra y se vuelve a crear. Un `drop` también
-- se lleva los permisos; se vuelven a dar al final.
drop function if exists public.guests_by_token(uuid);

create function public.guests_by_token(p_token uuid)
returns table (id uuid, name text, max_companions integer, token text,
               status text, companions integer, notes text, responded_at timestamptz,
               slug text, invitation_status text,
               email text, phone text, company text,
               dietary text[], dietary_notes text,
               sent_at timestamptz, sent_via text)
language sql
security definer
set search_path = public
as $fn$
  select g.id, g.name, g.max_companions, g.token,
         g.status, g.companions, g.notes, g.responded_at,
         i.slug, i.status as invitation_status,
         g.email, g.phone, g.company,
         g.dietary, g.dietary_notes,
         g.sent_at, g.sent_via
  from public.guest_list g
  join public.invitations i on i.id = g.invitation_id
  where i.edit_token = p_token
  order by g.name
$fn$;

-- Marca como enviados a varios de una vez. La usa el panel cuando se manda por
-- WhatsApp (un toque por persona) y la Edge Function de mail, que además lo
-- hace con service role y no pasa por acá.
create or replace function public.mark_guests_sent(p_token uuid, p_guest_ids uuid[], p_via text)
returns integer
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_marcados integer;
begin
  if p_via not in ('mail','whatsapp') then
    raise exception 'Canal inválido' using errcode = '22023';
  end if;

  update public.guest_list g
     set sent_at = now(), sent_via = p_via
    from public.invitations i
   where i.id = g.invitation_id
     and i.edit_token = p_token
     and g.id = any(p_guest_ids);

  get diagnostics v_marcados = row_count;
  return v_marcados;
end
$fn$;

-- ─── Lo que hace el invitado ─────────────────────────────────────────────────
-- La respuesta ahora lleva las restricciones. Los dos parámetros nuevos tienen
-- valor por defecto, así que el frontend anterior (4 parámetros) sigue andando.
-- La función vieja se borra antes: dejarla convivir con la nueva haría ambiguo
-- el llamado con 4 parámetros.
drop function if exists public.guest_respond(text, boolean, integer, text);
drop function if exists public.guest_respond(text, boolean, integer, text, text[], text);

create function public.guest_respond(
  p_guest_token   text,
  p_attending     boolean,
  p_companions    integer default 0,
  p_notes         text default null,
  p_dietary       text[] default '{}',
  p_dietary_notes text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_id      uuid;
  v_max     integer;
  v_dietary text[];
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

  -- Sólo entran valores del vocabulario, sin repetidos: lo demás se descarta en
  -- lugar de hacer fallar la confirmación de un invitado por un detalle.
  select coalesce(array_agg(distinct d), '{}') into v_dietary
  from unnest(coalesce(p_dietary, '{}')) d
  where d = any (array['celiaco','vegetariano','vegano','sin_lactosa','frutos_secos','otra']);

  update public.guest_list set
    status       = case when p_attending then 'confirmado' else 'rechazado' end,
    -- Nunca más que el cupo, aunque el navegador mande otra cosa.
    companions   = case when p_attending
                        then least(greatest(coalesce(p_companions, 0), 0), v_max)
                        else 0 end,
    notes        = nullif(btrim(coalesce(p_notes, '')), ''),
    -- Quien no viene no come: no se guardan restricciones de un rechazo.
    dietary       = case when p_attending then v_dietary else '{}' end,
    dietary_notes = case when p_attending
                         then left(nullif(btrim(coalesce(p_dietary_notes, '')), ''), 300)
                         else null end,
    responded_at = now()
  where id = v_id;
end
$fn$;

-- A `authenticated` también en todas: el equipo abre estos links desde el mismo
-- navegador donde tiene la sesión del panel abierta.
revoke all on function public.add_guests(uuid, jsonb)                                            from public, anon, authenticated;
revoke all on function public.guests_by_token(uuid)                                              from public, anon, authenticated;
revoke all on function public.mark_guests_sent(uuid, uuid[], text)                               from public, anon, authenticated;
revoke all on function public.guest_respond(text, boolean, integer, text, text[], text)          from public, anon, authenticated;

grant execute on function public.add_guests(uuid, jsonb)                                         to anon, authenticated;
grant execute on function public.guests_by_token(uuid)                                           to anon, authenticated;
grant execute on function public.mark_guests_sent(uuid, uuid[], text)                            to anon, authenticated;
grant execute on function public.guest_respond(text, boolean, integer, text, text[], text)       to anon, authenticated;
