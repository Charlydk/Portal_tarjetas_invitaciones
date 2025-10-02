import React, { useState } from 'react'; // 👈 Importamos el "Hook" useState
import { useParams } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel'; // 👈 Importamos el hijo
import InvitationPreview from '../components/InvitationPreview'; // 👈 Importamos el otro hijo
import './DemoPage.css'; // Importamos los estilos específicos de esta página

function DemoPage() {
  // useParams nos da los parámetros de la URL, como el ID de la plantilla
  const { templateId } = useParams();

  // 👇 Aquí creamos nuestro "estado" con useState.
  // formData es la variable que contiene los datos.
  // setFormData es la ÚNICA función que debemos usar para actualizar los datos.
  const [formData, setFormData] = useState({
    name1: 'Juan',
    name2: 'Ana',
    eventDate: '25 de Diciembre, 2025',
    eventVenue: 'Salón de Fiestas "El Gran Encuentro"',
  });

  return (
    <div className="demo-page-container">
      {/* Columna Izquierda */}
      <div className="control-panel-column">
        <h2>Personaliza la Invitación</h2>
        <p>Estás editando la plantilla: <strong>{templateId}</strong></p>
        
        {/* Le pasamos al panel de control los datos y la función para actualizarlos */}
        <ControlPanel formData={formData} setFormData={setFormData} />
      </div>

      {/* Columna Derecha */}
      <div className="preview-column">
        {/* A la vista previa solo le pasamos los datos para que los muestre */}
        <InvitationPreview formData={formData} />
      </div>
    </div>
  );
}

export default DemoPage;