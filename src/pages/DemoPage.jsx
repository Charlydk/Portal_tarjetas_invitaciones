import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ControlPanel from '../features/preview/ControlPanel';
import InvitationPreview from '../features/preview/InvitationPreview';
import { templates } from '../data/templates';
import { invitationModels } from '../data/models';
import './DemoPage.css';

const DRAFT_KEY = 'portal_draft_invitation';

// Condiciones de pasos (espejo del STEP_REGISTRY en ControlPanel)
// Se usa solo para calcular activeStepId y pasarlo al scroll sync
const STEP_CONDITIONS = [
  { id: 'design',       show: (d) => !d.modelId || !d.variantId },
  { id: 'modules',      show: () => true },
  { id: 'protagonists', show: () => true },
  { id: 'venue',        show: (d) => d.showCeremony || d.showParty || d.showCivil },
  { id: 'extras',       show: (d) => d.showDressCode || d.askDiets },
  { id: 'gallery',      show: (d) => d.showGallery },
  { id: 'music',        show: (d) => d.showMusic },
  { id: 'gifts',        show: (d) => d.showGifts },
  { id: 'confirm',      show: () => true },
];

function DemoPage() {
  const { templateId } = useParams();
  const currentTemplate = templates.find(t => t.slug === templateId);
  const targetThemeId = currentTemplate?.themeId || currentTemplate?.theme || '';

  let initialModelId = '';
  let initialVariantId = '';
  if (targetThemeId) {
    const parentModel = invitationModels.find(m => m.variants.some(v => v.id === targetThemeId));
    if (parentModel) {
      initialModelId = parentModel.id;
      initialVariantId = targetThemeId;
    }
  }

  // Estado para el FAB móvil
  const [activeTab, setActiveTab] = useState('edit');

  // Paso actual (elevado para el scroll sync)
  const [currentStep, setCurrentStep] = useState(1);

  // FormData con todos los módulos activos por defecto y datos de ejemplo
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (initialModelId && initialVariantId) {
          parsed.modelId = initialModelId;
          parsed.variantId = initialVariantId;
        }
        // Migración de campos nuevos que pueden faltar en borradores viejos
        if (!parsed.invitePhrase)        parsed.invitePhrase = 'Con cariño te invito a compartir este día tan especial';
        if (!parsed.whatsappCountryCode) parsed.whatsappCountryCode = '54';
        if (!parsed.whatsappLocalNumber) parsed.whatsappLocalNumber = parsed.whatsappNumber?.replace(/^54/, '') || '';
        if (parsed.giftMode === undefined)         parsed.giftMode = 'cbu';
        if (parsed.askDiets === undefined)         parsed.askDiets = true;
        if (parsed.showCountdown === undefined)    parsed.showCountdown = true;
        if (parsed.showDressCode === undefined)    parsed.showDressCode = true;
        if (parsed.showGallery === undefined)      parsed.showGallery = true;
        if (parsed.showMusic === undefined)        parsed.showMusic = true;
        if (parsed.dressCodeDescription === undefined) parsed.dressCodeDescription = 'Elegante';
        if (parsed.dressCodeColorNote === undefined)   parsed.dressCodeColorNote = '';
        if (parsed.bankCbu === undefined)              parsed.bankCbu = '';
        if (parsed.musicPlaylistUrl === undefined)     parsed.musicPlaylistUrl = '';
        return parsed;
      } catch (err) {
        console.error('No se pudo leer el borrador local', err);
      }
    }

    return {
      modelId: initialModelId,
      variantId: initialVariantId,

      // Protagonistas
      name1: 'Zoe',
      name2: 'Lucas',
      welcomePhrase: '¡Estás invitado!',
      invitePhrase: 'Con cariño te invitamos a compartir este día tan especial',
      eventDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().slice(0, 16), // Hoy + 30 días

      // Civil (Vacíos por defecto para que el usuario cargue)
      civilDate: '',
      civilTime: '',
      civilPlace: '',
      civilAddress: '',
      civilMapUrl: '',
      civilMapUnknown: false,

      // Ceremonia
      ceremonyDate: '',
      ceremonyTime: '',
      ceremonyPlace: '',
      ceremonyAddress: '',
      ceremonyMapUrl: '',
      ceremonyMapUnknown: false,

      // Fiesta
      partyDateString: '',
      partyTime: '',
      partyPlace: '',
      partyAddress: '',
      partyMapUrl: '',
      partyMapUnknown: false,
      eventVenue: '',

      // Regalos
      giftMode: 'cbu',
      bankCbu: '',
      alias: 'zoe.lucas.boda',

      // WhatsApp RSVP
      whatsappNumber: '5493810000000',
      whatsappCountryCode: '54',
      whatsappLocalNumber: '3810000000',

      // Dress Code
      dressCodeDescription: 'Elegante',
      dressCodeColorNote: '',

      // Galería
      galleryPhotos: [],

      // Playlist
      musicPlaylistUrl: '',

      // ── Módulos (todos activos por defecto) ──────────────────────────────
      showCivil:     true,
      showCeremony:  true,
      showParty:     true,
      showCountdown: true,
      showDressCode: true,
      showGifts:     true,
      showGallery:   true,
      showMusic:     true,
      showRSVP:      true,
      askDiets:      true,
    };
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  // Calcular el ID del paso activo (para scroll sync)
  const activeStepId = useMemo(() => {
    const active = STEP_CONDITIONS.filter(s => s.show(formData));
    return active[currentStep - 1]?.id || null;
  }, [formData, currentStep]);

  if (!currentTemplate) {
    return <div className="error-message">Plantilla no encontrada</div>;
  }

  return (
    <div className="demo-page-container">

      {/* ── COLUMNA IZQUIERDA: PANEL DE CONTROL ── */}
      <div className={`control-panel-column ${activeTab === 'preview' ? 'hidden-mobile' : ''}`}>
        <div className="panel-header">
          <h2>Personaliza tu {currentTemplate.title}</h2>
          <p>Completá los datos para ver la magia en tiempo real.</p>
        </div>
        <ControlPanel
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {/* ── COLUMNA DERECHA: VISTA PREVIA ── */}
      <div className={`preview-column ${activeTab === 'edit' ? 'hidden-mobile' : ''}`}>
        <InvitationPreview
          formData={formData}
          themeId={currentTemplate.themeId || currentTemplate.theme}
          activeStepId={activeStepId}
        />
      </div>

      {/* ── FAB MÓVIL — reemplaza los tabs pegajosos ── */}
      <button
        className={`mobile-fab ${activeTab === 'preview' ? 'fab-edit' : 'fab-preview'}`}
        onClick={() => setActiveTab(prev => prev === 'edit' ? 'preview' : 'edit')}
      >
        {activeTab === 'edit' ? '📱 Ver tarjeta' : '✏️ Editar datos'}
      </button>

    </div>
  );
}

export default DemoPage;