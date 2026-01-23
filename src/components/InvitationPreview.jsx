import React from 'react';
import './InvitationPreview.css';
import Rapunzel from './templates/Rapunzel/Rapunzel';
import WeddingClassic from './templates/WeddingClassic/WeddingClassic';
import NeonParty from './templates/NeonParty/NeonParty';

function InvitationPreview({ formData, theme }) {

  if (theme === 'theme-rapunzel') {
    return (
      <div className="preview-frame-container">
         <Rapunzel data={formData} />
      </div>
    );
  }

  if (theme === 'theme-wedding') {
    return (
      <div className="preview-frame-container">
         <WeddingClassic data={formData} />
      </div>
    );
  }

  if (theme === 'theme-neon') {
    return (
      <div className="preview-frame-container">
         <NeonParty data={formData} />
      </div>
    );
  }
  

  return (
    <div className="preview-frame-container">
      <div className={`invitation-preview ${theme}`}>
        <div className="preview-content">
          <h1 className="preview-title">{formData.name1} {formData.name2 ? `& ${formData.name2}` : ''}</h1>
          <p className="preview-subtitle">Te invitan a celebrar</p>
          <div className="preview-details">
              <h2 className="preview-date">{new Date(formData.eventDate).toLocaleDateString()}</h2>
              <h3 className="preview-venue">{formData.eventVenue}</h3>
          </div>

          <a href="#rsvp" className="preview-button">
            Confirmar Asistencia
          </a>
        </div>
      </div>
    </div>
  );
}

export default InvitationPreview;