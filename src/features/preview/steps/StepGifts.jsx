import React from 'react';

const GIFT_MODES = [
  { id: 'cbu',   icon: '🏦', label: 'CBU / Alias',          desc: 'Transferencia bancaria digital' },
  { id: 'cofre', icon: '📦', label: 'Cofre / Sobre Físico',  desc: 'Sin pagos digitales, sobre en el evento' },
  { id: 'both',  icon: '🎁', label: 'Ambas opciones',        desc: 'Ofrecés transferencia y sobre físico' },
];

export function StepGifts({ formData, handleChange }) {
  return (
    <div className="panel-section">
      <h3>🎁 Regalos: ¿Cómo querés recibirlos?</h3>

      <div className="variants-grid">
        {GIFT_MODES.map(mode => (
          <div
            key={mode.id}
            className={`variant-card ${formData.giftMode === mode.id ? 'selected' : ''}`}
            onClick={() => handleChange({ target: { name: 'giftMode', value: mode.id, type: 'text' } })}
          >
            <div className="variant-color-preview gift-icon-preview">
              {mode.icon}
            </div>
            <span>{mode.label}</span>
            <small>{mode.desc}</small>
          </div>
        ))}
      </div>

      {(formData.giftMode === 'cbu' || formData.giftMode === 'both') && (
        <div className="form-group mt-15">
          <label>Alias Bancario / CBU</label>
          <input
            type="text"
            name="alias"
            value={formData.alias || ''}
            onChange={handleChange}
            placeholder="Ej: nombre.apellido.mp"
          />
          <small>Los invitados podrán enviar un regalo por transferencia.</small>
        </div>
      )}

      {formData.giftMode === 'cofre' && (
        <div className="info-box">
          <p>🎉 Perfecto. Tu tarjeta mostrará el ícono de cofre físico, sin datos de transferencia.</p>
        </div>
      )}

      {formData.giftMode === 'both' && (
        <div className="info-box">
          <p>✨ Excelente. Tu tarjeta mostrará tanto el ícono de cofre como los datos de transferencia.</p>
        </div>
      )}
    </div>
  );
}
