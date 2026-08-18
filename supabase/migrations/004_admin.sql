-- ─────────────────────────────────────────────────────────────────────────────
-- Quién puede cargar tarjetas.
--
-- El panel lo usan dos personas. La tentación es darle permiso al rol
-- `authenticated` y listo, pero eso significa "cualquiera que se registre", y
-- en Supabase registrarse es un formulario público: alguien se crea una cuenta
-- y edita las tarjetas de los clientes.
--
-- Por eso el permiso no lo da estar registrado, lo da estar en una lista. La
-- lista vive acá, no en la configuración del panel, así que se puede auditar
-- con una consulta y no depende de que nadie se acuerde de dejar una casilla
-- destildada.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.admin_emails (
  email      text primary key,
  nota       text,
  created_at timestamptz not null default now()
);

-- Sin policies: nadie la lee ni la escribe desde la aplicación. Se administra
-- desde el panel de Supabase, y la función de abajo la consulta por su cuenta.
alter table public.admin_emails enable row level security;
revoke all on public.admin_emails from anon, authenticated;

/**
 * ¿Quien está pidiendo esto es del equipo?
 *
 * `security definer` porque tiene que leer la lista, y la lista no la puede
 * leer nadie. Devuelve un booleano sobre quien pregunta y nada más: no hay
 * forma de usarla para averiguar quiénes son los demás.
 *
 * Pregunta de dos maneras a propósito. Las políticas no las evalúa un solo
 * servicio: las tablas pasan por PostgREST y los archivos por Storage, que son
 * procesos distintos y no exponen los mismos datos del token. Buscar sólo por
 * correo hacía que la lista de tarjetas funcionara y la subida de fotos fuera
 * rechazada, que es un síntoma desconcertante. Con el identificador del usuario
 * como segundo camino, la respuesta no depende de por dónde entró el pedido.
 */
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
  or exists (
    select 1
    from auth.users u
    join public.admin_emails a on a.email = lower(u.email)
    where u.id = auth.uid()
  )
$$;

revoke all on function public.is_admin() from public, anon, authenticated;

-- `supabase_storage_admin` también, y esto costó encontrarlo. Las políticas de
-- los archivos las evalúa el servicio de Storage con su propio usuario, no con
-- el de la aplicación. Sin este permiso, la lista de tarjetas funcionaba y la
-- subida de una foto era rechazada con "new row violates row-level security
-- policy", que apunta a la política y no a lo que realmente falta.
grant execute on function public.is_admin() to authenticated, supabase_storage_admin;


-- ─── Las tarjetas, desde el panel ────────────────────────────────────────────
-- El equipo ve y edita todas, en cualquier estado. Un invitado sigue viendo
-- solo las publicadas: esa política ya existe y no se toca.
--
-- No hay policy de DELETE a propósito. Una tarjeta pagada no se borra de un
-- clic por error; se pasa a 'archivada', que la saca de circulación y la deja
-- recuperable.

drop policy if exists "el equipo ve todas"      on public.invitations;
drop policy if exists "el equipo carga"         on public.invitations;
drop policy if exists "el equipo corrige"       on public.invitations;

create policy "el equipo ve todas"
  on public.invitations for select to authenticated using (public.is_admin());

create policy "el equipo carga"
  on public.invitations for insert to authenticated with check (public.is_admin());

create policy "el equipo corrige"
  on public.invitations for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

grant select, insert, update on public.invitations to authenticated;


-- ─── Los leads, desde el panel ───────────────────────────────────────────────
-- Solo lectura: son la bandeja de entrada. Se leen para convertir uno en
-- tarjeta, nunca para editarlos — un lead es lo que el cliente dijo, y eso no
-- se corrige después.

drop policy if exists "el equipo lee los leads" on public.invitation_leads;
create policy "el equipo lee los leads"
  on public.invitation_leads for select to authenticated using (public.is_admin());

grant select on public.invitation_leads to authenticated;


-- ─── Las fotos, desde el panel ───────────────────────────────────────────────
-- Hasta ahora el bucket `tarjetas` no aceptaba escrituras de nadie y las fotos
-- se subían a mano desde el panel de Supabase. Ahora las sube el equipo desde
-- su propia pantalla.
--
-- La lectura sigue sin policy porque el bucket es público: la abre un invitado
-- que no tiene cuenta.

drop policy if exists "el equipo sube fotos"    on storage.objects;
drop policy if exists "el equipo reemplaza fotos" on storage.objects;
drop policy if exists "el equipo borra fotos"   on storage.objects;

create policy "el equipo sube fotos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'tarjetas' and public.is_admin());

create policy "el equipo reemplaza fotos"
  on storage.objects for update to authenticated
  using (bucket_id = 'tarjetas' and public.is_admin());

create policy "el equipo borra fotos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'tarjetas' and public.is_admin());


-- ─── La lista ────────────────────────────────────────────────────────────────
-- Se completa con las direcciones de las dos cuentas del panel. Sacar a alguien
-- del equipo es borrar su fila: no hay que tocar código ni volver a publicar.
--
--   insert into admin_emails (email, nota) values
--     ('vos@ejemplo.com',   'Charly'),
--     ('ella@ejemplo.com',  'Novia')
--   on conflict (email) do nothing;
