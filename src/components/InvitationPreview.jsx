import React from 'react';
import './InvitationPreview.css';
import Rapunzel from './templates/Rapunzel/Rapunzel';
import WeddingClassic from './templates/WeddingClassic/WeddingClassic';
import NeonParty from './templates/NeonParty/NeonParty';
import Corporate from './templates/Corporate/Corporate';

const TEMPLATE_MAP = {
  'theme-rapunzel': Rapunzel,
  'theme-wedding': WeddingClassic,
  'theme-neon': NeonParty,
  'theme-corporate': Corporate,
};

function InvitationPreview({ formData, theme }) {
  const TemplateComponent = TEMPLATE_MAP[theme];

  if (TemplateComponent) {
    return (
      <div className="preview-frame-container">
         <TemplateComponent data={formData} />
      </div>
    );
  }

  // Fallback if theme not found
  return (
    <div className="preview-frame-container">
      <div className={`invitation-preview ${theme}`}>
        <div className="preview-content">
          <h1 className="preview-title">
            {formData.name1} {formData.name2 ? `& ${formData.name2}` : ''}
          </h1>
          <p className="preview-subtitle">Te invitan a celebrar</p>
          <div className="preview-details">
              <h2 className="preview-date">
                {isNaN(new Date(formData.eventDate).getTime())
                  ? formData.partyDateString
                  : new Date(formData.eventDate).toLocaleDateString()}
              </h2>
              <h3 className="preview-venue">{formData.eventVenue || formData.partyPlace}</h3>
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
