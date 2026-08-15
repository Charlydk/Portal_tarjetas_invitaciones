import React, { Suspense, useEffect } from 'react';
import './InvitationPreview.css';
import TemplateWrapper from './TemplateWrapper';
import { invitationModels } from '../../data/models';
import { SKELETON_MAP } from '../../lib/skeletonMap';

// Mapeo paso → sección en la tarjeta
const STEP_SECTION_MAP = {
  protagonists: 'section-hero',
  venue:        'section-civil',
  extras:       'section-dresscode',
  gallery:      'section-gallery',
  music:        'section-music',
  gifts:        'section-gifts',
  confirm:      'section-rsvp',
};

function InvitationPreview({ formData, themeId, activeStepId, isEditorMode = true, fullScreen = false, audioEnabled = false }) {
  // ── Scroll sync ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeStepId) return;
    const sectionId = STEP_SECTION_MAP[activeStepId];
    if (!sectionId) return;
    // Pequeño delay para que el DOM esté actualizado
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(timer);
  }, [activeStepId]);

  // ── Resolver modelo / variante ───────────────────────────────────────────
  let selectedModel = null;
  let selectedVariant = null;

  if (formData.modelId && formData.variantId) {
    selectedModel = invitationModels.find(m => m.id === formData.modelId);
    selectedVariant = selectedModel?.variants.find(v => v.id === formData.variantId);
  } else if (themeId) {
    selectedModel = invitationModels.find(m => m.variants.some(v => v.id === themeId));
    selectedVariant = selectedModel?.variants.find(v => v.id === themeId);
  }

  if (selectedModel && selectedVariant) {
    const SkeletonComponent = SKELETON_MAP[selectedModel.skeletonComponent];
    if (SkeletonComponent) {
      const content = (
        <TemplateWrapper
          themeConfig={selectedVariant}
          isEditorMode={isEditorMode}
          audioEnabled={audioEnabled}
          fullScreen={fullScreen}
        >
          {/* Templates are code-split, so the chunk arrives on demand. The
              fallback is deliberately blank: in the guest view the welcome
              gate is still covering the screen, and in the editor a flashing
              placeholder between keystrokes would be worse than nothing. */}
          <Suspense fallback={null}>
            <SkeletonComponent data={formData} theme={selectedVariant} />
          </Suspense>
        </TemplateWrapper>
      );
      // Full screen is the guest's view: the card has to flow and scroll.
      // Clamping it to 100vh with overflow:hidden showed only the hero.
      return fullScreen
        ? <div style={{ minHeight: '100vh' }}>{content}</div>
        : <div className="preview-frame-container inv-frame">{content}</div>;
    }
  }

  // ── Fallback genérico ────────────────────────────────────────────────────
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
