-- ─────────────────────────────────────────────────────────────────────────────
-- Dónde viven las fotos de un cliente.
--
-- No en `public/`: esa carpeta es parte del repo, así que cada cliente con
-- galería obligaría a commitear y redeployar — exactamente el problema del que
-- salimos al convertir la tarjeta en una fila. Acá se sube un archivo y ya está
-- disponible, sin tocar el código.
--
-- Convención de rutas: <slug-de-la-tarjeta>/1.webp, para que borrar una tarjeta
-- sea borrar una carpeta.
--
-- Correr en Supabase → SQL Editor. Es idempotente: se puede volver a correr.
-- ─────────────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'tarjetas',
  'tarjetas',
  -- Público: las abre un invitado que no tiene cuenta. Lo único que se guarda
  -- acá son fotos que el cliente eligió mostrarle a todos sus invitados.
  true,
  -- 3 MB. Una foto de galería optimizada pesa entre 80 y 300 KB; el límite está
  -- para que una foto sin optimizar rebote en vez de terminar en una tarjeta.
  3145728,
  array['image/webp','image/jpeg','image/png']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- No se crea ninguna policy de escritura a propósito: sin policies, `storage
-- .objects` no acepta escrituras de anon ni de usuarios registrados. Las fotos
-- las subimos nosotros desde el panel, que usa la service role. La lectura no
-- necesita policy porque el bucket es público.
