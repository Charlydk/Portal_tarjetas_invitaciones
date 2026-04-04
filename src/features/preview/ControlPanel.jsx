import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepDesign }      from './steps/StepDesign';
import { StepModules }     from './steps/StepModules';
import { StepProtagonists } from './steps/StepProtagonists';
import { StepVenue }       from './steps/StepVenue';
import { StepGifts }       from './steps/StepGifts';
import { StepExtras }      from './steps/StepExtras';
import { StepConfirm }     from './steps/StepConfirm';
import { BASE_PRICE, MODULE_PRICES } from '../../data/pricing';
import './ControlPanel.css';

// ─── Registro maestro de pasos ─────────────────────────────────────────────
// Cada entrada tiene: id, name, condition(formData) → bool
// Solo se muestran los pasos cuya condition retorna true.
const STEP_REGISTRY = [
  {
    id: 'design',
    name: 'Diseño',
    condition: () => true,
    render: (props) => <StepDesign {...props} />,
  },
  {
    id: 'modules',
    name: 'Módulos',
    condition: () => true,
    render: (props) => <StepModules {...props} />,
  },
  {
    id: 'protagonists',
    name: 'Protagonistas',
    condition: () => true,
    render: (props) => <StepProtagonists {...props} />,
  },
  {
    id: 'venue',
    name: 'Lugar y Fechas',
    condition: (data) => data.showCeremony || data.showParty || data.showCivil,
    render: (props) => <StepVenue {...props} />,
  },
  {
    id: 'extras',
    name: 'Extras',
    condition: (data) => data.showDressCode || data.askDiets,
    render: (props) => <StepExtras {...props} />,
  },
  {
    id: 'gifts',
    name: 'Regalos',
    condition: (data) => data.showGifts,
    render: (props) => <StepGifts {...props} />,
  },
  {
    id: 'confirm',
    name: 'Confirmación',
    condition: () => true,
    render: (props) => <StepConfirm {...props} />,
  },
];

function ControlPanel({ formData, setFormData, currentStep, setCurrentStep }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ─── Pasos activos calculados dinámicamente ─────────────────────────────
  const activeSteps = useMemo(
    () => STEP_REGISTRY.filter(step => step.condition(formData)),
    [formData]
  );

  const totalSteps = activeSteps.length;

  // ─── Cotizador en tiempo real ───────────────────────────────────────────
  const totalPrice = useMemo(() => {
    let price = BASE_PRICE;
    Object.entries(MODULE_PRICES).forEach(([key, cost]) => {
      if (formData[key]) price += cost;
    });
    return price;
  }, [formData]);

  // ─── Guardar step si queda fuera de rango al desactivar módulos ─────────
  useEffect(() => {
    if (currentStep > totalSteps) {
      setCurrentStep(totalSteps);
    }
  }, [totalSteps, currentStep, setCurrentStep]);

  const currentStepDef = activeSteps[currentStep - 1];

  // ─── Navegación ─────────────────────────────────────────────────────────
  const nextStep = () => {
    if (currentStep === 1 && (!formData.modelId || !formData.variantId)) return;
    if (currentStep === activeSteps.findIndex(s => s.id === 'protagonists') + 1 && (!formData.name1 || !formData.eventDate)) return;
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && (!formData.modelId || !formData.variantId)) return true;
    const protIdx = activeSteps.findIndex(s => s.id === 'protagonists') + 1;
    if (currentStep === protIdx && (!formData.name1 || !formData.eventDate)) return true;
    return false;
  };

  const stepAnimations = {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -12 }
  };

  return (
    <div className="control-panel wizard">
      {/* ─── Progreso ─────────────────────────────────────────────────── */}
      <div className="wizard-progress">
        <div className="progress-info">
          <span>Paso {currentStep} de {totalSteps}</span>
          <span className="step-name">{currentStepDef?.name}</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        {/* Precio en la barra de progreso */}
        <div className="progress-price">
          💰 ${totalPrice.toLocaleString('es-AR')}
        </div>
      </div>

      {/* ─── Contenido del paso actual ────────────────────────────────── */}
      <div className="wizard-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepDef?.id}
            variants={stepAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {currentStepDef?.render({
              formData,
              handleChange,
              totalPrice,
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Navegación ───────────────────────────────────────────────── */}
      <div className="wizard-navigation">
        <button
          className="btn-wizard prev"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          ← Anterior
        </button>

        {currentStep < totalSteps ? (
          <button
            className={`btn-wizard next ${isNextDisabled() ? 'disabled' : ''}`}
            onClick={nextStep}
          >
            Siguiente →
          </button>
        ) : (
          <button
            className="btn-wizard finish"
            onClick={() => alert('¡Datos guardados correctamente en tu navegador!')}
          >
            ¡Listo! ✨
          </button>
        )}
      </div>
    </div>
  );
}

export default ControlPanel;
