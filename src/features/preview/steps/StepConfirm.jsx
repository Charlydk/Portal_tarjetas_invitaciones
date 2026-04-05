import React from 'react';

const COUNTRY_CODES = [
  { code: '54',  flag: '🇦🇷', name: 'Argentina' },
  { code: '55',  flag: '🇧🇷', name: 'Brasil' },
  { code: '598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '56',  flag: '🇨🇱', name: 'Chile' },
  { code: '51',  flag: '🇵🇪', name: 'Perú' },
  { code: '57',  flag: '🇨🇴', name: 'Colombia' },
  { code: '58',  flag: '🇻🇪', name: 'Venezuela' },
  { code: '593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '34',  flag: '🇪🇸', name: 'España' },
  { code: '1',   flag: '🇺🇸', name: 'EEUU / Canadá' },
  { code: '52',  flag: '🇲🇽', name: 'México' },
];

export function StepConfirm({ formData, handleChange }) {
  // El número completo de WhatsApp se arma como: countryCode + localNumber
  // Guardamos ambos separados para la UI y los combinamos para el link final
  const countryCode = formData.whatsappCountryCode || '54';
  const localNumber = formData.whatsappLocalNumber || '';

  const handleCountryChange = (e) => {
    handleChange({ target: { name: 'whatsappCountryCode', value: e.target.value, type: 'text' } });
    // Reconstruir el whatsappNumber completo para el link de wa.me
    handleChange({ target: { name: 'whatsappNumber', value: e.target.value + localNumber, type: 'text' } });
  };

  const handleLocalNumberChange = (e) => {
    const num = e.target.value.replace(/\D/g, ''); // solo dígitos
    handleChange({ target: { name: 'whatsappLocalNumber', value: num, type: 'text' } });
    // Reconstruir número completo
    handleChange({ target: { name: 'whatsappNumber', value: countryCode + num, type: 'text' } });
  };

  return (
    <div className="panel-section">
      <h3>✅ Confirmación y Contacto</h3>

      {formData.showRSVP && (
        <div className="form-group">
          <label>WhatsApp para recibir confirmaciones</label>
          <div className="phone-input-row">
            <select
              className="country-code-select"
              value={countryCode}
              onChange={handleCountryChange}
            >
              {COUNTRY_CODES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} +{c.code} {c.name}
                </option>
              ))}
            </select>
            <input
              type="tel"
              className="phone-local-input"
              value={localNumber}
              onChange={handleLocalNumberChange}
              placeholder="Ej: 3810000000"
            />
          </div>
          <small>
            Número completo para WhatsApp: <strong>+{countryCode}{localNumber || '...'}</strong>
          </small>
        </div>
      )}

      {formData.showMusic && (
        <div className="form-group">
          <label>🎵 Link de Playlist (Spotify / YouTube)</label>
          <input
            type="text"
            name="musicUrl"
            value={formData.musicUrl || ''}
            onChange={handleChange}
            placeholder="https://open.spotify.com/..."
          />
          <small>Link para que tus invitados sugieran música para el evento.</small>
        </div>
      )}

      <div className="wizard-final-card">
        <h4>🎉 ¡Todo listo!</h4>
        <p>Revisá la vista previa a la derecha para ver cómo quedó tu invitación.</p>
      </div>
    </div>
  );
}
