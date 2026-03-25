import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationModels } from '../../data/models';
import './ControlPanel.css';

function ControlPanel({ formData, setFormData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Función que maneja tanto texto como casillas de verificación (checkboxes)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const currentModel = invitationModels.find(m => m.id === formData.modelId);

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.modelId || !formData.variantId) {
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.name1 || !formData.eventDate) {
        return;
      }
    }
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Variantes para animaciones suaves entre pasos
  const variants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <div className="control-panel wizard">

      {/* Barra de Progreso */}
      <div className="wizard-progress">
        <div className="progress-info">
          <span>Paso {currentStep} de {totalSteps}</span>
          <span className="step-name">
            {currentStep === 1 && "Diseño"}
            {currentStep === 2 && "Protagonistas"}
            {currentStep === 3 && "¿Cuándo y Dónde?"}
            {currentStep === 4 && "Secciones y Estilo"}
            {currentStep === 5 && "Confirmación y Música"}
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="wizard-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {/* PASO 1: DISEÑO (NUEVO) */}
            {currentStep === 1 && (
              <div className="panel-section">
                <h3>🖌️ Paso 1: Diseño</h3>
                <div className="form-group">
                  <label>Modelo Base</label>
                  <select 
                    name="modelId" 
                    value={formData.modelId || ''} 
                    onChange={(e) => {
                      handleChange(e);
                      // Auto-select the first variant of the new model
                      const newModel = invitationModels.find(m => m.id === e.target.value);
                      if (newModel && newModel.variants.length > 0) {
                        handleChange({ target: { name: 'variantId', value: newModel.variants[0].id }});
                      }
                    }}
                    className={!formData.modelId ? 'input-error' : ''}
                  >
                    <option value="" disabled>Seleccioná un Modelo...</option>
                    {invitationModels.map(model => (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                  </select>
                  {!formData.modelId && <small className="error-text">Elegí la estructura base.</small>}
                </div>

                {currentModel && (
                  <div className="form-group slide-in">
                    <label>Variante (Estilo / Colores)</label>
                    <div className="variants-grid">
                      {currentModel.variants.map(variant => (
                        <div 
                          key={variant.id} 
                          className={`variant-card ${formData.variantId === variant.id ? 'selected' : ''}`}
                          onClick={() => handleChange({ target: { name: 'variantId', value: variant.id }})}
                        >
                          <div 
                            className="variant-color-preview" 
                            style={{ 
                              background: variant.styles.primaryColor || '#ddd',
                              borderBottom: `4px solid ${variant.styles.secondaryColor || '#ccc'}`
                            }}
                          ></div>
                          <span>{variant.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PASO 2: PROTAGONISTAS */}
            {currentStep === 2 && (
              <div className="panel-section">
                <h3>🎉 Paso 2: Protagonistas</h3>
                <div className="form-group">
                  <label>Nombre 1 (Homenajeada/o o Novia) *</label>
                  <input
                    type="text"
                    name="name1"
                    value={formData.name1}
                    onChange={handleChange}
                    placeholder="Ej: Zoe"
                    className={!formData.name1 ? 'input-error' : ''}
                  />
                  {!formData.name1 && <small className="error-text">Este campo es obligatorio.</small>}
                </div>
                <div className="form-group">
                  <label>Nombre 2 (Novio o Segundo Homenajeado - Opcional)</label>
                  <input type="text" name="name2" value={formData.name2} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Frase de Bienvenida</label>
                  <input
                    type="text"
                    name="welcomePhrase"
                    value={formData.welcomePhrase || ''}
                    onChange={handleChange}
                    placeholder="Ej: ¡Estás invitado!"
                  />
                </div>
                <div className="form-group">
                  <label>Fecha del Evento (Para el contador) *</label>
                  <input
                    type="datetime-local"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={!formData.eventDate ? 'input-error' : ''}
                  />
                  {!formData.eventDate && <small className="error-text">La fecha es necesaria para el contador.</small>}
                </div>
              </div>
            )}

            {/* PASO 3: CUÁNDO Y DÓNDE */}
            {currentStep === 3 && (
              <div className="panel-section">
                <h3>⛪ Paso 3: ¿Cuándo y Dónde?</h3>

                <div className="wizard-sub-section">
                  <h4>Ceremonia Religiosa</h4>
                  <div className="form-group">
                    <label>Lugar</label>
                    <input type="text" name="ceremonyPlace" value={formData.ceremonyPlace} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input type="text" name="ceremonyAddress" value={formData.ceremonyAddress} onChange={handleChange} />
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Fecha (Texto)</label>
                      <input type="text" name="ceremonyDate" value={formData.ceremonyDate} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Hora</label>
                      <input type="text" name="ceremonyTime" value={formData.ceremonyTime} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Link Google Maps</label>
                    <input type="text" name="ceremonyMapUrl" value={formData.ceremonyMapUrl} onChange={handleChange} />
                  </div>
                </div>

                <div className="wizard-sub-section">
                  <h4>Fiesta / Evento</h4>
                  <div className="form-group">
                    <label>Lugar</label>
                    <input type="text" name="partyPlace" value={formData.partyPlace} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input type="text" name="partyAddress" value={formData.partyAddress} onChange={handleChange} />
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Fecha (Texto)</label>
                      <input type="text" name="partyDateString" value={formData.partyDateString} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Hora</label>
                      <input type="text" name="partyTime" value={formData.partyTime} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Link Google Maps</label>
                    <input type="text" name="partyMapUrl" value={formData.partyMapUrl} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* PASO 4: SECCIONES Y ESTILO */}
            {currentStep === 4 && (
              <div className="panel-section">
                <h3>🎨 Paso 4: Secciones y Estilo</h3>
                <p className="step-description">Activa o desactiva las secciones que quieres mostrar en tu tarjeta.</p>

                <div className="toggle-list">
                  {[
                    { id: 'showCeremony', label: 'Ceremonia Religiosa', icon: '⛪' },
                    { id: 'showParty', label: 'Fiesta', icon: '🥂' },
                    { id: 'showCountdown', label: 'Cuenta Regresiva', icon: '⏳' },
                    { id: 'showDressCode', label: 'Dress Code', icon: '👗' },
                    { id: 'showGifts', label: 'Regalos', icon: '🎁' },
                    { id: 'showGallery', label: 'Galería de Fotos', icon: '📸' },
                    { id: 'showRSVP', label: 'Confirmación RSVP', icon: '📞' },
                    { id: 'showMusic', label: 'Sugerencia de Música', icon: '🎵' },
                  ].map(item => (
                    <div className="wizard-toggle-item" key={item.id}>
                      <span className="toggle-info">{item.icon} {item.label}</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          name={item.id}
                          checked={formData[item.id]}
                          onChange={handleChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>

                {formData.showGifts && (
                  <div className="form-group mt-15">
                    <label>Alias Bancario / CBU para Regalos</label>
                    <input type="text" name="alias" value={formData.alias} onChange={handleChange} />
                  </div>
                )}
              </div>
            )}

            {/* PASO 5: CONFIRMACIÓN Y MÚSICA */}
            {currentStep === 5 && (
              <div className="panel-section">
                <h3>✅ Paso 5: Confirmación y Música</h3>

                <div className="form-group">
                  <label>WhatsApp (Número con código de país)</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="Ej: 5493810000000"
                  />
                  <small>Aquí recibirás las confirmaciones de asistencia.</small>
                </div>

                <div className="form-group">
                  <label>Link de Playlist (Spotify/YouTube)</label>
                  <input
                    type="text"
                    name="musicUrl"
                    value={formData.musicUrl}
                    onChange={handleChange}
                    placeholder="https://open.spotify.com/..."
                  />
                  <small>Link para que tus invitados sugieran música.</small>
                </div>

                <div className="wizard-final-card">
                  <h4>¡Has completado los pasos!</h4>
                  <p>Revisa la vista previa a la derecha (o en la pestaña 'Ver Tarjeta') para ver cómo quedó tu invitación.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botones de Navegación */}
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
            className={`btn-wizard next ${
              (currentStep === 1 && (!formData.modelId || !formData.variantId)) || 
              (currentStep === 2 && (!formData.name1 || !formData.eventDate)) 
                ? 'disabled' : ''
            }`}
            onClick={nextStep}
          >
            Siguiente →
          </button>
        ) : (
          <button className="btn-wizard finish" onClick={() => alert("¡Datos guardados correctamente!")}>
            ¡Listo! ✨
          </button>
        )}
      </div>

    </div>
  );
}

export default ControlPanel;
