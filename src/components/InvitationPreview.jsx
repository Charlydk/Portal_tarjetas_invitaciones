import React from 'react';
import './InvitationPreview.css';
import Rapunzel from './templates/Rapunzel/Rapunzel';

function InvitationPreview({ formData, theme }) {

  if (theme === 'theme-rapunzel') {
    return (
      <div className="preview-frame-container">
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