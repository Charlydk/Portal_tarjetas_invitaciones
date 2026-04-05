import React, { useState, useEffect } from 'react';
import styles from './TemplatesSection.module.css';
import { invitationSegments } from '../../data/segments';
import { useNavigate } from 'react-router-dom';
import InvitationPreview from '../../features/preview/InvitationPreview';

function TemplatesSection() {
  const [activeSegmentId, setActiveSegmentId] = useState(invitationSegments[0].id);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const activeSegment = invitationSegments.find(s => s.id === activeSegmentId) || invitationSegments[0];
  const navigate = useNavigate();

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedTemplate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedTemplate]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  const getMockFormData = (template) => ({
    name1: "Ana",
    name2: "Juan",
    welcomePhrase: "¡Bienvenidos a nuestra Boda!",
    invitePhrase: "Con mucha alegría los invitamos a celebrar nuestra unión.",
    eventDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(),
    eventVenue: "Salón Principal",
    partyPlace: "Castillo de Eventos",
    partyAddress: "Av. Libertador 1234, CABA",
    modelId: template?.modelId,
    variantId: template?.variantId,
    // Módulos activos para la preview
    showCivil: true,
    showCeremony: true,
    showParty: true,
    showCountdown: true,
    showDressCode: true,
    showGifts: true,
    showGallery: true,
    showMusic: true,
    showRSVP: true,
    askDiets: true,
  });

  return (
    <section id="templates" className={styles.templatesSection}>
      <h2 className={styles.sectionTitle}>Encuentra el Diseño Ideal para tu Evento</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap', padding: '0 20px' }}>
        {invitationSegments.map(segment => (
          <button
            key={segment.id}
            onClick={() => {
              setActiveSegmentId(segment.id);
              setSelectedTemplate(null);
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: activeSegmentId === segment.id ? 'none' : '1px solid #ddd',
              background: activeSegmentId === segment.id ? 'var(--primary-color, #ff6b6b)' : 'white',
              color: activeSegmentId === segment.id ? 'white' : '#555',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: activeSegmentId === segment.id ? '0 4px 15px rgba(255,107,107,0.3)' : 'none'
            }}
          >
            {segment.name}
          </button>
        ))}
      </div>

      <div className="template-grid" style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {activeSegment.templates.map((template) => (
          <div key={template.id} 
               className="template-card-item"
               onClick={() => handleTemplateClick(template)}
               style={{ 
                 display: 'flex', 
                 flexDirection: 'column',
                 alignItems: 'center',
                 width: '100%',
                 cursor: 'pointer'
               }}>
            
            {/* Título superior (Color verde agua/Cyan) */}
            <h3 className="mobile-title" style={{ margin: '0 0 15px 0', fontSize: '1.4rem', color: '#51d7c9', textAlign: 'center', fontWeight: '800', fontFamily: 'var(--font-title)' }}>
              {template.name}
            </h3>

            {/* Frame realista usando la imagen de captura */}
            <div className="card-preview-wrapper" style={{ position: 'relative' }}>
              <div style={{ height: '100%', width: '100%', background: `url(${template.thumbnailUrl}) top/cover` }}></div>
            </div>

            {/* Botón Ver Ejemplo (Amarillo anaranjado) */}
            <button 
              className="mobile-btn"
              onClick={(e) => { e.stopPropagation(); handleTemplateClick(template); }}
              style={{ 
                marginTop: '15px', 
                background: '#fbbf24', /* Amarillo dorado */
                color: 'white', 
                fontWeight: 'bold', 
                padding: '12px 30px', 
                borderRadius: '50px', 
                border: 'none', 
                width: '90%', 
                maxWidth: '200px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)',
                fontFamily: 'var(--font-body)'
              }}
            >
              Ver ejemplo
            </button>

            {/* Enlace Más Detalles (Mismo color que el título) */}
            <span 
              className="mobile-link"
              onClick={(e) => { e.stopPropagation(); handleTemplateClick(template); }}
              style={{ 
                marginTop: '15px', 
                color: '#51d7c9', 
                cursor: 'pointer', 
                fontWeight: '600',
                fontSize: '1rem',
                paddingBottom: '20px'
              }}
            >
              Más detalles
            </span>

          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px',
          overflowY: 'auto'
        }} onClick={closeModal}>
          <div style={{
            background: 'transparent',
            maxWidth: '1000px',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'modalFadeIn 0.3s ease forwards',
            margin: 'auto'
          }} onClick={e => e.stopPropagation()}>
            
            {/* Left side: Interactive preview in phone frame */}
            <div style={{ width: '400px', height: '80vh', flex: '0 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <InvitationPreview formData={getMockFormData(selectedTemplate)} />
              </div>
            </div>

            {/* Right side: Info and Actions */}
            <div style={{ 
               flex: '1 1 350px', 
               background: 'white', 
               padding: '40px', 
               borderRadius: '20px',
               boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
               position: 'relative'
            }}>
              <button onClick={closeModal} style={{
                position: 'absolute', top: '15px', right: '15px',
                background: '#f0f0f0', border: 'none',
                borderRadius: '50%', width: '35px', height: '35px',
                fontSize: '1.2rem', cursor: 'pointer',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f0f0f0'}
              >❌</button>

              <h2 style={{ margin: '0 0 10px 0', fontSize: '2.2rem', color: '#333' }}>{selectedTemplate.name}</h2>
              <p style={{ margin: '0 0 30px 0', color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>{selectedTemplate.description}</p>
              
              <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                <button 
                  onClick={() => {
                    closeModal();
                    navigate(`/demo/${selectedTemplate.variantId || selectedTemplate.id}`);
                  }} 
                  style={{
                    background: 'var(--primary-color, #ff6b6b)',
                    color: 'white',
                    border: 'none',
                    padding: '18px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    transition: 'opacity 0.2s',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(255,107,107,0.4)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  ✨ Edita este diseño
                </button>
                <a 
                  href={`https://wa.me/1234567890?text=Hola,%20quisiera%20encargar%20la%20plantilla%20${encodeURIComponent(selectedTemplate.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '18px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s',
                    width: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 15px rgba(37,211,102,0.4)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#20bd5a'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#25D366'}
                >
                  💬 Hablar con Asesor
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>
        {`
          .template-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
            justify-content: center;
          }
          
          .card-preview-wrapper {
            aspect-ratio: 9 / 18;
            max-width: 250px;
            width: 100%;
            margin: 0 auto;
            border: 8px solid #333;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            transition: transform 0.3s ease;
            background: white;
          }

          .template-card-item:hover .card-preview-wrapper {
             transform: translateY(-6px);
          }

          @media (max-width: 768px) {
            .template-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              padding: 0 10px !important;
            }
            .card-preview-wrapper {
              max-width: 100%;
              border-width: 4px;
              border-radius: 15px;
            }
            .template-card-item:hover .card-preview-wrapper {
               transform: translateY(-3px);
            }
            .mobile-title {
              font-size: 1.1rem !important;
              margin-bottom: 5px !important;
            }
            .mobile-btn {
              padding: 8px 12px !important;
              font-size: 0.9rem !important;
              width: 100% !important;
              margin-top: 5px !important;
              max-width: 100% !important;
            }
            .mobile-link {
              font-size: 0.9rem !important;
              margin-top: 8px !important;
            }
          }

          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
    </section>
  );
}

export default TemplatesSection;
