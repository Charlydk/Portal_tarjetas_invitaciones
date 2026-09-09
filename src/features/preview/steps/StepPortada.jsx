import React, { useRef } from 'react';
import { comprimirImagen } from '../../../lib/imagen';

/**
 * La foto de portada: lo primero que ve un invitado.
 *
 * Existe porque la tarjeta siempre supo mostrarla (`data.heroImage`) pero no
 * había dónde cargarla — trabajo hecho que no se usaba. Y en los diseños sin
 * fondo propio no es un adorno: sin portada, el encabezado queda vacío.
 *
 * Se comprime a 1400px, casi el doble que las de la galería: esta ocupa la
 * pantalla entera y a 800px se ve borrosa en un teléfono de hoy.
 */
export function StepPortada({ formData, setFormData }) {
  const inputRef = useRef(null);

  async function elegir(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await comprimirImagen(file, 1400, 0.82);
    setFormData((prev) => ({ ...prev, heroImage: dataUrl }));
    e.target.value = '';
  }

  return (
    <div className="panel-section">
      <h3>🖼️ Portada</h3>
      <p className="step-description">
        La foto grande del encabezado, detrás de los nombres. Conviene una donde
        haya aire arriba y abajo: el texto va encima.
      </p>

      <input ref={inputRef} type="file" accept="image/*" hidden onChange={elegir} />

      {formData.heroImage ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <img
            src={formData.heroImage}
            alt="Portada elegida"
            style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn-wizard next" onClick={() => inputRef.current?.click()}>
              Cambiar
            </button>
            <button
              type="button"
              className="btn-wizard prev"
              onClick={() => setFormData((prev) => ({ ...prev, heroImage: '' }))}
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="btn-wizard next" onClick={() => inputRef.current?.click()}>
          📁 Elegir foto de portada
        </button>
      )}
    </div>
  );
}
