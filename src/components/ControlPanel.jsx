import React from 'react';
import './ControlPanel.css'; // Importamos los estilos específicos de este componente

function ControlPanel({ formData, setFormData }) {
  // Esta función se ejecuta CADA VEZ que el usuario escribe en un campo.
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtenemos el nombre y el valor del campo que cambió.

    // Usamos la función del padre (setFormData) para actualizar el estado.
    setFormData(prevData => ({
      ...prevData,  // 👈 Copiamos todos los datos anteriores...
      [name]: value, // 👈 ...y sobrescribimos solo el campo que cambió.
    }));
  };

  return (
    <div className="control-panel">
      <div className="form-group">
        <label htmlFor="name1">Nombre 1</label>
        <input type="text" id="name1" name="name1" value={formData.name1} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="name2">Nombre 2</label>
        <input type="text" id="name2" name="name2" value={formData.name2} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="eventDate">Fecha del Evento</label>
        <input type="text" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="eventVenue">Lugar del Evento</label>
        <input type="text" id="eventVenue" name="eventVenue" value={formData.eventVenue} onChange={handleChange} />
      </div>
    </div>
  );
}

export default ControlPanel;