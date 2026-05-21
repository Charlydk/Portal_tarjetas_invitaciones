import React, { useState } from 'react';
import styles from './TemplatesSection.module.css';
import { invitationSegments } from '../../data/segments';
import { useNavigate } from 'react-router-dom';
import TemplateThumbnail from '../TemplateThumbnail';

function TemplatesSection() {
  const [activeSegmentId, setActiveSegmentId] = useState(invitationSegments[0].id);
  const activeSegment = invitationSegments.find(s => s.id === activeSegmentId) || invitationSegments[0];
  const navigate = useNavigate();

  return (
    <section id="templates" className={styles.templatesSection}>
      <p className={styles.sectionEyebrow}>Modelos disponibles</p>
      <h2 className={styles.sectionTitle}>Encontrá el diseño ideal para tu evento</h2>

      <div className="ts-filter-row">
        {invitationSegments.map(segment => (
          <button
            key={segment.id}
            onClick={() => setActiveSegmentId(segment.id)}
            className={`ts-filter-btn ${activeSegmentId === segment.id ? 'ts-filter-btn--active' : ''}`}
          >
            {segment.name}
          </button>
        ))}
      </div>

      <div className="template-grid">
        {activeSegment.templates.map((template) => (
          <div
            key={template.id}
            className="template-card-item"
            onClick={() => navigate(`/preview/${template.variantId}`)}
          >
            <div className="card-preview-wrapper">
              <TemplateThumbnail modelId={template.modelId} variantId={template.variantId} />
            </div>

            <h3 className="card-name">{template.name}</h3>

            <button
              className="card-btn"
              onClick={(e) => { e.stopPropagation(); navigate(`/preview/${template.variantId}`); }}
            >
              Ver ejemplo
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .ts-filter-row {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 2rem 0 3rem;
          flex-wrap: wrap;
          padding: 0 16px;
        }
        .ts-filter-btn {
          padding: 10px 22px;
          border-radius: 50px;
          border: 1.5px solid #e5e7eb;
          background: white;
          color: #6b7280;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s ease;
        }
        .ts-filter-btn:hover {
          border-color: #db2777;
          color: #db2777;
        }
        .ts-filter-btn--active {
          background: #db2777;
          border-color: #db2777;
          color: white;
          box-shadow: 0 4px 14px rgba(219,39,119,0.28);
        }
        .template-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .template-card-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }
        .card-preview-wrapper {
          aspect-ratio: 9 / 18;
          width: 100%;
          max-width: 220px;
          border: 8px solid #1a1a1a;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 12px 28px rgba(0,0,0,0.14);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          background: #f0f0f0;
        }
        .template-card-item:hover .card-preview-wrapper {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.18);
        }
        .card-name {
          margin: 14px 0 10px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1f2937;
          font-family: 'Montserrat', sans-serif;
          text-align: center;
        }
        .card-btn {
          background: transparent;
          border: 1.5px solid #db2777;
          color: #db2777;
          padding: 8px 22px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 8px;
        }
        .card-btn:hover {
          background: #db2777;
          color: white;
        }
        @media (max-width: 768px) {
          .template-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .card-preview-wrapper {
            max-width: 100%;
            border-width: 5px;
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  );
}

export default TemplatesSection;
