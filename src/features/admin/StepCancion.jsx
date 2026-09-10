import React, { useRef, useState } from 'react';
import { uploadAudio } from '../../lib/adminService';

/**
 * La canción de fondo de ESTA tarjeta.
 *
 * Vive en el panel y no en el asistente público por una razón concreta: el
 * asistente autoguarda el formulario en el navegador, y un mp3 convertido a
 * texto ocupa varios megas — reventaría ese guardado. Acá el archivo se sube
 * derecho al bucket y en la tarjeta queda sólo la dirección.
 *
 * Antes la música vivía en el diseño, así que una canción por cliente costaba
 * un commit y un deploy. Ahora es un campo más de la fila.
 */
export function StepCancion({ formData, setFormData, slug }) {
  const inputRef = useRef(null);
  const [estado, setEstado] = useState('');

  async function elegir(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    if (!slug) {
      setEstado('Poné primero la dirección de la tarjeta: la canción se guarda en su carpeta.');
      return;
    }

    setEstado('Subiendo…');
    try {
      const url = await uploadAudio(slug, file);
      setFormData((prev) => ({ ...prev, audio: url }));
      setEstado('');
    } catch (err) {
      setEstado(`No pudimos subirla: ${err?.message || 'error desconocido'}`);
    }
  }

  return (
    <div className="panel-section">
      <h3>🎵 Canción</h3>
      <p className="step-description">
        Suena cuando el invitado elige entrar con música. Un mp3; si pesa mucho,
        conviene recortarlo antes — nadie escucha más de un minuto.
      </p>

      <input ref={inputRef} type="file" accept="audio/mpeg,audio/mp3" hidden onChange={elegir} />

      {formData.audio ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <audio src={formData.audio} controls style={{ width: '100%' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="btn-wizard next" onClick={() => inputRef.current?.click()}>
              Cambiar
            </button>
            <button
              type="button"
              className="btn-wizard prev"
              onClick={() => setFormData((prev) => ({ ...prev, audio: '' }))}
            >
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="btn-wizard next" onClick={() => inputRef.current?.click()}>
          🎵 Subir canción
        </button>
      )}

      {estado && <p className="step-description" style={{ marginTop: '10px' }}>{estado}</p>}
    </div>
  );
}
