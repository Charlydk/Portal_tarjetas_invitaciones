import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import InvitationPreview from '../components/InvitationPreview';
import { templates } from '../data/templates';
import './DemoPage.css';

function DemoPage() {
  const { templateId } = useParams();
  const currentTemplate = templates.find(t => t.slug === templateId);

  // Estado para las pestañas en móvil ('edit' o 'preview')
  const [activeTab, setActiveTab] = useState('edit');

  // Estado del formulario (Incluye tus interruptores del Wizard)
  const [formData, setFormData] = useState({
    name1: 'Zoe',
    eventDate: '2025-11-15T22:00:00',
    ceremonyDate: '11/11/2025',
    ceremonyTime: '19:30 HS',
    ceremonyPlace: 'Parroquia Marcos Paz',
    ceremonyAddress: 'Florida Sur 251 - Yerba Buena',
    ceremonyMapUrl: 'https://goo.gl/maps/tu-link-aqui',
    partyDateString: '15/11/2025',
    partyTime: '22:00 HS',
    partyPlace: 'Salón La Soñada',
    partyAddress: 'Frias Silva 70, Yerba Buena',
    partyMapUrl: 'https://goo.gl/maps/tu-link-aqui-2',
    alias: 'Parra.Zoe.Mis.XV',
    
    // Interruptores
    showCeremony: true,
    showParty: true,
    showCountdown: true,
    showDressCode: true,
    showGifts: true,
    showGallery: true,
  });

  if (!currentTemplate) {
    return <div className="error-message">Plantilla no encontrada</div>;
  }

  return (
    <div className="demo-page-container">
      
      {/* --- BARRA DE NAVEGACIÓN MÓVIL (Solo visible en celular) --- */}
      <div className="mobile-tabs">
        <button 
            className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`} 
            onClick={() => setActiveTab('edit')}
        >
            ✏️ Editar Datos
        </button>
        <button 
            className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`} 
            onClick={() => setActiveTab('preview')}
        >
            📱 Ver Tarjeta
        </button>
      </div>

      {/* --- COLUMNA IZQUIERDA: PANEL DE CONTROL --- */}
      {/* En móvil, solo se muestra si activeTab es 'edit' */}
      <div className={`control-panel-column ${activeTab === 'preview' ? 'hidden-mobile' : ''}`}>
        <div className="panel-header">
           <h2>Personaliza tu {currentTemplate.title}</h2>
           <p>Completa los datos para ver la magia.</p>
        </div>
        <ControlPanel formData={formData} setFormData={setFormData} />
      </div>

      {/* --- COLUMNA DERECHA: VISTA PREVIA --- */}
      {/* En móvil, solo se muestra si activeTab es 'preview' */}
      <div className={`preview-column ${activeTab === 'edit' ? 'hidden-mobile' : ''}`}>
        <InvitationPreview formData={formData} theme={currentTemplate.theme} />
      </div>

    </div>
  );
}

export default DemoPage;