import React, { useState } from 'react';
import { invitationSegments } from '../../../data/segments';

export function StepDesign({ formData, handleChange }) {
  const [selectedSegmentId, setSelectedSegmentId] = useState(invitationSegments[0].id);

  const currentSegment = invitationSegments.find(s => s.id === selectedSegmentId) || invitationSegments[0];

  const handleTemplateSelect = (template) => {
    handleChange({ target: { name: 'modelId', value: template.modelId, type: 'text' } });
    handleChange({ target: { name: 'variantId', value: template.variantId, type: 'text' } });
  };

  return (
    <div className="panel-section">
      <h3>🖌️ Paso 1: Diseño</h3>

      <div className="form-group">
        <label>Tipo de Evento</label>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>
          {invitationSegments.map(segment => (
            <button
              key={segment.id}
              type="button"
              onClick={() => setSelectedSegmentId(segment.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedSegmentId === segment.id ? 'var(--primary-color, #ff6b6b)' : '#eee',
                color: selectedSegmentId === segment.id ? 'white' : '#333',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              {segment.name}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group slide-in">
        <label>Diseños Disponibles ({currentSegment.name})</label>
        <div className="variants-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
          {currentSegment.templates.map(template => {
            const isSelected = formData.modelId === template.modelId && formData.variantId === template.variantId;
            return (
              <div
                key={template.id}
                className={`variant-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template)}
                style={{ 
                  padding: '0', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: isSelected ? '2px solid var(--primary-color, #ff6b6b)' : '1px solid #ddd'
                }}
              >
                <div style={{ height: '100px', width: '100%', background: `url(${template.thumbnailUrl}) center/cover` }}></div>
                <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <strong style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>{template.name}</strong>
                  <small style={{ color: '#666', display: 'block', marginBottom: '10px', flex: 1, lineHeight: '1.2' }}>{template.description}</small>
                  
                  <a 
                    href={`https://wa.me/1234567890?text=Hola,%20me%20interesa%20la%20plantilla%20${encodeURIComponent(template.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'block',
                      background: '#25D366',
                      color: 'white',
                      textDecoration: 'none',
                      padding: '8px 5px',
                      borderRadius: '5px',
                      fontSize: '0.8rem',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: 'auto'
                    }}
                  >
                    Hablar con Asesor
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {!formData.modelId && <small className="error-text">Elegí un diseño para continuar.</small>}
      </div>
    </div>
  );
}
