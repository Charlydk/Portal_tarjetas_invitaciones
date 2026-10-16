-- ─────────────────────────────────────────────────────────────────────────────
-- El invitado ve lo que ya contestó.
--
-- Sin esto, quien abre su enlace para "cambiar mi respuesta" (por ejemplo, para
-- sumar un acompañante) ve las restricciones vacías y, al reenviar, borra sin
-- darse cuenta lo que había marcado. Devuelve sus propias restricciones: nada
-- de los demás.
--
-- Cambia el tipo de retorno, así que se borra y se vuelve a crear. El `drop`
-- también se lleva los permisos; se vuelven a dar al final.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

drop function if exists public.guest_by_token(text);

create function public.guest_by_token(p_guest_token text)
returns table (name text, max_companions integer, status text, companions integer, slug text,
               dietary text[], dietary_notes text)
language sql
security definer
set search_path = public
as $fn$
  select g.name, g.max_companions, g.status, g.companions, i.slug,
         g.dietary, g.dietary_notes
  from public.guest_list g
  join public.invitations i on i.id = g.invitation_id
  where g.token = p_guest_token
    and i.status = 'publicada'
    and (i.expires_at is null or i.expires_at > now())
$fn$;

revoke all on function public.guest_by_token(text) from public, anon, authenticated;
grant execute on function public.guest_by_token(text) to anon, authenticated;
