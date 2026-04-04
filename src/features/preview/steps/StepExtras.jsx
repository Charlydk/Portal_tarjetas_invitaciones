import React from 'react';

export function StepExtras({ formData, handleChange }) {
  return (
    <div className="panel-section">
      <h3>✨ Extras</h3>

      {formData.showDressCode && (
        <div className="form-group">
          <label>👗 Dress Code — Descripción</label>
          <textarea
            name="dressCodeDescription"
            value={formData.dressCodeDescription || ''}
            onChange={handleChange}
            rows={3}
            placeholder="Ej: Formal. Colores pasteles. Por favor evitar el blanco."
          />
          <small>Tus invitados verán esta indicación en la sección Dress Code de la tarjeta.</small>
        </div>
      )}

      {formData.askDiets && (
        <div className="wizard-sub-section">
          <h4>🥗 Requerimientos Dietarios</h4>
          <p className="step-description">
            Al activar esta opción, el formulario de confirmación de asistencia incluirá una pregunta
            sobre restricciones alimentarias (celíaco, vegetariano, vegano, alergia a mariscos, etc.).
          </p>
          <div className="info-box">
            <p>✅ Pregunta dietaria activada en el formulario RSVP. Los invitados podrán indicar sus condiciones al confirmar asistencia.</p>
          </div>
        </div>
      )}
    </div>
  );
}
