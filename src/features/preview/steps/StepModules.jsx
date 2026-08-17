import React from 'react';
import { MODULE_LABELS, MODULE_PRICES, INCLUDED_MODULES, MODULE_ORDER } from '../../../data/pricing';

export function StepModules({ formData, handleChange, totalPrice, mostrarPrecio = true }) {
  return (
    <div className="panel-section">
      <h3>🧩 Módulos de tu Invitación</h3>
      <p className="step-description">
        Activá los módulos que querés incluir. Los marcados como <em>Incluido</em> ya están en el precio base.
      </p>

      <div className="toggle-list">
        {MODULE_ORDER.map(key => {
          const mod = MODULE_LABELS[key];
          const isIncluded = INCLUDED_MODULES.includes(key);
          const price = MODULE_PRICES[key];

          return (
            <div className="wizard-toggle-item" key={key}>
              <span className="toggle-info">
                {mod.icon} {mod.label}
                {isIncluded
                  ? <span className="badge-included">Incluido</span>
                  : <span className="badge-extra">+${price?.toLocaleString('es-AR')}</span>
                }
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name={key}
                  checked={!!formData[key]}
                  onChange={handleChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          );
        })}
      </div>

      {/* En el panel interno no hay nada que cotizar: el precio ya se acordó
          por WhatsApp y lo que se está haciendo es transcribir una tarjeta
          vendida. Mostrar "$0" ahí no es un detalle feo, es información falsa
          en la pantalla donde se carga lo que el cliente pagó. */}
      {mostrarPrecio && (
        <div className="price-summary">
          <span>💰 Precio estimado:</span>
          <strong>${totalPrice?.toLocaleString('es-AR')}</strong>
        </div>
      )}
    </div>
  );
}
