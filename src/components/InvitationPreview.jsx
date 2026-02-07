import React from 'react';
import './InvitationPreview.css';
import Skeleton1 from './templates/Skeleton1/Skeleton1';
import Skeleton2 from './templates/Skeleton2/Skeleton2';
import WeddingClassic from './templates/WeddingClassic/WeddingClassic';
import NeonParty from './templates/NeonParty/NeonParty';
import Corporate from './templates/Corporate/Corporate';
import { themes } from '../data/themes';

const SKELETON_MAP = {
  'Skeleton1': Skeleton1,
  'Skeleton2': Skeleton2,
};

const OLD_TEMPLATE_MAP = {
  'theme-wedding': WeddingClassic,
  'theme-neon': NeonParty,
  'theme-corporate': Corporate,
};

function InvitationPreview({ formData, themeId }) {
  // 1. Intentamos buscar en el nuevo sistema de temas
  const themeConfig = themes[themeId];

  if (themeConfig) {
    const SkeletonComponent = SKELETON_MAP[themeConfig.skeleton];
    if (SkeletonComponent) {
      return (
        <div className="preview-frame-container">
           <SkeletonComponent data={formData} theme={themeConfig} />
        </div>
      );
    }
  }

  // 2. Fallback al sistema antiguo (compatibilidad)
  const OldTemplateComponent = OLD_TEMPLATE_MAP[themeId];
  if (OldTemplateComponent) {
    return (
      <div className="preview-frame-container">
         <OldTemplateComponent data={formData} />
      </div>
    );
  }

  // 3. Fallback genérico
  return (
    <div className="preview-frame-container">
      <div className="invitation-preview generic">
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
        </div>
      </div>
    </div>
  );
}

export default InvitationPreview;
