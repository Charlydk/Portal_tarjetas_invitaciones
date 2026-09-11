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

export function StepConfirm({ formData, handleChange, mostrarCierre = true }) {
  // El número completo de WhatsApp se arma como: countryCode + localNumber
  // Guardamos ambos separados para la UI y los combinamos para el link final
  const countryCode = formData.whatsappCountryCode || '54';
  const localNumber = formData.whatsappLocalNumber || '';
  const localNumber2 = formData.whatsappLocalNumber2 || '';

  const set = (name, value) => handleChange({ target: { name, value, type: 'text' } });

  const handleCountryChange = (e) => {
    set('whatsappCountryCode', e.target.value);
    // Reconstruir los números completos para el link de wa.me
    set('whatsappNumber', e.target.value + localNumber);
    if (localNumber2) set('whatsappNumber2', e.target.value + localNumber2);
  };

  const handleLocalNumber2Change = (e) => {
    const num = e.target.value.replace(/\D/g, '');
    set('whatsappLocalNumber2', num);
    // Vacío borra el número completo: si no, quedaría un botón apuntando sólo
    // al código de país.
    set('whatsappNumber2', num ? countryCode + num : '');
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
          <input
            type="text"
            value={formData.whatsappName1 || ''}
            onChange={(e) => set('whatsappName1', e.target.value)}
            placeholder="¿De quién es? (opcional, ej: Yesica)"
            style={{ marginTop: '8px' }}
          />
        </div>
      )}

      {formData.showRSVP && (
        <div className="form-group">
          <label>Segundo número (opcional)</label>
          <div className="phone-input-row">
            <span className="country-code-select" style={{ display: 'grid', placeItems: 'center' }}>
              +{countryCode}
            </span>
            <input
              type="tel"
              className="phone-local-input"
              value={localNumber2}
              onChange={handleLocalNumber2Change}
              placeholder="Ej: 2615000000"
            />
          </div>
          <input
            type="text"
            value={formData.whatsappName2 || ''}
            onChange={(e) => set('whatsappName2', e.target.value)}
            placeholder="¿De quién es? (ej: Johana)"
            style={{ marginTop: '8px' }}
          />
          <small>Si cada uno tiene sus invitados, la tarjeta muestra un botón por persona, con su nombre.</small>
        </div>
      )}

      {/* El cierre celebratorio es para el cliente que arma su tarjeta. En el
          panel se esta transcribiendo el pedido de otro: ahi sobra. */}
      {mostrarCierre && (
        <div className="wizard-final-card">
          <h4>🎉 ¡Todo listo!</h4>
          <p>Revisá la vista previa a la derecha para ver cómo quedó tu invitación.</p>
        </div>
      )}
    </div>
  );
}
