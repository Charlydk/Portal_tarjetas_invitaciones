import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepDesign }      from './steps/StepDesign';
import { StepModules }     from './steps/StepModules';
import { StepProtagonists } from './steps/StepProtagonists';
import { StepVenue }       from './steps/StepVenue';
import { StepExtras }      from './steps/StepExtras';
import { StepGallery }     from './steps/StepGallery';
import { StepMusic }       from './steps/StepMusic';
import { StepGifts }       from './steps/StepGifts';
import { StepConfirm }     from './steps/StepConfirm';
import { BASE_PRICE, MODULE_PRICES } from '../../data/pricing';
import './ControlPanel.css';

// ─── Registro maestro de pasos ──────────────────────────────────────────────
const STEP_REGISTRY = [
  { id: 'design', name: 'Diseño', condition: (d) => !d.modelId || !d.variantId, render: (p) => <StepDesign {...p} /> },
  { id: 'modules', name: 'Módulos', condition: () => true, render: (p) => <StepModules {...p} /> },
  { id: 'protagonists', name: 'Protagonistas', condition: () => true, render: (p) => <StepProtagonists {...p} /> },
  { id: 'venue', name: 'Lugar y Fechas', condition: (d) => d.showCeremony || d.showParty || d.showCivil, render: (p) => <StepVenue {...p} /> },
  { id: 'extras', name: 'Extras', condition: (d) => d.showDressCode || d.askDiets, render: (p) => <StepExtras {...p} /> },
  { id: 'gallery', name: 'Galería', condition: (d) => d.showGallery, render: (p) => <StepGallery {...p} /> },
  { id: 'music', name: 'Playlist', condition: (d) => d.showMusic, render: (p) => <StepMusic {...p} /> },
  { id: 'gifts', name: 'Regalos', condition: (d) => d.showGifts, render: (p) => <StepGifts {...p} /> },
  { id: 'confirm', name: 'Confirmación', condition: () => true, render: (p) => <StepConfirm {...p} /> },
];

function ControlPanel({ formData, setFormData, currentStep, setCurrentStep }) {
  const [showFinalModal, setShowFinalModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const activeSteps = useMemo(() => STEP_REGISTRY.filter(step => step.condition(formData)), [formData]);
  const totalSteps = activeSteps.length;

  const totalPrice = useMemo(() => {
    let price = BASE_PRICE;
    Object.entries(MODULE_PRICES).forEach(([key, cost]) => {
      if (formData[key]) price += cost;
    });
    return price;
  }, [formData]);

  useEffect(() => {
    if (currentStep > totalSteps) setCurrentStep(totalSteps);
  }, [totalSteps, currentStep, setCurrentStep]);

  const currentStepDef = activeSteps[currentStep - 1];

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isNextDisabled = () => {
    if (!currentStepDef) return false;
    if (currentStepDef.id === 'design' && (!formData.modelId || !formData.variantId)) return true;
    if (currentStepDef.id === 'protagonists' && (!formData.name1 || !formData.eventDate)) return true;
    return false;
  };

  const designSkipped = formData.modelId && formData.variantId;

  return (
    <div className="control-panel wizard">
      {/* ─── Botón Cambiar Diseño ── */}
      {designSkipped && currentStepDef?.id !== 'design' && (
        <div className="change-design-bar">
          <button
            className="btn-change-design"
            onClick={() => {
              setFormData(prev => ({ ...prev, modelId: '', variantId: '' }));
              setCurrentStep(1);
            }}
          >
            🔄 Cambiar diseño base
          </button>
        </div>
      )}

      {/* ─── Progreso ── */}
      <div className="wizard-progress">
        <div className="progress-info">
          <span>Paso {currentStep} de {totalSteps}</span>
          <span className="step-name">{currentStepDef?.name}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>
        <div className="progress-price">
          💰 ${totalPrice.toLocaleString('es-AR')}
        </div>
      </div>

      {/* ─── Contenido — Usamos render condicional directo sin AnimatePresence para evitar pérdida de foco ── */}
      <div className="wizard-content">
        {currentStepDef?.render({ formData, handleChange, totalPrice, setFormData })}
      </div>

      {/* ─── Navegación ── */}
      <div className="wizard-navigation">
        <button className="btn-wizard prev" onClick={prevStep} disabled={currentStep === 1}>← Atrás</button>
        {currentStep < totalSteps ? (
          <button className={`btn-wizard next ${isNextDisabled() ? 'disabled' : ''}`} onClick={nextStep}>
            Siguiente →
          </button>
        ) : (
          <button className="btn-wizard finish" onClick={() => setShowFinalModal(true)}>
            ¡Todo Listo! ✨
          </button>
        )}
      </div>

      {/* ─── MODAL FINAL (PREMIUM) ── */}
      <AnimatePresence>
        {showFinalModal && (
          <div className="final-modal-overlay">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="final-modal-card"
            >
              <div className="modal-icon">✅</div>
              <h2>¡Configuración Guardada!</h2>
              <p>Hiciste un trabajo increíble personalizando tu invitación. <br/><strong>Tus datos ya están guardados en este navegador.</strong></p>
              
              <div className="modal-next-steps">
                <p>Ahora podés:</p>
                <ul>
                  <li>Explorar otros diseños con tus mismos datos.</li>
                  <li>Compartir el link de esta demo con un asesor.</li>
                  <li>Seguir ajustando los detalles cuando quieras.</li>
                </ul>
              </div>

              <button className="btn-wizard next" onClick={() => setShowFinalModal(false)}>
                Continuar explorando
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ControlPanel;
