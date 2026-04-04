import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ControlPanel from '../features/preview/ControlPanel';
import InvitationPreview from '../features/preview/InvitationPreview';
import { templates } from '../data/templates';
import { invitationModels } from '../data/models';
import './DemoPage.css';

const DRAFT_KEY = 'portal_draft_invitation';

function DemoPage() {
  const { templateId } = useParams();
  const currentTemplate = templates.find(t => t.slug === templateId);
  const targetThemeId = currentTemplate?.themeId || currentTemplate?.theme || '';

  // Find corresponding model and variant to pre-fill
  let initialModelId = '';
  let initialVariantId = '';
  
  if (targetThemeId) {
    const parentModel = invitationModels.find(m => m.variants.some(v => v.id === targetThemeId));
    if (parentModel) {
      initialModelId = parentModel.id;
      initialVariantId = targetThemeId;
    }
  }

  // Estado para las pestañas en móvil ('edit' o 'preview')
  const [activeTab, setActiveTab] = useState('edit');

  // Lifted state to enable Scroll Sync
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize state from LocalStorage OR defaults
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (initialModelId && initialVariantId) {
          parsed.modelId = initialModelId;
          parsed.variantId = initialVariantId;
        }
        // Migración: campos nuevos que pueden no estar en borradores viejos
        if (!parsed.invitePhrase)           parsed.invitePhrase = 'Con cariño te invito a compartir este día tan especial';
        if (!parsed.whatsappCountryCode)    parsed.whatsappCountryCode = '54';
        if (!parsed.whatsappLocalNumber)    parsed.whatsappLocalNumber = parsed.whatsappNumber?.replace(/^54/, '') || '';
        if (parsed.giftMode === undefined)  parsed.giftMode = 'cbu';
        if (parsed.askDiets === undefined)  parsed.askDiets = false;
        return parsed;
      } catch (err) {
        console.error("No se pudo leer el borrador local", err);
      }
    }
    return {
      modelId: initialModelId,
      variantId: initialVariantId,
      name1: 'Zoe',
      name2: 'Lucas',
      welcomePhrase: '¡Estás invitado!',
      eventDate: '2025-11-15T22:00:00',
      eventVenue: 'Salón La Soñada',
      civilDate: '10/11/2025',
      civilTime: '11:00 HS',
      civilPlace: 'Registro Civil Luján',
      civilAddress: 'Sgto. Cabral 261',
      civilMapUrl: '',
      civilMapUnknown: false,
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
      whatsappNumber: '5493810000000',
      musicUrl: 'https://spotify.com/playlist/tu-playlist',

      // Frase personalizable de la tarjeta
      invitePhrase: 'Con cariño te invito a compartir este día tan especial',

      // Flags de maps desconocidos (el programador los completa luego)
      ceremonyMapUnknown: false,
      partyMapUnknown: false,

      // Modo de regalos: 'cbu' | 'cofre' | 'both'
      giftMode: 'cbu',

      // Extras opcionales
      dressCodeDescription: '',
      askDiets: false,
      galleryPhotos: [],

      // Interruptores de módulos
      showCivil: true,
      showCeremony: true,
      showParty: true,
      showCountdown: false,
      showDressCode: false,
      showGifts: true,
      showGallery: false,
      showRSVP: true,
      showMusic: false,
    };
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

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
        <ControlPanel 
          formData={formData} 
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {/* --- COLUMNA DERECHA: VISTA PREVIA --- */}
      {/* En móvil, solo se muestra si activeTab es 'preview' */}
      <div className={`preview-column ${activeTab === 'edit' ? 'hidden-mobile' : ''}`}>
        <InvitationPreview 
          formData={formData} 
          themeId={currentTemplate.themeId || currentTemplate.theme}
          activeStep={currentStep}
        />
      </div>

    </div>
  );
}

export default DemoPage;