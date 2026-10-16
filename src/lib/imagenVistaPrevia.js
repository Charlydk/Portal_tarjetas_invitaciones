/**
 * Qué imagen lleva la vista previa de una tarjeta entregada.
 *
 * Es el cuadrito que ve cada invitado antes de abrir el enlace, así que tiene
 * que ser de ESTA invitación y no de otra. En orden:
 *
 *   1. la portada del cliente         su propio arte
 *   2. la primera foto de la galería
 *   3. el logo de la empresa          si es una imagen que WhatsApp pueda mostrar
 *   4. la imagen neutra del diseño    `ogImage`, para los diseños cuya foto de
 *                                     vidriera lleva la marca de otra empresa
 *   5. la foto de vidriera del diseño
 *   6. la imagen de respaldo del sitio
 *
 * Vive aparte de la función de Netlify para poder probarse sin ella.
 */

// WhatsApp no dibuja un SVG en la vista previa: un logo vectorial se ignora.
const RASTER = /\.(png|jpe?g|webp)(\?.*)?$/i;

/**
 * Las fotos del cliente viven en Storage y ya son direcciones completas; las
 * del catálogo son rutas del sitio y hay que anteponerle el dominio. WhatsApp
 * descarta una imagen relativa sin decir nada, así que la diferencia importa.
 */
const absoluta = (src, sitio) => {
  if (!src) return null;
  return /^https?:\/\//.test(src) ? src : sitio + src;
};

export function imagenDeTarjeta(data, plantilla, { sitio, respaldo }) {
  const d = data || {};
  const logo = RASTER.test(d.logoUrl || '') ? d.logoUrl : null;

  return (
    absoluta(d.heroImage, sitio) ||
    absoluta(d.galleryPhotos?.[0], sitio) ||
    absoluta(logo, sitio) ||
    absoluta(plantilla?.ogImage, sitio) ||
    absoluta(plantilla?.previewImage, sitio) ||
    sitio + respaldo
  );
}
