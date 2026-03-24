import React from 'react';
import TemplateCard from '../TemplateCard';
import styles from './TemplatesSection.module.css';

function TemplatesSection({ templates }) {
  return (
    <section id="templates" className={styles.templatesSection}>
      <h2 className={styles.sectionTitle}>Explora Nuestras Plantillas</h2>
      <div className={styles.templatesGrid}>
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            thumbnailUrl={template.thumbnailUrl}
            path={template.path}
          />
        ))}
      </div>
    </section>
  );
}

export default TemplatesSection;
