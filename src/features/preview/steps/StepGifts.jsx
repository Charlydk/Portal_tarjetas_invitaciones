import React from 'react';

const GIFT_MODES = [
  { id: 'cbu',   icon: '🏦', label: 'CBU / Alias',         desc: 'Transferencia bancaria digital' },
  { id: 'cofre', icon: '📦', label: 'Cofre de Sobres',     desc: 'Sin pagos digitales, sobre en el evento' },
  { id: 'both',  icon: '🎁', label: 'Ambas opciones',      desc: 'Transferencia y sobre físico' },
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
            <div className="variant-color-preview gift-icon-preview">{mode.icon}</div>
            <span>{mode.label}</span>
            <small>{mode.desc}</small>
          </div>
        ))}
      </div>

      {(formData.giftMode === 'cbu' || formData.giftMode === 'both') && (
        <div className="form-group mt-15">
          <label>CBU / CVU (opcional)</label>
          <input
            type="text"
            name="bankCbu"
            value={formData.bankCbu || ''}
            onChange={handleChange}
            placeholder="Ej: 0000003100009496507226"
          />
          <label style={{ marginTop: '10px' }}>Alias Bancario</label>
          <input
            type="text"
            name="alias"
            value={formData.alias || ''}
            onChange={handleChange}
            placeholder="Ej: nombre.apellido.mp"
          />
          <small>Los invitados podrán enviar su regalo por transferencia.</small>
        </div>
      )}

      {formData.giftMode === 'cofre' && (
        <div className="info-box">
          <p>🎉 Tu tarjeta mostrará el ícono de cofre físico, sin datos de transferencia.</p>
        </div>
      )}
      {formData.giftMode === 'both' && (
        <div className="info-box">
          <p>✨ Tu tarjeta mostrará tanto el cofre como los datos de transferencia.</p>
        </div>
      )}
    </div>
  );
}
