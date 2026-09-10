import React, { useRef } from 'react';
import { comprimirImagen } from '../../../lib/imagen';

const MAX_PHOTOS = 4;
const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
];

export function StepGallery({ formData, setFormData }) {
  const inputRef = useRef(null);
  const photos = formData.galleryPhotos || [];
  const isUsingDemo = photos.length === 0;

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_PHOTOS - photos.length);
    const compressed = await Promise.all(files.map(f => comprimirImagen(f)));
    setFormData(prev => ({
      ...prev,
      galleryPhotos: [...(prev.galleryPhotos || []), ...compressed].slice(0, MAX_PHOTOS)
    }));
    // Reset input para poder subir el mismo archivo de nuevo
    e.target.value = '';
  };

  const handleRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      galleryPhotos: prev.galleryPhotos.filter((_, i) => i !== index)
    }));
  };

  const handleUseSamples = () => {
    setFormData(prev => ({ ...prev, galleryPhotos: [] }));
  };

  return (
    <div className="panel-section">
      <h3>📸 Galería — Sección "Nosotros"</h3>

      <div className="info-box" style={{ marginBottom: '16px', borderLeft: '4px solid #ff6b6b' }}>
        <p>
          🖼️ <strong>Modo demo:</strong> podés ver cómo queda con fotos de ejemplo, o cargar hasta <strong>4 fotos propias</strong> para esta prueba.
          Las fotos se guardan en tu navegador y se usan solo para previsualizar el diseño.
        </p>
      </div>

      {/* Grid de slots */}
      <div className="gallery-upload-grid">
        {Array.from({ length: MAX_PHOTOS }).map((_, i) => {
          const src = photos[i] || SAMPLE_PHOTOS[i];
          const isOwn = !!photos[i];
          return (
            <div key={i} className={`gallery-slot ${isOwn ? 'owned' : 'sample'}`}>
              <img src={src} alt={`Foto ${i + 1}`} />
              {isOwn && (
                <button type="button" className="gallery-remove-btn" onClick={() => handleRemove(i)} title="Quitar foto">✕</button>
              )}
              {!isOwn && <div className="gallery-sample-badge">Demo</div>}
            </div>
          );
        })}
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
        {photos.length < MAX_PHOTOS && (
          <>
            <button type="button" className="btn-wizard next" onClick={() => inputRef.current?.click()}>
              📁 Cargar fotos ({photos.length}/{MAX_PHOTOS})
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
          </>
        )}
        {photos.length > 0 && (
          <button type="button" className="btn-wizard prev" onClick={handleUseSamples}>
            🖼️ Usar fotos de ejemplo
          </button>
        )}
      </div>

      {/* El boton que va debajo de la galeria en la tarjeta. Existia en el
          disenio desde siempre y no habia donde cargar el enlace, asi que nunca
          aparecia. */}
      <div className="form-group mt-15">
        <label>Álbum compartido (opcional)</label>
        <input
          type="url"
          value={formData.sharedAlbumUrl || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, sharedAlbumUrl: e.target.value }))}
          placeholder="https://photos.app.goo.gl/..."
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.95rem' }}
        />
        <small>Un álbum de Google Fotos donde los invitados suben las fotos de la fiesta. Aparece como botón debajo de la galería.</small>
      </div>

      {isUsingDemo && (
        <small style={{ color: '#888', display: 'block', marginTop: '12px' }}>
          Actualmente se muestran las fotos de ejemplo (Demo). La tarjeta las usará hasta que subas las tuyas.
        </small>
      )}
      {!isUsingDemo && (
        <small style={{ color: '#27ae60', display: 'block', marginTop: '12px' }}>
          ✅ {photos.length} foto{photos.length !== 1 ? 's' : ''} cargada{photos.length !== 1 ? 's' : ''} — guardadas en tu navegador.
        </small>
      )}
    </div>
  );
}
