import React from 'react';

const DRESSCODE_OPTIONS = [
  { id: 'Elegante',        desc: 'Vestido largo / Traje formal' },
  { id: 'Elegante Sport',  desc: 'Formal sin corbata obligatoria' },
  { id: 'Semi Formal',     desc: 'Intermedio entre formal y casual' },
  { id: 'Casual',          desc: 'Ropa cómoda y de buen gusto' },
  { id: 'Informal',        desc: 'Sin restricciones de vestimenta' },
  { id: 'Otro',            desc: 'Personalizado — escribí abajo' },
];

export function StepExtras({ formData, handleChange }) {
  // Manejador local para evitar doble re-render y pérdida de foco
  const handleCustomChange = (e) => {
    handleChange({
      target: {
        name: 'dressCodeDescription',
        value: e.target.value,
        type: 'text'
      }
    });
  };

  const isPredefined = DRESSCODE_OPTIONS.some(opt => opt.id === formData.dressCodeDescription && opt.id !== 'Otro');
  const isCustomMode = formData.dressCodeDescription === 'Otro' || !isPredefined;

  return (
    <div className="panel-section">
      <h3>✨ Extras</h3>

      {/* ── Dress Code ── */}
      {formData.showDressCode && (
        <div className="form-group">
          <label>👗 Dress Code — Estilo</label>
          <div className="dresscode-grid">
            {DRESSCODE_OPTIONS.map(opt => (
              <div
                key={opt.id}
                className={`dresscode-option ${formData.dressCodeDescription === opt.id || (opt.id === 'Otro' && isCustomMode) ? 'selected' : ''}`}
                onClick={() => handleChange({ target: { name: 'dressCodeDescription', value: opt.id, type: 'text' } })}
              >
                <strong>{opt.id}</strong>
                <small>{opt.desc}</small>
              </div>
            ))}
          </div>

          {isCustomMode && (
            <div className="slide-in" style={{ marginTop: '12px' }}>
              <label>Descripción personalizada</label>
              <input
                type="text"
                name="dressCodeDescription"
                value={isPredefined ? '' : formData.dressCodeDescription}
                onChange={handleCustomChange}
                autoFocus={formData.dressCodeDescription === 'Otro'}
                placeholder="Ej: Black tie, Blanco y dorado…"
              />
            </div>
          )}

          {/* Toggle: indicación de color */}
          <div className="wizard-toggle-item" style={{ marginTop: '20px', background: '#fff9fb', border: '1px solid #ffe4ed' }}>
            <span className="toggle-info">🎨 Agregar indicación de color</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="showDressCodeColorNote"
                checked={!!formData.showDressCodeColorNote}
                onChange={handleChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {formData.showDressCodeColorNote && (
            <div className="slide-in">
              <input
                type="text"
                name="dressCodeColorNote"
                value={formData.dressCodeColorNote || ''}
                onChange={handleChange}
                placeholder="Ej: Reservamos el blanco para la novia"
                style={{ marginTop: '10px' }}
              />
              <small style={{ color: '#e91e63', marginLeft: '5px' }}>
                💡 En la tarjeta aparecerá como: "🎨 {formData.dressCodeColorNote || 'Reservamos el blanco para la novia'}"
              </small>
            </div>
          )}
        </div>
      )}

      {/* ── Requerimientos Dietarios ── */}
      {formData.askDiets && (
        <div className="wizard-sub-section" style={{ marginTop: '30px' }}>
          <h4>🥗 Requerimientos Dietarios</h4>
          <p className="step-description">
            Al confirmar asistencia, los invitados verán una aclaración sobre dietas especiales.
          </p>
          <div className="info-box" style={{ background: '#eafaf1', borderColor: '#2ecc71' }}>
            <p>✅ <strong>Configurado.</strong> Los invitados verán: <em>"Avisanos si tenés alguna restricción alimentaria al confirmar tu asistencia."</em></p>
          </div>
        </div>
      )}
    </div>
  );
}
