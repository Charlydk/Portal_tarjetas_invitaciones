/**
 * Achicar una foto antes de subirla.
 *
 * Vive acá porque la usan el paso de galería y el de portada. La portada se
 * comprime más grande: es lo primero que se ve, ocupa la pantalla entera, y a
 * 800px se nota borrosa en un teléfono moderno.
 */
export function comprimirImagen(file, maxWidth = 800, quality = 0.75) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
