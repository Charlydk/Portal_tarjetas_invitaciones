import React from 'react';

// ─── Utilidades para convertir entre datetime-local y los campos de texto ────
function toDateTimeLocal(dateStr, timeStr) {
  // Si ya tenemos formato datetime-local retornarlo directo
  if (dateStr && dateStr.includes('T')) return dateStr;
  if (!dateStr) return '';
  // Intentar reconstruir "15/11/2025" + "22:00" → "2025-11-15T22:00"
  if (dateStr.includes('/')) {
    const [d, m, y] = dateStr.split('/');
    const time = timeStr ? timeStr.replace(' HS', '').trim() : '00:00';
    return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}T${time}`;
  }
  return '';
}

function formatDateDisplay(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTimeDisplay(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' HS';
}

// ─── Sub-componente para input de fecha/hora ──────────────────────────────
function DateTimePicker({ label, datetimeName, dateName, timeName, value, handleChange }) {
  const handleDateTimeChange = (e) => {
    const isoValue = e.target.value;
    // Actualizar el campo datetime (para el picker)
    handleChange({ target: { name: datetimeName, value: isoValue, type: 'text' } });
    // Derivan los campos de texto para el visualizador de la tarjeta
    handleChange({ target: { name: dateName,     value: formatDateDisplay(isoValue), type: 'text' } });
    handleChange({ target: { name: timeName,     value: formatTimeDisplay(isoValue), type: 'text' } });
  };

  return (
    <div className="form-group">
      <label>📅 {label}</label>
      <input
        type="datetime-local"
        value={value || ''}
        onChange={handleDateTimeChange}
      />
    </div>
  );
}

// ─── Sub-componente para link de mapa ─────────────────────────────────────
function MapLinkInput({ urlName, unknownName, urlValue, unknownValue, handleChange, placeholder }) {
  const handleUnknownToggle = (e) => {
    const isUnknown = e.target.checked;
    handleChange({ target: { name: unknownName, value: isUnknown, type: 'checkbox', checked: isUnknown } });
    if (isUnknown) {
      handleChange({ target: { name: urlName, value: '', type: 'text' } });
    }
  };

  return (
    <div className="form-group">
      <label>Link Google Maps</label>
      <input
        type="text"
        name={urlName}
        value={urlValue || ''}
        onChange={handleChange}
        disabled={!!unknownValue}
        placeholder={unknownValue ? 'Nuestro equipo lo completará luego...' : placeholder}
      />
      <label className="checkbox-inline">
        <input
          type="checkbox"
          checked={!!unknownValue}
          onChange={handleUnknownToggle}
        />
        <span>No sé el link aún (lo completamos nosotros)</span>
      </label>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export function StepVenue({ formData, handleChange }) {
  return (
    <div className="panel-section">
      <h3>📍 ¿Cuándo y Dónde?</h3>

      {formData.showCivil && (
        <div className="wizard-sub-section">
          <h4>🏛️ Ceremonia Civil</h4>
          <div className="form-group">
            <label>Lugar</label>
            <input type="text" name="civilPlace" value={formData.civilPlace || ''} onChange={handleChange} placeholder="Ej: Registro Civil Luján" />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" name="civilAddress" value={formData.civilAddress || ''} onChange={handleChange} placeholder="Ej: Sgto. Cabral 261" />
          </div>
          <DateTimePicker
            label="Fecha y Hora de la Ceremonia Civil"
            datetimeName="civilDateTime"
            dateName="civilDate"
            timeName="civilTime"
            value={formData.civilDateTime || toDateTimeLocal(formData.civilDate, formData.civilTime)}
            handleChange={handleChange}
          />
          <MapLinkInput
            urlName="civilMapUrl"
            unknownName="civilMapUnknown"
            urlValue={formData.civilMapUrl}
            unknownValue={formData.civilMapUnknown}
            handleChange={handleChange}
            placeholder="https://maps.google.com/..."
          />
        </div>
      )}

      {formData.showCeremony && (
        <div className="wizard-sub-section">
          <h4>⛪ Ceremonia Religiosa</h4>
          <div className="form-group">
            <label>Lugar</label>
            <input type="text" name="ceremonyPlace" value={formData.ceremonyPlace || ''} onChange={handleChange} placeholder="Ej: Parroquia San Marcos" />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" name="ceremonyAddress" value={formData.ceremonyAddress || ''} onChange={handleChange} placeholder="Ej: Avenida Principal 123" />
          </div>
          <DateTimePicker
            label="Fecha y Hora de la Ceremonia"
            datetimeName="ceremonyDateTime"
            dateName="ceremonyDate"
            timeName="ceremonyTime"
            value={formData.ceremonyDateTime || toDateTimeLocal(formData.ceremonyDate, formData.ceremonyTime)}
            handleChange={handleChange}
          />
          <MapLinkInput
            urlName="ceremonyMapUrl"
            unknownName="ceremonyMapUnknown"
            urlValue={formData.ceremonyMapUrl}
            unknownValue={formData.ceremonyMapUnknown}
            handleChange={handleChange}
            placeholder="https://maps.google.com/..."
          />
        </div>
      )}

      {formData.showParty && (
        <div className="wizard-sub-section">
          <h4>🥂 Fiesta / Evento</h4>
          <div className="form-group">
            <label>Lugar</label>
            <input type="text" name="partyPlace" value={formData.partyPlace || ''} onChange={handleChange} placeholder="Ej: Salón La Soñada" />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input type="text" name="partyAddress" value={formData.partyAddress || ''} onChange={handleChange} placeholder="Ej: Calle Fiesta 456" />
          </div>
          <DateTimePicker
            label="Fecha y Hora de la Fiesta"
            datetimeName="partyDateTime"
            dateName="partyDateString"
            timeName="partyTime"
            value={formData.partyDateTime || toDateTimeLocal(formData.partyDateString, formData.partyTime)}
            handleChange={handleChange}
          />
          <MapLinkInput
            urlName="partyMapUrl"
            unknownName="partyMapUnknown"
            urlValue={formData.partyMapUrl}
            unknownValue={formData.partyMapUnknown}
            handleChange={handleChange}
            placeholder="https://maps.google.com/..."
          />
        </div>
      )}

      {!formData.showCeremony && !formData.showParty && !formData.showCivil && (
        <div className="info-box">
          <p>ℹ️ Activá al menos un módulo (Civil, Ceremonia o Fiesta) en el paso anterior para completar las ubicaciones.</p>
        </div>
      )}
    </div>
  );
}
