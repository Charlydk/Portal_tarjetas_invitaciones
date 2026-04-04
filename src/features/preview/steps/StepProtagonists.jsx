import React from 'react';

export function StepProtagonists({ formData, handleChange }) {
  return (
    <div className="panel-section">
      <h3>🎉 Protagonistas</h3>

      <div className="form-group">
        <label>Nombre 1 (Homenajeada/o o Novia) *</label>
        <input
          type="text"
          name="name1"
          value={formData.name1}
          onChange={handleChange}
          placeholder="Ej: Zoe"
          className={!formData.name1 ? 'input-error' : ''}
        />
        {!formData.name1 && <small className="error-text">Este campo es obligatorio.</small>}
      </div>

      <div className="form-group">
        <label>Nombre 2 (Novio o Segundo Homenajeado)</label>
        <input
          type="text"
          name="name2"
          value={formData.name2 || ''}
          onChange={handleChange}
          placeholder="Ej: Lucas (opcional)"
        />
        <small>Aparecerá junto al Nombre 1 en todas las secciones de la tarjeta.</small>
      </div>

      <div className="form-group">
        <label>Frase de Bienvenida</label>
        <input
          type="text"
          name="welcomePhrase"
          value={formData.welcomePhrase || ''}
          onChange={handleChange}
          placeholder="Ej: ¡Estás invitado!"
        />
      </div>

      <div className="form-group">
        <label>Frase personalizada de la tarjeta</label>
        <textarea
          name="invitePhrase"
          value={formData.invitePhrase || ''}
          onChange={handleChange}
          rows={3}
          placeholder="Con cariño te invito a compartir este día tan especial"
        />
        <small>Este texto aparece en el cuerpo de la invitación.</small>
      </div>

      <div className="form-group">
        <label>Fecha del Evento (Para el contador) *</label>
        <input
          type="datetime-local"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className={!formData.eventDate ? 'input-error' : ''}
        />
        {!formData.eventDate && <small className="error-text">La fecha es necesaria para el contador.</small>}
      </div>
    </div>
  );
}
