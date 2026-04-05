import React from 'react';
import styles from './FinalCtaSection.module.css';

function FinalCtaSection() {
  return (
    <section className={styles.finalCtaSection}>
      <h2 className={styles.sectionTitle}>¿Listo para crear tu invitación?</h2>
      <p className={styles.sectionSubtitle}>Elige tu modelo favorito y comienza a enamorar a tus invitados hoy mismo.</p>
      <a href="#templates" className="btn-primary">
        Comienza Ahora
      </a>
    </section>
  );
}

export default FinalCtaSection;
