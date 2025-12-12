import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ControlPanel from '../components/ControlPanel';
import InvitationPreview from '../components/InvitationPreview';
import { templates } from '../data/templates';
import './DemoPage.css';

function DemoPage() {
  const { templateId } = useParams();
  
  // Buscamos la plantilla
  const currentTemplate = templates.find(t => t.slug === templateId);

  // Estado de pestañas móvil
  const [activeTab, setActiveTab] = useState('edit');

    const [formData, setFormData] = useState(
    currentTemplate?.initialData || {
      // Datos de respaldo por si algo falla (Fallback)
      name1: 'Nombre',
      eventDate: new Date().toISOString(),

    }
  );

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