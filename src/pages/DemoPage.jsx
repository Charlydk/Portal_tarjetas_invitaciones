import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import InvitationPreview from '../components/InvitationPreview';
import { templates } from '../data/templates';
import './DemoPage.css';


function DemoPage() {
  const { templateId } = useParams();
  
  // 1. Buscamos la plantilla actual basada en la URL (templateId)
  // El .find busca en el array el elemento cuyo 'slug' coincida con el de la URL
  const currentTemplate = templates.find(t => t.slug === templateId);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name1: 'Nombre 1',
    name2: 'Nombre 2',
    eventDate: 'DD/MM/AAAA',
    eventVenue: 'Dirección del evento',
  });

  // Si no encuentra la plantilla (ej. el usuario escribió mal la URL), mostramos error
  if (!currentTemplate) {
    return <div className="error-message">Plantilla no encontrada</div>;
  }

  return (
    <div className="demo-page-container">
      {/* Columna Izquierda: Panel de Control */}
      <div className="control-panel-column">
        <div className="panel-header">
           <h2>Personaliza tu {currentTemplate.title}</h2>
           <p>Completa los datos para ver la magia.</p>
        </div>
        <ControlPanel formData={formData} setFormData={setFormData} />
      </div>

      {/* Columna Derecha: Vista Previa */}
      <div className="preview-column">
        {/* 👇 Le pasamos el 'theme' (tema) a la vista previa */}
        <InvitationPreview formData={formData} theme={currentTemplate.theme} />
      </div>
    </div>
  );
}

export default DemoPage;