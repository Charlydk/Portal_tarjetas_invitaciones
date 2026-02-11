import React from 'react';
import './ControlPanel.css';

function ControlPanel({ formData, setFormData }) {
  
  // Función que maneja tanto texto como casillas de verificación (checkboxes)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="control-panel">
      
      {/* --- SECCIÓN 1: DATOS GENERALES (Siempre visibles) --- */}
      <div className="panel-section">
        <h3>🎉 Datos Generales</h3>
        <div className="form-group">
          <label>Nombre 1 (Homenajeada/o o Novia)</label>
          <input type="text" name="name1" value={formData.name1} onChange={handleChange} placeholder="Ej: Zoe" />
        </div>
        <div className="form-group">
          <label>Nombre 2 (Novio o Segundo Homenajeado - Opcional)</label>
          <input type="text" name="name2" value={formData.name2} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fecha Real del Evento (Para el contador)</label>
          <input
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className={!formData.eventDate ? 'input-error' : ''}
          />
          {!formData.eventDate && <small className="error-text">La fecha es necesaria para el contador.</small>}
        </div>
        <div className="form-group">
          <label>Nombre del Lugar (General)</label>
          <input type="text" name="eventVenue" value={formData.eventVenue} onChange={handleChange} />
        </div>
      </div>

      {/* --- SECCIÓN 2: CEREMONIA RELIGIOSA (Con Interruptor) --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>⛪ Ceremonia Religiosa</h3>
            {/* Interruptor */}
            <label className="toggle-switch">
                <input 
                    type="checkbox" 
                    name="showCeremony" 
                    checked={formData.showCeremony} 
                    onChange={handleChange} 
                />
                <span className="toggle-label">{formData.showCeremony ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>

        {/* Solo mostramos los inputs si el interruptor está activado */}
        {formData.showCeremony && (
            <>
                <div className="form-group">
                  <label>Lugar (Iglesia/Templo)</label>
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
            </>
        )}
      </div>

      {/* --- SECCIÓN 3: FIESTA (Con Interruptor) --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>🥂 Fiesta</h3>
            <label className="toggle-switch">
                <input 
                    type="checkbox" 
                    name="showParty" 
                    checked={formData.showParty} 
                    onChange={handleChange} 
                />
                <span className="toggle-label">{formData.showParty ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>
        
        {formData.showParty && (
            <>
                 <div className="form-group">
                    <label>Lugar (Salón)</label>
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
            </>
        )}
      </div>

      {/* --- SECCIÓN 4: CUENTA REGRESIVA --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>⏳ Cuenta Regresiva</h3>
            <label className="toggle-switch">
                <input 
                    type="checkbox" 
                    name="showCountdown" 
                    checked={formData.showCountdown} 
                    onChange={handleChange} 
                />
                <span className="toggle-label">{formData.showCountdown ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>
        {/* Aquí no hay inputs extra porque usa la fecha general, pero el toggle controla si se ve o no */}
      </div>

      {/* --- SECCIÓN 5: DRESS CODE --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>👗 Dress Code</h3>
            <label className="toggle-switch">
                <input 
                    type="checkbox" 
                    name="showDressCode" 
                    checked={formData.showDressCode} 
                    onChange={handleChange} 
                />
                <span className="toggle-label">{formData.showDressCode ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>
        {/* Podríamos agregar un input aquí si quisieras cambiar el texto "Elegante" por otro */}
      </div>

      {/* --- SECCIÓN 6: REGALOS --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>🎁 Regalos</h3>
            <label className="toggle-switch">
                <input 
                    type="checkbox" 
                    name="showGifts" 
                    checked={formData.showGifts} 
                    onChange={handleChange} 
                />
                <span className="toggle-label">{formData.showGifts ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>

        {formData.showGifts && (
            <div className="form-group">
              <label>Alias Bancario / CBU</label>
              <input type="text" name="alias" value={formData.alias} onChange={handleChange} />
            </div>
        )}
      </div>

      {/* --- SECCIÓN 7: GALERÍA DE FOTOS --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>📸 Galería de Fotos</h3>
            <label className="toggle-switch">
                <input 
                    type="checkbox" 
                    name="showGallery" 
                    checked={formData.showGallery} 
                    onChange={handleChange} 
                />
                <span className="toggle-label">{formData.showGallery ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>
      </div>

      {/* --- SECCIÓN 8: RSVP / CONFIRMACIÓN --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>📞 Confirmación RSVP</h3>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    name="showRSVP"
                    checked={formData.showRSVP}
                    onChange={handleChange}
                />
                <span className="toggle-label">{formData.showRSVP ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>
        {formData.showRSVP && (
            <div className="form-group">
          <label>WhatsApp (Incluir código de país)</label>
          <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="Ej: 5493810000000" />
            </div>
        )}
      </div>

      {/* --- SECCIÓN 9: MÚSICA --- */}
      <div className="panel-section">
        <div className="section-header-toggle">
            <h3>🎵 Sugerencia de Música</h3>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    name="showMusic"
                    checked={formData.showMusic}
                    onChange={handleChange}
                />
                <span className="toggle-label">{formData.showMusic ? 'Visible' : 'Oculto'}</span>
            </label>
        </div>
        {formData.showMusic && (
            <div className="form-group">
              <label>Link de Playlist o Formulario</label>
              <input type="text" name="musicUrl" value={formData.musicUrl} onChange={handleChange} placeholder="https://spotify.com/..." />
            </div>
        )}
      </div>

    </div>
  );
}

export default ControlPanel;