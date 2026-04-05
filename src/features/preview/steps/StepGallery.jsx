import React, { useRef } from 'react';

const MAX_PHOTOS = 4;
const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?w=400&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
];

// Comprime la imagen a base64 usando canvas
function compressImage(file, maxWidth = 800, quality = 0.75) {
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

export function StepGallery({ formData, setFormData }) {
  const inputRef = useRef(null);
  const photos = formData.galleryPhotos || [];
  const isUsingDemo = photos.length === 0;

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_PHOTOS - photos.length);
    const compressed = await Promise.all(files.map(f => compressImage(f)));
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
                <button className="gallery-remove-btn" onClick={() => handleRemove(i)} title="Quitar foto">✕</button>
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
            <button className="btn-wizard next" onClick={() => inputRef.current?.click()}>
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
          <button className="btn-wizard prev" onClick={handleUseSamples}>
            🖼️ Usar fotos de ejemplo
          </button>
        )}
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
