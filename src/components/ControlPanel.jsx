import React from 'react';
import './ControlPanel.css';

function ControlPanel({ formData, setFormData }) {
  
  // Función genérica para manejar cambios en cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="control-panel">
      
      {/* SECCIÓN: DATOS GENERALES */}
      <div className="panel-section">
        <h3>🎉 Datos Generales</h3>
        <div className="form-group">
          <label>Nombre Homenajeada/o</label>
          <input type="text" name="name1" value={formData.name1} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fecha y Hora del Evento (Para Cuenta Regresiva)</label>
          <input type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} />
        </div>
      </div>

      {/* SECCIÓN: CEREMONIA */}
      <div className="panel-section">
        <h3>⛪ Ceremonia Religiosa</h3>
        <div className="form-group">
          <label>Lugar (Iglesia/Templo)</label>
          <input type="text" name="ceremonyPlace" value={formData.ceremonyPlace} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input type="text" name="ceremonyAddress" value={formData.ceremonyAddress} onChange={handleChange} />
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label>Fecha (Texto)</label>
            <input type="text" name="ceremonyDate" value={formData.ceremonyDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Hora</label>
            <input type="text" name="ceremonyTime" value={formData.ceremonyTime} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
            <label>Link Google Maps</label>
            <input type="text" name="ceremonyMapUrl" value={formData.ceremonyMapUrl} onChange={handleChange} />
        </div>
      </div>

      {/* SECCIÓN: FIESTA */}
      <div className="panel-section">
        <h3>🥂 Fiesta</h3>
        <div className="form-group">
          <label>Lugar (Salón)</label>
          <input type="text" name="partyPlace" value={formData.partyPlace} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input type="text" name="partyAddress" value={formData.partyAddress} onChange={handleChange} />
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label>Fecha (Texto)</label>
            <input type="text" name="partyDateString" value={formData.partyDateString} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Hora</label>
            <input type="text" name="partyTime" value={formData.partyTime} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
            <label>Link Google Maps</label>
            <input type="text" name="partyMapUrl" value={formData.partyMapUrl} onChange={handleChange} />
        </div>
      </div>

      {/* SECCIÓN: REGALOS */}
      <div className="panel-section">
        <h3>🎁 Regalos</h3>
        <div className="form-group">
          <label>Alias Bancario / CBU</label>
          <input type="text" name="alias" value={formData.alias} onChange={handleChange} />
        </div>
      </div>

    </div>
  );
}

export default ControlPanel;