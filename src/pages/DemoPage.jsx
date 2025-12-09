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
    // General
    name1: 'Zoe',
    eventDate: '2025-11-15T22:00:00', // Para la cuenta regresiva
    
    // Ceremonia
    ceremonyDate: '11/11/2025',
    ceremonyTime: '19:30 HS',
    ceremonyPlace: 'Parroquia Marcos Paz',
    ceremonyAddress: 'Florida Sur 251 - Yerba Buena',
    ceremonyMapUrl: 'https://goo.gl/maps/ejemplo',

    // Fiesta
    partyDateString: '15/11/2025',
    partyTime: '22:00 HS',
    partyPlace: 'Salón La Soñada',
    partyAddress: 'Frias Silva 70, Yerba Buena',
    partyMapUrl: 'https://goo.gl/maps/ejemplo2',

    // Regalos
    alias: 'Parra.Zoe.Mis.XV',

    // 👇 Interruptores para visivilidad
    showCeremony: true,
    showParty: true,
    showCountdown: true,
    showDressCode: true,
    showGifts: true,
    showGallery: true,

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