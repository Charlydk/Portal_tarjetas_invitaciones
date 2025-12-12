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

// Función para generar el mensaje de WhatsApp
const handleOrder = () => {
  const phoneNumber = "5493813852485"; // TU NÚMERO AQUÍ (Formato internacional sin +)
  
  // Armamos el texto línea por línea
  let message = `¡Hola! 👋 Quiero encargar la invitación *Modelo Rapunzel*.\n\n`;
  message += `📋 *MIS DATOS:*\n`;
  message += `👤 Nombre: ${formData.name1}\n`;
  message += `📅 Fecha Evento: ${new Date(formData.eventDate).toLocaleDateString()}\n`;
  
  if (formData.showCeremony) {
      message += `\n⛪ *CEREMONIA:*\n`;
      message += `- Lugar: ${formData.ceremonyPlace}\n`;
      message += `- Hora: ${formData.ceremonyTime}\n`;
  }

  if (formData.showParty) {
      message += `\n🥂 *FIESTA:*\n`;
      message += `- Salón: ${formData.partyPlace}\n`;
      message += `- Fecha: ${formData.partyDateString}\n`;
  }

  if (formData.showGifts) {
      message += `\n🎁 *REGALOS:*\n`;
      message += `- Alias: ${formData.alias}\n`;
  }

  message += `\n🚀 *Quedo a la espera del link de pago.*`;

  // Codificamos el texto para URL
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Abrimos WhatsApp en una nueva pestaña
  window.open(url, '_blank');
};

  
  return (
    <div className="control-panel">
      
      {/* --- SECCIÓN 1: DATOS GENERALES (Siempre visibles) --- */}
      <div className="panel-section">
        <h3>🎉 Datos Generales</h3>
        <div className="form-group">
          <label>Nombre Homenajeada/o</label>
          <input type="text" name="name1" value={formData.name1} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fecha Real del Evento (Para el contador)</label>
          <input type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} />
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

      {/* BOTÓN FINAL DE COMPRA */}
      <div className="panel-footer">
        <button className="btn-buy" onClick={handleOrder}>
          ✨ ¡Pedir mi Tarjeta! ✨
        </button>
        <p className="buy-note">Al hacer clic, se abrirá WhatsApp con tus datos listos.</p>
      </div>

    </div>
  );
}

export default ControlPanel;