import React from 'react';
import styles from './FinalCtaSection.module.css';

function FinalCtaSection() {
  return (
    <section className={styles.finalCtaSection}>
      <h2 className={styles.sectionTitle}>¿Listo para crear tu invitación?</h2>
      <p>Elige una plantilla y empieza a personalizarla ahora mismo. ¡Es gratis!</p>
      <a href="#templates" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}>
        Comienza Ahora
      </a>
    </section>
  );
}

export default FinalCtaSection;
