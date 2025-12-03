import React from 'react';
import './InvitationPreview.css';
import Rapunzel from './templates/Rapunzel/Rapunzel';

function InvitationPreview({ formData, theme }) {

  if (theme === 'theme-rapunzel') {
    return (
      <div className="invitation-preview-container" style={{ 
        width: '100%', 
        maxWidth: '375px', // Ancho de celular
        height: '750px',   // Alto de celular
        border: '10px solid #333', // Marco negro
        borderRadius: '30px',      // Bordes redondeados
        overflow: 'auto',          // Scroll interno
        position: 'relative',
        margin: '0 auto'           // Centrado
      }}>
         <Rapunzel data={formData} />
      </div>
    );
  }
  

  return (
    <div className={`invitation-preview ${theme}`}>
      <div className="preview-content">
        <h1 className="preview-title">{formData.name1} & {formData.name2}</h1>
        <p className="preview-subtitle">Te invitan a celebrar</p>
        <div className="preview-details">
            <h2 className="preview-date">{formData.eventDate}</h2>
            <h3 className="preview-venue">{formData.eventVenue}</h3>
        </div>
        
        <a href="#buy" className="preview-button">
          Confirmar Asistencia
        </a>
      </div>
    </div>
  );
}

export default InvitationPreview;