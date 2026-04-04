import React from 'react';
import './InvitationPreview.css';
import Skeleton1 from '../../templates/Skeleton1/Skeleton1';
import Skeleton2 from '../../templates/Skeleton2/Skeleton2';
import Skeleton3 from '../../templates/Skeleton3/Skeleton3';
import Skeleton4 from '../../templates/Skeleton4/Skeleton4';
import Skeleton5 from '../../templates/Skeleton5/Skeleton5';
import Skeleton6 from '../../templates/Skeleton6/Skeleton6';
import Tarjeta4 from '../../templates/Tarjeta4/Tarjeta4';
import TemplateWrapper from './TemplateWrapper';
import { invitationModels } from '../../data/models';

const SKELETON_MAP = {
  'Skeleton1': Skeleton1,
  'Skeleton2': Skeleton2,
  'Skeleton3': Skeleton3,
  'Skeleton4': Skeleton4,
  'Skeleton5': Skeleton5,
  'Skeleton6': Skeleton6,
  'Tarjeta4': Tarjeta4,
};

function InvitationPreview({ formData, themeId, activeStep }) {
  // El scroll automático fue removido — el wizard dinámico ya no tiene
  // un mapeo fijo de paso → sección de la tarjeta.

  // 1. Resolve Model and Variant
  // If formData provides it, use it. Otherwise falback to finding which model has the themeId.
  let selectedModel = null;
  let selectedVariant = null;

  if (formData.modelId && formData.variantId) {
    selectedModel = invitationModels.find(m => m.id === formData.modelId);
    selectedVariant = selectedModel?.variants.find(v => v.id === formData.variantId);
  } else if (themeId) {
    // Backward compatibility for existing template routing
    selectedModel = invitationModels.find(m => m.variants.some(v => v.id === themeId));
    selectedVariant = selectedModel?.variants.find(v => v.id === themeId);
  }

  if (selectedModel && selectedVariant) {
    const SkeletonComponent = SKELETON_MAP[selectedModel.skeletonComponent];
    if (SkeletonComponent) {
      return (
        <div className="preview-frame-container">
           <TemplateWrapper themeConfig={selectedVariant}>
              <SkeletonComponent data={formData} theme={selectedVariant} />
           </TemplateWrapper>
        </div>
      );
    }
  }

  // 2. Fallback genérico
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
