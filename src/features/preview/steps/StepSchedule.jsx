import React from 'react';
import { cronogramaATexto, parsearCronograma } from '../../../lib/schedule';

/**
 * El cronograma de la noche.
 *
 * Se carga pegando texto y no con un campo por fila: el cliente lo tiene
 * escrito en una nota del teléfono o te lo manda por WhatsApp tal cual. Pedirle
 * que lo tipee horario por horario en un formulario es la diferencia entre que
 * lo complete y que lo deje para después.
 */

export function StepSchedule({ formData, setFormData }) {
  const texto = cronogramaATexto(formData.schedule);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, schedule: parsearCronograma(e.target.value) }));
  };

  return (
    <div className="panel-section">
      <h3>🕘 Cronograma</h3>
      <p className="step-description">
        Un momento por línea, con la hora adelante. Es lo que más preguntan los invitados
        después de la dirección.
      </p>

      <div className="form-group">
        <textarea
          value={texto}
          onChange={handleChange}
          rows={6}
          placeholder={'21:00 Ceremonia\n21:20 Recepción\n22:00 Cena\n23:45 Baile'}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
      </div>

      {formData.schedule?.length > 0 && (
        <div className="info-box">
          <p>
            ✅ {formData.schedule.length}{' '}
            {formData.schedule.length === 1 ? 'momento cargado' : 'momentos cargados'}.
          </p>
        </div>
      )}
    </div>
  );
}
