-- ─────────────────────────────────────────────────────────────────────────────
-- Cómo se carga la tarjeta de un cliente.
--
-- Se corre en Supabase → SQL Editor. Son las cuatro consultas que hacen falta
-- para pasar de "el cliente me mandó los datos" a "el link ya se puede repartir".
--
-- El orden siempre es el mismo:
--   1. crear la fila como borrador   (A si usó el editor, B si te mandó los datos sueltos)
--   2. mandarle el link de borrador  para que la revise
--   3. publicar                      cuando la aprueba
-- ─────────────────────────────────────────────────────────────────────────────


-- ─── A. El cliente usó el editor ─────────────────────────────────────────────
-- Entonces ya está todo cargado: el lead guarda el formulario completo. No hay
-- que tipear nada, se copia de una tabla a la otra.
--
-- Buscá el lead primero, para saber cuál es:
--
--   select id, created_at, protagonist_names, whatsapp_number, template_name
--   from invitation_leads order by created_at desc limit 10;
--
-- Y después, con ese id:

insert into invitations (slug, model_id, variant_id, status, client_name, client_whatsapp, data)
select
  'valentina-y-maxi',                       -- ← el slug: va en la URL, tiene que ser único
  l.model_id,
  l.variant_id,
  'borrador',
  l.protagonist_names,
  l.whatsapp_number,
  -- Las fotos NO se copian. Ver la nota del final: en el lead viajan como texto
  -- base64 y adentro de la tarjeta pesarían en cada apertura.
  jsonb_set(l.form_data, '{galleryPhotos}', '[]'::jsonb)
from invitation_leads l
where l.id = 'PEGAR-EL-ID-DEL-LEAD';


-- ─── B. El cliente te mandó los datos por WhatsApp ───────────────────────────
-- Armás el JSON a mano. Los nombres de los campos tienen que ser EXACTOS: si le
-- errás a uno, esa sección sale vacía y no avisa nada.
--
-- Todo campo que no pongas toma su valor por defecto, así que sacá sin culpa lo
-- que no aplique. Lo que manda qué secciones se ven son los `show*` del final.

insert into invitations (slug, model_id, variant_id, status, client_name, client_whatsapp, data)
values (
  'valentina-y-maxi',
  'allegories',
  'boda-caricatura',                        -- ← id de la variante, de src/data/models.js
  'borrador',
  'Valentina Perez',
  '5491100000000',
  jsonb_build_object(
    -- Los protagonistas y el encabezado
    'name1',            'Valentina',
    'name2',            'Maximiliano',       -- vacío en un cumpleaños o unos 15
    'welcomePhrase',    'Nos Casamos',
    'invitePhrase',     'Junto a sus familias, tienen el honor de invitarte a celebrar su matrimonio',
    -- Alimenta la cuenta regresiva. Formato datetime-local: 'AAAA-MM-DDTHH:MM'
    'eventDate',        '2026-11-14T21:00',

    -- Ceremonia civil
    'civilDate',        '14 de Noviembre de 2026',
    'civilTime',        '17:00 hs',
    'civilPlace',       'Registro Civil de Las Heras',
    'civilAddress',     'Las Heras 2344, CABA',
    'civilMapUrl',      'https://maps.google.com/...',
    'civilMapUnknown',  false,               -- true esconde el botón de "Cómo llegar"

    -- Ceremonia religiosa
    'ceremonyDate',     '14 de Noviembre de 2026',
    'ceremonyTime',     '19:00 hs',
    'ceremonyPlace',    'Parroquia San Francisco de Asís',
    'ceremonyAddress',  'Viamonte 1480, CABA',
    'ceremonyMapUrl',   'https://maps.google.com/...',
    'ceremonyMapUnknown', false,

    -- La fiesta
    'partyDateString',  '14 de Noviembre de 2026',
    'partyTime',        '21:00 hs',
    'partyPlace',       'Salón Gran Palazzo',
    'eventVenue',       'Salón Gran Palazzo',
    'partyAddress',     'Av. del Libertador 4500, Buenos Aires',
    'partyMapUrl',      'https://maps.google.com/...',
    'partyMapUnknown',  false,

    -- Regalos
    'giftMode',         'alias',             -- 'alias' o 'cbu'
    'alias',            'valentina.maxi',
    'bankCbu',          '',

    -- A dónde confirman los invitados
    'whatsappNumber',   '5491100000000',

    'dressCodeDescription', 'Formal · Tonos neutros y pasteles',
    'dressCodeColorNote',   '',
    'musicPlaylistUrl',     'https://open.spotify.com/...',

    -- URLs de Storage, NO fotos pegadas. Ver la nota del final.
    'galleryPhotos',    jsonb_build_array(
                          'https://mxzoofpyrqananmqzhbk.supabase.co/storage/v1/object/public/tarjetas/valentina-y-maxi/1.webp',
                          'https://mxzoofpyrqananmqzhbk.supabase.co/storage/v1/object/public/tarjetas/valentina-y-maxi/2.webp'
                        ),

    -- Qué secciones se ven. Es lo que el cliente pagó.
    'showCivil',     true,
    'showCeremony',  true,
    'showParty',     true,
    'showCountdown', true,
    'showDressCode', true,
    'showGifts',     true,
    'showGallery',   true,
    'showMusic',     false,
    'showRSVP',      true,
    'askDiets',      false
  )
);


-- ─── 2. El link para que la revise ───────────────────────────────────────────
-- Se lo mandás por WhatsApp. No necesita cuenta ni clave: el token es la llave,
-- y sólo abre esa tarjeta.

select
  'https://fxestudio.com.ar/borrador/' || edit_token as link_para_revisar,
  'https://fxestudio.com.ar/i/'        || slug       as link_final
from invitations
where slug = 'valentina-y-maxi';


-- ─── 3. Publicar ─────────────────────────────────────────────────────────────
-- Hasta acá la tarjeta no se ve por /i/:slug aunque alguien adivine el slug: la
-- política de la base sólo deja salir las publicadas. Esto es lo que la abre.

update invitations
set status = 'publicada',
    published_at = now()
where slug = 'valentina-y-maxi';


-- Y para el negocio de renovación, cuando lo quieras: al vencer, la tarjeta deja
-- de verse sola. No hay que acordarse de nada.
--
--   update invitations set expires_at = now() + interval '6 months'
--   where slug = 'valentina-y-maxi';


-- ─── 4. Ver cómo viene todo ──────────────────────────────────────────────────

select slug, client_name, status, variant_id, published_at, expires_at
from invitations
order by created_at desc;


-- ─────────────────────────────────────────────────────────────────────────────
-- NOTA SOBRE LAS FOTOS — leer una vez y no olvidar
--
-- El editor guarda las fotos de la galería como texto base64 adentro del mismo
-- formulario: hasta cuatro, de 800px, que sumadas dan entre 300 y 600 KB.
--
-- Eso está bien para un borrador que vive en el navegador del cliente, pero
-- adentro de la tarjeta entregada es un problema: ese texto viaja en la misma
-- consulta que trae los datos, ANTES de que se dibuje nada, cada vez que un
-- invitado abre el link. No se cachea aparte, no se puede cargar de a poco, y
-- ocupa un tercio más que la imagen original.
--
-- Por eso las fotos del cliente van como archivos y en el JSON van sus URLs.
--
-- Y van a Supabase Storage, NO a public/ del repo. Esa carpeta se publica con
-- el sitio, así que cada cliente con galería obligaría a commitear y
-- redeployar: justo lo que dejamos atrás al convertir la tarjeta en una fila.
-- En Storage se sube el archivo y ya está disponible, sin tocar el código.
--
-- El paso a paso, antes de correr el insert:
--
--   1. Optimizar cada foto:
--        ffmpeg -i original.jpg -vf "scale=1000:-2:flags=lanczos" -quality 82 1.webp
--   2. Panel de Supabase → Storage → bucket `tarjetas` → carpeta con el slug de
--      la tarjeta → subir los archivos.
--   3. Copiar la URL pública de cada una y pegarla en `galleryPhotos`. Tienen
--      esta forma:
--        https://<proyecto>.supabase.co/storage/v1/object/public/tarjetas/<slug>/1.webp
--
-- Una carpeta por tarjeta, para que dar de baja una sea borrar una carpeta.
-- ─────────────────────────────────────────────────────────────────────────────
